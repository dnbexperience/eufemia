---
showTabs: true
---

## Component helpers

All components have various function helpers, you also can use in projects.

### isTrue

Checks if a value is Truthy or Falsy.

```js
import { isTrue } from '@dnb/eufemia/shared/component-helper'

isTrue(String | Boolean | Number) // returns Boolean
```

### isTouchDevice

Checks if the target device has touch support.

```js
import { isTouchDevice } from '@dnb/eufemia/shared/component-helper'

isTouchDevice() // returns Boolean
```

### toPascalCase

Transforms a string from **snake_case** to [PascalCase](!/contribute/naming).

```js
import { toPascalCase } from '@dnb/eufemia/shared/component-helper'

toPascalCase(String) // returns String
```

### toCamelCase

Transforms a string from **snake_case** to [camelCase](!/contribute/naming).

```js
import { toCamelCase } from '@dnb/eufemia/shared/component-helper'

toCamelCase(String) // returns String
```

### toSnakeCase

Transforms a string from **PascalCase** to [snake_case](!/contribute/naming).

```js
import { toSnakeCase } from '@dnb/eufemia/shared/component-helper'

toSnakeCase(String) // returns String
```

### toKebabCase

Transforms a string from **PascalCase** to [kebab-case](!/contribute/naming).

```js
import { toKebabCase } from '@dnb/eufemia/shared/component-helper'

toKebabCase(String) // returns String
```

<!--### detectOutsideClick
Detects an click outside of the defined target HTML `element` and will then emit the `callback`. You can also provide an array with elements.

```js
detectOutsideClick(ignoreElements: HTMLElement|array, onSuccess: (event) => {...}) // returns Void
```

THIS FUNCTION WAS INCONSISTENT WITH THE FUNCTION IN component-helper.js
-->

### filterProps

Filters out unwanted entries from either an object or array.

```js
import { filterProps } from '@dnb/eufemia/shared/component-helper'

filterProps(props: Object|Array, remove*: Object|Array, allowed*: Object|Array) // returns Object|Array
```

#### \* Optional values (defaults)

- remove = _null_
- allowed = _null_

### makeUniqueId

Creates a truly unique hash.

```js
import { makeUniqueId } from '@dnb/eufemia/shared/component-helper'

makeUniqueId(prefix*: String, length*: Number) // returns String
```

#### \* Optional values (defaults)

- prefix = _''_
- length = _8_

### slugify

Breaks down phrases of words to be URI compatible. Removes special characters.

```js
import { slugify } from '@dnb/eufemia/shared/component-helper'

slugify(String) // returns String
```

### checkIfHasScrollbar

Checks if an element has a scrollbar.

```js
import { checkIfHasScrollbar } from '@dnb/eufemia/shared/component-helper'

checkIfHasScrollbar(HTMLElement) // returns Boolean
```

### convertJsxToString

Converts one or more HTMLElements to a string.

```js
import { convertJsxToString } from '@dnb/eufemia/shared/component-helper'

convertJsxToString(element: HTMLElement, separator*: String) // returns Boolean
```

#### \* Optional values (defaults)

- separator = _undefined_

### InteractionInvalidation

`InteractionInvalidation`

Invalidates DOM elements to be accessible for a keyboard or a screen reader. Is used by the [Modal](/uilib/components/modal).

#### Example

```js
import { InteractionInvalidation } from '@dnb/eufemia/shared/component-helper'

const instance = new InteractionInvalidation()

// do not invalidate inside here
instance.setBypassSelector('.dnb-modal__content *')

// Enable the invalidation
instance.activate()

// Optionally – you set a element selector – instead effecting everything inside the body
instance.activate('.selector')

// Remove the invalidation
instance.revert()
```

## General helpers

### scrollToLocationHashId

Enhance the native anchor scroll handling by providing additional features like a custom offset.

```js
import { scrollToLocationHashId } from '@dnb/eufemia/shared/helpers'

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
```

#### \* Optional values (defaults)

- offset = _0_
- delay = _null_
- onCompletion = _null_

### getOffsetTop

Get the HTML Element offset to the top of the browser window, minus `offset`.

```js
import { getOffsetTop } from '@dnb/eufemia/shared/helpers'

getOffsetTop(offset: Number) // returns Number
```

### applyPageFocus

More info about that function in the [focus section about better accessibility](/uilib/usage/accessibility/focus#focus-helper). Used together with [setPageFocusElement](/uilib/helpers/functions#setpagefocuselement).

```js
import { applyPageFocus } from '@dnb/eufemia/shared/helpers'

applyPageFocus(key*: Number, callback*: Function)
```

#### \* Optional values (defaults)

- key = _'default'_
- callback = _null_

### setPageFocusElement

More info about that function in the [focus section about better accessibility](/uilib/usage/accessibility/focus#focus-helper).

```js
import { setPageFocusElement } from '@dnb/eufemia/shared/helpers'

setPageFocusElement(selectorOrElement, key*: String) // returns Void
```

#### \* Optional values (defaults)

- key = _''_

### debounce

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a `cancel` method to cancel delayed func invocations.

```js
import { debounce } from '@dnb/eufemia/shared/helpers'

const debounceFunc = ({ foo }) => { ... }

const debounced = debounce(
  debounceFunc,
  wait = 250, // milliseconds
  {
    immediate = false, // execute the debounceFunc on the leading end
    instance = null // function or class instance for "this"
  } = {},
)

debounced({ foo: 'bar'}) // delay the execution – again

debounced.cancel() // optional, cancel the execution
```

### copyToClipboard

Copies the given string to the device's clipboard.

```js
import { copyToClipboard } from '@dnb/eufemia/shared/helpers'

copyToClipboard(string) // returns success: String|Boolean|Error
```

### Device functions

| Function   | Description                                        | Parameters | Return    |
| ---------- | -------------------------------------------------- | ---------- | --------- |
| `isIE11`   | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isEdge`   | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isSafari` | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isiOS`    | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isMac`    | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isWin`    | Returns true or false, depending on the detection. | none       | `Boolean` |
| `isLinux`  | Returns true or false, depending on the detection. | none       | `Boolean` |

### Device constants

| Constant    | Description                                                         | Value     |
| ----------- | ------------------------------------------------------------------- | --------- |
| `IS_IE11`   | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_EDGE`   | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_SAFARI` | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_IOS`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_MAC`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_WIN`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_LINUX`  | Gives you true or false, depending on the detection during startup. | `Boolean` |
