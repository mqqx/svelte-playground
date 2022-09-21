<script>
    import { isGermanNumberFormat } from '../../store'
</script>

<label>
    <input type=checkbox
           bind:checked={$isGermanNumberFormat}>
    German number format
    {#if $isGermanNumberFormat}
        on
    {:else}
        off
    {/if}
</label>
