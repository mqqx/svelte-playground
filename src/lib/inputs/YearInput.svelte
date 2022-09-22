<script lang="ts">
    import { years } from '../utils/store'
</script>

<p>
	<label>
		years
		<input type=number bind:value={$years} min=1 max=100>
		<input type=range bind:value={$years} min=1 max=100>
	</label>
</p>
