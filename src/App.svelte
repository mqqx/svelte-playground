<script lang="ts">
    import { calculators } from './lib/calculators'
    import { currencies } from './lib/currencies'
    import { store } from './lib/utils/store.svelte'

    let activeId = $state('compound-interest-monthly')

    const activeCalculator = $derived(calculators.find(c => c.id === activeId))
</script>

<main>
    <header>
        <nav>
            {#each calculators as calc}
                <button
                    class:active={activeId === calc.id}
                    onclick={() => activeId = calc.id}
                >{calc.name}</button>
            {/each}
        </nav>
        <label class="currency-picker">
            <select bind:value={store.currencyCode}>
                {#each currencies as c}
                    <option value={c.code}>{c.flag} {c.code} ({c.symbol})</option>
                {/each}
            </select>
        </label>
    </header>

    <section>
        {#if activeCalculator}
            <activeCalculator.component />
        {:else}
            <h1>Page Not Found</h1>
        {/if}
    </section>
</main>

<style>
    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        background-color: #1e1e2e;
        color: #cdd6f4;
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.6;
    }

    main {
        max-width: 960px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        flex: 1;
    }

    .currency-picker {
        white-space: nowrap;
    }

    nav button {
        background: #313244;
        color: #cdd6f4;
        border: 1px solid #45475a;
        border-radius: 6px;
        padding: 0.4rem 0.85rem;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.15s, border-color 0.15s;
    }

    nav button:hover {
        background: #45475a;
    }

    nav button.active {
        background: #1e66f5;
        border-color: #1e66f5;
        color: #fff;
    }

    section {
        background: #313244;
        border-radius: 10px;
        padding: 1rem 1.5rem;
        text-align: left;
    }

    :global(input[type="number"]) {
        background: #1e1e2e;
        color: #cdd6f4;
        border: 1px solid #45475a;
        border-radius: 4px;
        padding: 0.3rem 0.5rem;
        font-size: 0.9rem;
        width: 8rem;
    }

    :global(input[type="number"]:focus) {
        outline: none;
        border-color: #1e66f5;
    }

    :global(input[type="range"]) {
        appearance: none;
        -webkit-appearance: none;
        width: 12rem;
        height: 6px;
        background: #45475a;
        border-radius: 3px;
        cursor: pointer;
    }

    :global(input[type='range']::-webkit-slider-thumb) {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #1e66f5;
        cursor: pointer;
    }

    :global(input[type='range']::-moz-range-thumb) {
        width: 14px;
        height: 14px;
        border: none;
        border-radius: 50%;
        background: #1e66f5;
        cursor: pointer;
    }

    :global(select) {
        background: #1e1e2e;
        color: #cdd6f4;
        border: 1px solid #45475a;
        border-radius: 4px;
        padding: 0.3rem 0.5rem;
        font-size: 0.9rem;
    }

    :global(select:focus) {
        outline: none;
        border-color: #1e66f5;
    }

    :global(button) {
        cursor: pointer;
    }

    :global(b) {
        color: #a6e3a1;
    }

    :global(label) {
        font-size: 0.9rem;
        color: #a6adc8;
    }

    :global(p) {
        margin: 0.75rem 0;
    }
</style>
