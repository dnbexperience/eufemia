import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({Default:()=>s,FilterData:()=>u,Update:()=>c,VisibleData:()=>d,WithoutFormHandler:()=>l});t();var o=n();function s(){return(0,o.jsx)(r,{noInline:!0,children:`const existingData = {
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
`})}function c(){return(0,o.jsx)(r,{noInline:!0,children:`const existingData = {
  count: 1,
}
const Component = () => {
  const { data, update } = Form.useData('update-id', existingData)
  const increment = React.useCallback(() => {
    update('/count', (count) => {
      return count + 1
    })
  }, [update])
  return (
    <Form.Handler id="update-id">
      <Flex.Horizontal>
        <Field.Number path="/count" showStepControls />
        <Form.SubmitButton
          onClick={increment}
          text={\`Increment \${data.count}\`}
        />
      </Flex.Horizontal>
    </Form.Handler>
  )
}
render(<Component />)
`})}function l(){return(0,o.jsx)(r,{noInline:!0,children:`const existingData = {
  count: 1,
}
const Component = () => {
  const { data, update } = Form.useData('independent-id', existingData)
  const increment = React.useCallback(() => {
    update('/count', (count) => {
      return count + 1
    })
  }, [update])
  return (
    <Button
      onClick={increment}
      text={\`Increment \${data.count}\`}
      variant="secondary"
    />
  )
}
render(
  <Flex.Vertical>
    <Component />
    <Component />
  </Flex.Vertical>
)
`})}function u(){return(0,o.jsx)(r,{noInline:!0,children:`const filterDataPaths = {
  '/isVisible': false,
  '/mySelection': ({ data }) => data.isVisible,
  '/myString': ({ data }) => {
    return data.isVisible && data.mySelection === 'more'
  },
}
const MyForm = () => {
  return (
    <Form.Handler
      defaultData={{
        isVisible: false,
        mySelection: 'less',
        myString: 'foo',
      }}
    >
      <Flex.Stack>
        <Field.Boolean
          label="Toggle visible"
          variant="button"
          path="/isVisible"
          data-exclude-field
        />
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Selection
            label="Choose"
            variant="radio"
            path="/mySelection"
            value="less"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: 'more',
            }}
            animate
          >
            <Field.String label="My String" path="/myString" value="foo" />
          </Form.Visibility>
        </Form.Visibility>

        <Output />
      </Flex.Stack>
    </Form.Handler>
  )
}
const Output = () => {
  const { data, filterData } = Form.useData()
  return (
    <>
      <Tools.Log data={filterData(filterDataPaths)} label="Filtered:" />
      <Tools.Log data={data} label="All data:" />
    </>
  )
}
render(<MyForm />)
`})}var d=()=>(0,o.jsx)(r,{noInline:!0,children:`const MyForm = () => {
  const { data, reduceToVisibleFields } = Form.useData()

  // Use useEffect to ensure we get the latest data
  React.useEffect(() => {
    console.log(
      'Result of reduceToVisibleFields:
',
      reduceToVisibleFields(data, {
        removePaths: ['/isVisible'],
      })
    )
  }, [data, reduceToVisibleFields])
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.Boolean
          label="Show radio buttons"
          variant="button"
          path="/isVisible"
          defaultValue={true}
        />

        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Selection
            label="Radio buttons"
            variant="radio"
            path="/myValue"
            defaultValue="foo"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
          </Field.Selection>
        </Form.Visibility>

        <Value.Selection path="/myValue" inheritLabel inheritVisibility />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`});function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||m(`Examples`,!1),s||m(`Examples.Default`,!0),u||m(`Examples.FilterData`,!0),c||m(`Examples.Update`,!0),d||m(`Examples.VisibleData`,!0),l||m(`Examples.WithoutFormHandler`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Update the data outside of the form`}),`
`,(0,o.jsxs)(t.p,{children:[`The update function `,(0,o.jsx)(t.code,{children:`update('/count', (count) => count + 1)`}),` has TypeScript support and returns the correct type for `,(0,o.jsx)(t.code,{children:`count`}),` (number).`]}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Shared state without a Form.Handler`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Get only data of visible fields`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,o.jsxs)(t.p,{children:[`This example uses the `,(0,o.jsx)(t.code,{children:`keepInDOM`}),` property to keep the field in the DOM.`]}),`
`,(0,o.jsxs)(t.p,{children:[`But with the `,(0,o.jsx)(t.code,{children:`filterData`}),` method we can filter out all fields that have the `,(0,o.jsx)(t.code,{children:`data-exclude-field`}),` attribute.`]}),`
`,(0,o.jsxs)(t.p,{children:[`In this demo, the `,(0,o.jsx)(t.code,{children:`data-exclude-field`}),` attribute is added when the field is hidden.`]}),`
`,(0,o.jsx)(u,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};