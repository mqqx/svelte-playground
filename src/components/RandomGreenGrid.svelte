<script>
    let x = 20
    let y = 20
    let randomNumberIntervalStart = 1
    let randomNumberIntervalEnd = 100
    let grid = []

    $: populateNumbers(x, y, randomNumberIntervalStart, randomNumberIntervalEnd)

    function populateNumbers(rows, columns, start, end) {
        grid = []
        for (let i = 0 ; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < columns; j++) {
                grid[i][j] = randomNumber(start, end);
            }
        }
    }

    function randomGreenColor(randomValue) {
        let greenValue = Math.floor((randomValue - randomNumberIntervalStart) / (randomNumberIntervalEnd - randomNumberIntervalStart)*155) + 100
        return 'rgb(0,' + greenValue + ',0)'
    }

    function randomNumber(start, end) {
        return Math.floor(Math.random() * end) + start
    }
</script>

<p>
    <label>
        x
        <input type=number bind:value={x} min=1>
    </label>
    <label>
        y
        <input type=number bind:value={y} min=1>
    </label>
    <label>
        random number from
        <input type=number bind:value={randomNumberIntervalStart} min=1>
    </label>
    <label>
        random number to
        <input type=number bind:value={randomNumberIntervalEnd} min=1>
    </label>
</p>

<table>
    {#each Array(x) as _, i}
        <tr>
            {#each Array(y) as _, j}
                <td style="background-color: {randomGreenColor(grid[i][j])}">{grid[i][j]}</td>
            {/each}
        </tr>
    {/each}
</table>
