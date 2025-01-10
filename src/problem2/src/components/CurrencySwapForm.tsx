import {useState, useMemo, useEffect} from 'react';
import {ArrowLeftRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {CurrencyInput} from './CurrencyInput';
import {
    CurrencyData,
    CurrencyOption,
    formatCurrencyOptions,
    formatRatio,
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
            setToAmount(result.toFixed(2));
        } else {
            setToAmount('');
        }
    }, [fromAmount, fromCurrency, toCurrency]);

    return (
        <div className="max-w-7xl mx-auto border border-black shadow-lg rounded-2xl py-16 px-20 w-fit">
            <div className="flex flex-col md:flex-row py-10 justify-center items-center gap-4">
                <CurrencyInput
                    title="From"
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
                    className="rounded-full size-16 shrink-0">
                    <ArrowLeftRight
                        width={40}
                        height={40}
                        className="w-full h-full"
                    />
                </Button>

                <CurrencyInput
                    isDisabled
                    title="To"
                    value={toAmount}
                    onChange={setToAmount}
                    currency={toCurrency}
                    onCurrencyChange={setToCurrency}
                    currencies={currencyOptions}
                    className="flex-1 w-full"
                />
            </div>

            <div className="w-full mt-5 text-lg text-muted-foreground px-4">
                <span>1 {fromCurrency?.label || '$$$'} = </span>
                {toCurrency?.label && (
                    <span className="font-medium">
                        {formatRatio(
                            (fromCurrency?.price || 0) /
                                (toCurrency?.price || 1)
                        )}{' '}
                        {toCurrency?.label || '$$$'}
                    </span>
                )}
            </div>
        </div>
    );
}
