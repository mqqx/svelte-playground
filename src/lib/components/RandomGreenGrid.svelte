<script lang="ts">
    import NumberRangeInput from '../inputs/NumberRangeInput.svelte'

    let x = $state(20)
    let y = $state(20)
    let randomNumberIntervalStart = $state(1)
    let randomNumberIntervalEnd = $state(100)
    let grid: number[][] = $state([])

    $effect(() => {
        populateNumbers(x, y, randomNumberIntervalStart, randomNumberIntervalEnd)
    })

    function populateNumbers(rows: number, columns: number, start: number, end: number) {
        const newGrid: number[][] = []
        for (let i = 0; i < rows; i++) {
            newGrid[i] = [];
            for (let j = 0; j < columns; j++) {
                newGrid[i][j] = randomNumber(start, end);
            }
        }
        grid = newGrid
    }

    function randomGreenColor(randomValue: number) {
        let greenValue = Math.floor((randomValue - randomNumberIntervalStart) / (randomNumberIntervalEnd - randomNumberIntervalStart) * 155) + 100
        return 'rgb(0,' + greenValue + ',0)'
    }

    function randomNumber(start: number, end: number) {
        return Math.floor(Math.random() * end) + start
    }
</script>

<NumberRangeInput label="x" bind:value={x} min={1} max={100} />
<NumberRangeInput label="y" bind:value={y} min={1} max={100} />
<NumberRangeInput label="random number from" bind:value={randomNumberIntervalStart} min={1} max={10000} />
<NumberRangeInput label="random number to" bind:value={randomNumberIntervalEnd} min={1} max={10000} />

<div>
	<table class="table-center">
		<tbody>
			{#each Array(x) as _, i}
				<tr>
					{#each Array(y) as _, j}
						<td style="background-color: {randomGreenColor(grid[i]?.[j] ?? 0)}">{grid[i]?.[j] ?? 0}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
