import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{Q as i,et as a}from"./Anchor-CgDcBCwP.js";import{a as o}from"./SpacingUtils-BCd_iJVu.js";import{s}from"./ToggleButton-DM984GyO.js";import{t as c}from"./Space-CpHXJR8R.js";import{t as l}from"./Button-XQwxqpWO.js";import{F as u}from"./Autocomplete-CXBhPR3k.js";import{t as d}from"./P-CtWu9WHu.js";import{t as f}from"./Section-BQdvtuRF.js";import{t as p}from"./Heading-DAtQYz9n.js";import{w as m}from"./index-kfZVC31v.js";import{t as h}from"./ComponentBox-qLaLt9T0.js";var g=e({Components:()=>K,FourDirections:()=>J,InnerSpace:()=>S,InnerSpaceMediaQueries:()=>Z,MagicBox:()=>H,MarginCollapse:()=>C,Margins:()=>w,Method1:()=>y,Method2:()=>b,Method3:()=>x,ProviderExample:()=>Y,ResponsiveOuterSpace:()=>$,ResponsiveSpacing:()=>T,SameResult1:()=>W,SameResult2:()=>G,Shorthand:()=>q,SpaceInlineBlock:()=>Q,SpaceMediaQueries:()=>X,SpaceVisibleWhenVisualTestElements:()=>D,SpaceVisibleWhenVisualTestPatterns:()=>E,SpaceVisibleWhenVisualTestReset:()=>O,VisualSpace:()=>U}),_=n(t()),v=n(r()),y=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`spacing-method-space`,scope:{RedBox:M},stableName:`Method1`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c,Input:u},children:`<RedBox>
  <Space top="large x-small">
    <Input label="Input" />
  </Space>
</RedBox>
`})}),b=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`spacing-method-component`,stableName:`Method2`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Input:u},children:`
<Input label="Input A" bottom="small" />
<Input label="Input B" />

`})}),x=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{scope:{RedBox:M,useSpacing:o},"data-visual-test":`spacing-method-form-row`,stableName:`Method3`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},noInline:!0,children:`const Component = ({ className = null, style = null, ...props }) => {
  const params = useSpacing(props, {
    ...props,
    className: \`my-component dnb-space \${className || ''}\`.trim(),
    style,
  })
  return <div {...params} />
}
render(
  <>
    <RedBox>
      <Component top="small medium large">Space A</Component>
    </RedBox>
    <RedBox>
      <Component top>Space B</Component>
    </RedBox>
    <RedBox>
      <Component innerSpace="large">Inner Space</Component>
    </RedBox>
    <RedBox>
      <Component
        innerSpace={{
          large: true,
        }}
      >
        Has space when breakpoint is large
      </Component>
    </RedBox>
  </>
)
`})}),S=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`inner-spacing`,scope:{RedBox:M},stableName:`InnerSpace`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c,P:d},children:`<RedBox>
  <Space
    innerSpace={{
      small: 'large x-small',
      medium: true,
      large: {
        top: '2rem',
        left: '16px',
        bottom: 'large',
        right: '5rem',
      },
    }}
  >
    <P>Content</P>
  </Space>
</RedBox>
`})}),C=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{hideCode:!0,scope:{RedBox:M,Vertical:j},stableName:`MarginCollapse`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`<Vertical>
  <RedBox>
    <Space bottom="small">
      <>
        I have <code className="dnb-code">bottom="small"</code>
      </>
    </Space>
  </RedBox>
  <RedBox>
    <Space top="large">
      <>
        I have <code className="dnb-code">top="large"</code>
      </>
    </Space>
  </RedBox>
</Vertical>
`})}),w=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`spacing-margins`,hideCode:!0,stableName:`Margins`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">
  <details>
    <summary>
      I have four <code className="dnb-code">2.5rem</code> margins!
    </summary>
    And this are my CSS classes:{' '}
    <code className="dnb-code">
      dnb-space dnb-space__top--large dnb-space__top--x-small
      dnb-space__right--large dnb-space__right--x-small
      dnb-space__bottom--large dnb-space__bottom--x-small
      dnb-space__left--large dnb-space__left--x-small
    </code>
  </details>
