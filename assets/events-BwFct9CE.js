import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{n as r}from"./PropertiesTable-ByB9iCYz.js";import{t as i}from"./InputDocs-Bc1nsDBx.js";var a=e(t());function o(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Events`}),`
`,(0,a.jsx)(r,{props:i}),`
`,(0,a.jsx)(t.h3,{children:`Manipulate the input value during typing`}),`
`,(0,a.jsxs)(t.p,{children:[`You have two possibilities to manipulate the value while a user is typing. Either you handle the value with your own state, or you return a modified value in the `,(0,a.jsx)(t.code,{children:`onChange`}),` event listener:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`import { formatNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

function Component() {
  const onChangeHandler = ({ value }) => {
    return formatNumber(value)
  }

  return <Input onChange={onChangeHandler} />
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Prevent setting a new value`}),`
`,(0,a.jsxs)(t.p,{children:[`You can use e.g. `,(0,a.jsx)(t.code,{children:`event.preventDefault()`}),` during `,(0,a.jsx)(t.code,{children:`onKeyDown`}),`, or return false during `,(0,a.jsx)(t.code,{children:`onChange`}),`. They are not 100% the same user experience, but can both be useful in different use cases.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`function Component() {
  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }
  const onChangeHandler = ({ value }) => {
    return false
  }

  return <Input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
}
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};