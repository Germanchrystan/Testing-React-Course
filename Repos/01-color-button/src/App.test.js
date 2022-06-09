import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct intial color', () => {
  render(<App />);
  // finding by role (prefered method) the element with button role and text 'Change to blue'
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})

  // For testing the color of the button, we should use Jest DOM
  // toHaveStyle custom matcher
  expect(colorButton).toHaveStyle({backgroundColor: 'red'})
})
test('button has correct initial text', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})
  expect(colorButton.textContent).toBe('Change to blue')
})
/*
  With functional testing, we could have all these assertions in just one tests.
*/
test('button turns blue when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(colorButton);
  // expect the background color to be blue
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red')
})

// Testing the checkbox
test('Initial Conditions', () => {
  render(<App />);

  //Check that the button starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toBeEnabled(); // Matcher

  //Check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

/* 
Code Quiz: Add checkbox functionality. We want to make sure that the button is 
enabled before the checkbox is checked and then after the checkbox is checked,
the button should be disabled.  
- fireEvent.click
- 2x in test: once to disable, once to re-enable
- Assertions on button
  expect(button).toBeEnabled()
  expect(button).toBeDisabled()

Guidance on React code:
  - Checkbox controls button via boolean state:
  - state determines value of disabled attribute on button
  - I recommend calling state disabled, defaulting to false
  - onChange for checkbox
*/ 

test('Test checkbox functionality', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByRole('checkbox');
  // First click on checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
  // Second click on checkbox
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})