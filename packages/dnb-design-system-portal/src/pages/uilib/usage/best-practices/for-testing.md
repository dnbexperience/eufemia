---
title: 'Best Practices for testing'
menuTitle: 'for testing'
status: 'wip'
draft: false
order: 3
---

# Testing Frontend Code

Having tips and tricks on testing in the Design System may seem at first glance meaningless. But as the Design System is also all about Accessibility and make the User Experience as good possible, it may make more sense to have some tips about best practice about testing frontend code as well.

## Write tests, but not too many

That said, write tests to gain confidence that Your code is strong for both refactoring, enhancements and new features.

Frontend code is changing and moving fast. So 100% code coverage should never be a goal by itself. Rather try to make tests witch reflects what the end-user would do. By doing so, You will probably cover several internal functions and states by simulating a "click" anyways.

### Static testing

- Use Static testers like **ESLint** (also in Your Editor of choice) to detect typos etc.
- Use code formatters like **Prettier** to uniform code style. This makes working together so much more fun and makes Your everyday more productive.
- Like ESLint, there is also a linter for styling, called **StyleLint**. It works even on Styled Components.

### Integration tests

Do not write Unit tests in Frontend code. But make integration tests.
Think as a user. Think how the user will interact with Your application. Do not shallow test, but test components like a user would get it (use mount or render to also test their children, cause a user would do have these as well).

There are several packages You can integrate in Your test, so Your can test Your code for accessibility e.g. `axe` and `pa11y`.

### End-to-end testing

Having tests witch actually runs in a browser, makes a lot of sense in frontend code. This method of testing is good to gain confidence and ensure a flow of interactions is working correctly - like a user registration process.

Fore sure, end-to-end tests can be run on a CI server as well. Make sure You run Your tests against a production-like version of Your application.
