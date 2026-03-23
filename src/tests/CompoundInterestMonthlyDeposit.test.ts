import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/svelte'
import CompoundInterestMonthlyDeposit from '../lib/components/CompoundInterestMonthlyDeposit.svelte'
import { store } from '../lib/utils/store.svelte'

describe('CompoundInterestMonthlyDeposit', () => {
    beforeEach(() => {
        store.seedCapital = 20000
        store.monthlyDeposit = 2000
        store.interestRate = 5
        store.years = 20
        store.isGermanNumberFormat = false
    })

    it('shouldDisplayAllInputs_whenRendered', () => {
        const { container } = render(CompoundInterestMonthlyDeposit)
        const inputs = container.querySelectorAll('input')

        // seed capital, monthly deposit, interest rate, years (each number + range)
        expect(inputs.length).toBe(8)
    })

    it('shouldCalculateCompoundTotal_whenDefaultValues', async () => {
        const { container } = render(CompoundInterestMonthlyDeposit)
        await new Promise(r => setTimeout(r, 0))

        const paragraphs = container.querySelectorAll('p')
        // First result paragraph (after 4 input paragraphs)
        const totalText = paragraphs[4]?.textContent

        expect(totalText).toContain('20,000')
        expect(totalText).toContain('2,000')
        expect(totalText).toContain('20 years')
    })

    it('shouldCalculateNetAfterTax_whenDefaultValues', async () => {
        const { container } = render(CompoundInterestMonthlyDeposit)
        await new Promise(r => setTimeout(r, 0))

        const paragraphs = container.querySelectorAll('p')
        // Tax paragraph is the last one
        const taxText = paragraphs[paragraphs.length - 1]?.textContent

        expect(taxText).toContain('18.46')
        expect(taxText).toContain('net')
        expect(taxText).toContain('equity')
    })
})
