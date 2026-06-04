import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{_ as n}from"./Anchor-VfvEVqst.js";import{i as r,t as i}from"./portal-query-2jVhah92.js";import{t as a}from"./Link-CbyKMXKy.js";import{t as o}from"./Span-BXAZEs8c.js";import{t as s}from"./ToggleButton-BtQrsiHY.js";import{t as c}from"./Skeleton-D72zmau5.js";import{W as l}from"./index-D7e1avVt.js";import{t as u}from"./ListSummaryFromEdges-B6tiVya9.js";import{t as d}from"./ComponentBox-CE7bpcJy.js";var f=e(t());function p(){let{allMdx:{edges:e}}=r(i`
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
  `);return(0,f.jsx)(u,{edges:e,returnListItems:!0})}var m=()=>(0,f.jsx)(d,{scope:{Link:a},stableName:`StyledComponentsExample`,sourceImports:[`import styled from '@emotion/styled'`,`import { Link } from '@dnb/eufemia'`],__buildScope:{Link:a},noInline:!0,children:`const StyledLink = styled(Link)\`
  color: var(--color-fire-red);
\`
render(
  <StyledLink href="/" target="_blank">
    Styled Link
  </StyledLink>
)
`}),h=()=>(0,f.jsx)(d,{"data-visual-test":`span-skeleton`,stableName:`UnstyledExample`,sourceImports:[`import { useState } from 'react'`,`import { Skeleton, Span, IconPrimary, ToggleButton } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Skeleton:c,Span:o,IconPrimary:n,ToggleButton:s},noInline:!0,children:`const Box = styled.div\`
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
`});function g(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...l(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h1,{children:`HTML Elements`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`@dnb/eufemia`}),` contains styling for the most commonly used `,(0,f.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element`,children:`HTML Elements`}),` defined by the UX team at DNB. You may also have a look at `,(0,f.jsx)(t.a,{href:`/uilib/typography`,children:`Typography`}),` for headings and paragraph usage.`]}),`
`,(0,f.jsx)(t.h2,{children:`Elements`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Vanilla HTML`}),`
`,(0,f.jsx)(t.p,{children:`In order to apply a style, you have to define a CSS class, like:`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`<a href="/" className="dnb-anchor">Text Link</a>
<blockquote className="dnb-blockquote">
  Dis leo ala tractatos ei quo.
</blockquote>
`})}),`
`,(0,f.jsx)(t.h3,{children:`React JSX`}),`
`,(0,f.jsxs)(t.p,{children:[`When using JSX with React, you can simply use the wrapper components. They also inherit to the `,(0,f.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` provider.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import { H1, H2, P, Anchor, Link } from '@dnb/eufemia'

render(
  <article>
    <H1>Semantic h1</H1>
    <P>My Paragraph</P>
    <Anchor href="/">Link</Anchor>
    <Link href="/">Link</Link>
  </article>
)
`})}),`
`,(0,f.jsx)(t.h4,{children:`Styled Components`}),`
`,(0,f.jsx)(t.p,{children:`They work seamlessly with Styled Components (emotion) as well:`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h2,{children:`Unstyled HTML Elements`}),`
`,(0,f.jsxs)(t.p,{children:[`In order to use the inherited `,(0,f.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),`, there are a number of unstyled HTML elements that inherit from and react to the Skeleton provider.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import { Span, Div } from '@dnb/eufemia'
`})}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.code,{children:`Span`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.code,{children:`Div`})}),`
`]}),`
`,(0,f.jsx)(t.h3,{children:`Example usage of span`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.hr,{}),`
`,(0,f.jsx)(t.h2,{children:`Missing HTML Elements`}),`
`,(0,f.jsxs)(t.p,{children:[`Not every commonly used HTML element is included yet in `,(0,f.jsx)(t.code,{children:`@dnb/eufemia`}),`. This decision is made by the DNB UX Team and relies on a principle to make UX design as good as possible, consistent, and more thoughtful towards a broader customer target.`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`For the `,(0,f.jsx)(t.code,{children:`select`}),` element, use the `,(0,f.jsx)(t.a,{href:`/uilib/components/dropdown`,children:(0,f.jsx)(t.strong,{children:`Dropdown`})}),` component.`]}),`
`]})]})}function _(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(g,{...e})}):g(e)}export{_ as default};