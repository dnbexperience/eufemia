import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n}from"./index-CMgyXmp3.js";var r=e({default:()=>o}),i=t();function a(e){let t={code:`code`,pre:`pre`,...n(),...e.components};return(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`// Async event handler
const onChange = debounceAsync(async function (data) {
  try {
    await makeRequest(data)
  } catch (error) {
    return error
  }

  // Optionally, you can return an object with these keys, depending your needs
  return {
    info: 'Info message',
    warning: 'Warning message',

    // and either an error
    error: new Error('Error message'),

    // or success (when used for autosave)
    success: 'saved',
  } as const
})
`})})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{r as n,o as t};