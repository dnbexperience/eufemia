"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[65783,55310],{9947:function(n,e,a){a.r(e);var t=a(52322),r=a(45392),o=a(94929),i=a(57295);function s(n){const e=Object.assign({h1:"h1",p:"p",strong:"strong",ul:"ul",li:"li",a:"a",code:"code",h3:"h3",h4:"h4",pre:"pre",h5:"h5",h2:"h2"},(0,r.ah)(),n.components);return o||l("Examples",!1),o.GettingStarted||l("Examples.GettingStarted",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{children:"Getting started"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Table of Contents"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#quick-start",children:"Quick start"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#creating-forms",children:"Creating forms"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#state-management",children:"State management"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#field-components",children:"Field components"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#value-components",children:"Value components"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#validation-and-error-handling",children:"Validation and error handling"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#localization",children:"Localization"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#layout",children:"Layout"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#best-practices",children:"Best practices"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#create-your-own-components",children:"Create your own components"})}),"\n"]}),"\n",(0,t.jsx)(i.default,{}),"\n",(0,t.jsxs)(e.p,{children:["The needed styles are included in the Eufemia core package via ",(0,t.jsx)(e.code,{children:"dnb-ui-components"}),"."]}),"\n",(0,t.jsx)(e.h3,{children:"Creating forms"}),"\n",(0,t.jsxs)(e.p,{children:["To build an entire form, there are surrounding components such as ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Form/Handler",children:"Form.Handler"})," and ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/StepsLayout",children:"StepsLayout"})," that make data flow and layout easier and save you a lot of extra code, without compromising flexibility."]}),"\n",(0,t.jsx)(e.h3,{children:"State management"}),"\n",(0,t.jsxs)(e.p,{children:["The state management is done via the ",(0,t.jsx)(e.a,{href:"#what-is-a-json-pointer",children:"JSON Pointer"})," directive (i.e ",(0,t.jsx)(e.code,{children:'path="/firstName"'}),"). This is a standardized way of pointing to a specific part of a JavaScript/JSON object. The JSON Pointer is used to both read and write data, and is also used to validate the data."]}),"\n",(0,t.jsx)(o.GettingStarted,{}),"\n",(0,t.jsx)(e.h4,{children:"Filter data"}),"\n",(0,t.jsxs)(e.p,{children:["You can filter data by any given criteria. This is done by adding a ",(0,t.jsx)(e.code,{children:"filterData"})," property with a handler to the ",(0,t.jsx)(e.code,{children:"Form.Handler"}),"."]}),"\n",(0,t.jsx)(e.p,{children:"The callback function receives the path as the first argument, the value as the second argument, and the related field properties as the third argument. The callback function must return a boolean value or undefined. Return false to exclude an entry."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const filterDataHandler = (path, value, props) => {\n  if (props.disabled === true) {\n    return false\n  }\n}\nrender(<Form.Handler filterData={filterDataHandler} />)\n"})}),"\n",(0,t.jsxs)(e.p,{children:["Here is a working example of how to ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Form/Handler/demos/#filter-your-data",children:"filter data"}),"."]}),"\n",(0,t.jsx)(e.h3,{children:"What is a JSON Pointer?"}),"\n",(0,t.jsxs)(e.p,{children:["A ",(0,t.jsx)(e.a,{href:"https://datatracker.ietf.org/doc/html/draft-ietf-appsawg-json-pointer-03",children:"JSON Pointer"})," is a string of tokens separated by ",(0,t.jsx)(e.code,{children:"/"})," characters, these tokens either specify keys in objects or indexes into arrays."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ts",children:"const data = {\n  foo: {\n    bar: [\n      {\n        baz: 'value',\n      },\n    ],\n  },\n}\nconst pointer = '/foo/bar/0/baz' // points to 'value'\n"})}),"\n",(0,t.jsx)(e.h3,{children:"Field components"}),"\n",(0,t.jsxs)(e.p,{children:["In short, field components are interactive components that the user can interact with. Read more about fields in the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/fields/",children:"What are fields?"})," section."]}),"\n",(0,t.jsx)(e.h3,{children:"Value components"}),"\n",(0,t.jsxs)(e.p,{children:["Beside the interactive ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/fields/",children:"Field"})," components, there are also the static ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Value/",children:"Value"})," components. Use these to show summaries or read-only parts of your application with benefits such as linking to source data and standardized formatting based on the type of data to be displayed."]}),"\n",(0,t.jsx)(e.h3,{children:"Validation and error handling"}),"\n",(0,t.jsx)(e.p,{children:"Every field component has a built-in validation that is based on the type of data it handles. This validation is automatically applied to the field when the user interacts with it. The validation is also applied when the user submits the form."}),"\n",(0,t.jsxs)(e.p,{children:["In addition, you can add your own validation to a field component. This is done by adding a ",(0,t.jsx)(e.code,{children:"required"}),", ",(0,t.jsx)(e.code,{children:"pattern"}),", ",(0,t.jsx)(e.code,{children:"schema"})," or ",(0,t.jsx)(e.code,{children:"validator"})," property."]}),"\n",(0,t.jsxs)(e.p,{children:["Fields which have the ",(0,t.jsx)(e.code,{children:"disabled"})," prop or the ",(0,t.jsx)(e.code,{children:"readOnly"})," prop, will skip validation."]}),"\n",(0,t.jsxs)(e.p,{children:["For monitoring your form for errors, you can use the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Form/useError",children:"Form.useError"})," hook."]}),"\n",(0,t.jsx)(e.h4,{children:"required"}),"\n",(0,t.jsx)(e.p,{children:"The required property is a boolean that indicates whether the field is required or not:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"render(<Field.PhoneNumber required />)\n"})}),"\n",(0,t.jsx)(e.h4,{children:"pattern"}),"\n",(0,t.jsx)(e.p,{children:"The pattern property is a regular expression that the value of the field must match:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:'render(<Field.PhoneNumber pattern="..." />)\n'})}),"\n",(0,t.jsx)(e.h4,{children:"schema"}),"\n",(0,t.jsx)(e.p,{children:"The schema property is a JSON schema that the value of the field must match:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const schema = {\n  pattern: '...',\n}\nrender(<Field.PhoneNumber schema={schema} />)\n"})}),"\n",(0,t.jsx)(e.h4,{children:"validator"}),"\n",(0,t.jsx)(e.p,{children:"The validator property is a function that takes the current value of the field as an argument and returns an error message if the value is invalid:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const validator = (value) => {\n  const isInvalid = new RegExp('...').test(value)\n  if (isInvalid) {\n    return new Error('Invalid value message')\n  }\n}\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,t.jsxs)(e.p,{children:["You can find more info about error messages in the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Form/error-messages/",children:"Error messages"})," docs."]}),"\n",(0,t.jsx)(e.h5,{children:"Async validator with a Promise"}),"\n",(0,t.jsx)(e.p,{children:"Async validation is also supported. The validator function can return a promise that resolves to an error message:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const validator = (value) => {\n  return new Promise((resolve, reject) => {\n    // Delay the response\n    resolve(new Error('Invalid value')) // Show this message\n  })\n}\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,t.jsx)(e.h5,{children:"Async validator with async/await"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const validator = async (value) => {\n  const isInvalid = await makeRequest(value)\n  if (isInvalid) {\n    return new Error('Invalid value') // Show this message\n  }\n}\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,t.jsx)(e.h3,{children:"Localization"}),"\n",(0,t.jsxs)(e.p,{children:["In short, use the Eufemia ",(0,t.jsx)(e.a,{href:"/uilib/usage/customisation/localization/",children:"Provider"})," to set the locale for your application (forms). This will ensure that the correct language is used for all the fields in your form."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import Provider from '@dnb/eufemia/shared/Provider'\n\nrender(\n  <Provider locale=\"en-GB\">\n    <Field.PhoneNumber />\n  </Provider>,\n)\n"})}),"\n",(0,t.jsx)(e.p,{children:"In addition, you can customize the translations globally:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import Provider from '@dnb/eufemia/shared/Provider'\n\nrender(\n  <Provider\n    locales={{\n      'nb-NO': {\n        Forms: { phoneNumberLabel: 'Custom' },\n      },\n    }}\n  >\n    <Field.PhoneNumber />\n  </Provider>,\n)\n"})}),"\n",(0,t.jsx)(e.h3,{children:"Layout"}),"\n",(0,t.jsx)(e.p,{children:"When building your application forms, preferably use the following layout components. They seamlessly places all the fields and components of Eufemia Forms correctly into place."}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"/uilib/layout/flex",children:"Flex"})," layout component for easy and consistent application forms."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"/uilib/components/card",children:"Card"})," for the default card outline of forms."]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{children:"Best practices"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/best-practices-on-forms/",children:"Best practices on Forms"}),"."]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{children:"Create your own components"}),"\n",(0,t.jsx)(e.p,{children:"Eufemia Forms consists of helper components and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components. This ensures a common look and feel, even when ready-made components are combined with your local custom components."}),"\n",(0,t.jsxs)(e.p,{children:["Read more about on how to ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component",children:"create your own component"}),"."]})]})}function l(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(s,n)})):s(n)}},57295:function(n,e,a){a.r(e);var t=a(52322),r=a(45392);function o(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",a:"a"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Quick start"}),"\n",(0,t.jsxs)(e.p,{children:["Field components can be used directly as they are, for example ",(0,t.jsx)(e.code,{children:"Field.Email"}),":"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.Email />)\n"})}),"\n",(0,t.jsx)(e.p,{children:"By building an entire form with components from Eufemia and Eufemia Forms, you save time and code:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:'import { Card } from \'@dnb/eufemia\'\nimport { Form, Field } from \'@dnb/eufemia/extensions/forms\'\nrender(\n  <Form.Handler\n    data={existingData}\n    onChange={...}\n    onSubmit={...}\n  >\n    <Card spacing="medium">\n      <Field.String\n        path="/companyName"\n        label="Bedriftens navn"\n        required\n      />\n      <Field.OrganizationNumber\n        path="/companyOrganizationNumber"\n        required\n      />\n      <Field.Selection\n        path="/postalAddressSelect"\n        label="Ønsket sted for tilsendt post"\n        variant="radio"\n      >\n        <Field.Option value="companyAddress" title="Samme som forretningsadresse" />\n        <Field.Option value="other" title="Annet" />\n      </Field.Selection>\n    </Card>\n  </Form.Handler>\n)\n'})}),"\n",(0,t.jsxs)(e.p,{children:["Use the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Form/useData/",children:"useData"})," hook to access or modify your form data outside of the form context within your application:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\nfunction Component() {\n  const { data, update } = Form.useData('unique')\n\n  return (\n    <Form.Handler\n      id=\"unique\"\n      ...\n    >\n      ...\n    </Form.Handler>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o(n)}},94929:function(n,e,a){a.r(e),a.d(e,{BaseFieldComponents:function(){return u},CreateBasicFieldComponent:function(){return d},CreateComposedFieldComponent:function(){return h},FeatureFields:function(){return m},GettingStarted:function(){return c},LayoutComponents:function(){return p},UsingFormHandler:function(){return x},Validation:function(){return g},VisibilityBasedOnData:function(){return f},WithSteps:function(){return v}});a(2784);var t=a(44464),r=a(35533),o=a(16620),i=a(64129),s=a(85221),l=a(52322);const d=()=>(0,l.jsx)(t.Z,{scope:{useDataValue:r.Z},hideCode:!0,noInline:!0,children:"const MyCustomField = (props) => {\n  const fromInput = React.useCallback(({ value }) => value, [])\n  const preparedProps = {\n    ...props,\n    fromInput,\n    validator: (value) => {\n      return value === 'secret'\n        ? new Error('Do not reveal the secret!')\n        : undefined\n    },\n  }\n  const {\n    id,\n    info,\n    warning,\n    error,\n    value,\n    handleChange,\n    handleFocus,\n    handleBlur,\n  } = useDataValue(preparedProps)\n  return (\n    <FieldBlock\n      forId={id}\n      label=\"What is the secret of the custom field?\"\n      info={info}\n      warning={warning}\n      error={error}\n    >\n      <Input\n        id={id}\n        value={value}\n        on_change={handleChange}\n        on_focus={handleFocus}\n        on_blur={handleBlur}\n      />\n    </FieldBlock>\n  )\n}\nrender(\n  <MyCustomField\n    value=\"Nothing to see here\"\n    onChange={(value) => console.log('onChange', value)}\n  />,\n)\n"}),c=()=>(0,l.jsx)(t.Z,{hideCode:!0,noInline:!0,children:'const existingData = {\n  companyName: \'DNB\',\n  companyOrganizationNumber: \'123456789\',\n  postalAddressSelect: \'companyAddress\',\n}\nfunction Component() {\n  const { data } = Form.useData(\'company-form\')\n  console.log(\'State:\', data)\n  return (\n    <Form.Handler\n      id="company-form"\n      data={existingData}\n      onChange={console.log}\n      onSubmit={console.log}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Bedrift</Form.MainHeading>\n        <Card spacing="medium">\n          <Field.String\n            path="/companyName"\n            label="Bedriftens navn"\n            required\n          />\n          <Field.OrganizationNumber\n            path="/companyOrganizationNumber"\n            required\n          />\n          <Field.Selection\n            path="/postalAddressSelect"\n            label="Ønsket sted for tilsendt post"\n            variant="radio"\n          >\n            <Field.Option\n              value="companyAddress"\n              title="Samme som forretningsadresse"\n            />\n            <Field.Option value="other" title="Annet" />\n          </Field.Selection>\n        </Card>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n'}),h=()=>(0,l.jsx)(t.Z,{scope:{DataContext:o,useDataValue:r.Z},hideCode:!0,noInline:!0,children:'const MyComposedField = (props) => {\n  const birthYear = useDataValue({\n    path: \'/birthYear\',\n  })\n  const handleBirthYearChange = React.useCallback(\n    (sliderData) => {\n      birthYear.handleChange(sliderData.value)\n    },\n    [birthYear],\n  )\n  return (\n    <FieldBlock label={props.label ?? \'Name and age\'}>\n      <Flex.Horizontal>\n        <Field.String\n          path="/firstName"\n          label="First name"\n          width="medium"\n          minLength={2}\n        />\n        <Field.String\n          path="/lastName"\n          label="Last name"\n          width="medium"\n          required\n        />\n        <FieldBlock width="large">\n          <Slider\n            min={1900}\n            max={new Date().getFullYear()}\n            step={1}\n            label="Birth year"\n            label_direction="vertical"\n            value={parseFloat(String(birthYear.value))}\n            on_change={handleBirthYearChange}\n            on_drag_start={birthYear.handleFocus}\n            on_drag_end={birthYear.handleBlur}\n            status={birthYear.error?.message}\n            tooltip\n          />\n        </FieldBlock>\n      </Flex.Horizontal>\n    </FieldBlock>\n  )\n}\nconst data = {\n  firstName: \'John\',\n  birthYear: 2000,\n}\nrender(\n  <DataContext.Provider\n    data={data}\n    onChange={(data) => console.log(\'onChange\', data)}\n  >\n    <MyComposedField label="My custom label" />\n  </DataContext.Provider>,\n)\n'}),u=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:'<Card stack>\n  <Field.String\n    label="Text field"\n    value="Lorem Ipsum"\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Number\n    label="Number Field"\n    value={789}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Boolean\n    label="Boolean Field"\n    value={true}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n</Card>\n'}),m=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:'<Card stack>\n  <Field.String label="Fornavn" value="John" />\n  <Field.String label="Etternavn" value="Smith" />\n  <Field.NationalIdentityNumber value="20058512345" />\n  <Field.Email value="john@smith.email" />\n  <Field.PhoneNumber value="+47 98765432" />\n</Card>\n'}),p=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),f=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:'<Form.Handler\n  data={{\n    firstName: undefined,\n    lastName: \'Smith\',\n    advanced: false,\n    ssn: \'123\',\n    email: \'@smith.email\',\n    phone: \'+47 98765432\',\n  }}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Profile</Form.MainHeading>\n\n    <Card stack>\n      <Form.SubHeading>Name</Form.SubHeading>\n\n      <Field.String path="/firstName" label="Fornavn" />\n      <Field.String path="/lastName" label="Etternavn" />\n    </Card>\n  </Flex.Stack>\n  <Field.Boolean\n    path="/advanced"\n    variant="checkbox-button"\n    label="More fields"\n  />\n  <Form.Visibility pathTrue="/advanced">\n    <Flex.Stack>\n      <Card stack>\n        <Form.SubHeading>More information</Form.SubHeading>\n\n        <Field.NationalIdentityNumber value="20058512345" />\n        <Field.Email value="john@smith.email" />\n        <Field.PhoneNumber value="+47 98765432" />\n      </Card>\n    </Flex.Stack>\n  </Form.Visibility>\n</Form.Handler>\n'}),x=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Smith',\n    ssn: '20058512345',\n    email: 'john@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" />\n    <Field.NationalIdentityNumber path=\"/ssn\" />\n    <Field.Email path=\"/email\" />\n    <Field.PhoneNumber path=\"/phone\" />\n\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n"}),g=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:"<Form.Handler\n  data={{\n    firstName: undefined,\n    lastName: 'Smith',\n    ssn: '123',\n    email: '@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" required />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" required />\n    <Field.NationalIdentityNumber path=\"/ssn\" validateInitially />\n    <Field.Email path=\"/email\" validateInitially />\n    <Field.PhoneNumber path=\"/phone\" validateInitially />\n  </Card>\n</Form.Handler>\n"}),v=()=>(0,l.jsx)(t.Z,{scope:{StepsLayout:i.Z,Value:s},children:'<Form.Handler\n  data={{\n    firstName: undefined,\n    lastName: \'Smith\',\n    advanced: false,\n    ssn: \'123\',\n    email: \'@smith.email\',\n    phone: \'+47 98765432\',\n  }}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n>\n  <StepsLayout mode="loose">\n    <StepsLayout.Step title="Name">\n      <Form.MainHeading>Profile</Form.MainHeading>\n\n      <Card stack>\n        <Form.SubHeading>Name</Form.SubHeading>\n\n        <Field.String path="/firstName" label="Fornavn" required />\n        <Field.String path="/lastName" label="Etternavn" required />\n      </Card>\n\n      <Form.ButtonRow>\n        <StepsLayout.NextButton />\n      </Form.ButtonRow>\n    </StepsLayout.Step>\n\n    <StepsLayout.Step title="More information">\n      <Form.MainHeading>Profile</Form.MainHeading>\n\n      <Card stack>\n        <Form.SubHeading>More information</Form.SubHeading>\n\n        <Field.NationalIdentityNumber path="/ssn" />\n        <Field.Email path="/email" />\n        <Field.PhoneNumber path="/phone" />\n      </Card>\n\n      <Form.ButtonRow>\n        <StepsLayout.PreviousButton />\n        <StepsLayout.NextButton />\n      </Form.ButtonRow>\n    </StepsLayout.Step>\n\n    <StepsLayout.Step title="Summary">\n      <Form.MainHeading>Profile</Form.MainHeading>\n\n      <Card stack>\n        <Flex.Container>\n          <Value.String path="/firstName" label="Fornavn" />\n          <Value.String path="/lastName" label="Etternavn" />\n        </Flex.Container>\n\n        <Value.NationalIdentityNumber path="/ssn" />\n        <Value.Email path="/email" />\n        <Value.PhoneNumber path="/phone" />\n      </Card>\n\n      <Form.ButtonRow>\n        <StepsLayout.PreviousButton />\n        <Form.SubmitButton />\n      </Form.ButtonRow>\n    </StepsLayout.Step>\n  </StepsLayout>\n</Form.Handler>\n'})},16620:function(n,e,a){a.r(e),a.d(e,{At:function(){return c},Context:function(){return t.Z},Provider:function(){return r.Z},defaultContextState:function(){return t.E}});var t=a(21068),r=a(80370),o=a(2784),i=a(95955),s=a.n(i),l=a(52322);function d(n){const{path:e="/",iterate:a,children:r}=n,i=(0,o.useContext)(t.Z),{data:d,handlePathChange:c}=i,h=d&&s().has(d,e)?s().get(d,e):void 0,u=(0,o.useMemo)((()=>c?(n,a)=>{c(`${e}${n}`,a)}:void 0),[c,e]);return a?Array.isArray(h)?(0,l.jsx)(l.Fragment,{children:h.map(((n,a)=>{const o=c?(n,t)=>{c(`${e}/${a}${n}`,t)}:void 0;return(0,l.jsx)(t.Z.Provider,{value:{...i,data:n,handlePathChange:o},children:r},`element${a}`)}))}):null:(0,l.jsx)(t.Z.Provider,{value:{...i,data:h,handlePathChange:u},children:r})}d._supportsSpacingProps=!0;var c=d},59626:function(n,e,a){const t=a(2784).createContext(void 0);e.Z=t},64129:function(n,e,a){a.d(e,{Z:function(){return P}});var t=a(2784),r=a(72779),o=a.n(r),i=a(80215),s=a(76603),l=a(93573),d=a(21068),c=a(30392),h=a(59626),u=a(52322);function m(n){const{className:e,index:a,children:r}=n,i=(0,t.useContext)(h.Z);return(null==i?void 0:i.activeIndex)!==a?null:(0,u.jsx)(c.Z,{className:o()("dnb-forms-step",e),direction:"vertical",...(0,c.W)(n),children:r})}m._supportsSpacingProps=!0;var p=m,f=a(96844),x=a(28952),g=a(65927);function v(n){const e=(0,t.useContext)(x.Z),{className:a,variant:r="primary",icon_position:i="right",icon:s="chevron_right",children:l=(null==e?void 0:e.translation.Forms.stepNext)}=n,d=(0,t.useContext)(h.Z);return(0,u.jsx)(g.Z,{children:(0,u.jsx)(f.Z,{...n,className:o()("dnb-forms-next-button",a),onClick:null==d?void 0:d.handleNext,variant:r,icon_position:i,icon:s,children:l})})}v._supportsSpacingProps=!0;var b=v;function F(n){const e=(0,t.useContext)(x.Z),{className:a,variant:r="tertiary",icon_position:i="left",icon:s="chevron_left",children:l=(null==e?void 0:e.translation.Forms.stepPrevious)}=n,d=(0,t.useContext)(h.Z);return(0,u.jsx)(g.Z,{children:(0,u.jsx)(f.Z,{...n,className:o()("dnb-forms-previous-button",a),onClick:null==d?void 0:d.handlePrevious,variant:r,icon_position:i,icon:s,children:l})})}F._supportsSpacingProps=!0;var j=F;function y(n){const{className:e}=n;return(0,u.jsxs)(g.Z,{className:o()("dnb-forms-buttons",e),...n,children:[(0,u.jsx)(j,{}),(0,u.jsx)(b,{})]})}y._supportsSpacingProps=!0;var S=y,C=a(80370),N=a(70242);function w(n){const{className:e,id:a,mode:r="strict",scrollTopOnStepChange:c,initialActiveIndex:m=0,onStepChange:f,children:x,noAnimation:g=!0,variant:v="sidebar",sidebarId:b,...F}=n,j=(0,t.useContext)(d.Z),{hasContext:y,hasErrors:S,setShowAllErrors:P,scrollToTop:k}=j,{0:H,1:B}=(0,t.useState)(m),Z=(0,N.Z)(a),E=(0,t.useCallback)((()=>{B((n=>(null==f||f(n-1),n-1))),c&&k()}),[c,f,k]),_=(0,t.useCallback)((()=>{S()?P(!0):(B((n=>(null==f||f(n+1),n+1))),c&&k())}),[S,c,f,k,P]),I=t.Children.map(x,(n=>{var e;if(!t.isValidElement(n)||n.type!==p)throw new Error("Only Step can be children of StepsLayout");return null!==(e=n.props.title)&&void 0!==e?e:"Title missing"})),L=(0,t.useCallback)((n=>{let{current_step:e}=n;B(e)}),[]);return y?(0,u.jsx)(h.Z.Provider,{value:{activeIndex:H,handlePrevious:E,handleNext:_},children:(0,u.jsxs)(i.Z,{className:o()("dnb-forms-steps-layout","drawer"===v&&"dnb-forms-steps-layout--drawer",e),...F,children:[(0,u.jsxs)("aside",{className:"dnb-forms-steps-layout__sidebar",children:[(0,u.jsx)(s.Z.Sidebar,{sidebar_id:Z}),(0,u.jsx)(s.Z,{bottom:!0,current_step:H,data:I,mode:r,no_animation:g,on_change:L,sidebar_id:"drawer"!==v||b?b||Z:""})]}),(0,u.jsx)("div",{className:"dnb-forms-steps-layout__contents",children:t.Children.map(x,((n,e)=>t.isValidElement(n)&&n.type===p?t.cloneElement(n,{index:e}):n))})]})}):((0,l.ZK)("You may wrap StepsLayout in Form.Handler"),(0,u.jsx)(C.Z,{children:(0,u.jsx)(w,{...n,id:Z})}))}w._supportsSpacingProps=!0,w.Step=p,w.NextButton=b,w.PreviousButton=j,w.Buttons=S;var P=w}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-getting-started-mdx-e8d77374d87a51ed18eb.js.map