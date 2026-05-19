import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{zr as n}from"./index-DqqByKA2.js";import{d as r,r as i}from"./Examples-xhZrpm7X.js";import a from"./demos-DHUF_4ll.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return i||l(`Examples`,!1),r||l(`Examples.WithHeadingsAndAriaLabel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Card } from '@dnb/eufemia'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`Card`}),` is a block section element showing the white box with rounded gray borders, adding spacing automatically.`]}),`
`,(0,o.jsxs)(t.p,{children:[`It uses `,(0,o.jsx)(t.a,{href:`/uilib/layout/flex/item`,children:`Flex.Item`}),` under the hood. When one of these properties were given, `,(0,o.jsx)(t.code,{children:`stack`}),`, `,(0,o.jsx)(t.code,{children:`direction`}),` or `,(0,o.jsx)(t.code,{children:`spacing`}),` – the `,(0,o.jsx)(t.a,{href:`/uilib/layout/flex/container`,children:`Flex.Container`}),` will be used.`]}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/card`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/card`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { Card } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler data={existingData} onSubmit={submitHandler}>
    <Card>
      <Field.Email path="/dataPath" />
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Card>
  </Form.Handler>
)
`})}),`
`,(0,o.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,o.jsxs)(t.p,{children:[`It uses a `,(0,o.jsx)(t.code,{children:`section`}),` element. Which allows you to add an `,(0,o.jsx)(t.code,{children:`aria-label`}),` or `,(0,o.jsx)(t.code,{children:`aria-labelledby`}),` to provide screen readers with landmarks.`]}),`
`,(0,o.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};