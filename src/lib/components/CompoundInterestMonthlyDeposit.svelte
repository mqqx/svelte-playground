<script lang="ts">
    import InterestRateInput from '../inputs/InterestRateInput.svelte'
    import MonthlyDepositInput from '../inputs/MonthlyDepositInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
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

<SeedCapitalInput/>
<MonthlyDepositInput/>
<InterestRateInput/>
<YearInput/>

<p>{format(store.seedCapital)} € with {format(store.interestRate)}% interest rate
    and {format(store.monthlyDeposit)} € monthly deposit, over {store.years} years
    = <b>{format(roundedTotal)} €</b></p>

<p> After {format(tax)}% tax on the profits
    this comes down to <b>{format(netAfterTax)} € net</b>
    with an equity of {format(equity)} € </p>
