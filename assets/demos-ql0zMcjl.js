import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({NestedSize:()=>c,Size:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`form-appearance-size`,stableName:`Size`,noInline:!0,children:`const Appearance = () => {
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
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`form-appearance-size-nested`,stableName:`NestedSize`,children:`<Form.Appearance size="medium">
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Medium" value="Foo" />

      <Form.Appearance size="large">
        <Field.String label="Large" value="Bar" />
      </Form.Appearance>
    </Flex.Stack>
  </Form.Handler>
</Form.Appearance>
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.NestedSize`,!0),s||d(`Examples.Size`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Medium size`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Nested sizing`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};