import { get } from 'svelte/store'
import { isGermanNumberFormat } from './store';

export function format(number: number) {
    return get(isGermanNumberFormat)
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}

export function roundTotal(total: number) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
