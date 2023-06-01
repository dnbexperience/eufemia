---
title: 'Best Practices for JavaScript and JSX'
menuTitle: 'for JS and JSX'
order: 2
---

# JavaScript and JSX

## Clean Code

Writing clean and readable code will in the end benefit also the end user by having better UX, because you as a developer can focus on what matters, the UI, and not spending unnecessary time on unclean code. Therefore we strongly recommend:

- following the [**Clean Code JavaScript** principles](https://github.com/ryanmcdermott/clean-code-javascript)

**NB:** Even they list `moment` as a date formatting tool, consider [date-fns](https://date-fns.org) because it has a couple of advantages over moment.

## Dates

Please prefer [date-fns](https://date-fns.org) over `moment` to handle your date calculations and formatting, because `date-fns`:

- functional approach
- immutable structure
- uses the browses native `Date` object as the basis
- strong and consistent API
- very modular
- good and flexible locales support
- supports three shaking

## React

### Handling of React State

Kent C. Dodds has a good [article on when and where to put React State](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster) with [this chart](https://res.cloudinary.com/kentcdodds-com/image/upload/v1625033349/kentcdodds.com/content/blog/state-colocation-will-make-your-react-app-faster/where-to-put-state.png 'This chart shows the when and where to put React State').

Please avoid having logic in your JSX syntax. Even it is possible to have a lot of logic in JSX because of the functional architecture, rather enforce using React Context to hide logic.

### Readable JSX

Small components are readable regardless. But once a Component gets large, things changes. Therefore I (Tobias Høegh) thought a lot about how to make larger components readable. So here is my approach:

Think of laying out your markup like reading a book. Yes, **reading a book**.
You have your;

1.  intro
2.  content
3.  summary

So, what if you put your main markup on top? following by the content, and as a settlement to the content, we follow up with the logic? Then we get these three topics.

1. Main component
2. Sub components
3. Logic

The good thing about this is, we get quickly an overview what the component contains. Here is an example using a _form_ as our basis:

```jsx
// 1. Readable markup
const App = () => (
  <FormLogic>
    <FormOne />
    <FormTwo />
    ...
  </FormLogic>
)

// 2. One of the forms
const FormOne = () => {
  // using the extendable Context
  const { clickHandler } = React.useContext(FormContext)

  return <Button on_click={clickHandler} />
}

// 3. And the logic, providing the Context
const FormLogic = (props) => {
  // Here we have our logic
  function clickHandler() {}

  // Our context we use for state handling etc.
  const formContext = {
    clickHandler,
  }

  return <FormContext.Provider value={formContext} {...props} />
}
const FormContext = React.createContext({})
```
