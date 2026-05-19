import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>f,Empty:()=>s,FilterCountries:()=>y,InCard:()=>v,Label:()=>l,LabelAndValue:()=>u,LongLabel:()=>_,Placeholder:()=>c,TransformInAndOut:()=>x,ValidationPattern:()=>h,ValidationRequired:()=>m,Width:()=>b,WithError:()=>p,WithFieldBlockLabel:()=>S,WithFilter:()=>g,WithHelp:()=>d}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Field.PhoneNumber
  onFocus={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onFocus', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  onBlur={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onBlur', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  onCountryCodeChange={(countryCode) =>
    console.log('onCountryCodeChange', countryCode)
  }
  onNumberChange={(phoneNumber) =>
    console.log('onNumberChange', phoneNumber)
  }
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.PhoneNumber
  placeholder="Call this number"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.PhoneNumber
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`phone-number-label`,stableName:`LabelAndValue`,children:`<Field.PhoneNumber
  numberLabel="Label text"
  value="+4798765432"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.PhoneNumber
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.PhoneNumber
  value="+4712345678"
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  disabled
/>
`}),p=()=>(0,o.jsx)(r,{"data-visual-test":`phone-number-error`,stableName:`WithError`,children:`<Field.PhoneNumber
  value="007"
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.PhoneNumber
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  required
  validateInitially
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`ValidationPattern`,children:`<Field.PhoneNumber
  value="+41123"
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  pattern="^\\+41[1]\\d{2}$"
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`WithFilter`,children:`<Field.PhoneNumber
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
  countries="Scandinavia"
/>
`}),_=()=>(0,o.jsx)(r,{"data-visual-test":`phone-number-long-label`,stableName:`LongLabel`,children:`<Field.PhoneNumber
  numberLabel="Telefon/mobilnummer with long label"
  required={false}
/>
`}),v=()=>(0,o.jsx)(r,{"data-visual-test":`phone-number-in-card`,stableName:`InCard`,children:`<Form.Card>
  <Field.PhoneNumber />
</Form.Card>
`});function y(){return(0,o.jsx)(r,{stableName:`FilterCountries`,children:`<Field.PhoneNumber
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}var b=()=>(0,o.jsx)(r,{"data-visual-test":`phone-number-width`,stableName:`Width`,children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.PhoneNumber numberLabel="default" />
  <Field.PhoneNumber width="large" numberLabel="large" />
  <Field.PhoneNumber width="stretch" numberLabel="stretch" />
  <Field.PhoneNumber omitCountryCodeField numberLabel="default" />
  <Field.PhoneNumber
    omitCountryCodeField
    width="large"
    numberLabel="large"
  />
  <Field.PhoneNumber
    omitCountryCodeField
    width="stretch"
    numberLabel="stretch"
  />
</Form.Card>
`}),x=()=>(0,o.jsx)(r,{stableName:`TransformInAndOut`,noInline:!0,children:`const transformOut = (internalArgs, additionalArgs) => {
  return {
    countryCode: additionalArgs?.iso,
    phoneNumber: additionalArgs?.phoneNumber,
    countryCodePrefix: additionalArgs?.countryCode,
  }
}
const transformIn = (externalArgs) => {
  return {
    countryCode: externalArgs?.countryCodePrefix,
    phoneNumber: externalArgs?.phoneNumber,
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        countryCode: 'GB',
        phoneNumber: '9123457',
        countryCodePrefix: '+44',
      },
    }}
  >
    <Form.Card>
      <Field.PhoneNumber
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        numberLabel="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>
)
`}),S=()=>(0,o.jsx)(r,{stableName:`WithFieldBlockLabel`,children:`<Field.PhoneNumber
  label="Additional Label that will stretch all the way down here"
  labelDescription="And a label description that will stretch all the way down here"
/>
`});function C(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||T(`Examples`,!1),f||T(`Examples.Disabled`,!0),s||T(`Examples.Empty`,!0),y||T(`Examples.FilterCountries`,!0),v||T(`Examples.InCard`,!0),l||T(`Examples.Label`,!0),u||T(`Examples.LabelAndValue`,!0),_||T(`Examples.LongLabel`,!0),c||T(`Examples.Placeholder`,!0),x||T(`Examples.TransformInAndOut`,!0),h||T(`Examples.ValidationPattern`,!0),m||T(`Examples.ValidationRequired`,!0),b||T(`Examples.Width`,!0),p||T(`Examples.WithError`,!0),S||T(`Examples.WithFieldBlockLabel`,!0),g||T(`Examples.WithFilter`,!0),d||T(`Examples.WithHelp`,!0),n||T(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Show only Scandinavian countries`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Used in Card`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,o.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,o.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`With FieldBlock label`}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to use the `,(0,o.jsx)(t.code,{children:`label`}),` and `,(0,o.jsx)(t.code,{children:`labelDescription`}),` props on the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` wrapper.`]}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,o.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,o.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,o.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,o.jsx)(t.code,{children:`"+4798765432"`}),` or an object `,(0,o.jsx)(t.code,{children:`{ countryCode:"+47", phoneNumber:"98765432" }`}),`.`]}),`
`,(0,o.jsx)(x,{}),`
`,(0,o.jsx)(t.p,{children:`Here is how you can deal with TypeScript types for the transform functions:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-ts`,children:`import { AdditionalArgs } from '@dnb/eufemia/extensions/forms/Field/PhoneNumber'

type MyFieldShape = {
  countryCode: string
  phoneNumber: string
  countryCodePrefix: string
}

const transformOut = (internal, additionalArgs = {}) => {
  const {
    countryCode: countryCodePrefix,
    phoneNumber,
    iso: countryCode,
  } = additionalArgs as AdditionalArgs

  return {
    countryCode,
    phoneNumber,
    countryCodePrefix,
  } satisfies MyFieldShape
}

const transformIn = (
  {
    countryCode: iso,
    phoneNumber,
    countryCodePrefix: countryCode,
  }: MyFieldShape = {} as MyFieldShape | undefined
) => {
  return {
    countryCode,
    phoneNumber,
    iso,
  } satisfies AdditionalArgs
}
`})}),`
`,(0,o.jsxs)(n,{children:[(0,o.jsx)(_,{}),(0,o.jsx)(b,{})]})]})}function w(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};