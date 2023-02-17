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
    await userEvent.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    //========================================================//
    // TEST: update chocolate scoops to 2 and check the subtotal again
    //========================================================//
    const chocolateInput = await screen.findByRole('spinbutton', { name: "Chocolate" });
    await user.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
});

/**
 * CODE QUIZ: write tests for toppings subtotal
 * - Assert on default toppings subtotal
 * - Find and tick one box, assert on updated subtotal (see src/mocks/handlers.js for server response(which toppings))
 * - Use await and find for checkbox(async)
 * - Tick another box on, assert on subtotal
 * - Tick one of the boxes off (click it again) and assert on subtotal.
 */
test('updates toppings subtotal when toppings change', async() => {
    const user = userEvent.setup();
    render(<Options optionType="toppings"/>);
    
    // Default value
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // Checkboxes
    const checkboxInputs = await screen.findAllByRole('checkbox');
    expect(checkboxInputs.length).toBe(3);

    // Check first box
    await user.click(checkboxInputs[0]);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // Uncheck first box
    await user.click(checkboxInputs[0]);
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // Click two boxes
    await user.click(checkboxInputs[0]);
    await user.click(checkboxInputs[1]);
    expect(toppingsSubtotal).toHaveTextContent('3.00');
    await user.click(checkboxInputs[0]); 
    expect(toppingsSubtotal).toHaveTextContent('1.50');
});

/**
 * In the solutions provided by the teacher, 
 * the checkboxes are reached with the name of the
 * label provided for each input.
 * 
 * This is just a different approach to the tests. Both are valid.
 */
test('Solutions provided by the teacher', async()=> {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    const toppingsTotal = screen.getByText("toppings total: $", { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot Fudge" });
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('3.00');

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
})
