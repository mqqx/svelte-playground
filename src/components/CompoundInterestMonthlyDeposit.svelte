<script>
    import InterestRateInput from '../inputs/InterestRateInput.svelte'
    import MonthlyDepositInput from '../inputs/MonthlyDepositInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
    import { format, roundTotal } from './../utils/format-utils'
    import { interestRate, monthlyDeposit, seedCapital, years } from './../store.js'

    let tax = 18.4625

    $: months = $years * 12
    $: equity = $seedCapital + $monthlyDeposit * months
    $: monthlyInterestRateFraction = $interestRate / 100 / 12
    $: compoundInterestFactor = Math.pow(1 + monthlyInterestRateFraction, months)
    $: compoundedSeedCapital = $seedCapital * compoundInterestFactor
    $: compoundedMonthlyDeposit = $monthlyDeposit * (compoundInterestFactor - 1) / monthlyInterestRateFraction;
    $: roundedTotal = roundTotal(compoundedSeedCapital + compoundedMonthlyDeposit)
    $: netAfterTax = roundTotal((roundedTotal - equity) * (1 - tax / 100) + equity)
</script>

<SeedCapitalInput/>
<MonthlyDepositInput/>
<InterestRateInput/>
<YearInput/>

<p>{format($seedCapital)} € with {format($interestRate)}% interest rate
    and {format($monthlyDeposit)} € monthly deposit, over {$years} years
    = <b>{format(roundedTotal)} €</b></p>

<p> After {format(tax)}% tax on the profits
    this comes down to <b>{format(netAfterTax)} € net</b>
    with an equity of {format(equity)} € </p>
