import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`JavaScript and JSX`}),`
`,(0,n.jsx)(r.h2,{children:`Clean Code`}),`
`,(0,n.jsx)(r.p,{children:`Writing clean and readable code will ultimately benefit the end user by having better UX, because you as a developer can focus on what matters, the UI, and not spending unnecessary time on unclean code. Therefore we strongly recommend:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`following the `,(0,n.jsxs)(r.a,{href:`https://github.com/ryanmcdermott/clean-code-javascript`,children:[(0,n.jsx)(r.strong,{children:`Clean Code JavaScript`}),` principles`]})]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`NB:`}),` Even they list `,(0,n.jsx)(r.code,{children:`moment`}),` as a date formatting tool, consider `,(0,n.jsx)(r.a,{href:`https://date-fns.org`,children:`date-fns`}),` because it has a couple of advantages over moment.`]}),`
`,(0,n.jsx)(r.h2,{children:`Dates`}),`
`,(0,n.jsxs)(r.p,{children:[`Please prefer `,(0,n.jsx)(r.a,{href:`https://date-fns.org`,children:`date-fns`}),` over `,(0,n.jsx)(r.code,{children:`moment`}),` to handle your date calculations and formatting, because `,(0,n.jsx)(r.code,{children:`date-fns`}),`:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`functional approach`}),`
`,(0,n.jsx)(r.li,{children:`immutable structure`}),`
`,(0,n.jsxs)(r.li,{children:[`uses the browses native `,(0,n.jsx)(r.code,{children:`Date`}),` object as the basis`]}),`
`,(0,n.jsx)(r.li,{children:`strong and consistent API`}),`
`,(0,n.jsx)(r.li,{children:`very modular`}),`
`,(0,n.jsx)(r.li,{children:`good and flexible locales support`}),`
`,(0,n.jsx)(r.li,{children:`supports three shaking`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`React`}),`
`,(0,n.jsx)(r.h3,{children:`Handling of React State`}),`
`,(0,n.jsxs)(r.p,{children:[`Kent C. Dodds has a good `,(0,n.jsx)(r.a,{href:`https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster`,children:`article on when and where to put React State`}),` with `,(0,n.jsx)(r.a,{href:`https://res.cloudinary.com/kentcdodds-com/image/upload/v1625033349/kentcdodds.com/content/blog/state-colocation-will-make-your-react-app-faster/where-to-put-state.png`,title:`This chart shows the when and where to put React State`,children:`this chart`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`Please avoid having logic in your JSX syntax. Even it is possible to have a lot of logic in JSX because of the functional architecture, rather enforce using React Context to hide logic.`}),`
`,(0,n.jsx)(r.h3,{children:`Readable JSX`}),`
`,(0,n.jsx)(r.p,{children:`Small components are readable regardless. But once a Component gets large, things changes. Therefore I (Tobias Høegh) thought a lot about how to make larger components readable. So here is my approach:`}),`
`,(0,n.jsxs)(r.p,{children:[`Think of laying out your markup like reading a book. Yes, `,(0,n.jsx)(r.strong,{children:`reading a book`}),`.
You have your;`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`intro`}),`
`,(0,n.jsx)(r.li,{children:`content`}),`
`,(0,n.jsx)(r.li,{children:`summary`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`So, what if you put your main markup on top? following by the content, and as a settlement to the content, we follow up with the logic? Then we get these three topics.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Main component`}),`
`,(0,n.jsx)(r.li,{children:`Sub components`}),`
`,(0,n.jsx)(r.li,{children:`Logic`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`The good thing about this is, we get quickly an overview what the component contains. Here is an example using a `,(0,n.jsx)(r.em,{children:`form`}),` as our basis:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`// 1. Readable markup
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
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};