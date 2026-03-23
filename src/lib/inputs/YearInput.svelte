<script lang="ts">
    import { store } from '../utils/store.svelte'
</script>

<p>
	<label>
		years
		<input type=number bind:value={store.years} min=1 max=100>
		<input type=range bind:value={store.years} min=1 max=100>
	</label>
</p>
