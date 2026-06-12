import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Anchor-BqZ7Pm7_.js";import{t as i}from"./P-D0SeNBSG.js";import{t as a}from"./Section-BV74bciL.js";import{K as o}from"./index-CsG353ar.js";import{t as s}from"./ComponentBox-Cb1rLw_D.js";var c=e({DarkSurface:()=>f,Default:()=>u,Divider:()=>g,Info:()=>v,NoBreakout:()=>d,ResponsiveAppearance:()=>p,ResponsiveInnerSpace:()=>m,SectionZIndex:()=>_,Spacing:()=>h,Success:()=>x,Warning:()=>b,WithError:()=>y}),l=t(n()),u=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-default`,stableName:`Default`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section>
  <P space={0}>
    Visual Section: <Anchor href="#">default</Anchor>
  </P>
</Section>
`}),d=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-no-breakout`,stableName:`NoBreakout`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i},children:`<Section
  breakout={false}
  backgroundColor="var(--token-color-background-neutral-subtle)"
>
  <P space={0}>No breakout</P>
</Section>
`}),f=()=>(0,l.jsx)(s,{hideCode:!0,stableName:`DarkSurface`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  backgroundColor="var(--token-color-decorative-first-bold-static)"
  surface="dark"
>
  <P space={0}>
    Dark surface section: <Anchor href="#">anchor</Anchor>
  </P>
</Section>
`}),p=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-responsive-appearance`,stableName:`ResponsiveAppearance`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i},children:`<Section
  breakout={{
    small: true,
    medium: false,
    large: false,
  }}
  outline={{
    medium: true,
    large: 'black',
  }}
  roundedCorner={{
    large: true,
  }}
  backgroundColor={{
    small: 'var(--token-color-background-neutral)',
    medium: 'var(--token-color-background-neutral-subtle)',
    large: 'var(--token-color-background-neutral-subtle)',
  }}
  dropShadow={{
    small: false,
    medium: true,
    large: true,
  }}
  innerSpace
>
  <P space={0}>Responsive properties</P>
</Section>
`}),m=()=>(0,l.jsx)(s,{hideCode:!0,stableName:`ResponsiveInnerSpace`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i},children:`<Section
  innerSpace={{
    small: {
      block: 'small',
      inline: 'x-small',
    },
    medium: {
      block: 'medium',
      inline: 'small',
    },
    large: false,
  }}
  backgroundColor="var(--token-color-background-neutral-subtle)"
  breakout={false}
>
  <P space={0}>Responsive innerSpace</P>
</Section>
`}),h=()=>(0,l.jsx)(s,{hideCode:!0,stableName:`Spacing`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
    left: 'small',
  }}
>
  <P space={0}>
    Visual Section: <Anchor href="#">default with innerSpace</Anchor>
  </P>
</Section>
`}),g=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-divider`,stableName:`Divider`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'medium',
    bottom: 'medium',
  }}
  variant="divider"
>
  <P space={0}>
    Visual Section: <Anchor href="#">divider</Anchor>
  </P>
</Section>
`}),_=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-z-index`,stableName:`SectionZIndex`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  backgroundColor="var(--token-color-background-neutral-subtle)"
>
  token-color-background-neutral-subtle
  <div>
    <Section
      innerSpace={{
        top: 'large',
        bottom: 'large',
      }}
      backgroundColor="var(--token-color-background-positive-subtle)"
    >
      token-color-background-positive-subtle
      <div>
        <Section
          innerSpace={{
            top: 'large',
            bottom: 'large',
          }}
          textColor="var(--token-color-text-neutral-ondark)"
          backgroundColor="var(--token-color-background-info)"
        >
          token-color-background-info
          <div>
            <Section
              innerSpace={{
                top: 'large',
                bottom: 'large',
              }}
              textColor="var(--token-color-text-neutral-ondark)"
              backgroundColor="var(--token-color-background-marketing)"
            >
              token-color-background-marketing
              <div>
                <Section
                  innerSpace={{
                    top: 'large',
                    bottom: 'large',
                  }}
                  textColor="var(--token-color-text-neutral-ondark)"
                  backgroundColor="var(--token-color-background-error)"
                >
                  token-color-background-error
                  <div>
                    <Section
                      innerSpace={{
                        top: 'large',
                        bottom: 'large',
                      }}
                      backgroundColor="var(--token-color-background-warning-subtle)"
                    >
                      token-color-background-warning-subtle
                      <div>
                        <Section
                          innerSpace={{
                            top: 'large',
                            bottom: 'large',
                          }}
                          backgroundColor="var(--token-color-background-neutral-subtle)"
                        >
                          token-color-background-neutral-subtle
                          <div>
                            <Section
                              innerSpace={{
                                top: 'large',
                                bottom: 'large',
                              }}
                              backgroundColor="var(--token-color-background-marketing-subtle)"
                            >
                              token-color-background-marketing-subtle
                              <div>
                                <Section
                                  innerSpace={{
                                    top: 'large',
                                    bottom: 'large',
                                  }}
                                  variant="divider"
                                >
                                  divider
                                </Section>
                              </div>
                            </Section>
                          </div>
                        </Section>
                      </div>
                    </Section>
                  </div>
                </Section>
              </div>
            </Section>
          </div>
        </Section>
      </div>
    </Section>
  </div>
