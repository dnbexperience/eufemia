---
title: 'Best Practices for testing'
menuTitle: 'for testing'
order: 4
---

# Testing frontend Code

It is a good idea to include some tips and tricks for frontend testing
Since accessibility and user experience are major factors in any design system, it may be sensible to include some tips and tricks for frontend testing.

## Write tests, but not too many

That said, write tests to gain confidence that your code is strong for both refactoring, enhancements and new features.

Frontend code is changing and moving fast. So 100% code coverage should never be a goal by itself, rather try to make tests which reflect what the end-user would do. By doing so, you will probably cover several internal functions and states by simulating a "click" anyways.

### Static testing

- Use static testers like **ESLint** (also in your editor of choice) to detect typos etc.
- Use code formatters like **Prettier** to uniform code style. This makes working together so much more fun and makes your everyday more productive.
- Like ESLint, there is also a linter for styling, called **StyleLint**. It works even on styled components.

### Integration tests

Do not write unit tests in frontend code. But make integration tests. Avoid testing implementation details, but rather thread front-end related components as an independent, changeable and maintainable individuals.

Think as a user. Think how the user will interact with your application. Do not shallow test, but test components like a user would interact (use mount or render to also test their children).

### Automatic accessibility testing

There are several packages you can integrate in your test, so your can test your code for accessibility e.g. `axe` and `pa11y`.

### End-to-end testing

Having tests which actually run in a browser, makes a lot of sense in frontend code. This method of testing is good to gain confidence and ensure a flow of interactions is working correctly - like a user registration process.

Of course, end-to-end tests can be run on a CI server as well. Make sure you run your tests against a production-like version of your application.
