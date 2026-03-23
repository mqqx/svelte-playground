<script lang="ts">
    import NumberRangeInput from '../inputs/NumberRangeInput.svelte'
    import { format, roundTotal } from '../utils/format-utils'
    import { store } from '../utils/store.svelte'

    const tax = 18.4625

    const months = $derived(store.years * 12)
    const equity = $derived(store.seedCapital + store.monthlyDeposit * months)
    const monthlyInterestRateFraction = $derived(store.interestRate / 100 / 12)
    const compoundInterestFactor = $derived(Math.pow(1 + monthlyInterestRateFraction, months))
    const compoundedSeedCapital = $derived(store.seedCapital * compoundInterestFactor)
    const compoundedMonthlyDeposit = $derived(store.monthlyDeposit * (compoundInterestFactor - 1) / monthlyInterestRateFraction)
    const roundedTotal = $derived(roundTotal(compoundedSeedCapital + compoundedMonthlyDeposit))
    const netAfterTax = $derived(roundTotal((roundedTotal - equity) * (1 - tax / 100) + equity))
</script>

<NumberRangeInput label="seed capital" bind:value={store.seedCapital} min={0} max={1000000} unit="€" />
<NumberRangeInput label="monthly deposit" bind:value={store.monthlyDeposit} min={10} max={100000} step={5} unit="€" />
<NumberRangeInput label="interest rate" bind:value={store.interestRate} min={0} max={50} step={0.1} unit="%" />
<NumberRangeInput label="years" bind:value={store.years} min={1} max={100} />

<p>{format(store.seedCapital)} € with {format(store.interestRate)}% interest rate
    and {format(store.monthlyDeposit)} € monthly deposit, over {store.years} years
    = <b>{format(roundedTotal)} €</b></p>

<p> After {format(tax)}% tax on the profits
    this comes down to <b>{format(netAfterTax)} € net</b>
    with an equity of {format(equity)} € </p>
