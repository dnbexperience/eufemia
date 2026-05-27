import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Slider-C-DL8UCt.js";import{f as i}from"./Upload-6PNNLOzM.js";import{t as a}from"./Form-KS-x6we6.js";import{t as o}from"./Field-bFo7XjQz.js";import{Rr as s,un as c}from"./index-Da-r8F54.js";import{t as l}from"./ComponentBox-DXeEXSK2.js";var u=t({NestedSize:()=>p,Size:()=>f}),d=e(n()),f=()=>(0,d.jsx)(l,{"data-visual-test":`form-appearance-size`,stableName:`Size`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:c,Field:o,Slider:r,Upload:i},noInline:!0,children:`const Appearance = () => {
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
`}),p=()=>(0,d.jsx)(l,{"data-visual-test":`form-appearance-size-nested`,stableName:`NestedSize`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:c,Field:o},children:`<Form.Appearance size="medium">
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Medium" value="Foo" />

      <Form.Appearance size="large">
        <Field.String label="Large" value="Bar" />
      </Form.Appearance>
    </Flex.Stack>
  </Form.Handler>
</Form.Appearance>
`});function m(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.NestedSize`,!0),f||g(`Examples.Size`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Medium size`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Nested sizing`}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};