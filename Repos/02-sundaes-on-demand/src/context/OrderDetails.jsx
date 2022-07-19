import { useEffect } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';
import { pricePerItem } from '../constants';

// format number as currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount)
}

const OrderDetails = createContext();
// Custom Hook to check wheteher we are inside a provider
export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
    }
    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()){
        optionCount += count;
    }
    /*
    Ordinarily we would get the price from the server, but for this app, we are 
    just going to make a constants file.
    */
    return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        /*
        Maps are pretty much like Objects.
        They have key-value pairs.
        The difference is that they are easier to iterate over the values.
        */
        scoops: new Map(),
        toppings: new Map(),
    });
    const zeroCurrency = formatCurrency(0);
    const [ totals, setTotals ] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    })

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal),
        })
    }, [optionCounts])

    // useMemo is going to keep the value from being recalculated when it doesn't need to
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts }

            // update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts)
        }
        /* 
        getter: obj containing option counts for scoops and toppings,
        as well as the subtotals and totals
        
        setter: updateOptionCount
        */
        return [{ ...optionCounts, totals }]
    }, [optionCounts, totals])

    return <OrderDetails.Provider value={value} {...props} />


}

