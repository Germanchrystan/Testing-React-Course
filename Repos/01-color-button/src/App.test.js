import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // Render method: It creates a virtual DOM for the JSX passed as argument.
  const linkElement = screen.getByText(/learn react/i); // screen global object: Access virtual DOM via screen global
  /* getByText: Find element by display text 
  - regulasr expression
  - case insensitive (i)
  - could be string 'Learn React'  
  */

  // Assertion, causes test to succeed or fail.
  expect(linkElement).toBeInTheDocument();
});

/*
  Let's break down the pieces of an assertion
  - They all start with the expect method


*/