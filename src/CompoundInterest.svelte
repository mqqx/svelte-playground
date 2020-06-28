<script>
    let seedCapital = 10000;
    let monthlyDeposit = 0;
    let years = 5;
    let interestRate = 5;
</script>

<label>
    seed capital
    <input type=number bind:value={seedCapital} min=0 max=100000>
    <input type=range bind:value={seedCapital} min=0 max=100000>
</label>

<label>
    monthly deposit
    <input type=number bind:value={monthlyDeposit} min=0 max=100000>
    <input type=range bind:value={monthlyDeposit} min=0 max=100000>
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



{#if monthlyDeposit}
    make other calculation work
{:else}
    <p>{seedCapital} € with {interestRate}% interest rate over {years} years
        = {Math.round((seedCapital*(Math.pow(1+interestRate/100, years)) + Number.EPSILON) *        100) / 100} €</p>
{/if}
