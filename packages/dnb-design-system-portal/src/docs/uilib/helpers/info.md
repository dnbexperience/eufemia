---
showTabs: true
---

## Description

All the [components](/uilib/components) do share a couple of common used helpers. Your application can also use these helpers, but it's totally optional.

## CSS properties

### Animation Easing

You can use the internal Eufemia easing function.

```css
.animation-element {
  transition: transform 400ms var(--easing-default);
}
```

## CSS classes

- [dnb-core-style](/uilib/helpers/classes#core-style): A CSS-reset and core styling, including font, line-height and color.
- [dnb-tab-focus](/uilib/helpers/classes#tab-focus): Adds a custom visual focus state on tab focus.
- [dnb-skip-link](/uilib/helpers/classes#skip-link): For adding a link at the top of each page that goes directly to the main content area.
- [dnb-spacing](/uilib/helpers/classes#spacing): Sets a default spacing on all nested HTML elements.
- [dnb-scrollbar-appearance](/uilib/helpers/classes#scrollbar-appearance): Defines the DNB scrollbar appearance.
- [dnb-sr-only](/uilib/helpers/classes#screen-reader-sr-only): An element that is reachable by screen readers, but is visually hidden.
- [dnb-drop-shadow](/uilib/helpers/classes#drop-shadow): Adds the default drop shadow to the component.
- [dnb-responsive-component](/uilib/helpers/classes#drop-shadow): Makes the component react to small sized screens.
- [dnb-selection](/uilib/helpers/classes#selection): Applies DNB selection colors to selected content

## Functions

- [isTrue](/uilib/helpers/functions#istrue): Checks if a value is Truthy.
- [isTouchDevice](/uilib/helpers/functions#istouchdevice): Checks if the target device has touch support.
- [toPascalCase](/uilib/helpers/functions#topascalcase): Transforms snake_case to PascalCase.
- [toCamelCase](/uilib/helpers/functions#tocamelcase): Transforms snake_case to camelCase.
- [toSnakeCase](/uilib/helpers/functions#tosnakecase): Transforms PascalCase to snake_case.
- [toKebabCase](/uilib/helpers/functions#tokebabcase): Transforms PascalCase to kebab-case.
- [filterProps](/uilib/helpers/functions#filterprops): Filter out unwanted entries from either an object or an array.
- [makeUniqueId](/uilib/helpers/functions#makeuniqueid): Creates a unique hash string.
- [slugify](/uilib/helpers/functions#slugify): Breaks down phrases of words to be URI compatible.
- [checkIfHasScrollbar](/uilib/helpers/functions#checkifhasscrollbar): Check if an element has a scrollbar.
- [convertJsxToString](/uilib/helpers/functions#convertjsxtostring): Convert one or more HTMLElements to a string.
- [InteractionInvalidation](/uilib/helpers/functions#interactioninvalidation): Invalidates DOM elements to be accessible for keyboard or screen reader.
- [scrollToLocationHashId](/uilib/helpers/functions#scrolltolocationhashid): Scroll to a given HashId with optional offset and delay
- [getOffsetTop](/uilib/helpers/functions#getoffsettop): Get the HTML Element offset to the top of the browser window.
- [applyPageFocus](/uilib/helpers/functions#applypagefocus): Applies a page focus to an element given by the setPageFocusElement.
- [setPageFocusElement](/uilib/helpers/functions#setpagefocuselement): Defines a focus element to applyPageFocus.
- [debounce](/uilib/helpers/functions#debounce): Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
- [copyToClipboard](/uilib/helpers/functions#copytoclipboard): Copies a given string to clipboard.

### Device checks

Find out which device your user is currently on using the [Device functions](/uilib/helpers/functions#device-functions).

Or use the built-in [Device constants](/uilib/helpers/functions#device-constants).
