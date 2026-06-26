import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DM984GyO.js";import{g as i,j as a,w as o}from"./forms-CFi5-4x5.js";import{t as s}from"./Card-Db-Q1D3Y.js";import{U as c}from"./index-kfZVC31v.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";import{_ as u,b as d,v as f}from"./Examples-vX0EZYSF.js";var p=e({EditContainerWithError:()=>h,ToolbarVariantMiniumOneItemOneItem:()=>u,ToolbarVariantMiniumOneItemTwoItems:()=>f,ViewAndEditContainer:()=>d}),m=t(n()),h=()=>(0,m.jsx)(l,{"data-visual-test":`edit-container-error`,hideCode:!0,stableName:`EditContainerWithError`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:r,Iterate:i,Field:a,Card:s},children:`<Form.Handler
  data={{
    outsideOfCard: [
      {
        name: undefined, // // <- Trigger an error
      },
    ],

    insideOfCard: [
      {
        name: undefined, // // <- Trigger an error
      },
    ],

    withFilledVariant: [
      {
        name: undefined, // // <- Trigger an error
      },
    ],

    withFilledVariantInsideOfCard: [
      {
        name: undefined, // // <- Trigger an error
      },
    ],

    withBasicVariant: [
      {
        name: '', // // <- Trigger an error
      },
    ],

    withBasicVariantInsideOfCard: [
      {
        name: '', // // <- Trigger an error
      },
    ],
  }}
>
  <Flex.Stack>
    <Iterate.Array path="/outsideOfCard">
      <Iterate.EditContainer title="Outside of card">
        <Field.Name itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/insideOfCard">
        <Iterate.EditContainer title="Inside of card">
          <Field.Name itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>

    <Iterate.Array path="/withFilledVariant">
      <Iterate.EditContainer title="Filled variant" variant="filled">
        <Field.Name itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/withFilledVariantInsideOfCard">
        <Iterate.EditContainer
          title="Filled variant inside of card"
          variant="filled"
        >
          <Field.Name itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>

    <Iterate.Array path="/withBasicVariant">
      <Iterate.EditContainer title="Basic variant" variant="basic">
        <Field.Name itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/withBasicVariantInsideOfCard">
        <Iterate.EditContainer
          title="Basic variant inside of card"
          variant="basic"
        >
          <Field.Name itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>

    <Form.SubmitButton text="Press me to see the error" />
  </Flex.Stack>
</Form.Handler>
`});function g(e){let t={h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...c(),...e.components};return p||v(`Examples`,!1),h||v(`Examples.EditContainerWithError`,!0),u||v(`Examples.ToolbarVariantMiniumOneItemOneItem`,!0),f||v(`Examples.ToolbarVariantMiniumOneItemTwoItems`,!0),d||v(`Examples.ViewAndEditContainer`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(d,{}),`
`,(0,m.jsx)(t.h3,{children:`Toolbar variant`}),`
`,(0,m.jsx)(t.h4,{children:`Minimum one item`}),`
`,(0,m.jsx)(t.p,{children:`When having one item in the Iterate.Array:`}),`
`,(0,m.jsx)(u,{}),`
`,(0,m.jsx)(t.p,{children:`When having two items in the Iterate.Array:`}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(t.h4,{children:`EditContainer with error`}),`
`,(0,m.jsx)(t.p,{children:`Press the submit button to see the error.`}),`
`,(0,m.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};