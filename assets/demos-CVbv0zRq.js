import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Default:()=>o,FilterData:()=>l,Update:()=>s,VisibleData:()=>u,WithoutFormHandler:()=>c}),a=t();function o(){return(0,a.jsx)(n,{noInline:!0,children:`const existingData = {
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
`})}function s(){return(0,a.jsx)(n,{noInline:!0,children:`const existingData = {
  count: 1,
}
const Component = () => {
  const { data, update } = Form.useData('update-id', existingData)
  const increment = useCallback(() => {
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
`})}function c(){return(0,a.jsx)(n,{noInline:!0,children:`const existingData = {
  count: 1,
}
const Component = () => {
  const { data, update } = Form.useData('independent-id', existingData)
  const increment = useCallback(() => {
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
`})}function l(){return(0,a.jsx)(n,{noInline:!0,children:`const filterDataPaths = {
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
`})}var u=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyForm = () => {
  const { data, reduceToVisibleFields } = Form.useData()

  // Use useEffect to ensure we get the latest data
  useEffect(() => {
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
`});function d(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||p(`Examples`,!1),o||p(`Examples.Default`,!0),l||p(`Examples.FilterData`,!0),s||p(`Examples.Update`,!0),u||p(`Examples.VisibleData`,!0),c||p(`Examples.WithoutFormHandler`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Update the data outside of the form`}),`
`,(0,a.jsxs)(t.p,{children:[`The update function `,(0,a.jsx)(t.code,{children:`update('/count', (count) => count + 1)`}),` has TypeScript support and returns the correct type for `,(0,a.jsx)(t.code,{children:`count`}),` (number).`]}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Shared state without a Form.Handler`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Get only data of visible fields`}),`
`,(0,a.jsxs)(t.p,{children:[`You can use the `,(0,a.jsx)(t.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,a.jsxs)(t.p,{children:[`This example uses the `,(0,a.jsx)(t.code,{children:`keepInDOM`}),` property to keep the field in the DOM.`]}),`
`,(0,a.jsxs)(t.p,{children:[`But with the `,(0,a.jsx)(t.code,{children:`filterData`}),` method we can filter out all fields that have the `,(0,a.jsx)(t.code,{children:`data-exclude-field`}),` attribute.`]}),`
`,(0,a.jsxs)(t.p,{children:[`In this demo, the `,(0,a.jsx)(t.code,{children:`data-exclude-field`}),` attribute is added when the field is hidden.`]}),`
`,(0,a.jsx)(l,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};