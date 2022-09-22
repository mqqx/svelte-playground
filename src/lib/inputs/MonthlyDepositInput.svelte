<script lang="ts">
    import { monthlyDeposit } from '../utils/store'
</script>

<p>
	<label>
		monthly deposit
		<input type=number bind:value={$monthlyDeposit} min=10 max=100000 step=5> €
		<input type=range bind:value={$monthlyDeposit} min=10 max=100000 step=5>
	</label>
</p>
