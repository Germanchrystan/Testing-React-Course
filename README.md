# React Testing Library
React testing library has a strong philosophy behind it. It is what we call opinionated, which means the way the library is written encourages a certain set of practices.
* Test your software the way users actually use it.
    * Instead of testing internal implementation, test whether or not the software works the way it is supposed to. How the code is written can change, and as long as the software is still behaving according to the specifications, then the tests will still pass.
* Fin elements byu accessibility markes, not test IDs.

# React Testing Library vs Jest
* React testing library provides a virtual DOM for tests. Jest on the other hand, is a test runner. It is responsible for finding tests, running them, and determining whether the tests pass or fail.