import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{t as i}from"./ComponentBox-a4aOn231.js";import{Rr as a,Wi as o,y as s}from"./index-DqqByKA2.js";var c=t({Components:()=>R,FourDirections:()=>B,InnerSpace:()=>m,InnerSpaceMediaQueries:()=>U,MagicBox:()=>P,MarginCollapse:()=>h,Margins:()=>g,Method1:()=>d,Method2:()=>f,Method3:()=>p,ProviderExample:()=>V,ResponsiveOuterSpace:()=>G,ResponsiveSpacing:()=>_,SameResult1:()=>I,SameResult2:()=>L,Shorthand:()=>z,SpaceInlineBlock:()=>W,SpaceMediaQueries:()=>H,SpaceVisibleWhenVisualTestElements:()=>y,SpaceVisibleWhenVisualTestPatterns:()=>v,SpaceVisibleWhenVisualTestReset:()=>b,VisualSpace:()=>F}),l=e(n()),u=e(r()),d=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`spacing-method-space`,scope:{RedBox:w},stableName:`Method1`,children:`<RedBox>
  <Space top="large x-small">
    <Input label="Input" />
  </Space>
</RedBox>
`})}),f=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`spacing-method-component`,stableName:`Method2`,children:`
<Input label="Input A" bottom="small" />
<Input label="Input B" />

`})}),p=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{scope:{RedBox:w,useSpacing:o},"data-visual-test":`spacing-method-form-row`,stableName:`Method3`,noInline:!0,children:`const Component = ({ className = null, style = null, ...props }) => {
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
`})}),m=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`inner-spacing`,scope:{RedBox:w},stableName:`InnerSpace`,children:`<RedBox>
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
`})}),h=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{hideCode:!0,scope:{RedBox:w,Vertical:C},stableName:`MarginCollapse`,children:`<Vertical>
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
`})}),g=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`spacing-margins`,hideCode:!0,stableName:`Margins`,children:`<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">
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
`})}),_=()=>(0,u.jsx)(i,{stableName:`ResponsiveSpacing`,children:`<Space.ResponsiveContext>
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
`}),v=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`spacing-patterns`,scope:{MagicBox:P,CustomStyle:S},hideCode:!0,stableName:`SpaceVisibleWhenVisualTestPatterns`,noInline:!0,children:`const TestCase = (props) => {
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
`})}),y=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`spacing-elements`,scope:{MagicBox:P,CustomStyle:S},hideCode:!0,stableName:`SpaceVisibleWhenVisualTestElements`,noInline:!0,children:`const listOfBoxes = []
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
`})}),b=()=>(0,u.jsx)(i,{"data-visual-test":`spacing-reset`,stableName:`SpaceVisibleWhenVisualTestReset`,noInline:!0,children:`const BlueBox = styled.div\`
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
`}),x=s.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
  .dnb-input {
    &__input {
      width: 8rem;
    }
  }
  [data-visual-test='spacing-margins'] {
    display: flex;
  }
`,S=s.div`
  display: flex;
  width: auto;
  box-shadow: 0 0 0 1px var(--color-fire-red);
  .dnb-input__input {
    width: 10rem;
  }
`,C=s.div`
  display: inline-flex;
  flex-direction: column;
`,w=({children:e,...t})=>(0,u.jsx)(S,{children:(0,u.jsx)(F,{...t,children:e})}),T=s.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  background-color: var(--color-mint-green);
`,E=s.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;

  width: 0.0625rem;
  height: 100%;

  background-color: var(--color-fire-red);
  ${``}
`,D=s.div`
  position: relative;
