export interface CurrencyData {
    currency: string;
    date: string;
    price: number;
}

export interface CurrencyOption {
    value: string;
    label: string;
    price: number;
}

export function formatCurrencyOptions(data: CurrencyData[]): CurrencyOption[] {
    const uniqueCurrencies = Array.from(
        new Set(data.map((item) => item.currency))
    );
    return uniqueCurrencies.map((currency) => ({
        value: currency,
        label: currency,
        price: data.find((item) => item.currency === currency)?.price || 0,
    }));
}

export function formatNumber(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatRatio(value: number): string {
    return value.toFixed(2).replace(/\.?0+$/, '');
}
