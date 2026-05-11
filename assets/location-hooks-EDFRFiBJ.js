import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-YNNvVjeW.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`In order to store the current step in the browser location:`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/location-hooks`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-bash`,children:`https://www.dnb.no/path/?unique-id-step=1
`})}),`
`,(0,r.jsx)(n.p,{children:`You may use one of the listed React Hooks to easily integrate your application router.`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`id`}),` parameter is used to identify the `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` component. But it is not required when used inside a `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Supported routers`}),`
`,(0,r.jsx)(n.p,{children:`If you use a router, you may connect one of the supported hooks to it. This way your application will not import unnecessary and unused code.`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:`https://reactrouter.com/`,children:`react-router-dom`}),` via `,(0,r.jsx)(n.a,{href:`#with-react-router-dom`,children:`useReactRouter`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:`https://reach.tech/router/`,children:`@reach/router`}),` via `,(0,r.jsx)(n.a,{href:`#with-reachrouter`,children:`useReachRouter`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:`https://nextjs.org/`,children:`Next.js`}),` via `,(0,r.jsx)(n.a,{href:`#with-nextnavigation`,children:`useNextRouter`})]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`If you do not use a router, you can make use of the `,(0,r.jsx)(n.a,{href:`#without-a-router`,children:`useQueryLocator`}),` hook.`]}),`
`,(0,r.jsxs)(n.h3,{children:[`With `,(0,r.jsx)(n.code,{children:`react-router-dom`})]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
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
`,(0,r.jsxs)(n.h3,{children:[`With `,(0,r.jsx)(n.code,{children:`@reach/router`})]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
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
`,(0,r.jsxs)(n.h3,{children:[`With `,(0,r.jsx)(n.code,{children:`next/navigation`})]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
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
`,(0,r.jsx)(n.h4,{children:`SSR support`}),`
`,(0,r.jsxs)(n.p,{children:[`Each hook has a `,(0,r.jsx)(n.code,{children:`getIndex`}),` function to get the current step index. You can unitize it to set the initial step index.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
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
`,(0,r.jsx)(n.h2,{children:`Without a router`}),`
`,(0,r.jsxs)(n.p,{children:[`You connect the hook with the `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` component via a unique `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference). The `,(0,r.jsx)(n.code,{children:`id`}),` will be used in the URL query string: `,(0,r.jsx)(n.code,{children:`url?unique-id-step=1`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  Wizard.useQueryLocator('unique-id')

  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">...</Wizard.Container>
    </Form.Handler>
  )
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};