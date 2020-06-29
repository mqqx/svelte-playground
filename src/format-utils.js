import { get } from 'svelte/store'
import { germanNumberFormatToggle } from './store'

export function format(number) {
    return get(germanNumberFormatToggle)
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}
