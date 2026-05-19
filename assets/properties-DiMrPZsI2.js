import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{zr as n}from"./index-DqqByKA2.js";import{n as r}from"./PropertiesTable-DtEYioNW.js";import{t as i}from"./TranslationsTable-DVphy7xU.js";import{n as a}from"./SliderDocs-D81dMJO0.js";var o=e(t());function s(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Properties`}),`
`,(0,o.jsx)(r,{props:a}),`
`,(0,o.jsx)(t.h2,{children:`Translations`}),`
`,(0,o.jsx)(i,{localeKey:`Slider`}),`
`,(0,o.jsx)(t.h2,{children:`Extensions`}),`
`,(0,o.jsx)(t.p,{children:`A Slider Extension should be an object with the following properties:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import Slider, { SliderMarker } from '@dnb/eufemia/components/Slider'

render(
  <Slider
    extensions={{
      marker: {
        instance: SliderMarker,
        value: 50,
      },
    }}
  />
)
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};