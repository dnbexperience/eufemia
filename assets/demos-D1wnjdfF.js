import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r}from"./Anchor-9saPtqqX.js";import{u as i}from"./FormStatus-hvaxPCn0.js";import{t as a}from"./P-BqMs-VnB.js";import{c as o}from"./ToggleButton-BMi2PwcS.js";import{t as s}from"./Card-ClZNWqpG.js";import{t as c}from"./Form-C8lTzZqR.js";import{t as l}from"./TestElement-ChPsu-BT.js";import{t as u}from"./Field-neGd0eKd.js";import{t as d}from"./Value-Cjs3mKU7.js";import{t as f}from"./Tools-B6PN-yHu.js";import{K as p}from"./index-Bx3ttow-.js";import{t as m}from"./ComponentBox-CG7uqrFy.js";var h=e({BasedOnBooleanTrue:()=>b,BasedOnContext:()=>x,BooleanExample:()=>_,FilterData:()=>C,InferData:()=>y,InheritVisibility:()=>w,NestedExample:()=>S,PathValue:()=>v,VisibilityOnValidation:()=>T}),g=t(n()),_=()=>(0,g.jsx)(m,{scope:{TestElement:l},stableName:`BooleanExample`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Flex:o,Field:u},children:`<Form.Handler>
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
`}),v=()=>(0,g.jsx)(m,{stableName:`PathValue`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Field:u,P:a},children:`<Form.Handler>
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
`}),y=()=>(0,g.jsx)(m,{stableName:`InferData`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Flex:o,Field:u,P:a},noInline:!0,children:`const MyComponent = () => {
  const { data } = Form.useData('example-form', {
    toggleValue: false,
  })
  const inferDataFunc = useCallback(
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
`}),b=()=>(0,g.jsx)(m,{stableName:`BasedOnBooleanTrue`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,P:a},children:`<Form.Visibility visible={true}>
  <P>This is visible</P>
</Form.Visibility>
`}),x=()=>(0,g.jsx)(m,{stableName:`BasedOnContext`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,P:a},children:`<Form.Handler
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
`}),S=()=>(0,g.jsx)(m,{stableName:`NestedExample`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Flex:o,Field:u,Tools:f},noInline:!0,children:`const filterDataHandler = ({ props }) => !props['data-exclude-field']
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
`}),C=()=>(0,g.jsx)(m,{stableName:`FilterData`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Flex:o,Field:u,Card:s,P:a,Value:d,Tools:f},noInline:!0,children:`const filterDataPaths = {
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
`});function w(){return(0,g.jsx)(m,{stableName:`InheritVisibility`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Card:s,Field:u,Value:d,Provider:r,HeightAnimation:i},children:`<Form.Handler>
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
`})}function T(){return(0,g.jsx)(m,{stableName:`VisibilityOnValidation`,sourceImports:[`import { useCallback } from 'react'`,`import { Flex, HeightAnimation, P } from '@dnb/eufemia'`,`import { Field, Form, TestElement, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Card:s,Field:u,Value:d},children:`<Form.Handler>
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
`})}function E(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...p(),...e.components};return h||O(`Examples`,!1),b||O(`Examples.BasedOnBooleanTrue`,!0),x||O(`Examples.BasedOnContext`,!0),_||O(`Examples.BooleanExample`,!0),C||O(`Examples.FilterData`,!0),y||O(`Examples.InferData`,!0),w||O(`Examples.InheritVisibility`,!0),S||O(`Examples.NestedExample`,!0),v||O(`Examples.PathValue`,!0),T||O(`Examples.VisibilityOnValidation`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`Boolean example`}),`
`,(0,g.jsx)(_,{}),`
`,(0,g.jsx)(t.h3,{children:`Matching value`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`visibleWhen`}),` is pretty powerful. You can use it to show/hide based on the value of a `,(0,g.jsx)(t.code,{children:`path`}),`. You can also give it a `,(0,g.jsx)(t.code,{children:`hasValue`}),` function that gives you the current value, so you can assert it and return a boolean based on that.`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-jsx`,children:`<Form.Visibility
  visibleWhen={{
    path: '/toggleValue',
    hasValue: (value) => value === 'checked',
  }}
>
  Content
</Form.Visibility>
`})}),`
`,(0,g.jsx)(v,{}),`
`,(0,g.jsx)(t.h3,{children:`Direct properties`}),`
`,(0,g.jsx)(b,{}),`
`,(0,g.jsx)(t.h3,{children:`Based on DataContext`}),`
`,(0,g.jsx)(x,{}),`
`,(0,g.jsx)(t.h3,{children:`InferData`}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h3,{children:`Nested visibility example`}),`
`,(0,g.jsxs)(t.p,{children:[`Use `,(0,g.jsx)(t.code,{children:`fieldPropsWhenHidden`}),` and `,(0,g.jsx)(t.code,{children:`keepInDOM`}),` to keep the content in the DOM, even if it's not visible.`]}),`
`,(0,g.jsxs)(t.p,{children:[`In this example we filter out all fields that have the `,(0,g.jsx)(t.code,{children:`data-exclude-field`}),` attribute. See the console output for the result.`]}),`
`,(0,g.jsx)(S,{}),`
`,(0,g.jsx)(t.h3,{children:`Filter data`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.strong,{children:`Note:`}),` This example uses `,(0,g.jsx)(t.code,{children:`filterData`}),` with `,(0,g.jsx)(t.code,{children:`pathDefined`}),` on a Visibility component along, which is a declarative way to describe the data to be shown.`]}),`
`,(0,g.jsx)(C,{}),`
`,(0,g.jsx)(t.h3,{children:`Inherit visibility`}),`
`,(0,g.jsx)(w,{}),`
`,(0,g.jsx)(t.h3,{children:`Show children when field has no errors (validation)`}),`
`,(0,g.jsx)(T,{})]})}function D(e={}){let{wrapper:t}={...p(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(E,{...e})}):E(e)}function O(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{D as default};