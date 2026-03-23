<script lang="ts">
    import { store } from '../utils/store.svelte'
</script>

<p>
	<label>
		interest rate
		<input type=number bind:value={store.interestRate} min=0 max=50 step=0.1> %
		<input type=range bind:value={store.interestRate} min=0 max=50 step=0.1>
	</label>
</p>
