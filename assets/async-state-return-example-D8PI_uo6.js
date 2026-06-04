import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{W as r}from"./index-D7e1avVt.js";var i=e({default:()=>s}),a=t(n());function o(e){let t={code:`code`,p:`p`,pre:`pre`,...r(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:`In all async operations, you can simply return an error object to display it in the form or influence the form behavior.`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

// Async function
const onSubmit = async (data) => {
  try {
    const response = await fetch('https://api.example.com', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const data = await response.json()

    Form.setData(myFormId, data) // Whatever you want to do with the data
  } catch (error) {
    return error // Will display the error message in the form
  }

  // Optionally, you can return an object with these keys, depending your needs
  return {
    info: 'Info message',
    warning: 'Warning message',

    // Force the form to stay in pending state
    status: 'pending',

    // and either an error
    error: new Error('Error message'),
  } as const
}

function Component() {
  return (
    <Form.Handler id={myFormId} onSubmit={onSubmit}>
      ...
    </Form.Handler>
  )
}
`})})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{i as n,s as t};