<script>
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
    import { format, roundTotal } from './../utils/format-utils'
    import { seedCapital } from './../store.js'
    import { years } from './../store.js'

    let interestRate = 5

    $: interestRateFraction = interestRate / 100
    $: compoundInterestFactor = Math.pow(1 + interestRateFraction, $years)
    $: total = roundTotal($seedCapital * compoundInterestFactor)
</script>

<SeedCapitalInput/>

<label>
    interest rate
    <input type=number bind:value={interestRate} min=0 max=50 step=0.1> %
    <input type=range bind:value={interestRate} min=0 max=50 step=0.1>
</label>

<YearInput/>

<p>{format($seedCapital)} €
    with {interestRate}% interest rate
    over {$years} years
    = <b>{format(total)}</b> €</p>
