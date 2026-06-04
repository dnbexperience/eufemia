import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r,{t as i}from"./demos-DXW5SjVC.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { DrawerList } from '@dnb/eufemia/fragments'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsx)(t.p,{children:`The DrawerList component is a fragment inside other components.`}),`
`,(0,a.jsxs)(t.p,{children:[`It is used e.g. in the `,(0,a.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/fragments/drawer-list`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/fragments/drawer-list`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Data structure`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-js`,children:`// as array
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
`,(0,a.jsxs)(t.h3,{children:[`Example usage of `,(0,a.jsx)(t.code,{children:`optionsRender`})]}),`
`,(0,a.jsx)(i,{}),`
`,(0,a.jsx)(t.h3,{children:`data-dnb-drawer-list-active`}),`
`,(0,a.jsxs)(t.p,{children:[`When a DrawerList is open, it will set an HTML attribute on the main HTML Element called `,(0,a.jsx)(t.code,{children:`data-dnb-drawer-list-active`}),`. The attribute value will be the ID of the current DrawerList.`]}),`
`,(0,a.jsx)(t.p,{children:`This can be used to handle z-index issues from within CSS only:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`html[data-dnb-drawer-list-active='DrawerList-ID'] {
  /* Your css */
}
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};