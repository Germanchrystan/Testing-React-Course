import {render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options';

test('updates scoop subtotal when scoops change', async() => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);
    // make sure total starts out $0.00
    // not an exact match, since the price will vary
    const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false }); 
    expect(scoopSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla" })
    await user.clear(vanillaInput); // Cleans the input to avoid wrong inputs
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check the subtotal again
    const chocolateInput = await screen.findByRole('spinbutton', { name: "Chocolate" });
    await user.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00');
})