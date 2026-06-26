import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DM984GyO.js";import{V as i,j as a,q as o,w as s}from"./forms-CFi5-4x5.js";import{U as c}from"./index-kfZVC31v.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";var u=e({NestedSize:()=>p,Size:()=>f}),d=t(n()),f=()=>(0,d.jsx)(l,{"data-visual-test":`form-appearance-size`,stableName:`Size`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { FormAppearanceProps } from '@dnb/eufemia/extensions/forms/Form/Appearance'`],__buildScope:{Form:s,Flex:r,Field:a,Slider:o,Upload:i},noInline:!0,children:`type AppearanceData = {
  size: 'default' | NonNullable<FormAppearanceProps['size']>
}
const Appearance = () => {
  const { data } = Form.useData<AppearanceData>('appearance', {
    size: 'medium',
  })
  const size = data.size === 'default' ? undefined : data.size
  return (
    <Form.Appearance size={size}>
      <Form.Handler id="appearance">
        <Flex.Stack>
          <Field.Selection label="Choose size" path="/size">
            <Field.Option value="default" title="Default" />
            <Field.Option value="medium" title="Medium" />
            <Field.Option value="large" title="Large" />
          </Field.Selection>
          <Field.String label="String" value="Foo" />
          <Field.String
            label="String multiline"
            multiline
            value="Foo"
            rows={1}
          />
          <Field.Number label="Number" value={1234} />
          <Field.Number
            label="Number"
            currency
            currencyDisplay="name"
            value={1234}
            showStepControls
          />
          <Field.Date />
          <Field.Email value="mail@dnb.no" />
          <Field.Currency
            label="Amount"
            currencyDisplay="name"
            value={1234}
          />
          <Field.Expiry />
          <Field.NationalIdentityNumber value="12345678012" />
          <Field.OrganizationNumber value="123123123" />
          <Field.PhoneNumber />
          <Field.PostalCodeAndCity
            postalCode={{}}
            city={{
              value: 'Oslo',
            }}
          />
          <Field.SelectCountry />
          <Field.BankAccountNumber />
          <Field.Name.First />
          <Field.Name.Last />
          <Field.DateOfBirth />
          <Field.Password />
          <Field.Slider />
          <Field.Upload />
          <Field.Address.Postal />
          <Field.Address.Street />
          <Field.Indeterminate dependencePaths={[]} />
          <Field.Toggle valueOn="what-ever" valueOff="you-name-it" />
          <Field.Boolean />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Form.Handler>
    </Form.Appearance>
  )
}
render(<Appearance />)
`}),p=()=>(0,d.jsx)(l,{"data-visual-test":`form-appearance-size-nested`,stableName:`NestedSize`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { FormAppearanceProps } from '@dnb/eufemia/extensions/forms/Form/Appearance'`],__buildScope:{Form:s,Flex:r,Field:a},children:`<Form.Appearance size="medium">
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Medium" value="Foo" />

      <Form.Appearance size="large">
        <Field.String label="Large" value="Bar" />
      </Form.Appearance>
    </Flex.Stack>
  </Form.Handler>
</Form.Appearance>
`});function m(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.NestedSize`,!0),f||g(`Examples.Size`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Medium size`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Nested sizing`}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};