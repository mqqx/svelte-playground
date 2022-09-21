<script>
    import { format, roundTotal } from '../utils/format-utils'

    const TAX_FREE_ALLOWANCE = 9408
    const FIRST_PROGRESSION_LIMIT = 14532
    const SECOND_PROGRESSION_LIMIT = 57051
    const FLAT_42_LIMIT = 270500

    //social security contributions
    const HEALTH_INSURANCE_LIMIT = 56250
    const HEALTH_INSURANCE_PERCENTAGE = 7.3
    const ANNUITY_LIMIT_WEST = 82800
    const ANNUITY_LIMIT_OST = 77400
    const UNEMPLOYMENT_INSURANCE_LIMIT_WEST = ANNUITY_LIMIT_WEST
    const UNEMPLOYMENT_INSURANCE_LIMIT_OST = ANNUITY_LIMIT_OST


    let salary = 40000
    let selectedTaxClass
    let taxClasses = [
        { id: 1, text: 'category 1' },
        { id: 2, text: 'category 2' },
        { id: 3, text: 'category 3' },
        { id: 4, text: 'category 4' },
        { id: 5, text: 'category 5' },
        { id: 6, text: 'category 6' }
    ]

    $: socialSecurity = calculateSocialSecurity()
    $: tax = calculateTax()
    $: netSalary = roundTotal(salary - tax - socialSecurity)

    function calculateSocialSecurity() {
        return 0;
    }

    function calculateTax() {
        function calculateProgressive(taxLimit, factor, addition) {
            let salaryToTaxFraction = (salary - taxLimit) / 10000
            return (factor * salaryToTaxFraction + addition) * salaryToTaxFraction
        }

        function calculateFlat(taxPercentage, progressiveSum) {
            return taxPercentage * salary - progressiveSum;
        }

        if (salary <= TAX_FREE_ALLOWANCE) {
            return 0
        } else if (salary <= FIRST_PROGRESSION_LIMIT) {
            return calculateProgressive(TAX_FREE_ALLOWANCE, 972.87, 1400);
        } else if (salary <= SECOND_PROGRESSION_LIMIT) {
            return calculateProgressive(FIRST_PROGRESSION_LIMIT, 212.02, 2397) + 972.79
        } else if (salary <= FLAT_42_LIMIT) {
            return calculateFlat(0.42, 8963.74)
        } else {
            return calculateFlat(0.45, 17078.74)
        }
    }
</script>

<p>
    <label>
        gross salary
        <input type=number bind:value={salary} min=0> €
    </label>
</p>

<label>
    tax category
    <select bind:value={selectedTaxClass}>
        {#each taxClasses as taxClass}
            <option value={taxClass}>
                {taxClass.text}
            </option>
        {/each}
    </select>
</label>

<p>With a gross salary of {format(salary)} € you will pay {format(tax)} € tax and {format(socialSecurity)} € social security contributions which comes down to <b>{format(netSalary)} € net</b></p>
