import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CustomTranslations:()=>s,GetTranslation:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`CustomTranslations`,noInline:!0,children:`const MyField = () => {
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
`}),c=()=>(0,o.jsx)(r,{stableName:`GetTranslation`,noInline:!0,children:`const MyField = () => {
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.CustomTranslations`,!0),c||d(`Examples.GetTranslation`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Custom translations example`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Get translations with a key`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};