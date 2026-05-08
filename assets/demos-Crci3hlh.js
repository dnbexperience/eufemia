import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({CountCharactersDown:()=>o,CountCharactersExceeded:()=>c,CountCharactersInteractive:()=>l,CountCharactersUp:()=>s}),a=t();function o(){return(0,a.jsx)(n,{"data-visual-test":`text-counter-down`,children:`<TextCounter variant="down" text="test" max={10} />
`})}function s(){return(0,a.jsx)(n,{"data-visual-test":`text-counter-up`,children:`<TextCounter variant="up" text="test" max={10} />
`})}function c(){return(0,a.jsx)(n,{"data-visual-test":`text-counter-exceeded`,children:`<TextCounter text="test" max={2} />
`})}function l(){return(0,a.jsx)(n,{noInline:!0,children:`const text = 'Count me!'
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
`})}function u(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||f(`Examples`,!1),o||f(`Examples.CountCharactersDown`,!0),c||f(`Examples.CountCharactersExceeded`,!0),l||f(`Examples.CountCharactersInteractive`,!0),s||f(`Examples.CountCharactersUp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Interactive`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Count characters downwards`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Count characters upwards`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Show message as exceeded`}),`
`,(0,a.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};