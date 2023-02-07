<script lang="ts">
    import RandomGreenGrid from "./lib/components/RandomGreenGrid.svelte";
    import GrossNetWage from "./lib/components/GrossNetWage.svelte";
    import CompoundAnnualGrowthRate from "./lib/components/CompoundAnnualGrowthRate.svelte";
    import CompoundInterestMonthlyDeposit from "./lib/components/CompoundInterestMonthlyDeposit.svelte";
    import CompoundInterest from "./lib/components/CompoundInterest.svelte";
    import Counter from "./lib/components/Counter.svelte";

    let menu: number = 5
</script>

<main>
    <ul>
        <li><a href="/" on:click|preventDefault={() => (menu = 1)}>Compound interest</a></li>
        |
        <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Compound interest with monthly contribution</a></li>
        |
        <li><a href="/" on:click|preventDefault={() => (menu = 3)}>Compound annual growth rate</a></li>
        |
        <li><a href="/" on:click|preventDefault={() => (menu = 4)}>Gross net wage</a></li>
        |
        <li><a href="/" on:click|preventDefault={() => (menu = 5)}>Random green grid</a></li>
        |
        <li><a href="/" on:click|preventDefault={() => (menu = 6)}>Counter</a></li>
    </ul>

    {#if menu === 1}
        <CompoundInterest/>
    {:else if menu === 2}
        <CompoundInterestMonthlyDeposit/>
    {:else if menu === 3}
        <CompoundAnnualGrowthRate/>
    {:else if menu === 4}
        <GrossNetWage/>
    {:else if menu === 5}
        <RandomGreenGrid/>
    {:else if menu === 6}
        <Counter/>
    {:else}
        <h1>
            Page Not Found
        </h1>
    {/if}
</main>

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
