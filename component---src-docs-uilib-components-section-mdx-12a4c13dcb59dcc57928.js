"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[23109,56042,45056],{13663:function(n,e,o){o.r(e);var r=o(52322),i=o(45392),t=o(4748),c=o(21761);function a(n){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.default,{}),"\n",(0,r.jsx)(c.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(a,n)})):a()}},21761:function(n,e,o){o.r(e);var r=o(52322),i=o(45392),t=o(43380);function c(n){const e=Object.assign({h3:"h3",p:"p",a:"a",h2:"h2",code:"code"},(0,i.ah)(),n.components),{VisibleWhenVisualTest:o}=e;return t||a("Examples",!1),t.Default||a("Examples.Default",!0),t.Divider||a("Examples.Divider",!0),t.Info||a("Examples.Info",!0),t.NoBreakout||a("Examples.NoBreakout",!0),t.ResponsiveAppearance||a("Examples.ResponsiveAppearance",!0),t.ResponsiveInnerSpace||a("Examples.ResponsiveInnerSpace",!0),t.SectionZIndex||a("Examples.SectionZIndex",!0),t.Spacing||a("Examples.Spacing",!0),t.Success||a("Examples.Success",!0),t.Warning||a("Examples.Warning",!0),t.White||a("Examples.White",!0),t.WithError||a("Examples.WithError",!0),o||a("VisibleWhenVisualTest",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h3,{children:"Deprecated color styles"}),"\n",(0,r.jsxs)(e.p,{children:["These ",(0,r.jsx)(e.a,{href:"/uilib/components/section/deprecated/",children:"color styles"})," are deprecated and will be removed in v11 of Eufemia."]}),"\n",(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Default Section"}),"\n",(0,r.jsx)(t.Default,{}),"\n",(0,r.jsx)(e.h3,{children:"Default Section with inner space"}),"\n",(0,r.jsx)(t.Spacing,{}),"\n",(0,r.jsx)(e.h3,{children:"Responsive inner space (padding)"}),"\n",(0,r.jsxs)(e.p,{children:["Where ",(0,r.jsx)(e.code,{children:"innerSpace"})," do respond on different screen sizes."]}),"\n",(0,r.jsx)(t.ResponsiveInnerSpace,{}),"\n",(0,r.jsx)(e.h3,{children:"Responsive appearance"}),"\n",(0,r.jsxs)(e.p,{children:["Where ",(0,r.jsx)(e.code,{children:"breakout"}),", ",(0,r.jsx)(e.code,{children:"outline"}),", ",(0,r.jsx)(e.code,{children:"roundedCorner"}),", ",(0,r.jsx)(e.code,{children:"backgroundColor"})," and ",(0,r.jsx)(e.code,{children:"dropShadow"})," do respond on different screen sizes."]}),"\n",(0,r.jsx)(t.ResponsiveAppearance,{}),"\n",(0,r.jsx)(e.h3,{children:"No breakout"}),"\n",(0,r.jsx)(t.NoBreakout,{}),"\n",(0,r.jsx)(e.h3,{children:"White Section"}),"\n",(0,r.jsx)(e.p,{children:"Will be default in v11."}),"\n",(0,r.jsx)(t.White,{}),"\n",(0,r.jsx)(e.h3,{children:"Divider Section"}),"\n",(0,r.jsx)(t.Divider,{}),"\n",(0,r.jsx)(e.h3,{children:"Variant: info"}),"\n",(0,r.jsx)(t.Info,{}),"\n",(0,r.jsx)(e.h3,{children:"Variant: error"}),"\n",(0,r.jsx)(t.WithError,{}),"\n",(0,r.jsx)(e.h3,{children:"Variant: warning"}),"\n",(0,r.jsx)(t.Warning,{}),"\n",(0,r.jsx)(e.h3,{children:"Variant: success"}),"\n",(0,r.jsx)(t.Success,{}),"\n",(0,r.jsx)(o,{children:(0,r.jsx)(t.SectionZIndex,{})})]})}function a(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(c,n)})):c(n)}},4748:function(n,e,o){o.r(e);var r=o(52322),i=o(45392);function t(n){const e=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",h3:"h3",a:"a",ul:"ul",li:"li"},(0,i.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Import"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { Section } from '@dnb/eufemia'\n"})}),"\n",(0,r.jsx)(e.h2,{children:"Description"}),"\n",(0,r.jsx)(e.p,{children:"The Section component is a visual helper. It wraps content inside a visual section banner."}),"\n",(0,r.jsx)(e.h3,{children:"Breakout / fullscreen"}),"\n",(0,r.jsxs)(e.p,{children:["Under the hood it uses a couple of tricks to get an infinite fullscreen size. You don't need to do anything more than you else would do with your content. The background from the Section component will go beyond a ",(0,r.jsx)(e.code,{children:"max-width"})," when enabled with the ",(0,r.jsx)(e.code,{children:"breakout"})," property."]}),"\n",(0,r.jsx)(e.h2,{children:"Usage"}),"\n",(0,r.jsxs)(e.p,{children:["Many of the properties to support ",(0,r.jsx)(e.a,{href:"/uilib/layout/media-queries/",children:"media queries"}),". This makes this component a well suited component to change its look based on screen sizes."]}),"\n",(0,r.jsx)(e.p,{children:"Each of these properties do support either a single value or an object containing one or more media query sizes:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"{\n  small: false,\n  medium: true,\n  large: true,\n}\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"breakout={boolean}"})," or e.g. ",(0,r.jsx)(e.code,{children:"breakout={{ small: boolean }}"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"roundedCorner={boolean}"})," or e.g. ",(0,r.jsx)(e.code,{children:"roundedCorner={{ small: boolean }}"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"outline={boolean|string}"})," or e.g. ",(0,r.jsx)(e.code,{children:"outline={{ small: 'black' }}"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"backgroundColor={string}"})," or e.g. ",(0,r.jsx)(e.code,{children:"backgroundColor={{ small: 'white' }}"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"textColor={string}"})," or e.g. ",(0,r.jsx)(e.code,{children:"textColor={{ small: 'black-80' }}"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"innerSpace={string}"})," or e.g. ",(0,r.jsx)(e.code,{children:"innerSpace={{ small: { top: 'small' } }}"})]}),"\n"]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(t,n)})):t(n)}},43380:function(n,e,o){o.r(e),o.d(e,{Black3:function(){return S},Default:function(){return t},Divider:function(){return h},EmeraldGreen:function(){return g},FireRed:function(){return f},FireRed8:function(){return b},Info:function(){return C},Lavender:function(){return x},MintGreen:function(){return u},NoBreakout:function(){return c},Pistachio:function(){return j},ResponsiveAppearance:function(){return a},ResponsiveInnerSpace:function(){return s},SandYellow:function(){return m},SeaGreen:function(){return p},SectionZIndex:function(){return v},Spacing:function(){return l},Success:function(){return A},Warning:function(){return P},White:function(){return d},WithError:function(){return k}});var r=o(41404),i=o(52322);const t=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-default",children:'<Section>\n  <P space={0}>\n    Visual Section: <Anchor href="#">default</Anchor>\n  </P>\n</Section>\n'}),c=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-no-breakout",children:'<Section breakout={false} backgroundColor="pistachio">\n  <P space={0}>No breakout</P>\n</Section>\n'}),a=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-responsive-appearance",children:"<Section\n  breakout={{\n    small: true,\n    medium: false,\n    large: false,\n  }}\n  outline={{\n    medium: true,\n    large: 'black',\n  }}\n  roundedCorner={{\n    large: true,\n  }}\n  backgroundColor={{\n    small: 'white',\n    medium: 'pistachio',\n    large: 'pistachio',\n  }}\n  dropShadow={{\n    small: false,\n    medium: true,\n    large: true,\n  }}\n  innerSpace\n>\n  <P space={0}>Responsive properties</P>\n</Section>\n"}),s=()=>(0,i.jsx)(r.Z,{hideCode:!0,children:"<Section\n  innerSpace={{\n    small: {\n      top: 'small',\n      bottom: 'small',\n    },\n    medium: true,\n    large: false,\n  }}\n  backgroundColor=\"pistachio\"\n  breakout={false}\n>\n  <P space={0}>Responsive innerSpace</P>\n</Section>\n"}),l=()=>(0,i.jsx)(r.Z,{hideCode:!0,children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n    left: 'small',\n  }}\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">default with innerSpace</Anchor>\n  </P>\n</Section>\n"}),d=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-white",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"white\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">white</Anchor>\n  </P>\n</Section>\n"}),h=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-divider",children:"<Section\n  innerSpace={{\n    top: 'medium',\n    bottom: 'medium',\n  }}\n  variant=\"divider\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">divider</Anchor>\n  </P>\n</Section>\n"}),u=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-mint-green",children:"<Section\n  innerSpace={{\n    top: 'small',\n    bottom: 'small',\n  }}\n  backgroundColor=\"mint-green\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">mint-green</Anchor>\n  </P>\n</Section>\n"}),p=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-sea-green",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  style_type=\"sea-green\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">sea-green</Anchor>\n  </P>\n</Section>\n"}),g=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-emerald-green",children:"<Section\n  innerSpace={{\n    top: 'medium',\n    bottom: 'medium',\n  }}\n  style_type=\"emerald-green\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">emerald-green</Anchor>\n  </P>\n</Section>\n"}),x=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-lavender",children:'<Section\n  innerSpace={{\n    top: \'small\',\n    bottom: \'small\',\n  }}\n  textColor="black-80"\n  backgroundColor="lavender"\n>\n  <P space={0}>\n    Visual Section: <Anchor href="#">lavender</Anchor>\n  </P>\n</Section>\n'}),S=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-black-3",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"black-3\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">black-3</Anchor>\n  </P>\n</Section>\n"}),m=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-sand-yellow",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"sand-yellow\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">sand-yellow</Anchor>\n  </P>\n</Section>\n"}),j=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-pistachio",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"pistachio\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">pistachio</Anchor>\n  </P>\n</Section>\n"}),f=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-fire-red",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  style_type=\"fire-red\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">fire-red</Anchor>\n  </P>\n</Section>\n"}),b=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-fire-red-8",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"fire-red-8\"\n>\n  <P space={0}>\n    Visual Section: <Anchor href=\"#\">fire-red-8</Anchor>\n  </P>\n</Section>\n"}),v=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-z-index",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  backgroundColor=\"mint-green-12\"\n>\n  mint-green-12\n  <div>\n    <Section\n      innerSpace={{\n        top: 'large',\n        bottom: 'large',\n      }}\n      backgroundColor=\"mint-green\"\n    >\n      mint-green\n      <div>\n        <Section\n          innerSpace={{\n            top: 'large',\n            bottom: 'large',\n          }}\n          textColor=\"white\"\n          backgroundColor=\"sea-green\"\n        >\n          sea-green\n          <div>\n            <Section\n              innerSpace={{\n                top: 'large',\n                bottom: 'large',\n              }}\n              textColor=\"mint-green\"\n              backgroundColor=\"emerald-green\"\n            >\n              emerald-green\n              <div>\n                <Section\n                  innerSpace={{\n                    top: 'large',\n                    bottom: 'large',\n                  }}\n                  textColor=\"white\"\n                  backgroundColor=\"fire-red\"\n                >\n                  fire-red\n                  <div>\n                    <Section\n                      innerSpace={{\n                        top: 'large',\n                        bottom: 'large',\n                      }}\n                      textColor=\"black-80\"\n                      backgroundColor=\"sand-yellow\"\n                    >\n                      sand-yellow\n                      <div>\n                        <Section\n                          innerSpace={{\n                            top: 'large',\n                            bottom: 'large',\n                          }}\n                          textColor=\"black-80\"\n                          backgroundColor=\"pistachio\"\n                        >\n                          pistachio\n                          <div>\n                            <Section\n                              innerSpace={{\n                                top: 'large',\n                                bottom: 'large',\n                              }}\n                              textColor=\"black-80\"\n                              backgroundColor=\"lavender\"\n                            >\n                              lavender\n                              <div>\n                                <Section\n                                  innerSpace={{\n                                    top: 'large',\n                                    bottom: 'large',\n                                  }}\n                                  variant=\"divider\"\n                                >\n                                  divider\n                                </Section>\n                              </div>\n                            </Section>\n                          </div>\n                        </Section>\n                      </div>\n                    </Section>\n                  </div>\n                </Section>\n              </div>\n            </Section>\n          </div>\n        </Section>\n      </div>\n    </Section>\n  </div>\n</Section>\n"}),C=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-info",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  variant=\"info\"\n>\n  <P space={0}>\n    Generic info section: <Anchor href=\"#\">info</Anchor>\n  </P>\n</Section>\n"}),k=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-error",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  variant=\"error\"\n>\n  <P space={0}>\n    Error section: <Anchor href=\"#\">error</Anchor>\n  </P>\n</Section>\n"}),P=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-warning",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  variant=\"warning\"\n>\n  <P space={0}>\n    Warning section: <Anchor href=\"#\">warning</Anchor>\n  </P>\n</Section>\n"}),A=()=>(0,i.jsx)(r.Z,{hideCode:!0,"data-visual-test":"section-success",children:"<Section\n  innerSpace={{\n    top: 'large',\n    bottom: 'large',\n  }}\n  variant=\"success\"\n>\n  <P space={0}>\n    Success section: <Anchor href=\"#\">success</Anchor>\n  </P>\n</Section>\n"})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-section-mdx-12a4c13dcb59dcc57928.js.map