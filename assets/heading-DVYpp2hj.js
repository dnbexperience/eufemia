import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r,{i,n as a,r as o,t as s}from"./demos-mBf-qDSO2.js";var c=e(t());function l(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Import`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Heading } from '@dnb/eufemia'
`})}),`
`,(0,c.jsx)(t.h2,{children:`Description`}),`
`,(0,c.jsx)(t.p,{children:`The Heading component is a helper to create automated semantic headings within a boundary of the web heading rules.`}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsx)(t.p,{children:`Basically, only assistive technologies do need semantic headings. But they need them correct.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/heading`,children:`Source code`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/heading`,children:`Docs code`})}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`How does it work? The heading leveling is handled synchronously. But you can easily isolate one level, or a part by using a context provider: `,(0,c.jsx)(t.code,{children:`<Heading.Level ...`}),`. This allows you to later, asynchronous, add new headings inside. You can nest several contexts inside each.`]}),`
`,(0,c.jsxs)(t.p,{children:[`The first code example is without using context provider. To handle levels in batches or asynchronous, use a `,(0,c.jsx)(t.code,{children:`Heading.Level`}),` context provider.`]}),`
`,(0,c.jsx)(s,{}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`NB:`}),` Instead of `,(0,c.jsx)(t.code,{children:`increase`}),` and `,(0,c.jsx)(t.code,{children:`decrease`}),` you can use `,(0,c.jsx)(t.code,{children:`up`}),` and `,(0,c.jsx)(t.code,{children:`down`}),` as well.`]}),`
`,(0,c.jsx)(t.h3,{children:`Heading level core-concept`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`A `,(0,c.jsx)(t.strong,{children:`heading`}),` will inherit the level from its previous sibling.`]}),`
`,(0,c.jsxs)(t.li,{children:[`A `,(0,c.jsx)(t.strong,{children:`level provider`}),` will create an isolated level context (`,(0,c.jsx)(t.code,{children:`Heading.Level`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[`A heading, nested inside a context (`,(0,c.jsx)(t.code,{children:`Heading.Level`}),`) will likewise inherit the previous context level.`]}),`
`,(0,c.jsxs)(t.li,{children:[`A heading can have a set of different `,(0,c.jsx)(t.a,{href:`/uilib/elements/heading`,children:`size`}),` properties. More details below.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{children:`Defining heading styles / sizes`}),`
`,(0,c.jsxs)(t.p,{children:[`For the visual part, we simply use `,(0,c.jsx)(t.a,{href:`/uilib/elements/heading`,children:`typography styles`}),` with the `,(0,c.jsx)(t.code,{children:`size`}),` property, e.g. `,(0,c.jsx)(t.code,{children:`size="x-large"`})]}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsx)(t.h3,{children:`Heading level rules and corrections`}),`
`,(0,c.jsx)(t.p,{children:`The correction will ensure that:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`a heading will start with a level `,(0,c.jsx)(t.strong,{children:`1`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`the second level will get corrected be level `,(0,c.jsx)(t.strong,{children:`2`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`if a level will increase with a factor of more than one (level={>1}), it will get corrected to only increase by one (`,(0,c.jsx)(t.strong,{children:`1`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[`if a level will be set to `,(0,c.jsx)(t.strong,{children:`1`}),` a second time, it will get corrected to level `,(0,c.jsx)(t.strong,{children:`2`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`You get a `,(0,c.jsx)(t.code,{children:`console.warn`}),` warning (only in development) about corrections. You can attach a custom warning / handler if you need that: `,(0,c.jsx)(t.code,{children:`<Heading.Level debug={(...logs) => console.info(...logs)}>`})]}),`
`,(0,c.jsxs)(t.p,{children:[`You can also disable corrections by using the property `,(0,c.jsx)(t.code,{children:`skipCorrection={true}`}),`.`]}),`
`,(0,c.jsx)(t.h3,{children:`Heading level context provider / asynchronous`}),`
`,(0,c.jsxs)(t.p,{children:[`In order to control leveling of headings systematically, you can make use of the `,(0,c.jsx)(t.code,{children:`Heading.Level`}),`, `,(0,c.jsx)(t.code,{children:`Heading.Increase`}),` or `,(0,c.jsx)(t.code,{children:`Heading.Decrease`}),` providers.`]}),`
`,(0,c.jsx)(t.p,{children:`They are completely optional. But can help out to solve some kinds of challenges or logic.`}),`
`,(0,c.jsx)(o,{}),`
`,(0,c.jsx)(t.h3,{children:`Skip auto correction and warnings`}),`
`,(0,c.jsxs)(t.p,{children:[`First, warnings will not show up in production builds. And to skip the auto correction of heading levels, simply use the `,(0,c.jsx)(t.code,{children:`skipCorrection`}),` property.`]}),`
`,(0,c.jsx)(t.h3,{children:`Heading levels interceptor modification`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetLevels } from '@dnb/eufemia/components/Heading'

function HeadingLevelReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    resetLevels(1)

    // You can also call this method like this:
    Heading.resetLevels(1)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <HeadingLevelReset />
      <Routes>{/* page routes */}</Routes>
    </>
  )
}

// e.g. if you for some reason have to force setting a new level (Heading.setNextLevel)
setNextLevel(3)
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Limitations:`}),` `,(0,c.jsx)(t.code,{children:`resetLevels`}),` and `,(0,c.jsx)(t.code,{children:`setNextLevel`}),` does not change contexts with an entry level higher than one (1).
In order to change also contexts, you can set `,(0,c.jsx)(t.code,{children:`overwriteContext`}),` to true:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-js`,children:`Heading.resetLevels(1, { overwriteContext: true })
Heading.setNextLevel(4, { overwriteContext: true })
`})}),`
`,(0,c.jsx)(t.h4,{children:`Heading and routers`}),`
`,(0,c.jsxs)(t.p,{children:[`In order to reset the leveling during a page transition on using `,(0,c.jsx)(t.code,{children:`react-router-dom`}),` v5, you can make use of `,(0,c.jsx)(t.code,{children:`withRouter`}),`.
In v6 or another router with page-level components, you just call it in the correct "page" component.
You could additionally define "what is a page change" and what not, by using the `,(0,c.jsx)(t.code,{children:`location: { pathname }`}),` property you get inside these routing components.`]}),`
`,(0,c.jsx)(t.h3,{children:`Basic heading elements`}),`
`,(0,c.jsx)(t.p,{children:`You may still consider of using the basic elements. But keep in mind, you have to define headings responsibly.`}),`
`,(0,c.jsx)(a,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}function d(e){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u,{}),`
`,(0,c.jsx)(r,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}export{f as default};