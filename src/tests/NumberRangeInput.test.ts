import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import NumberRangeInput from '../lib/inputs/NumberRangeInput.svelte'

describe('NumberRangeInput', () => {
    it('shouldRenderLabelAndInputs_whenMounted', () => {
        const { container, getByText } = render(NumberRangeInput, {
            props: { label: 'test label', value: 50, min: 0, max: 100 }
        })

        expect(getByText('test label')).toBeInTheDocument()
        const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement
        const rangeInput = container.querySelector('input[type="range"]') as HTMLInputElement
        expect(numberInput).toBeTruthy()
        expect(rangeInput).toBeTruthy()
    })

    it('shouldRespectMinMaxStep_whenRendered', () => {
        const { container } = render(NumberRangeInput, {
            props: { label: 'rate', value: 5, min: 0, max: 50, step: 0.1 }
        })

        const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement
        expect(numberInput.min).toBe('0')
        expect(numberInput.max).toBe('50')
        expect(numberInput.step).toBe('0.1')
    })

    it('shouldDisplayUnit_whenProvided', () => {
        const { container } = render(NumberRangeInput, {
            props: { label: 'price', value: 100, unit: '€' }
        })

        expect(container.textContent).toContain('€')
    })

    it('shouldNotDisplayUnit_whenNotProvided', () => {
        const { container } = render(NumberRangeInput, {
            props: { label: 'years', value: 10 }
        })

        const label = container.querySelector('label')
        expect(label?.textContent?.trim()).toMatch(/^years/)
    })
})
