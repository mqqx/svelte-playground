<script>
    import GermanNumberFormatToggle from './inputs/GermanNumberFormatToggle.svelte';
    import CompoundAnnualGrowthRate from './components/CompoundAnnualGrowthRate.svelte'
    import CompoundInterestMonthlyDeposit from './components/CompoundInterestMonthlyDeposit.svelte'
    import CompoundInterest from './components/CompoundInterest.svelte'

    export let menu = 1
</script>

<style>
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
</ul>

<GermanNumberFormatToggle/>

{#if menu === 1}
    <CompoundInterest/>
{:else if menu === 2}
    <CompoundInterestMonthlyDeposit/>
{:else if menu === 3}
    <CompoundAnnualGrowthRate/>
{:else}
    <h1>
        Page Not Found
    </h1>
{/if}
