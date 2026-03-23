<script lang="ts">
    import NumberRangeInput from '../inputs/NumberRangeInput.svelte'
    import { format, roundTotal } from '../utils/format-utils'
    import { store } from '../utils/store.svelte'

    const interestRateFraction = $derived(store.interestRate / 100)
    const compoundInterestFactor = $derived(Math.pow(1 + interestRateFraction, store.years))
    const total = $derived(roundTotal(store.seedCapital * compoundInterestFactor))
</script>

<NumberRangeInput label="seed capital" bind:value={store.seedCapital} min={0} max={1000000} unit="€" />
<NumberRangeInput label="interest rate" bind:value={store.interestRate} min={0} max={50} step={0.1} unit="%" />
<NumberRangeInput label="years" bind:value={store.years} min={1} max={100} />

<p>{format(store.seedCapital)} €
    with {format(store.interestRate)}% interest rate
    over {store.years} years
    = <b>{format(total)}</b> €</p>
