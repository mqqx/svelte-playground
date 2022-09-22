<script lang="ts">
    let x: number = 20
    let y: number = 20
    let randomNumberIntervalStart: number = 1
    let randomNumberIntervalEnd: number = 100
    let grid: number[][] = []

    $: populateNumbers(x, y, randomNumberIntervalStart, randomNumberIntervalEnd)

    function populateNumbers(rows: number, columns: number, start: number, end: number) {
        grid = []
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < columns; j++) {
                grid[i][j] = randomNumber(start, end);
            }
        }
    }

    function randomGreenColor(randomValue: number) {
        let greenValue = Math.floor((randomValue - randomNumberIntervalStart) / (randomNumberIntervalEnd - randomNumberIntervalStart) * 155) + 100
        return 'rgb(0,' + greenValue + ',0)'
    }

    function randomNumber(start: number, end: number) {
        return Math.floor(Math.random() * end) + start
    }
</script>

<p>
	<label>
		x
		<input type=number bind:value={x} min=1>
	</label>
</p>
<p>
	<label>
		y
		<input type=number bind:value={y} min=1>
	</label>
</p>
<p>
	<label>
		random number from
		<input type=number bind:value={randomNumberIntervalStart} min=1>
	</label>
</p>
<p>
	<label>
		random number to
		<input type=number bind:value={randomNumberIntervalEnd} min=1>
	</label>
</p>

<div>
	<table class="table-center">
		{#each Array(x) as _, i}
			<tr>
				{#each Array(y) as _, j}
					<td style="background-color: {randomGreenColor(grid[i][j])}">{grid[i][j]}</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>
