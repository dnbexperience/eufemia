import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-DHhEinDe.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { StepIndicator } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The step indicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions. Their purpose is to both guide the user through the process and to help them create a mental model of the amount of time and effort that is required to fulfill the process.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=15878-71`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/step-indicator`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/step-indicator`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`If the user should be able to navigate back and forth, use the `,(0,i.jsx)(t.code,{children:`mode="loose"`}),` property. More about the modes further down.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The current active step is set with the `,(0,i.jsx)(t.code,{children:`currentStep`}),` property or within the data with the `,(0,i.jsx)(t.code,{children:`isCurrent`}),` object property.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` Whenever possible, ensure you bind the `,(0,i.jsx)(t.code,{children:`currentStep`}),` to the browsers path location. See the `,(0,i.jsx)(t.a,{href:`/uilib/components/step-indicator/#stepindicator-with-a-router`,children:`example below`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Modes`}),`
`,(0,i.jsx)(t.p,{children:`The mode property is mandatory. It tells the component how it should behave.`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/components/step-indicator#strict-mode`,children:`strict`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/components/step-indicator#loose-mode`,children:`loose`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/components/step-indicator#static-mode`,children:`static`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Strict mode`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`strict`}),` for a chronological step order.`]}),`
`,(0,i.jsx)(t.p,{children:`The user can navigate between the visited steps and the current step. The component keeps track of these reached steps.`}),`
`,(0,i.jsx)(t.h3,{children:`Loose mode`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`loose`}),` if the user should be able to navigate freely between all steps. Also, those which are not visited before.`]}),`
`,(0,i.jsx)(t.h3,{children:`Static mode`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`static`}),` for non-interactive steps.`]}),`
`,(0,i.jsx)(t.h2,{children:`Modify a step`}),`
`,(0,i.jsxs)(t.p,{children:[`You can easily modify a step – e.g. should one step not be interactive, you can use the `,(0,i.jsx)(t.code,{children:`inactive`}),` property on that step:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`const steps = [
  { title: 'Active' },
  { title: 'Not active', inactive: true },
]
`})}),`
`,(0,i.jsxs)(t.p,{children:[`More details about modifying steps in the `,(0,i.jsx)(t.a,{href:`/uilib/components/step-indicator/properties#step-item-properties`,children:`properties panel`}),`.`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};