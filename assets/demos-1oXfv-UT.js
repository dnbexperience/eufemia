import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{V as n,W as r}from"./index-D7e1avVt.js";import{t as i}from"./ComponentBox-CE7bpcJy.js";var a=e(t()),o=n,s=()=>(0,a.jsx)(i,{"data-visual-test":`breadcrumb-single`,stableName:`BreadcrumbSingle`,sourceImports:[`import Breadcrumb from '@dnb/eufemia/components/Breadcrumb'`],__buildScope:{Breadcrumb:o},children:`<Breadcrumb
  onClick={() => {
    console.log('Going back!')
  }}
/>
`}),c=()=>(0,a.jsx)(i,{"data-visual-test":`breadcrumb-default`,stableName:`BreadcrumbDefault`,sourceImports:[`import Breadcrumb from '@dnb/eufemia/components/Breadcrumb'`],__buildScope:{Breadcrumb:o},noInline:!0,children:`// You can also import pages from a store and only do a remapping
const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
  {
    text: 'Breadcrumbs',
    href: '/uilib/components/breadcrumbs',
  },
]
render(<Breadcrumb data={pages} spacing />)
`}),l=()=>(0,a.jsx)(i,{"data-visual-test":`breadcrumb-children`,stableName:`BreadcrumbChildren`,sourceImports:[`import Breadcrumb from '@dnb/eufemia/components/Breadcrumb'`],__buildScope:{Breadcrumb:o},children:`<Breadcrumb spacing>
  <Breadcrumb.Item
    onClick={() => {
      console.log('go home!')
    }}
    variant="home"
  />
  <Breadcrumb.Item
    text="Page item"
    onClick={() => {
      console.log('go to page 1')
    }}
  />
  <Breadcrumb.Item
    text="Page item"
    onClick={() => {
      console.log('go to page 2')
    }}
    variant="current"
  />
</Breadcrumb>
`}),u=()=>(0,a.jsx)(i,{"data-visual-test":`breadcrumb-collapse`,stableName:`BreadcrumbCollapse`,sourceImports:[`import Breadcrumb from '@dnb/eufemia/components/Breadcrumb'`],__buildScope:{Breadcrumb:o},noInline:!0,children:`const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
]
render(<Breadcrumb variant="collapse" data={pages} spacing />)
`}),d=()=>(0,a.jsx)(i,{"data-visual-test":`breadcrumb-multiple`,stableName:`BreadcrumbMultiple`,sourceImports:[`import Breadcrumb from '@dnb/eufemia/components/Breadcrumb'`],__buildScope:{Breadcrumb:o},noInline:!0,children:`const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
  {
    text: 'Breadcrumbs',
    href: '/uilib/components/breadcrumbs',
  },
]
render(<Breadcrumb variant="multiple" data={pages} spacing />)
`});function f(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...r(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Breadcrumb with pages as data`}),`
`,(0,a.jsxs)(t.p,{children:[`To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to `,(0,a.jsx)(t.code,{children:`data`}),`. If you have other specific cases, check out how to customize with `,(0,a.jsx)(t.a,{href:`/uilib/components/breadcrumb/#pages-as-child-components`,children:`children in Breadcrumb`}),`.`]}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`The first item, `,(0,a.jsx)(t.code,{children:`Home`}),`, gets assigned a home icon and an appropriate text label based on the current locale.`]}),`
`,(0,a.jsx)(t.li,{children:`The last item in pages will be static text, corresponding to the current page.`}),`
`,(0,a.jsx)(t.li,{children:`Breadcrumb will collapse on small screens`}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Pages as child components`}),`
`,(0,a.jsx)(t.p,{children:`For customizing the Breadcrumb to fit your needs, you can add each page as a child component.`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Single Breadcrumb`}),`
`,(0,a.jsxs)(t.p,{children:[`When you only want a single button for `,(0,a.jsx)(t.code,{children:`back`}),`.`]}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsxs)(t.p,{children:[`This can also be forced using the `,(0,a.jsx)(t.code,{children:`variant="single"`}),` property.`]}),`
`,(0,a.jsxs)(t.h3,{children:[`Always be collapsed (`,(0,a.jsx)(t.code,{children:`variant="collapse"`}),`)`]}),`
`,(0,a.jsx)(t.p,{children:`Expands when user clicks`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Never collapse (`,(0,a.jsx)(t.code,{children:`variant="multiple"`}),`)`]}),`
`,(0,a.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}export{p as default};