# Starting with tests
By running the command `npm test` we can run the watch mode. The template project has a passing test included. Let's take a look at it:

```
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // Render method: It creates a virtual DOM for the JSX passed as argument.
  const linkElement = screen.getByText(/learn react/i); // screen global object: Access virtual DOM via screen global
  /* getByText: Find element by display text 
  - regular expression
  - case insensitive (i)
  - could be string 'Learn React'  
  */

  // Assertion, causes test to succeed or fail.
  expect(linkElement).toBeInTheDocument();
});
```

The render method creates a virtual DOM for whatever JSX element is provided as the argument. The virtual DOM is accessible from the screen global object. Both the render method and the screen global object come from the import for react testing library.

After the render method, we actually run a method from the screen object called `GetByText`. This is going to find an element in the DOM based on whatever text it is displaying. 

## Assertions
Let's break down the pieces of an assertion
  * They all start with the expect method. It is a global in Jest.
  * Expect argument: Subject of the assertion.
  * Matcher: Type of assertion. The assertion method `toBeInTheDocument()` comes from Jest-DOM. 
  Sometimes there is an argument to the matcher. This is not the case. 

More assertion examples
* ```expect(element.textContent).toBe('hello');```: Assuming element was defined from on the previous line, it is an element which text content we are extracting with the `textContent` property. The method `toBe` compares the text of content with the text passed as an argument.
* ```expect(elementsArray).toHaveLength(7)```: Expects an array to have the length value passed as an argument.

- Jest-dom
It is a dependency that comes with create-react-app, and it uses the ``src/setupTests.JS`` file to import jest dom before each test, in order to have the matchers available in each test. The previous example are not necessarily DOM based matchers, they are very general. The DOM based matchers are ones like ``toBeInTheDocument()``, that only apply to a virtual DOM. Other examples of these matchers are ```toBeVisible()```, ```toBeChecked()```, etc.

## Jest
React Testing Library helps us with rendering components into a virtual DOM, searching the virtual DOM and interacting with it. However, it needs a test runner, something that will find tests, run them and make assertions. That is where Jest comes in.

Jest is not the only test runner, there is Moka, Jasmine, but Jest is recommended by Testing Library and comes with the template create-react-app proyect. 
``npm test`` runs an npm script that runs Jest in watch mode.

### Watchmode
Is a way that we can run Jest so that it will watch for any changes in files since the last save, and it will only run tests that are related to files that have changed since the last save. Whem we first ran the ``npm test`` script, the test file was not executed, since there were not any changes to the JSX files. 

### How doest Jest Work?
There is a global test method that has two arguments: 
- The first one is a string description of the test.
- The second argument is a test function.
Test fails if error is thrown when running the callback test function. Assertions throw errors when expectation fails.

If there is no errors, the test passes. An empty test function will pass

```
test(('This test will pass), () => {

})

test('This test will fail', () => {
    throw new Error('test failed')
})
```
# React Testing Library Philosophy
What does React Testing Library do?
- Creates virtual DOM for testing, and provides utilities for interacting with it.
- Allows testing without a browser.

## Types of Tests
- Unit Tests: Tests one unit of code in isolation.
- Integration Tests: Tests how multiple units work together.
- Functional Tests: Tests a particular function of the software. In this case "function" means general behaviour, not the block of a code that takes an input and returns an output.  

Imagine we have a form in which a user enters data and clicks submit. The function that needs to be check is that the software does the right thing with that particular set of data. That might be an integration test that has multiple units, but we also might have a functional test that is just a unit test. Maybe is just testing to see whether when you enter invalid data, an entry box turns red. That would be more of a unit test, but is is still a functional test. The idea here though, for functional tests is that you are not really testing the code, but testing the behavior.

- Acceptance / End-to-end (E2E) Test: These tests require an actual browser and they also require the server that your app is connected to. So these require a special tool, usually Cyprus or Selenium. This is not the type of tests that React testing library is built for.

### Differences between Unit Testing and Functional Testing
There is a general mindset that is different between functional testing and unit testing.

#### Unit testing:
- Tests should be as isolated as possible. This way, when we are testing a function or a component, you mock your dependencies. If the test fails, that is related to the particular unit that is being tested. You are also testing the internals. 
- It is very easy to pinpoint failures because of this isolation.
- Less tightly coupled from how users interact with the software.
- More likely to break with refactoring. With unit testing, we are often testing how the software is written.

#### Functional Testing:
- Include all relevant units to test behavior.
- Closer to how users interact with the software.
- Robust tests. It means that if the code is refactored, as long as the behavior stays the same, the tests should still pass. 
- More difficult to debug failing tests. The tests are not tightly coupled with the code.
- RTL believes that the advantages of functional testing outwright the disadvantages, and this is how we are going to be testing.

### Accesibility and finding elements
Testing Library is opinionated about how to find elements, as it is opinionated about most things. It recommends finding elements by accessibility handles, or finding them the way assistive technologies, like screen readers would be able to find them. There is an actual guide about which queries to use. Link [here](https://testing-library.com/docs/guide-which-query).

1. Queries Accessible to Everyone 
    i. getByRole
    ii. getByLabelText
    iii. getByPlaceholderText
    iv. getByText
    v. getByDisplayValue

2. Semantic Queries
    i. getByAllText
    ii. getByTitle

3. Test IDs
    i. getByTestId

The example test created by ```create-react-app``` uses getByText. It is ok for non-interactive elements, but it turns out the element in question is interactive, since it is a link. So we could fix it to use getByRole.

```
// Fixing the test to use getByRole
test('renders learn react link (using getByRole)', () => {
  render(<App />); 
  const linkElement = screen.getByRole('link', {name: /learn react/i});
  expect(linkElement).toBeInTheDocument();
});
```

[Roles documentation](https://www.w3.org/TR/wai-aria/#role_definitions)

Some elements have built in roles. A button element has a role of button, and an 'a' or anchor element automatically has a role of link. 
If you can't find an element like a screen reader would within your tests, then your app is not friendly to screen readers.

# TDD Test-Driven Development
This is a development approach in which tests are written before the code. The code is written to make the tests pass. This is often called the "red-green" method, because tests are progressively passing as the software is developed.
Usually, a very minimal code is written, just so the tests don't error out.

* 1_ Write "shell" function.
* 2_ Write tests.
* 3_ Tests fail.
* 4_ Write code.
* 5_ Tests pass!

### Why TDD?
- Makes a huge difference in how it feels to write tests. It becomes part of the coding process, not a "chore" to do at the end.
- More efficient. Re-run tests "for free" after changes.

### TDD vs BDD (Behaviour Driven Development)
RTL encourages testing the way users actually use the app, and that means testing behavior.
So doesn't that mena that we should be doing BDD instead of TDD?
Actually no. BDD is very explicitly defined. It involves collaboration between lots of roles (Devs, QA, Business partners, etc.), and it defines a process for different groups to interact.