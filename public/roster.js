// Shared mock roster — stands in for the connected IEP data source.
// Loaded by students.html and match.html so they share one source of truth.
window.ROSTER = [
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
