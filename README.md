# React Testing Library
React testing library has a strong philosophy behind it. It is what we call opinionated, which means the way the library is written encourages a certain set of practices.
* Test your software the way users actually use it.
    * Instead of testing internal implementation, test whether or not the software works the way it is supposed to. How the code is written can change, and as long as the software is still behaving according to the specifications, then the tests will still pass.
* Fin elements byu accessibility markes, not test IDs.

# React Testing Library vs Jest
* React testing library provides a virtual DOM for tests. Jest on the other hand, is a test runner. It is responsible for finding tests, running them, and determining whether the tests pass or fail.

# ESLint
Popular linter for JavaScript. By linter, we mean a tool that analyzes static text and marks syntax that breaks the linter rules. Static means that it is analyzing the code as written, not what happens when code is run.
Linting keeps code style consistent, especially for multi-eng projects.
It also catches errors in code, like using a variable before defining, and importing from nonexistent files.

## Linting vs. Formatting
Formatters (like prettiers) automatically format code (indents, spacing). 
Example 
```
import {useEffect} from 'react';
```js
Would be formatted to look like this (spaces between brackets)
```js
import { useEffect } from 'react';
```

Linters address format and style. 
For example, they can enforce a preferred assertion method.
```
expect(checkbox).toHaveAttribute(checked);
```
Would turn into
```
expect(checkbox).toBeChecked();
```

ESLint has the concept of plugins, which we can use to extend the rules for it. A mayor benefit of RTL and JestDOM is that they have excellent plugins. This rules enforce the best practices. The plugins are highly customizable, and we can decide which rules we want and which ones we don't. 
For more information, you can check this [link] (https://github.com/testing-library/eslint-plugin-testing-library)
And [this one](https://github.com/testing-library/eslint-plugin-jest-dom)