import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{n}from"./PropertiesTable-C9mjC5N9.js";import{t as r}from"./InputDocs-B-Sa3UTK.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{children:`Events`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsx)(a.h3,{children:`Manipulate the input value during typing`}),`
`,(0,i.jsxs)(a.p,{children:[`You have two possibilities to manipulate the value while a user is typing. Either you handle the value with your own state, or you return a modified value in the `,(0,i.jsx)(a.code,{children:`onChange`}),` event listener:`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`import { formatNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

function Component() {
  const onChangeHandler = ({ value }) => {
    return formatNumber(value)
  }

  return <Input onChange={onChangeHandler} />
}
`})}),`
`,(0,i.jsx)(a.h3,{children:`Prevent setting a new value`}),`
`,(0,i.jsxs)(a.p,{children:[`You can use e.g. `,(0,i.jsx)(a.code,{children:`event.preventDefault()`}),` during `,(0,i.jsx)(a.code,{children:`onKeyDown`}),`, or return false during `,(0,i.jsx)(a.code,{children:`onChange`}),`. They are not 100% the same user experience, but can both be useful in different use cases.`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`function Component() {
  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }
  const onChangeHandler = ({ value }) => {
    return false
  }

  return <Input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
}
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};