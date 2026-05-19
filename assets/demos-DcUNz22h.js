import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({DarkSurface:()=>l,Default:()=>s,Divider:()=>p,Info:()=>h,NoBreakout:()=>c,ResponsiveAppearance:()=>u,ResponsiveInnerSpace:()=>d,SectionZIndex:()=>m,Spacing:()=>f,Success:()=>v,Warning:()=>_,WithError:()=>g}),o=e(n()),s=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-default`,stableName:`Default`,children:`<Section>
  <P space={0}>
    Visual Section: <Anchor href="#">default</Anchor>
  </P>
</Section>
`}),c=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-no-breakout`,stableName:`NoBreakout`,children:`<Section
  breakout={false}
  backgroundColor="var(--token-color-background-neutral-subtle)"
>
  <P space={0}>No breakout</P>
</Section>
`}),l=()=>(0,o.jsx)(r,{hideCode:!0,stableName:`DarkSurface`,children:`<Section
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
`}),u=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-responsive-appearance`,stableName:`ResponsiveAppearance`,children:`<Section
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
`}),d=()=>(0,o.jsx)(r,{hideCode:!0,stableName:`ResponsiveInnerSpace`,children:`<Section
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
`}),f=()=>(0,o.jsx)(r,{hideCode:!0,stableName:`Spacing`,children:`<Section
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
`}),p=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-divider`,stableName:`Divider`,children:`<Section
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
`}),m=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-z-index`,stableName:`SectionZIndex`,children:`<Section
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
`}),h=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-information`,stableName:`Info`,children:`<Section
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
`}),g=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-error`,stableName:`WithError`,children:`<Section
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
`}),_=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-warning`,stableName:`Warning`,children:`<Section
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
`}),v=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`section-success`,stableName:`Success`,children:`<Section
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
`});function y(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||x(`Examples`,!1),l||x(`Examples.DarkSurface`,!0),s||x(`Examples.Default`,!0),p||x(`Examples.Divider`,!0),h||x(`Examples.Info`,!0),c||x(`Examples.NoBreakout`,!0),u||x(`Examples.ResponsiveAppearance`,!0),d||x(`Examples.ResponsiveInnerSpace`,!0),m||x(`Examples.SectionZIndex`,!0),f||x(`Examples.Spacing`,!0),v||x(`Examples.Success`,!0),_||x(`Examples.Warning`,!0),g||x(`Examples.WithError`,!0),n||x(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Default Section`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Default Section with inner space`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Responsive inner space (padding)`}),`
`,(0,o.jsxs)(t.p,{children:[`Where `,(0,o.jsx)(t.code,{children:`innerSpace`}),` do respond on different screen sizes.`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Responsive appearance`}),`
`,(0,o.jsxs)(t.p,{children:[`Where `,(0,o.jsx)(t.code,{children:`breakout`}),`, `,(0,o.jsx)(t.code,{children:`outline`}),`, `,(0,o.jsx)(t.code,{children:`roundedCorner`}),`, `,(0,o.jsx)(t.code,{children:`backgroundColor`}),` and `,(0,o.jsx)(t.code,{children:`dropShadow`}),` do respond on different screen sizes.`]}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`No breakout`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant: divider`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant: info`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant: error`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant: warning`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant: success`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(m,{})})]})}function b(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};