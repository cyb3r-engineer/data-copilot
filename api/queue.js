import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const deviceId = new URL(req.url, 'http://x').searchParams.get('device_id');

    let query = supabase.from('captures').select('*').order('created_at', { ascending: false }).limit(50);
    if (deviceId) {
      query = query.or(`source.eq.sample,source.eq.${deviceId}`);
    }
    const { data, error } = await query;

    if (error) throw error;
    res.status(200).json({ ok: true, captures: data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
