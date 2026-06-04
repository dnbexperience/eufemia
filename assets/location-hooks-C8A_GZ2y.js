import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-D5dZv4TT.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`In order to store the current step in the browser location:`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/location-hooks`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-bash`,children:`https://www.dnb.no/path/?unique-id-step=1
`})}),`
`,(0,i.jsx)(t.p,{children:`You may use one of the listed React Hooks to easily integrate your application router.`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`id`}),` parameter is used to identify the `,(0,i.jsx)(t.code,{children:`Wizard.Container`}),` component. But it is not required when used inside a `,(0,i.jsx)(t.code,{children:`Wizard.Container`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Supported routers`}),`
`,(0,i.jsx)(t.p,{children:`If you use a router, you may connect one of the supported hooks to it. This way your application will not import unnecessary and unused code.`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`https://reactrouter.com/`,children:`react-router-dom`}),` via `,(0,i.jsx)(t.a,{href:`#with-react-router-dom`,children:`useReactRouter`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`https://reach.tech/router/`,children:`@reach/router`}),` via `,(0,i.jsx)(t.a,{href:`#with-reachrouter`,children:`useReachRouter`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`https://nextjs.org/`,children:`Next.js`}),` via `,(0,i.jsx)(t.a,{href:`#with-nextnavigation`,children:`useNextRouter`})]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`If you do not use a router, you can make use of the `,(0,i.jsx)(t.a,{href:`#without-a-router`,children:`useQueryLocator`}),` hook.`]}),`
`,(0,i.jsxs)(t.h3,{children:[`With `,(0,i.jsx)(t.code,{children:`react-router-dom`})]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useSearchParams } from 'react-router-dom'

function MyForm() {
  Wizard.useReactRouter('unique-id', { useSearchParams })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.h3,{children:[`With `,(0,i.jsx)(t.code,{children:`@reach/router`})]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { navigate, useLocation } from '@reach/router'

function MyForm() {
  Wizard.useReachRouter('unique-id', { useLocation, navigate })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.h3,{children:[`With `,(0,i.jsx)(t.code,{children:`next/navigation`})]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function MyForm() {
  Wizard.useNextRouter('unique-id', {
    useRouter,
    usePathname,
    useSearchParams,
  })

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsx)(t.h4,{children:`SSR support`}),`
`,(0,i.jsxs)(t.p,{children:[`Each hook has a `,(0,i.jsx)(t.code,{children:`getIndex`}),` function to get the current step index. You can unitize it to set the initial step index.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function MyForm() {
  const { getIndex } = Wizard.useNextRouter('unique-id', {
    useRouter,
    usePathname,
    useSearchParams,
  })

  return (
    <Form.Handler>
      <Wizard.Container initialActiveIndex={getIndex()} id="unique-id">
        ...
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsx)(t.h2,{children:`Without a router`}),`
`,(0,i.jsxs)(t.p,{children:[`You connect the hook with the `,(0,i.jsx)(t.code,{children:`Wizard.Container`}),` component via a unique `,(0,i.jsx)(t.code,{children:`id`}),` (string, function, object or React Context as the reference). The `,(0,i.jsx)(t.code,{children:`id`}),` will be used in the URL query string: `,(0,i.jsx)(t.code,{children:`url?unique-id-step=1`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  Wizard.useQueryLocator('unique-id')

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};