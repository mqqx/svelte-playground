<script lang="ts">
    import InterestRateInput from '../inputs/InterestRateInput.svelte'
    import SeedCapitalInput from '../inputs/SeedCapitalInput.svelte'
    import YearInput from '../inputs/YearInput.svelte'
    import { format, roundTotal } from '../utils/format-utils'
    import { store } from '../utils/store.svelte'

    const interestRateFraction = $derived(store.interestRate / 100)
    const compoundInterestFactor = $derived(Math.pow(1 + interestRateFraction, store.years))
    const total = $derived(roundTotal(store.seedCapital * compoundInterestFactor))
</script>

<SeedCapitalInput/>
<InterestRateInput/>
<YearInput/>

<p>{format(store.seedCapital)} €
    with {format(store.interestRate)}% interest rate
    over {store.years} years
    = <b>{format(total)}</b> €</p>
