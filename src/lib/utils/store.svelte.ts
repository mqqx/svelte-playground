const regionCurrencyMap: Record<string, string> = {
    US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', NZ: 'NZD',
    JP: 'JPY', CN: 'CNY', KR: 'KRW', IN: 'INR', BR: 'BRL',
    CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN',
    CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN', TR: 'TRY',
    RU: 'RUB', UA: 'UAH', ZA: 'ZAR', MX: 'MXN', AR: 'ARS',
    CL: 'CLP', CO: 'COP', IL: 'ILS', TH: 'THB', PH: 'PHP',
    MY: 'MYR', SG: 'SGD', HK: 'HKD', TW: 'TWD', ID: 'IDR',
}

function detectLocale(): string {
    return navigator?.language ?? 'de-DE'
}

function detectCurrencyCode(locale: string): string {
    const region = locale.split('-')[1]?.toUpperCase()
    return (region && regionCurrencyMap[region]) ?? 'EUR'
}

const initialLocale = detectLocale()

export const store = $state({
    seedCapital: 20000,
    monthlyDeposit: 2000,
    years: 20,
    interestRate: 5,
    locale: initialLocale,
    currencyCode: detectCurrencyCode(initialLocale),
})
