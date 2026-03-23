<script lang="ts">
    import { calculators } from './lib/calculators'

    let activeId = $state('random-green-grid')

    const activeCalculator = $derived(calculators.find(c => c.id === activeId))
</script>

<main>
    <ul>
        {#each calculators as calc, i}
            {#if i > 0} | {/if}
            <li><a href="/" onclick={(e) => { e.preventDefault(); activeId = calc.id }}>{calc.name}</a></li>
        {/each}
    </ul>

    {#if activeCalculator}
        <activeCalculator.component />
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
        background: dodgerblue;
        box-shadow: -80px 0 0 80px darkorange;
    }

    ul li {
        display: inline
    }
</style>
