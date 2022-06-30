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