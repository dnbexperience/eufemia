import Examples from 'Pages/uilib/helpers/Examples'

## CSS helper classes

Reusing classes in the markup instead of using SCSS extends or _mixins_ will prevent duplication in the `dnb-ui-lib`. So also your application will have good benefits from reusing these helper classes.

| Selector               | Description                                                                                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dnb-core-style`       | In order to be able to have the core Body Style inside a wrapper and available for all its children. The Body Style contains among others stlyes, both the correct line-height and a CSS reset.                                                                 |
| `dnb-tab-focus`        | Removes default focus outline from a focusable element and adds a custom visual focus state when is focused by a tab key. There is also: `dnb-mouse-focus`, `dnb-focus-ring` and `dnb-no-focus`                                                                 |
| `dnb-skip-link`        | A default Skip Link style. More details in the [Focus Secion](/uilib/usage/accessibility/focus#skip-link)                                                                                                                                                       |
| `dnb-spacing`          | Default spacing styles. More details in [Styling](/uilib/usage/customisation/styling#spacing)                                                                                                                                                                   |
| `dnb-sr-only`          | Visually hides an element, but is still reachable by screen readers. (_sr_ stands for _Screen Reader_)                                                                                                                                                          |
| `dnb-not-sr-only`      | The opposite of `dnb-sr-only`                                                                                                                                                                                                                                   |
| `dnb-unstyled-list`    | Removes default styling for lists. Applies to the `ul` or `ol` elements                                                                                                                                                                                         |
| `dnb-hide-on-mobile`   | Hides element on screens that are below the `medium` size. This value of `medium` can be found in `css/core/utilities.scss`                                                                                                                                     |
| `dnb-mobile-exclusive` | The opposite of `dnb-hide-on-mobile`, which means it will only be visible on screens up to the size of `medium | |`dnb-width-limit`| Our main wrapping class for containers. It has a max-width and a left and right padding which varies based on screen sizes |
| `dnb-belt`             | A wrapping class which adds a background color and padding to top and bottom                                                                                                                                                                                    |
| `dnb-nudge`            | A visual nudging tool. It has a modifying class which tells the element if it should expand horizontally or vertically. **NB! Use with caution!**                                                                                                               |

### More about `dnb-nudge`

It also has a data attribute which takes the amount of nudges. One nudge = `1rem`, two nudges = `3rem`. It takes up to `10 nudges`. See example for usage.

### HTML class naming

To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`. Read more about that in the [Naming conventions](/uilib/development/naming).

### SASS and mixins

All CSS helper classes are to be found in `src/style/core/helper-classes.scss`

Most helper classes are SCSS _mixins_ which are then applied to the class when invoked. The helper _mixins_ can be found in `src/style/core/utilities.scss`.

Currently the SASS files are not included in the `dnb-ui-lib`.

## Examples

<Examples />
