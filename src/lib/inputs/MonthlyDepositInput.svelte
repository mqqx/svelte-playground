<script lang="ts">
    import { store } from '../utils/store.svelte'
</script>

<p>
	<label>
		monthly deposit
		<input type=number bind:value={store.monthlyDeposit} min=10 max=100000 step=5> €
		<input type=range bind:value={store.monthlyDeposit} min=10 max=100000 step=5>
	</label>
</p>
