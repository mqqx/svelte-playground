import { store } from './store.svelte'

export function format(number: number) {
    return number.toLocaleString(store.locale)
}

export function formatCurrency(number: number) {
    return new Intl.NumberFormat(store.locale, {
        style: 'currency',
        currency: store.currencyCode,
    }).format(number)
}

export function currencySymbol() {
    const parts = new Intl.NumberFormat(store.locale, {
        style: 'currency',
        currency: store.currencyCode,
    }).formatToParts(0)
    return parts.find(p => p.type === 'currency')?.value ?? store.currencyCode
}

export function roundTotal(total: number) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
