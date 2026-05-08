import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Testing frontend code`}),`
`,(0,n.jsx)(r.p,{children:`It is a good idea to include some tips and tricks for frontend testing.
Since accessibility and user experience are major factors in any design system, it may be sensible to include some tips and tricks for frontend testing.`}),`
`,(0,n.jsx)(r.h2,{children:`Write tests, but not too many`}),`
`,(0,n.jsx)(r.p,{children:`That said, write tests to gain confidence that your code is strong for both refactoring, enhancements and new features.`}),`
`,(0,n.jsx)(r.p,{children:`Frontend code is changing and moving fast. So 100% code coverage should never be a goal by itself, rather try to make tests which reflect what the end-user would do. By doing so, you will probably cover several internal functions and states by simulating a "click" anyways.`}),`
`,(0,n.jsx)(r.h3,{children:`Static testing`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use static testers like `,(0,n.jsx)(r.strong,{children:`ESLint`}),` (also in your editor of choice) to detect typos etc.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use code formatters like `,(0,n.jsx)(r.strong,{children:`Prettier`}),` to uniform code style. This makes working together so much more fun and makes your everyday more productive.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Like ESLint, there is also a linter for styling, called `,(0,n.jsx)(r.strong,{children:`StyleLint`}),`. It works even on styled components.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Integration tests`}),`
`,(0,n.jsx)(r.p,{children:`Do not write unit tests in frontend code. But make integration tests. Avoid testing implementation details, but rather treat front-end related components as an independent, changeable and maintainable individuals.`}),`
`,(0,n.jsx)(r.p,{children:`Think as a user. Think how the user will interact with your application. Do not shallow test, but test components like a user would interact (use mount or render to also test their children).`}),`
`,(0,n.jsx)(r.p,{children:`Try to use queries that help you to find elements in the same way that end-users will find them.`}),`
`,(0,n.jsx)(r.p,{children:`React Testing Library provides queries that allow you to find elements by their role, label, placeholder, text contents, display value, alt text, title, test ID (it is only recommended to use this after the other queries do not work for your use case).`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.em,{children:`"Using data-testid attributes do not resemble how your software is used and should be avoided if possible"`}),` - `,(0,n.jsx)(r.a,{href:`https://testing-library.com/docs/queries/bytestid/`,children:`React Testing Library`})]}),`
`,(0,n.jsx)(r.h3,{children:`Automatic accessibility testing`}),`
`,(0,n.jsxs)(r.p,{children:[`There are several packages you can integrate in your test, so your can test your code for accessibility e.g. `,(0,n.jsx)(r.code,{children:`axe`}),` and `,(0,n.jsx)(r.code,{children:`pa11y`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`End-to-end testing`}),`
`,(0,n.jsx)(r.p,{children:`Having tests which actually run in a browser, makes a lot of sense in frontend code. This method of testing is good to gain confidence and ensure a flow of interactions is working correctly - like a user registration process.`}),`
`,(0,n.jsx)(r.p,{children:`Of course, end-to-end tests can be run on a CI server as well. Make sure you run your tests against a production-like version of your application.`})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};