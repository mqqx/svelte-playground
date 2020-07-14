<script>
    import { years } from './../store.js'
</script>

<label>
    years
    <input type=number bind:value={$years} min=1 max=50>
    <input type=range bind:value={$years} min=1 max=50>
</label>
