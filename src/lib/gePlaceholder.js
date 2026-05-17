/** @typedef {{ csvColumn: string, label: string, placeholderCode: string, labelPatterns: RegExp[], coursesRequired?: number }} GeAreaDefinition */

import { LS_GE_AREAS, LS_GE_SPECIAL_REQUIREMENTS } from '../data/lsGeRequirements'

export const DAILY_NEXUS_GE_URL = 'https://dailynexus.com/interactives/grades/ges'

/** Nexus ges.csv column per area key (Area A uses Writing column). */
const CSV_COLUMN_BY_KEY = {
  A: 'Writing',
  B: 'Area B',
  C: 'Area C',
  D: 'Area D',
  E: 'Area E',
  F: 'Area F',
  G: 'Area G',
  NWC: 'World Cult',
  ETHNICITY: 'Ethnicity',
  EURO: 'Euro Trad',
  QUANT: 'Quant Relationships',
  WRITING: 'Writing',
}

function buildDefinition(entry, isSpecial) {
  const key = entry.key
  const catalogLabel = isSpecial
    ? entry.title
    : `${entry.label}: ${entry.title}`

  return {
    csvColumn: CSV_COLUMN_BY_KEY[key],
    label: catalogLabel,
    placeholderCode: entry.placeholderCode,
    coursesRequired: entry.coursesRequired,
    labelPatterns: isSpecial
      ? [
          new RegExp(entry.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
          new RegExp(`\\b${entry.key}\\b`, 'i'),
        ]
      : [
          new RegExp(`${entry.label}[:\\s]`, 'i'),
          new RegExp(`Area\\s+${key}\\b`, 'i'),
        ],
  }
}

/** @type {Record<string, GeAreaDefinition>} */
export const GE_AREA_DEFINITIONS = Object.fromEntries([
  ...LS_GE_AREAS.map((area) => [area.key, buildDefinition(area, false)]),
  ...LS_GE_SPECIAL_REQUIREMENTS.map((special) => [special.key, buildDefinition(special, true)]),
])

/** @type {Record<string, string>} */
export const GE_AREA_LABELS = Object.fromEntries(
  Object.entries(GE_AREA_DEFINITIONS).map(([key, def]) => [key, def.label]),
)

const PLACEHOLDER_CODE_TO_KEY = Object.fromEntries(
  Object.entries(GE_AREA_DEFINITIONS).map(([key, def]) => [
    def.placeholderCode.replace(/\s+/g, ' ').toUpperCase(),
    key,
  ]),
)

const PLACEHOLDER_CODE_PATTERN = Object.values(GE_AREA_DEFINITIONS)
  .map((def) => def.placeholderCode.replace(/^GE\s+/i, ''))
  .join('|')

/**
 * @param {string | undefined} courseCode
 * @returns {string | null}
 */
export function parseGePlaceholderCode(courseCode) {
  if (!courseCode) {
    return null
  }

  const normalized = courseCode.trim().replace(/\s+/g, ' ').toUpperCase()
  const direct = PLACEHOLDER_CODE_TO_KEY[normalized]
  if (direct) {
    return direct
  }

  const match = normalized.match(new RegExp(`^GE\\s+(${PLACEHOLDER_CODE_PATTERN})$`, 'i'))
  if (!match) {
    return null
  }

  const token = match[1].toUpperCase()
  return (
    Object.entries(GE_AREA_DEFINITIONS).find(
      ([, def]) => def.placeholderCode.replace(/^GE\s+/i, '').toUpperCase() === token,
    )?.[0] ?? null
  )
}

/**
 * @param {string | undefined} label
 * @returns {string | null}
 */
export function parseGeAreaFromLabel(label) {
  if (!label) {
    return null
  }

  const areaMatch = label.match(/Area\s+([A-G])\b/i)
  if (areaMatch) {
    return areaMatch[1].toUpperCase()
  }

  for (const [key, def] of Object.entries(GE_AREA_DEFINITIONS)) {
    if (def.labelPatterns.some((pattern) => pattern.test(label))) {
      return key
    }
  }

  return null
}

/**
 * @param {{ courseCodes?: string[], label?: string }} item
 * @returns {string | null}
 */
export function resolveGeAreaKey(item) {
  if (!item) {
    return null
  }

  for (const code of item.courseCodes ?? []) {
    const fromCode = parseGePlaceholderCode(code)
    if (fromCode) {
      return fromCode
    }
  }

  return parseGeAreaFromLabel(item.label)
}

/** SILVER area key → Daily Nexus ges.csv column name */
export function getGeCsvColumnMap() {
  return Object.fromEntries(
    Object.entries(GE_AREA_DEFINITIONS)
      .filter(([, def]) => def.csvColumn)
      .map(([key, def]) => [key, def.csvColumn]),
  )
}
