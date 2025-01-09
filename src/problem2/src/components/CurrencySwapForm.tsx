import {useState, useMemo, useEffect} from 'react';
import {ArrowLeftRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {CurrencyInput} from './CurrencyInput';
import {
    CurrencyData,
    CurrencyOption,
    formatCurrencyOptions,
} from '@/lib/currencyUtils';

interface CurrencySwapFormProps {
    currencyData: CurrencyData[];
}

export function CurrencySwapForm({currencyData}: CurrencySwapFormProps) {
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState<CurrencyOption | null>(
        null
    );
    const [toCurrency, setToCurrency] = useState<CurrencyOption | null>(null);

    const currencyOptions = useMemo(
        () => formatCurrencyOptions(currencyData),
        [currencyData]
    );

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    useEffect(() => {
        if (fromCurrency && toCurrency && fromAmount) {
            const fromPrice = fromCurrency.price;
            const toPrice = toCurrency.price;
            const result = (parseFloat(fromAmount) * fromPrice) / toPrice;
            setToAmount(result.toFixed(6));
        } else {
            setToAmount('');
        }
    }, [fromAmount, fromCurrency, toCurrency]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <CurrencyInput
                    value={fromAmount}
                    onChange={setFromAmount}
                    currency={fromCurrency}
                    onCurrencyChange={setFromCurrency}
                    currencies={currencyOptions}
                    className="flex-1 w-full"
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwapCurrencies}
                    className="rounded-full h-10 w-10 shrink-0">
                    <ArrowLeftRight className="h-4 w-4" />
                </Button>

                <CurrencyInput
                    value={toAmount}
                    onChange={setToAmount}
                    currency={toCurrency}
                    onCurrencyChange={setToCurrency}
                    currencies={currencyOptions}
                    className="flex-1 w-full"
                />
            </div>
        </div>
    );
}
