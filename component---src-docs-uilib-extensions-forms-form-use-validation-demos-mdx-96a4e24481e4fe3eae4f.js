"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[1162],{89871:function(n,r,e){e.r(r),e.d(r,{default:function(){return u}});var t={};e.r(t),e.d(t,{HasErrors:function(){return a},SetFieldStatus:function(){return l}});var o=e(52322),i=e(45392),s=e(46832);function a(){return(0,o.jsx)(s.Z,{noInline:!0,children:'const Component = () => {\n  const { data } = Form.useData(\'default-id\', {\n    showError: true,\n    isVisible: true,\n  })\n  const { hasErrors, hasFieldError } = Form.useValidation(\'default-id\')\n  return (\n    <Form.Handler id="default-id">\n      <Flex.Stack>\n        <Tools.Log\n          data={hasErrors()}\n          label="hasErrors:"\n          breakout={false}\n        />\n        <Tools.Log\n          data={hasFieldError(\'/foo\')}\n          label="hasFieldError:"\n          breakout={false}\n        />\n\n        <Field.Boolean label="Error" variant="button" path="/showError" />\n\n        <Field.Boolean\n          label="Visible"\n          variant="button"\n          path="/isVisible"\n        />\n\n        <Form.Visibility pathTrue="/isVisible">\n          <Field.String\n            path="/foo"\n            label="Label"\n            value={data.showError ? \'error\' : \'valid\'}\n            pattern="^valid$"\n            validateInitially\n          />\n        </Form.Visibility>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n'})}function l(){return(0,o.jsx)(s.Z,{noInline:!0,children:"const MyForm = () => {\n  const { setFieldStatus } = Form.useValidation('form-status')\n  return (\n    <Form.Handler\n      id=\"form-status\"\n      onSubmit={async () => {\n        await new Promise((resolve) => setTimeout(resolve, 1000))\n        setFieldStatus('/myField', {\n          error: new Error('This is a field error'),\n          warning: 'This is a field warning',\n          info: 'This is a field info',\n        })\n        await new Promise((resolve) => setTimeout(resolve, 5000))\n        setFieldStatus('/myField', {\n          error: null,\n          warning: null,\n          info: null,\n        })\n      }}\n    >\n      <Flex.Stack>\n        <Field.String label=\"My field\" path=\"/myField\" />\n\n        <Form.SubmitButton />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"})}function d(n){const r=Object.assign({h2:"h2",h3:"h3"},(0,i.ah)(),n.components);return t||c("Examples",!1),a||c("Examples.HasErrors",!0),l||c("Examples.SetFieldStatus",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h2,{children:"Demos"}),"\n",(0,o.jsx)(r.h3,{children:"Set field status"}),"\n",(0,o.jsx)(l,{}),"\n",(0,o.jsx)(r.h3,{children:"Check for errors with hasErrors"}),"\n",(0,o.jsx)(a,{})]})}var u=function(n){void 0===n&&(n={});const{wrapper:r}=Object.assign({},(0,i.ah)(),n.components);return r?(0,o.jsx)(r,Object.assign({},n,{children:(0,o.jsx)(d,n)})):d(n)};function c(n,r){throw new Error("Expected "+(r?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-use-validation-demos-mdx-96a4e24481e4fe3eae4f.js.map