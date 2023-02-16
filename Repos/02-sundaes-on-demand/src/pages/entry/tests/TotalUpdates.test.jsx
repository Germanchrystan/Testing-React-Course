import {render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options';

test('updates scoop subtotal when scoops change', async() => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);
    //========================================================//
    // TEST: make sure total starts out $0.00
    //========================================================//

    // We need to make the exact option false, since the text will not be exact
    // We can see more about text options in testing-library.com/docs/dom-testing-library/api-queries#bytext
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false }); 
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    //========================================================//
    // TEST: update vanilla scoops to 1 and check the subtotal
    //========================================================//
    // The vanilla input element will not appear until we get a response from the server
    // So we will be using a findByRole with async/await
    const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla" })
    await user.clear(vanillaInput); // Cleans the input to avoid wrong inputs
    userEvent.type(vanillaInput, '1'); /** This user event is done differently in the course, since it is a different version of the library
     * const user = userEvent.setup();
     * await user.type(vanillaInput. '1');
     */

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    //========================================================//
    // TEST: update chocolate scoops to 2 and check the subtotal again
    //========================================================//
    const chocolateInput = await screen.findByRole('spinbutton', { name: "Chocolate" });
    await user.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00');
})