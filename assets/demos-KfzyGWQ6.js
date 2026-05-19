import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`breadcrumb-single`,stableName:`BreadcrumbSingle`,children:`<Breadcrumb
  onClick={() => {
    console.log('Going back!')
  }}
/>
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`breadcrumb-default`,stableName:`BreadcrumbDefault`,noInline:!0,children:`// You can also import pages from a store and only do a remapping
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
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`breadcrumb-children`,stableName:`BreadcrumbChildren`,children:`<Breadcrumb spacing>
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`breadcrumb-collapse`,stableName:`BreadcrumbCollapse`,noInline:!0,children:`const pages = [
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
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`breadcrumb-multiple`,stableName:`BreadcrumbMultiple`,noInline:!0,children:`const pages = [
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
`});function u(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Breadcrumb with pages as data`}),`
`,(0,i.jsxs)(t.p,{children:[`To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to `,(0,i.jsx)(t.code,{children:`data`}),`. If you have other specific cases, check out how to customize with `,(0,i.jsx)(t.a,{href:`/uilib/components/breadcrumb/#pages-as-child-components`,children:`children in Breadcrumb`}),`.`]}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The first item, `,(0,i.jsx)(t.code,{children:`Home`}),`, gets assigned a home icon and an appropriate text label based on the current locale.`]}),`
`,(0,i.jsx)(t.li,{children:`The last item in pages will be static text, corresponding to the current page.`}),`
`,(0,i.jsx)(t.li,{children:`Breadcrumb will collapse on small screens`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Pages as child components`}),`
`,(0,i.jsx)(t.p,{children:`For customizing the Breadcrumb to fit your needs, you can add each page as a child component.`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Single Breadcrumb`}),`
`,(0,i.jsxs)(t.p,{children:[`When you only want a single button for `,(0,i.jsx)(t.code,{children:`back`}),`.`]}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsxs)(t.p,{children:[`This can also be forced using the `,(0,i.jsx)(t.code,{children:`variant="single"`}),` property.`]}),`
`,(0,i.jsxs)(t.h3,{children:[`Always be collapsed (`,(0,i.jsx)(t.code,{children:`variant="collapse"`}),`)`]}),`
`,(0,i.jsx)(t.p,{children:`Expands when user clicks`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsxs)(t.h3,{children:[`Never collapse (`,(0,i.jsx)(t.code,{children:`variant="multiple"`}),`)`]}),`
`,(0,i.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}export{d as default};