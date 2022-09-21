<script>
    import { interestRate } from '../../store.js'
</script>

<label>
    interest rate
    <input type=number bind:value={$interestRate} min=0 max=50 step=0.1> %
    <input type=range bind:value={$interestRate} min=0 max=50 step=0.1>
</label>
