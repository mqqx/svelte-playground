import { describe, it, expect } from 'vitest'
import { clues, conflicts, countSolutions, generate, isPeer, isSolved, solve } from '../lib/utils/sudoku'

// deterministic PRNG (mulberry32) so generated puzzles are reproducible
function seeded(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function isValidSolution(grid: number[]) {
    return grid.every(v => v >= 1 && v <= 9) && conflicts(grid).size === 0
}

describe('sudoku', () => {
    it('shouldGenerateValidSolution_whenGeneratingPuzzle', () => {
        const { solution } = generate('easy', seeded(1))
        expect(isValidSolution(solution)).toBe(true)
    })

    it('shouldKeepGivensFromSolution_whenGeneratingPuzzle', () => {
        const { puzzle, solution } = generate('medium', seeded(2))
        puzzle.forEach((value, i) => {
            if (value !== 0) expect(value).toBe(solution[i])
        })
    })

    it('shouldHaveUniqueSolution_whenGeneratingPuzzle', () => {
        const { puzzle, solution } = generate('hard', seeded(3))
        expect(countSolutions([...puzzle])).toBe(1)
        expect(solve(puzzle)).toEqual(solution)
    })

    it('shouldLeaveAtLeastClueCount_whenGeneratingPuzzle', () => {
        const { puzzle } = generate('easy', seeded(4))
        expect(puzzle.filter(v => v !== 0).length).toBeGreaterThanOrEqual(clues.easy)
    })

    it('shouldFlagBothCells_whenRowHasDuplicate', () => {
        const grid = Array(81).fill(0)
        grid[0] = 5
        grid[8] = 5
        expect(conflicts(grid)).toEqual(new Set([0, 8]))
    })

    it('shouldFlagBothCells_whenBoxHasDuplicate', () => {
        const grid = Array(81).fill(0)
        grid[0] = 3
        grid[20] = 3
        expect(conflicts(grid)).toEqual(new Set([0, 20]))
    })

    it('shouldReturnNoConflicts_whenValuesAreNotPeers', () => {
        const grid = Array(81).fill(0)
        grid[0] = 7
        grid[40] = 7
        expect(conflicts(grid).size).toBe(0)
    })

    it('shouldTreatSameRowColumnAndBoxAsPeers_whenComparingCells', () => {
        expect(isPeer(0, 8)).toBe(true)
        expect(isPeer(0, 72)).toBe(true)
        expect(isPeer(0, 20)).toBe(true)
        expect(isPeer(0, 40)).toBe(false)
        expect(isPeer(0, 0)).toBe(false)
    })

    it('shouldReturnNull_whenPuzzleIsUnsolvable', () => {
        const grid = Array(81).fill(0)
        grid[0] = 1
        grid[1] = 1
        expect(solve(grid)).toBeNull()
    })

    it('shouldReportSolved_whenGridMatchesSolution', () => {
        const { puzzle, solution } = generate('easy', seeded(5))
        expect(isSolved(puzzle, solution)).toBe(false)
        expect(isSolved([...solution], solution)).toBe(true)
    })
})
