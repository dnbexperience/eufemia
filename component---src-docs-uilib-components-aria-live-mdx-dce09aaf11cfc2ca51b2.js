"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[64630,79559,88147],{28988:function(n,e,t){t.r(e);var i=t(52322),o=t(45392),a=t(58290),r=t(12482);function s(n){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.default,{}),"\n",(0,i.jsx)(r.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(s,n)})):s()}},12482:function(n,e,t){t.r(e),t.d(e,{default:function(){return u}});var i={};t.r(i),t.d(i,{AriaLiveAdditions:function(){return l},AriaLivePlayground:function(){return c}});var o=t(52322),a=t(45392),r=t(96781),s=t(50716);const c=()=>(0,o.jsx)(s.Z,{hideCode:!0,noInline:!0,children:'const priorities = [\'low\', \'high\']\nconst contents = {\n  default: \'This is a default announcement\',\n  second: \'And a second one\',\n  third: \'A third one\',\n  fourth: \'And a fourth one\',\n}\nconst priority: \'low\' | \'high\' = \'low\'\nconst defaultData = {\n  enabled: false,\n  content: contents.default,\n  priority,\n}\nfunction AriaLiveExample() {\n  const { data } = Form.useData(\'aria-live-playground\', defaultData)\n  return (\n    <Form.Handler id="aria-live-playground">\n      <Flex.Stack>\n        <Field.Boolean label="Enabled" path="/enabled" />\n        <Field.Selection\n          variant="button"\n          optionsLayout="horizontal"\n          label="Priority"\n          path="/priority"\n        >\n          {priorities.map((content) => {\n            return (\n              <Field.Option\n                key={content}\n                title={content}\n                value={content}\n              />\n            )\n          })}\n        </Field.Selection>\n\n        <Field.Selection\n          optionsLayout="horizontal"\n          label="Content"\n          path="/content"\n        >\n          {Object.entries(contents).map(([key, value]) => {\n            return <Field.Option key={key} title={key} value={value} />\n          })}\n        </Field.Selection>\n\n        <Field.String\n          label="Content as freetext"\n          path="/content"\n          multiline\n        />\n\n        <Flex.Item>\n          Output:{\' \'}\n          <AriaLive\n            delay={1000}\n            disabled={!data.enabled}\n            priority={data.priority}\n            showAnnouncement\n          >\n            Message: {data.content}\n          </AriaLive>\n        </Flex.Item>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<AriaLiveExample />)\n'}),l=()=>(0,o.jsx)(s.Z,{hideCode:!0,scope:{FieldBlock:r.Z},noInline:!0,children:'const defaultData = {\n  enabled: false,\n  content: [<P key="one">Line 1</P>],\n}\nfunction AriaLiveExample() {\n  const { data, update } = Form.useData(\'aria-live-additions\', defaultData)\n  return (\n    <Form.Handler id="aria-live-additions">\n      <Flex.Stack>\n        <Field.Boolean label="Enabled" path="/enabled" />\n\n        <FieldBlock label="Content">\n          <Form.ButtonRow>\n            <Button\n              text="Add more content"\n              variant="secondary"\n              icon="add"\n              icon_position="left"\n              on_click={() => {\n                update(\'/content\', (content) => {\n                  const c = content.length + 1\n                  content.push(<P key={c}>Line {c}</P>)\n                  return content\n                })\n              }}\n            />\n            <Button\n              text="Remove content"\n              variant="tertiary"\n              icon="subtract"\n              icon_position="left"\n              on_click={() => {\n                update(\'/content\', (content) => {\n                  content.pop()\n                  return content\n                })\n              }}\n            />\n          </Form.ButtonRow>\n        </FieldBlock>\n\n        <Flex.Item>\n          Output:{\' \'}\n          <AriaLive variant="content" disabled={!data.enabled}>\n            Message: {data.content}\n          </AriaLive>\n        </Flex.Item>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<AriaLiveExample />)\n'});function d(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),n.components);return i||h("Examples",!1),l||h("Examples.AriaLiveAdditions",!0),c||h("Examples.AriaLivePlayground",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demos"}),"\n",(0,o.jsx)(e.h3,{children:"Playground"}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(e.h3,{children:"Additions"}),"\n",(0,o.jsx)(l,{})]})}var u=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(d,n)})):d(n)};function h(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},58290:function(n,e,t){t.r(e);var i=t(52322),o=t(45392);function a(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,o.ah)(),n.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Description"}),"\n",(0,i.jsx)(e.p,{children:"AriaLive is a React component and hook that helps make your web app more accessible by adding or defining an ARIA live region that announces dynamic changes to screen readers."}),"\n",(0,i.jsx)(e.p,{children:"Use it to manually inform users using a screen reader, about changes on the screen that isn't normally covered by screen readers."}),"\n",(0,i.jsxs)(e.p,{children:["By default, the ",(0,i.jsx)(e.code,{children:"AriaLive"})," component will announce changes to the screen reader in a polite manner. This means that the announcement will wait until the screen reader is idle. This is the recommended way to use the component."]}),"\n",(0,i.jsx)(e.h2,{children:"Usage"}),"\n",(0,i.jsx)(e.p,{children:"For invisible text content:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:"import { AriaLive } from '@dnb/eufemia'\nrender(<AriaLive>invisible message to announce</AriaLive>)\n"})}),"\n",(0,i.jsx)(e.p,{children:"For content that is visible, but where changes need to be announced:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:"import { AriaLive } from '@dnb/eufemia'\nrender(\n  <AriaLive variant=\"content\">\n    <ul>\n      <li>item one</li>\n      <li>item two</li>\n      {/* When item three appears, it will be announced */}\n    </ul>\n  </AriaLive>,\n)\n"})}),"\n",(0,i.jsx)(e.h2,{children:"Priority"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"priority"})," prop in the ",(0,i.jsx)(e.code,{children:"AriaLive"})," component is used to control the urgency of the announcement. It can be set to ",(0,i.jsx)(e.code,{children:"high"})," (defaults to ",(0,i.jsx)(e.code,{children:"low"}),"). This allows you to control how assertive the announcement should be, helping to create a better user experience for users who rely on screen readers."]}),"\n",(0,i.jsx)(e.h2,{children:"AriaLive Hook"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"useAriaLive"})," hook is a part of the ",(0,i.jsx)(e.code,{children:"AriaLive"})," component. It can be used to make announcements in functional components. In this example ",(0,i.jsx)(e.code,{children:"<section>"})," is turned into an ARIA live region with all the functionality of the ",(0,i.jsx)(e.code,{children:"<AriaLive>"})," component:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:"import useAriaLive from '@dnb/eufemia/components/aria-live/useAriaLive'\n\nfunction MyCustomAriaLive(props) {\n  const ariaAttributes = useAriaLive(props)\n  return <section {...ariaAttributes} />\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(a,n)})):a(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-aria-live-mdx-dce09aaf11cfc2ca51b2.js.map