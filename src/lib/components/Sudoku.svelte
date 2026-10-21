<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity'
    import { clues, conflicts, generate, isPeer, isSolved, SIZE, type Difficulty } from '../utils/sudoku'

    const difficulties = Object.keys(clues) as Difficulty[]

    let difficulty: Difficulty = $state('easy')
    let solution: number[] = $state([])
    let given: number[] = $state([])
    let grid: number[] = $state([])
    let selected: number | null = $state(null)
    let checked = new SvelteSet<number>()

    const clashing = $derived(conflicts(grid))
    const solved = $derived(grid.length > 0 && isSolved(grid, solution))
    const remaining = $derived(grid.filter(v => v === 0).length)

    function newGame() {
        const game = generate(difficulty)
        solution = game.solution
        given = game.puzzle
        grid = [...game.puzzle]
        selected = null
        checked.clear()
    }

    newGame()

    function enter(value: number) {
        if (selected === null || given[selected] !== 0 || solved) return
        grid[selected] = value
        checked.delete(selected)
    }

    function check() {
        checked.clear()
        grid.forEach((value, i) => {
            if (value !== 0 && given[i] === 0 && value !== solution[i]) checked.add(i)
        })
    }

    function reveal() {
        grid = [...solution]
        checked.clear()
    }

    function onkeydown(event: KeyboardEvent) {
        if (selected === null) return
        const moves: Record<string, number> = { ArrowUp: -SIZE, ArrowDown: SIZE, ArrowLeft: -1, ArrowRight: 1 }
        if (event.key in moves) {
            event.preventDefault()
            selected = (selected + moves[event.key] + SIZE * SIZE) % (SIZE * SIZE)
        } else if (/^[1-9]$/.test(event.key)) {
            enter(Number(event.key))
        } else if (['0', 'Backspace', 'Delete'].includes(event.key)) {
            enter(0)
        }
    }

    function cellClass(i: number) {
        return {
            given: given[i] !== 0,
            selected: selected === i,
            peer: selected !== null && isPeer(selected, i),
            same: selected !== null && grid[selected] !== 0 && grid[i] === grid[selected],
            conflict: clashing.has(i),
            wrong: checked.has(i),
        }
    }
</script>

<div class="toolbar">
    <label>
        Difficulty
        <select bind:value={difficulty} onchange={newGame}>
            {#each difficulties as d}
                <option value={d}>{d}</option>
            {/each}
        </select>
    </label>
    <button onclick={newGame}>New game</button>
    <button onclick={check} disabled={solved}>Check</button>
    <button onclick={reveal} disabled={solved}>Reveal</button>
</div>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="board" role="grid" aria-label="Sudoku board" tabindex="0" {onkeydown}>
    {#each grid as value, i}
        <button
            class={['cell', cellClass(i)]}
            class:box-right={i % SIZE === 2 || i % SIZE === 5}
            class:box-bottom={Math.floor(i / SIZE) === 2 || Math.floor(i / SIZE) === 5}
            role="gridcell"
            aria-label="Row {Math.floor(i / SIZE) + 1}, column {(i % SIZE) + 1}"
            aria-selected={selected === i}
            onclick={() => selected = i}
        >{value || ''}</button>
    {/each}
</div>

<div class="pad">
    {#each Array.from({ length: SIZE }, (_, n) => n + 1) as n}
        <button onclick={() => enter(n)}>{n}</button>
    {/each}
    <button onclick={() => enter(0)} aria-label="Erase">⌫</button>
</div>

{#if solved}
    <p class="status"><b>Solved!</b> Start a new game to play again.</p>
{:else}
    <p class="status">{remaining} cells left{clashing.size ? ` · ${clashing.size} conflicting` : ''}</p>
{/if}

<style>
    .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0 1rem;
    }

    .toolbar label {
        margin-right: auto;
    }

    .toolbar select {
        text-transform: capitalize;
        margin-left: 0.4rem;
    }

    .toolbar button,
    .pad button {
        background: #1e1e2e;
        color: #cdd6f4;
        border: 1px solid #45475a;
        border-radius: 6px;
        padding: 0.35rem 0.8rem;
        font-size: 0.9rem;
    }

    .toolbar button:hover:not(:disabled),
    .pad button:hover {
        background: #45475a;
    }

    .toolbar button:disabled {
        opacity: 0.5;
        cursor: default;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        width: min(100%, 27rem);
        aspect-ratio: 1;
        margin: 0 auto;
        border: 2px solid #a6adc8;
        border-radius: 4px;
        overflow: hidden;
        outline: none;
    }

    .board:focus-visible {
        border-color: #1e66f5;
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-right: 1px solid #45475a;
        border-bottom: 1px solid #45475a;
        background: #1e1e2e;
        color: #89b4fa;
        font-size: clamp(1rem, 4vw, 1.4rem);
        padding: 0;
        aspect-ratio: 1;
    }

    .cell.box-right {
        border-right: 2px solid #a6adc8;
    }

    .cell.box-bottom {
        border-bottom: 2px solid #a6adc8;
    }

    .cell.given {
        color: #cdd6f4;
        font-weight: 600;
    }

    .cell.peer {
        background: #262637;
    }

    .cell.same {
        background: #2f3550;
    }

    .cell.selected {
        background: #1e66f5;
        color: #fff;
    }

    .cell.conflict,
    .cell.wrong {
        color: #f38ba8;
    }

    .cell.wrong {
        text-decoration: line-through;
    }

    .pad {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 0.3rem;
        width: min(100%, 27rem);
        margin: 1rem auto 0;
    }

    .pad button {
        padding: 0.45rem 0;
        font-size: 1rem;
    }

    .status {
        text-align: center;
    }
</style>
