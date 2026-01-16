---
title: 'Anchor (Text Link)'
description: 'The Anchor, also known as "Link" is used to navigate from one page to the next HTML page.'
metadata: https://eufemia.dnb.no/uilib/components/anchor/metadata.json
---

## Import

```tsx
import { Anchor } from '@dnb/eufemia'
```

## Description

The Anchor, also known as `Link`, is used to navigate from one page to the next HTML page.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1500&p=f&t=hDnIGm5ME8DL6NoN-0)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/anchor)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/anchor)

```jsx
import { Link, Anchor } from '@dnb/eufemia'
render(<Anchor href="/uilib/components/anchor">Accessible text</Anchor>)
```

### Combine a Link with an Anchor

You can combine a meta framework link with the Anchor. This way, all the framework-provided features will still work, as well as the behavior of the Eufemia Anchor.

```jsx
import Anchor from '@dnb/eufemia/components/Anchor'
import { Link } from 'gatsby'

render(
  <App>
    <Anchor element={Link} to="/path">
      Link
    </Anchor>
  </App>,
)
```

## Blank target

**NB:** If you only use a vanilla HTML anchor element including `target="_blank"`, then you have to ensure you add a `title` attribute that includes `Opens a new Window` or as part of the text:

```html
<a
  title="Opens a new Window"
  target="_blank"
  href="https://"
  class="dnb-anchor"
>
  text (opens in new window)
</a>
```

## Demos

### Basic usage

