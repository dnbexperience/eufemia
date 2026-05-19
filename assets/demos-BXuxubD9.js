import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CountCharactersDown:()=>s,CountCharactersExceeded:()=>l,CountCharactersInteractive:()=>u,CountCharactersUp:()=>c}),o=e(n());function s(){return(0,o.jsx)(r,{"data-visual-test":`text-counter-down`,stableName:`CountCharactersDown`,children:`<TextCounter variant="down" text="test" max={10} />
`})}function c(){return(0,o.jsx)(r,{"data-visual-test":`text-counter-up`,stableName:`CountCharactersUp`,children:`<TextCounter variant="up" text="test" max={10} />
`})}function l(){return(0,o.jsx)(r,{"data-visual-test":`text-counter-exceeded`,stableName:`CountCharactersExceeded`,children:`<TextCounter text="test" max={2} />
`})}function u(){return(0,o.jsx)(r,{stableName:`CountCharactersInteractive`,noInline:!0,children:`const text = 'Count me!'
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
`})}function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||p(`Examples`,!1),s||p(`Examples.CountCharactersDown`,!0),l||p(`Examples.CountCharactersExceeded`,!0),u||p(`Examples.CountCharactersInteractive`,!0),c||p(`Examples.CountCharactersUp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Interactive`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Count characters downwards`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Count characters upwards`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Show message as exceeded`}),`
`,(0,o.jsx)(l,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};