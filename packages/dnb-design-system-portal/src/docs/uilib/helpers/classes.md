---
showTabs: true
---

import {
CoreStyleExample,
TabFocusExample,
UnstyledListExample,
ScreenReaderOnlyExample,
NoScreenReaderExample,
SelectionExample
} from 'Docs/uilib/helpers/Examples'
import SkipLinkExample from 'Docs/uilib/usage/accessibility/examples/skip-link-example.js'

## Description

Reusing classes in the markup instead of using SCSS extends or _mixins_ will prevent duplication in the `@dnb/eufemia`. So also your application will have good benefits from reusing these helper classes.

## Core style

`dnb-core-style`

In order to be able to have the core Body Style inside a wrapper and available for all its children. The Body Style contains among others styles, the correct color, line-height, font and a CSS reset.

### Example

<CoreStyleExample />

## Tab focus

`dnb-tab-focus`

Removes default focus outline from a focusable element and adds a custom visual focus state when is focused by a tab key.
There is also:

- `dnb-mouse-focus`
- `dnb-focus-ring`
- `dnb-no-focus`

### Example

<TabFocusExample />

## Skip link

`dnb-skip-link`

A default Skip Link style, for adding a link at the top of each page that goes directly to the main content area.

### Example

<SkipLinkExample />

```html
<body>
  <a class="dnb-skip-link" href="#content-id">Skip to content</a>
  <header>
    <nav>
      <!-- Nav links or content to skip -->
    </nav>
  </header>
  <main id="content-id">
    <!-- Content goes here -->
  </main>
</body>
```

More details in the [Focus Section](/uilib/usage/accessibility/focus#skip-link).

## Spacing

`dnb-spacing`

Sets default spacing (using _margin_) on all HTML elements inside the container with this style. The default spacing is a `margin-bottom: 1.5rem`, but specific margins are defined for headings, lists and tables.

### Example

```html
<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1 class="dnb-h--xx-large">
    e.g. I have now the Eufemia spacing (margin)
  </h1>
  <p class="dnb-p">👉 Me as well</p>
</article>
```

More details in [Styling](/uilib/usage/customisation/styling#spacing).

## Scrollbar appearance

`dnb-scrollbar-appearance`

Define the DNB scrollbar appearance, including the color `--color-emerald-green` with `transparent`.

NB: Browser support is not fully covered (2021).

## Screen Reader (sr) only

`dnb-sr-only`

Visually hides an element, but is still reachable by screen readers. (_sr_ stands for _Screen Reader_)

### Example

<ScreenReaderOnlyExample />

### Screen Reader only: inline

`dnb-sr-only--inline` (deprecated in v10)

Like `dnb-sr-only` - but with flow elements in mind. This enables a set of text (in a paragraph `<p>`) to be enhanced with spans inside without NVDA to split up reading the text.

### Not Screen Reader only

`dnb-not-sr-only` (deprecated in v10)

The opposite of `dnb-sr-only`, so not visible to screen readers.

```html
<p>text <span class="dnb-sr-only--inline">sr-only</span> text</p>
```

<NoScreenReaderExample />

## Drop shadow

`dnb-drop-shadow`

Adds a default drop shadow, `box-shadow: 0 8px 16px rgba(51, 51, 51, 0.08)`, to the component. The current shadow specification is designed to be less sharp and more blurry.

### CSS properties

The DNB Drop shadow is also available as a CSS Custom Property:

```js
import properties from '@dnb/eufemia/style/properties.js'

const cssBoxShadow = properties['--shadow-default']
```

If you only want to apply parts of the property, these are available as well:

- `--shadow-default-x: 0;`
- `--shadow-default-y: 8px;`
- `--shadow-default-blur-radius: 16px;`
- `--shadow-default-color: rgba(51, 51, 51, 0.08);`

## Responsive component

`dnb-responsive-component`

Makes some component form components, like [Input](/uilib/components/input) react to small sized screens. But as this can have some negative effects to have this enabled by default, you can enable this optionally using this helper class.

## Unstyled list

`dnb-unstyled-list`

Removes default styling for lists. Applies to the `ul` or `ol` elements.

### Example

<UnstyledListExample />

## Selection

`dnb-selection`

Applies the DNB selection colors to the selected content.

Eufemia uses custom `::selection` colors to enhance the contrast and to play well against the many green colors.
Every HTML class that starts with the prefix `dnb-` will be effected. In some circumstances you can simply make use of the class `.dnb-selection`, which applies the styles below on `::selection`.

```css
background-color: var(--color-mint-green);
color: var(--color-black);
text-shadow: none;
```

### Example

<SelectionExample />

## HTML class naming

To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`. Read more about that in the [Naming conventions](/contribute/naming).

### SASS and mixins

All CSS helper classes are to be found in `src/style/core/helper-classes/helper-classes.scss`
Most helper classes are SCSS _mixins_ which are then applied to the class when invoked.

You can import Eufemia _mixins_ directly into your SCSS styles:

```scss
@import '@dnb/eufemia/style/core/utilities.scss';

/** State handling */
@include hover {
}
@include focus {
}
@include active {
}

/** Media Queries and Breakpoints */
@include allBelow(large) {
}
@include allAbove(small) {
}

/** Screen Reader Only */
@include srOnly() {
} // .dnb-sr-only
@include srOnlyInline() {
} // .dnb-sr-only--inline

/** Browser Checks */
@include IS_IE {
}
@include IS_EDGE {
}
@include IS_FF {
}
@include IS_CHROME {
}
@include IS_SAFARI_MOBILE {
}
@include IS_SAFARI_DESKTOP {
}

/** Eufemia DropShadow */
@include defaultDropShadow();

/** Eufemia Border helpers */
@include fakeFocus(
  /* $whatinput: 'keyboard', $color: var(--color-emerald-green), $inset: inset */
);
@include fakeBorder(
  /* $color: var(--color-emerald-green), $width: 0.0625rem, $inset: inset */
);
@include extendFakeFocus(
  /* $first-color: null, $second-color: null, width: 0.0625rem */
);

/** Scroll behavior */
@include scrollY(/* $mode: scroll */);
@include scrollX(/* $mode: scroll */);
@include hideScrollbar();
@include scrollbarAppearance();
```
