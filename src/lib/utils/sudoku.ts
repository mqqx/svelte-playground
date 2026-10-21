export type Grid = number[]

export type Difficulty = 'easy' | 'medium' | 'hard'

export const SIZE = 9
const BOX = 3

// number of given cells left on the board per difficulty
export const clues: Record<Difficulty, number> = {
    easy: 40,
    medium: 32,
    hard: 26,
}

export const row = (index: number) => Math.floor(index / SIZE)
export const col = (index: number) => index % SIZE
export const box = (index: number) => Math.floor(row(index) / BOX) * BOX + Math.floor(col(index) / BOX)

export function isPeer(a: number, b: number) {
    return a !== b && (row(a) === row(b) || col(a) === col(b) || box(a) === box(b))
}

export function canPlace(grid: Grid, index: number, value: number) {
    for (let i = 0; i < SIZE * SIZE; i++) {
        if (grid[i] === value && isPeer(index, i)) return false
    }
    return true
}

function shuffle<T>(items: T[], random: () => number) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]]
    }
    return items
}

const digits = () => Array.from({ length: SIZE }, (_, i) => i + 1)

// picks the empty cell with the fewest candidates, which keeps backtracking fast on sparse grids
function mostConstrained(grid: Grid) {
    let best: { index: number, values: number[] } | null = null
    for (let index = 0; index < grid.length; index++) {
        if (grid[index] !== 0) continue
        const values = digits().filter(value => canPlace(grid, index, value))
        if (!best || values.length < best.values.length) best = { index, values }
        if (values.length <= 1) break
    }
    return best
}

// counts solutions via backtracking, stopping early once `limit` is reached
export function countSolutions(grid: Grid, limit = 2): number {
    const cell = mostConstrained(grid)
    if (!cell) return 1

    let count = 0
    for (const value of cell.values) {
        grid[cell.index] = value
        count += countSolutions(grid, limit - count)
        grid[cell.index] = 0
        if (count >= limit) break
    }
    return count
}

export function solve(puzzle: Grid): Grid | null {
    if (conflicts(puzzle).size > 0) return null
    const grid = [...puzzle]
    const fill = (): boolean => {
        const cell = mostConstrained(grid)
        if (!cell) return true
        for (const value of cell.values) {
            grid[cell.index] = value
            if (fill()) return true
        }
        grid[cell.index] = 0
        return false
    }
    return fill() ? grid : null
}

function generateSolution(random: () => number): Grid {
    const grid: Grid = Array(SIZE * SIZE).fill(0)
    const fill = (index: number): boolean => {
        if (index === grid.length) return true
        for (const value of shuffle(digits(), random)) {
            if (!canPlace(grid, index, value)) continue
            grid[index] = value
            if (fill(index + 1)) return true
        }
        grid[index] = 0
        return false
    }
    fill(0)
    return grid
}

export function generate(difficulty: Difficulty, random: () => number = Math.random) {
    const solution = generateSolution(random)
    const puzzle = [...solution]
    let filled = puzzle.length

    // remove cells in random order, keeping only removals that preserve a unique solution
    for (const index of shuffle([...puzzle.keys()], random)) {
        if (filled <= clues[difficulty]) break
        const value = puzzle[index]
        puzzle[index] = 0
        if (countSolutions([...puzzle]) === 1) {
            filled--
        } else {
            puzzle[index] = value
        }
    }

    return { puzzle, solution }
}

// indices of filled cells that clash with a peer holding the same value
export function conflicts(grid: Grid) {
    const result = new Set<number>()
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 0) continue
        for (let j = i + 1; j < grid.length; j++) {
            if (grid[i] === grid[j] && isPeer(i, j)) {
                result.add(i)
                result.add(j)
            }
        }
    }
    return result
}

export function isSolved(grid: Grid, solution: Grid) {
    return grid.every((value, i) => value === solution[i])
}
