import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import App from '../App.svelte'

describe('App', () => {
    it('shouldRenderNavigation_whenMounted', () => {
        const { getByText } = render(App)

        expect(getByText('Compound Interest')).toBeInTheDocument()
        expect(getByText('Compound Interest with Monthly Contribution')).toBeInTheDocument()
        expect(getByText('Compound Annual Growth Rate')).toBeInTheDocument()
        expect(getByText('Gross Net Wage')).toBeInTheDocument()
        expect(getByText('Random Green Grid')).toBeInTheDocument()
        expect(getByText('Counter')).toBeInTheDocument()
    })

    it('shouldShowRandomGreenGrid_whenDefaultMenu', async () => {
        const { container } = render(App)
        await new Promise(r => setTimeout(r, 0))

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

        await fireEvent.click(getByText('Compound Interest'))
        await new Promise(r => setTimeout(r, 0))

        expect(container.textContent).toContain('seed capital')
    })
})
