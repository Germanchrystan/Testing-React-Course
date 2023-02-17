# Sundaes on Demand
Basically with this app, people can choose ice cream flavors and toppings, and then submit and order.
The flavors and toppings choices come from a server. Then when the order is submitted, it is sent to the server and the server sends an order number back to the client, to display to the customer.

We are using this app as a backdrop to test specific things that are more complicated than the app that we tested earlier. 
* We want moe complicated user interactions to test, including forms where there are multiple possible entries and moving, and moving through order phases.
* We are going to create a mouse over pop-up for terms and conditions, to let the user know that they are agreeing to when they agree to them. For that, we are going to test that an element disappears from the DOM.
* We are also going to mock the server response. this is an important part of functional testing. We do not want to have out server running while we are running our functional tests. We are going to use mock service worker to send a mock response from the server. So it is going to intercept calls to the server and send a mock response so that we can control the response. 
* There will be asynchronous updates, which means we are going to learn tolls with testing library where we will wait for a particular change in the DOM before making an assertion. 
* Finally we are going to use some global state, via context. We will not be testing context implementation, as we are only interested in testing behavior as seen by the user. The tests will be no different that if we used Redux or Mobx.

There are going to be three main pages for this app.
- The first one is where people are going to enter their orders. 
- Once the order is done, we move to the order summary page. Here it will give us a summary of the order and the total, it makes us agree to the terms and conditions, and then asks us to confirm the order.
- Finally we have the order confirmation page, where we thank the customer, give them the order number, and then we display a button to create a new order. 

The way we are going to move throughg these phases is by keeping track of what order phase we are, using app level state. So if the state is in progress, the order entry page will show. Then once we click submit order, then the order summary page will show. When the order is confirmed then the order phase changes to completed, and we will see the confimation page. 

The server can be downloaded from [the course repository](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/master/sundae-server). It is a restful api, that runs on port 3030. For flavors/topping, it just sends static info, there is no db involved. It also generatyes a random order number. 
The server is not needed for functional react app testing. We will mock responses from the server.

## Bootstrap
This project is going to use Bootstrap. Styling might not seem like a very important part of a testing course, but in fact it is, because we are going to be finding elements the way they appear on the page. The way they appear is going to vary by what styling we use. 

* We will start by installing react-bootstrap and bootstrap with 
´´´npm install react-bootstrap bootstrap´´´

* Then we add the following script tabs to head in the public/index.html file 
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

<script>var Alert = ReactBootstrap.Alert;</script>

* We also need to add the css import to index.js
import 'bootstrap/dist/css/bootstrap.min.css';

* Finally, we are going to add styles to the body of the index.html file
<body style="background-color:teal, color:ivory">

## File organization
We are going to organize components by pages, with a test directory for each page.
Jest will find and run any files that end in .test.js.

## Screen query methods
commands
- get: expect element to be in DOM
- query: expect element not to be in DOM
- find: expect element to appear async

[All]
- (exclude) expect only one match
- (include) expect more than one match

Query type
- Role (most preferred)
- AltText (images)
- Text (display elements)
- Form elements
 - PlaceholderText
 - LabelText
 - DisplayValue

 Recommended links 
 https://testing-library.com/docs/dom-testing-library/api-queries
 https://testing-library.com/docs/react-testing-library/cheatsheet/
 https://testing-library.com/docs/guidl-which-query


 # Simulating Data from Server
We are going to mock the response we get from the server by using Mock Service Worker. We are not doing e2e here, we are doing functional tests, which generally don't involve the server.

- First, we need to install mock service worker with the command
```
npm install msw
```

