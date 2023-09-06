"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[99739],{82803:function(n,e,t){t.r(e),t.d(e,{default:function(){return f}});var o=t(52322),a=t(45392),r=t(82058),i=t(30730),s=(t(2784),t(72210)),l=t(21759),u=t(27197),c=t(80658),p=t(75482);const d=()=>(0,o.jsx)(r.Z,{scope:{Code:i.Z,DataContext:s.Z,Layout:l.Z,StepsLayout:u.Z,Field:c.Z,Value:p.Z},hideCode:!0,noInline:!0,children:'const App = () => {\n  const [data, setData] = React.useState({})\n  return (\n    <>\n      <GlobalStatus />\n      <DataContext.Provider\n        data={data}\n        onChange={setData}\n        onSubmit={(data) => console.log(\'onSubmit\', data)}\n      >\n        <StepsLayout top>\n          <StepsLayout.Step title="Bedriftsopplysninger">\n            <Layout.MainHeading>Bedriftsopplysninger</Layout.MainHeading>\n            <Layout.Card spacing="medium">\n              <Field.OrganizationNumber\n                path="/companyOrganizationNumber"\n                required\n              />\n              <Field.String\n                path="/companyName"\n                label="Bedriftens navn"\n                required\n              />\n              <Field.String\n                path="/companyAddress"\n                label="Forretningsadresse (NB! Ikke postadresse)"\n                required\n              />\n              <Field.PostalCodeAndCity\n                postalCode={{\n                  path: \'/companyPostalCode\',\n                }}\n                city={{\n                  path: \'/companyCity\',\n                }}\n              />\n              <Field.Selection\n                variant="radio"\n                path="/postalAddressSelect"\n                label="Postadresse (ønsket sted for tilsendt post)"\n              >\n                <Field.Option\n                  value="companyAddress"\n                  title="Samme som forretningsadresse"\n                />\n                <Field.Option value="other" title="Annet" />\n              </Field.Selection>\n              <Field.Selection\n                variant="radio"\n                path="/hqAddress"\n                label="Hovedkontoradresse"\n              >\n                <Field.Option\n                  value="companyAddress"\n                  title="Samme som forretningsadresse"\n                />\n                <Field.Option\n                  value="postalAddress"\n                  title="Samme som postadresse"\n                />\n                <Field.Option value="other" title="Annet" />\n              </Field.Selection>\n              <Field.SelectCountry\n                path="/countryOfEstablishment"\n                label="Etableringsland"\n                required\n              />\n            </Layout.Card>\n            <Layout.Card spacing="medium">\n              <Field.PhoneNumber\n                path="/phoneNumber"\n                label="Telefon/mobilnummer"\n                required\n              />\n              <Field.Email path="/email" required />\n              <Field.String\n                path="/website"\n                label="Nettstedsadresse (valgfritt)"\n              />\n            </Layout.Card>\n\n            <Layout.ButtonRow>\n              <StepsLayout.NextButton />\n            </Layout.ButtonRow>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Kontaktperson">\n            <Layout.MainHeading>Profile</Layout.MainHeading>\n\n            <Layout.Card stack>\n              <Layout.SubHeading>More information</Layout.SubHeading>\n\n              <Field.NationalIdentityNumber path="/ssn" />\n              <Field.Email path="/email" />\n              <Field.PhoneNumber path="/phone" />\n            </Layout.Card>\n\n            <Layout.ButtonRow>\n              <StepsLayout.PreviousButton />\n              <StepsLayout.NextButton />\n            </Layout.ButtonRow>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Bedriftens virksomhet">\n            <em>Bedriftens virksomhet</em>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Bruk av DNBs tjenester">\n            <em>Bruk av DNBs tjenester</em>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Inntekt og egenkapital">\n            <em>Inntekt og egenkapital</em>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Skatterapportering">\n            <em>Skatterapportering</em>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Eierskap og kontroll">\n            ...\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Roller i bedriften">\n            ...\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Oppsummering">\n            <Layout.MainHeading>Profile</Layout.MainHeading>\n\n            <Layout.Card stack>\n              <Layout.FlexContainer direction="row">\n                <Value.FirstName path="/firstName" />\n                <Value.LastName path="/lastName" />\n              </Layout.FlexContainer>\n\n              <Value.NationalIdentityNumber path="/ssn" />\n              <Value.Email path="/email" />\n              <Value.PhoneNumber path="/phone" />\n            </Layout.Card>\n\n            <Layout.ButtonRow>\n              <StepsLayout.PreviousButton />\n              <DataContext.SubmitButton />\n            </Layout.ButtonRow>\n          </StepsLayout.Step>\n\n          <StepsLayout.Step title="Kvittering">\n            Kvittering...\n          </StepsLayout.Step>\n        </StepsLayout>\n      </DataContext.Provider>\n\n      <Section\n        element="output"\n        spacing\n        style_type="sand-yellow"\n        top\n        bottom="large"\n      >\n        JSON Output: <Code>{JSON.stringify(data, null, 4)}</Code>\n      </Section>\n    </>\n  )\n}\nrender(<App />)\n'});function m(n){const e=Object.assign({h1:"h1"},(0,a.ah)(),n.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{children:"Bli bedriftskunde"}),"\n",(0,o.jsx)("br",{}),"\n",(0,o.jsx)(d,{})]})}var f=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(m,n)})):m(n)}},32351:function(n,e,t){t.d(e,{ZP:function(){return z}});var o={};t.r(o),t.d(o,{Blockquote:function(){return u.Z},Code:function(){return c.Z},Dd:function(){return p.Z},Div:function(){return l.Z},Dl:function(){return d.Z},Dt:function(){return m.Z},H:function(){return f.Z},H1:function(){return v.Z},H2:function(){return h.Z},H3:function(){return b.Z},H4:function(){return S.Z},H5:function(){return x.Z},H6:function(){return g.Z},Hr:function(){return y.Z},Img:function(){return Z.Z},Ingress:function(){return N.Z},Lead:function(){return L.Z},Li:function(){return C.Z},Link:function(){return j.Z},Ol:function(){return P.Z},P:function(){return _.Z},Paragraph:function(){return E.Z},Span:function(){return w.Z},Td:function(){return F.Z},Th:function(){return k.Z},Tr:function(){return B.Z},Ul:function(){return O.Z}});var a=t(2784),r=t(72779),i=t.n(r),s=t(80215),l=t(34107),u=t(71704),c=t(30730),p=t(5988),d=t(80737),m=t(45268),f=t(60575),v=t(81989),h=t(63577),b=t(80247),S=t(46705),x=t(50739),g=t(65285),y=t(85192),Z=t(95084),N=t(20354),L=t(58984),C=t(65359),j=t(37983),P=t(76987),_=t(88268),E=t(7591),w=t(65731),F=t(6210),k=t(64223),B=t(41676),O=t(42351),H=t(63472),I=t(64492),A=t(36105),D=t(52322);function M(n){return n.type===I.Z||n.type===A.Z}const R=n=>{var e,t,o;if(a.isValidElement(n))return null!==(e=null===(t=n.props)||void 0===t?void 0:t.top)&&void 0!==e?e:"object"==typeof(null===(o=n.props)||void 0===o?void 0:o.space)?n.props.space.top:void 0},V=n=>{var e,t,o;if(a.isValidElement(n))return null!==(e=null===(t=n.props)||void 0===t?void 0:t.bottom)&&void 0!==e?e:"object"==typeof(null===(o=n.props)||void 0===o?void 0:o.space)?n.props.space.bottom:void 0},$=n=>{var e;return a.isValidElement(n)&&!0===(null==n||null===(e=n.type)||void 0===e?void 0:e._supportsEufemiaSpacingProps)||(n=>Object.values(o).some((e=>(null==n?void 0:n.type)===e)))(n)},q=(n,e)=>$(n)?a.cloneElement(n,e):(0,D.jsx)(l.Z,{...e,children:n});function T(n){const{className:e,children:t,direction:o="column",wrap:r=!1,justify:u="flex-start",align:c="stretch",divider:p="space",spacing:d="small",width:m}=n,f=i()("dnb-forms-flex-container",o&&`dnb-forms-flex-container--direction-${o}`,u&&`dnb-forms-flex-container--justify-${u}`,c&&`dnb-forms-flex-container--align-${c}`,r&&"dnb-forms-flex-container--wrap",p&&`dnb-forms-flex-container--divider-${p}`,d&&`dnb-forms-flex-container--spacing-${d}`,m&&`dnb-forms-flex-container--width-${m}`,e),v=a.Children.toArray(t);return(0,D.jsx)(l.Z,{className:f,...(0,H.p)(n),children:"column"===o?v.map(((n,e)=>{var t,o;const r=0===e,i=null==v?void 0:v[e-1],l=M(n),u=e>0&&M(i);if("line"===p&&!r&&!u&&!l){var c,m;const t=null!==(c=V(i))&&void 0!==c?c:d,o=null!==(m=R(n))&&void 0!==m?m:d;return(0,D.jsxs)(a.Fragment,{children:[(0,D.jsx)(s.Z,{top:t}),(0,D.jsx)("hr",{className:"dnb-forms-flex-container__hr"}),q(n,{space:{top:o,bottom:0},top:o,bottom:0})]},`element-${e}`)}const f=r?0:null!==(t=null!==(o=R(n))&&void 0!==o?o:V(i))&&void 0!==t?t:d;return q(n,{key:`element-${e}`,space:{top:f,bottom:0},top:f,bottom:0})})):t})}T._supportsEufemiaSpacingProps=!0;var z=T},64492:function(n,e,t){var o=t(72779),a=t.n(o),r=t(86),i=t(63472),s=t(52322);function l(n){const{className:e,children:t}=n;return(0,s.jsx)(r.ZP,{className:a()("dnb-forms-main-heading",e),level:"2",size:"large",...(0,i.p)(n),children:t})}l._supportsEufemiaSpacingProps=!0,e.Z=l},36105:function(n,e,t){var o=t(72779),a=t.n(o),r=t(86),i=t(63472),s=t(52322);function l(n){const{className:e,children:t}=n;return(0,s.jsx)(r.ZP,{className:a()("dnb-forms-sub-heading",e),level:"3",size:"medium",...(0,i.p)(n),children:t})}l._supportsEufemiaSpacingProps=!0,e.Z=l},21759:function(n,e,t){t.d(e,{Z:function(){return C}});var o=t(66151),a=t(72779),r=t.n(a),i=t(63472),s=t(32351),l=t(34107),u=t(52322);function c(n){const{className:e,grow:t,shrink:o,width:a,children:s}=n,c=r()("dnb-forms-flex-item",t&&"dnb-forms-flex-item--grow",o&&"dnb-forms-flex-item--shrink",a&&`dnb-forms-flex-item--width-${a}`,e);return(0,u.jsx)(l.Z,{className:c,...(0,i.p)(n),children:s})}c._supportsEufemiaSpacingProps=!0;var p=c;function d(n){const{className:e,stack:t,direction:o,spacing:a,children:l}=n;return t?(0,u.jsx)(s.ZP,{className:r()("dnb-forms-card",e),direction:"column",divider:"line",spacing:null!=a?a:"medium",...(0,i.p)(n),children:l}):o||a?(0,u.jsx)(s.ZP,{className:r()("dnb-forms-card",e),direction:null!=o?o:"column",divider:"space",spacing:null!=a?a:"small",...(0,i.p)(n),children:l}):(0,u.jsx)(p,{className:r()("dnb-forms-card",e),...(0,i.p)(n),children:l})}d._supportsEufemiaSpacingProps=!0;var m=d;function f(n){const{className:e,direction:t,spacing:o,children:a}=n;return(0,u.jsx)(s.ZP,{className:r()("dnb-forms-section",e),direction:null!=t?t:"column",spacing:null!=o?o:"small",...(0,i.p)(n),children:a})}f._supportsEufemiaSpacingProps=!0;var v=f,h=t(64492),b=t(36105);function S(n){let{children:e,...t}=n;return(0,u.jsx)(s.ZP,{direction:"row",...t,children:e})}S._supportsEufemiaSpacingProps=!0;var x=S;function g(n){let{children:e,...t}=n;return(0,u.jsx)(s.ZP,{direction:"column",...t,children:e})}g._supportsEufemiaSpacingProps=!0;var y=g,Z=t(66654);function N(n){const{className:e}=n;return(0,u.jsx)(v,{className:r()("dnb-forms-info-card-section",e),...(0,i.p)(n),children:(0,u.jsx)(Z.Z,{...(0,i.N)(n)})})}N._supportsEufemiaSpacingProps=!0;var L=N;var C={ButtonRow:o.Z,Card:m,FlexContainer:s.ZP,FlexItem:p,Section:v,MainHeading:h.Z,SubHeading:b.Z,Row:x,Column:y,InfoCardSection:L}},59626:function(n,e,t){const o=t(2784).createContext(void 0);e.Z=o},27197:function(n,e,t){t.d(e,{Z:function(){return j}});var o=t(2784),a=t(72779),r=t.n(a),i=t(34107),s=t(76603),l=t(66485),u=t(63472),c=t(21068),p=t(32351),d=t(59626),m=t(52322);function f(n){const{className:e,index:t,direction:a="column",spacing:i="medium",children:s}=n,l=(0,o.useContext)(d.Z);return(null==l?void 0:l.activeIndex)!==t?null:(0,m.jsx)(p.ZP,{className:r()("dnb-forms-step",e),direction:a,spacing:i,...(0,u.p)(n),children:s})}f._supportsEufemiaSpacingProps=!0;var v=f,h=t(96844),b=t(32831);function S(n){const e=(0,o.useContext)(b.Z),{className:t,variant:a="primary",icon_position:i="right",icon:s="chevron_right",children:l=(null==e?void 0:e.translation.Forms.stepNext)}=n,u=(0,o.useContext)(d.Z);return(0,m.jsx)(h.Z,{...n,className:r()("dnb-forms-next-button",t),onClick:null==u?void 0:u.handleNext,variant:a,icon_position:i,icon:s,children:l})}S._supportsEufemiaSpacingProps=!0;var x=S;function g(n){const e=(0,o.useContext)(b.Z),{className:t,variant:a="tertiary",icon_position:i="left",icon:s="chevron_left",children:l=(null==e?void 0:e.translation.Forms.stepPrevious)}=n,u=(0,o.useContext)(d.Z);return(0,m.jsx)(h.Z,{...n,className:r()("dnb-forms-previous-button",t),onClick:null==u?void 0:u.handlePrevious,variant:a,icon_position:i,icon:s,children:l})}g._supportsEufemiaSpacingProps=!0;var y=g,Z=t(66151);function N(n){const{className:e}=n;return(0,m.jsxs)(Z.Z,{className:r()("dnb-forms-buttons",e),...(0,u.p)(n),children:[(0,m.jsx)(y,{}),(0,m.jsx)(x,{})]})}N._supportsEufemiaSpacingProps=!0;var L=N;function C(n){const{className:e,id:t=(0,l.Xo)(),mode:a="loose",scrollTopOnStepChange:p,initialActiveIndex:f=0,onStepChange:h,children:b}=n,S=(0,o.useContext)(c.Z),{0:x,1:g}=(0,o.useState)(f),y=(0,o.useCallback)((()=>{var n;(g((n=>(null==h||h(n-1),n-1))),p)&&(null===(n=window)||void 0===n||n.scrollTo({top:0,behavior:"smooth"}))}),[p,h]),Z=(0,o.useCallback)((()=>{var n;S.hasErrors()?S.setShowAllErrors(!0):(g((n=>(null==h||h(n+1),n+1))),p&&(null===(n=window)||void 0===n||n.scrollTo({top:0,behavior:"smooth"})))}),[S,p,h]),N=o.Children.map(b,(n=>{var e;if(!o.isValidElement(n)||n.type!==v)throw new Error("Only Step can be children of StepsLayout");return null!==(e=n.props.title)&&void 0!==e?e:"Title missing"})),L=(0,o.useCallback)((n=>{let{current_step:e}=n;g(e)}),[]);return(0,m.jsx)(d.Z.Provider,{value:{activeIndex:x,handlePrevious:y,handleNext:Z},children:(0,m.jsxs)(i.Z,{className:r()("dnb-forms-steps-layout",e),...(0,u.p)(n),children:[(0,m.jsxs)("aside",{className:"dnb-forms-steps-layout__sidebar",children:[(0,m.jsx)(s.Z.Sidebar,{sidebar_id:t}),(0,m.jsx)(s.Z,{bottom:!0,current_step:x,data:N,mode:a,no_animation:!0,on_change:L,sidebar_id:t,title:""})]}),(0,m.jsx)("div",{className:"dnb-forms-steps-layout__contents",children:o.Children.map(b,((n,e)=>o.isValidElement(n)&&n.type===v?o.cloneElement(n,{index:e}):n))})]})})}C._supportsEufemiaSpacingProps=!0,C.Step=v,C.NextButton=x,C.PreviousButton=y,C.Buttons=L;var j=C},75482:function(n,e,t){t.d(e,{Z:function(){return H}});var o=t(49406),a=t(63472),r=t(2784),i=t(95955),s=t.n(i),l=t(72210);function u(n){const{path:e}=n,t=(0,r.useContext)(l.Z.Context);if(e&&"/"!==e.substring(0,1))throw new Error("Invalid path. Input path JSON Pointers  must be from root (starting with a /).");const o=(0,r.useMemo)((()=>{var o;return null!==(o=n.value)&&void 0!==o?o:t.data&&void 0!==e&&s().has(t.data,e)?s().get(t.data,e):void 0}),[e,n.value,t.data]);return{...n,value:o}}var c=t(52322);function p(n){const{className:e,label:t,placeholder:r,value:i,inline:s,showEmpty:l,prepare:p=(n=>n)}=u(n);return(0,c.jsx)(o.Z,{className:e,label:t,showEmpty:l,placeholder:r,inline:s,...(0,a.p)(n),children:p(i)})}p._supportsEufemiaSpacingProps=!0;var d=p;function m(n,e){const{thousandSeparator:t,decimalLimit:o,fixedDecimals:a,decimalSymbol:r=",",magnitude:i,prefix:s,suffix:l}=null!=e?e:{},u=void 0!==i?n/Math.pow(10,i):n,c=void 0!==a?u.toFixed(a):o?(Math.round(u*Math.pow(10,o))/Math.pow(10,o)).toString():u.toString(),p=void 0!==r?c.replace(".",r):c,d=void 0!==t?p.replace(/\B(?=(\d{3})+(?!\d))/g,t):p,m=void 0!==s?s+d:d;return void 0!==l?m+l:m}function f(n){const{className:e,label:t,placeholder:r,value:i,inline:s,showEmpty:l,thousandSeparator:p,decimalSymbol:d,decimalLimit:f,prefix:v,suffix:h}=u(n);return(0,c.jsx)(o.Z,{className:e,label:t,showEmpty:l,placeholder:r,inline:s,...(0,a.p)(n),children:void 0!==i?m(i,{thousandSeparator:!0===p?" ":p,decimalSymbol:d,decimalLimit:f,prefix:v,suffix:h}):null})}f._supportsEufemiaSpacingProps=!0;var v=f,h=t(32831);function b(n){const e=(0,r.useContext)(h.Z),{className:t,label:i,placeholder:s,showEmpty:l,value:p,inline:d}=u(n);return(0,c.jsx)(o.Z,{className:t,label:i,showEmpty:l,placeholder:s,inline:d,...(0,a.p)(n),children:!0===p||!1===p?!0===p?null==e?void 0:e.translation.Forms.booleanYes:null==e?void 0:e.translation.Forms.booleanNo:null})}b._supportsEufemiaSpacingProps=!0;var S=b;function x(n){var e,t;const o={...n,label:n.label,thousandSeparator:null!==(e=n.thousandSeparator)&&void 0!==e?e:" ",suffix:null!==(t=n.suffix)&&void 0!==t?t:" kr"};return(0,c.jsx)(v,{...o})}x._supportsEufemiaSpacingProps=!0;var g=x;function y(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:null==t?void 0:t.translation.Forms.dateLabel};return(0,c.jsx)(d,{...o})}y._supportsEufemiaSpacingProps=!0;var Z=y;function N(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:null==t?void 0:t.translation.Forms.emailLabel};return(0,c.jsx)(d,{...o})}N._supportsEufemiaSpacingProps=!0;var L=N;function C(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:null==t?void 0:t.translation.Forms.firstNameLabel};return(0,c.jsx)(d,{...o})}C._supportsEufemiaSpacingProps=!0;var j=C;function P(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:null==t?void 0:t.translation.Forms.lastNameLabel};return(0,c.jsx)(d,{...o})}P._supportsEufemiaSpacingProps=!0;var _=P,E=t(41672);function w(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==t?void 0:t.translation.Forms.nationalIdentityNumberLabel,prepare:n=>(0,E.WU)((0,E.bR)(n),{nin:!0}).toString()};return(0,c.jsx)(d,{...o})}w._supportsEufemiaSpacingProps=!0;var F=w;function k(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==t?void 0:t.translation.Forms.phoneNumberLabel,prepare:n=>(0,E.WU)((0,E.bR)(n),{phone:!0}).toString()};return(0,c.jsx)(d,{...o})}k._supportsEufemiaSpacingProps=!0;var B=k;function O(n){var e;const t=(0,r.useContext)(h.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==t?void 0:t.translation.Forms.bankAccountNumberLabel,prepare:n=>(0,E.WU)((0,E.bR)(n),{ban:!0}).toString()};return(0,c.jsx)(d,{...o})}O._supportsEufemiaSpacingProps=!0;var H={String:d,Number:v,Boolean:S,Currency:g,Date:Z,Email:L,FirstName:j,LastName:_,NationalIdentityNumber:F,PhoneNumber:B,BankAccountNumber:O}},49406:function(n,e,t){var o=t(65731),a=t(94799),r=t(63472),i=t(72779),s=t.n(i),l=t(52322);function u(n){const{className:e,label:t,inline:i,placeholder:u,showEmpty:c,children:p}=n;return null!=p&&!1!==p||c||u?(0,l.jsxs)(o.Z,{className:s()("dnb-forms-value",i&&"dnb-forms-value-block--inline",e),...(0,r.p)(n),children:[t&&(0,l.jsx)(a.Z,{className:"dnb-forms-value-block__label",label_direction:i?"horizontal":"vertical",children:t}),null!=p?p:(0,l.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsEufemiaSpacingProps=!0,e.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-casedemo-1-mdx-fa948bc52ac7662feedd.js.map