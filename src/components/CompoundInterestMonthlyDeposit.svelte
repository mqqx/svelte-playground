<script>
    import YearInput from '../inputs/YearInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import { format, roundTotal } from './../utils/format-utils'
    import { seedCapital } from './../store.js'
    import { years } from './../store.js'

    let monthlyDeposit = 2000
    let annualInterestRate = 5
    let tax = 18.4625

    $: months = $years * 12
    $: equity = $seedCapital + monthlyDeposit * months
    $: monthlyInterestRateFraction = annualInterestRate / 100 / 12
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

<label>
    interest rate
    <input type=number bind:value={annualInterestRate} min=0 max=50 step=0.1> %
    <input type=range bind:value={annualInterestRate} min=0 max=50 step=0.1>
</label>

<YearInput/>

<p>{format($seedCapital)} € with {annualInterestRate}% interest rate
    and {format(monthlyDeposit)} € monthly deposit, over {$years} years
    = <b>{format(roundedTotal)} €</b></p>

<p> After {format(tax)}% tax on the profits
    this comes down to <b>{format(netAfterTax)} € net</b>
    with an equity of {format(equity)} € </p>
