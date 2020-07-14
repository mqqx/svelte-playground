<script>
    import InterestRateInput from '../inputs/InterestRateInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import { format, roundTotal } from './../utils/format-utils'
    import { interestRate, seedCapital, years } from './../store.js'

    let monthlyDeposit = 2000
    let tax = 18.4625

    $: months = $years * 12
    $: equity = $seedCapital + monthlyDeposit * months
    $: monthlyInterestRateFraction = $interestRate / 100 / 12
    $: compoundInterestFactor = Math.pow(1 + monthlyInterestRateFraction, months)
    $: compoundedSeedCapital = $seedCapital * compoundInterestFactor
    $: compoundedMonthlyDeposit = monthlyDeposit * (compoundInterestFactor - 1) / monthlyInterestRateFraction;
    $: roundedTotal = roundTotal(compoundedSeedCapital + compoundedMonthlyDeposit)
    $: netAfterTax = roundTotal((roundedTotal - equity) * (1 - tax / 100) + equity)
</script>

<SeedCapitalInput/>

<label>
    monthly deposit
    <input type=number bind:value={monthlyDeposit} min=10 max=100000 step=10> €
    <input type=range bind:value={monthlyDeposit} min=10 max=100000 step=10>
</label>

<InterestRateInput/>

<YearInput/>

<p>{format($seedCapital)} € with {format($interestRate)}% interest rate
    and {format(monthlyDeposit)} € monthly deposit, over {$years} years
    = <b>{format(roundedTotal)} €</b></p>

<p> After {format(tax)}% tax on the profits
    this comes down to <b>{format(netAfterTax)} € net</b>
    with an equity of {format(equity)} € </p>
