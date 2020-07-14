<script>
    import { monthlyDeposit } from './../store.js'
</script>

<label>
    monthly deposit
    <input type=number bind:value={$monthlyDeposit} min=10 max=100000 step=5> €
    <input type=range bind:value={$monthlyDeposit} min=10 max=100000 step=5>
</label>