`,O=s.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${e=>e.theme.unit===`padding`?`rgba(30, 112, 213, 0.25)`:`rgba(213, 30, 149, 0.25)`};
`,k=s(O)`
  top: ${e=>e.theme.unit===`padding`?0:`auto`};
  bottom: 100%;
`,A=s(O)`
  top: ${e=>e.theme.unit===`padding`?`auto`:`100%`};
  bottom: 0;
`,j=s(O)`
  left: auto;
  right: auto;
`,M=s(O)`
  left: auto;
  right: 0;
`,N=s.label`
  display: block;
  width: 1rem;
  margin-left: 0.25rem;
  font-size: calc(var(--font-size-basis) - 0.5rem);
  text-align: center;
  color: var(--color-black-80);
`,P=e=>{let t=(0,l.useRef)(null),[n,r]=(0,l.useState)(``),[i,a]=(0,l.useState)(null);return(0,l.useEffect)(()=>{let e=t.current,n=()=>{try{let t=window.getComputedStyle(e.parentElement).getPropertyValue(`margin-top`);r(`${parseFloat(t)/16}`),a(e.parentElement.getAttribute(`class`))}catch(e){console.warn(e)}};return document.readyState===`complete`?n():typeof window<`u`&&window.addEventListener(`load`,n),()=>{window.removeEventListener(`load`,n)}},[]),(0,u.jsxs)(T,{...e,ref:t,title:i,children:[(0,u.jsx)(E,{style:{height:`${n}rem`}}),(0,u.jsx)(N,{children:n})]})},F=({children:e,...t})=>{let n=(0,l.useRef)(null),r={top:0,left:0,right:0,bottom:0},[i,o]=(0,l.useState)(r),[s,c]=(0,l.useState)(r),[d,f]=(0,l.useState)(null);(0,l.useEffect)(()=>{let e=n.current,t=()=>{try{let t={...r},n={...r},i=window.getComputedStyle(e.children[0]);Object.keys(r).forEach(e=>{t[e]=parseFloat(i.getPropertyValue(`margin-${e}`))/16,n[e]=parseFloat(i.getPropertyValue(`padding-${e}`))/16}),o(t),c(n),f(e.parentElement.getAttribute(`class`))}catch(e){console.warn(e)}};document.readyState===`complete`?t():typeof window<`u`&&window.addEventListener(`load`,t);let i,a=()=>{clearTimeout(i),i=setTimeout(t,10)};return window.addEventListener(`resize`,a),()=>{typeof window<`u`&&(window.removeEventListener(`load`,t),window.removeEventListener(`resize`,a))}},[]);let p=({space:e,unit:t})=>Object.keys(r).map(n=>{let r={unit:t},i=null;switch(n){case`top`:i=k;break;case`right`:i=M;break;case`bottom`:i=A;break;case`left`:i=j;break}return(0,u.jsx)(i,{theme:r,style:{[n===`top`||n===`bottom`?`height`:`width`]:`${e[n]}rem`},children:(0,u.jsx)(N,{children:e[n]||``})},n)});return(0,u.jsx)(a,{...t,title:d,children:(0,u.jsxs)(D,{ref:n,children:[e,p({space:i,unit:`margin`}),p({space:s,unit:`padding`})]})})},I=()=>(0,u.jsx)(i,{hidePreview:!0,hideToolbar:!0,stableName:`SameResult1`,children:`
{/* All of these methods will result in the same spacing */}
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />

`}),L=()=>(0,u.jsx)(i,{hidePreview:!0,hideToolbar:!0,stableName:`SameResult2`,children:`
{/* All of these methods will result in the same spacing */}
<Space
  space={{
    top: 'large x-small',
    right: '2.5',
    bottom: '2.5rem',
    left: '40px',
  }}
/>

`}),R=()=>(0,u.jsx)(i,{hidePreview:!0,hideToolbar:!0,stableName:`Components`,children:`
<Button top="large x-small medium" />
<Button
  space={{
    top: 'large x-small medium',
  }}
/>

`}),z=()=>(0,u.jsx)(i,{hidePreview:!0,hideToolbar:!0,stableName:`Shorthand`,children:`
{/* Equivalent to top="small" */}
<Button top />
{/* Equivalent to top="small" right="small" bottom="small" left="small" */}
<Button space />

`}),B=()=>(0,u.jsx)(i,{hidePreview:!0,hideToolbar:!0,stableName:`FourDirections`,children:`<Button space="large x-small medium" />
`}),V=()=>(0,u.jsx)(i,{hidePreview:!0,stableName:`ProviderExample`,children:`<Provider
  space={{
    noCollapse: true,
  }}
>
  <Space>I do not collapse</Space>
  <Space>I do not collapse</Space>
</Provider>
`}),H=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`space-media-queries`,scope:{RedBox:w},stableName:`SpaceMediaQueries`,children:`
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

`})}),U=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`innerspace-media-queries`,scope:{RedBox:w},stableName:`InnerSpaceMediaQueries`,children:`
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

`})}),W=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`space-inline-block`,scope:{RedBox:w},stableName:`SpaceInlineBlock`,children:`
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

`})}),G=()=>(0,u.jsx)(x,{children:(0,u.jsx)(i,{"data-visual-test":`responsive-outer-spacing`,scope:{RedBox:w},stableName:`ResponsiveOuterSpace`,children:`<RedBox>
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
`})});export{W as _,U as a,v as b,d as c,V as d,G as f,z as g,L as h,m as i,f as l,I as m,c as n,h as o,_ as p,B as r,g as s,R as t,p as u,H as v,b as x,y};