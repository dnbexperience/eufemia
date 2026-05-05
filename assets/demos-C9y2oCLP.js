import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({NestedSize:()=>s,Size:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`form-appearance-size`,noInline:!0,children:`const Appearance = () => {
  const { data } = Form.useData('appearance', {
    size: 'medium',
  })
  const size: any = data.size
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
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`form-appearance-size-nested`,children:`<Form.Appearance size="medium">
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Medium" value="Foo" />

      <Form.Appearance size="large">
        <Field.String label="Large" value="Bar" />
      </Form.Appearance>
    </Flex.Stack>
  </Form.Handler>
</Form.Appearance>
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),s||u(`Examples.NestedSize`,!0),o||u(`Examples.Size`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Medium size`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Nested sizing`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};