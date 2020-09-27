<script>
    import GermanNumberFormatToggle from './inputs/GermanNumberFormatToggle.svelte'
    import CompoundAnnualGrowthRate from './components/CompoundAnnualGrowthRate.svelte'
    import CompoundInterestMonthlyDeposit from './components/CompoundInterestMonthlyDeposit.svelte'
    import CompoundInterest from './components/CompoundInterest.svelte'
    import GrossNetWage from './components/GrossNetWage.svelte'

    let menu = 4
</script>

<style>
    :global(body, input) {
        background-color: #3e3e3e;
        color: whitesmoke;
    }

    :global(a, a:visited) {
        color: dodgerblue;
    }

    :global(input[type="range"]) {
        overflow: hidden;
        -webkit-appearance: none;
        background-color: whitesmoke;
    }

    :global(input[type='range']::-webkit-slider-runnable-track) {
        -webkit-appearance: none;
        color: darkorange;
    }

    :global(input[type='range']::-webkit-slider-thumb) {
        width: 10px;
        -webkit-appearance: none;
        height: 10px;
        cursor: ew-resize;
        background: #434343;
        box-shadow: -80px 0 0 80px darkorange;
    }

    ul li {
        display: inline
    }
</style>

<ul>
    <li><a href="/" on:click|preventDefault={() => (menu = 1)}>Compound interest</a></li>
    |
    <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Compound interest with monthly contribution</a></li>
    |
    <li><a href="/" on:click|preventDefault={() => (menu = 3)}>Compound annual growth rate</a></li>
    |
    <li><a href="/" on:click|preventDefault={() => (menu = 4)}>Gross net wage</a></li>
</ul>

<GermanNumberFormatToggle/>

{#if menu === 1}
    <CompoundInterest/>
{:else if menu === 2}
    <CompoundInterestMonthlyDeposit/>
{:else if menu === 3}
    <CompoundAnnualGrowthRate/>
{:else if menu === 4}
    <GrossNetWage/>
{:else}
    <h1>
        Page Not Found
    </h1>
{/if}
