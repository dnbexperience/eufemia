import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{t as n}from"./Examples-DmJwIF6h.js";import{C as r,S as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,u as x,w as S,x as C,y as w}from"./Examples-BoUcEvmC.js";var T=e();function E(e){let E={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return v||O(`Examples`,!1),n||O(`Examples.AnimatedContainer`,!0),b||O(`Examples.ArrayFromFormHandler`,!0),h||O(`Examples.DynamicPathValue`,!0),f||O(`Examples.FilledViewAndEditContainer`,!0),a||O(`Examples.InitialOpenWithToolbarVariant`,!0),g||O(`Examples.InitiallyOpen`,!0),y||O(`Examples.MinItems`,!0),s||O(`Examples.NestedIterate`,!0),p||O(`Examples.NestedIterateWithPushContainer`,!0),x||O(`Examples.ObjectItems`,!0),c||O(`Examples.PrimitiveItemsFields`,!0),l||O(`Examples.PrimitiveItemsValues`,!0),_||O(`Examples.RenderPropsObjectItems`,!0),m||O(`Examples.RenderPropsPrimitiveItems`,!0),d||O(`Examples.RequiredWithPushButton`,!0),u||O(`Examples.RequiredWithPushContainer`,!0),w||O(`Examples.ValueComposition`,!0),o||O(`Examples.ViewAndEditContainer`,!0),C||O(`Examples.ViewAndEditContainerWithLineDivider`,!0),i||O(`Examples.WithArrayValidator`,!0),r||O(`Examples.WithTable`,!0),S||O(`Examples.WithVisibility`,!0),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(E.h2,{children:`Demos`}),`
`,(0,T.jsx)(E.h3,{children:`Primitive items as fields`}),`
`,(0,T.jsx)(c,{}),`
`,(0,T.jsx)(E.h3,{children:`Primitive items as values`}),`
`,(0,T.jsx)(l,{}),`
`,(0,T.jsx)(E.h3,{children:`Object items`}),`
`,(0,T.jsx)(x,{}),`
`,(0,T.jsx)(E.h3,{children:`Render properties with primitive items`}),`
`,(0,T.jsx)(E.p,{children:`You can provide the child as a function that receives the value of the item as the first argument, and the index of which item you are on as the second.`}),`
`,(0,T.jsx)(m,{}),`
`,(0,T.jsx)(E.h3,{children:`Render properties with object items`}),`
`,(0,T.jsx)(_,{}),`
`,(0,T.jsx)(E.h3,{children:`Conditions using Visibility`}),`
`,(0,T.jsx)(E.p,{children:`The second field will be visible when the first has a value.`}),`
`,(0,T.jsx)(S,{}),`
`,(0,T.jsx)(E.h3,{children:`Dynamic path value`}),`
`,(0,T.jsx)(h,{}),`
`,(0,T.jsx)(E.h3,{children:`Animated container`}),`
`,(0,T.jsxs)(E.p,{children:[`With an optional `,(0,T.jsx)(E.code,{children:`title`}),` and `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),`.`]}),`
`,(0,T.jsx)(n,{}),`
`,(0,T.jsx)(E.h3,{children:`Toggle between a view and edit container`}),`
`,(0,T.jsx)(o,{}),`
`,(0,T.jsx)(E.h3,{children:`Customize the view and edit containers`}),`
`,(0,T.jsxs)(E.ul,{children:[`
`,(0,T.jsxs)(E.li,{children:[`Using `,(0,T.jsx)(E.code,{children:`variant="filled"`}),` will render the `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer`,children:`Iterate.ViewContainer`}),` and `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/EditContainer`,children:`Iterate.EditContainer`}),` with a background color.`]}),`
`,(0,T.jsxs)(E.li,{children:[`Using `,(0,T.jsx)(E.code,{children:`toolbarVariant="custom"`}),` will render the `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),` without any spacing so you can customize it to your needs.`]}),`
`]}),`
`,(0,T.jsx)(f,{}),`
`,(0,T.jsx)(E.h3,{children:`Using a line divider`}),`
`,(0,T.jsx)(C,{}),`
`,(0,T.jsx)(E.h3,{children:`Initially open`}),`
`,(0,T.jsx)(g,{}),`
`,(0,T.jsx)(E.h3,{children:`Required`}),`
`,(0,T.jsxs)(E.p,{children:[`With a `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` to add a new item.`]}),`
`,(0,T.jsxs)(E.p,{children:[`The new item gets inserted at the beginning of the array by using the `,(0,T.jsx)(E.code,{children:`reverse`}),` property.`]}),`
`,(0,T.jsx)(u,{}),`
`,(0,T.jsxs)(E.p,{children:[`With a `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/PushButton/`,children:`Iterate.PushButton`}),` to add a new item.`]}),`
`,(0,T.jsx)(d,{}),`
`,(0,T.jsx)(E.h3,{children:`Minium one item`}),`
`,(0,T.jsx)(E.p,{children:`There are several ways to achieve this:`}),`
`,(0,T.jsx)(E.h4,{children:`By using a schema`}),`
`,(0,T.jsxs)(E.p,{children:[`This example uses the `,(0,T.jsx)(E.code,{children:`minItems`}),` in a schema with a custom error message.`]}),`
`,(0,T.jsx)(E.pre,{children:(0,T.jsx)(E.code,{className:`language-tsx`,children:`const schema = {
  type: 'object',
  properties: {
    myList: {
      type: 'array',
      minItems: 1,
    },
  },
}
`})}),`
`,(0,T.jsx)(E.p,{children:`It will show the error message when the array is empty.`}),`
`,(0,T.jsx)(y,{}),`
`,(0,T.jsxs)(E.h4,{children:[`By using the `,(0,T.jsx)(E.code,{children:`toolbarVariant`}),` property`]}),`
`,(0,T.jsxs)(E.p,{children:[`This example uses the container's `,(0,T.jsx)(E.code,{children:`toolbarVariant`}),` property with the value `,(0,T.jsx)(E.code,{children:`minimumOneItem`}),`.`]}),`
`,(0,T.jsxs)(E.p,{children:[`It hides the toolbar in the `,(0,T.jsx)(E.code,{children:`EditContainer`}),` when there is only one item in the array. And it hides the remove button in the `,(0,T.jsx)(E.code,{children:`ViewContainer`}),` when there is only one item in the array.`]}),`
`,(0,T.jsx)(a,{}),`
`,(0,T.jsx)(E.h3,{children:`With DataContext and add/remove buttons`}),`
`,(0,T.jsx)(b,{}),`
`,(0,T.jsx)(E.h3,{children:`Static generated in a Table`}),`
`,(0,T.jsx)(r,{}),`
`,(0,T.jsx)(E.h3,{children:`Value composition`}),`
`,(0,T.jsx)(w,{}),`
`,(0,T.jsx)(E.h3,{children:`Array validator`}),`
`,(0,T.jsx)(E.p,{children:`You can also add a validator to ensure that the array contains at least one item:`}),`
`,(0,T.jsx)(E.pre,{children:(0,T.jsx)(E.code,{className:`language-tsx`,children:`const validator = (arrayValue) => {
  if (!(arrayValue?.length > 0)) {
    return new Error('You need at least one item')
  }
}
`})}),`
`,(0,T.jsx)(i,{}),`
`,(0,T.jsx)(E.h3,{children:`Nested Iterate`}),`
`,(0,T.jsx)(s,{}),`
`,(0,T.jsx)(E.h3,{children:`Nested Iterate with PushContainer`}),`
`,(0,T.jsxs)(E.p,{children:[`This demo uses the `,(0,T.jsx)(E.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` component to add new items to an nested array by using the `,(0,T.jsx)(E.code,{children:`itemPath`}),` property.`]}),`
`,(0,T.jsx)(p,{})]})}function D(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,T.jsx)(n,{...e,children:(0,T.jsx)(E,{...e})}):E(e)}function O(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{D as default};