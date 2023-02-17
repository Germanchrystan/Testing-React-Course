import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }) {
    const { totals } = useOrderDetails();

    return (
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings'/>
            <h2>Grand Total: {formatCurrency(totals.scoops+totals.toppings)}</h2>
            <Button onClick={() => setOrderPhase("review")} disabled={totals.scoops <= 0}>Order Sundae!</Button>
        </div>
    )
}