"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[47555,60520,10193],{23137:function(e,n,t){t.r(n);var o=t(52322),i=t(45392),a=t(41420),r=t(35177);function s(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.default,{}),"\n",(0,o.jsx)(r.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(s,e)})):s()}},35177:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var o={};t.r(o),t.d(o,{Default:function(){return s},FilterData:function(){return c},Update:function(){return d},VisibleData:function(){return h},WithoutFormHandler:function(){return l}});var i=t(52322),a=t(45392),r=(t(2784),t(46832));function s(){return(0,i.jsx)(r.Z,{noInline:!0,children:"const existingData = {\n  foo: 'bar',\n}\nconst Component = () => {\n  const { data } = Form.useData('default-id', existingData)\n  return (\n    <Form.Handler id=\"default-id\">\n      <Field.String path=\"/foo\" label={data.foo} />\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function d(){return(0,i.jsx)(r.Z,{noInline:!0,children:"const existingData = {\n  count: 1,\n}\nconst Component = () => {\n  const { data, update } = Form.useData('update-id', existingData)\n  const increment = React.useCallback(() => {\n    update('/count', (count) => {\n      return count + 1\n    })\n  }, [update])\n  return (\n    <Form.Handler id=\"update-id\">\n      <Flex.Horizontal>\n        <Field.Number path=\"/count\" showStepControls />\n        <Form.SubmitButton\n          onClick={increment}\n          text={'Increment ' + data.count}\n        />\n      </Flex.Horizontal>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function l(){return(0,i.jsx)(r.Z,{noInline:!0,children:"const existingData = {\n  count: 1,\n}\nconst Component = () => {\n  const { data, update } = Form.useData('independent-id', existingData)\n  const increment = React.useCallback(() => {\n    update('/count', (count) => {\n      return count + 1\n    })\n  }, [update])\n  return (\n    <Button\n      on_click={increment}\n      text={'Increment ' + data.count}\n      variant=\"secondary\"\n    />\n  )\n}\nrender(\n  <Flex.Vertical>\n    <Component />\n    <Component />\n  </Flex.Vertical>,\n)\n"})}function c(){return(0,i.jsx)(r.Z,{noInline:!0,children:'const filterDataPaths = {\n  \'/isVisible\': false,\n  \'/mySelection\': ({ data }) => data.isVisible,\n  \'/myString\': ({ data }) => {\n    return data.isVisible && data.mySelection === \'more\'\n  },\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      defaultData={{\n        isVisible: false,\n        mySelection: \'less\',\n        myString: \'foo\',\n      }}\n    >\n      <Flex.Stack>\n        <Field.Boolean\n          label="Toggle visible"\n          variant="button"\n          path="/isVisible"\n          data-exclude-field\n        />\n        <Form.Visibility pathTrue="/isVisible" animate>\n          <Field.Selection\n            label="Choose"\n            variant="radio"\n            path="/mySelection"\n            value="less"\n          >\n            <Field.Option value="less" title="Less" />\n            <Field.Option value="more" title="More" />\n          </Field.Selection>\n\n          <Form.Visibility\n            visibleWhen={{\n              path: \'/mySelection\',\n              hasValue: \'more\',\n            }}\n            animate\n          >\n            <Field.String label="My String" path="/myString" value="foo" />\n          </Form.Visibility>\n        </Form.Visibility>\n\n        <Output />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nconst Output = () => {\n  const { data, filterData } = Form.useData()\n  return (\n    <>\n      <Tools.Log data={filterData(filterDataPaths)} label="Filtered:" />\n      <Tools.Log data={data} label="All data:" />\n    </>\n  )\n}\nrender(<MyForm />)\n'})}const h=()=>(0,i.jsx)(r.Z,{noInline:!0,children:'const MyForm = () => {\n  const { data, reduceToVisibleFields } = Form.useData()\n\n  // Use useEffect to ensure we get the latest data\n  React.useEffect(() => {\n    console.log(\n      \'Result of reduceToVisibleFields:\n\',\n      reduceToVisibleFields(data, {\n        removePaths: [\'/isVisible\'],\n      }),\n    )\n  }, [data, reduceToVisibleFields])\n  return (\n    <Form.Handler>\n      <Flex.Stack>\n        <Field.Boolean\n          label="Show radio buttons"\n          variant="button"\n          path="/isVisible"\n          defaultValue={true}\n        />\n\n        <Form.Visibility pathTrue="/isVisible" animate>\n          <Field.Selection\n            label="Radio buttons"\n            variant="radio"\n            path="/myValue"\n            defaultValue="foo"\n          >\n            <Field.Option value="foo" title="Foo" />\n            <Field.Option value="bar" title="Bar" />\n          </Field.Selection>\n        </Form.Visibility>\n\n        <Value.Selection path="/myValue" inheritLabel inheritVisibility />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'});function u(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,a.ah)(),e.components);return o||x("Examples",!1),s||x("Examples.Default",!0),c||x("Examples.FilterData",!0),d||x("Examples.Update",!0),h||x("Examples.VisibleData",!0),l||x("Examples.WithoutFormHandler",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:"Demos"}),"\n",(0,i.jsx)(n.h3,{children:"Set data outside of the form"}),"\n",(0,i.jsx)(s,{}),"\n",(0,i.jsx)(n.h3,{children:"Update the data outside of the form"}),"\n",(0,i.jsxs)(n.p,{children:["The update function ",(0,i.jsx)(n.code,{children:"update('/count', (count) => count + 1)"})," has TypeScript support and returns the correct type for ",(0,i.jsx)(n.code,{children:"count"})," (number)."]}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(n.h3,{children:"Shared state without a Form.Handler"}),"\n",(0,i.jsx)(l,{}),"\n",(0,i.jsx)(n.h3,{children:"Get only data of visible fields"}),"\n",(0,i.jsxs)(n.p,{children:["You can use the ",(0,i.jsx)(n.code,{children:"reduceToVisibleFields"})," function to get only the data of visible (mounted) fields."]}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(n.h3,{children:"Filter your data"}),"\n",(0,i.jsxs)(n.p,{children:["This example uses the ",(0,i.jsx)(n.code,{children:"keepInDOM"})," property to keep the field in the DOM."]}),"\n",(0,i.jsxs)(n.p,{children:["But with the ",(0,i.jsx)(n.code,{children:"filterData"})," method we can filter out all fields that have the ",(0,i.jsx)(n.code,{children:"data-exclude-field"})," attribute."]}),"\n",(0,i.jsxs)(n.p,{children:["In this demo, the ",(0,i.jsx)(n.code,{children:"data-exclude-field"})," attribute is added when the field are hidden."]}),"\n",(0,i.jsx)(c,{})]})}var m=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(u,e)})):u(e)};function x(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},41420:function(e,n,t){t.r(n);var o=t(52322),i=t(45392);function a(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",ul:"ul",li:"li",a:"a",h3:"h3",strong:"strong",ol:"ol"},(0,i.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Description"}),"\n",(0,o.jsxs)(n.p,{children:["With the ",(0,o.jsx)(n.code,{children:"Form.useData"})," hook, you can manage your form data from nested components and outside the form context (",(0,o.jsx)(n.code,{children:"Form.Handler"}),")."]}),"\n",(0,o.jsx)(n.p,{children:"The hook returns an object with the following properties:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction MyComponent() {\n  const {\n    getValue,\n    update,\n    remove,\n    set,\n    data,\n    filterData,\n    reduceToVisibleFields,\n  } = Form.useData()\n\n  return <>MyComponent</>\n}\n\nrender(\n  <Form.Handler>\n    <MyComponent />\n  </Form.Handler>,\n)\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"getValue"})," will return the value of the given path."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"update"})," will update the value of the given path."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"remove"})," will remove the given path from the data context (fields will reapply their values afterwards)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"set"})," will set the whole dataset."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"data"})," will return the whole dataset (unvalidated)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"filterData"})," will filter the data based on your own logic."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"reduceToVisibleFields"})," will reduce the given data set to only contain the visible fields (mounted fields)."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{children:"Usage"}),"\n",(0,o.jsxs)(n.p,{children:["You can use the ",(0,o.jsx)(n.code,{children:"Form.useData"})," hook with or without an ",(0,o.jsx)(n.code,{children:"id"})," (string, function, object or React Context as the reference) property, which is optional and can be used to link the data to a specific ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler/",children:"Form.Handler"})," component."]}),"\n",(0,o.jsx)(n.h3,{children:"TypeScript support"}),"\n",(0,o.jsx)(n.p,{children:"You can define the TypeScript type structure for your form data. This will help you to get better code completion and type checking."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"NB:"})," Use ",(0,o.jsx)(n.code,{children:"type"})," instead of ",(0,o.jsx)(n.code,{children:"interface"})," for the type definition."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"type MyData = { firstName: string }\n\nconst MyComponent = () => {\n  const { data } = Form.useData<MyData>()\n  return data.firstName\n}\n"})}),"\n",(0,o.jsxs)(n.h3,{children:["Without an ",(0,o.jsx)(n.code,{children:"id"})," property"]}),"\n",(0,o.jsxs)(n.p,{children:['Here "Component" is rendered inside the ',(0,o.jsx)(n.code,{children:"Form.Handler"})," component and does not need an ",(0,o.jsx)(n.code,{children:"id"})," property to access the form data:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction MyForm() {\n  return (\n    <Form.Handler>\n      <Component />\n    </Form.Handler>\n  )\n}\n\nfunction Component() {\n  const { data } = Form.useData()\n}\n"})}),"\n",(0,o.jsxs)(n.h3,{children:["With an ",(0,o.jsx)(n.code,{children:"id"})," property"]}),"\n",(0,o.jsxs)(n.p,{children:['While in this example, "Component" is outside the ',(0,o.jsx)(n.code,{children:"Form.Handler"})," context, but linked together via the ",(0,o.jsx)(n.code,{children:"id"})," (string, function, object or React Context as the reference) property:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\n\nfunction MyForm() {\n  return (\n    <>\n      <Form.Handler id={myFormId}>...</Form.Handler>\n      <Component />\n    </>\n  )\n}\n\nfunction Component() {\n  const { data } = Form.useData(myFormId)\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"This is beneficial when you need to utilize the form data in other places within your application."}),"\n",(0,o.jsx)(n.h3,{children:"Select a single value"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction MyComponent() {\n  const { getValue } = Form.useData()\n\n  const value = getValue('/foo')\n}\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Update data"}),"\n",(0,o.jsxs)(n.p,{children:["If you need to update the data, you can use the ",(0,o.jsx)(n.code,{children:"update"})," method."]}),"\n",(0,o.jsxs)(n.p,{children:["It takes a path (",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/getting-started/#what-is-a-json-pointer",children:"JSON Pointer"}),") and a callback function. The callback function receives the existing value as the first argument, and the second argument is the path itself. The callback function must return the new value."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction Component() {\n  const { update } = Form.useData()\n\n  useEffect(() => {\n    update('/foo', 'new value')\n\n    // - or with a callback function to get the existing value\n    update('/foo', (existingValue) => existingValue + 'new value')\n  }, [])\n}\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Extend the whole data set"}),"\n",(0,o.jsxs)(n.p,{children:["With the ",(0,o.jsx)(n.code,{children:"set"})," method, you can extend the data set. Existing data paths will be overwritten."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\n\nfunction MyForm() {\n  const { data, set } = Form.useData(myFormId)\n\n  useEffect(() => {\n    set({ foo: 'bar' })\n  }, [])\n\n  return (\n    <Form.Handler id={myFormId}>\n      <Field.String path=\"/foo\" />\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Visible data"}),"\n",(0,o.jsxs)(n.p,{children:["You can use the ",(0,o.jsx)(n.code,{children:"reduceToVisibleFields"})," function to get only the data of visible (mounted) fields. Check out the ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler/demos/#visible-data",children:"example"})," in the demo section."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction MyComponent() {\n  const { data, reduceToVisibleFields } = Form.useData()\n\n  // Use useEffect to ensure we get the latest data\n  React.useEffect(() => {\n    console.log(reduceToVisibleFields(data))\n  }, [data])\n\n  return <>MyComponent</>\n}\n\nrender(\n  <Form.Handler>\n    <MyComponent />\n  </Form.Handler>,\n)\n"})}),"\n",(0,o.jsxs)(n.p,{children:["In addition, you can include or exclude paths by using the ",(0,o.jsx)(n.code,{children:"keepPaths"})," and ",(0,o.jsx)(n.code,{children:"removePaths"})," options."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"reduceToVisibleFields(data, {\n  keepPaths: ['/foo'],\n  removePaths: ['/bar'],\n})\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Filter data"}),"\n",(0,o.jsxs)(n.p,{children:["You can use the ",(0,o.jsx)(n.code,{children:"filterData"})," function to filter your data. Check out ",(0,o.jsx)(n.a,{href:"#filter-your-data",children:"the example below"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["You simply give it the ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler/demos/#filter-your-data",children:"same kind of filter"})," as you would within the ",(0,o.jsx)(n.code,{children:"onSubmit"})," event callback."]}),"\n",(0,o.jsx)(n.p,{children:"The callback function receives the following arguments:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"path"})," as the first argument."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"value"})," as the second argument."]}),"\n",(0,o.jsxs)(n.li,{children:["The field ",(0,o.jsx)(n.code,{children:"properties"})," (props) as the third argument."]}),"\n",(0,o.jsx)(n.li,{children:"The fourth argument is an object with the internal state of the field, like the error state."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The callback function should return a ",(0,o.jsx)(n.code,{children:"boolean"})," or ",(0,o.jsx)(n.code,{children:"undefined"}),". Return ",(0,o.jsx)(n.code,{children:"false"})," to exclude an entry."]}),"\n",(0,o.jsx)(n.p,{children:"It returns the filtered form data."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Tip:"})," Depending on your use case – and instead of ",(0,o.jsx)(n.code,{children:"disabled"})," – you may rather use a ",(0,o.jsx)(n.code,{children:"data-*"})," attribute on your field (e.g. ",(0,o.jsx)(n.code,{children:"data-exclude-field"}),") to filter the field out of the data set."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"const filterDataHandler = ({ path, value, data, props, internal }) => {\n  if (props['data-exclude-field']) {\n    return false\n  }\n}\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\n\nconst MyForm = () => {\n  const { filterData } = Form.useData(myFormId)\n  const filteredData = filterData(filterDataHandler)\n\n  return (\n    <Form.Handler id={myFormId}>\n      <Field.String path=\"/foo\" data-exclude-field />\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"internal"})," parameter contains ",(0,o.jsx)(n.code,{children:"{ error: Error | undefined }"})," you can utilize if needed."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"const filterDataHandler = ({ path, value, data, props, internal }) => {\n  return !(internal.error instanceof Error)\n}\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Initial data"}),"\n",(0,o.jsxs)(n.p,{children:["You decide where and when you want to provide the initial ",(0,o.jsx)(n.code,{children:"data"})," to the form. It can be done via the ",(0,o.jsx)(n.code,{children:"Form.Handler"})," component, or via the ",(0,o.jsx)(n.code,{children:"Form.useData"})," Hook or ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Form/setData/",children:"Form.setData"})," method – or even in each Field, with the value property."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\nconst initialData = { foo: 'bar' }\n\nfunction MyForm() {\n  return (\n    <Form.Handler id={myFormId} data={initialData}>\n      <Field.String path=\"/foo\" />\n    </Form.Handler>\n  )\n}\n\nfunction ComponentA() {\n  Form.useData(myFormId, { foo: 'bar' })\n}\n\nfunction ComponentB() {\n  const { set } = Form.useData(myFormId)\n\n  useEffect(() => {\n    set({ foo: 'bar' })\n  }, [])\n}\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Validation"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"tl;dr:"})," the ",(0,o.jsx)(n.code,{children:"useData"})," hook returns unvalidated data."]}),"\n",(0,o.jsxs)(n.p,{children:["When you use an async ",(0,o.jsx)(n.code,{children:"onChange"}),", ",(0,o.jsx)(n.code,{children:"onChangeValidator"})," or ",(0,o.jsx)(n.code,{children:"onBlurValidator"}),' event handler on a field, it will delay the "submitted" value, because of its async nature.']}),"\n",(0,o.jsxs)(n.p,{children:["That means, if you want to access the value of a field immediately, you can use the ",(0,o.jsx)(n.code,{children:"useData"})," hook for that, as it always returns unvalidated data, in sync."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(a,e)})):a(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-use-data-mdx-803b2602b54b4636466f.js.map