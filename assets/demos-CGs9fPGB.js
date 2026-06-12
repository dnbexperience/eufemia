import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Section-BV74bciL.js";import{c as i}from"./ToggleButton-T4E3Coih.js";import{t as a}from"./Form-B9l6EvGx.js";import{t as o}from"./Field-DHicZJEj.js";import{K as s}from"./index-CsG353ar.js";import{t as c}from"./ComponentBox-Cb1rLw_D.js";var l=e({Default:()=>d,FilterData:()=>f}),u=t(n());function d(){return(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Field:o},noInline:!0,children:`const existingData = {
  foo: 'bar',
}
const Component = () => {
  const { data } = Form.useData('default-id', existingData)
  return (
    <Form.Handler id="default-id">
      <Field.String path="/foo" label={data.foo} />
    </Form.Handler>
  )
}
render(<Component />)
`})}function f(){return(0,u.jsx)(c,{stableName:`FilterData`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Section:r},noInline:!0,children:`// Method A (if you know the paths)
const filterDataPaths = {
  '/foo': ({ value }) => {
    if (value === 'foo') {
      return false
    }
  },
}

// Method B (will iterate over all fields regardless of the path)
const filterDataHandler = ({ value }) => {
  if (value === 'foo') {
    return false
  }
}
const Component = () => {
  return (
    <Form.Handler id="filter-data">
      <Flex.Stack>
        <Field.String path="/foo" value="foo" />
        <Field.String path="/bar" value="bar" />
      </Flex.Stack>
    </Form.Handler>
  )
}
const { filterData } = Form.getData('filter-data')
render(
  <Flex.Stack>
    <Component />
    <Section variant="information" innerSpace>
      <pre>{JSON.stringify(filterData(filterDataPaths))}</pre>
      <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>
    </Section>
  </Flex.Stack>
)
`})}function p(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||h(`Examples`,!1),d||h(`Examples.Default`,!0),f||h(`Examples.FilterData`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Get data outside of the form`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,u.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};