- Second, we need to set up handlers for the API requests. We created them in the src/mocks/handlers.js file.
Here is a link to the [documentation related](https://mswjs.io/docs/basics/response-resolver)

- Then we need to create a test server to handle requests. We need to make sure that the test server is listening for all the tests and intercepting those calls that would otherwise go out to the internet at large. For that, we set up a server in src/mocks/server.js

We are also going to reset the server handlers after each test, so that if we messed with them during the test, we get a reset for the next test. For that, we added lines to the setupTests.js file.

# Simulating errors from the server
We might want to test the cases in which the server returns an error. For this, we should overwrite the outcome of the endpoints from a particular test. An example of this is shown in OrderEntry tests.

```
server.resetHandlers(
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => 
    res(ctx.status(500))
  ),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => 
    res(ctx.status(500))
  )
)
```
This test suite also shows a ```test.only``` method. This signals to the test runner that this is the only test that should be run in this file. Tests can be skipped by using the ```test.skip``` method. 

# React Context
We are going to code the context that will allow out subtotal tests to pass. We are using context as a way to pass global state between components. To do that, we are going to use a pattern suggested by Jent C. Dodds, where we can have a context that has embedded state. The link for more information is [here](https://kentcdodds.com/blog/application-state-management-with-react)
We basically will have a context file, which creates a context using the createContext hook with React. 
Then within the file we will use the useContext hook to make a custom hook that will return this context, as long as it is within a provider. The provider is going to have a useState statement that is going to create an internal state, so that the context provider actually has state built in.
Then the value for the provider is going to be an array, which contains the getter and the setter for the state. This way, any time someone runs the custom hook, they will get the context value, which can be destructured.
So we will export the custom hoook for the components to import, and the provider. We will wrap any components that need it with the provider. In this case two of our components are going to need it: OrderEntry and OrderSummary. The OrderConfirmation does not need to know the details of the order, so it will not be wrapped. 

# Review of Tests: Scoops Subtotal with Context
In these test we:
- Used `getByText` to find total. We used the `exact` option set to `false`, because we only used a partial string.
- Number inputs: we used `await` and `findBy` to get values that are coming from the server.
- Use of `Spinbutton` role to access components.
- `userEvent.clear` to clear existing text in the input.
- `userEvent.type` to enter number.
- `wrapper` option to `render` to apply context provider.
- Redefine Testing Library in `test-utils/testing-library-utils.jsx` to wrap all components rendered with the context provider.

## "Not wrapped in act" error
We will get this error when we finish the grand total tests.
~~~
Warning: An update to Options inside a test was not wrapped in act(...).
~~~

We would get a suggestion below this error, indicating that we use `act`, but that is not what we want to do.

The `not wrapped in act` is related to the `Can't perform a React state update on an unmounted component` error.

The reason is almost always that the component is changing after the test is over. Test function quits before state updates are complete. In this case we know what those async updates are.

We are rendering OrderEntry, that renders Options components, and each of the Options components runs an Axios call. When the axios call returns, it updates the component. The tests are then saying that there's stuff going on in the component that we are not accounting for.

This is caused by a race condition. 
The test renders the component, in this case the OrderEntry component.
The OrderEntry has children, which are the Options components that trigger network calls.
Then this first test doesn't wait for those network calls to return.
The assertion in the test succeeds that the grand total start out as zero. The function has nothing more to do so it exits. But when the test function exits, Testing Library does some cleanup and unmounts the components. In the meantime, the network calls still hasn't returned and it returns after the test is exited, after the component has been unmounted. That is when we get the warning.
So we want to eliminate this race condition. We still want to render the component and make the network call that results from rendering the component. But we will add cleanup when the component mounts. And this is a good idea, not just for the tests, but if somebody navigates away from the component.
In the production app, we probably want to cancel the network call in that case as well.

So we will have cleanup when the component unmounts to cancel the network call. Then in the test, we will explicitly unmount the component. This will cancel the network call base on the work that we have done on the component. It will run the component cleanup function and cancel the network call.

And all of this can happen before the test function exits. 

In **Options.jsx** we will see the `useEffect` hook. We will add a new `AbortController()` instance. This is a JS object we can use to handle processes. We are going to attach this instance to the network request. we do that by sending a signal with the abort controller signal. That way, if we do an abort on the controller it will abourt the axios call as well.

We will also add a return statement on useEffect to be triggered when the component is unmounted. This return statement will return a function that calls the abort method of the controller.

Now, we need to consider that this clanup function might run on re render and not just on unmount.
So in order to handle that, we need to make sure that the error is not set if we have a canceled network call. The way we do that is by checking the error name is not `CanceledError`. This will avoid having our component error out if this get called on re - render.

~~~js
useEffect(() => {
  // create an abortController to attach to network request
  const controller = new AbortController();

  axios
  .get(`http://localhost:3030/${optionType}`, { signal: controller.signal})
  .then((response) => setItems(response.data))
  .catch((error) => {
    if(error.name !== "CanceledError") {
      setError(true)
    }
  });
  // abort axios call on component unmount
  return () => {
    controller.abort();
  }
}, [optionType])

~~~

Now the las t thing we need to do is make sure that we unmount the component before the test exits.
Let's go back into the test.

~~~js
test('grand total starts at $0.00', () => {
  render(<OrderEntry />);
  const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i}); 
  expect(grandTotal).toHaveTextContent('0.00');
});
~~~

We have to destructure the unmount from the return value of render.

~~~js
const { unmount } = render(<OrderEntry />)
~~~

and then run it at the end of the test.

~~~js
test('grand total starts at $0.00', () => {
  const { unmount } = render(<OrderEntry />);
  const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i}); 
  expect(grandTotal).toHaveTextContent('0.00');
  unmount();
});
~~~
### Why is the explicit unmount needed
You mayt have the same question I had at this point:

If Testing Library unmounts the component as part of test cleanup, why is it necessary to explicitly unmount the component? 
Shouldn't the useEffect return function that aborts the axios request work just as well with the automatic unmount done by Testing Library
as it does with the explicit unmount?

The answer is yes, the automatic unmount should trigger the useEffect return function and eliminate the "not wrapped in act()" error. But, unfortunately, it doesn't. You can read a discussion (without a satisfying conclusion, sadly) in this [Issue](https://meli.udemy.com/course/react-testing-library/learn/lecture/35709102#overview:~:text=conclusion%2C%20sadly)%20in-,this%20GitHub%20issue,-).

# Final Exam : Order Phases
On the implementation, the app is going to have an order phase state. It is going to pass the state setter (`setOrderPhase`) to components as prop.
Component call setOderPhase to move to the next phase.
In OrderEntry we will be in a `inProgress` state, then in OrderSummary we will be in a `review` state, and finally in OrderConfirmation we will have a `complete` state.

#### What to test
We are going to test what is call "Happy path" (aka "Happy day" or "Golden path"). This is a suite of tests that execute customer flow without error.

For our app:
- Create order
- Accept terms and submit
- Click "new order" on confirmation page.

We don't need to test different combinations of orders. That is covered in the OrderEntry test.
The new tests will be written in a test directory at the top level of the src directory. This is a functional test, so we will call it `OrderPhase`