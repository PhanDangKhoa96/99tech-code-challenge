import {CurrencyData} from '@/lib/currencyUtils';
import {useCallback, useEffect, useState} from 'react';

export default function useCurrencyData({url}: {url: string}) {
    const [currencyData, setCurrencyData] = useState<CurrencyData[] | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setCurrencyData(result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {currencyData, loading};
}
