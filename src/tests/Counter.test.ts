import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Counter from '../lib/components/Counter.svelte'

describe('Counter', () => {
    it('shouldRenderWithZero_whenMounted', () => {
        const { getByRole } = render(Counter)
        expect(getByRole('button')).toHaveTextContent('count is 0')
    })

    it('shouldIncrement_whenButtonClicked', async () => {
        const { getByRole } = render(Counter)
        const button = getByRole('button')

        await fireEvent.click(button)
        expect(button).toHaveTextContent('count is 1')

        await fireEvent.click(button)
        expect(button).toHaveTextContent('count is 2')
    })
})
