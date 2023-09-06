"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[23556,92302,41183],{72888:function(n,e,r){r.r(e);var t=r(52322),s=r(45392),i=r(47551),a=r(79750);function c(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.default,{}),"\n",(0,t.jsx)(a.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(c,n)})):c()}},79750:function(n,e,r){r.r(e),r.d(e,{default:function(){return p}});var t=r(52322),s=r(45392),i=r(82058);const a=()=>(0,t.jsx)(i.Z,{"data-visual-test":"breadcrumb-single",children:"<Breadcrumb\n  onClick={() => {\n    console.log('Going back!')\n  }}\n/>\n"}),c=()=>(0,t.jsx)(i.Z,{"data-visual-test":"breadcrumb-multiple",noInline:!0,children:"// You can also import pages from a store and only do a remapping\nconst pages = [\n  {\n    text: '',\n    href: '/',\n  },\n  {\n    text: 'UI Library',\n    href: '/uilib',\n  },\n  {\n    text: 'Components',\n    href: '/uilib/components',\n  },\n  {\n    text: 'Breadcrumbs',\n    href: '/uilib/components/breadcrumbs',\n  },\n]\nrender(<Breadcrumb data={pages} spacing />)\n"}),o=()=>(0,t.jsx)(i.Z,{"data-visual-test":"breadcrumb-multiple-children",children:'<Breadcrumb spacing>\n  <Breadcrumb.Item\n    onClick={() => {\n      console.log(\'go home!\')\n    }}\n    variant="home"\n  />\n  <Breadcrumb.Item\n    text="Page item"\n    onClick={() => {\n      console.log(\'go to page 1\')\n    }}\n  />\n  <Breadcrumb.Item\n    text="Page item"\n    onClick={() => {\n      console.log(\'go to page 2\')\n    }}\n    variant="current"\n  />\n</Breadcrumb>\n'}),l=()=>(0,t.jsx)(i.Z,{"data-visual-test":"breadcrumb-collapse",noInline:!0,children:"const pages = [\n  {\n    text: '',\n    href: '/',\n  },\n  {\n    text: 'UI Library',\n    href: '/uilib',\n  },\n  {\n    text: 'Components',\n    href: '/uilib/components',\n  },\n]\nrender(\n  // Try changing variant here\n  <Breadcrumb variant=\"collapse\" data={pages} spacing />,\n)\n"}),d=()=>(0,t.jsx)(i.Z,{"data-visual-test":"breadcrumb-collapse-open",noInline:!0,children:"const pages = [\n  {\n    text: '',\n    href: '/',\n  },\n  {\n    text: 'UI Library',\n    href: '/uilib',\n  },\n  {\n    text: 'Components',\n    href: '/uilib/components',\n  },\n]\nrender(\n  <Breadcrumb\n    variant=\"collapse\"\n    data={pages}\n    isCollapsed={false}\n    spacing\n  />,\n)\n"});function h(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",a:"a",ul:"ul",li:"li"},(0,s.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Demos"}),"\n",(0,t.jsx)(e.h3,{children:"Multiple Breadcrumb (recommended)"}),"\n",(0,t.jsxs)(e.p,{children:["To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to ",(0,t.jsx)(e.code,{children:"data"}),". If you have other specific cases, check out how to customize with ",(0,t.jsx)(e.a,{href:"/uilib/components/breadcrumb/#multiple-breadcrumb-with-children",children:"children in Multiple Breadcrumb"}),"."]}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(e.p,{children:"Some extra functionality is provided to this variant:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["The first item, ",(0,t.jsx)(e.code,{children:"Home"}),", gets assigned a home icon and an appropriate text label based on the current locale."]}),"\n",(0,t.jsx)(e.li,{children:"The last item in pages will be static text, corresponding to the current page."}),"\n",(0,t.jsxs)(e.li,{children:["Another variant, ",(0,t.jsx)(e.code,{children:"collapse"}),", appears for small screens."]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{children:"Single Breadcrumb"}),"\n",(0,t.jsxs)(e.p,{children:["When you only want a single button for ",(0,t.jsx)(e.code,{children:"back"}),", this variant is recommended and default when neither ",(0,t.jsx)(e.code,{children:"data"})," nor ",(0,t.jsx)(e.code,{children:"children"})," is present."]}),"\n",(0,t.jsx)(a,{}),"\n",(0,t.jsx)(e.h3,{children:"Multiple Breadcrumb with children"}),"\n",(0,t.jsx)(e.p,{children:"For customizing the Breadcrumb to fit your needs, this variant can be utilized."}),"\n",(0,t.jsx)(o,{}),"\n",(0,t.jsx)(e.h3,{children:"Setting property 'variant'"}),"\n",(0,t.jsxs)(e.p,{children:["Property variant is by default set based on the combination of children and data properties, and also screen size.\nIf you want to override this property, pass in the prop ",(0,t.jsx)(e.code,{children:"variant"})," to be either ",(0,t.jsx)(e.code,{children:"single"}),", ",(0,t.jsx)(e.code,{children:"multiple"}),", or ",(0,t.jsx)(e.code,{children:"collapse"}),"."]}),"\n",(0,t.jsx)(l,{}),"\n",(0,t.jsx)(e.h3,{children:"Setting property 'variant' and overriding 'isCollapsed'"}),"\n",(0,t.jsx)(d,{})]})}var p=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(h,n)})):h(n)}},47551:function(n,e,r){r.r(e);var t=r(52322),s=r(45392);function i(n){const e=Object.assign({h2:"h2",p:"p"},(0,s.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Description"}),"\n",(0,t.jsx)(e.p,{children:"The Breadcrumb is a component for navigation and for showing the current website path or tree."})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(i,n)})):i(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-breadcrumb-mdx-fffb24f20f37add887bf.js.map