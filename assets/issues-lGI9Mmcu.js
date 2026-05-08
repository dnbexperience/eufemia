import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{t as n}from"./Img-A9Xy5Pz4.js";var r=e();function i(e){let i={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`Issue reporting`}),`
`,(0,r.jsxs)(i.p,{children:[`If you discover a `,(0,r.jsx)(i.strong,{children:`security issue`}),` in the `,(0,r.jsx)(i.code,{children:`@dnb/eufemia`}),` library, please report it by sending an
email to `,(0,r.jsx)(i.a,{href:`mailto:tobias.hoegh@dnb.no`,children:`tobias.hoegh@dnb.no`}),`. This will allow us to assess the risk, and make a fix available before we add a
bug report to the GitHub repository. Thanks for helping out.`]}),`
`,(0,r.jsxs)(i.p,{children:[`When reporting issues or suggesting new features, we would appreciate if you use `,(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/issues`,children:`GitHub Issues`}),` or our `,(0,r.jsx)(i.a,{href:`https://dnb-asa.atlassian.net/jira/software/c/projects/EDS/summary`,children:`Jira Kanban board`}),`. Another option is to send a Slack message in `,(0,r.jsx)(i.a,{href:`https://dnb-it.slack.com/archives/CMXABCHEY`,children:`#eufemia-web`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`For reproduction of issues you can use our `,(0,r.jsx)(i.a,{href:`/issue/`,children:`starter templates`}),` (StackBlitz or CodeSandbox). Including this in your report helps us out a lot.`]}),`
`,(0,r.jsx)(i.h2,{children:`GitHub issues`}),`
`,(0,r.jsxs)(i.p,{children:[`When reporting issues on GitHub, you need to have a `,(0,r.jsx)(i.a,{href:`https://github.com/join`,children:`GitHub account`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`First step is to click on the `,(0,r.jsx)(i.code,{children:`New issue`}),` button in the `,(0,r.jsx)(i.code,{children:`Issues tab`}),` on GitHub.`]}),`
`,(0,r.jsx)(n,{src:`/images/report-issue.png`,width:`900`,alt:`Screenshot of the location of new issue button on GitHub`,top:!0,bottom:!0}),`
`,(0,r.jsxs)(i.p,{children:[`The next step will show you all the possibilities for new issues. Create a new `,(0,r.jsx)(i.code,{children:`Bug Report`}),` or a `,(0,r.jsx)(i.code,{children:`Feature Proposal`}),` to go next.`]}),`
`,(0,r.jsx)(n,{src:`/images/report-issue-part-2.png`,width:`900`,alt:`Screenshot of the possibilities in creating a new issue`,top:!0}),`
`,(0,r.jsx)(i.p,{children:`These will each have a prepared template you need to fill out in order to submit your issue.`}),`
`,(0,r.jsx)(i.h2,{children:`Eufemia Version`}),`
`,(0,r.jsx)(i.h3,{children:`Browser – JS`}),`
`,(0,r.jsx)(i.p,{children:`To check the JS version used on the current page, type in your browser console:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`Eufemia.version
`})}),`
`,(0,r.jsx)(i.p,{children:`To view both the JS and CSS versions, along with all Eufemia versions currently rendered on the page:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`Eufemia.versions
`})}),`
`,(0,r.jsx)(i.h3,{children:`Browser – CSS`}),`
`,(0,r.jsx)(i.p,{children:`To check the CSS version used on the current page, run in your browser console:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`window
  .getComputedStyle(document.body)
  .getPropertyValue('--eufemia-version')
`})}),`
`,(0,r.jsx)(i.h3,{children:`Node.js`}),`
`,(0,r.jsx)(i.p,{children:`To find out which Eufemia version is imported in Node.js:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`// Use "require" instead of "import" if needed
import { version } from '@dnb/eufemia/shared/Eufemia'

console.log('Eufemia version:', version)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};