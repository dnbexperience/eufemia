"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[90404],{40485:function(e,o,r){r.r(o),r.d(o,{default:function(){return f}});var l=r(52322),a=r(45392),s=(r(2784),r(55867)),i=r(55560);function t(){return(0,l.jsx)("div",{className:"table-container",children:(0,l.jsxs)(i.ZP,{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Product Id"}),(0,l.jsx)("th",{children:"Product name cards"}),(0,l.jsx)("th",{children:"Card name to show in app"}),(0,l.jsx)("th",{children:"Design"}),(0,l.jsx)("th",{children:"Bank Logo"}),(0,l.jsx)("th",{children:"Product Logo"}),(0,l.jsx)("th",{children:"Product Logo Variant"}),(0,l.jsx)("th",{children:"Type of Card"}),(0,l.jsx)("th",{children:"Type of Card Variant"})]})}),(0,l.jsx)("tbody",{children:s.Z.map((e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e.productCode}),(0,l.jsx)("td",{children:e.productName}),(0,l.jsx)("td",{children:e.displayName}),(0,l.jsx)("td",{children:e.cardDesign.name}),(0,l.jsx)("td",{children:g(e.cardDesign.bankLogo)}),(0,l.jsx)("td",{children:n(e.productType.toString())}),(0,l.jsx)("td",{children:b(e.productType,e.cardDesign)}),(0,l.jsx)("td",{children:n(e.cardType.toString())}),(0,l.jsx)("td",{children:c(e.cardType,e.cardDesign)})]},e.productCode)))})]})})}const n=e=>{let o=e.split(".")[1];return"None"===o&&(o="-"),o},c=(e,o)=>e.cata({Visa:()=>n(o.visa.toString()),Mastercard:()=>n(o.mastercard.toString()),None:()=>"-"}),b=(e,o)=>e.cata({Saga:()=>n(o.saga.toString()),Pluss:()=>"-",Intro:()=>"-",Bedrift:()=>"-",Business:()=>"-",PrivateBanking:()=>n(o.privateBanking.toString()),None:()=>"-"}),g=e=>e.cata({Colored:e=>e,Sbanken:e=>e});function d(e){const o=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.h2,{children:"List of all card products"}),"\n",(0,l.jsx)(t,{})]})}var f=function(e){void 0===e&&(e={});const{wrapper:o}=Object.assign({},(0,a.ah)(),e.components);return o?(0,l.jsx)(o,Object.assign({},e,{children:(0,l.jsx)(d,e)})):d(e)}},41766:function(e,o){o.Z={"--sb-font-family-default":'"Roboto", "Helvetica", "Arial", sans-serif',"--sb-font-family-headings":'"MaisonNeueHeadings", "Roboto", "Helvetica",',"--sb-font-weight-default":"normal","--sb-font-weight-basis":"normal","--sb-font-weight-regular":"normal","--sb-font-weight-medium":"500","--sb-font-weight-bold":"700","--sb-font-size-x-small":"0.75rem","--sb-font-size-small":"0.875rem","--sb-font-size-basis":"1rem","--sb-font-size-basis--em":"1em","--sb-font-size-lead":"1.25rem","--sb-font-size-medium":"1.625rem","--sb-font-size-large":"2rem","--sb-font-size-x-large":"2.375rem","--sb-font-size-xx-large":"3rem","--sb-line-height-x-small":"1.125rem","--sb-line-height-small":"1.25rem","--sb-line-height-basis":"1.5rem","--sb-line-height-basis--em":"1.5em","--sb-line-height-lead":"1.75rem","--sb-line-height-medium":"2rem","--sb-line-height-large":"2.375rem","--sb-line-height-x-large":"2.75rem","--sb-line-height-xx-large":"3.375rem","--sb-color-black":"#000","--sb-color-text":"#18172a","--sb-color-gray-dark-3":"#3a3a4a","--sb-color-gray-dark-3-neutral":"#3e3e4a","--sb-color-gray-dark-2":"#4a4a5b","--sb-color-gray-dark-2-neutral":"#656472","--sb-color-gray-dark":"#666578","--sb-color-gray-dark-neutral":"#9494a3","--sb-color-gray":"#bbbbce","--sb-color-gray-neutral":"#bdbdc6","--sb-color-gray-light":"#d9d9e4","--sb-color-gray-light-2":"#ebebf2","--sb-color-gray-light-3":"#f9f9fd","--sb-color-purple":"#1c1b4e","--sb-color-purple-alternative":"#222163","--sb-color-green":"#92eecd","--sb-color-white":"#fff","--sb-color-red":"#d8134b","--sb-color-magenta":"#ff3c64","--sb-color-orange":"#ff5b44","--sb-color-yellow-dark":"#f7bf16","--sb-color-yellow":"#ffef57","--sb-color-green-dark-3":"#00785b","--sb-color-green-dark-2":"#1e9f73","--sb-color-violet":"#4e08bc","--sb-color-violet-light":"#7129e2","--sb-color-blue-dark-2":"#044ccc","--sb-color-blue-dark":"#005cff","--sb-color-blue":"#008eff","--sb-color-orange-light":"#ff817b","--sb-color-orange-light-2":"#ffd7d5","--sb-color-orange-light-3":"#fff0ef","--sb-color-magenta-light":"#ffb6d2","--sb-color-magenta-light-2":"#ffdbe9","--sb-color-magenta-light-3":"#fff5f9","--sb-color-yellow-light":"#fff489","--sb-color-yellow-light-2":"#fff9c4","--sb-color-yellow-light-3":"#fffce5","--sb-color-green-dark":"#64d7b4","--sb-color-green-light":"#c8f6e5","--sb-color-green-light-2":"#e5fff7","--sb-color-violet-light-2":"#be99ff","--sb-color-violet-light-3":"#e0d0ff","--sb-color-violet-light-4":"#f1ebff","--sb-color-blue-light":"#61b9ff","--sb-color-blue-light-2":"#bfe3ff","--sb-color-blue-light-3":"#ebf6ff","--sb-spacing-x-small":"0.5rem","--sb-spacing-small":"1rem","--sb-spacing-medium":"1.5rem","--sb-spacing-large":"2rem","--sb-spacing-x-large":"3rem","--sb-spacing-xx-large":"3.5rem","--sb-layout-small":"40em","--sb-layout-medium":"60em","--sb-layout-large":"72em","--sb-layout-x-large":"80em","--sb-layout-xx-large":"90em","--sb-shadow-small":"0 2px 4px rgba(38 35 66 / 12%)","--sb-shadow-medium":"0 5px 20px rgba(38 35 66 / 10%)","--sb-shadow-large":"0 5px 20px rgba(38 35 66 / 20%)","--sb-shadow-hover":"0 20px 40px rgba(38 35 66 / 20%)","--sb-easing-default":"cubic-bezier(0.42, 0, 0, 1)","--color-emerald-green-50":"#89aaac","--color-emerald-green-25":"#c4d4d6","--color-emerald-green-10":"#e8eeef","--font-family-default":'"DNB", sans-serif',"--font-family-monospace":'"DNBMono", "Menlo", "Consolas", "Roboto Mono",',"--font-weight-default":"normal","--font-weight-basis":"normal","--font-weight-regular":"normal","--font-weight-medium":"500","--font-weight-bold":"600","--font-size-x-small":"0.875rem","--font-size-small":"1rem","--font-size-basis":"1.125rem","--font-size-basis--em":"1em","--font-size-lead":"var(--font-size-medium)","--font-size-medium":"1.25rem","--font-size-large":"1.625rem","--font-size-x-large":"2.125rem","--font-size-xx-large":"3rem","--line-height-xx-small--em":"1em","--line-height-x-small":"1.125rem","--line-height-small":"1.25rem","--line-height-basis":"1.5rem","--line-height-basis--em":"1.333em","--line-height-lead":"1.75rem","--line-height-medium":"2rem","--line-height-large":"2.5rem","--line-height-x-large":"3.5rem","--line-height-xx-large":"var(--line-height-x-large)","--color-mint-green-50":"#d2f0e9","--color-mint-green-25":"#e9f8f4","--color-mint-green-12":"#f4fbf9","--color-sea-green-30":"#b3d5d5","--color-accent-yellow-30":"#feebc1","--color-signal-orange":"#ff5400","--color-fire-red":"#dc2a2a","--color-success-green":"#007b5e","--color-fire-red-8":"#fdeeee","--color-black":"#000","--color-black-80":"#333","--color-black-55":"#737373","--color-black-20":"#ccc","--color-black-8":"#ebebeb","--color-black-3":"#f8f8f8","--color-white":"#fff","--color-black-border":"#cdcdcd","--color-black-background":"#fafafa","--color-sea-green":"#007272","--color-mint-green":"#a5e1d2","--color-summer-green":"#28b482","--color-emerald-green":"#14555a","--color-ocean-green":"#00343e","--color-accent-yellow":"#fdbb31","--color-indigo":"#23195a","--color-violet":"#6e2382","--color-sky-blue":"#4bbed2","--color-lavender":"#f2f2f5","--color-sand-yellow":"#fbf6ec","--color-pistachio":"#f2f4ec","--color-mint-green-alt":"#ebfffa","--color-indigo-medium":"#6e6491","--color-indigo-light":"#b9afc8","--color-violet-medium":"#a06eaf","--color-violet-light":"#cfb9d7","--color-sky-blue-medium":"#87d2e1","--color-sky-blue-light":"#c3ebf0","--spacing-xx-small":"0.25rem","--spacing-x-small":"0.5rem","--spacing-small":"1rem","--spacing-medium":"1.5rem","--spacing-large":"2rem","--spacing-x-large":"3rem","--spacing-xx-large":"3.5rem","--layout-small":"40em","--layout-medium":"60em","--layout-large":"72em","--layout-x-large":"80em","--layout-xx-large":"90em","--shadow-default":"0 8px 16px rgb(51 51 51 / 8%)","--shadow-default-x":"0","--shadow-default-y":"8px","--shadow-default-blur-radius":"16px","--shadow-default-color":"rgb(51 51 51 / 8%)","--easing-default":"cubic-bezier(0.42, 0, 0, 1)"}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-payment-card-products-mdx-18def5afc0c2b6bc1f6a.js.map