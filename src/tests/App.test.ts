import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import App from '../App.svelte'

describe('App', () => {
    it('shouldRenderNavigation_whenMounted', () => {
        const { getByText } = render(App)

        expect(getByText('Compound interest')).toBeInTheDocument()
        expect(getByText('Compound interest with monthly contribution')).toBeInTheDocument()
        expect(getByText('Compound annual growth rate')).toBeInTheDocument()
        expect(getByText('Gross net wage')).toBeInTheDocument()
        expect(getByText('Random green grid')).toBeInTheDocument()
        expect(getByText('Counter')).toBeInTheDocument()
    })

    it('shouldShowRandomGreenGrid_whenDefaultMenu', async () => {
        const { container } = render(App)
        await new Promise(r => setTimeout(r, 0))

        // Default menu is 5 (RandomGreenGrid)
        const table = container.querySelector('table')
        expect(table).toBeInTheDocument()
    })

    it('shouldSwitchToCounter_whenCounterLinkClicked', async () => {
        const { getByText } = render(App)

        await fireEvent.click(getByText('Counter'))
        await new Promise(r => setTimeout(r, 0))

        expect(getByText('count is 0')).toBeInTheDocument()
    })

    it('shouldSwitchToCompoundInterest_whenLinkClicked', async () => {
        const { getByText, container } = render(App)

        await fireEvent.click(getByText('Compound interest'))
        await new Promise(r => setTimeout(r, 0))

        expect(container.textContent).toContain('seed capital')
    })
})
