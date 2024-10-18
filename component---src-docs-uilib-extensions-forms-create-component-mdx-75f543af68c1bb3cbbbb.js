"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[48338,4117],{85753:function(n,e,a){a.r(e);var t=a(52322),r=a(45392),o=(a(69403),a(94929));function i(n){const e=Object.assign({h1:"h1",p:"p",a:"a",strong:"strong",ul:"ul",li:"li",h2:"h2",code:"code",pre:"pre",h3:"h3"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{children:"Create your own component"}),"\n",(0,t.jsx)(e.p,{children:"Eufemia Forms contains helper fields and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components."}),"\n",(0,t.jsxs)(e.p,{children:["By using the building blocks for value and field components, you save development time, and at the same time ensure that local, custom components work similarly, and fit into the setup with the standardized base ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/Value/#base-components",children:"value components"})," and base ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/base-fields/",children:"field components"}),"."]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Table of Contents"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#value-components",children:"Value components"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#field-components",children:"Field components"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#layout",children:"Layout"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"#localization-and-translations",children:"Localization and translations"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{children:"Value components"}),"\n",(0,t.jsxs)(e.p,{children:["For creating a ",(0,t.jsx)(e.code,{children:"Value.*"})," component you can use ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/ValueBlock/",children:"ValueBlock"})," and ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useValueProps/",children:"useValueProps"}),":"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"import { ValueBlock, useValueProps } from '@dnb/eufemia/extensions/forms'\n\nconst MyValue = (props) => {\n  const { value, ...rest } = useValueProps(props)\n  return <ValueBlock {...rest}>{value}</ValueBlock>\n}\n\nrender(<MyValue path=\"/dataSelector\" />)\n"})}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/ValueBlock/",children:"ValueBlock"})," provides a standardized way to display labels and other surrounding elements in a consistent manner."]}),"\n",(0,t.jsx)(o.CreateBasicValueComponent,{}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"useValueProps"})," provides a standardized way to handle data flow in a consistent manner."]}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"FieldBlock"})," provides a standardized way to display a label and other surrounding elements in a consistent manner."]}),"\n",(0,t.jsx)(e.h2,{children:"Field components"}),"\n",(0,t.jsxs)(e.p,{children:["For creating a ",(0,t.jsx)(e.code,{children:"Field.*"})," component, you can use ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"})," and ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/",children:"useFieldProps"}),":"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"import { FieldBlock, useFieldProps } from '@dnb/eufemia/extensions/forms'\n\nconst MyField = (props) => {\n  const {\n    id,\n    value,\n    label,\n    handleChange,\n    handleFocus,\n    handleBlur,\n    htmlAttributes,\n  } = useFieldProps(props)\n\n  return (\n    <FieldBlock forId={id} label={label}>\n      <input\n        id={id}\n        value={value}\n        onChange={handleChange}\n        onFocus={handleFocus}\n        onBlur={handleBlur}\n        {...htmlAttributes}\n      />\n    </FieldBlock>\n  )\n}\n\nrender(<MyField path=\"/dataSelector\" />)\n"})}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"useFieldProps"})," provides a standardized way to handle data flow, validation and error messages in a consistent manner."]}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"FieldBlock"})," provides a standardized way to display labels, error messages and other surrounding elements in a consistent manner."]}),"\n",(0,t.jsx)(e.p,{children:"Here is a working example with code you can edit in the playground:"}),"\n",(0,t.jsx)(o.CreateBasicFieldComponent,{}),"\n",(0,t.jsx)(e.h3,{children:"Further customization"}),"\n",(0,t.jsx)(e.p,{children:"You can customize the behavior of the field component. For example, you can add a custom error message:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"useFieldProps({\n  errorMessages: {\n    required: 'Show this when \"required\" fails.',\n  },\n})\n"})}),"\n",(0,t.jsxs)(e.p,{children:["or a custom ",(0,t.jsx)(e.code,{children:"required"})," property validation function:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const validateRequired = (value, { emptyValue, required, isChanged }) => {\n  if (required && value === emptyValue) {\n    return new Error('This value is required')\n  }\n}\n\nuseFieldProps({ validateRequired })\n"})}),"\n",(0,t.jsxs)(e.p,{children:["For more information about all the available parameters, see the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/",children:"useFieldProps"})," or the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"})," documentation."]}),"\n",(0,t.jsx)(e.h3,{children:"More details"}),"\n",(0,t.jsxs)(e.p,{children:["This example shows a custom component. The ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/",children:"useFieldProps"})," hook receives the properties and adds extra properties to standardize field behavior. These includes ",(0,t.jsx)(e.code,{children:"handleFocus"}),", ",(0,t.jsx)(e.code,{children:"handleChange"}),", and ",(0,t.jsx)(e.code,{children:"handleBlur"}),' functions. Even if the field components has external callbacks like "onChange", these won\'t be altered. The "handle" variants simplifies your code.']}),"\n",(0,t.jsx)(e.h3,{children:"The example explained"}),"\n",(0,t.jsxs)(e.p,{children:["Using these two form helpers in your field component triggers several automatic processes. These include timely validation checks, syncing value changes with the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/DataContext/",children:"DataContext"}),", coordinating error messages across multiple fields, and preventing premature error displays while the user is editing the field."]}),"\n",(0,t.jsxs)(e.p,{children:["Keep in mind, you can customize the behavior of ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/",children:"useFieldProps"})," and other helper functions to make the component work exactly as you want."]}),"\n",(0,t.jsx)(e.h3,{children:"Your own validation"}),"\n",(0,t.jsxs)(e.p,{children:["If you need custom validation that can't use the built-in JSON Schema or a derivative validator (like in the example above), you can create your own logic. Then, pass the result as an ",(0,t.jsx)(e.code,{children:"error"})," property to ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"}),". All direct properties override standard handling, giving you full control over your component."]}),"\n",(0,t.jsx)(e.h3,{children:"Customized even further"}),"\n",(0,t.jsxs)(e.p,{children:["If you need something that looks even more different than the usual fields, you can drop ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"})," and display surrounding elements in other ways – but still get all the help of a data flow logic, such as ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/",children:"useFieldProps"})," offers."]}),"\n",(0,t.jsx)(e.p,{children:"Here follows an example that retrieves data from a surrounding DataContext, and creates a composite field based on other components from Eufemia:"}),"\n",(0,t.jsx)(o.CreateComposedFieldComponent,{}),"\n",(0,t.jsx)(e.h2,{children:"Layout"}),"\n",(0,t.jsxs)(e.p,{children:["When building your custom form components, preferably use the ",(0,t.jsx)(e.a,{href:"/uilib/layout",children:"Layout"})," component."]}),"\n",(0,t.jsx)(e.h3,{children:"Width definitions"}),"\n",(0,t.jsxs)(e.p,{children:["These are the official sizes you can use when ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/",children:"creating your own form fields"}),"."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-css",children:":root {\n  --forms-field-width--small: 5rem;\n  --forms-field-width--medium: 11rem;\n  --forms-field-width--large: 21rem;\n}\n"})}),"\n",(0,t.jsxs)(e.p,{children:["You can also use a ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"})," and provide a ",(0,t.jsx)(e.code,{children:"width"})," property with a value of either ",(0,t.jsx)(e.code,{children:"small"}),", ",(0,t.jsx)(e.code,{children:"medium"})," or ",(0,t.jsx)(e.code,{children:"large"})," and use it as a sized wrapper."]}),"\n",(0,t.jsx)(e.h2,{children:"Localization and translations"}),"\n",(0,t.jsxs)(e.p,{children:["You can use the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useTranslation/",children:"Form.useTranslation"})," hook to use existing translations or extend it with your custom field localization:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"import {\n  Form,\n  FieldBlock,\n  useFieldProps,\n} from '@dnb/eufemia/extensions/forms'\n\nconst myFieldTranslations = {\n  'en-GB': {\n    MyField: { label: 'My field', required: 'Custom required message' },\n  },\n  'nb-NO': {\n    MyField: { label: 'Mitt felt', required: 'Obligatorisk felt melding' },\n  },\n}\ntype Translation =\n  (typeof myFieldTranslations)[keyof typeof myFieldTranslations]\n\nconst MyField = (props) => {\n  const translations = Form.useTranslation<Translation>(\n    myFieldTranslations,\n  )\n  const { label, required } = translations.MyField\n\n  const preparedProps = {\n    label,\n    errorMessages: {\n      required,\n    },\n    ...props,\n  }\n\n  const { id, value, label, handleChange, handleFocus, handleBlur } =\n    useFieldProps(preparedProps)\n\n  return (\n    <FieldBlock forId={id}>\n      <input\n        id={id}\n        value={value}\n        label={label}\n        onChange={handleChange}\n        onFocus={handleFocus}\n        onBlur={handleBlur}\n      />\n    </FieldBlock>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(i,n)})):i(n)}},94929:function(n,e,a){a.r(e),a.d(e,{BaseFieldComponents:function(){return h},CreateBasicFieldComponent:function(){return u},CreateBasicValueComponent:function(){return d},CreateComposedFieldComponent:function(){return m},FeatureFields:function(){return p},GettingStarted:function(){return c},LayoutComponents:function(){return F},QuickStart:function(){return j},Transformers:function(){return C},UsingFormHandler:function(){return g},UsingFormSection:function(){return v},UsingIterate:function(){return y},UsingWizard:function(){return b},Validation:function(){return x},VisibilityBasedOnData:function(){return f}});a(2784);var t=a(64368),r=a(49406),o=a(26409),i=a(16620),l=a(55649),s=a(52322);const d=()=>(0,s.jsx)(t.Z,{scope:{ValueBlock:r.Z},hideCode:!0,noInline:!0,children:'const MyValue = ({ value, ...props }) => {\n  return (\n    <ValueBlock {...props}>\n      <NumberFormat currency>{value}</NumberFormat>\n    </ValueBlock>\n  )\n}\nrender(<MyValue label="Label" value={1234} />)\n'}),u=()=>(0,s.jsx)(t.Z,{scope:{useFieldProps:o.Z},hideCode:!0,noInline:!0,children:"const MyField = (props) => {\n  const fromInput = React.useCallback(({ value }) => value, [])\n  const preparedProps = {\n    label: 'What is the secret of this field?',\n    fromInput,\n    validator: (value) => {\n      if (value === 'secret') {\n        return new Error('Do not reveal the secret!')\n      }\n    },\n    ...props,\n  }\n  const { id, value, label, handleChange, handleFocus, handleBlur } =\n    useFieldProps(preparedProps)\n  return (\n    <FieldBlock forId={id} label={label}>\n      <Input\n        id={id}\n        value={value}\n        on_change={handleChange}\n        on_focus={handleFocus}\n        on_blur={handleBlur}\n      />\n    </FieldBlock>\n  )\n}\nrender(\n  <MyField\n    onChange={(value) => console.log('onChange', value)}\n    required\n  />,\n)\n"}),c=()=>(0,s.jsx)(t.Z,{hideCode:!0,noInline:!0,children:'const existingData = {\n  companyName: \'DNB\',\n  companyOrganizationNumber: \'123456789\',\n  postalAddressSelect: \'companyAddress\',\n}\nfunction Component() {\n  const { data } = Form.useData(\'company-form\')\n  console.log(\'State:\', data)\n  return (\n    <Form.Handler\n      id="company-form"\n      defaultData={existingData}\n      onChange={console.log}\n      onSubmit={console.log}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Bedrift</Form.MainHeading>\n        <Card stack>\n          <Field.Name.Company path="/companyName" required />\n          <Field.OrganizationNumber\n            path="/companyOrganizationNumber"\n            required\n          />\n          <Field.Selection\n            path="/postalAddressSelect"\n            label="Ønsket sted for tilsendt post"\n            variant="radio"\n          >\n            <Field.Option\n              value="companyAddress"\n              title="Samme som forretningsadresse"\n            />\n            <Field.Option value="other" title="Annet" />\n          </Field.Selection>\n        </Card>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n'}),m=()=>(0,s.jsx)(t.Z,{scope:{DataContext:i,useFieldProps:o.Z},hideCode:!0,noInline:!0,children:'const MyComposedField = (props) => {\n  const birthYear = useFieldProps({\n    path: \'/birthYear\',\n  })\n  const handleBirthYearChange = React.useCallback(\n    (sliderData) => {\n      birthYear.handleChange(sliderData.value)\n    },\n    [birthYear],\n  )\n  return (\n    <FieldBlock label={props.label ?? \'Name and age\'}>\n      <Flex.Horizontal>\n        <Field.Name.First path="/firstName" width="medium" minLength={2} />\n        <Field.Name.Last path="/lastName" width="medium" required />\n        <FieldBlock width="large">\n          <Slider\n            min={1900}\n            max={new Date().getFullYear()}\n            step={1}\n            label="Birth year"\n            label_direction="vertical"\n            value={parseFloat(String(birthYear.value))}\n            on_change={handleBirthYearChange}\n            on_drag_start={birthYear.handleFocus}\n            on_drag_end={birthYear.handleBlur}\n            status={birthYear.error?.message}\n            tooltip\n          />\n        </FieldBlock>\n      </Flex.Horizontal>\n    </FieldBlock>\n  )\n}\nconst data = {\n  firstName: \'John\',\n  birthYear: 2000,\n}\nrender(\n  <DataContext.Provider\n    defaultData={data}\n    onChange={(data) => console.log(\'onChange\', data)}\n  >\n    <MyComposedField label="My custom label" />\n  </DataContext.Provider>,\n)\n'}),h=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:'<Card stack>\n  <Field.String\n    label="Text field"\n    value="Lorem Ipsum"\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Number\n    label="Number Field"\n    value={789}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Boolean\n    label="Boolean Field"\n    value={true}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n</Card>\n'}),p=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:'<Card stack>\n  <Field.String label="Fornavn" value="John" />\n  <Field.String label="Etternavn" value="Smith" />\n  <Field.NationalIdentityNumber value="20058512345" />\n  <Field.Email value="john@smith.email" />\n  <Field.PhoneNumber value="+47 98765432" />\n</Card>\n'}),F=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),f=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:'<Form.Handler\n  defaultData={{\n    firstName: undefined,\n    lastName: \'Smith\',\n    advanced: false,\n    ssn: \'123\',\n    email: \'@smith.email\',\n    phone: \'+47 98765432\',\n  }}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Profile</Form.MainHeading>\n\n    <Card stack>\n      <Form.SubHeading>Name</Form.SubHeading>\n\n      <Field.String path="/firstName" label="Fornavn" />\n      <Field.String path="/lastName" label="Etternavn" />\n    </Card>\n\n    <Field.Boolean\n      path="/advanced"\n      variant="checkbox-button"\n      label="More fields"\n    />\n    <Form.Visibility pathTrue="/advanced">\n      <Flex.Stack>\n        <Card stack>\n          <Form.SubHeading>More information</Form.SubHeading>\n\n          <Field.NationalIdentityNumber value="20058512345" />\n          <Field.Email value="john@smith.email" />\n          <Field.PhoneNumber value="+47 98765432" />\n        </Card>\n      </Flex.Stack>\n    </Form.Visibility>\n  </Flex.Stack>\n</Form.Handler>\n'}),g=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:"<Form.Handler\n  defaultData={{\n    firstName: 'John',\n    lastName: 'Smith',\n    ssn: '20058512345',\n    email: 'john@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" />\n    <Field.NationalIdentityNumber path=\"/ssn\" />\n    <Field.Email path=\"/email\" />\n    <Field.PhoneNumber path=\"/phone\" />\n\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n"}),x=()=>(0,s.jsx)(t.Z,{scope:{Value:l},children:"<Form.Handler\n  defaultData={{\n    firstName: undefined,\n    lastName: 'Smith',\n    ssn: '123',\n    email: '@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" required />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" required />\n    <Field.NationalIdentityNumber path=\"/ssn\" validateInitially />\n    <Field.Email path=\"/email\" validateInitially />\n    <Field.PhoneNumber path=\"/phone\" validateInitially />\n  </Card>\n</Form.Handler>\n"}),b=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const MyForm = () => {\n  // Routers like "react-router" are supported as well\n  Wizard.useQueryLocator(\'my-wizard\')\n  const { summaryTitle } = Form.useLocale().Step\n  return (\n    <Form.Handler\n      defaultData={{\n        firstName: undefined,\n        lastName: \'Smith\',\n        advanced: false,\n        ssn: \'123\',\n        email: \'@smith.email\',\n        phone: \'+47 98765432\',\n      }}\n      onChange={(data) => console.log(\'onChange\', data)}\n      onPathChange={(path, value) =>\n        console.log(\'onPathChange\', path, value)\n      }\n      onSubmit={(data) => console.log(\'onSubmit\', data)}\n    >\n      <Wizard.Container id="my-wizard" mode="loose">\n        <Wizard.Step title="Name">\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Form.SubHeading>Name</Form.SubHeading>\n\n            <Field.String path="/firstName" label="Fornavn" required />\n            <Field.String path="/lastName" label="Etternavn" required />\n          </Card>\n\n          <Wizard.Buttons />\n        </Wizard.Step>\n\n        <Wizard.Step title="More information">\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Form.SubHeading>More information</Form.SubHeading>\n\n            <Field.NationalIdentityNumber path="/ssn" />\n            <Field.Email path="/email" />\n            <Field.PhoneNumber path="/phone" />\n          </Card>\n\n          <Wizard.Buttons />\n        </Wizard.Step>\n\n        <Wizard.Step title={summaryTitle}>\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Value.SummaryList layout="grid">\n              <Value.String path="/firstName" label="Fornavn" />\n              <Value.String path="/lastName" label="Etternavn" />\n\n              <Value.NationalIdentityNumber path="/ssn" />\n              <Value.Email path="/email" />\n              <Value.PhoneNumber path="/phone" />\n            </Value.SummaryList>\n          </Card>\n\n          <Form.ButtonRow>\n            <Wizard.Buttons />\n            <Form.SubmitButton />\n          </Form.ButtonRow>\n        </Wizard.Step>\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),v=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer variant="basic">\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer variant="basic">\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: undefined, // initiate error\n      },\n    }}\n  >\n    <Card stack>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),y=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Field.Composition>\n      <Field.Name.First itemPath="/firstName" width="medium" />\n      <Field.Name.Last itemPath="/lastName" width="medium" required />\n    </Field.Composition>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNo}"\n      titleWhenNew="New account holder {itemNo}"\n    >\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  const item = Iterate.useItem()\n  console.log(\'index:\', item.index)\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNo}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" showEmpty />\n        <Value.Name.Last itemPath="/lastName" placeholder="-" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      data={{\n        accounts: [\n          {\n            firstName: \'Tony\',\n            lastName: undefined, // initiate error\n          },\n        ],\n      }}\n      onChange={(data) => console.log(\'DataContext/onChange\', data)}\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    >\n      <Flex.Vertical>\n        <Form.MainHeading>Accounts</Form.MainHeading>\n\n        <Card stack>\n          <Iterate.Array path="/accounts">\n            <MyViewItem />\n            <MyEditItem />\n          </Iterate.Array>\n\n          <CreateNewEntry />\n        </Card>\n\n        <Form.SubmitButton variant="send" />\n      </Flex.Vertical>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),C=()=>(0,s.jsx)(t.Z,{hideCode:!0,noInline:!0,children:'const MyForm = () => {\n  const transformToUpper = (value) => {\n    return value?.toUpperCase()\n  }\n  const transformToLower = (value) => {\n    return value?.toLowerCase()\n  }\n  return (\n    <Form.Handler onChange={console.log}>\n      <Card stack>\n        <Field.String\n          width="medium"\n          label="Input value"\n          placeholder="Type letters"\n          path="/myField"\n          transformIn={transformToUpper}\n          transformOut={transformToLower}\n        />\n\n        <Value.String label="Output value" path="/myField" />\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),j=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const MyForm = () => {\n  const existingData = {\n    companyName: \'DNB\',\n  }\n  return (\n    <Form.Handler\n      defaultData={existingData}\n      onChange={console.log}\n      onSubmit={console.log}\n    >\n      <Card stack>\n        <Field.Name.Company path="/companyName" required />\n        <Field.OrganizationNumber\n          path="/companyOrganizationNumber"\n          required\n        />\n        <Field.Selection\n          path="/postalAddressSelect"\n          label="Ønsket sted for tilsendt post"\n          variant="radio"\n        >\n          <Field.Option\n            value="companyAddress"\n            title="Samme som forretningsadresse"\n          />\n          <Field.Option value="other" title="Annet" />\n        </Field.Selection>\n        <Form.Visibility\n          visibleWhen={{\n            path: \'/postalAddressSelect\',\n            hasValue: \'other\',\n          }}\n          animate\n        >\n          <Field.String\n            path="/postalAddress"\n            label="Sted for tilsendt post"\n            required\n          />\n        </Form.Visibility>\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})},69403:function(n,e,a){a.r(e),a.d(e,{default:function(){return i}});var t=a(68270),r=a(77491),o=a(52322);function i(n){const{allMdx:{edges:e}}=(0,t.useStaticQuery)("1487441482");return(0,o.jsx)(r.Z,{edges:e,...n})}},77491:function(n,e,a){a.d(e,{Z:function(){return m}});var t=a(2784),r=a(42351),o=a(65359),i=a(43095),l=a(79254),s=a(68514),d=a(61185),u=a(595),c=a(52322);function m(n){let{edges:e,level:a,size:m,description:h=null,returnListItems:p=!1,...F}=n;const f=p?r.Z:t.Fragment,g=p?o.Z:t.Fragment;(0,s.TW)(a||2);const x=e.map(((n,e)=>{let{node:{frontmatter:{title:t,description:r},fields:{slug:o}}}=n;return(0,c.jsxs)(g,{children:[(0,c.jsx)(s,{}),(0,c.jsx)(f,{})]},e);function s(){const n=(0,c.jsx)(l.Z,{href:"/"+o,children:t});return p?n:(0,c.jsx)(i.Z,{level:a||2,size:m,useSlug:"/"+o,title:t,...F,children:n})}function f(){const n=null!==h?h:r;if(n)return p?(0,c.jsxs)(c.Fragment,{children:[":"," ",(0,c.jsx)(d.D,{components:u.L,disallowedElements:["p"],unwrapDisallowed:!0,children:n})]}):(0,c.jsx)(d.D,{components:u.L,children:n})}}));return(0,c.jsx)(f,{children:x})}},16620:function(n,e,a){a.r(e),a.d(e,{At:function(){return d},Context:function(){return t.Z},Provider:function(){return r.Z},defaultContextState:function(){return t.E}});var t=a(21068),r=a(6436),o=a(2784),i=a(2394),l=a(52322);function s(n){const{path:e="/",iterate:a,children:r}=n,s=(0,o.useContext)(t.Z),{data:d,handlePathChange:u}=s,c=d&&i.e$(d,e)?i.U2(d,e):void 0,m=(0,o.useCallback)(((n,a)=>{u(`${e}${n}`,a)}),[u,e]);return a?Array.isArray(c)?(0,l.jsx)(l.Fragment,{children:c.map(((n,a)=>{const o=u?(n,t)=>{u(`${e}/${a}${n}`,t)}:void 0;return(0,l.jsx)(t.Z.Provider,{value:{...s,data:n,handlePathChange:o},children:r},`element${a}`)}))}):null:(0,l.jsx)(t.Z.Provider,{value:{...s,data:c,handlePathChange:m},children:r})}s._supportsSpacingProps=!0;var d=s}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-mdx-75f543af68c1bb3cbbbb.js.map