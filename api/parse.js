import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const PROMPT = `You are an AI data extraction assistant for a teacher data co-pilot tool.
Analyse this teacher document and extract all structured information.

Respond ONLY with a valid JSON object — no preamble, no markdown fences, nothing outside the JSON.

{
  "doc_type": "assessment | observation | iep | behaviour | attendance | reflection | unknown",
  "confidence": <integer 0-100>,
  "summary": "<one sentence describing what this document contains>",
  "date": "<date string if found, else null>",
  "teacher": "<teacher name or initials if visible, else null>",
  "subject": "<subject or topic if clear, else null>",
  "class_group": "<year group or class name if visible, else null>",
  "students": [
    {
      "name": "<student name as written>",
      "score": "<score, grade or mark if present, else null>",
      "note": "<any per-student observation or note, else null>"
    }
  ],
  "free_text": "<verbatim transcription of any free-form written text, else null>",
  "flags": ["<anything ambiguous or needing teacher clarification>"]
}

Rules:
- Only include fields where you found real evidence
- Use null for anything not found — do not guess
- Put every uncertainty in flags
- confidence should honestly reflect image quality and how certain you are`;

const SAMPLES = {
  assessment: 'A handwritten mark sheet for Year 4 maths. Headed "Fractions — 14/6 — MT". Six student rows: Jamie H 16/20, Sofia R 18/20, Tyler K 9/20 with a circle around the score, Amara O 14/20, Liam B 20/20 star next to it, Priya S score crossed out and rewritten as 12/20. Bottom note: "Tyler needs support — catch-up next Tue?"',
  sticky: 'A sticky note: "Jayden M — really struggled w/ place value today, kept reversing digits. Worth checking with SENCO? Great effort tho. Also — superb reading session, finished Bk 4! JB 17th June"',
  iep: 'A handwritten IEP note: "Pupil: Amara Osei  Target: Read 100 sight words independently by end of Spring term.  Current level: 67/100  Support: TA-assisted daily 10min reading (Miss Clarke).  Review date: 28 March"',
  behaviour: 'Behaviour incident: "Lunchtime — Tyler K + Sam P — pushing near hall. Both sent to cool-down room 12:50. Both parents contacted by phone. No injuries. Ms Davies 2:15pm Tues 18th"'
};

export const config = { api: { bodyParser: false } };

async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseMultipart(buffer, boundary) {
  const parts = {};
  const boundaryBuf = Buffer.from('--' + boundary);
  let start = 0;
  while (start < buffer.length) {
    const boundaryIdx = buffer.indexOf(boundaryBuf, start);
    if (boundaryIdx === -1) break;
    const headerStart = boundaryIdx + boundaryBuf.length + 2;
    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), headerStart);
    if (headerEnd === -1) break;
    const header = buffer.slice(headerStart, headerEnd).toString();
    const dataStart = headerEnd + 4;
    const nextBoundary = buffer.indexOf(boundaryBuf, dataStart);
    const dataEnd = nextBoundary === -1 ? buffer.length : nextBoundary - 2;
    const nameMatch = header.match(/name="([^"]+)"/);
    const filenameMatch = header.match(/filename="([^"]+)"/);
    const ctMatch = header.match(/Content-Type:\s*([^\r\n]+)/i);
    if (nameMatch) {
      const name = nameMatch[1];
      if (filenameMatch) {
        parts[name] = { filename: filenameMatch[1], contentType: ctMatch ? ctMatch[1].trim() : 'application/octet-stream', data: buffer.slice(dataStart, dataEnd) };
      } else {
        parts[name] = buffer.slice(dataStart, dataEnd).toString().trim();
      }
    }
    start = nextBoundary === -1 ? buffer.length : nextBoundary;
  }
  return parts;
}

async function callGemini(parts) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts }] })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Gemini API error');
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const rawBody = await readBody(req);
    const contentType = req.headers['content-type'] || '';

    let geminiParts;
    let sampleKey = null;

    if (contentType.includes('multipart/form-data')) {
      const boundary = contentType.split('boundary=')[1]?.trim();
      if (!boundary) throw new Error('No boundary in multipart request');
      const parts = parseMultipart(rawBody, boundary);

      if (parts.image?.data) {
        const base64 = parts.image.data.toString('base64');
        const mimeType = parts.image.contentType;
        geminiParts = [
          { inline_data: { mime_type: mimeType, data: base64 } },
          { text: PROMPT }
        ];
      } else if (parts.sample_key) {
        sampleKey = parts.sample_key;
      }
    } else if (contentType.includes('application/json')) {
      const body = JSON.parse(rawBody.toString());
      sampleKey = body.sample_key;
    }

    if (sampleKey && SAMPLES[sampleKey]) {
      geminiParts = [{ text: `${PROMPT}\n\nThe document is described as:\n\n${SAMPLES[sampleKey]}` }];
    }

    if (!geminiParts) return res.status(400).json({ error: 'No image or sample key provided' });

    const raw = await callGemini(geminiParts);
    let clean = raw.replace(/```json|```/g, '').trim();
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');
    if (start !== -1 && end !== -1) clean = clean.slice(start, end + 1);
    const parsed = JSON.parse(clean);

    const { data: saved, error: dbError } = await supabase
      .from('captures')
      .insert({
        doc_type: parsed.doc_type,
        confidence: parsed.confidence,
        summary: parsed.summary,
        result_json: parsed,
        status: parsed.flags?.length ? 'needs_review' : 'ready',
        source: sampleKey ? 'sample' : 'upload'
      })
      .select('id')
      .single();

    if (dbError) console.warn('Supabase save failed:', dbError.message);

    res.status(200).json({ ok: true, result: parsed, raw: clean, id: saved?.id ?? null });
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
