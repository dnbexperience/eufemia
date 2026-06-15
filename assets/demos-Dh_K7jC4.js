import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Button-DwQUlfj-.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Form-JTiJXf2d.js";import{t as o}from"./Field-DqRpWyNm.js";import{t as s}from"./Value-OsZalonW.js";import{t as c}from"./Tools-CXd2z-w-.js";import{K as l}from"./index-ppRu2ktv.js";import{t as u}from"./ComponentBox-R2c6Bo76.js";var d=e({Default:()=>p,FilterData:()=>g,Update:()=>m,VisibleData:()=>_,WithoutFormHandler:()=>h}),f=t(n());function p(){return(0,f.jsx)(u,{stableName:`Default`,sourceImports:[`import { useCallback, useEffect } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Field:o},noInline:!0,children:`const existingData = {
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
`})}function m(){return(0,f.jsx)(u,{stableName:`Update`,sourceImports:[`import { useCallback, useEffect } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o},noInline:!0,children:`const existingData = {
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
`})}function h(){return(0,f.jsx)(u,{stableName:`WithoutFormHandler`,sourceImports:[`import { useCallback, useEffect } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Button:r,Flex:i},noInline:!0,children:`const existingData = {
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
`})}function g(){return(0,f.jsx)(u,{stableName:`FilterData`,sourceImports:[`import { useCallback, useEffect } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Tools:c},noInline:!0,children:`const filterDataPaths = {
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
`})}var _=()=>(0,f.jsx)(u,{stableName:`VisibleData`,sourceImports:[`import { useCallback, useEffect } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Value:s},noInline:!0,children:`const MyForm = () => {
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
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...l(),...e.components};return d||b(`Examples`,!1),p||b(`Examples.Default`,!0),g||b(`Examples.FilterData`,!0),m||b(`Examples.Update`,!0),_||b(`Examples.VisibleData`,!0),h||b(`Examples.WithoutFormHandler`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Update the data outside of the form`}),`
`,(0,f.jsxs)(t.p,{children:[`The update function `,(0,f.jsx)(t.code,{children:`update('/count', (count) => count + 1)`}),` has TypeScript support and returns the correct type for `,(0,f.jsx)(t.code,{children:`count`}),` (number).`]}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Shared state without a Form.Handler`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Get only data of visible fields`}),`
`,(0,f.jsxs)(t.p,{children:[`You can use the `,(0,f.jsx)(t.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,f.jsxs)(t.p,{children:[`This example uses the `,(0,f.jsx)(t.code,{children:`keepInDOM`}),` property to keep the field in the DOM.`]}),`
`,(0,f.jsxs)(t.p,{children:[`But with the `,(0,f.jsx)(t.code,{children:`filterData`}),` method we can filter out all fields that have the `,(0,f.jsx)(t.code,{children:`data-exclude-field`}),` attribute.`]}),`
`,(0,f.jsxs)(t.p,{children:[`In this demo, the `,(0,f.jsx)(t.code,{children:`data-exclude-field`}),` attribute is added when the field is hidden.`]}),`
`,(0,f.jsx)(g,{})]})}function y(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};