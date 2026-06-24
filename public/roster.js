// Shared mock roster — stands in for the connected IEP data source.
// Loaded by students.html and match.html so they share one source of truth.
// window.ROSTER is the merged list (curated + generated + teacher-created).
// window.addStudent(student) persists a new student to this device.
(function () {
  // --- Curated, fully-detailed students ---
  const curated = [
    {
      id: 'amara', name: 'Amara Osei', year: 'Year 4', key_worker: 'Miss Clarke',
      goals: [
        { id: 'a1', text: 'Read 100 high-frequency sight words independently', target: 100, unit: 'sight words', current: 67,
          history: [{ date: '2026-05-12', value: 48 }, { date: '2026-05-26', value: 58 }, { date: '2026-06-18', value: 67 }] },
        { id: 'a2', text: 'Sustain attention during carpet time for 10 minutes', target: 10, unit: 'minutes', current: 7,
          history: [{ date: '2026-05-20', value: 4 }, { date: '2026-06-10', value: 7 }] },
        { id: 'a3', text: 'Solve two-digit addition with 80% accuracy', target: 80, unit: '%', current: 70,
          history: [{ date: '2026-05-14', value: 55 }, { date: '2026-06-14', value: 70 }] },
        { id: 'a4', text: 'Use three-word phrases to request items', target: 3, unit: 'words', current: 3,
          history: [{ date: '2026-04-30', value: 2 }, { date: '2026-06-02', value: 3 }] }
      ]
    },
    {
      id: 'tyler', name: 'Tyler Kemp', year: 'Year 4', key_worker: 'Mr Adeyemi',
      goals: [
        { id: 't1', text: 'Reduce adult prompts during transitions to 4 or fewer', target: 4, unit: 'prompts', current: 6,
          history: [{ date: '2026-05-08', value: 11 }, { date: '2026-05-22', value: 8 }, { date: '2026-06-12', value: 6 }] },
        { id: 't2', text: 'Complete the morning routine independently 4 of 5 days', target: 5, unit: 'days', current: 3,
          history: [{ date: '2026-05-30', value: 2 }, { date: '2026-06-13', value: 3 }] },
        { id: 't3', text: 'Recall number bonds to 20 with 90% accuracy', target: 90, unit: '%', current: 72,
          history: [{ date: '2026-05-16', value: 60 }, { date: '2026-06-16', value: 72 }] }
      ]
    },
    {
      id: 'priya', name: 'Priya Shah', year: 'Year 4', key_worker: 'Miss Clarke',
      goals: [
        { id: 'p1', text: 'Write a simple sentence with a capital letter and full stop', target: 10, unit: 'sentences', current: 8,
          history: [{ date: '2026-05-18', value: 4 }, { date: '2026-06-15', value: 8 }] },
        { id: 'p2', text: 'Recall multiplication facts to 5× with 80% accuracy', target: 80, unit: '%', current: 80,
          history: [{ date: '2026-05-10', value: 62 }, { date: '2026-06-09', value: 80 }] }
      ]
    },
    {
      id: 'jamie', name: 'Jamie Hughes', year: 'Year 4', key_worker: 'Mr Adeyemi',
      goals: [
        { id: 'j1', text: 'Decode unfamiliar words using phonics with 85% accuracy', target: 85, unit: '%', current: 78,
          history: [{ date: '2026-05-15', value: 70 }, { date: '2026-06-17', value: 78 }] },
        { id: 'j2', text: 'Stay on task for a 15-minute independent activity', target: 15, unit: 'minutes', current: 12,
          history: [{ date: '2026-05-28', value: 9 }, { date: '2026-06-11', value: 12 }] }
      ]
    },
    {
      id: 'sofia', name: 'Sofia Russo', year: 'Year 4', key_worker: 'Miss Clarke',
      goals: [
        { id: 's1', text: 'Contribute one idea in small-group discussion each session', target: 5, unit: 'sessions', current: 4,
          history: [{ date: '2026-05-21', value: 2 }, { date: '2026-06-08', value: 4 }] },
        { id: 's2', text: 'Solve word problems involving money with 80% accuracy', target: 80, unit: '%', current: 84,
          history: [{ date: '2026-05-13', value: 68 }, { date: '2026-06-10', value: 84 }] }
      ]
    }
  ];

  // --- Generated students (deterministic so values are stable across reloads) ---
  const FIRST = ['Oliver', 'Amelia', 'Noah', 'Ava', 'Leo', 'Isla', 'Arthur', 'Mia', 'Oscar', 'Lily',
    'Harry', 'Freya', 'Ella', 'Charlie', 'Grace', 'Theo', 'Ruby', 'Henry', 'Evie', 'Poppy',
    'Jacob', 'Sophie', 'Max', 'Daisy', 'Alfie', 'Florence', 'Musa', 'Aisha', 'Kai', 'Zara'];
  const LAST = ['Bennett', 'Clarke', 'Dawson', 'Ellis', 'Foster', 'Grant', 'Harper', 'Irwin', 'Jensen', 'Khan',
    'Lowe', 'Mason', 'Nolan', 'Owens', 'Patel', 'Quinn', 'Reid', 'Stone', 'Turner', 'Vance',
    'Walsh', 'Young', 'Brooks', 'Cole', 'Dixon', 'Frost', 'Hale', ' Marks', 'Nash', 'Pike'];
  const KEY_WORKERS = ['Miss Clarke', 'Mr Adeyemi', 'Mrs Patel', 'Mr Doyle'];
  const YEARS = ['Year 3', 'Year 4', 'Year 5'];
  const GOAL_TEMPLATES = [
    { text: 'Read {n} high-frequency sight words independently', target: 100, unit: 'sight words' },
    { text: 'Sustain attention for {n} minutes during independent work', target: 15, unit: 'minutes' },
    { text: 'Solve two-digit addition with {n}% accuracy', target: 80, unit: '%' },
    { text: 'Write {n} simple sentences with a capital letter and full stop', target: 10, unit: 'sentences' },
    { text: 'Recall multiplication facts with {n}% accuracy', target: 80, unit: '%' },
    { text: 'Reduce adult prompts during transitions to {n} or fewer', target: 4, unit: 'prompts' },
    { text: 'Contribute an idea in group discussion across {n} sessions', target: 5, unit: 'sessions' },
    { text: 'Decode unfamiliar words using phonics with {n}% accuracy', target: 85, unit: '%' },
    { text: 'Complete the morning routine independently {n} of 5 days', target: 5, unit: 'days' },
    { text: 'Recall number bonds to 20 with {n}% accuracy', target: 90, unit: '%' }
  ];

  const generated = [];
  for (let i = 0; i < 30; i++) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7 + 3) % LAST.length].trim();
    const goalCount = 2 + (i % 3); // 2-4 goals
    const goals = [];
    for (let g = 0; g < goalCount; g++) {
      const tplIdx = (i * 3 + g) % GOAL_TEMPLATES.length;
      const tpl = GOAL_TEMPLATES[tplIdx];
      const lowerIsBetter = /prompt/.test(tpl.unit);
      const frac = 0.4 + ((i * 5 + g * 3) % 6) / 10; // 0.4 .. 0.9
      let current = Math.round(tpl.target * frac);
      if (lowerIsBetter) current = Math.max(0, Math.round(tpl.target + ((i + g) % 4)));
      const earlier = lowerIsBetter ? current + 3 : Math.max(0, Math.round(current * 0.7));
      goals.push({
        id: `gen${i}-${g}`,
        text: tpl.text.replace('{n}', tpl.target),
        target: tpl.target,
        unit: tpl.unit,
        current,
        history: [
          { date: '2026-05-' + String(10 + ((i + g) % 18)).padStart(2, '0'), value: earlier },
          { date: '2026-06-' + String(5 + ((i * 2 + g) % 20)).padStart(2, '0'), value: current }
        ]
      });
    }
    generated.push({
      id: `gen-${i}`,
      name: `${first} ${last}`,
      year: YEARS[i % YEARS.length],
      key_worker: KEY_WORKERS[i % KEY_WORKERS.length],
      goals
    });
  }

  const base = curated.concat(generated);

  // --- Teacher-created students, persisted on this device ---
  let custom = [];
  try { custom = JSON.parse(localStorage.getItem('dc_students')) || []; } catch (e) { custom = []; }

  window.ROSTER = base.concat(custom);

  window.addStudent = function (student) {
    custom.push(student);
    localStorage.setItem('dc_students', JSON.stringify(custom));
    window.ROSTER.push(student);
    return student;
  };
})();
