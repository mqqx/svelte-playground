<script>
    import { onDestroy } from 'svelte';
    import { germanNumberFormatToggle } from './store'

    function toggleGermanNumberFormat() {
        germanNumberFormatToggle.update(value => !value)
        return isGermanNumberFormat;
    }

    let isGermanNumberFormat = true

    const unsubscribe = germanNumberFormatToggle.subscribe(value => {
        isGermanNumberFormat = value
    })

    onDestroy(unsubscribe)
</script>

<label>
    <input type=checkbox
           bind:checked={isGermanNumberFormat}
           on:click={toggleGermanNumberFormat}>
    German number format
    {#if isGermanNumberFormat}
        on
    {:else}
        off
    {/if}
</label>
