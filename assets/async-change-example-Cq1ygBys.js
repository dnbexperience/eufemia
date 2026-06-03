import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{W as r}from"./index-BCXtuv-b.js";var i=e({default:()=>s}),a=t(n());function o(e){let t={code:`code`,pre:`pre`,...r(),...e.components};return(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-ts`,children:`// Async event handler
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
`})})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{i as n,s as t};