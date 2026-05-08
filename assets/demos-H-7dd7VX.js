import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({CustomTranslations:()=>o,GetTranslation:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyField = () => {
  type Translation = {
    Custom: {
      translation: string
    }
  }
  const { Custom, formatMessage } = Form.useTranslation<Translation>()
  const myTranslation = formatMessage(Custom.translation, {
    myKey: 'value!',
  })
  console.log('Custom', myTranslation)
  return <>{myTranslation}</>
}
const MyForm = () => {
  return (
    <Form.Handler
      locale="en-GB"
      translations={{
        'en-GB': {
          Custom: {
            translation: 'My translation with a {myKey}',
          },
        },
      }}
    >
      <MyField />
    </Form.Handler>
  )
}
render(<MyForm />)
`}),s=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyField = () => {
  type Translation = {
    Custom: {
      translation: string
    }
  }
  const { formatMessage } = Form.useTranslation<Translation>()
  const myTranslation = formatMessage('Custom.translation', {
    myKey: 'value!',
  })
  const errorRequired = formatMessage('Field.errorRequired')
  console.log(errorRequired)
  return <>{myTranslation}</>
}
const MyForm = () => {
  return (
    <Form.Handler
      locale="en-GB"
      translations={{
        'en-GB': {
          Custom: {
            translation: 'My translation with a {myKey}',
          },
        },
      }}
    >
      <MyField />
    </Form.Handler>
  )
}
render(<MyForm />)
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.CustomTranslations`,!0),s||u(`Examples.GetTranslation`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Custom translations example`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Get translations with a key`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};