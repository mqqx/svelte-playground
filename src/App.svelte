<script>
    import CompoundInterestMonthlyContribution from './CompoundInterestMonthlyContribution.svelte';
    import CompoundInterest from './CompoundInterest.svelte';

    export let menu = 0;
</script>

<style>
    ul#menu li{
        display : inline;
    }
</style>

<ul id="menu">
    <li><a href="/" on:click|preventDefault={() => (menu = 0)}>Home</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 1)}>Compound interest</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Compound interest with monthly contribution</a></li>
</ul>

{#if menu === 0}
    <h1>
        Welcome
    </h1>
{:else if menu === 1}
    <CompoundInterest />
{:else if menu === 2}
    <CompoundInterestMonthlyContribution />
{:else}
    <h1>
        Page Not Found
    </h1>
{/if}
