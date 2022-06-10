# Color Button App


### What if I am not sure of which role to use?
As far as the role goes, there is always the option to give a nonexistent role. When we do this, the console would return an error in which it tells which roles it found.

´´´

const colorButton = screen.getByRole('butt', {name: 'Change to blue'});

´´´

´´´
Here are the accessible roles: 
    button:

    Name "Change to blue":
    <button />
´´´

# Commits
When we commit and then run the tests again we may find this message 

´´´
No tests found related to files changed since last commit
´´´

This is because React keeps track of the changes in tests since the previous commit. 


# Testing styles from imported CSS modules
A common question about testing styles is "why doesn't ``.toHaveStyle()`` work with classes from my imported CSS module?"

In the case of create-react-app application --or applications that have otherwise mocked css modules for JEST -- CSS module imports are simply ignored for Jest test.

In many cases, thbe classes are merely cosmetic and won't affect functional tests (such as placement of the element on the page). In these casdes, mocking the CSS modules works fine. However, sometimes classes do affect function. For example, say you have a CSS moduel that uses a ``hidden`` class, which resutls in ``display:none`` when interpreted. Without adding a Jest transformer to interpret the CSS, Testing Library will not know that hidden class would result in ``display:none``, Tests around element visibility that rely on this class will fail.

For styles to be interpreted in tests, you need a transformer to turn the CSS classes into styles. [Here is an option](https://www.npmjs.com/package/jest-transform-css)
and [another](https://www.npmjs.com/package/jest-css-modules-transform)
The latter has more downloads per week, but the former seems to be more actively mantained.

Another possibility would be to check explicitly for the class name (``hidden`` in this example) using ``.toHaveClass``. This would be simpler, but farther from the actual user experience (this is testing implementation details, rather than how the user seezs the page). It is always a balance, and I think either this approach or transforming the CSS would be defensible.

## Unit testing functions
Often in our React app, we will have functions that are separate from the components, and this might be because the functions are used by several components. It makes sense to have the logic in a central place.
Other times the logic is complicated enough that it makes snese to separate it from the logic of the component itself.
It is recommended to unit test this functions if:
* The logic is complicated enough to test via functional tests.
* Too many edge cases.

This color button project is not going to have any functions that really merit unit testing.

When to unit test?
* replaceCamelWithSpaces is pretty simple.
* Could be covered by functional tests on button.
For more complicated functions, unit tests help with: 
* Covering all possible edge cases.
* Determining what caused functional tests to fail.
Issue with functional tests: 
* High-level makes them resistant to refactors. 
* High-level makes them difficult to diagnose in case of error.

### What we learned
* Test interactivity using fireEvent.
* jest-dom assertions:
    * toBeEnabled()
    * toBeDisabled()
    * toBeChecked()
* getByRole option {name: }
* Jest describe global to group tests
* Unit testing functions.
