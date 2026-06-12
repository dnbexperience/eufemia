import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{t as r}from"./Img-Ds0SJqAP.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Issue reporting`}),`
`,(0,i.jsxs)(t.p,{children:[`If you discover a `,(0,i.jsx)(t.strong,{children:`security issue`}),` in the `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),` library, please report it by sending an
email to `,(0,i.jsx)(t.a,{href:`mailto:tobias.hoegh@dnb.no`,children:`tobias.hoegh@dnb.no`}),`. This will allow us to assess the risk, and make a fix available before we add a
bug report to the GitHub repository. Thanks for helping out.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When reporting issues or suggesting new features, we would appreciate if you use `,(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/issues`,children:`GitHub Issues`}),` or our `,(0,i.jsx)(t.a,{href:`https://dnb-asa.atlassian.net/jira/software/c/projects/EDS/summary`,children:`Jira Kanban board`}),`. Another option is to send a Slack message in `,(0,i.jsx)(t.a,{href:`https://dnb-it.slack.com/archives/CMXABCHEY`,children:`#eufemia-web`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`For reproduction of issues you can use our `,(0,i.jsx)(t.a,{href:`/issue/`,children:`starter templates`}),`. Including this in your report helps us out a lot.`]}),`
`,(0,i.jsx)(t.h2,{children:`Open in StackBlitz`}),`
`,(0,i.jsxs)(t.p,{children:[`Every code example in the Eufemia documentation has an `,(0,i.jsx)(t.strong,{children:`Open in StackBlitz`}),` button in the toolbar. Clicking it opens the code in a new StackBlitz project with all the necessary dependencies and configuration pre-configured. This is useful for quickly experimenting with a component or reproducing an issue.`]}),`
`,(0,i.jsx)(r,{src:`/images/open-in-stackblitz.png`,width:`900`,alt:`Screenshot of the Open in StackBlitz button in the code example toolbar`,top:!0,bottom:!0}),`
`,(0,i.jsx)(t.h2,{children:`GitHub issues`}),`
`,(0,i.jsxs)(t.p,{children:[`When reporting issues on GitHub, you need to have a `,(0,i.jsx)(t.a,{href:`https://github.com/join`,children:`GitHub account`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`First step is to click on the `,(0,i.jsx)(t.code,{children:`New issue`}),` button in the `,(0,i.jsx)(t.code,{children:`Issues tab`}),` on GitHub.`]}),`
`,(0,i.jsx)(r,{src:`/images/report-issue.png`,width:`900`,alt:`Screenshot of the location of new issue button on GitHub`,top:!0,bottom:!0}),`
`,(0,i.jsxs)(t.p,{children:[`The next step will show you all the possibilities for new issues. Create a new `,(0,i.jsx)(t.code,{children:`Bug Report`}),` or a `,(0,i.jsx)(t.code,{children:`Feature Proposal`}),` to go next.`]}),`
`,(0,i.jsx)(r,{src:`/images/report-issue-part-2.png`,width:`900`,alt:`Screenshot of the possibilities in creating a new issue`,top:!0}),`
`,(0,i.jsx)(t.p,{children:`These will each have a prepared template you need to fill out in order to submit your issue.`}),`
`,(0,i.jsx)(t.h2,{children:`Eufemia Version`}),`
`,(0,i.jsx)(t.h3,{children:`Browser – JS`}),`
`,(0,i.jsx)(t.p,{children:`To check the JS version used on the current page, type in your browser console:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`Eufemia.version
`})}),`
`,(0,i.jsx)(t.p,{children:`To view both the JS and CSS versions, along with all Eufemia versions currently rendered on the page:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`Eufemia.versions
`})}),`
`,(0,i.jsx)(t.h3,{children:`Browser – CSS`}),`
`,(0,i.jsx)(t.p,{children:`To check the CSS version used on the current page, run in your browser console:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`window
  .getComputedStyle(document.body)
  .getPropertyValue('--eufemia-version')
`})}),`
`,(0,i.jsx)(t.h3,{children:`Node.js`}),`
`,(0,i.jsx)(t.p,{children:`To find out which Eufemia version is imported in Node.js:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`// Use "require" instead of "import" if needed
import { version } from '@dnb/eufemia/shared/Eufemia'

console.log('Eufemia version:', version)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};