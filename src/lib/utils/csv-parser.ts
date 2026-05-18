export const GRADE_KEYS = ['preK', 'k1', 'k2', 'k3', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12'] as const
export type GradeKey = typeof GRADE_KEYS[number]
export const GRADE_LABELS: Record<GradeKey, string> = {
    preK: 'Pre-K', k1: 'K1', k2: 'K2', k3: 'K3',
    g1: '1', g2: '2', g3: '3', g4: '4', g5: '5', g6: '6',
    g7: '7', g8: '8', g9: '9', g10: '10', g11: '11', g12: '12',
}

export interface SchoolCostRow {
    school: string
    year: string
    appFee: number | null
    entFee: number | null
    deposit: number | null
    preK: number | null
    k1: number | null
    k2: number | null
    k3: number | null
    g1: number | null
    g2: number | null
    g3: number | null
    g4: number | null
    g5: number | null
    g6: number | null
    primary: number | null
    g7: number | null
    g8: number | null
    g9: number | null
    g10: number | null
    g11: number | null
    g12: number | null
    secondary: number | null
    total: number | null
}

function num(val: string): number | null {
    const trimmed = val.trim()
    if (!trimmed) return null
    const parsed = parseFloat(trimmed)
    return isNaN(parsed) ? null : parsed
}

// Returns the school year to default to, e.g. "26/27".
// Advances to the next school year after April, since enrolment planning shifts forward.
export function defaultSchoolYear(availableYears: string[], now = new Date()): string {
    const calYear = now.getFullYear()
    const startYear = now.getMonth() > 3 ? calYear : calYear - 1
    const year = `${String(startYear).slice(-2)}/${String(startYear + 1).slice(-2)}`
    return availableYears.includes(year) ? year : availableYears[availableYears.length - 1]
}

export function computeSpanCost(
    row: SchoolCostRow,
    fromGrade: GradeKey,
    toGrade: GradeKey,
    monthlyRent = 0,
    includeEntFee = true,
): number | null {
    const fromIdx = GRADE_KEYS.indexOf(fromGrade)
    const toIdx = GRADE_KEYS.indexOf(toGrade)
    if (fromIdx < 0 || toIdx < 0 || fromIdx > toIdx) return null
    let sum = 0
    let hasAny = false
    for (let i = fromIdx; i <= toIdx; i++) {
        const val = row[GRADE_KEYS[i]] as number | null
        if (val !== null) { sum += val; hasAny = true }
    }
    if (!hasAny) return null
    const fees = (row.appFee ?? 0) + (includeEntFee ? (row.entFee ?? 0) : 0)
    return sum + fees + monthlyRent * 12 * (toIdx - fromIdx + 1)
}

export function parseSchoolCosts(raw: string): SchoolCostRow[] {
    const lines = raw.trim().split('\n').slice(1) // skip header
    return lines.map(line => {
        const cols = line.split(',')
        return {
            school: cols[0].trim(),
            year: cols[1].trim(),
            appFee: num(cols[2]),
            entFee: num(cols[3]),
            deposit: num(cols[4]),
            preK: num(cols[5]),
            k1: num(cols[6]),
            k2: num(cols[7]),
            k3: num(cols[8]),
            g1: num(cols[9]),
            g2: num(cols[10]),
            g3: num(cols[11]),
            g4: num(cols[12]),
            g5: num(cols[13]),
            g6: num(cols[14]),
            primary: num(cols[15]),
            g7: num(cols[16]),
            g8: num(cols[17]),
            g9: num(cols[18]),
            g10: num(cols[19]),
            g11: num(cols[20]),
            g12: num(cols[21]),
            secondary: num(cols[22]),
            total: num(cols[23]),
        }
    })
}
