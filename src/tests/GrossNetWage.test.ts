import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import GrossNetWage from '../lib/components/GrossNetWage.svelte'
import { store } from '../lib/utils/store.svelte'

describe('GrossNetWage', () => {
    it('shouldDisplaySalaryInput_whenRendered', () => {
        store.isGermanNumberFormat = false
        const { container } = render(GrossNetWage)
        const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement

        expect(numberInput).toBeTruthy()
        expect(numberInput.value).toBe('40000')
    })

    it('shouldDisplayTaxCategorySelect_whenRendered', () => {
        const { container } = render(GrossNetWage)
        const select = container.querySelector('select')
        const options = container.querySelectorAll('option')

        expect(select).toBeTruthy()
        expect(options.length).toBe(6)
    })

    it('shouldCalculateNetSalary_whenDefaultSalary', () => {
        store.isGermanNumberFormat = false
        const { container } = render(GrossNetWage)
        const text = container.querySelector('p:last-of-type')?.textContent

        // 40000 salary, should calculate tax and show net
        expect(text).toContain('40,000')
        expect(text).toContain('net')
    })

    it('shouldReturnZeroTax_whenSalaryBelowAllowance', async () => {
        store.isGermanNumberFormat = false
        const { container } = render(GrossNetWage)
        const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement

        await fireEvent.input(numberInput, { target: { value: '5000' } })
        await new Promise(r => setTimeout(r, 0))

        const text = container.querySelector('p:last-of-type')?.textContent
        // Below 9408 tax-free allowance, tax should be 0
        expect(text).toContain('5,000')
        expect(text).toContain('0 € tax')
    })
})
