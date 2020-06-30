import { get } from 'svelte/store'
import { germanNumberFormatToggle } from './store'

export function format(number) {
    return get(germanNumberFormatToggle)
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}

export function roundTotal(total) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
