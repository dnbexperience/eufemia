import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import{f as r,r as i}from"./Examples-BrjC1_C4.js";import a from"./demos-Cp4y1xyV.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return i||l(`Examples`,!1),r||l(`Examples.WithHeadingsAndAriaLabel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
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
`,(0,o.jsx)(r,{}),`
`,(0,o.jsx)(t.h2,{children:`Card.List and Card.ListItem`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`Card.List`}),` and `,(0,o.jsx)(t.code,{children:`Card.ListItem`}),` to render a semantic `,(0,o.jsx)(t.code,{children:`<ul>`}),` / `,(0,o.jsx)(t.code,{children:`<li>`}),` list of cards. `,(0,o.jsx)(t.code,{children:`Card.List`}),` provides a responsive flex layout with wrapping. `,(0,o.jsx)(t.code,{children:`Card.ListItem`}),` supports a `,(0,o.jsx)(t.code,{children:`center`}),` prop to center content vertically — set it to `,(0,o.jsx)(t.code,{children:`true`}),` to always center, or `,(0,o.jsx)(t.code,{children:`"when-small"`}),` to center only on small screens.`]})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};