import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import RandomGreenGrid from '../lib/components/RandomGreenGrid.svelte'

describe('RandomGreenGrid', () => {
    it('shouldDisplayInputs_whenRendered', () => {
        const { container } = render(RandomGreenGrid)
        const inputs = container.querySelectorAll('input[type="number"]')

        // x, y, random number from, random number to
        expect(inputs.length).toBe(4)
    })

    it('shouldRenderGrid_whenMounted', async () => {
        const { container } = render(RandomGreenGrid)

        // Wait for $effect to run
        await new Promise(r => setTimeout(r, 0))

        const rows = container.querySelectorAll('tr')
        const cells = container.querySelectorAll('td')

        // Default is 20x20
        expect(rows.length).toBe(20)
        expect(cells.length).toBe(400)
    })

    it('shouldApplyGreenBackground_whenCellsRendered', async () => {
        const { container } = render(RandomGreenGrid)
        await new Promise(r => setTimeout(r, 0))

        const firstCell = container.querySelector('td')
        expect(firstCell?.style.backgroundColor).toMatch(/rgb\(0, \d+, 0\)/)
    })
})
