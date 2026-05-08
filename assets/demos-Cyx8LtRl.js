import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({DarkSurface:()=>c,Default:()=>o,Divider:()=>f,Info:()=>m,NoBreakout:()=>s,ResponsiveAppearance:()=>l,ResponsiveInnerSpace:()=>u,SectionZIndex:()=>p,Spacing:()=>d,Success:()=>_,Warning:()=>g,WithError:()=>h}),a=t(),o=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-default`,children:`<Section>
  <P space={0}>
    Visual Section: <Anchor href="#">default</Anchor>
  </P>
</Section>
`}),s=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-no-breakout`,children:`<Section
  breakout={false}
  backgroundColor="var(--token-color-background-neutral-subtle)"
>
  <P space={0}>No breakout</P>
</Section>
`}),c=()=>(0,a.jsx)(n,{hideCode:!0,children:`<Section
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
`}),l=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-responsive-appearance`,children:`<Section
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
`}),u=()=>(0,a.jsx)(n,{hideCode:!0,children:`<Section
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
`}),d=()=>(0,a.jsx)(n,{hideCode:!0,children:`<Section
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
`}),f=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-divider`,children:`<Section
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
`}),p=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-z-index`,children:`<Section
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
`}),m=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-information`,children:`<Section
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
`}),h=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-error`,children:`<Section
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
`}),g=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-warning`,children:`<Section
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
`}),_=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`section-success`,children:`<Section
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
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||b(`Examples`,!1),c||b(`Examples.DarkSurface`,!0),o||b(`Examples.Default`,!0),f||b(`Examples.Divider`,!0),m||b(`Examples.Info`,!0),s||b(`Examples.NoBreakout`,!0),l||b(`Examples.ResponsiveAppearance`,!0),u||b(`Examples.ResponsiveInnerSpace`,!0),p||b(`Examples.SectionZIndex`,!0),d||b(`Examples.Spacing`,!0),_||b(`Examples.Success`,!0),g||b(`Examples.Warning`,!0),h||b(`Examples.WithError`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default Section`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Default Section with inner space`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Responsive inner space (padding)`}),`
`,(0,a.jsxs)(t.p,{children:[`Where `,(0,a.jsx)(t.code,{children:`innerSpace`}),` do respond on different screen sizes.`]}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Responsive appearance`}),`
`,(0,a.jsxs)(t.p,{children:[`Where `,(0,a.jsx)(t.code,{children:`breakout`}),`, `,(0,a.jsx)(t.code,{children:`outline`}),`, `,(0,a.jsx)(t.code,{children:`roundedCorner`}),`, `,(0,a.jsx)(t.code,{children:`backgroundColor`}),` and `,(0,a.jsx)(t.code,{children:`dropShadow`}),` do respond on different screen sizes.`]}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`No breakout`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant: divider`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant: info`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant: error`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant: warning`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant: success`}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(p,{})})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};