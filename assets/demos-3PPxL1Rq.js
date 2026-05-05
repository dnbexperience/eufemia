import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{t as i}from"./TestElement-7TlpAKwo.js";import{Rr as a}from"./index-CMgyXmp3.js";var o=e({BasedOnBooleanTrue:()=>d,BasedOnContext:()=>f,BooleanExample:()=>c,FilterData:()=>m,InferData:()=>u,InheritVisibility:()=>h,NestedExample:()=>p,PathValue:()=>l,VisibilityOnValidation:()=>g});t();var s=n(),c=()=>(0,s.jsx)(r,{scope:{TestElement:i},children:`<Form.Handler>
  <Flex.Stack>
    <Field.Boolean
      label="Show content"
      variant="buttons"
      path="/toggleValue"
      value={false}
    />
    <Form.Visibility pathTrue="/toggleValue" animate>
      <TestElement>Item 1</TestElement>
      <TestElement>Item 2</TestElement>
    </Form.Visibility>
  </Flex.Stack>
</Form.Handler>
`}),l=()=>(0,s.jsx)(r,{children:`<Form.Handler>
  <Field.Toggle
    label="Show content"
    valueOn="checked"
    valueOff="unchecked"
    variant="buttons"
    path="/toggleValue"
    value="unchecked"
  />
  <Form.Visibility
    visibleWhen={{
      path: '/toggleValue',
      hasValue: 'checked',
    }}
    animate
  >
    <P>This is visible</P>
  </Form.Visibility>
</Form.Handler>
`}),u=()=>(0,s.jsx)(r,{noInline:!0,children:`const MyComponent = () => {
  const { data } = Form.useData('example-form', {
    toggleValue: false,
  })
  const inferDataFunc = React.useCallback(
    () => data.toggleValue,
    [data.toggleValue]
  )
  return (
    <Form.Handler id="example-form">
      <Flex.Stack>
        <Field.Boolean path="/toggleValue" label="Check me" />
        <Form.Visibility inferData={inferDataFunc} animate>
          <P>This is visible</P>
        </Form.Visibility>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyComponent />)
`}),d=()=>(0,s.jsx)(r,{children:`<Form.Visibility visible={true}>
  <P>This is visible</P>
</Form.Visibility>
`}),f=()=>(0,s.jsx)(r,{children:`<Form.Handler
  data={{
    toBe: true,
    notToBe: false,
  }}
>
  <Form.Visibility pathTrue="/toBe">
    <P>This will show, as long as \`toBe\` is true.</P>
  </Form.Visibility>
  <Form.Visibility pathTrue="/notToBe">
    <P>This will not show until \`notToBe\` is true.</P>
  </Form.Visibility>
</Form.Handler>
`}),p=()=>(0,s.jsx)(r,{noInline:!0,children:`const filterDataHandler = ({ props }) => !props['data-exclude-field']
const MyForm = () => {
  return (
    <Form.Handler
      defaultData={{
        isVisible: false,
      }}
    >
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          data-exclude-field
        />
        <Form.Visibility
          pathTrue="/isVisible"
          animate
          keepInDOM
          fieldPropsWhenHidden={{
            'data-exclude-field': true,
          }}
        >
          <Field.Selection
            label="Choose"
            variant="radio"
            value="less"
            path="/mySelection"
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
            keepInDOM
            fieldPropsWhenHidden={{
              'data-exclude-field': true,
            }}
          >
            <Field.String label="My String" path="/myString" value="foo" />
          </Form.Visibility>
        </Form.Visibility>
      </Flex.Stack>

      <Output />
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData()
  const filteredData = filterData(filterDataHandler)
  return <Tools.Log data={filteredData} top />
}
render(<MyForm />)
`}),m=()=>(0,s.jsx)(r,{noInline:!0,children:`const filterDataPaths = {
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
        myString: 'foo',
      }}
    >
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          defaultValue={false}
        />
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Selection
            label="Choose"
            variant="radio"
            value="less"
            path="/mySelection"
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
            <Field.String label="My String" path="/myString" />
          </Form.Visibility>
        </Form.Visibility>

        <Form.Visibility
          pathDefined="/myString"
          filterData={filterDataPaths}
          animate
        >
          <Form.Card>
            <P>
              Result: <Value.String path="/myString" inline />
            </P>
          </Form.Card>
        </Form.Visibility>
      </Flex.Stack>

      <Output />
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData()
  const filteredData = filterData(filterDataPaths)
  return <Tools.Log data={filteredData} top />
}
render(<MyForm />)
`});function h(){return(0,s.jsx)(r,{children:`<Form.Handler>
  <Form.Card>
    <Field.Boolean
      variant="button"
      path="/isVisible"
      defaultValue={true}
    />

    <Form.Visibility pathTrue="/isVisible" animate>
      <Field.Name.First path="/foo" defaultValue="foo" />
      <Field.Name.Last path="/bar" defaultValue="bar" />
    </Form.Visibility>

    <Value.Provider inheritVisibility>
      <HeightAnimation>
        <Value.SummaryList>
          <Value.Name.First path="/foo" />
          <Value.Name.First path="/bar" />
        </Value.SummaryList>
      </HeightAnimation>
    </Value.Provider>
  </Form.Card>
</Form.Handler>
`})}function g(){return(0,s.jsx)(r,{children:`<Form.Handler>
  <Form.Card>
    <Field.Name.First path="/foo" required />

    <Form.Visibility
      visibleWhen={{
        path: '/foo',
        isValid: true,
      }}
      animate
    >
      <Value.Name.First path="/foo" />
    </Form.Visibility>
  </Form.Card>
</Form.Handler>
`})}function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...a(),...e.components};return o||y(`Examples`,!1),d||y(`Examples.BasedOnBooleanTrue`,!0),f||y(`Examples.BasedOnContext`,!0),c||y(`Examples.BooleanExample`,!0),m||y(`Examples.FilterData`,!0),u||y(`Examples.InferData`,!0),h||y(`Examples.InheritVisibility`,!0),p||y(`Examples.NestedExample`,!0),l||y(`Examples.PathValue`,!0),g||y(`Examples.VisibilityOnValidation`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Boolean example`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Matching value`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`visibleWhen`}),` is pretty powerful. You can use it to show/hide based on the value of a `,(0,s.jsx)(t.code,{children:`path`}),`. You can also give it a `,(0,s.jsx)(t.code,{children:`hasValue`}),` function that gives you the current value, so you can assert it and return a boolean based on that.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`<Form.Visibility
  visibleWhen={{
    path: '/toggleValue',
    hasValue: (value) => value === 'checked',
  }}
>
  Content
</Form.Visibility>
`})}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Direct properties`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Based on DataContext`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`InferData`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Nested visibility example`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`fieldPropsWhenHidden`}),` and `,(0,s.jsx)(t.code,{children:`keepInDOM`}),` to keep the content in the DOM, even if it's not visible.`]}),`
`,(0,s.jsxs)(t.p,{children:[`In this example we filter out all fields that have the `,(0,s.jsx)(t.code,{children:`data-exclude-field`}),` attribute. See the console output for the result.`]}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Filter data`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Note:`}),` This example uses `,(0,s.jsx)(t.code,{children:`filterData`}),` with `,(0,s.jsx)(t.code,{children:`pathDefined`}),` on a Visibility component along, which is a declarative way to describe the data to be shown.`]}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Inherit visibility`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Show children when field has no errors (validation)`}),`
`,(0,s.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};