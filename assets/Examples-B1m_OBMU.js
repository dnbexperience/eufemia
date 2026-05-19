import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./ajv-Cz96LLhY.js";import{ct as a}from"./index-DqqByKA2.js";var o=t({AllFieldsRequired:()=>m,BasicViewAndEditContainer:()=>f,NestedPathSection:()=>l,NestedSections:()=>_,OverwriteProps:()=>p,SchemaSupport:()=>h,SectionLevelZodSchema:()=>y,ViewAndEditContainer:()=>u,ViewAndEditContainerValidation:()=>d,WithVisibility:()=>g,WithoutDataContext:()=>c}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`WithoutDataContext`,children:`<Form.Section
  data={{
    myField: 'Value',
  }}
  onChange={console.log}
>
  <Field.String path="/myField" />
</Form.Section>
`}),l=()=>(0,s.jsx)(r,{stableName:`NestedPathSection`,noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
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
`}),u=()=>(0,s.jsx)(r,{"data-visual-test":`view-and-edit-container`,hideCode:!0,stableName:`ViewAndEditContainer`,noInline:!0,children:`const MyEditContainer = () => {
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
`}),d=()=>(0,s.jsx)(r,{hideCode:!0,stableName:`ViewAndEditContainerValidation`,noInline:!0,children:`const MyEditContainer = () => {
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
`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`basic-view-and-edit-container`,hideCode:!0,stableName:`BasicViewAndEditContainer`,noInline:!0,children:`const MyEditContainer = () => {
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
`}),p=()=>(0,s.jsx)(r,{stableName:`OverwriteProps`,noInline:!0,children:`const MyNameSection = (props) => {
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
`}),m=()=>(0,s.jsx)(r,{scope:{makeAjvInstance:i},stableName:`AllFieldsRequired`,noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
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
`}),h=()=>(0,s.jsx)(r,{scope:{makeAjvInstance:i},stableName:`SchemaSupport`,noInline:!0,children:`const MyNameSection = (props: SectionProps) => {
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
`}),g=()=>(0,s.jsx)(r,{stableName:`WithVisibility`,noInline:!0,children:`const MySection = ({ children, ...props }) => {
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
`}),_=()=>(0,s.jsx)(r,{stableName:`NestedSections`,noInline:!0,children:`render(
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
`}),v=(e=`Field.errorRequired`)=>[e=>e!==void 0,{message:e}],y=()=>(0,s.jsx)(r,{scope:{z:a,asRequired:v},stableName:`SectionLevelZodSchema`,noInline:!0,children:`const sectionSchema = z.object({
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
`});export{_ as a,y as c,g as d,c as f,l as i,u as l,f as n,p as o,o as r,h as s,m as t,d as u};