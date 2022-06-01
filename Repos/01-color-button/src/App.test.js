import { render, screen } from '@testing-library/react';
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

})
test('button turns blue when clicked', () => {

})