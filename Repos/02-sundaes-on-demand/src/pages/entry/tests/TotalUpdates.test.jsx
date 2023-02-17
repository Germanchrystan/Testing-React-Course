import {render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options';
import OrderEntry from '../OrderEntry';


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

/**
 * CODE QUIZ: Grand Total
 * Should we do a "black box" test? 
 * 
 * For example: First update scoops, then toppings. 
 * Should we also test updating toppings first then scoops?
 * 
 * We know from implementation that is shouldn't make a difference.
 * User should be able to do either, and we might change implementation.
 * 
 * So yes, we should do a black box text and not consider implementation.
 * 
 * 
 * Do test functions need to be async? Yes, options stiull need to load from
 * server/ mock service worker. We need to await both the scoop element and
 * the toppings element. 
 * 
 * How to find element
 * For mockups, grand total should be the same size as titles(<h2>)
 * we can search using the heading role
 * 
 * include the text in the name option. 
 * Note: { exact: false } is not an option for *byRole
 * 
 * either use *byRole and regular expression for name option 
 * screen.getByRole('heading', {name: /grand total: \$/i}); 
 * 
 * or use a *byText and { exact: false }
 * screen.getByText('Grand total: $', { exact: false }); 
 */

describe('grand total', () => {
    test('grand total starts at $0.00', () => {
        const { unmount } = render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i}); 
        expect(grandTotal).toHaveTextContent('0.00');
        unmount();
    });
    test('grand total updates properly if scoop is added first', async() => {
        // Setting up user
        const user = userEvent.setup();
        // Rendering Order Entry and getting the grand total element
        const { unmount } = render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i});
        // Changing scoop input
        const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla" })
        await user.clear(vanillaInput); 
        await userEvent.type(vanillaInput, '1');
        // Assert new total amount
        expect(grandTotal).toHaveTextContent('2.00');
        unmount();
    });
    test('grand total updates properly if topping is added first', async() => {
        // Setting up user
        const user = userEvent.setup();
        // Rendering Order Entry and getting the grand total element
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i});
        // Getting topping checkboxes
        const checkboxInputs = await screen.findAllByRole('checkbox');
        await user.click(checkboxInputs[0]);
        // Assert new total amount
        expect(grandTotal).toHaveTextContent('1.50');
    });
    test('grand total updates properly if item is removed', async() => {
        // Setting up user
        const user = userEvent.setup();
        // Rendering Order Entry and getting the grand total element
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i});
        // Getting scoop input
        const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla" })
        // Getting topping inputs
        const checkboxInputs = await screen.findAllByRole('checkbox');
        
        // Add to both inputs
        await user.clear(vanillaInput); 
        await userEvent.type(vanillaInput, '1');
        await user.click(checkboxInputs[0]);
        // Assert new total amount
        expect(grandTotal).toHaveTextContent('3.50');
        
        // Remove scoop
        await user.clear(vanillaInput);
        expect(grandTotal).toHaveTextContent('1.50');

        // Remove topping
        await user.click(checkboxInputs[0]);
        expect(grandTotal).toHaveTextContent('0.00');

    });
})