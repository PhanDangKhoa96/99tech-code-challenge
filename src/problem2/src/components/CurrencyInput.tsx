import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ScrollArea} from '@/components/ui/scroll-area';
import {CurrencyOption} from '@/lib/currencyUtils';

interface CurrencyInputProps {
    value: string;
    onChange: (value: string) => void;
    currency: CurrencyOption | null;
    onCurrencyChange: (currency: CurrencyOption) => void;
    currencies: CurrencyOption[];
    className?: string;
}

export function CurrencyInput({
    value,
    onChange,
    currency,
    onCurrencyChange,
    currencies,
    className = '',
}: CurrencyInputProps) {
    const [search, setSearch] = useState('');

    const filteredCurrencies = currencies.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="relative flex items-center gap-2 p-4 rounded-xl border bg-background">
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            onChange(val);
                        }
                    }}
                    className="text-2xl border-0 p-0 h-auto focus-visible:ring-0"
                    placeholder="0.00"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-3 h-auto font-normal">
                            {currency && (
                                <img
                                    src={`/tokens/${currency.value}.svg`}
                                    alt={currency.label}
                                    className="w-5 h-5 rounded-full"
                                />
                            )}
                            <span>{currency?.label || 'Select'}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0">
                        <div className="p-2">
                            <Input
                                placeholder="Search currency..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8"
                            />
                        </div>
                        <ScrollArea className="h-72">
                            <div className="grid grid-cols-1 gap-1 p-2">
                                {filteredCurrencies.map((option) => (
                                    <Button
                                        key={option.value}
                                        variant="ghost"
                                        className="w-full justify-start font-normal"
                                        onClick={() => {
                                            onCurrencyChange(option);
                                            setSearch('');
                                        }}>
                                        <img
                                            src={`/tokens/${option.value}.svg`}
                                            alt={option.label}
                                            className="w-5 h-5 rounded-full"
                                        />
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