The basic use of `<Anchor>` is identical to the `<a>` tag.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="anchor-basic">
      <P>
        This is a regular paragraph with a{' '}
        <Anchor href="https://dnb.no/">link to a website</Anchor> in the
        middle of some text.
      </P>
    </ComponentBox>
  </Wrapper>,
)
```

### With icon

Icons can be added with the `icon` and `iconPosition` properties. Normally by sending in the name if an icon, but it is also possible to send in html/react code (normally for custom svg).

For Sbanken, links with icons have a slightly different styling that is
not intended to be used in a regular paragraph. The class
`.dnb-anchor--inline` can be used to force default styling even if there
is an icon.

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
    >
      <Example data-visual-test="anchor-icon-right">
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Anchor with icon right
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-icon-left">
        <Anchor href="/uilib/components/anchor" icon="chevron_right">
          Anchor with icon left
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-icon-node">
        <Anchor
          href="/uilib/components/anchor"
          icon={<IconPrimary icon="question" />}
        >
          Anchor with icon left using a html/react element
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-paragraph">
        <P>
          A text paragraph with an{' '}
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
            className="dnb-anchor--inline"
          >
            anchor with icon
          </Anchor>{' '}
          in it.
        </P>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

### Additional Anchor helper classes

To force a specific state of style, use the following classes to do so:

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
        ContrastExample,
      }}
    >
      <ContrastExample data-visual-test="anchor-contrast">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--contrast"
        >
          Contrast Style
        </Anchor>
      </ContrastExample>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-underline"
        >
          No underline
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-icon">
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          className="dnb-anchor--no-icon"
        >
          Blank target without launch icon
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-hover">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-hover"
        >
          No hover
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-radius"
        >
          No border-radius
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-animation"
        >
          No animation
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-style">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-style"
        >
          Reset anchor style
        </Anchor>
      </Example>
      <Example>
        <button className="dnb-anchor">I'm a Button!</button>
      </Example>
      <Example data-visual-test="anchor-newline">
        <Anchor href="/uilib/components/anchor">
          Newline <br />
          Newline
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-skeleton">
        <Anchor skeleton href="/uilib/components/anchor">
          Skeleton
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

### Anchor modifier properties

- `noAnimation` - <a href="/uilib/components/anchor" className="dnb-anchor dnb-anchor--no-animation">No Animation</a>
- `noStyle` - <a href="/uilib/components/anchor" className="dnb-anchor dnb-anchor--no-style">No Style</a>
- `noHover` - <a href="/uilib/components/anchor" className="dnb-anchor dnb-anchor--no-hover">No Hover</a>
- `noUnderline` - <a href="/uilib/components/anchor" className="dnb-anchor dnb-anchor--no-underline">No Underline</a>

### Anchor with `target="_blank"`

If the link opens a new window it will automatically get an icon to indicate this.

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
    >
      <Example data-visual-test="anchor-blank">
        <Anchor target="_blank" href="/uilib/components/anchor">
          Blank target with https
        </Anchor>
      </Example>
      <Example>
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Blank target with different launch icon
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-blank-icon-left">
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          icon="bell"
          iconPosition="left"
        >
          Blank target with icon to the left
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

Unless the href contains `:mailto`, `:tel` or `:sms`.

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
      data-visual-test="anchor-protocol"
    >
      <Example>
        <Anchor target="_blank" href="mailto:john.doe@email.com">
          Send a mail to: john.doe@email.com
        </Anchor>
      </Example>
      <Example>
        <Anchor target="_blank" href="tel:12345678">
          Make a phone call to: 12345678
        </Anchor>
      </Example>
      <Example>
        <Anchor target="_blank" href="sms:12345678">
          Send an SMS to: 12345678
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

### Anchor in headings

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
    >
      <Example data-visual-test="anchor-heading">
        <H2>
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
          >
            Inside Headings
          </Anchor>{' '}
          H2
        </H2>
      </Example>
      <Example data-visual-test="anchor-heading-blank">
        <H2>
          <Anchor target="_blank" href="/uilib/components/anchor">
            Blank target in headings
          </Anchor>{' '}
          H2
        </H2>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

### Anchor in Section

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="anchor-in-section">
      <Section spacing>
        <Anchor
          className="dnb-anchor--no-underline"
          href="https://dnb.no/"
        >
          Anchor in Section without underline
        </Anchor>
      </Section>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        Example,
      }}
      data-visual-test="anchor-states"
    >
      <Example>
        <Anchor href="/uilib/components/anchor">Default Style</Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--hover"
        >
          Hover Style
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--active"
        >
          Active Style
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--focus"
        >
          Focus Style
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
    >
      <Example data-visual-test="anchor-legacy-icon">
        <Anchor href="/uilib/components/anchor">
          Anchor with Icon <IconPrimary icon="chevron_right" />
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-legacy-paragraph">
        <P>
          text{' '}
          <Anchor href="/uilib/components/anchor">
            Inside a Paragraph <IconPrimary icon="bell" />
          </Anchor>{' '}
          text
        </P>
      </Example>
      <Example data-visual-test="anchor-legacy-blank-with-icon">
        <Anchor target="_blank" href="/uilib/components/anchor">
          <IconPrimary icon="bell" /> Blank target with https
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
        ContrastExample,
      }}
    >
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-hover">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-hover"
          >
            Contrast - no hover
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-radius">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-radius"
          >
            Contrast - no radius
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline"
          >
            Contrast - no underline
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline-no-hover">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline dnb-anchor--no-hover"
          >
            Contrast - no underline - no hover
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline-no-radius">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline dnb-anchor--no-radius"
          >
            Contrast - no underline - no radius
          </Anchor>
        </ContrastExample>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
        WidthMarkers,
      }}
    >
      <Example data-visual-test="anchor-icon-break">
        <P>
          Some space{' '}
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            className="dnb-anchor--inline"
          >
            wordAttachedToIcon longFinalWord
          </Anchor>{' '}
          <WidthMarkers />
        </P>

        <P>
          Some{' '}
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
            className="dnb-anchor--inline"
          >
            space wordAttachedToIcon
          </Anchor>{' '}
          longFinalWord <WidthMarkers />
        </P>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{
        Example,
      }}
    >
      <Example data-visual-test="anchor-no-icon-prop">
        <Anchor href="/uilib/components/anchor" noIcon icon="bell">
          Anchor without icon
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-launch-icon-prop">
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          noLaunchIcon
        >
          Blank target without launch icon
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="anchor-disabled">
      <Anchor
        href="/uilib/components/anchor"
        disabled
        tooltip="This is disabled because ..."
      >
        Disabled link
      </Anchor>
    </ComponentBox>
  </Wrapper>,
)
```
