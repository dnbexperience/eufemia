import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n,{t as r}from"./demos-DKh-d89J2.js";var i=e();function a(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:`Import`}),`
`,(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:`language-tsx`,children:`import { DrawerList } from '@dnb/eufemia/fragments'
`})}),`
`,(0,i.jsx)(n.h2,{children:`Description`}),`
`,(0,i.jsx)(n.p,{children:`The DrawerList component is a fragment inside other components.`}),`
`,(0,i.jsxs)(n.p,{children:[`It is used e.g. in the `,(0,i.jsx)(n.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),`.`]}),`
`,(0,i.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/fragments/drawer-list`,children:`Source code`})}),`
`,(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/fragments/drawer-list`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(n.h2,{children:`Data structure`}),`
`,(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:`language-js`,children:`// as array
const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selectedKey: 'key_0',

    // Item content as a string or array
    content: 'Item 1 Content',
  },

  // more items ...
  {
    selectedKey: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selectedKey: 'key_2',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selectedKey: 'key_3',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

// as object
const data = {
  a: 'A',
  b: 'B',
}
`})}),`
`,(0,i.jsxs)(n.h3,{children:[`Example usage of `,(0,i.jsx)(n.code,{children:`optionsRender`})]}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsx)(n.h3,{children:`data-dnb-drawer-list-active`}),`
`,(0,i.jsxs)(n.p,{children:[`When a DrawerList is open, it will set an HTML attribute on the main HTML Element called `,(0,i.jsx)(n.code,{children:`data-dnb-drawer-list-active`}),`. The attribute value will be the ID of the current DrawerList.`]}),`
`,(0,i.jsx)(n.p,{children:`This can be used to handle z-index issues from within CSS only:`}),`
`,(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:`language-css`,children:`html[data-dnb-drawer-list-active='DrawerList-ID'] {
  /* Your css */
}
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(n,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};