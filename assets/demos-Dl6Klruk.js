import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({Default:()=>o,FilterData:()=>s}),a=t();function o(){return(0,a.jsx)(n,{noInline:!0,children:`const existingData = {
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
`})}function s(){return(0,a.jsx)(n,{noInline:!0,children:`// Method A (if you know the paths)
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
`})}function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.Default`,!0),s||u(`Examples.FilterData`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Get data outside of the form`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};