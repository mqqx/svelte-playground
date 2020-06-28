<script>
    import { afterUpdate } from 'svelte'
    import { format } from './format-utils';

    let seedCapital = 20000
    let monthlyDeposit = 2000
    let years = 15
    let annualInterestRate = 5
    let roundedTotal = calculateTotal()

    function calculateTotal() {
        let monthlyInterestRateFraction = annualInterestRate / 100 / 12
        let months = years * 12
        let compoundInterestFactor = Math.pow(1 + monthlyInterestRateFraction, months)
        let compoundedSeedCapital = seedCapital * compoundInterestFactor
        let compoundedMonthlyDeposit = monthlyDeposit * (compoundInterestFactor - 1) / monthlyInterestRateFraction;
        let total = compoundedSeedCapital + compoundedMonthlyDeposit
        return roundTotal(total)
    }

    // TODO should be extracted
    function roundTotal(total) {
        return Math.round((total + Number.EPSILON) * 100) / 100
    }

    afterUpdate(() => {
        roundedTotal = calculateTotal()
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
