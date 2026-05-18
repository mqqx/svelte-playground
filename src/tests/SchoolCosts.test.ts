import { describe, it, expect } from 'vitest'
import { defaultSchoolYear, computeSpanCost } from '../lib/utils/csv-parser'
import type { SchoolCostRow } from '../lib/utils/csv-parser'

const years = ['24/25', '25/26', '26/27']

describe('defaultSchoolYear', () => {
    it('shouldReturnCurrentSchoolYear_whenMonthIsAprilOrEarlier', () => {
        expect(defaultSchoolYear(years, new Date(2026, 3, 30))).toBe('25/26') // April
        expect(defaultSchoolYear(years, new Date(2026, 0, 1))).toBe('25/26')  // January
    })

    it('shouldReturnNextSchoolYear_whenMonthIsAfterApril', () => {
        expect(defaultSchoolYear(years, new Date(2026, 4, 1))).toBe('26/27')  // May
        expect(defaultSchoolYear(years, new Date(2026, 11, 31))).toBe('26/27') // December
    })

    it('shouldFallBackToLastYear_whenComputedYearNotInData', () => {
        expect(defaultSchoolYear(years, new Date(2030, 6, 1))).toBe('26/27')
    })
})

const mockRow: SchoolCostRow = {
    school: 'test', year: '26/27',
    appFee: null, entFee: null, deposit: null,
    preK: 300, k1: 320, k2: 340, k3: 360,
    g1: null, g2: null, g3: null, g4: null, g5: null, g6: null,
    g7: null, g8: null, g9: null, g10: null, g11: null, g12: null,
    primary: null, secondary: null, total: null,
}

describe('computeSpanCost', () => {
    it('shouldReturnSumOfGrades_whenRangeIsValid', () => {
        expect(computeSpanCost(mockRow, 'preK', 'k2')).toBe(960) // 300 + 320 + 340
    })

    it('shouldIncludeRentForFullSpan_whenMonthlyRentProvided', () => {
        // pre-k to k2 = 3 years, rent = 100/mo → 100 * 12 * 3 = 3600
        expect(computeSpanCost(mockRow, 'preK', 'k2', 100)).toBe(4560) // 960 + 3600
    })

    it('shouldReturnNull_whenFromGradeExceedsToGrade', () => {
        expect(computeSpanCost(mockRow, 'k2', 'preK')).toBeNull()
    })

    it('shouldReturnNull_whenAllGradesInRangeAreNull', () => {
        expect(computeSpanCost(mockRow, 'g1', 'g3')).toBeNull()
    })

    it('shouldIncludeAppAndEntFeeButNotDeposit_whenFeesPresent', () => {
        const rowWithFees: SchoolCostRow = { ...mockRow, appFee: 10, entFee: 75, deposit: 50 }
        // 960 grades + 10 app + 75 ent = 1045 (deposit excluded)
        expect(computeSpanCost(rowWithFees, 'preK', 'k2')).toBe(1045)
    })

    it('shouldExcludeEntFee_whenIncludeEntFeeIsFalse', () => {
        const rowWithFees: SchoolCostRow = { ...mockRow, appFee: 10, entFee: 75, deposit: 50 }
        // 960 grades + 10 app = 970
        expect(computeSpanCost(rowWithFees, 'preK', 'k2', 0, false)).toBe(970)
    })
})