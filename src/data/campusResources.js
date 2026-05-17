import { OFFICIAL_SOURCE } from './officialSources'

export const campusResourceHub = [
  {
    id: 'planning',
    title: 'Degree planning & audits',
    description: 'Compare your roadmap to GOLD and the catalog before you enroll.',
    accent: 'from-silver/20 to-silver/0',
    links: [OFFICIAL_SOURCE.gold, OFFICIAL_SOURCE.catalog, OFFICIAL_SOURCE.lsAdvising],
  },
  {
    id: 'registration',
    title: 'Registration & deadlines',
    description: 'Pass times, add/drop dates, and enrollment holds.',
    accent: 'from-gold/22 to-gold/0',
    links: [OFFICIAL_SOURCE.gold, OFFICIAL_SOURCE.registrar],
  },
  {
    id: 'ge-major',
    title: 'GE & major requirements',
    description: 'Breadth, Economics prep, and department advising.',
    accent: 'from-sky-500/20 to-sky-500/0',
    links: [OFFICIAL_SOURCE.catalog, OFFICIAL_SOURCE.econAdvising, OFFICIAL_SOURCE.lsAdvising],
  },
  {
    id: 'financial',
    title: 'Billing & financial aid',
    description: 'myBARC charges and aid eligibility questions.',
    accent: 'from-emerald-500/18 to-emerald-500/0',
    links: [OFFICIAL_SOURCE.mybarc, OFFICIAL_SOURCE.finAid],
  },
  {
    id: 'standing',
    title: 'Standing, petitions & graduation',
    description: 'When you need a human review of your record.',
    accent: 'from-amber-400/18 to-amber-400/0',
    links: [OFFICIAL_SOURCE.lsAdvising, OFFICIAL_SOURCE.registrar],
  },
  {
    id: 'demo-tools',
    title: 'SILVER demo tools',
    description: 'Prototype-only views that link out to official sources.',
    accent: 'from-violet-500/20 to-violet-500/0',
    links: [
      { label: 'Economics prep flowchart (demo)', url: '/econ-prep-map' },
      OFFICIAL_SOURCE.gold,
    ],
  },
]

export const chatPromptSuggestions = [
  'When is my Winter pass time?',
  'How many units should I take?',
  'What GE areas do I still need?',
  'Can I take ECON 101 next quarter?',
  'What happens if I drop below 12 units?',
  'Where do I check holds before registration?',
]
