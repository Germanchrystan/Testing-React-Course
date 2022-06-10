import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

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
  /*
  Now, how can we identify a checkbox in particular if there are several
  checkboxes in our component. That is when labels come into place.
  */
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByLabelText('Disable button');
  // First click on checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
  // Second click on checkbox
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})
/*
Code Quiz: We want some visual indication when the button is siabled.
So we wan to turn the button gray. 
Test flows(simulate possible user flows):
* Flow 1: disable button -> button is gray -> enable button -> button is red
* Flow 2: click button to change color -> disable button -> button is gray -> enable button -> button is blue

Assertion at the end of each flow is neccesary. 
*/

test("Test button color when disabled (flow 1)", () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByLabelText('Disable button');

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});
})

test("Test button color when disabled (flow 2)", () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByLabelText('Disable button');

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
})

/*
  Describe statement: a way of grouping tests
*/
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})