interface WalletBalance {
    currency: string;
    amount: number;
    // ! based on the current code, WalletBalance should also include "blockchain" key
}

// ! Redundant because we dont use formattedBalances array, if using it, it should extend from WalletBalance type
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
    // ! Redundant spread operator
    const {children, ...rest} = props;

    const balances = useWalletBalances();
    const prices = usePrices();

    // ! Should avoid any type
    const getPriority = (blockchain: any): number => {
        // ! Switch case is okay, but we can transform into object and return the value for better type control and performance
        switch (blockchain) {
            case 'Osmosis':
                return 100;
            case 'Ethereum':
                return 50;
            case 'Arbitrum':
                return 30;
            case 'Zilliqa':
                return 20;
            case 'Neo':
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                // ! no used variable
                const balancePriority = getPriority(balance.blockchain);

                //  ! no declaration for lhsPriority?
                // ! instead of writing if inside another if, we can use && operator
                // ! it can be shorter and more concise if we return the condition, no need to explicitly return true or false
                if (lhsPriority > -99) {
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);

                // ! miss a condition where leftPriority === rightPriority
                // ! can be shorter and more concise by return leftPriority - rightPriority
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
            // ! no need prices as dependency
    }, [balances, prices]);

    // ! Redundant since we dont use it anywhere else
    // ! If using it, no need curly bracket just need to () => ({    ...balance, formatted: balance.amount.toFixed()}) for shorter and more concise
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    // ! This can be expensive => should wrap it inside useMemo for memoization
    const rows = sortedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
          // ! should have the fallback value for prices[balance.currency] (just optional), if prices type is okay, then it will work correctly
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    // ! no declaraion for classes
                    className={classes.row}
                    // ! not the best practice for key while using only index
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        }
    );

    return <div {...rest}>{rows}</div>;
};

// ! this component should be exported