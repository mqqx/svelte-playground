import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/svelte'
import CompoundInterest from '../lib/components/CompoundInterest.svelte'
import { store } from '../lib/utils/store.svelte'

describe('CompoundInterest', () => {
    beforeEach(() => {
        store.seedCapital = 20000
        store.interestRate = 5
        store.years = 20
        store.isGermanNumberFormat = false
    })

    it('shouldCalculateCompoundInterest_whenDefaultValues', async () => {
        const { container } = render(CompoundInterest)
        await new Promise(r => setTimeout(r, 0))

        const paragraphs = container.querySelectorAll('p')
        const resultText = paragraphs[paragraphs.length - 1]?.textContent

        // 20000 * (1.05)^20 = 53065.95
        expect(resultText).toContain('53,065.95')
    })

    it('shouldDisplayInputs_whenRendered', () => {
        const { container } = render(CompoundInterest)
        const inputs = container.querySelectorAll('input')

        // seed capital (number + range), interest rate (number + range), years (number + range)
        expect(inputs.length).toBe(6)
    })

    it('shouldRecalculate_whenStoreValuesChange', async () => {
        const { container } = render(CompoundInterest)

        store.seedCapital = 10000
        store.interestRate = 10
        store.years = 10

        await new Promise(r => setTimeout(r, 0))

        const paragraphs = container.querySelectorAll('p')
        const resultText = paragraphs[paragraphs.length - 1]?.textContent

        // 10000 * (1.10)^10 = 25937.42
        expect(resultText).toContain('25,937.42')
    })
})
