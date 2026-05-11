import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{$ as t,t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r,f as i,u as a}from"./index-DVm0MbGb.js";import{t as o}from"./ListSummaryFromEdges-7aW4dt81.js";var s=e();function c(){let{allMdx:{edges:e}}=i(a`
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
  `);return(0,s.jsx)(o,{edges:e,returnListItems:!0})}var l=()=>(0,s.jsx)(n,{scope:{Link:t},noInline:!0,children:`const StyledLink = styled(Link)\`
  color: var(--color-fire-red);
\`
render(
  <StyledLink href="/" target="_blank">
    Styled Link
  </StyledLink>
)
`}),u=()=>(0,s.jsx)(n,{"data-visual-test":`span-skeleton`,noInline:!0,children:`const Box = styled.div\`
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
  const [state, setState] = useState(false)
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
`});function d(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{children:`HTML Elements`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`@dnb/eufemia`}),` contains styling for the most commonly used `,(0,s.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element`,children:`HTML Elements`}),` defined by the UX team at DNB. You may also have a look at `,(0,s.jsx)(t.a,{href:`/uilib/typography`,children:`Typography`}),` for headings and paragraph usage.`]}),`
`,(0,s.jsx)(t.h2,{children:`Elements`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Vanilla HTML`}),`
`,(0,s.jsx)(t.p,{children:`In order to apply a style, you have to define a CSS class, like:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`<a href="/" className="dnb-anchor">Text Link</a>
<blockquote className="dnb-blockquote">
  Dis leo ala tractatos ei quo.
</blockquote>
`})}),`
`,(0,s.jsx)(t.h3,{children:`React JSX`}),`
`,(0,s.jsxs)(t.p,{children:[`When using JSX with React, you can simply use the wrapper components. They also inherit to the `,(0,s.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` provider.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { H1, H2, P, Anchor, Link } from '@dnb/eufemia'

render(
  <article>
    <H1>Semantic h1</H1>
    <P>My Paragraph</P>
    <Anchor href="/">Link</Anchor>
    <Link href="/">Link</Link>
  </article>
)
`})}),`
`,(0,s.jsx)(t.h4,{children:`Styled Components`}),`
`,(0,s.jsx)(t.p,{children:`They work seamlessly with Styled Components (emotion) as well:`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h2,{children:`Unstyled HTML Elements`}),`
`,(0,s.jsxs)(t.p,{children:[`In order to use the inherited `,(0,s.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),`, there are a number of unstyled HTML elements that inherit from and react to the Skeleton provider.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Span, Div } from '@dnb/eufemia'
`})}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:`Span`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:`Div`})}),`
`]}),`
`,(0,s.jsx)(t.h3,{children:`Example usage of span`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.hr,{}),`
`,(0,s.jsx)(t.h2,{children:`Missing HTML Elements`}),`
`,(0,s.jsxs)(t.p,{children:[`Not every commonly used HTML element is included yet in `,(0,s.jsx)(t.code,{children:`@dnb/eufemia`}),`. This decision is made by the DNB UX Team and relies on a principle to make UX design as good as possible, consistent, and more thoughtful towards a broader customer target.`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[`For the `,(0,s.jsx)(t.code,{children:`select`}),` element, use the `,(0,s.jsx)(t.a,{href:`/uilib/components/dropdown`,children:(0,s.jsx)(t.strong,{children:`Dropdown`})}),` component.`]}),`
`]})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}export{f as default};