</Space>
`})}),T=()=>(0,v.jsx)(h,{stableName:`ResponsiveSpacing`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c,Section:f,Flex:s,Heading:p,P:d},children:`<Space.ResponsiveContext>
  <Section
    innerSpace={{
      block: 'medium',
    }}
    breakout={false}
    surface="dark"
  >
    <Flex.Stack
      space={{
        inline: 'large',
      }}
      gap="small"
    >
      <Heading size="x-large">Heading</Heading>
      <P>My spacing adjusts responsively</P>

      <Space.ResponsiveContext off>
        <P>My spacing stays fixed</P>
      </Space.ResponsiveContext>
    </Flex.Stack>
  </Section>
</Space.ResponsiveContext>
`}),E=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`spacing-patterns`,scope:{MagicBox:H,CustomStyle:A},hideCode:!0,stableName:`SpaceVisibleWhenVisualTestPatterns`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c,P:d,Code:a},noInline:!0,children:`const TestCase = (props) => {
  return (
    <CustomStyle {...props}>
      {listOfBoxes.map((v) => (
        <Space key={v} top={v}>
          <MagicBox />
        </Space>
      ))}
    </CustomStyle>
  )
}
const listOfBoxes = []
for (let i = 0, c = 0, l = 20; i <= l; i++) {
  listOfBoxes.push(String(c))
  c += 0.5
}
render(
  <div className="spacing-patterns">
    <P bottom>
      With <Code>dnb-core-style</Code>
    </P>
    <TestCase className="dnb-core-style" />

    <P top bottom>
      Without
    </P>
    <TestCase />
  </div>
)
`})}),D=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`spacing-elements`,scope:{MagicBox:H,CustomStyle:A},hideCode:!0,stableName:`SpaceVisibleWhenVisualTestElements`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Button:l,P:d,Code:a},noInline:!0,children:`const listOfBoxes = []
for (let i = 0, c = 0, l = 10; i <= l; i++) {
  listOfBoxes.push(String(c))
  c += 1
}
const TestCase = (props) => {
  return (
    <CustomStyle {...props}>
      {listOfBoxes.map((v) => (
        <Button
          key={v}
          left="x-small"
          top={v}
          size="small"
          customContent={<MagicBox />}
        />
      ))}
    </CustomStyle>
  )
}
render(
  <div className="spacing-elements">
    <P bottom>
      With <Code>dnb-core-style</Code>
    </P>
    <TestCase className="dnb-core-style" />

    <P top bottom>
      Without
    </P>
    <TestCase />
  </div>
)
`})}),O=()=>(0,v.jsx)(h,{"data-visual-test":`spacing-reset`,stableName:`SpaceVisibleWhenVisualTestReset`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},noInline:!0,children:`const BlueBox = styled.div\`
  display: inline-block;
  padding: 0.5rem;
  background: blue;
  ul {
    background: white;
  }
\`
render(
  <BlueBox>
    <Space
      element="ul"
      top="small"
      right="small"
      bottom="small"
      left="small"
      className="dnb-space__reset"
    >
      <li> </li>
    </Space>
  </BlueBox>
)
`}),k=m.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
  .dnb-input {
    &__input {
      width: 8rem;
    }
  }
  [data-visual-test='spacing-margins'] {
    display: flex;
  }
`,A=m.div`
  display: flex;
  width: auto;
  box-shadow: 0 0 0 1px var(--color-fire-red);
  .dnb-input__input {
    width: 10rem;
  }
`,j=m.div`
  display: inline-flex;
  flex-direction: column;
`,M=({children:e,...t})=>(0,v.jsx)(A,{children:(0,v.jsx)(U,{...t,children:e})}),N=m.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  background-color: var(--color-mint-green);
`,P=m.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;

  width: 0.0625rem;
  height: 100%;

  background-color: var(--color-fire-red);
  ${``}
`,F=m.div`
  position: relative;
