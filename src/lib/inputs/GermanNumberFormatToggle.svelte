<!-- could be used to ensure german number format, re-calculation needs to be triggered after toggle -->
<script lang="ts">
    import { store } from '../utils/store.svelte'
</script>

<label>
	<input type=checkbox
		   bind:checked={store.isGermanNumberFormat}>
	German number format
	{#if store.isGermanNumberFormat}
		on
	{:else}
		off
	{/if}
</label>
