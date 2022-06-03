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