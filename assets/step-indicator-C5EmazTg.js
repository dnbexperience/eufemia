import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-B41l89en.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { StepIndicator } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The step indicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions. Their purpose is to both guide the user through the process and to help them create a mental model of the amount of time and effort that is required to fulfill the process.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=15878-71`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/step-indicator`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/step-indicator`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`If the user should be able to navigate back and forth, use the `,(0,r.jsx)(n.code,{children:`mode="loose"`}),` property. More about the modes further down.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The current active step is set with the `,(0,r.jsx)(n.code,{children:`currentStep`}),` property or within the data with the `,(0,r.jsx)(n.code,{children:`isCurrent`}),` object property.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` Whenever possible, ensure you bind the `,(0,r.jsx)(n.code,{children:`currentStep`}),` to the browsers path location. See the `,(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator/#stepindicator-with-a-router`,children:`example below`}),` or `,(0,r.jsx)(n.a,{href:`https://codesandbox.io/s/eufemia-step-indicator-with-reach-router-mhu0bh?file=/src/App.tsx`,children:`the example on CodeSandbox`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Modes`}),`
`,(0,r.jsx)(n.p,{children:`The mode property is mandatory. It tells the component how it should behave.`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator#strict-mode`,children:`strict`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator#loose-mode`,children:`loose`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator#static-mode`,children:`static`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Strict mode`}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`strict`}),` for a chronological step order.`]}),`
`,(0,r.jsx)(n.p,{children:`The user can navigate between the visited steps and the current step. The component keeps track of these reached steps.`}),`
`,(0,r.jsx)(n.h3,{children:`Loose mode`}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`loose`}),` if the user should be able to navigate freely between all steps. Also, those which are not visited before.`]}),`
`,(0,r.jsx)(n.h3,{children:`Static mode`}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`static`}),` for non-interactive steps.`]}),`
`,(0,r.jsx)(n.h2,{children:`Modify a step`}),`
`,(0,r.jsxs)(n.p,{children:[`You can easily modify a step – e.g. should one step not be interactive, you can use the `,(0,r.jsx)(n.code,{children:`inactive`}),` property on that step:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-js`,children:`const steps = [
  { title: 'Active' },
  { title: 'Not active', inactive: true },
]
`})}),`
`,(0,r.jsxs)(n.p,{children:[`More details about modifying steps in the `,(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator/properties#step-item-properties`,children:`properties panel`}),`.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};