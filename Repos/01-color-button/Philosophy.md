# React Testing Library Philosophy
What does React Testing Library do?
- Creates virtual DOM for testing, and provides utilities for interacting with it.
- Allows testing without a browser.


Types of Tests
- Unit Tests: Tests one unit of code in isolation.
- Integration Tests: Tests how multiple units work together.
- Functional Tests: Tests a particular function of the software. In this case "function" means general behaviour, not the block of a code that takes an input and returns an output.  

Imagine we have a form in which a user enters data and clicks submit. The function that needs to be check is that the software does the right thing with that particular set of data. That might be an integration test that has multiple units, but we also might have a functional test that is just a unit test. Maybe is just testing to see whether when you enter invalid data, an entry box turns red. That would be more of a unit test, but is is still a functional test. The idea here though, for functional tests is that you are not really testing the code, but testing the behavior.

- Acceptance / End-to-end (E2E) Test: These tests require an actual browser and they also require the server that your app is connected to. So these require a special tool, usually Cyprus or Selenium. This is not the type of tests that React testing library is built for.
