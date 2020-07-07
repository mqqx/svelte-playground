<script>
    import { afterUpdate } from 'svelte'
    import { format, roundTotal } from './format-utils';

    let seedCapital = 20000
    let monthlyDeposit = 2000
    let years = 20
    let annualInterestRate = 5
    let equity = 0
    let roundedTotal = 0
    let tax = 18.4625
    let netAfterTax = 0

    function calculateTotal() {
        let monthlyInterestRateFraction = annualInterestRate / 100 / 12
        let months = years * 12
        let compoundInterestFactor = Math.pow(1 + monthlyInterestRateFraction, months)
        let compoundedSeedCapital = seedCapital * compoundInterestFactor
        let compoundedMonthlyDeposit = monthlyDeposit * (compoundInterestFactor - 1) / monthlyInterestRateFraction;
        let total = compoundedSeedCapital + compoundedMonthlyDeposit
        return roundTotal(total)
    }

    function calculateEquity() {
        equity = seedCapital + monthlyDeposit * 12 * years
    }

    function calculateNetAfterTax() {
        netAfterTax = roundTotal((roundedTotal - equity) * (1 - tax / 100) + equity)
    }

    afterUpdate(() => {
        roundedTotal = calculateTotal()
        calculateEquity()
        calculateNetAfterTax()
    })
</script>

<label>
    seed capital
    <input type=number bind:value={seedCapital} min=0 max=1000000>
    <input type=range bind:value={seedCapital} min=0 max=1000000>
</label>

<label>
    monthly deposit
    <input type=number bind:value={monthlyDeposit} min=10 max=100000 step=10>
    <input type=range bind:value={monthlyDeposit} min=10 max=100000 step=10>
</label>

<label>
    interest rate
    <input type=number bind:value={annualInterestRate} min=0 max=50 step=0.1>
    <input type=range bind:value={annualInterestRate} min=0 max=50 step=0.1>
</label>

<label>
    years
    <input type=number bind:value={years} min=1 max=50>
    <input type=range bind:value={years} min=1 max=50>
</label>

<p>{format(seedCapital)} € with {annualInterestRate}% interest rate
    and {format(monthlyDeposit)} € monthly deposit, over {years} years
    = {format(roundedTotal)} €</p>

<p> After {format(tax)}% tax on the profits this comes down to {format(netAfterTax)} € net with an equity
    of {format(equity)} € </p>
