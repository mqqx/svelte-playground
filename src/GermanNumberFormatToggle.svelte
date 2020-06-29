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

<!-- TODO: figure out how a function could be bound to a checkbox change with svelte -->
<!--<label>-->
<!--    <input type=checkbox bind:checked={isGermanNumberFormat}>-->
<!--    German number format-->
<!--</label>-->

<button on:click={toggleGermanNumberFormat}>
    German number format
    {#if isGermanNumberFormat}
        on
    {:else}
        off
    {/if}
</button>
