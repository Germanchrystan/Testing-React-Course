import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from './../SummaryForm'
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

test('Checking the checkbox enables the submit button', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name:'I agree with the Terms and Conditions'})
    const button = screen.getByRole('button', {name: 'Confirm order'})
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
})

test('Unchecking the checkbox again disables the button', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name:'I agree with the Terms and Conditions'})
    const button = screen.getByRole('button', {name: 'Confirm order'})
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
})