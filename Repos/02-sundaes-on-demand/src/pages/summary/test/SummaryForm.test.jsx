import { render, screen } from '@testing-library/react';
import SummaryForm from './../SummaryForm';
import userEvent from '@testing-library/user-event';
/*
For the tests interactions we are going to be using user events, instead of fire events.
User events are a more complete and realistic way to simulate user interactions.

User event needs to be installed with
npm install --save-dev @testing-library/user-event
Note that @testing-library/user-event requires @testing-library/dom.
*/


/*
    Code Quiz
    There is a checkbox to unsure the user agrees with the terms and conditions
    - The checkbox is unchecked by default
    - Checking the checkbox enables the submit button
    - Unchecking the checkbox again disables the button
    
    The <SummaryForm /> component must be rendered
    We should find the checkbox and button using the { name } option
*/ 

test('checkox is unchecked by default', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name:'I agree with the Terms and Conditions'})
    const button = screen.getByRole('button', {name: 'Confirm order'})
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
})

test('Checking the checkbox enables the submit button', async() => {
    const user = userEvent.setup(); // version 14 of userEvent
    
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name:'I agree with the Terms and Conditions'})
    const button = screen.getByRole('button', {name: 'Confirm order'})
    
    await user.click(checkbox);
    expect(button).toBeEnabled();
})

test('Unchecking the checkbox again disables the button', async() => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name:'I agree with the Terms and Conditions'})
    const button = screen.getByRole('button', {name: 'Confirm order'})
    await user.click(checkbox);
    await user.click(checkbox);
    expect(button).toBeDisabled();
})

/*
Testing checkbox popover. For this we are going to be using the react-bootstrap popover.
This is where what styling we use makes a difference in how we do the tests.
When this popover goes away, it isn't just hidden with styling, but removed from the DOM.
This is a key difference when it comes to testing this component.
*/
test('popover responds to hover', async() => {
    // popover starts out hidden

    // popover appears upon mouseover of checkbox label

    // popover disappears when we mouse out
})