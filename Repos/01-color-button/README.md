# Starting with tests
By running the command `npm test` we can run the watch mode. The template project has a passing test included. Let's take a look at it:

```
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link), () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
})
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



