import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";import{_ as i,b as a,v as o}from"./Examples-B1XouK8g.js";var s=e({EditContainerWithError:()=>l,ToolbarVariantMiniumOneItemOneItem:()=>i,ToolbarVariantMiniumOneItemTwoItems:()=>o,ViewAndEditContainer:()=>a}),c=t(),l=()=>(0,c.jsx)(n,{"data-visual-test":`edit-container-error`,hideCode:!0,children:`<Form.Handler
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
`});function u(e){let t={h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...r(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.EditContainerWithError`,!0),i||f(`Examples.ToolbarVariantMiniumOneItemOneItem`,!0),o||f(`Examples.ToolbarVariantMiniumOneItemTwoItems`,!0),a||f(`Examples.ViewAndEditContainer`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(a,{}),`
`,(0,c.jsx)(t.h3,{children:`Toolbar variant`}),`
`,(0,c.jsx)(t.h4,{children:`Minimum one item`}),`
`,(0,c.jsx)(t.p,{children:`When having one item in the Iterate.Array:`}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsx)(t.p,{children:`When having two items in the Iterate.Array:`}),`
`,(0,c.jsx)(o,{}),`
`,(0,c.jsx)(t.h4,{children:`EditContainer with error`}),`
`,(0,c.jsx)(t.p,{children:`Press the submit button to see the error.`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};