"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[958],{9623:function(e,n,r){r.r(n);var s=r(52322),a=r(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",h3:"h3",ul:"ul",li:"li",ol:"ol"},(0,a.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Description"}),"\n",(0,s.jsx)(n.p,{children:"Error messages in Eufemia Forms are used to provide feedback to users when there are issues with their input."}),"\n",(0,s.jsx)(n.h2,{children:"Error object"}),"\n",(0,s.jsxs)(n.p,{children:["Use ",(0,s.jsx)(n.code,{children:"new Error"})," with a message to display a custom error message."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"render(<Field.PhoneNumber error={new Error('Show this message')} />)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Or in case of a validator:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const validator = (value) => {\n  // Your validation logic\n  return new Error('Show this message')\n}\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,s.jsx)(n.h2,{children:"Reuse existing error messages in a validator function"}),"\n",(0,s.jsx)(n.p,{children:"You can reuse existing error messages in a validator function. The types of error messages available depend on the field type."}),"\n",(0,s.jsxs)(n.p,{children:["For example, you can reuse the ",(0,s.jsx)(n.code,{children:"required"})," error message in a validator function:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const validator = (value, { errorMessages }) => {\n  // Your validation logic\n  return new Error(errorMessages.required)\n}\nrender(<Field.String validator={validator} />)\n"})}),"\n",(0,s.jsx)(n.h3,{children:"FormError object"}),"\n",(0,s.jsxs)(n.p,{children:["You can use the JavaScript ",(0,s.jsx)(n.code,{children:"Error"})," object to display a custom error message:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.PhoneNumber error={new Error('Custom message')} />)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["When it comes to re-using existing translations, you can also use the ",(0,s.jsx)(n.code,{children:"FormError"})," object to display error messages."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"validationRule"})," is used to identify the error message to display."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"required"})," - Displayed when the field is required and the user has not provided a value."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"pattern"})," - Displayed when the user has provided a value that does not match the pattern."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { FormError, Field } from '@dnb/eufemia/extensions/forms'\nrender(\n  <Field.PhoneNumber\n    error={\n      new FormError('Invalid value', {\n        validationRule: 'pattern',\n      })\n    }\n  />,\n)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Here is how you can provide validation rules, or even overwrite existing ones:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"render(\n  <Form.Handler\n    errorMessages={{\n      pattern: 'Display me, instead of the default message',\n    }}\n  >\n    ...\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsx)(n.p,{children:"For one field only:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"render(\n  <Field.PhoneNumber\n    errorMessages={{\n      pattern: 'Display me, instead of the default message',\n    }}\n  />,\n)\n"})}),"\n",(0,s.jsx)(n.h2,{children:"Localization of error messages"}),"\n",(0,s.jsx)(n.p,{children:"You can also provide localized error messages:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"render(\n  <Form.Handler\n    errorMessages={{\n      'en-GB': {\n        pattern: 'Display me, instead of the default message',\n      },\n      'nb-NO': {\n        pattern: 'Vis meg i stedet for standardmeldingen',\n      },\n    }}\n  >\n    ...\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsx)(n.p,{children:"In addition, you can customize the translations globally:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\nrender(\n  <Form.Handler\n    translations={{\n      'nb-NO': {\n        Field: { errorPattern: 'Custom pattern error' },\n      },\n    }}\n  >\n    <Field.String pattern=\"^([a-z]+)$\" value=\"123\" validateInitially />\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Or define an error message in a ",(0,s.jsx)(n.code,{children:"schema"})," for one field:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Provider } from '@dnb/eufemia/shared'\n\nconst schema = {\n  type: 'string',\n  pattern: '^([a-z]+)$',\n  errorMessage: 'You can provide a custom message in the schema itself',\n} as const\n\nrender(\n  <Form.Handler>\n    <Field.String schema={schema} value=\"123\" validateInitially />\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Or in a field ",(0,s.jsx)(n.code,{children:"schema"})," for one field with a JSON Pointer path:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const schema = {\n  type: 'object',\n  properties: {\n    myKey: {\n      type: 'string',\n      pattern: '^([a-z]+)$',\n      errorMessage:\n        'You can provide a custom message in the schema itself',\n    },\n  },\n} as const\n\nrender(\n  <Form.Handler schema={schema}>\n    <Field.String path=\"/myKey\" value=\"123\" validateInitially />\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Or in a Form.Handler ",(0,s.jsx)(n.code,{children:"schema"})," for one field with a JSON Pointer path:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const schema = {\n  type: 'object',\n  properties: {\n    myKey: {\n      type: 'string',\n      pattern: '^([a-z]+)$',\n      errorMessage:\n        'You can provide a custom message in the schema itself',\n    },\n  },\n} as const\n\nrender(\n  <Form.Handler schema={schema}>\n    <Field.String path=\"/myKey\" value=\"123\" validateInitially />\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Or in a Form.Handler ",(0,s.jsx)(n.code,{children:"schema"})," with several validation rules:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const schema = {\n  type: 'object',\n  properties: {\n    myKey: {\n      type: 'string',\n      minLength: 2,\n      maxLength: 3,\n      errorMessage: {\n        minLength: 'minLength message in provider schema',\n        maxLength: 'maxLength message in provider schema',\n      },\n    },\n  },\n} as const\n\nrender(\n  <Form.Handler schema={schema}>\n    <Field.String path=\"/myKey\" value=\"123\" validateInitially />\n  </Form.Handler>,\n)\n"})}),"\n",(0,s.jsxs)(n.h2,{children:["Levels of ",(0,s.jsx)(n.code,{children:"errorMessages"})]}),"\n",(0,s.jsxs)(n.p,{children:["You can provide custom error message different levels with the ",(0,s.jsx)(n.code,{children:"errorMessages"})," prop:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"On the Form.Handler (Provider) level."}),"\n",(0,s.jsx)(n.li,{children:"On the Form.Handler (Provider) level with a JSON Pointer path."}),"\n",(0,s.jsx)(n.li,{children:"On the field level."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The levels are prioritized in the order above, so the field level error message will overwrite all other levels."}),"\n",(0,s.jsxs)(n.p,{children:["Here is an example of how to do expose a custom error message for the ",(0,s.jsx)(n.code,{children:"pattern"})," validation rule on all levels:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Form.Handler\n    errorMessages={{\n      // Level 1\n      pattern: 'Or on the provider',\n      '/myKey': {\n        // Level 2\n        pattern: 'Or on the provider for just one field',\n      },\n    }}\n  >\n    <Field.String\n      path=\"/myKey\"\n      errorMessages={{\n        // Level 3\n        pattern: 'Or on a single Field itself',\n      }}\n      ...\n    />\n  </Form.Handler>,\n)\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(i,e)})):i(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-error-messages-info-mdx-acc171f6d51da8341712.js.map