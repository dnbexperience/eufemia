import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-C6UABezd.js";import{t as i}from"./Form-C16rVaXm.js";import{t as a}from"./Field-B5trC2Cn.js";import{t as o}from"./Tools-B0-vRSQX.js";import{W as s}from"./index-BCXtuv-b.js";import{t as c}from"./ComponentBox-B2X8809Z.js";var l=e({Disabled:()=>g,Empty:()=>d,FilterCountries:()=>C,InCard:()=>S,Label:()=>p,LabelAndValue:()=>m,LongLabel:()=>x,Placeholder:()=>f,TransformInAndOut:()=>T,ValidationPattern:()=>y,ValidationRequired:()=>v,Width:()=>w,WithError:()=>_,WithFieldBlockLabel:()=>E,WithFilter:()=>b,WithHelp:()=>h}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Empty`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),f=()=>(0,u.jsx)(c,{stableName:`Placeholder`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
  placeholder="Call this number"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),p=()=>(0,u.jsx)(c,{stableName:`Label`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
  numberLabel="Label text"
  onChange={(value, { countryCode, phoneNumber, iso }) =>
    console.log('onChange', value, {
      countryCode,
      phoneNumber,
      iso,
    })
  }
/>
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`phone-number-label`,stableName:`LabelAndValue`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),h=()=>(0,u.jsx)(c,{stableName:`WithHelp`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),g=()=>(0,u.jsx)(c,{stableName:`Disabled`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),_=()=>(0,u.jsx)(c,{"data-visual-test":`phone-number-error`,stableName:`WithError`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),v=()=>(0,u.jsx)(c,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),y=()=>(0,u.jsx)(c,{stableName:`ValidationPattern`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),b=()=>(0,u.jsx)(c,{stableName:`WithFilter`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
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
`}),x=()=>(0,u.jsx)(c,{"data-visual-test":`phone-number-long-label`,stableName:`LongLabel`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
  numberLabel="Telefon/mobilnummer with long label"
  required={false}
/>
`}),S=()=>(0,u.jsx)(c,{"data-visual-test":`phone-number-in-card`,stableName:`InCard`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a},children:`<Form.Card>
  <Field.PhoneNumber />
</Form.Card>
`});function C(){return(0,u.jsx)(c,{stableName:`FilterCountries`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}var w=()=>(0,u.jsx)(c,{"data-visual-test":`phone-number-width`,stableName:`Width`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a},children:`<Form.Card>
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
`}),T=()=>(0,u.jsx)(c,{stableName:`TransformInAndOut`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a,Tools:o},noInline:!0,children:`const transformOut = (internalArgs, additionalArgs) => {
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
`}),E=()=>(0,u.jsx)(c,{stableName:`WithFieldBlockLabel`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PhoneNumber
  label="Additional Label that will stretch all the way down here"
  labelDescription="And a label description that will stretch all the way down here"
/>
`});function D(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...s(),...e.components},{VisibleWhenVisualTest:n}=t;return l||k(`Examples`,!1),g||k(`Examples.Disabled`,!0),d||k(`Examples.Empty`,!0),C||k(`Examples.FilterCountries`,!0),S||k(`Examples.InCard`,!0),p||k(`Examples.Label`,!0),m||k(`Examples.LabelAndValue`,!0),x||k(`Examples.LongLabel`,!0),f||k(`Examples.Placeholder`,!0),T||k(`Examples.TransformInAndOut`,!0),y||k(`Examples.ValidationPattern`,!0),v||k(`Examples.ValidationRequired`,!0),w||k(`Examples.Width`,!0),_||k(`Examples.WithError`,!0),E||k(`Examples.WithFieldBlockLabel`,!0),b||k(`Examples.WithFilter`,!0),h||k(`Examples.WithHelp`,!0),n||k(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Empty`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Label`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Label and value`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Show only Scandinavian countries`}),`
`,(0,u.jsx)(b,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Used in Card`}),`
`,(0,u.jsx)(S,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`Error`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,u.jsx)(y,{}),`
`,(0,u.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,u.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,u.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,u.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,u.jsx)(C,{}),`
`,(0,u.jsx)(t.h3,{children:`With FieldBlock label`}),`
`,(0,u.jsxs)(t.p,{children:[`This example demonstrates how to use the `,(0,u.jsx)(t.code,{children:`label`}),` and `,(0,u.jsx)(t.code,{children:`labelDescription`}),` props on the `,(0,u.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` wrapper.`]}),`
`,(0,u.jsx)(E,{}),`
`,(0,u.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,u.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,u.jsxs)(t.p,{children:[`You can use the `,(0,u.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,u.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,u.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,u.jsx)(t.code,{children:`"+4798765432"`}),` or an object `,(0,u.jsx)(t.code,{children:`{ countryCode:"+47", phoneNumber:"98765432" }`}),`.`]}),`
`,(0,u.jsx)(T,{}),`
`,(0,u.jsx)(t.p,{children:`Here is how you can deal with TypeScript types for the transform functions:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-ts`,children:`import { AdditionalArgs } from '@dnb/eufemia/extensions/forms/Field/PhoneNumber'

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
`,(0,u.jsxs)(n,{children:[(0,u.jsx)(x,{}),(0,u.jsx)(w,{})]})]})}function O(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};