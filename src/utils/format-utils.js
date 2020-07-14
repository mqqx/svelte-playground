import { get } from 'svelte/store'
import { isGermanNumberFormat } from './../store'

export function format(number) {
    return get(isGermanNumberFormat)
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}

export function roundTotal(total) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
