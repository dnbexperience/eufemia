"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[3360,3431,35073],{41694:function(n,e,t){t.r(e);var o=t(52322),a=t(45392),r=t(46793),i=t(9945);function s(n){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.default,{}),"\n",(0,o.jsx)(i.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(s,n)})):s()}},9945:function(n,e,t){t.r(e),t.d(e,{default:function(){return l}});var o={};t.r(o),t.d(o,{Default:function(){return s},Update:function(){return c},WithoutFormHandler:function(){return d}});var a=t(52322),r=t(45392),i=(t(2784),t(50716));function s(){return(0,a.jsx)(i.Z,{noInline:!0,children:"const existingData = {\n  foo: 'bar',\n}\nconst Component = () => {\n  const { data } = Form.useData('default-id', existingData)\n  return (\n    <Form.Handler id=\"default-id\">\n      <Field.String path=\"/foo\" label={data.foo} />\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function c(){return(0,a.jsx)(i.Z,{noInline:!0,children:"const existingData = {\n  count: 1,\n}\nconst Component = () => {\n  const { data, update } = Form.useData('update-id', existingData)\n  const increment = React.useCallback(() => {\n    update('/count', (count) => {\n      return count + 1\n    })\n  }, [update])\n  return (\n    <Form.Handler id=\"update-id\">\n      <Flex.Horizontal>\n        <Field.Number path=\"/count\" showStepControls />\n        <Form.SubmitButton\n          onClick={increment}\n          text={'Increment ' + data.count}\n        />\n      </Flex.Horizontal>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function d(){return(0,a.jsx)(i.Z,{noInline:!0,children:"const existingData = {\n  count: 1,\n}\nconst Component = () => {\n  const { data, update } = Form.useData('idependent-id', existingData)\n  const increment = React.useCallback(() => {\n    update('/count', (count) => {\n      return count + 1\n    })\n  }, [update])\n  return (\n    <Button\n      on_click={increment}\n      text={'Increment ' + data.count}\n      variant=\"secondary\"\n    />\n  )\n}\nrender(\n  <Flex.Vertical>\n    <Component />\n    <Component />\n  </Flex.Vertical>,\n)\n"})}function u(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,r.ah)(),n.components);return o||h("Examples",!1),s||h("Examples.Default",!0),c||h("Examples.Update",!0),d||h("Examples.WithoutFormHandler",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"Set data outside of the form"}),"\n",(0,a.jsx)(s,{}),"\n",(0,a.jsx)(e.h3,{children:"Update the data outside of the form"}),"\n",(0,a.jsxs)(e.p,{children:["The update function ",(0,a.jsx)(e.code,{children:"update('/count', (count) => count + 1)"})," has TypeScript support and returns the correct type for ",(0,a.jsx)(e.code,{children:"count"})," (number)."]}),"\n",(0,a.jsx)(c,{}),"\n",(0,a.jsx)(e.h3,{children:"Shared state without a Form.Handler"}),"\n",(0,a.jsx)(d,{})]})}var l=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(u,n)})):u(n)};function h(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},46793:function(n,e,t){t.r(e);var o=t(52322),a=t(45392);function r(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",a:"a"},(0,a.ah)(),n.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Description"}),"\n",(0,o.jsxs)(e.p,{children:["With the ",(0,o.jsx)(e.code,{children:"Form.useData"})," hook, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction Component() {\n  const { data } = Form.useData('unique')\n\n  return <Form.Handler id=\"unique\">...</Form.Handler>\n}\n"})}),"\n",(0,o.jsxs)(e.p,{children:["You link them together via the ",(0,o.jsx)(e.code,{children:"id"})," (string) property."]}),"\n",(0,o.jsx)(e.h2,{children:"Initial data"}),"\n",(0,o.jsxs)(e.p,{children:["You decide where you want to provide the initial ",(0,o.jsx)(e.code,{children:"data"}),". It can be done via the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," component, or via the ",(0,o.jsx)(e.code,{children:"Form.useData"})," Hook – or even in each Field, with the value property:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n\nconst existingData = {\n  foo: 'bar',\n}\n\nfunction Component() {\n  const { data } = Form.useData('unique', existingData)\n\n  return (\n    <Form.Handler id=\"unique\">\n      <Field.String path=\"/foo\" />\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,o.jsx)(e.p,{children:"When you're providing the initial data, it's important to make sure that React can remember this data. If it doesn't, React will treat the data as a new object every time it re-renders, which can lead to unnecessary comparisons and performance issues."}),"\n",(0,o.jsx)(e.p,{children:"You can use the useMemo hook to make sure React remembers the data:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\nfunction Component() {\n  const existingData = React.useMemo(\n    {\n      foo: 'bar',\n    },\n    [],\n  )\n\n  const { data } = Form.useData('unique-id', existingData)\n}\n"})}),"\n",(0,o.jsx)(e.h2,{children:"Update data"}),"\n",(0,o.jsxs)(e.p,{children:["If you need to update the data, you can use the ",(0,o.jsx)(e.code,{children:"update"})," method."]}),"\n",(0,o.jsxs)(e.p,{children:["It takes a path (",(0,o.jsx)(e.a,{href:"/uilib/extensions/forms/#what-is-a-json-pointer",children:"JSON Pointer"}),") and a callback function. The callback function receives the existing value as the first argument, and the second argument is the path itself. The callback function must return the new value."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nconst existingData = {\n  foo: 'bar',\n}\n\nfunction Component() {\n  const { update } = Form.useData('unique' data={existingData})\n\n  useEffect(() => {\n    update('/foo', () => 'new value')\n    // or\n    update('/foo', (existingValue) => existingValue + 'new value')\n  }, [])\n}\n"})}),"\n",(0,o.jsxs)(e.p,{children:["The ",(0,o.jsx)(e.code,{children:"update"})," function has TypeScript support and returns the correct type for ",(0,o.jsx)(e.code,{children:"existingValue"}),"."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(r,n)})):r(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-form-use-data-mdx-5edfa2e6b489f89c6901.js.map