import { describe, it, expect } from 'vitest'
import { roundTotal } from '../lib/utils/format-utils'

describe('roundTotal', () => {
    it('shouldRoundToTwoDecimalPlaces_whenGivenFloat', () => {
        expect(roundTotal(1.005)).toBe(1.01)
        expect(roundTotal(1.004)).toBe(1)
        expect(roundTotal(123.456)).toBe(123.46)
    })

    it('shouldReturnWholeNumber_whenGivenInteger', () => {
        expect(roundTotal(100)).toBe(100)
        expect(roundTotal(0)).toBe(0)
    })

    it('shouldHandleNegativeNumbers_whenGivenNegativeInput', () => {
        expect(roundTotal(-1.005)).toBe(-1)
        expect(roundTotal(-123.456)).toBe(-123.46)
    })
})
