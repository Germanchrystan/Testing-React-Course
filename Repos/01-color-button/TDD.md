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