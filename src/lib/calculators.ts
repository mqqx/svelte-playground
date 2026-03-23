import CompoundInterest from './components/CompoundInterest.svelte'
import CompoundInterestMonthlyDeposit from './components/CompoundInterestMonthlyDeposit.svelte'
import CompoundAnnualGrowthRate from './components/CompoundAnnualGrowthRate.svelte'
import GrossNetWage from './components/GrossNetWage.svelte'
import RandomGreenGrid from './components/RandomGreenGrid.svelte'
import Counter from './components/Counter.svelte'

export const calculators = [
    { id: 'compound-interest', name: 'Compound Interest', component: CompoundInterest },
    { id: 'compound-interest-monthly', name: 'Compound Interest with Monthly Contribution', component: CompoundInterestMonthlyDeposit },
    { id: 'cagr', name: 'Compound Annual Growth Rate', component: CompoundAnnualGrowthRate },
    { id: 'gross-net-wage', name: 'Gross Net Wage', component: GrossNetWage },
    { id: 'random-green-grid', name: 'Random Green Grid', component: RandomGreenGrid },
    { id: 'counter', name: 'Counter', component: Counter },
]
