import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DfKpi57X.js";import{W as i,j as a,w as o}from"./forms-D54jfDKN.js";import{U as s}from"./index-BsJ3GLEw.js";import{t as c}from"./ComponentBox-sLMgHvLi.js";var l=e({CountCharactersDown:()=>d,CountCharactersExceeded:()=>p,CountCharactersInteractive:()=>m,CountCharactersUp:()=>f}),u=t(n());function d(){return(0,u.jsx)(c,{"data-visual-test":`text-counter-down`,stableName:`CountCharactersDown`,sourceImports:[`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { TextCounterProps } from '@dnb/eufemia/fragments/text-counter/TextCounter'`],__buildScope:{TextCounter:i},children:`<TextCounter variant="down" text="test" max={10} />
`})}function f(){return(0,u.jsx)(c,{"data-visual-test":`text-counter-up`,stableName:`CountCharactersUp`,sourceImports:[`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { TextCounterProps } from '@dnb/eufemia/fragments/text-counter/TextCounter'`],__buildScope:{TextCounter:i},children:`<TextCounter variant="up" text="test" max={10} />
`})}function p(){return(0,u.jsx)(c,{"data-visual-test":`text-counter-exceeded`,stableName:`CountCharactersExceeded`,sourceImports:[`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { TextCounterProps } from '@dnb/eufemia/fragments/text-counter/TextCounter'`],__buildScope:{TextCounter:i},children:`<TextCounter text="test" max={2} />
`})}function m(){return(0,u.jsx)(c,{stableName:`CountCharactersInteractive`,sourceImports:[`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { TextCounterProps } from '@dnb/eufemia/fragments/text-counter/TextCounter'`],__buildScope:{Form:o,Flex:r,Field:a,TextCounter:i},noInline:!0,children:`const text = 'Count me!'
const variant: TextCounterProps['variant'] = 'down'
const Counter = () => {
  const { data } = Form.useData('text-counter', {
    max: 10,
    variant,
    text,
  })
  return (
    <Flex.Stack divider="line">
      <Flex.Vertical gap="x-small">
        <Field.String label="Text" path="/text" maxLength={data.max} />
        <TextCounter
          variant={data.variant}
          text={data.text}
          max={data.max}
        />
      </Flex.Vertical>
      <Field.Toggle
        valueOn="down"
        valueOff="up"
        textOn="Down"
        textOff="Up"
        variant="buttons"
        label="Variant"
        path="/variant"
      />
    </Flex.Stack>
  )
}
render(
  <Form.Handler id="text-counter">
    <Counter />
  </Form.Handler>
)
`})}function h(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||_(`Examples`,!1),d||_(`Examples.CountCharactersDown`,!0),p||_(`Examples.CountCharactersExceeded`,!0),m||_(`Examples.CountCharactersInteractive`,!0),f||_(`Examples.CountCharactersUp`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Interactive`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Count characters downwards`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Count characters upwards`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Show message as exceeded`}),`
`,(0,u.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};