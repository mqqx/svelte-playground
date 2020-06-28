<script>
    import { afterUpdate } from 'svelte'
    import { format } from './format-utils';

    let seedCapital = 10000
    let years = 5
    let interestRate = 5
    let total = calculateTotal()

    function calculateTotal() {
        let interestRateFraction = interestRate / 100
        let compoundInterestFactor = Math.pow(1 + interestRateFraction, years)
        let total = seedCapital * compoundInterestFactor
        return roundTotal(total)
    }

    // TODO should be extracted
    function roundTotal(total) {
        return Math.round((total + Number.EPSILON) * 100) / 100
    }

    afterUpdate(() => {
        total = calculateTotal()
    })
</script>

<label>
    seed capital
    <input type=number bind:value={seedCapital} min=1 max=100000>
    <input type=range bind:value={seedCapital} min=1 max=100000>
</label>

<label>
    interest rate
    <input type=number bind:value={interestRate} min=0 max=50 step=0.1>
    <input type=range bind:value={interestRate} min=0 max=50 step=0.1>
</label>

<label>
    years
    <input type=number bind:value={years} min=1 max=50>
    <input type=range bind:value={years} min=1 max=50>
</label>

<p>{format(seedCapital)} € with {interestRate}% interest rate over {years} years = {format(total)} €</p>

