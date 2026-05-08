import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Functions`}),`
`,(0,n.jsx)(r.h2,{children:`Component helpers`}),`
`,(0,n.jsx)(r.p,{children:`All components provide various function helpers that you can also use in your projects.`}),`
`,(0,n.jsx)(r.h3,{children:`isTouchDevice`}),`
`,(0,n.jsx)(r.p,{children:`Checks if the target device has touch support.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { isTouchDevice } from '@dnb/eufemia/shared/component-helper'

isTouchDevice() // returns Boolean
`})}),`
`,(0,n.jsx)(r.h3,{children:`toPascalCase`}),`
`,(0,n.jsxs)(r.p,{children:[`Transforms a string from `,(0,n.jsx)(r.strong,{children:`snake_case`}),` to `,(0,n.jsx)(r.a,{href:`/contribute/style-guides/naming`,children:`PascalCase`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { toPascalCase } from '@dnb/eufemia/shared/component-helper'

toPascalCase(String) // returns String
`})}),`
`,(0,n.jsx)(r.h3,{children:`toKebabCase`}),`
`,(0,n.jsxs)(r.p,{children:[`Transforms a string from `,(0,n.jsx)(r.strong,{children:`PascalCase`}),` to `,(0,n.jsx)(r.a,{href:`/contribute/style-guides/naming`,children:`kebab-case`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { toKebabCase } from '@dnb/eufemia/shared/component-helper'

toKebabCase(String) // returns String
`})}),`
`,(0,n.jsx)(r.h3,{children:`filterProps`}),`
`,(0,n.jsx)(r.p,{children:`Filters out unwanted entries from either an object or array.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { filterProps } from '@dnb/eufemia/shared/component-helper'

filterProps(props: Object|Array, remove*: Object|Array|Function, allowed*: Object|Array|Function) // returns Object|Array
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`remove = `,(0,n.jsx)(r.em,{children:`null`})]}),`
`,(0,n.jsxs)(r.li,{children:[`allowed = `,(0,n.jsx)(r.em,{children:`null`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`makeUniqueId`}),`
`,(0,n.jsx)(r.p,{children:`Creates a truly unique hash.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { makeUniqueId } from '@dnb/eufemia/shared/component-helper'

makeUniqueId(prefix*: String, length*: Number) // returns String
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`prefix = `,(0,n.jsx)(r.em,{children:`''`})]}),`
`,(0,n.jsxs)(r.li,{children:[`length = `,(0,n.jsx)(r.em,{children:`8`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`slugify`}),`
`,(0,n.jsx)(r.p,{children:`Breaks down phrases of words to be URI compatible. Removes special characters.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { slugify } from '@dnb/eufemia/shared/component-helper'

slugify(String) // returns String
`})}),`
`,(0,n.jsx)(r.h3,{children:`checkIfHasScrollbar`}),`
`,(0,n.jsx)(r.p,{children:`Checks if an element has a scrollbar.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { checkIfHasScrollbar } from '@dnb/eufemia/shared/component-helper'

checkIfHasScrollbar(HTMLElement) // returns Boolean
`})}),`
`,(0,n.jsx)(r.h3,{children:`convertJsxToString`}),`
`,(0,n.jsx)(r.p,{children:`Converts one or more HTMLElements to a string.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { convertJsxToString } from '@dnb/eufemia/shared/component-helper'

convertJsxToString(element: HTMLElement, separator*: String) // returns String
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`separator = `,(0,n.jsx)(r.em,{children:`undefined`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`InteractionInvalidation`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`InteractionInvalidation`})}),`
`,(0,n.jsxs)(r.p,{children:[`Invalidates DOM elements so they are not accessible to a keyboard or a screen reader. This is used by the `,(0,n.jsx)(r.a,{href:`/uilib/components/modal`,children:`Modal`}),`.`]}),`
`,(0,n.jsx)(r.h4,{children:`Options`}),`
`,(0,n.jsx)(r.p,{children:`Use an object with these optional parameters:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`tabIndex`}),`: boolean (defaults to true) to disable `,(0,n.jsx)(r.code,{children:`tabindex`}),` invalidation.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`ariaHidden`}),`: boolean (defaults to true) to disable `,(0,n.jsx)(r.code,{children:`aria-hidden`}),` invalidation.`]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`Example`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { InteractionInvalidation } from '@dnb/eufemia/shared/component-helper'

const instance = new InteractionInvalidation()

// Avoid invalidating inside here
instance.setBypassSelector('.dnb-modal__content *')

// Enable the invalidation
instance.activate()

// Optionally, set an element selector instead of affecting everything inside the body
instance.activate('.selector')

// Remove the invalidation
instance.revert()
`})}),`
`,(0,n.jsx)(r.h2,{children:`General helpers`}),`
`,(0,n.jsx)(r.h3,{children:`scrollToLocationHashId`}),`
`,(0,n.jsx)(r.p,{children:`Enhance the native anchor scroll handling by providing additional features like a custom offset.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { scrollToLocationHashId } from '@dnb/eufemia/shared/helpers'

// in case there is a #hash in the url
const elem = scrollToLocationHashId({
  offset: 100,
  delay: 100,
  onCompletion: (elem) => {
    try {
      elem.classList.add('focus')
    } catch (e) {
      //
    }
  },
}) // returns HTMLElement
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`offset = `,(0,n.jsx)(r.em,{children:`0`})]}),`
`,(0,n.jsxs)(r.li,{children:[`delay = `,(0,n.jsx)(r.em,{children:`null`})]}),`
`,(0,n.jsxs)(r.li,{children:[`onCompletion = `,(0,n.jsx)(r.em,{children:`null`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`getOffsetTop`}),`
`,(0,n.jsxs)(r.p,{children:[`Get the HTML Element offset to the top of the browser window, minus `,(0,n.jsx)(r.code,{children:`offset`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { getOffsetTop } from '@dnb/eufemia/shared/helpers'

getOffsetTop(element: HTMLElement) // returns Number
`})}),`
`,(0,n.jsx)(r.h3,{children:`applyPageFocus`}),`
`,(0,n.jsxs)(r.p,{children:[`More info about that function in the `,(0,n.jsx)(r.a,{href:`/uilib/usage/accessibility/focus#focus-helper`,children:`focus section about better accessibility`}),`. Used together with `,(0,n.jsx)(r.a,{href:`/uilib/helpers/functions#setpagefocuselement`,children:`setPageFocusElement`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { applyPageFocus } from '@dnb/eufemia/shared/helpers'

applyPageFocus(selector*: String, callback*: Function)
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`selector = `,(0,n.jsx)(r.em,{children:`'default'`}),` (can be an HTML element selector, starting with a `,(0,n.jsx)(r.code,{children:`.`}),` or `,(0,n.jsx)(r.code,{children:`#`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`callback = `,(0,n.jsx)(r.em,{children:`null`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`setPageFocusElement`}),`
`,(0,n.jsxs)(r.p,{children:[`More info about that function in the `,(0,n.jsx)(r.a,{href:`/uilib/usage/accessibility/focus#focus-helper`,children:`focus section about better accessibility`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { setPageFocusElement } from '@dnb/eufemia/shared/helpers'

setPageFocusElement(selectorOrElement: String|HTMLElement, key*: String) // returns Void
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`key = `,(0,n.jsx)(r.em,{children:`''`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`debounce`}),`
`,(0,n.jsxs)(r.p,{children:[`Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a `,(0,n.jsx)(r.code,{children:`cancel`}),` method to cancel delayed func invocations.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { debounce } from '@dnb/eufemia/shared/helpers'

const debounceFunc = ({ foo }) => { ... }

const debounced = debounce(
  debounceFunc,
  wait = 500, // milliseconds
  {
    immediate = false, // execute the debounceFunc on the leading edge
  } = {},
)

debounced({ foo: 'bar' }) // Delay the execution again

debounced.cancel() // optional, cancel the execution
`})}),`
`,(0,n.jsx)(r.p,{children:`Async example:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { debounceAsync } from '@dnb/eufemia/shared/helpers'

async function debounceFunc({ foo }) {
  // Optionally, add a cancel event (wasCanceled is a function to check later if it was canceled)
  const wasCanceled = this.addCancelEvent(myCancelMethod)

  await wait(1000) // Do something async
}

const myCancelMethod = () => {
  console.log('canceled')
}

const debounced = debounceAsync(
  debounceFunc,
  (wait = 500) // milliseconds
)

debounceAsync({ foo: 'bar' }) // Delay the execution again

debounced.cancel() // Optional: cancel the execution
debounced.addCancelEvent(myCancelMethod) // Alternatively, you can add the cancel event like this
`})}),`
`,(0,n.jsxs)(r.p,{children:[`In order to use `,(0,n.jsx)(r.code,{children:`this.addCancelEvent`}),`, you need to use a `,(0,n.jsx)(r.code,{children:`function()`}),` and not an arrow function.`]}),`
`,(0,n.jsx)(r.h3,{children:`copyToClipboard`}),`
`,(0,n.jsx)(r.p,{children:`Copies the given string to the device's clipboard.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { copyToClipboard } from '@dnb/eufemia/shared/helpers'

copyToClipboard(string) // returns success: String|Boolean|Error
`})}),`
`,(0,n.jsx)(r.h3,{children:`Device functions`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Function`}),(0,n.jsx)(r.th,{children:`Description`}),(0,n.jsx)(r.th,{children:`Parameters`}),(0,n.jsx)(r.th,{children:`Return`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`isSafari`})}),(0,n.jsx)(r.td,{children:`Returns true or false, depending on the detection.`}),(0,n.jsx)(r.td,{children:`none`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`isiOS`})}),(0,n.jsx)(r.td,{children:`Returns true or false, depending on the detection.`}),(0,n.jsx)(r.td,{children:`none`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`isMac`})}),(0,n.jsx)(r.td,{children:`Returns true or false, depending on the detection.`}),(0,n.jsx)(r.td,{children:`none`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`isWin`})}),(0,n.jsx)(r.td,{children:`Returns true or false, depending on the detection.`}),(0,n.jsx)(r.td,{children:`none`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`isLinux`})}),(0,n.jsx)(r.td,{children:`Returns true or false, depending on the detection.`}),(0,n.jsx)(r.td,{children:`none`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`Device constants`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Constant`}),(0,n.jsx)(r.th,{children:`Description`}),(0,n.jsx)(r.th,{children:`Value`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`IS_SAFARI`})}),(0,n.jsx)(r.td,{children:`Gives you true or false, depending on the detection during startup.`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`IS_IOS`})}),(0,n.jsx)(r.td,{children:`Gives you true or false, depending on the detection during startup.`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`IS_MAC`})}),(0,n.jsx)(r.td,{children:`Gives you true or false, depending on the detection during startup.`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`IS_WIN`})}),(0,n.jsx)(r.td,{children:`Gives you true or false, depending on the detection during startup.`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`IS_LINUX`})}),(0,n.jsx)(r.td,{children:`Gives you true or false, depending on the detection during startup.`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`Boolean`})})]})]})]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};