`,I=m.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${e=>e.theme.unit===`padding`?`rgba(30, 112, 213, 0.25)`:`rgba(213, 30, 149, 0.25)`};
`,L=m(I)`
  top: ${e=>e.theme.unit===`padding`?0:`auto`};
  bottom: 100%;
`,R=m(I)`
  top: ${e=>e.theme.unit===`padding`?`auto`:`100%`};
  bottom: 0;
`,z=m(I)`
  left: auto;
  right: auto;
`,B=m(I)`
  left: auto;
  right: 0;
`,V=m.label`
  display: block;
  width: 1rem;
  margin-left: 0.25rem;
  font-size: calc(var(--font-size-basis) - 0.5rem);
  text-align: center;
  color: var(--color-black-80);
`,H=e=>{let t=(0,_.useRef)(null),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(null);return(0,_.useEffect)(()=>{let e=t.current,n=()=>{try{let t=window.getComputedStyle(e.parentElement).getPropertyValue(`margin-top`);r(`${parseFloat(t)/16}`),a(e.parentElement.getAttribute(`class`))}catch(e){console.warn(e)}};return document.readyState===`complete`?n():typeof window<`u`&&window.addEventListener(`load`,n),()=>{window.removeEventListener(`load`,n)}},[]),(0,v.jsxs)(N,{...e,ref:t,title:i,children:[(0,v.jsx)(P,{style:{height:`${n}rem`}}),(0,v.jsx)(V,{children:n})]})},U=({children:e,...t})=>{let n=(0,_.useRef)(null),r={top:0,left:0,right:0,bottom:0},[i,a]=(0,_.useState)(r),[o,s]=(0,_.useState)(r),[l,u]=(0,_.useState)(null);(0,_.useEffect)(()=>{let e=n.current,t=()=>{try{let t={...r},n={...r},i=window.getComputedStyle(e.children[0]);Object.keys(r).forEach(e=>{t[e]=parseFloat(i.getPropertyValue(`margin-${e}`))/16,n[e]=parseFloat(i.getPropertyValue(`padding-${e}`))/16}),a(t),s(n),u(e.parentElement.getAttribute(`class`))}catch(e){console.warn(e)}};document.readyState===`complete`?t():typeof window<`u`&&window.addEventListener(`load`,t);let i,o=()=>{clearTimeout(i),i=setTimeout(t,10)};return window.addEventListener(`resize`,o),()=>{typeof window<`u`&&(window.removeEventListener(`load`,t),window.removeEventListener(`resize`,o))}},[]);let d=({space:e,unit:t})=>Object.keys(r).map(n=>{let r={unit:t},i=null;switch(n){case`top`:i=L;break;case`right`:i=B;break;case`bottom`:i=R;break;case`left`:i=z;break}return(0,v.jsx)(i,{theme:r,style:{[n===`top`||n===`bottom`?`height`:`width`]:`${e[n]}rem`},children:(0,v.jsx)(V,{children:e[n]||``})},n)});return(0,v.jsx)(c,{...t,title:l,children:(0,v.jsxs)(F,{ref:n,children:[e,d({space:i,unit:`margin`}),d({space:o,unit:`padding`})]})})},W=()=>(0,v.jsx)(h,{hidePreview:!0,hideToolbar:!0,stableName:`SameResult1`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`
{/* All of these methods will result in the same spacing */}
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />

`}),G=()=>(0,v.jsx)(h,{hidePreview:!0,hideToolbar:!0,stableName:`SameResult2`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`
{/* All of these methods will result in the same spacing */}
<Space
  space={{
    top: 'large x-small',
    right: '2.5',
    bottom: '2.5rem',
    left: '40px',
  }}
/>

`}),K=()=>(0,v.jsx)(h,{hidePreview:!0,hideToolbar:!0,stableName:`Components`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Button:l},children:`
<Button top="large x-small medium" />
<Button
  space={{
    top: 'large x-small medium',
  }}
/>

`}),q=()=>(0,v.jsx)(h,{hidePreview:!0,hideToolbar:!0,stableName:`Shorthand`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Button:l},children:`
{/* Equivalent to top="small" */}
<Button top />
{/* Equivalent to top="small" right="small" bottom="small" left="small" */}
<Button space />

`}),J=()=>(0,v.jsx)(h,{hidePreview:!0,hideToolbar:!0,stableName:`FourDirections`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Button:l},children:`<Button space="large x-small medium" />
`}),Y=()=>(0,v.jsx)(h,{hidePreview:!0,stableName:`ProviderExample`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Provider:i,Space:c},children:`<Provider
  space={{
    noCollapse: true,
  }}
>
  <Space>I do not collapse</Space>
  <Space>I do not collapse</Space>
</Provider>
`}),X=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`space-media-queries`,scope:{RedBox:M},stableName:`SpaceMediaQueries`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`
{/* Different spacing for different breakpoints */}
<Space
  space={{
    small: 'small',
    medium: 'large',
    large: 'x-large',
  }}
>
  <RedBox>
    Responsive spacing: small on mobile, large on tablet, x-large on
    desktop
  </RedBox>
</Space>
{/* Media queries with individual direction objects */}
<Space
  space={{
    small: {
      top: 'small',
      bottom: 'medium',
    },
    medium: {
      top: 'large',
      bottom: 'x-large',
    },
    large: {
      top: 'x-large',
      bottom: 'xx-large',
    },
  }}
>
  <RedBox>Responsive directional spacing</RedBox>
</Space>
{/* Mixing with individual props */}
<Space
  space={{
    small: 'medium',
    medium: 'large',
    large: 'x-large',
  }}
  right="small" // Individual props override space
>
  <RedBox>Media space with right override</RedBox>
</Space>

`})}),Z=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`innerspace-media-queries`,scope:{RedBox:M},stableName:`InnerSpaceMediaQueries`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`
{/* Different inner spacing for different breakpoints */}
<Space
  innerSpace={{
    small: 'small',
    medium: 'large',
    large: 'x-large',
  }}
>
  <RedBox>
    <div>Responsive inner spacing</div>
    <div>Content inside has different spacing per breakpoint</div>
  </RedBox>
</Space>
{/* Media queries with directional inner spacing */}
<Space
  innerSpace={{
    small: {
      block: 'small',
      inline: 'medium',
    },
    medium: {
      block: 'large',
      inline: 'x-large',
    },
    large: {
      block: 'x-large',
      inline: 'xx-large',
    },
  }}
>
  <RedBox>
    <div>Responsive directional inner spacing</div>
    <div>Block and inline spacing changes per breakpoint</div>
  </RedBox>
</Space>

`})}),Q=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`space-inline-block`,scope:{RedBox:M},stableName:`SpaceInlineBlock`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c},children:`
{/* Basic inline/block usage for space (margin) */}
<Space
  space={{
    inline: 'small',
    block: 'large',
  }}
>
  <RedBox>
    space: inline=small (left/right), block=large (top/bottom)
  </RedBox>
</Space>
{/* Basic inline/block usage for innerSpace (padding) */}
<Space
  innerSpace={{
    inline: 'medium',
    block: 'x-small',
  }}
>
  <RedBox>
    innerSpace: inline=medium (left/right), block=x-small (top/bottom)
  </RedBox>
</Space>
{/* Combining both space and innerSpace with inline/block */}
<Space
  space={{
    block: 'large',
  }}
  innerSpace={{
    inline: 'medium',
    block: 'small',
  }}
>
  <RedBox>
    Combined: space block=large + innerSpace inline=medium, block=small
  </RedBox>
</Space>
{/* Media queries with inline/block for both properties */}
<Space
  space={{
    small: {
      inline: 'x-small',
    },
    medium: {
      block: 'medium',
    },
    large: {
      inline: 'large',
      block: 'small',
    },
  }}
  innerSpace={{
    small: {
      block: 'x-small',
    },
    medium: {
      inline: 'small',
    },
    large: {
      inline: 'medium',
      block: 'large',
    },
  }}
>
  <RedBox>
    <div>Responsive inline/block for both space and innerSpace</div>
    <div>Different combinations per breakpoint</div>
  </RedBox>
</Space>
{/* Mixing inline/block with traditional directional props */}
<Space
  space={{
    inline: 'small',
  }}
  top="x-large"
  innerSpace={{
    block: 'medium',
  }}
>
  <RedBox>Mixed: space inline + top override, innerSpace block</RedBox>
</Space>

`})}),$=()=>(0,v.jsx)(k,{children:(0,v.jsx)(h,{"data-visual-test":`responsive-outer-spacing`,scope:{RedBox:M},stableName:`ResponsiveOuterSpace`,sourceImports:[`import { useEffect, useRef, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Space, Input, Button, P, Code, Flex, Heading, Section } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'`,`import { Theme } from '@emotion/react'`],__buildScope:{Space:c,P:d},children:`<RedBox>
  <Space
    space={{
      small: 'large x-small',
      medium: {
        top: '2rem',
        left: '16px',
        bottom: 'large',
        right: '5rem',
      },
      large: true,
    }}
  >
    <P>Content</P>
  </Space>
</RedBox>
`})});export{Q as _,Z as a,E as b,y as c,Y as d,$ as f,q as g,G as h,S as i,b as l,W as m,g as n,C as o,T as p,J as r,w as s,K as t,x as u,X as v,O as x,D as y};