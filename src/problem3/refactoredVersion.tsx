interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: BlockChain;
}

type BlockChain = keyof BLOCKCHAIN_PRIORITIES | string;

const BLOCKCHAIN_PRIORITIES = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
};

const WalletPage: React.FC<BoxProps> = (props) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: BlockChain): number => {
        return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const priority = getPriority(balance.blockchain);
                return priority > -99 && balance.amount <= 0;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const priorityA = getPriority(lhs.blockchain);
                const priorityB = getPriority(rhs.blockchain);
                return priorityB - priorityA;
            });
    }, [balances]);

    const rows = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance, index: number) => {
            const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
            const formattedAmount = balance.amount.toFixed();

            return (
                <WalletRow
                    key={`${balance.currency}-${index}`}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={formattedAmount}
                />
            );
        });
    }, [sortedBalances, prices]);

    return <div {...props}>{rows}</div>;
};

export default WalletPage;

// 1 - refactored WalletBalance type
// 2 - created BLOCKCHAIN_PRIORITIES object to replace switch/case looping, put it outside the component to avoid recreating it on each render. Also using an object lookup for better performance
// 3 - remove formattedBalances and FormattedWalletBalance (redundant)
// 4 - refactored getPriority function
// 5 - calculated formattedAmount inside of rows loop
// 6 - removed "any" type and using BlockChain type (more specific)
// 7 - removed unused children prop destructuring
// 8 - fixed the sorting logic to correctly handle equal priorities
// 9 - spread all props to div
// 10 - added a second useMemo for rows to prevent unnecessary recalculations
// 11 - added null coalescing operators (??) to handle potential undefined values in prices and blockchain priorities
// 12 - improved key generation for the WalletRow components by combining currency and index
// 13 - export the component
// 14 - remove "prices" as dependency for "sortedBalances" useMemo
