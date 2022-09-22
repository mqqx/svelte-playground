<script lang="ts">
    import { seedCapital } from '../utils/store'
</script>

<p>
	<label>
		seed capital
		<input type=number bind:value={$seedCapital} min=0 max=1000000> €
		<input type=range bind:value={$seedCapital} min=0 max=1000000>
	</label>
</p>
