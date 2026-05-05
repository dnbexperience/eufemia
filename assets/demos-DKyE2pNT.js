import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-geTEYZ7b.js";import{Rr as n}from"./index-CMgyXmp3.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`breadcrumb-single`,children:`<Breadcrumb
  onClick={() => {
    console.log('Going back!')
  }}
/>
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`breadcrumb-default`,noInline:!0,children:`// You can also import pages from a store and only do a remapping
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
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`breadcrumb-children`,children:`<Breadcrumb spacing>
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
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`breadcrumb-collapse`,noInline:!0,children:`const pages = [
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
`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`breadcrumb-multiple`,noInline:!0,children:`const pages = [
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
`});function l(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Breadcrumb`}),`
`,(0,r.jsxs)(t.p,{children:[`To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to `,(0,r.jsx)(t.code,{children:`data`}),`. If you have other specific cases, check out how to customize with `,(0,r.jsx)(t.a,{href:`/uilib/components/breadcrumb/#pages-as-child-components`,children:`children in Breadcrumb`}),`.`]}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The first item, `,(0,r.jsx)(t.code,{children:`Home`}),`, gets assigned a home icon and an appropriate text label based on the current locale.`]}),`
`,(0,r.jsx)(t.li,{children:`The last item in pages will be static text, corresponding to the current page.`}),`
`,(0,r.jsx)(t.li,{children:`Breadcrumb will collapse on small screens`}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Pages as child components`}),`
`,(0,r.jsx)(t.p,{children:`For customizing the Breadcrumb to fit your needs, you can add each page as a child component.`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Single Breadcrumb`}),`
`,(0,r.jsxs)(t.p,{children:[`When you only want a single button for `,(0,r.jsx)(t.code,{children:`back`}),`.`]}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsxs)(t.p,{children:[`This can also be forced using the `,(0,r.jsx)(t.code,{children:`variant="single"`}),` property.`]}),`
`,(0,r.jsxs)(t.h3,{children:[`Always be collapsed (`,(0,r.jsx)(t.code,{children:`variant="collapse"`}),`)`]}),`
`,(0,r.jsx)(t.p,{children:`Expands when user clicks`}),`
`,(0,r.jsx)(s,{}),`
`,(0,r.jsxs)(t.h3,{children:[`Never collapse (`,(0,r.jsx)(t.code,{children:`variant="multiple"`}),`)`]}),`
`,(0,r.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}export{u as default};