import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import App from '../App';

test('order phases for happy path', async() => {
    const user = userEvent.setup();
    // render app
    const { unmount } = render(<App />);

    // add ice cream scoops and toppings
    // scoops
    const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla" })
    await user.clear(vanillaInput); // Cleans the input to avoid wrong inputs
    await userEvent.type(vanillaInput, '1');
    // toppings
    const checkboxInputs = await screen.findAllByRole('checkbox');
    await user.click(checkboxInputs[0]);

    // find and click order button
    const orderEntryButton = screen.getByRole('button', { name: 'Order Sundae!'});
    await user.click(orderEntryButton);

    // check summary information based on order
    const scoopSubtotal = screen.getByRole('heading', { name: /scoops: /i});
    expect(scoopSubtotal).toHaveTextContent('2.00');

    const toppingSubtotal = screen.getByRole('heading', {name: /toppings: /i});
    expect(toppingSubtotal).toHaveTextContent('1.50');
    
    // accept terms and conditions and click button to confirm order
    const termsAndConditionsCheckbox = screen.getByRole('checkbox');
    await user.click(termsAndConditionsCheckbox);
    const termsAndConditionsButton = screen.getByRole('button', {name: /confirm order/i});
    await user.click(termsAndConditionsButton);

    // get loading screen
    const loading = screen.getByText('Loading');
    expect(loading).toBeInTheDocument();

    // confirm order number on confirmation page
    const thankYouHeading = await screen.findByRole('heading');
    expect(thankYouHeading).toHaveTextContent("Thank you!");

    const orderNumberParagraph = await screen.findByText("your order number is", {exact: false});
    expect(orderNumberParagraph).toBeInTheDocument();
    expect(orderNumberParagraph).toHaveTextContent('123455676');

    // loading no longer showing
    const notLoading = screen.queryByText("Loading");
    expect(notLoading).not.toBeInTheDocument();

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole('button', {name: "Create new order"});
    expect(newOrderButton).toBeInTheDocument();
    await user.click(newOrderButton);

    // check that scoops and toppings subtotals have been reset
    const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i}); 
    expect(grandTotal).toBeInTheDocument();
    expect(grandTotal).toHaveTextContent('0.00');
    
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false }); 
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    const toppingsTotal = screen.getByText("toppings total: $", { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');
    
    // unmount the component to trigger cleanup and avoid "not wrapped in act()" error
    unmount();
})