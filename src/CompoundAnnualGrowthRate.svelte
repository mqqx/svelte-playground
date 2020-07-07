<script>
    import { afterUpdate } from 'svelte'
    import { format } from './format-utils';

    let startPrice = 93.68
    let endPrice = 357.33
    let currentYear = new Date().getFullYear()
    let years = currentYear - 1993
    let compoundAnnualGrowthRate = 5.00

    afterUpdate(() => {
        compoundAnnualGrowthRate = (Math.pow(endPrice / startPrice, 1 / years) - 1) * 100
    })
</script>

<label>
    start price
    <input type=number bind:value={startPrice} min=1 max=10000000 step=0.01>
    <input type=range bind:value={startPrice} min=1 max=10000000 step=0.01>
</label>

<label>
    end price
    <input type=number bind:value={endPrice} min=1 max=10000000 step=0.01>
    <input type=range bind:value={endPrice} min=1 max=10000000 step=0.01>
</label>

<label>
    years
    <input type=number bind:value={years} min=1 max=50>
    <input type=range bind:value={years} min=1 max=50>
</label>

<p>With a start price of {format(startPrice)} € and an end price of {format(endPrice)} € the average annual interest rate over {years}
    years is {format(compoundAnnualGrowthRate)}%</p>
