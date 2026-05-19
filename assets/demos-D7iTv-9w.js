import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Default:()=>s,FilterData:()=>c}),o=e(n());function s(){return(0,o.jsx)(r,{stableName:`Default`,noInline:!0,children:`const existingData = {
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
`})}function c(){return(0,o.jsx)(r,{stableName:`FilterData`,noInline:!0,children:`// Method A (if you know the paths)
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
`})}function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.Default`,!0),c||d(`Examples.FilterData`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Get data outside of the form`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};