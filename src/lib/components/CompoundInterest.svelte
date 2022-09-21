<script>
    import InterestRateInput from '../inputs/InterestRateInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
    import { format, roundTotal } from '../utils/format-utils'
    import { interestRate, seedCapital, years } from '../../store.js'

    $: interestRateFraction = $interestRate / 100
    $: compoundInterestFactor = Math.pow(1 + interestRateFraction, $years)
    $: total = roundTotal($seedCapital * compoundInterestFactor)
</script>

<SeedCapitalInput/>
<InterestRateInput/>
<YearInput/>

<p>{format($seedCapital)} €
    with {format($interestRate)}% interest rate
    over {$years} years
    = <b>{format(total)}</b> €</p>
