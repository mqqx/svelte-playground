import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Sudoku from '../lib/components/Sudoku.svelte'

function emptyCell(cells: HTMLElement[]) {
    const cell = cells.find(c => c.textContent === '')
    if (!cell) throw new Error('no empty cell')
    return cell
}

describe('Sudoku', () => {
    it('shouldRenderEightyOneCells_whenMounted', () => {
        const { getAllByRole } = render(Sudoku)
        expect(getAllByRole('gridcell')).toHaveLength(81)
    })

    it('shouldFillSelectedCell_whenNumberPadClicked', async () => {
        const { getAllByRole, getByRole } = render(Sudoku)
        const cell = emptyCell(getAllByRole('gridcell'))

        await fireEvent.click(cell)
        await fireEvent.click(getByRole('button', { name: '4' }))
        expect(cell).toHaveTextContent('4')

        await fireEvent.click(getByRole('button', { name: 'Erase' }))
        expect(cell).toHaveTextContent('')
    })

    it('shouldFillSelectedCell_whenDigitKeyPressed', async () => {
        const { getAllByRole, getByRole } = render(Sudoku)
        const cell = emptyCell(getAllByRole('gridcell'))

        await fireEvent.click(cell)
        await fireEvent.keyDown(getByRole('grid'), { key: '7' })
        expect(cell).toHaveTextContent('7')
    })

    it('shouldNotChangeGivenCell_whenNumberEntered', async () => {
        const { getAllByRole, getByRole } = render(Sudoku)
        const cell = getAllByRole('gridcell').find(c => c.textContent !== '')!
        const original = cell.textContent

        await fireEvent.click(cell)
        await fireEvent.keyDown(getByRole('grid'), { key: 'Backspace' })
        expect(cell).toHaveTextContent(original!)
    })

    it('shouldShowSolvedMessage_whenRevealClicked', async () => {
        const { getAllByRole, getByRole, getByText } = render(Sudoku)

        await fireEvent.click(getByRole('button', { name: 'Reveal' }))
        expect(getAllByRole('gridcell').every(c => /^[1-9]$/.test(c.textContent ?? ''))).toBe(true)
        expect(getByText('Solved!')).toBeInTheDocument()
    })
})
