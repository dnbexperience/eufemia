import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";import{_ as a,b as o,v as s}from"./Examples-DjmRcjVh.js";var c=t({EditContainerWithError:()=>u,ToolbarVariantMiniumOneItemOneItem:()=>a,ToolbarVariantMiniumOneItemTwoItems:()=>s,ViewAndEditContainer:()=>o}),l=e(n()),u=()=>(0,l.jsx)(r,{"data-visual-test":`edit-container-error`,hideCode:!0,stableName:`EditContainerWithError`,children:`<Form.Handler
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
        <Field.String label="Name" itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/insideOfCard">
        <Iterate.EditContainer title="Inside of card">
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>

    <Iterate.Array path="/withFilledVariant">
      <Iterate.EditContainer title="Filled variant" variant="filled">
        <Field.String label="Name" itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/withFilledVariantInsideOfCard">
        <Iterate.EditContainer
          title="Filled variant inside of card"
          variant="filled"
        >
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>

    <Iterate.Array path="/withBasicVariant">
      <Iterate.EditContainer title="Basic variant" variant="basic">
        <Field.String label="Name" itemPath="/name" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Form.Card>
      <Iterate.Array path="/withBasicVariantInsideOfCard">
        <Iterate.EditContainer
          title="Basic variant inside of card"
          variant="basic"
        >
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    </Form.Card>
  </Flex.Stack>

  <Form.SubmitButton text="Press me to see the error" />
</Form.Handler>
`});function d(e){let t={h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...i(),...e.components};return c||p(`Examples`,!1),u||p(`Examples.EditContainerWithError`,!0),a||p(`Examples.ToolbarVariantMiniumOneItemOneItem`,!0),s||p(`Examples.ToolbarVariantMiniumOneItemTwoItems`,!0),o||p(`Examples.ViewAndEditContainer`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(o,{}),`
`,(0,l.jsx)(t.h3,{children:`Toolbar variant`}),`
`,(0,l.jsx)(t.h4,{children:`Minimum one item`}),`
`,(0,l.jsx)(t.p,{children:`When having one item in the Iterate.Array:`}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(t.p,{children:`When having two items in the Iterate.Array:`}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsx)(t.h4,{children:`EditContainer with error`}),`
`,(0,l.jsx)(t.p,{children:`Press the submit button to see the error.`}),`
`,(0,l.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};