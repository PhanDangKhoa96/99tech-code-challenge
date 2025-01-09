export interface CurrencyData {
    currency: string;
    date: string;
    price: number;
  }
  
  export interface CurrencyOption {
    value: string;
    label: string;
    price: number;
    flag?: string;
  }
  
  export function formatCurrencyOptions(data: CurrencyData[]): CurrencyOption[] {
    const uniqueCurrencies = Array.from(new Set(data.map(item => item.currency)));
    return uniqueCurrencies.map(currency => ({
      value: currency,
      label: currency,
      price: data.find(item => item.currency === currency)?.price || 0,
      flag: `/flags/${currency.toLowerCase()}.svg`
    }));
  }
  
  export function formatNumber(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  