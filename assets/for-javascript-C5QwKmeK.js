import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`JavaScript and JSX`}),`
`,(0,r.jsx)(t.h2,{children:`Clean Code`}),`
`,(0,r.jsx)(t.p,{children:`Writing clean and readable code will ultimately benefit the end user by having better UX, because you as a developer can focus on what matters, the UI, and not spending unnecessary time on unclean code. Therefore we strongly recommend:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`following the `,(0,r.jsxs)(t.a,{href:`https://github.com/ryanmcdermott/clean-code-javascript`,children:[(0,r.jsx)(t.strong,{children:`Clean Code JavaScript`}),` principles`]})]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`NB:`}),` Even they list `,(0,r.jsx)(t.code,{children:`moment`}),` as a date formatting tool, consider `,(0,r.jsx)(t.a,{href:`https://date-fns.org`,children:`date-fns`}),` because it has a couple of advantages over moment.`]}),`
`,(0,r.jsx)(t.h2,{children:`Dates`}),`
`,(0,r.jsxs)(t.p,{children:[`Please prefer `,(0,r.jsx)(t.a,{href:`https://date-fns.org`,children:`date-fns`}),` over `,(0,r.jsx)(t.code,{children:`moment`}),` to handle your date calculations and formatting, because `,(0,r.jsx)(t.code,{children:`date-fns`}),`:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`functional approach`}),`
`,(0,r.jsx)(t.li,{children:`immutable structure`}),`
`,(0,r.jsxs)(t.li,{children:[`uses the browses native `,(0,r.jsx)(t.code,{children:`Date`}),` object as the basis`]}),`
`,(0,r.jsx)(t.li,{children:`strong and consistent API`}),`
`,(0,r.jsx)(t.li,{children:`very modular`}),`
`,(0,r.jsx)(t.li,{children:`good and flexible locales support`}),`
`,(0,r.jsx)(t.li,{children:`supports three shaking`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`React`}),`
`,(0,r.jsx)(t.h3,{children:`Handling of React State`}),`
`,(0,r.jsxs)(t.p,{children:[`Kent C. Dodds has a good `,(0,r.jsx)(t.a,{href:`https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster`,children:`article on when and where to put React State`}),` with `,(0,r.jsx)(t.a,{href:`https://res.cloudinary.com/kentcdodds-com/image/upload/v1625033349/kentcdodds.com/content/blog/state-colocation-will-make-your-react-app-faster/where-to-put-state.png`,title:`This chart shows the when and where to put React State`,children:`this chart`}),`.`]}),`
`,(0,r.jsx)(t.p,{children:`Please avoid having logic in your JSX syntax. Even it is possible to have a lot of logic in JSX because of the functional architecture, rather enforce using React Context to hide logic.`}),`
`,(0,r.jsx)(t.h3,{children:`Readable JSX`}),`
`,(0,r.jsx)(t.p,{children:`Small components are readable regardless. But once a Component gets large, things changes. Therefore I (Tobias Høegh) thought a lot about how to make larger components readable. So here is my approach:`}),`
`,(0,r.jsxs)(t.p,{children:[`Think of laying out your markup like reading a book. Yes, `,(0,r.jsx)(t.strong,{children:`reading a book`}),`.
You have your;`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`intro`}),`
`,(0,r.jsx)(t.li,{children:`content`}),`
`,(0,r.jsx)(t.li,{children:`summary`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`So, what if you put your main markup on top? following by the content, and as a settlement to the content, we follow up with the logic? Then we get these three topics.`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`Main component`}),`
`,(0,r.jsx)(t.li,{children:`Sub components`}),`
`,(0,r.jsx)(t.li,{children:`Logic`}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`The good thing about this is, we get quickly an overview what the component contains. Here is an example using a `,(0,r.jsx)(t.em,{children:`form`}),` as our basis:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`// 1. Readable markup
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

  return <Button onClick={clickHandler} />
}

// 3. And the logic, providing the Context
const FormLogic = (props) => {
  // Here we have our logic
  function clickHandler() {}

  // Our context we use for state handling etc.
  const formContext = {
    clickHandler,
  }

  return <FormContext value={formContext} {...props} />
}
const FormContext = React.createContext({})
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};