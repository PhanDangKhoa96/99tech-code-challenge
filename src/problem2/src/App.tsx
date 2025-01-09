import {CurrencySwapForm} from './components/CurrencySwapForm';
import {CURRENCY_DATA_URL} from './constants';
import useCurrencyData from './hooks/useCurrencyData';

function App() {
    const {currencyData, loading} = useCurrencyData({url: CURRENCY_DATA_URL});

    if (loading) return <p>Loading...</p>;
    if (!currencyData) return null; // or initial state handling

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <CurrencySwapForm currencyData={currencyData} />
        </main>
    );
}

export default App;
