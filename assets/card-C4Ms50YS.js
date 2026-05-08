import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{d as n,r}from"./Examples-CCGxQ79Q.js";import i from"./demos-CSmqNPkx.js";var a=e();function o(e){let i={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return r||c(`Examples`,!1),n||c(`Examples.WithHeadingsAndAriaLabel`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.h2,{children:`Import`}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`import { Card } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(i.h2,{children:`Description`}),`
`,(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.code,{children:`Card`}),` is a block section element showing the white box with rounded gray borders, adding spacing automatically.`]}),`
`,(0,a.jsxs)(i.p,{children:[`It uses `,(0,a.jsx)(i.a,{href:`/uilib/layout/flex/item`,children:`Flex.Item`}),` under the hood. When one of these properties were given, `,(0,a.jsx)(i.code,{children:`stack`}),`, `,(0,a.jsx)(i.code,{children:`direction`}),` or `,(0,a.jsx)(i.code,{children:`spacing`}),` – the `,(0,a.jsx)(i.a,{href:`/uilib/layout/flex/container`,children:`Flex.Container`}),` will be used.`]}),`
`,(0,a.jsx)(i.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/card`,children:`Source code`})}),`
`,(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/card`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Card } from '@dnb/eufemia'
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
`,(0,a.jsx)(i.h2,{children:`Accessibility`}),`
`,(0,a.jsxs)(i.p,{children:[`It uses a `,(0,a.jsx)(i.code,{children:`section`}),` element. Which allows you to add an `,(0,a.jsx)(i.code,{children:`aria-label`}),` or `,(0,a.jsx)(i.code,{children:`aria-labelledby`}),` to provide screen readers with landmarks.`]}),`
`,(0,a.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(i,{})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};