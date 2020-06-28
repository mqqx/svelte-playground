<script>
    import { afterUpdate } from 'svelte';

    let seedCapital = 10000;
    let monthlyDeposit = 0;
    let years = 5;
    let interestRate = 5;
    let total = calculateTotal();

    function calculateTotal() {
        let interestRateFraction = interestRate / 100;
        let compoundInterestFactor = Math.pow(1 + interestRateFraction, years);
        let total = seedCapital * compoundInterestFactor;
        return roundTotal(total)
    }

    function roundTotal(total) {
        return Math.round((total + Number.EPSILON) * 100) / 100
    }

    afterUpdate(() => {
        total = calculateTotal();
    })
</script>

<label>
    seed capital
    <input type=number bind:value={seedCapital} min=0 max=100000>
    <input type=range bind:value={seedCapital} min=0 max=100000>
</label>

<label>
    interest rate
    <input type=number bind:value={interestRate} min=0 max=50 step=0.01>
    <input type=range bind:value={interestRate} min=0 max=50 step=0.01>
</label>

<label>
    years
    <input type=number bind:value={years} min=1 max=50>
    <input type=range bind:value={years} min=1 max=50>
</label>

<p>{seedCapital} € with {interestRate}% interest rate over {years} years = {total} €</p>

