---
title: 'CSS classes'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.319Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# CSS classes

## CSS helper classes

Reusing classes in the markup instead of using SCSS extends or _mixins_ will prevent duplication in `@dnb/eufemia`. This approach also benefits your application by reusing these helper classes.

## Core style

`dnb-core-style`

Provides the core Body Style inside a wrapper, making it available for all its children. The Body Style includes the correct color, line-height, font, and a CSS reset, among other styles.

```tsx
render(
  <Wrapper className="dnb-spacing">
    <ComponentBox hideCode data-visual-test="helper-core-style">
      <div className="dnb-core-style">
        <h3 className="dnb-h--medium">
          Wrapper with the DNB Body Style (CSS reset)
        </h3>
        <p className="dnb-p">
          Read more about <code className="dnb-code">.dnb-core-style</code>{' '}
          and{' '}
          <a
            href="/uilib/usage/customisation/styling#core-style"
            className="dnb-anchor"
          >
            Use Eufemia Styles elsewhere
          </a>
        </p>
      </div>
    </ComponentBox>
  </Wrapper>
)
```

## Tab focus

`dnb-tab-focus`

Removes the default focus outline from a focusable element and adds a custom visual focus state when focused by a tab key.
There is also:

- `dnb-mouse-focus`
- `dnb-focus-ring`
- `dnb-no-focus`

```tsx
render(
  <Wrapper className="dnb-spacing">
    <ComponentBox hideCode data-visual-test="helper-tap-focus">
      <details>
        <summary className="dnb-tab-focus">
          Try to focus me with the Tab key
        </summary>
        My main focus state has been removed and replaced by the helping class{' '}
        <code className="dnb-code">.dnb-tab-focus</code>
      </details>
    </ComponentBox>
  </Wrapper>
)
```

## Skip link

`dnb-skip-link`

A default Skip Link style for adding a link at the top of each page that goes directly to the main content area.

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

Sets default spacing (using _margin_) on all HTML elements inside the container with this style. The default spacing is `margin-bottom: 1.5rem`, but specific margins are defined for headings, lists, and tables.

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

Visually hide an element while keeping it accessible to screen readers. (_sr_ stands for _Screen Reader_)

```tsx
render(
  <Wrapper className="dnb-spacing">
    <ComponentBox hideCode data-visual-test="helper-sr-only">
      <p className="dnb-p">
        Hidden text
        <span className="dnb-sr-only">
          I am only visible to screen readers, so you probably can't see
          me. Unless you're using a screen reader.
        </span>!
      </p>
    </ComponentBox>
  </Wrapper>
)
```

## Drop shadow

`dnb-drop-shadow`

Adds a default drop shadow (`box-shadow: 0 8px 16px rgba(51, 51, 51, 0.08)`) to the component. The current shadow specification is designed to be softer and more blurred.

### CSS properties

The DNB Drop shadow is also available as a CSS Custom Property:

```ts
import properties from '@dnb/eufemia/style/themes/theme-ui/properties.js'

const cssBoxShadow = properties['--shadow-default']
```

If you only want to apply parts of the property, these are available as well:

- `--shadow-default-x: 0;`
- `--shadow-default-y: 8px;`
- `--shadow-default-blur-radius: 16px;`
- `--shadow-default-color: rgba(51, 51, 51, 0.08);`

## Sharp drop shadow

`dnb-sharp-drop-shadow`

Adds a smaller but sharper drop shadow (`box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16)`) to the component. Designed for hovering elements such as dropdowns or calendars.

### CSS properties

The DNB Sharp drop shadow is also available as a CSS Custom Property:

```ts
import properties from '@dnb/eufemia/style/themes/theme-ui/properties.js'

const cssBoxShadow = properties['--shadow-sharp']
```

If you only want to apply parts of the property, these are available as well:

- `--shadow-sharp-x: 0;`
- `--shadow-sharp-y: 1px;`
- `--shadow-sharp-blur-radius: 6px;`
- `--shadow-sharp-color: rgba(0, 0, 0, 0.16);`

## Responsive component

`dnb-responsive-component`

Makes some form components, like [Input](/uilib/components/input), react to small-sized screens. Since this can have negative effects when enabled by default, you can enable it optionally using this helper class.

## Unstyled list

`dnb-unstyled-list`

Removes default styling for lists. Applies to the `ul` or `ol` elements.

```tsx
render(
  <Wrapper className="dnb-spacing">
    <ComponentBox hideCode data-visual-test="helper-unstyled-list">
      <ul className="dnb-unstyled-list">
        <li>I'm an unstyled list item</li>
        <li>Me too!</li>
      </ul>
      <hr className="dnb-hr" />
      <ul className="dnb-ul">
        <li>But I'm not.</li>
      </ul>
    </ComponentBox>
  </Wrapper>
)
```

## Selection

`dnb-selection`

Applies the DNB selection colors to selected content.

Eufemia uses custom `::selection` colors to enhance contrast and work well with the many green colors.
Every HTML class that starts with the prefix `dnb-` will be affected. In some circumstances, you can simply use the `.dnb-selection` class, which applies the styles below on `::selection`.

```scss
background-color: var(--color-mint-green);
color: var(--color-black);
text-shadow: none;
```

```tsx
render(
  <Wrapper className="dnb-spacing">
    <ComponentBox hideCode data-visual-test="helper-selection">
      <p className="dnb-selection dnb-t__size--basis">
        If you select a part of this text, you will see the selection
        highlight is green.
      </p>
    </ComponentBox>
  </Wrapper>
)
```

## HTML class naming

To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`. Read more about that in the [Naming conventions](/contribute/style-guides/naming).
