import { writable } from 'svelte/store'

export const isGermanNumberFormat = writable(true)
export const seedCapital = writable(20000)
export const monthlyDeposit = writable(2000)
export const years = writable(20)
export const interestRate = writable(5)
