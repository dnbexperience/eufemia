## Helper functions

All components have various function helpers, you also can use in projects. This is totally optional and not really a part of the Design System. All the functions have unit and integration tests in place, se `/src/shared/__tests__/component-helper.test.js`.

### Example ES import

```js
import { makeUniqueId } from 'dnb-ui-lib/shared/component-helper'
```

### Functions

| Function             | Description                                                                                      | Parameters                                                                       | Return            |
| -------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------- |
| `isTrue`             | Checks if a value is Truthy or Falsy.                                                            | `[string or boolean or number]`                                                  | `boolean`         |
| `isTouchDevice`      | Checks if the target device has touch support.                                                   |                                                                                  | `boolean`         |
| `toPascalCase`       | Transforms a string containing several words to a [pascalCase](!/uilib/development/naming).      | `[string]`                                                                       | `string`          |
| `detectOutsideClick` | Detects an click outside of the defined target HTML `element` and will then emit the `callback`. | `[element, callback({ event })]`                                                 | `void`            |
| `filterProps`        | Filters out unwanted entries from either an object or array.                                     | `[props={object or array}, remove={object or array}, allowed={object or array}]` | `object or array` |
| `makeUniqueId`       | Creates a truly unique hash.                                                                     | `[prefix='', length=8]`                                                          | `string`          |
| `slugify`            | Breaks down phrases of words to be URI compatible. Removes special characters.                   | `[string]`                                                                       | `string`          |

<!-- extend,
extendPropsWithContext, -->
