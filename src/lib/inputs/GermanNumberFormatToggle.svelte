<!-- could be used to ensure german number format, re-calculation needs to be triggered after toggle -->
<script lang="ts">
    import { isGermanNumberFormat } from '../utils/store'
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
