<script lang="ts">
    import NumberRangeInput from '../inputs/NumberRangeInput.svelte'
    import { format, formatCurrency, currencySymbol } from '../utils/format-utils'
    import { store } from '../utils/store.svelte'

    let startPrice = $state(93.68)
    let endPrice = $state(357.33)
    let currentYear = new Date().getFullYear()
    store.years = currentYear - 1993

    const compoundAnnualGrowthRate = $derived((Math.pow(endPrice / startPrice, 1 / store.years) - 1) * 100)
</script>

<NumberRangeInput label="start price" bind:value={startPrice} min={1} max={10000000} step={0.01} unit={currencySymbol()} />
<NumberRangeInput label="end price" bind:value={endPrice} min={1} max={10000000} step={0.01} unit={currencySymbol()} />
<NumberRangeInput label="years" bind:value={store.years} min={1} max={100} />

<p>With a start price of {formatCurrency(startPrice)}
	and an end price of {formatCurrency(endPrice)}
	the average annual interest rate over {store.years} years
	is <b>{format(compoundAnnualGrowthRate)}%</b></p>
