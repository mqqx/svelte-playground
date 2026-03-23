export function format(number: number) {
    return number.toLocaleString()
}

export function roundTotal(total: number) {
    return Math.round((total + Number.EPSILON) * 100) / 100
}
