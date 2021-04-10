---
showTabs: true
---

import CSSHelperClassesExamples from 'Pages/uilib/helpers/css-examples'

## CSS helper classes

Reusing classes in the markup instead of using SCSS extends or _mixins_ will prevent duplication in the `@dnb/eufemia`. So also your application will have good benefits from reusing these helper classes.

| Selector                   | Description                                                                                                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dnb-core-style`           | In order to be able to have the core Body Style inside a wrapper and available for all its children. The Body Style contains among others styles, both the correct line-height and a CSS reset.                                                        |
| `dnb-tab-focus`            | Removes default focus outline from a focusable element and adds a custom visual focus state when is focused by a tab key. There is also: `dnb-mouse-focus`, `dnb-focus-ring` and `dnb-no-focus`                                                        |
| `dnb-skip-link`            | A default Skip Link style. More details in the [Focus Section](/uilib/usage/accessibility/focus#skip-link)                                                                                                                                             |
| `dnb-spacing`              | Default spacing styles. More details in [Styling](/uilib/usage/customisation/styling#spacing)                                                                                                                                                          |
| `dnb-scrollbar-appearance` | Define the DNB scrollbar appearance, including the color.                                                                                                                                                                                              |
| `dnb-sr-only`              | Visually hides an element, but is still reachable by screen readers. (_sr_ stands for _Screen Reader_)                                                                                                                                                 |
| `dnb-sr-only--inline`      | Like `dnb-sr-only` - but with flow elements in mind. This enables a set of text (in a paragraph `<p>`) to be enhanced with spans inside `<p>text <span class="dnb-sr-only--inline">sr-only</span> text</p>` without NVDA to split up reading the text. |
| `dnb-drop-shadow`          | Adds the default drop shadow used in the components.                                                                                                                                                                                                   |
| `dnb-responsive-component` | Makes some component form components, like [Input](/uilib/components/input) react to mobile sized screens. But as this can have some negative effects to have this enabled by default, you can enable this optionally using this helper class.         |
| `dnb-unstyled-list`        | Removes default styling for lists. Applies to the `ul` or `ol` elements                                                                                                                                                                                |
| `dnb-selection`            | Applies the DNB selection colors to the selected content. More notes below.                                                                                                                                                                            |

## Selection color

Eufemia uses custom `::selection` colors to enhance the contrast and to play well against the many green colors.
Every HTML class that starts with the prefix `dnb-` will be effected. In some circumstances you can simply make use of the class `.dnb-selection`.

### HTML class naming

To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`. Read more about that in the [Naming conventions](/uilib/development/naming).

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

## Examples

<CSSHelperClassesExamples />
