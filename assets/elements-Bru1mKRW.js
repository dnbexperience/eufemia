import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{nt as n,t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i,Sr as a,br as o}from"./index-CMgyXmp3.js";import{t as s}from"./ListSummaryFromEdges-p1YbDlq5.js";e();var c=t();function l(){let{allMdx:{edges:e}}=a(o`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "" }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: { contentFilePath: { glob: "**/uilib/elements/*" } }
        }
        sort: [
          { frontmatter: { order: ASC } }
          { frontmatter: { title: ASC } }
        ]
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);return(0,c.jsx)(s,{edges:e,returnListItems:!0})}var u=()=>(0,c.jsx)(r,{scope:{Link:n},noInline:!0,children:`const StyledLink = styled(Link)\`
  color: var(--color-fire-red);
\`
render(
  <StyledLink href="/" target="_blank">
    Styled Link
  </StyledLink>
)
`}),d=()=>(0,c.jsx)(r,{"data-visual-test":`span-skeleton`,noInline:!0,children:`const Box = styled.div\`
  display: grid;
  place-items: center;
  width: 12rem;
  height: 4rem;
  padding: 0 1rem;
  background-color: var(--color-white);
\`
const StyledButton = styled.button\`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &:hover {
    color: var(--color-fire-red);
  }
  &:active {
    opacity: 0.6;
  }
\`
const CustomImage = () => {
  const [state, setState] = React.useState(false)
  return (
    <Skeleton show={state}>
      <Box>
        <StyledButton className="dnb-button dnb-button--reset">
          <Span>Text</Span>
          <IconPrimary icon="chevron_right" />
        </StyledButton>
      </Box>
      <br />
      <Skeleton.Exclude>
        <ToggleButton
          checked={state}
          onChange={({ checked }) => setState(checked)}
          top="large"
        >
          Toggle
        </ToggleButton>
      </Skeleton.Exclude>
    </Skeleton>
  )
}
render(<CustomImage />)
`});function f(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h1,{children:`HTML Elements`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`@dnb/eufemia`}),` contains styling for the most commonly used `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element`,children:`HTML Elements`}),` defined by the UX team at DNB. You may also have a look at `,(0,c.jsx)(t.a,{href:`/uilib/typography`,children:`Typography`}),` for headings and paragraph usage.`]}),`
`,(0,c.jsx)(t.h2,{children:`Elements`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Vanilla HTML`}),`
`,(0,c.jsx)(t.p,{children:`In order to apply a style, you have to define a CSS class, like:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`<a href="/" className="dnb-anchor">Text Link</a>
<blockquote className="dnb-blockquote">
  Dis leo ala tractatos ei quo.
</blockquote>
`})}),`
`,(0,c.jsx)(t.h3,{children:`React JSX`}),`
`,(0,c.jsxs)(t.p,{children:[`When using JSX with React, you can simply use the wrapper components. They also inherit to the `,(0,c.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` provider.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { H1, H2, P, Anchor, Link } from '@dnb/eufemia'

render(
  <article>
    <H1>Semantic h1</H1>
    <P>My Paragraph</P>
    <Anchor href="/">Link</Anchor>
    <Link href="/">Link</Link>
  </article>
)
`})}),`
`,(0,c.jsx)(t.h4,{children:`Styled Components`}),`
`,(0,c.jsx)(t.p,{children:`They work seamlessly with Styled Components (emotion) as well:`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h2,{children:`Unstyled HTML Elements`}),`
`,(0,c.jsxs)(t.p,{children:[`In order to use the inherited `,(0,c.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),`, there are a number of unstyled HTML elements that inherit from and react to the Skeleton provider.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { Span, Div } from '@dnb/eufemia'
`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`Span`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`Div`})}),`
`]}),`
`,(0,c.jsx)(t.h3,{children:`Example usage of span`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{children:`Missing HTML Elements`}),`
`,(0,c.jsxs)(t.p,{children:[`Not every commonly used HTML element is included yet in `,(0,c.jsx)(t.code,{children:`@dnb/eufemia`}),`. This decision is made by the DNB UX Team and relies on a principle to make UX design as good as possible, consistent, and more thoughtful towards a broader customer target.`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`For the `,(0,c.jsx)(t.code,{children:`select`}),` element, use the `,(0,c.jsx)(t.a,{href:`/uilib/components/dropdown`,children:(0,c.jsx)(t.strong,{children:`Dropdown`})}),` component.`]}),`
`]})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}export{p as default};