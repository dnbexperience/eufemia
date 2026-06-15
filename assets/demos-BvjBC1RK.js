import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Form-JTiJXf2d.js";import{K as i}from"./index-ppRu2ktv.js";import{t as a}from"./ComponentBox-R2c6Bo76.js";var o=e({CustomTranslations:()=>c,GetTranslation:()=>l}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`CustomTranslations`,sourceImports:[`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r},noInline:!0,children:`const MyField = () => {
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
`}),l=()=>(0,s.jsx)(a,{stableName:`GetTranslation`,sourceImports:[`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r},noInline:!0,children:`const MyField = () => {
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
`});function u(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||f(`Examples`,!1),c||f(`Examples.CustomTranslations`,!0),l||f(`Examples.GetTranslation`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Custom translations example`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Get translations with a key`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};