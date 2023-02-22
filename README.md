# React Testing Library
React testing library has a strong philosophy behind it. It is what we call opinionated, which means the way the library is written encourages a certain set of practices.
* Test your software the way users actually use it.
    * Instead of testing internal implementation, test whether or not the software works the way it is supposed to. How the code is written can change, and as long as the software is still behaving according to the specifications, then the tests will still pass.
* Find elements by accessibility markes, not test IDs.

# React Testing Library vs Jest
* React testing library provides a virtual DOM for tests. Jest on the other hand, is a test runner. It is responsible for finding tests, running them, and determining whether the tests pass or fail.

# ESLint
Popular linter for JavaScript. By linter, we mean a tool that analyzes static text and marks syntax that breaks the linter rules. Static means that it is analyzing the code as written, not what happens when code is run.
Linting keeps code style consistent, especially for multi-eng projects.
It also catches errors in code, like using a variable before defining, and importing from nonexistent files.

## Linting vs. Formatting
Formatters (like prettiers) automatically format code (indents, spacing). 
Example 
~~~js
import {useEffect} from 'react';
~~~
Would be formatted to look like this (spaces between brackets)
~~~js
import { useEffect } from 'react';
~~~

Linters address format and style. 
For example, they can enforce a preferred assertion method.
~~~js
expect(checkbox).toHaveAttribute(checked);
~~~
Would turn into
~~~js
expect(checkbox).toBeChecked();
~~~

ESLint has the concept of plugins, which we can use to extend the rules for it. A mayor benefit of RTL and JestDOM is that they have excellent plugins. This rules enforce the best practices. The plugins are highly customizable, and we can decide which rules we want and which ones we don't. 
For more information, you can check this [link] (https://github.com/testing-library/eslint-plugin-testing-library)
And [this one](https://github.com/testing-library/eslint-plugin-jest-dom)

We install this linters by entering the following command
~~~
npm install eslint-plugin-testing-library eslint-plugin-jest-dom
~~~
This will install the ESLint dependencies. Now, we have to go to the package.json, and delete the following part
~~~json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
~~~
In the root folder, we create a file called ``.eslintrc.json``. The file will contain the following settings:
{
    "plugins": [
        "testing-library",
        "jest-dom"
    ],
    "extends": [
        "react-app",
        "react-app/jest",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended"
    ]
}

Now, in the root folder of the file we should also create a folder called ``.vscode`` with the file ``settings.json`` in it. The settings should be the following:
{
    "editor.codeActionsOnSave":
    {
        "source.fixAll.eslint": true
    }
}
This folder, along with the ``eslintrc.json`` should be included in ``.gitignore``.