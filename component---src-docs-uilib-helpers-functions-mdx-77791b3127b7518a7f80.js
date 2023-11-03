"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[70309],{79266:function(e,n,s){s.r(n);var r=s(52322),i=s(45392);function l(e){const n=Object.assign({h2:"h2",p:"p",h3:"h3",pre:"pre",code:"code",strong:"strong",a:"a",h4:"h4",ul:"ul",li:"li",em:"em",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,i.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Component helpers"}),"\n",(0,r.jsx)(n.p,{children:"All components have various function helpers, you also can use in projects."}),"\n",(0,r.jsx)(n.h3,{children:"isTrue"}),"\n",(0,r.jsx)(n.p,{children:"Checks if a value is Truthy or Falsy."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { isTrue } from '@dnb/eufemia/shared/component-helper'\n\nisTrue(String | Boolean | Number) // returns Boolean\n"})}),"\n",(0,r.jsx)(n.h3,{children:"isTouchDevice"}),"\n",(0,r.jsx)(n.p,{children:"Checks if the target device has touch support."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { isTouchDevice } from '@dnb/eufemia/shared/component-helper'\n\nisTouchDevice() // returns Boolean\n"})}),"\n",(0,r.jsx)(n.h3,{children:"toPascalCase"}),"\n",(0,r.jsxs)(n.p,{children:["Transforms a string from ",(0,r.jsx)(n.strong,{children:"snake_case"})," to ",(0,r.jsx)(n.a,{href:"!/contribute/naming",children:"PascalCase"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { toPascalCase } from '@dnb/eufemia/shared/component-helper'\n\ntoPascalCase(String) // returns String\n"})}),"\n",(0,r.jsx)(n.h3,{children:"toCamelCase"}),"\n",(0,r.jsxs)(n.p,{children:["Transforms a string from ",(0,r.jsx)(n.strong,{children:"snake_case"})," to ",(0,r.jsx)(n.a,{href:"!/contribute/naming",children:"camelCase"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { toCamelCase } from '@dnb/eufemia/shared/component-helper'\n\ntoCamelCase(String) // returns String\n"})}),"\n",(0,r.jsx)(n.h3,{children:"toSnakeCase"}),"\n",(0,r.jsxs)(n.p,{children:["Transforms a string from ",(0,r.jsx)(n.strong,{children:"PascalCase"})," to ",(0,r.jsx)(n.a,{href:"!/contribute/naming",children:"snake_case"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { toSnakeCase } from '@dnb/eufemia/shared/component-helper'\n\ntoSnakeCase(String) // returns String\n"})}),"\n",(0,r.jsx)(n.h3,{children:"toKebabCase"}),"\n",(0,r.jsxs)(n.p,{children:["Transforms a string from ",(0,r.jsx)(n.strong,{children:"PascalCase"})," to ",(0,r.jsx)(n.a,{href:"!/contribute/naming",children:"kebab-case"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { toKebabCase } from '@dnb/eufemia/shared/component-helper'\n\ntoKebabCase(String) // returns String\n"})}),"\n",(0,r.jsx)(n.h3,{children:"filterProps"}),"\n",(0,r.jsx)(n.p,{children:"Filters out unwanted entries from either an object or array."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { filterProps } from '@dnb/eufemia/shared/component-helper'\n\nfilterProps(props: Object|Array, remove*: Object|Array|Function, allowed*: Object|Array|Function) // returns Object|Array\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["remove = ",(0,r.jsx)(n.em,{children:"null"})]}),"\n",(0,r.jsxs)(n.li,{children:["allowed = ",(0,r.jsx)(n.em,{children:"null"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"makeUniqueId"}),"\n",(0,r.jsx)(n.p,{children:"Creates a truly unique hash."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { makeUniqueId } from '@dnb/eufemia/shared/component-helper'\n\nmakeUniqueId(prefix*: String, length*: Number) // returns String\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["prefix = ",(0,r.jsx)(n.em,{children:"''"})]}),"\n",(0,r.jsxs)(n.li,{children:["length = ",(0,r.jsx)(n.em,{children:"8"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"slugify"}),"\n",(0,r.jsx)(n.p,{children:"Breaks down phrases of words to be URI compatible. Removes special characters."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { slugify } from '@dnb/eufemia/shared/component-helper'\n\nslugify(String) // returns String\n"})}),"\n",(0,r.jsx)(n.h3,{children:"checkIfHasScrollbar"}),"\n",(0,r.jsx)(n.p,{children:"Checks if an element has a scrollbar."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { checkIfHasScrollbar } from '@dnb/eufemia/shared/component-helper'\n\ncheckIfHasScrollbar(HTMLElement) // returns Boolean\n"})}),"\n",(0,r.jsx)(n.h3,{children:"convertJsxToString"}),"\n",(0,r.jsx)(n.p,{children:"Converts one or more HTMLElements to a string."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { convertJsxToString } from '@dnb/eufemia/shared/component-helper'\n\nconvertJsxToString(element: HTMLElement, separator*: String) // returns Boolean\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["separator = ",(0,r.jsx)(n.em,{children:"undefined"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"InteractionInvalidation"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"InteractionInvalidation"})}),"\n",(0,r.jsxs)(n.p,{children:["Invalidates DOM elements to be accessible for a keyboard or a screen reader. Is used by the ",(0,r.jsx)(n.a,{href:"/uilib/components/modal",children:"Modal"}),"."]}),"\n",(0,r.jsx)(n.h4,{children:"Options"}),"\n",(0,r.jsx)(n.p,{children:"Use an object with these optional parameters:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"tabIndex"}),": boolean (defaults to true) to disable ",(0,r.jsx)(n.code,{children:"tabindex"})," invalidation."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ariaHidden"}),": boolean (defaults to true) to disable ",(0,r.jsx)(n.code,{children:"aria-hidden"})," invalidation."]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { InteractionInvalidation } from '@dnb/eufemia/shared/component-helper'\n\nconst instance = new InteractionInvalidation()\n\n// do not invalidate inside here\ninstance.setBypassSelector('.dnb-modal__content *')\n\n// Enable the invalidation\ninstance.activate()\n\n// Optionally – you set a element selector – instead effecting everything inside the body\ninstance.activate('.selector')\n\n// Remove the invalidation\ninstance.revert()\n"})}),"\n",(0,r.jsx)(n.h2,{children:"General helpers"}),"\n",(0,r.jsx)(n.h3,{children:"scrollToLocationHashId"}),"\n",(0,r.jsx)(n.p,{children:"Enhance the native anchor scroll handling by providing additional features like a custom offset."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { scrollToLocationHashId } from '@dnb/eufemia/shared/helpers'\n\n// in case there is a #hash in the url\nconst elem = scrollToLocationHashId({\n  offset: 100,\n  delay: 100,\n  onCompletion: (elem) => {\n    try {\n      elem.classList.add('focus')\n    } catch (e) {\n      //\n    }\n  },\n}) // returns HTMLElement\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["offset = ",(0,r.jsx)(n.em,{children:"0"})]}),"\n",(0,r.jsxs)(n.li,{children:["delay = ",(0,r.jsx)(n.em,{children:"null"})]}),"\n",(0,r.jsxs)(n.li,{children:["onCompletion = ",(0,r.jsx)(n.em,{children:"null"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"getOffsetTop"}),"\n",(0,r.jsxs)(n.p,{children:["Get the HTML Element offset to the top of the browser window, minus ",(0,r.jsx)(n.code,{children:"offset"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { getOffsetTop } from '@dnb/eufemia/shared/helpers'\n\ngetOffsetTop(element: HTMLElement) // returns Number\n"})}),"\n",(0,r.jsx)(n.h3,{children:"applyPageFocus"}),"\n",(0,r.jsxs)(n.p,{children:["More info about that function in the ",(0,r.jsx)(n.a,{href:"/uilib/usage/accessibility/focus#focus-helper",children:"focus section about better accessibility"}),". Used together with ",(0,r.jsx)(n.a,{href:"/uilib/helpers/functions#setpagefocuselement",children:"setPageFocusElement"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { applyPageFocus } from '@dnb/eufemia/shared/helpers'\n\napplyPageFocus(selector*: String, callback*: Function)\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["selector = ",(0,r.jsx)(n.em,{children:"'default'"})," (can be a HTML element selector, starting with a ",(0,r.jsx)(n.code,{children:"."})," or ",(0,r.jsx)(n.code,{children:"#"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:["callback = ",(0,r.jsx)(n.em,{children:"null"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"setPageFocusElement"}),"\n",(0,r.jsxs)(n.p,{children:["More info about that function in the ",(0,r.jsx)(n.a,{href:"/uilib/usage/accessibility/focus#focus-helper",children:"focus section about better accessibility"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { setPageFocusElement } from '@dnb/eufemia/shared/helpers'\n\nsetPageFocusElement(selectorOrElement: String|HTMLElement, key*: String) // returns Void\n"})}),"\n",(0,r.jsx)(n.h4,{children:"* Optional values (defaults)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["key = ",(0,r.jsx)(n.em,{children:"''"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"debounce"}),"\n",(0,r.jsxs)(n.p,{children:["Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a ",(0,r.jsx)(n.code,{children:"cancel"})," method to cancel delayed func invocations."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { debounce } from '@dnb/eufemia/shared/helpers'\n\nconst debounceFunc = ({ foo }) => { ... }\n\nconst debounced = debounce(\n  debounceFunc,\n  wait = 250, // milliseconds\n  {\n    immediate = false, // execute the debounceFunc on the leading end\n    instance = null // function or class instance for \"this\"\n  } = {},\n)\n\ndebounced({ foo: 'bar'}) // delay the execution – again\n\ndebounced.cancel() // optional, cancel the execution\n"})}),"\n",(0,r.jsx)(n.h3,{children:"copyToClipboard"}),"\n",(0,r.jsx)(n.p,{children:"Copies the given string to the device's clipboard."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { copyToClipboard } from '@dnb/eufemia/shared/helpers'\n\ncopyToClipboard(string) // returns success: String|Boolean|Error\n"})}),"\n",(0,r.jsx)(n.h3,{children:"Device functions"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Function"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Parameters"}),(0,r.jsx)(n.th,{children:"Return"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isEdge"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isSafari"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isiOS"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isMac"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isWin"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isLinux"})}),(0,r.jsx)(n.td,{children:"Returns true or false, depending on the detection."}),(0,r.jsx)(n.td,{children:"none"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]})]})]}),"\n",(0,r.jsx)(n.h3,{children:"Device constants"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Constant"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Value"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_EDGE"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_SAFARI"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_IOS"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_MAC"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_WIN"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"IS_LINUX"})}),(0,r.jsx)(n.td,{children:"Gives you true or false, depending on the detection during startup."}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Boolean"})})]})]})]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(l,e)})):l(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-helpers-functions-mdx-77791b3127b7518a7f80.js.map