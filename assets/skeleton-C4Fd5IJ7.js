import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r,{a as i,i as a,n as o,r as s,t as c}from"./demos-BQ32Ide9.js";var l=e(t());function u(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Import`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-tsx`,children:`import { Skeleton } from '@dnb/eufemia'
`})}),`
`,(0,l.jsx)(t.h2,{children:`Description`}),`
`,(0,l.jsx)(t.p,{children:`The Skeleton component is a visual building block that helps provide loading placeholders. It displays a non-interactive preview of the actual UI of the component, visually communicating that content is being processed.`}),`
`,(0,l.jsx)(t.p,{children:`After 5 seconds, an animation is shown that times out after 30 seconds.`}),`
`,(0,l.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/skeleton`,children:`Source code`})}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/skeleton`,children:`Docs code`})}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Take into consideration`}),`
`,(0,l.jsx)(t.p,{children:`It should be used carefully and not as a quick loading indicator replacement. The browser will use additional resources to render the additional state. If it is misused, such as showing a significantly different UI or being shown for just a fraction of a second, it can distract from the user experience rather than enhancing it.`}),`
`,(0,l.jsx)(t.p,{children:`Also, in some setups, the user may need to download almost the entire web application before skeletons can be shown during API calls.`}),`
`,(0,l.jsx)(t.h3,{children:`Prerendered pages`}),`
`,(0,l.jsx)(t.p,{children:`A prerendered setup is a good fit to utilize a strong skeleton user experience from the very first page visit. Every page can load quickly, and we can take advantage of this by showing our skeleton as the initial state.`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsx)(t.li,{children:`The skeletons will show up during the very first paint – even without JavaScript enabled.`}),`
`,(0,l.jsx)(t.li,{children:`Next, our page loads the needed application bundle, so we can start an API call to get our user data.`}),`
`,(0,l.jsx)(t.li,{children:`Now our application renders.`}),`
`,(0,l.jsx)(t.li,{children:`Finally, we have the user data to display.`}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Elements and components should still be responsive to screen width and font size.`}),`
`,(0,l.jsx)(t.li,{children:`Screen readers will get a mention that the loading state has finished as an aria-live update.`}),`
`,(0,l.jsx)(t.li,{children:`Components and interactive elements are not accessible for keyboard users.`}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`When not to use`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`For low-traffic pages, such as super-user-only admin pages, use a loading spinner instead.`}),`
`,(0,l.jsxs)(t.li,{children:[`For a tiny, inline action or feedback, e.g. clicked a button and the action will take time, use the `,(0,l.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),` instead (animation).`]}),`
`,(0,l.jsxs)(t.li,{children:[`For fast processes that take less than `,(0,l.jsx)(t.code,{children:`300ms`}),`, consider the `,(0,l.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),` or no loading state at all.`]}),`
`,(0,l.jsxs)(t.li,{children:[`For a background process or a long-running process, e.g. importing data or exporting reports, use the `,(0,l.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),` instead (percentage).`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`When to use`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Use on high-traffic pages and landing pages, if they require a loading state.`}),`
`,(0,l.jsx)(t.li,{children:`Use when there’s more than one element loading at the same time that requires an indicator.`}),`
`,(0,l.jsxs)(t.li,{children:[`Use when the process would take more than `,(0,l.jsx)(t.code,{children:`300ms`}),` to load on an average internet connection.`]}),`
`,(0,l.jsxs)(t.li,{children:[`Use the Skeleton component when the `,(0,l.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),` is not prominent enough.`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`How to use`}),`
`,(0,l.jsx)(t.p,{children:`You can use the Skeleton component as a provider for all underlying components, like inputs and buttons. This way, you can simply toggle on and off the skeletons. And all the spacing and sizing will be given from the components themselves.`}),`
`,(0,l.jsx)(t.p,{children:`But you can also use the Skeleton component to show a fake article or other figures.`}),`
`,(0,l.jsx)(t.h2,{children:`How it works`}),`
`,(0,l.jsx)(t.p,{children:`Every Eufemia component should support a skeleton natively. But for simplification, you can use the Skeleton component as a provider to enable the skeletons for a group of components.`}),`
`,(0,l.jsxs)(t.p,{children:[`If you use the skeleton as a provider, the `,(0,l.jsx)(t.a,{href:`/uilib/layout/space`,children:`Space`}),` component is used as a wrapper. This wrapper also helps the underlying components to define the style type or animation. If only the defaults are used, then you can skip it by setting the element to `,(0,l.jsx)(t.code,{children:`false`}),` with `,(0,l.jsx)(t.code,{children:`element={false}`}),`.`]}),`
`,(0,l.jsxs)(t.p,{children:[`But the Skeleton component also supports a set of ready-to-use figures. Use it like `,(0,l.jsx)(t.code,{children:`figure="article"`}),`.`]}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(t.h2,{children:`Global Provider`}),`
`,(0,l.jsxs)(t.p,{children:[`You can also use the global `,(0,l.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),` to enable the underlying skeletons. You can even have multiple providers wrapped.`]}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsx)(t.h2,{children:`Exclude a part`}),`
`,(0,l.jsxs)(t.p,{children:[`You can easily exclude a part from being transformed to a skeleton by using `,(0,l.jsx)(t.code,{children:`Skeleton.Exclude`}),`.`]}),`
`,(0,l.jsx)(o,{}),`
`,(0,l.jsx)(t.h2,{children:`Suspense`}),`
`,(0,l.jsx)(t.p,{children:`You can take advantage of an async component by using the React Suspense with a skeleton fallback.`}),`
`,(0,l.jsx)(i,{}),`
`,(0,l.jsx)(t.h2,{children:`Create a custom skeleton`}),`
`,(0,l.jsx)(t.p,{children:`In order to create the same skeletons as the build-ins, you can make use of a couple of helper tools.`}),`
`,(0,l.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d,{}),`
`,(0,l.jsx)(r,{})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(f,{...e})}):f(e)}export{p as default};