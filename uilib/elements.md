---
title: 'HTML Elements'
version: 11.2.0
generatedAt: 2026-05-08T07:25:37.359Z
checksum: 18e00ad06523acfe60001e6744349201af717bf0b58581da85eb2dc34ca5d85b
---

# HTML Elements

`@dnb/eufemia` contains styling for the most commonly used [HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) defined by the UX team at DNB. You may also have a look at [Typography](/uilib/typography) for headings and paragraph usage.

## Elements


- [Blockquote](/uilib/elements/blockquote/): The blockquote element is used to indicate the quotation of a large section of text from another source.
- [Code](/uilib/elements/code/): The code and pre element is used for code and syntax highlighting.
- [Heading](/uilib/elements/heading/): The heading element is used to indicate the quotation of a large section of text from another source.
- [HorizontalRule](/uilib/elements/horizontal-rule/): The `<hr />` tag in HTML stands for horizontal rule and is used to insert a horizontal rule or a thematic break in an HTML page to divide or separate document sections.
- [Image](/uilib/elements/image/): Image element exists to have a future possibility to optimize and add features.
- [Ingress](/uilib/elements/ingress/): Ingress is a brief, introductory paragraph that follows immediately after the title of an article.
- [Lead](/uilib/elements/lead/): A lead paragraph is the opening paragraph of an article, etc.
- [Lists](/uilib/elements/lists/): Lists are used to specify lists of information.
- [Paragraph](/uilib/elements/paragraph/): Paragraphs are block-level elements, used to structure and format text contents.
- [Span](/uilib/elements/span/): Spans are inline-elements, used to define parts of text content.


### Vanilla HTML

In order to apply a style, you have to define a CSS class, like:

```jsx
<a href="/" className="dnb-anchor">Text Link</a>
<blockquote className="dnb-blockquote">
  Dis leo ala tractatos ei quo.
</blockquote>
```

### React JSX

When using JSX with React, you can simply use the wrapper components. They also inherit to the [Skeleton](/uilib/components/skeleton) provider.

```jsx
import { H1, H2, P, Anchor, Link } from '@dnb/eufemia'

render(
  <article>
    <H1>Semantic h1</H1>
    <P>My Paragraph</P>
    <Anchor href="/">Link</Anchor>
    <Link href="/">Link</Link>
  </article>
)
```

#### Styled Components

They work seamlessly with Styled Components (emotion) as well:


```tsx
const StyledLink = styled(Link)`
        color: var(--color-fire-red);
      `;
render(<StyledLink href="/" target="_blank">
          Styled Link
        </StyledLink>);
```


## Unstyled HTML Elements

In order to use the inherited [Skeleton](/uilib/components/skeleton), there are a number of unstyled HTML elements that inherit from and react to the Skeleton provider.

```jsx
import { Span, Div } from '@dnb/eufemia'
```

- `Span`
- `Div`

### Example usage of span


```tsx
const Box = styled.div`
        display: grid;
        place-items: center;
        width: 12rem;
        height: 4rem;
        padding: 0 1rem;
        background-color: var(--color-white);
      `;
const StyledButton = styled.button`
        display: flex;
        justify-content: space-between;
        width: 100%;
        &:hover {
          color: var(--color-fire-red);
        }
        &:active {
          opacity: 0.6;
        }
      `;
const CustomImage = () => {
  const [state, setState] = useState(false);
  return <Skeleton show={state}>
            <Box>
              <StyledButton className="dnb-button dnb-button--reset">
                <Span>Text</Span>
                <IconPrimary icon="chevron_right" />
              </StyledButton>
            </Box>
            <br />
            <Skeleton.Exclude>
              <ToggleButton checked={state} onChange={({
        checked
      }) => setState(checked)} top="large">
                Toggle
              </ToggleButton>
            </Skeleton.Exclude>
          </Skeleton>;
};
render(<CustomImage />);
```


---

## Missing HTML Elements

Not every commonly used HTML element is included yet in `@dnb/eufemia`. This decision is made by the DNB UX Team and relies on a principle to make UX design as good as possible, consistent, and more thoughtful towards a broader customer target.

- For the `select` element, use the [**Dropdown**](/uilib/components/dropdown) component.
