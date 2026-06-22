import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-DoxBGtHF.js";import{j as i,l as a,ut as o,v as s,w as c}from"./forms-CsJzlVUF.js";import{t as l}from"./P-CbimSwQH.js";import{t as u}from"./Card-DP9KYSzC.js";import{t as d}from"./Section-DfvD9Xmd.js";import{t as f}from"./ajv-BcRVrrUW.js";import{t as p}from"./ComponentBox-q_23Ylzi.js";var m=e({AllFieldsRequired:()=>S,BasicViewAndEditContainer:()=>b,NestedPathSection:()=>_,NestedSections:()=>T,OverwriteProps:()=>x,SchemaSupport:()=>C,SectionLevelZodSchema:()=>D,ViewAndEditContainer:()=>v,ViewAndEditContainerValidation:()=>y,WithVisibility:()=>w,WithoutDataContext:()=>g}),h=t(n()),g=()=>(0,h.jsx)(p,{stableName:`WithoutDataContext`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Field:i},children:`<Form.Section
  data={{
    myField: 'Value',
  }}
  onChange={console.log}
>
  <Field.String path="/myField" />
</Form.Section>
`}),_=()=>(0,h.jsx)(p,{stableName:`NestedPathSection`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i},noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" />
      </Form.Card>
    </Form.Section>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <MyNameSection path="/nestedPath" />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
`}),v=()=>(0,h.jsx)(p,{"data-visual-test":`view-and-edit-container`,hideCode:!0,stableName:`ViewAndEditContainer`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Field:i,Value:s,Card:u},noInline:!0,children:`const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`}),y=()=>(0,h.jsx)(p,{hideCode:!0,stableName:`ViewAndEditContainerValidation`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Field:i,Value:s,Card:u},noInline:!0,children:`const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: undefined, // initiate error
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required validateInitially>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`}),b=()=>(0,h.jsx)(p,{"data-visual-test":`basic-view-and-edit-container`,hideCode:!0,stableName:`BasicViewAndEditContainer`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Field:i,Value:s,Card:u},noInline:!0,children:`const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer variant="basic">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`}),x=()=>(0,h.jsx)(p,{stableName:`OverwriteProps`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i},noInline:!0,children:`const MyNameSection = (props) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" required minLength={10} />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: '',
        lastName: 'M',
      },
    }}
  >
    <MyNameSection
      path="/nestedPath"
      overwriteProps={{
        firstName: {
          required: true,
          label: 'Custom',
        },
        lastName: {
          required: false,
          minLength: 2,
        },
      }}
    />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
`}),S=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:f},stableName:`AllFieldsRequired`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i,Flex:r},noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
const schema: JSONSchema = {
  type: 'object',
  required: ['myRequiredSection'],
}
const ajv = makeAjvInstance()
render(
  <Flex.Stack>
    <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
      <MyNameSection required />
      <Form.SubmitButton variant="send" />
    </Form.Handler>

    <Form.Handler
      onSubmit={async (data) => console.log('onSubmit', data)}
      schema={schema}
      ajvInstance={ajv}
    >
      <MyNameSection path="/myRequiredSection" />
      <Form.SubmitButton variant="send" />
    </Form.Handler>
  </Flex.Stack>
)
`}),C=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:f},stableName:`SchemaSupport`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i},noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" required minLength={10} />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
const mySchema: JSONSchema = {
  type: 'object',
  properties: {
    nestedPath: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3,
        },
        lastName: {
          type: 'string',
          minLength: 2,
        },
      },
      required: ['firstName', 'lastName'],
    },
  },
}
const ajv = makeAjvInstance()
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    schema={mySchema}
    ajvInstance={ajv}
    defaultData={{
      nestedPath: {
        firstName: '',
        lastName: 'M',
      },
    }}
  >
    <MyNameSection path="/nestedPath" />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
`}),w=()=>(0,h.jsx)(p,{stableName:`WithVisibility`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i,Tools:a,P:l,Value:s},noInline:!0,children:`const MySection = ({ children, ...props }) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Boolean
          label="Are you sure?"
          variant="buttons"
          path="/iAmSure"
        />
        <Form.Visibility pathTrue="/iAmSure" animate>
          <Field.Selection
            label="Choose"
            variant="radio"
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

        {children}
      </Form.Card>

      <Tools.Log />
    </Form.Section>
  )
}
render(
  <Form.Handler
    onChange={console.log}
    defaultData={{
      nestedPath: {
        iAmSure: false,
        mySelection: 'less',
        myString: 'has a value',
      },
    }}
  >
    <MySection path="/nestedPath">
      <Form.Visibility
        visibleWhen={{
          path: '/myString',
          hasValue: (value) => value !== 'has a value',
        }}
        animate
      >
        <P>
          Result: <Value.String path="/nestedPath/myString" inline />
        </P>
      </Form.Visibility>
    </MySection>
  </Form.Handler>
)
`}),T=()=>(0,h.jsx)(p,{stableName:`NestedSections`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Section:d,Card:u,Field:i,Value:s},noInline:!0,children:`render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        name: {
          first: 'Nora',
          last: 'Mørk',
        },
        address: {
          street: 'Strøget',
          nr: '',
        },
      },
    }}
  >
    <MySection path="/nestedPath" required />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
function MySection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <MyNameSection path="/name" />
        <MyAddressSection path="/address" />
        <MyValueSection />
      </Form.Card>
    </Form.Section>
  )
}
function MyNameSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Field.Composition width="large">
        <Field.Name.First path="/first" />
        <Field.Name.Last path="/last" />
      </Field.Composition>
    </Form.Section>
  )
}
function MyAddressSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Field.Composition width="large">
        <Field.String label="Gateadresse" path="/street" width="stretch" />
        <Field.String label="Nr." path="/nr" width="small" />
      </Field.Composition>
    </Form.Section>
  )
}
function MyValueSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Value.SummaryList>
        <Form.Section path="/name">
          <Value.Composition gap="small">
            <Value.Name.First path="/first" />
            <Value.Name.Last path="/last" />
          </Value.Composition>
        </Form.Section>

        <Form.Section path="/address">
          <Value.Composition gap="small">
            <Value.String label="Gateadresse" path="/street" />
            <Value.String label="Nr." path="/nr" placeholder="–" />
          </Value.Composition>
        </Form.Section>
      </Value.SummaryList>
    </Form.Section>
  )
}
`}),E=(e=`Field.errorRequired`)=>[e=>e!==void 0,{message:e}],D=()=>(0,h.jsx)(p,{scope:{z:o,asRequired:E},stableName:`SectionLevelZodSchema`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, JSONSchema, SectionProps, Tools, Value, makeAjvInstance, z } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Flex:r,Section:d,Field:i,Tools:a},noInline:!0,children:`const sectionSchema = z.object({
  firstName: z
    .string()
    .min(4, 'StringField.errorMinLength')
    .optional()
    .refine(...asRequired('FirstName.errorRequired')),
  lastName: z
    .string()
    .min(5, 'StringField.errorMinLength')
    .optional()
    .refine(...asRequired('LastName.errorRequired')),
})
render(
  <Form.Handler>
    <Flex.Stack>
      <Form.Section path="/customer" schema={sectionSchema}>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" label="Given name" />
          <Field.Name.Last path="/lastName" label="Surname" />
        </Field.Composition>
      </Form.Section>
      <Form.SubmitButton />
      <Tools.Log label="Data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
`});export{T as a,D as c,w as d,g as f,_ as i,v as l,b as n,x as o,m as r,C as s,S as t,y as u};