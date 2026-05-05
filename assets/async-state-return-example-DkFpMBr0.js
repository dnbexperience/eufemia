import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n}from"./index-CMgyXmp3.js";var r=e({default:()=>o}),i=t();function a(e){let t={code:`code`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:`In all async operations, you can simply return an error object to display it in the form or influence the form behavior.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{r as n,o as t};