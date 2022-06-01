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
test('renders learn react link', () => {
  render(<App />); 
  const linkElement = screen.getByRole('link', {name: /learn react/i});
  expect(linkElement).toBeInTheDocument();
});
```

[Roles documentation](https://www.w3.org/TR/wai-aria/#role_definitions)

Some elements have built in roles. A button element has a role of button, and an 'a' or anchor element automatically has a role of link. 
If you can't find an element like a screen reader would within your tests, then your app is not friendly to screen readers.