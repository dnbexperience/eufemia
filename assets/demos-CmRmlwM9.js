import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{t as r}from"./Examples-CP-jpTlY.js";import{C as i,S as a,a as o,b as s,c,d as l,f as u,g as d,h as f,i as p,l as m,m as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S,w as C,x as w,y as T}from"./Examples-C7uMbn5v.js";var E=e(t());function D(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return y||k(`Examples`,!1),r||k(`Examples.AnimatedContainer`,!0),x||k(`Examples.ArrayFromFormHandler`,!0),g||k(`Examples.DynamicPathValue`,!0),p||k(`Examples.FilledViewAndEditContainer`,!0),o||k(`Examples.InitialOpenWithToolbarVariant`,!0),_||k(`Examples.InitiallyOpen`,!0),b||k(`Examples.MinItems`,!0),c||k(`Examples.NestedIterate`,!0),m||k(`Examples.NestedIterateWithPushContainer`,!0),S||k(`Examples.ObjectItems`,!0),l||k(`Examples.PrimitiveItemsFields`,!0),u||k(`Examples.PrimitiveItemsValues`,!0),v||k(`Examples.RenderPropsObjectItems`,!0),h||k(`Examples.RenderPropsPrimitiveItems`,!0),f||k(`Examples.RequiredWithPushButton`,!0),d||k(`Examples.RequiredWithPushContainer`,!0),T||k(`Examples.ValueComposition`,!0),s||k(`Examples.ViewAndEditContainer`,!0),w||k(`Examples.ViewAndEditContainerWithLineDivider`,!0),a||k(`Examples.WithArrayValidator`,!0),i||k(`Examples.WithTable`,!0),C||k(`Examples.WithVisibility`,!0),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(t.h2,{children:`Demos`}),`
`,(0,E.jsx)(t.h3,{children:`Primitive items as fields`}),`
`,(0,E.jsx)(l,{}),`
`,(0,E.jsx)(t.h3,{children:`Primitive items as values`}),`
`,(0,E.jsx)(u,{}),`
`,(0,E.jsx)(t.h3,{children:`Object items`}),`
`,(0,E.jsx)(S,{}),`
`,(0,E.jsx)(t.h3,{children:`Render properties with primitive items`}),`
`,(0,E.jsx)(t.p,{children:`You can provide the child as a function that receives the value of the item as the first argument, and the index of which item you are on as the second.`}),`
`,(0,E.jsx)(h,{}),`
`,(0,E.jsx)(t.h3,{children:`Render properties with object items`}),`
`,(0,E.jsx)(v,{}),`
`,(0,E.jsx)(t.h3,{children:`Conditions using Visibility`}),`
`,(0,E.jsx)(t.p,{children:`The second field will be visible when the first has a value.`}),`
`,(0,E.jsx)(C,{}),`
`,(0,E.jsx)(t.h3,{children:`Dynamic path value`}),`
`,(0,E.jsx)(g,{}),`
`,(0,E.jsx)(t.h3,{children:`Animated container`}),`
`,(0,E.jsxs)(t.p,{children:[`With an optional `,(0,E.jsx)(t.code,{children:`title`}),` and `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),`.`]}),`
`,(0,E.jsx)(r,{}),`
`,(0,E.jsx)(t.h3,{children:`Toggle between a view and edit container`}),`
`,(0,E.jsx)(s,{}),`
`,(0,E.jsx)(t.h3,{children:`Customize the view and edit containers`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Using `,(0,E.jsx)(t.code,{children:`variant="filled"`}),` will render the `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer`,children:`Iterate.ViewContainer`}),` and `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer`,children:`Iterate.EditContainer`}),` with a background color.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Using `,(0,E.jsx)(t.code,{children:`toolbarVariant="custom"`}),` will render the `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),` without any spacing so you can customize it to your needs.`]}),`
`]}),`
`,(0,E.jsx)(p,{}),`
`,(0,E.jsx)(t.h3,{children:`Using a line divider`}),`
`,(0,E.jsx)(w,{}),`
`,(0,E.jsx)(t.h3,{children:`Initially open`}),`
`,(0,E.jsx)(_,{}),`
`,(0,E.jsx)(t.h3,{children:`Required`}),`
`,(0,E.jsxs)(t.p,{children:[`With a `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` to add a new item.`]}),`
`,(0,E.jsxs)(t.p,{children:[`The new item gets inserted at the beginning of the array by using the `,(0,E.jsx)(t.code,{children:`reverse`}),` property.`]}),`
`,(0,E.jsx)(d,{}),`
`,(0,E.jsxs)(t.p,{children:[`With a `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushButton/`,children:`Iterate.PushButton`}),` to add a new item.`]}),`
`,(0,E.jsx)(f,{}),`
`,(0,E.jsx)(t.h3,{children:`Minium one item`}),`
`,(0,E.jsx)(t.p,{children:`There are several ways to achieve this:`}),`
`,(0,E.jsx)(t.h4,{children:`By using a schema`}),`
`,(0,E.jsxs)(t.p,{children:[`This example uses the `,(0,E.jsx)(t.code,{children:`minItems`}),` in a schema with a custom error message.`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`const schema = {
  type: 'object',
  properties: {
    myList: {
      type: 'array',
      minItems: 1,
    },
  },
}
`})}),`
`,(0,E.jsx)(t.p,{children:`It will show the error message when the array is empty.`}),`
`,(0,E.jsx)(b,{}),`
`,(0,E.jsxs)(t.h4,{children:[`By using the `,(0,E.jsx)(t.code,{children:`toolbarVariant`}),` property`]}),`
`,(0,E.jsxs)(t.p,{children:[`This example uses the container's `,(0,E.jsx)(t.code,{children:`toolbarVariant`}),` property with the value `,(0,E.jsx)(t.code,{children:`minimumOneItem`}),`.`]}),`
`,(0,E.jsxs)(t.p,{children:[`It hides the toolbar in the `,(0,E.jsx)(t.code,{children:`EditContainer`}),` when there is only one item in the array. And it hides the remove button in the `,(0,E.jsx)(t.code,{children:`ViewContainer`}),` when there is only one item in the array.`]}),`
`,(0,E.jsx)(o,{}),`
`,(0,E.jsx)(t.h3,{children:`With DataContext and add/remove buttons`}),`
`,(0,E.jsx)(x,{}),`
`,(0,E.jsx)(t.h3,{children:`Static generated in a Table`}),`
`,(0,E.jsx)(i,{}),`
`,(0,E.jsx)(t.h3,{children:`Value composition`}),`
`,(0,E.jsx)(T,{}),`
`,(0,E.jsx)(t.h3,{children:`Array validator`}),`
`,(0,E.jsx)(t.p,{children:`You can also add a validator to ensure that the array contains at least one item:`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`const validator = (arrayValue) => {
  if (!(arrayValue?.length > 0)) {
    return new Error('You need at least one item')
  }
}
`})}),`
`,(0,E.jsx)(a,{}),`
`,(0,E.jsx)(t.h3,{children:`Nested Iterate`}),`
`,(0,E.jsx)(c,{}),`
`,(0,E.jsx)(t.h3,{children:`Nested Iterate with PushContainer`}),`
`,(0,E.jsxs)(t.p,{children:[`This demo uses the `,(0,E.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` component to add new items to a nested array by using the `,(0,E.jsx)(t.code,{children:`itemPath`}),` property.`]}),`
`,(0,E.jsx)(m,{})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};