</Section>
`}),v=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-information`,stableName:`Info`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  variant="information"
>
  <P space={0}>
    Generic information section: <Anchor href="#">info</Anchor>
  </P>
</Section>
`}),y=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-error`,stableName:`WithError`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  variant="error"
>
  <P space={0}>
    Error section: <Anchor href="#">error</Anchor>
  </P>
</Section>
`}),b=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-warning`,stableName:`Warning`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  variant="warning"
>
  <P space={0}>
    Warning section: <Anchor href="#">warning</Anchor>
  </P>
</Section>
`}),x=()=>(0,l.jsx)(s,{hideCode:!0,"data-visual-test":`section-success`,stableName:`Success`,sourceImports:[`import { Section, P, Anchor } from '@dnb/eufemia'`],__buildScope:{Section:a,P:i,Anchor:r},children:`<Section
  innerSpace={{
    top: 'large',
    bottom: 'large',
  }}
  variant="success"
>
  <P space={0}>
    Success section: <Anchor href="#">success</Anchor>
  </P>
</Section>
`});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return c||w(`Examples`,!1),f||w(`Examples.DarkSurface`,!0),u||w(`Examples.Default`,!0),g||w(`Examples.Divider`,!0),v||w(`Examples.Info`,!0),d||w(`Examples.NoBreakout`,!0),p||w(`Examples.ResponsiveAppearance`,!0),m||w(`Examples.ResponsiveInnerSpace`,!0),_||w(`Examples.SectionZIndex`,!0),h||w(`Examples.Spacing`,!0),x||w(`Examples.Success`,!0),b||w(`Examples.Warning`,!0),y||w(`Examples.WithError`,!0),n||w(`VisibleWhenVisualTest`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Default Section`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Default Section with inner space`}),`
`,(0,l.jsx)(h,{}),`
`,(0,l.jsx)(t.h3,{children:`Responsive inner space (padding)`}),`
`,(0,l.jsxs)(t.p,{children:[`Where `,(0,l.jsx)(t.code,{children:`innerSpace`}),` do respond on different screen sizes.`]}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Responsive appearance`}),`
`,(0,l.jsxs)(t.p,{children:[`Where `,(0,l.jsx)(t.code,{children:`breakout`}),`, `,(0,l.jsx)(t.code,{children:`outline`}),`, `,(0,l.jsx)(t.code,{children:`roundedCorner`}),`, `,(0,l.jsx)(t.code,{children:`backgroundColor`}),` and `,(0,l.jsx)(t.code,{children:`dropShadow`}),` do respond on different screen sizes.`]}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`No breakout`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,l.jsxs)(t.p,{children:[`Use `,(0,l.jsx)(t.a,{href:`/uilib/components/section/demos/#dark-surface`,children:`Section`}),` or `,(0,l.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme#surface-property`,children:`Theme.Context`}),` with `,(0,l.jsx)(t.code,{children:`surface="dark"`}),` to provide dark surface context to supporting components.`]}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Variant: divider`}),`
`,(0,l.jsx)(g,{}),`
`,(0,l.jsx)(t.h3,{children:`Variant: info`}),`
`,(0,l.jsx)(v,{}),`
`,(0,l.jsx)(t.h3,{children:`Variant: error`}),`
`,(0,l.jsx)(y,{}),`
`,(0,l.jsx)(t.h3,{children:`Variant: warning`}),`
`,(0,l.jsx)(b,{}),`
`,(0,l.jsx)(t.h3,{children:`Variant: success`}),`
`,(0,l.jsx)(x,{}),`
`,(0,l.jsx)(n,{children:(0,l.jsx)(_,{})})]})}function C(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};