export function format(number, isGermanNumberFormat) {
    isGermanNumberFormat = true
    return isGermanNumberFormat
        ? number.toLocaleString('de-DE')
        : number.toLocaleString()
}
