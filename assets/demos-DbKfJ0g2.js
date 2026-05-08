import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({Disabled:()=>d,Empty:()=>o,FilterCountries:()=>v,InCard:()=>_,Label:()=>c,LabelAndValue:()=>l,LongLabel:()=>g,Placeholder:()=>s,TransformInAndOut:()=>b,ValidationPattern:()=>m,ValidationRequired:()=>p,Width:()=>y,WithError:()=>f,WithFieldBlockLabel:()=>x,WithFilter:()=>h,WithHelp:()=>u}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),s=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
  placeholder="Call this number"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`phone-number-label`,children:`<Field.PhoneNumber
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
`}),u=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),d=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),f=()=>(0,a.jsx)(n,{"data-visual-test":`phone-number-error`,children:`<Field.PhoneNumber
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
`}),p=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),m=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),h=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
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
`}),g=()=>(0,a.jsx)(n,{"data-visual-test":`phone-number-long-label`,children:`<Field.PhoneNumber
  numberLabel="Telefon/mobilnummer with long label"
  required={false}
/>
`}),_=()=>(0,a.jsx)(n,{"data-visual-test":`phone-number-in-card`,children:`<Form.Card>
  <Field.PhoneNumber />
</Form.Card>
`});function v(){return(0,a.jsx)(n,{children:`<Field.PhoneNumber
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}var y=()=>(0,a.jsx)(n,{"data-visual-test":`phone-number-width`,children:`<Form.Card>
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
`}),b=()=>(0,a.jsx)(n,{noInline:!0,children:`const transformOut = (internalArgs, additionalArgs) => {
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
`}),x=()=>(0,a.jsx)(n,{children:`<Field.PhoneNumber
  label="Additional Label that will stretch all the way down here"
  labelDescription="And a label description that will stretch all the way down here"
/>
`});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||w(`Examples`,!1),d||w(`Examples.Disabled`,!0),o||w(`Examples.Empty`,!0),v||w(`Examples.FilterCountries`,!0),_||w(`Examples.InCard`,!0),c||w(`Examples.Label`,!0),l||w(`Examples.LabelAndValue`,!0),g||w(`Examples.LongLabel`,!0),s||w(`Examples.Placeholder`,!0),b||w(`Examples.TransformInAndOut`,!0),m||w(`Examples.ValidationPattern`,!0),p||w(`Examples.ValidationRequired`,!0),y||w(`Examples.Width`,!0),f||w(`Examples.WithError`,!0),x||w(`Examples.WithFieldBlockLabel`,!0),h||w(`Examples.WithFilter`,!0),u||w(`Examples.WithHelp`,!0),n||w(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Show only Scandinavian countries`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Used in Card`}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,a.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,a.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,a.jsx)(v,{}),`
`,(0,a.jsx)(t.h3,{children:`With FieldBlock label`}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to use the `,(0,a.jsx)(t.code,{children:`label`}),` and `,(0,a.jsx)(t.code,{children:`labelDescription`}),` props on the `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` wrapper.`]}),`
`,(0,a.jsx)(x,{}),`
`,(0,a.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,a.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,a.jsxs)(t.p,{children:[`You can use the `,(0,a.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,a.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,a.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,a.jsx)(t.code,{children:`"+4798765432"`}),` or an object `,(0,a.jsx)(t.code,{children:`{ countryCode:"+47", phoneNumber:"98765432" }`}),`.`]}),`
`,(0,a.jsx)(b,{}),`
`,(0,a.jsx)(t.p,{children:`Here is how you can deal with TypeScript types for the transform functions:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-ts`,children:`import { AdditionalArgs } from '@dnb/eufemia/extensions/forms/Field/PhoneNumber'

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
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(g,{}),(0,a.jsx)(y,{})]})]})}function C(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};