import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/svelte'
import CompoundAnnualGrowthRate from '../lib/components/CompoundAnnualGrowthRate.svelte'
import { store } from '../lib/utils/store.svelte'

describe('CompoundAnnualGrowthRate', () => {
    beforeEach(() => {
        store.years = 20
    })

    it('shouldDisplayInputs_whenRendered', () => {
        const { container } = render(CompoundAnnualGrowthRate)
        const inputs = container.querySelectorAll('input')

        // start price (number + range), end price (number + range), years (number + range)
        expect(inputs.length).toBe(6)
    })

    it('shouldSetYearsFromCurrentYear_whenMounted', () => {
        render(CompoundAnnualGrowthRate)
        const expectedYears = new Date().getFullYear() - 1993
        expect(store.years).toBe(expectedYears)
    })

    it('shouldCalculateCAGR_whenDefaultValues', () => {
        const { container } = render(CompoundAnnualGrowthRate)
        const text = container.querySelector('p:last-of-type')?.textContent

        // With start=93.68, end=357.33 over N years, should show a percentage
        expect(text).toContain('93.68')
        expect(text).toContain('357.33')
        expect(text).toContain('%')
    })
})
