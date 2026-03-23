<script lang="ts">
    import { store } from '../utils/store.svelte'
</script>

<p>
	<label>
		seed capital
		<input type=number bind:value={store.seedCapital} min=0 max=1000000> €
		<input type=range bind:value={store.seedCapital} min=0 max=1000000>
	</label>
</p>
