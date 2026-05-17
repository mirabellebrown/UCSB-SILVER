/** @typedef {{ csvColumn: string, label: string, placeholderCode: string, labelPatterns: RegExp[] }} GeAreaDefinition */

export const DAILY_NEXUS_GE_URL = 'https://dailynexus.com/interactives/grades/ges'

/**
 * Standard Areas A–G plus UCSB special graduation requirements (Nexus ges.csv columns).
 * @type {Record<string, GeAreaDefinition>}
 */
export const GE_AREA_DEFINITIONS = {
  A2: {
    csvColumn: 'Writing',
    label: 'Area A2 (Writing)',
    placeholderCode: 'GE A2',
    labelPatterns: [/Area\s+A2\b/i],
  },
  B: {
    csvColumn: 'Area B',
    label: 'Area B',
    placeholderCode: 'GE B',
    labelPatterns: [/Area\s+B\b/i],
  },
  C: {
    csvColumn: 'Area C',
    label: 'Area C',
    placeholderCode: 'GE C',
    labelPatterns: [/Area\s+C\b/i],
  },
  D: {
    csvColumn: 'Area D',
    label: 'Area D',
    placeholderCode: 'GE D',
    labelPatterns: [/Area\s+D\b/i],
  },
  E: {
    csvColumn: 'Area E',
    label: 'Area E',
    placeholderCode: 'GE E',
    labelPatterns: [/Area\s+E\b/i],
  },
  F: {
    csvColumn: 'Area F',
    label: 'Area F',
    placeholderCode: 'GE F',
    labelPatterns: [/Area\s+F\b/i],
  },
  G: {
    csvColumn: 'Area G',
    label: 'Area G',
    placeholderCode: 'GE G',
    labelPatterns: [/Area\s+G\b/i],
  },
  NWC: {
    csvColumn: 'World Cult',
    label: 'Non-Western Cultures (NWC)',
    placeholderCode: 'GE NWC',
    labelPatterns: [/non-western/i, /\bNWC\b/i, /world cult/i],
  },
  AHI: {
    csvColumn: 'AHI',
    label: 'American History & Institutions',
    placeholderCode: 'GE AHI',
    labelPatterns: [/american history/i, /\bAHI\b/i],
  },
  ETHNICITY: {
    csvColumn: 'Ethnicity',
    label: 'American Ethnicity',
    placeholderCode: 'GE ETH',
    labelPatterns: [/american ethnic/i, /\bethnicity\b/i],
  },
  EURO: {
    csvColumn: 'Euro Trad',
    label: 'European Traditions',
    placeholderCode: 'GE EURO',
    labelPatterns: [/european tradition/i, /\beuro trad\b/i, /european\b/i],
  },
  QUANT: {
    csvColumn: 'Quant Relationships',
    label: 'Quantitative Relationships',
    placeholderCode: 'GE QUANT',
    labelPatterns: [/quantitative relationship/i, /\bquant\b/i],
  },
}

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

  const areaMatch = label.match(/Area\s+(A2|[A-G])\b/i)
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
    Object.entries(GE_AREA_DEFINITIONS).map(([key, def]) => [key, def.csvColumn]),
  )
}
