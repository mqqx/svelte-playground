import { store } from './store.svelte'

export function format(number: number) {
    return store.isGermanNumberFormat
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}

export function roundTotal(total: number) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
