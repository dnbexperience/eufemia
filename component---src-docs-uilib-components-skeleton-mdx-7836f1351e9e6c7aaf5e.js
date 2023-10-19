"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[78602,62761,9238],{47e3:function(e,n,s){s.r(n);var t=s(52322),i=s(45392),o=s(31992),a=s(34939);function r(e){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{}),"\n",(0,t.jsx)(a.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(r,e)})):r()}},34939:function(e,n,s){s.r(n);var t=s(52322),i=s(45392),o=s(83606),a=s(5271);function r(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,i.ah)(),e.components),{VisibleWhenVisualTest:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("VisibleWhenVisualTest",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{children:"Demos"}),"\n",(0,t.jsx)(a.Z,{}),"\n",(0,t.jsx)(n.h2,{children:"Input with Skeleton"}),"\n",(0,t.jsx)(o.z0,{}),"\n",(0,t.jsx)(n.h2,{children:"Toggle skeleton on/off"}),"\n",(0,t.jsx)(o.T_,{}),"\n",(0,t.jsx)(n.h2,{children:"Skeleton wrapper"}),"\n",(0,t.jsx)(o.Ke,{}),"\n",(0,t.jsx)(n.h2,{children:"Skeleton using Eufemia Provider"}),"\n",(0,t.jsxs)(n.p,{children:["You can also use ",(0,t.jsx)(n.code,{children:"formElement={{ skeleton: true }}"}),"."]}),"\n",(0,t.jsx)(o.aB,{}),"\n",(0,t.jsx)(n.h2,{children:"Skeleton figures"}),"\n",(0,t.jsx)(n.p,{children:"You may import a given figure, or create your own."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import { Article } from '@dnb/eufemia/components/skeleton/figures'\n"})}),"\n",(0,t.jsx)(o.eE,{}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(o.jl,{})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(r,e)})):r(e)}},31992:function(e,n,s){s.r(n);var t=s(52322),i=s(45392),o=s(83606);function a(e){const n=Object.assign({h2:"h2",p:"p",h3:"h3",h4:"h4",ol:"ol",li:"li",ul:"ul",a:"a",code:"code"},(0,i.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{children:"Description"}),"\n",(0,t.jsx)(n.p,{children:"The Skeleton component is a visual building block helper. It will provide loading placeholders that display a non-interactive preview of the app’s actual UI to visually communicate that content is being processed."}),"\n",(0,t.jsx)(n.h3,{children:"Take in consideration"}),"\n",(0,t.jsx)(n.p,{children:"It has to be used carefully and not as a quick loading indicator replacement. The reason lays in that, that the browser will use additional resources to render the additional state. And if it is misused, like showing not a nearly identical UI or it is shown for just a fraction of a second, then it will rather distract the user experience, than enhance it."}),"\n",(0,t.jsx)(n.p,{children:"Also, the fact, that in some setups, the user is first downloading almost the whole web application before we actually are able to show some skeletons during the API calls."}),"\n",(0,t.jsx)(n.h4,{children:"Gatsby"}),"\n",(0,t.jsx)(n.p,{children:"Gatsby as a framework makes the perfect fit to utilize a good skeleton user experience from the very first-page visit. Every page is optimized to load as fast as possible (in addition to page preloading and PWA). We can take advantage of this and show our skeleton as our initial state."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"The skeletons will show up during the very first paint – even without JavaScript enabled."}),"\n",(0,t.jsx)(n.li,{children:"Next, our page loads the needed application bundle, so we can start an API call, getting our user data."}),"\n",(0,t.jsx)(n.li,{children:"Now our applications renders."}),"\n",(0,t.jsx)(n.li,{children:"And finally, we have the user data to display."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{children:"Accessibility"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Elements and components should be still responsive to screen width and font-size."}),"\n",(0,t.jsx)(n.li,{children:"Screen readers will get a mention that the loading state has finished as a aria-live update."}),"\n",(0,t.jsx)(n.li,{children:"Components and interactive elements are not accessible for keyboard users."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{children:"When not to use"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"For low-traffic pages, such as super-user-only admin pages, use a loading spinner instead."}),"\n",(0,t.jsxs)(n.li,{children:["For a tiny, inline action or feedback, e.g. clicked a button and the action will take time, use the ",(0,t.jsx)(n.a,{href:"/uilib/components/progress-indicator",children:"ProgressIndicator"})," instead (animation)."]}),"\n",(0,t.jsxs)(n.li,{children:["For fast processes that take less than ",(0,t.jsx)(n.code,{children:"300ms"}),", consider the ",(0,t.jsx)(n.a,{href:"/uilib/components/progress-indicator",children:"ProgressIndicator"})," or no loading state at all."]}),"\n",(0,t.jsxs)(n.li,{children:["For a background process or a long-running process, e.g. importing data or exporting reports, use the ",(0,t.jsx)(n.a,{href:"/uilib/components/progress-indicator",children:"ProgressIndicator"})," instead (percentage)."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{children:"When to use"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Use on high-traffic pages and landing pages, if they require a loading state."}),"\n",(0,t.jsx)(n.li,{children:"Use when there’s more than one element loading at the same time that requires an indicator."}),"\n",(0,t.jsxs)(n.li,{children:["Use when the process would take more than ",(0,t.jsx)(n.code,{children:"300ms"})," to load on an average internet connection."]}),"\n",(0,t.jsxs)(n.li,{children:["Use the Skeleton component when the ",(0,t.jsx)(n.a,{href:"/uilib/components/progress-indicator",children:"ProgressIndicator"})," is not prominent enough."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{children:"How to use"}),"\n",(0,t.jsx)(n.p,{children:"You can use the Skeleton component as a provider for all underlying components, like inputs and buttons. This way, you can simply toggle on and off the skeletons. And all the spacing and sizing will be given from the components themselves."}),"\n",(0,t.jsx)(n.p,{children:"But you can also use the Skeleton component to show a fake article or other figures."}),"\n",(0,t.jsx)(n.h3,{children:"How it works"}),"\n",(0,t.jsx)(n.p,{children:"Every Eufemia component should support a skeleton natively. But for simplification, you can use the Skeleton component as a provider, so enable the skeletons for a group of components."}),"\n",(0,t.jsxs)(n.p,{children:["If you use the skeleton as a provider, the ",(0,t.jsx)(n.a,{href:"/uilib/layout/space",children:"Space"})," component is used as a wrapper. This wrapper also serves the underlying components to define the style type or animation. If only the defaults are used, then you can skip it by setting the element to false ",(0,t.jsx)(n.code,{children:"element={false}"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["But the Skeleton component also supports a set of ready-to-use figures. Use it like ",(0,t.jsx)(n.code,{children:'figure="article"'}),"."]}),"\n",(0,t.jsx)(o.lC,{}),"\n",(0,t.jsx)(n.h3,{children:"Global Provider"}),"\n",(0,t.jsxs)(n.p,{children:["You can also use the global ",(0,t.jsx)(n.a,{href:"/uilib/usage/customisation/provider",children:"Eufemia Provider"})," to enable the underlying skeletons. You can even have multiple providers wrapped."]}),"\n",(0,t.jsx)(o._m,{}),"\n",(0,t.jsx)(n.h3,{children:"Exclude a part"}),"\n",(0,t.jsxs)(n.p,{children:["You can easily exclude a part from being transformed to a skeleton by using ",(0,t.jsx)(n.code,{children:"Skeleton.Exclude"}),"."]}),"\n",(0,t.jsx)(o.JV,{}),"\n",(0,t.jsx)(n.h3,{children:"Suspense"}),"\n",(0,t.jsx)(n.p,{children:"You can take advantage of an async component by using the React Suspense with a skeleton fallback."}),"\n",(0,t.jsx)(o.Yj,{}),"\n",(0,t.jsx)(n.h3,{children:"Create a custom skeleton"}),"\n",(0,t.jsx)(n.p,{children:"In order to create the same skeletons as the build-ins, you can make use of a couple of helper tools."}),"\n",(0,t.jsx)(o.t1,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(a,e)})):a(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-skeleton-mdx-7836f1351e9e6c7aaf5e.js.map