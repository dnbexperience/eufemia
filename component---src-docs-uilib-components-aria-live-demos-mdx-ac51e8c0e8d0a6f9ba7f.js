"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[79559],{12482:function(n,e,t){t.r(e),t.d(e,{default:function(){return u}});var o={};t.r(o),t.d(o,{AriaLiveAdditions:function(){return c},AriaLivePlayground:function(){return d}});var a=t(52322),i=t(45392),r=t(96781),l=t(50716);const d=()=>(0,a.jsx)(l.Z,{hideCode:!0,noInline:!0,children:'const priorities = [\'low\', \'high\']\nconst contents = {\n  default: \'This is a default announcement\',\n  second: \'And a second one\',\n  third: \'A third one\',\n  fourth: \'And a fourth one\',\n}\nconst priority: \'low\' | \'high\' = \'low\'\nconst defaultData = {\n  enabled: false,\n  content: contents.default,\n  priority,\n}\nfunction AriaLiveExample() {\n  const { data } = Form.useData(\'aria-live-playground\', defaultData)\n  return (\n    <Form.Handler id="aria-live-playground">\n      <Flex.Stack>\n        <Field.Boolean label="Enabled" path="/enabled" />\n        <Field.Selection\n          variant="button"\n          optionsLayout="horizontal"\n          label="Priority"\n          path="/priority"\n        >\n          {priorities.map((content) => {\n            return (\n              <Field.Option\n                key={content}\n                title={content}\n                value={content}\n              />\n            )\n          })}\n        </Field.Selection>\n\n        <Field.Selection\n          optionsLayout="horizontal"\n          label="Content"\n          path="/content"\n        >\n          {Object.entries(contents).map(([key, value]) => {\n            return <Field.Option key={key} title={key} value={value} />\n          })}\n        </Field.Selection>\n\n        <Field.String\n          label="Content as freetext"\n          path="/content"\n          multiline\n        />\n\n        <Flex.Item>\n          Output:{\' \'}\n          <AriaLive\n            delay={1000}\n            disabled={!data.enabled}\n            priority={data.priority}\n            showAnnouncement\n          >\n            Message: {data.content}\n          </AriaLive>\n        </Flex.Item>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<AriaLiveExample />)\n'}),c=()=>(0,a.jsx)(l.Z,{hideCode:!0,scope:{FieldBlock:r.Z},noInline:!0,children:'const defaultData = {\n  enabled: false,\n  content: [<P key="one">Line 1</P>],\n}\nfunction AriaLiveExample() {\n  const { data, update } = Form.useData(\'aria-live-additions\', defaultData)\n  return (\n    <Form.Handler id="aria-live-additions">\n      <Flex.Stack>\n        <Field.Boolean label="Enabled" path="/enabled" />\n\n        <FieldBlock label="Content">\n          <Form.ButtonRow>\n            <Button\n              text="Add more content"\n              variant="secondary"\n              icon="add"\n              icon_position="left"\n              on_click={() => {\n                update(\'/content\', (content) => {\n                  const c = content.length + 1\n                  content.push(<P key={c}>Line {c}</P>)\n                  return content\n                })\n              }}\n            />\n            <Button\n              text="Remove content"\n              variant="tertiary"\n              icon="subtract"\n              icon_position="left"\n              on_click={() => {\n                update(\'/content\', (content) => {\n                  content.pop()\n                  return content\n                })\n              }}\n            />\n          </Form.ButtonRow>\n        </FieldBlock>\n\n        <Flex.Item>\n          Output:{\' \'}\n          <AriaLive variant="content" disabled={!data.enabled}>\n            Message: {data.content}\n          </AriaLive>\n        </Flex.Item>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<AriaLiveExample />)\n'});function s(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,i.ah)(),n.components);return o||p("Examples",!1),c||p("Examples.AriaLiveAdditions",!0),d||p("Examples.AriaLivePlayground",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"Playground"}),"\n",(0,a.jsx)(d,{}),"\n",(0,a.jsx)(e.h3,{children:"Additions"}),"\n",(0,a.jsx)(c,{})]})}var u=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s(n)};function p(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-aria-live-demos-mdx-ac51e8c0e8d0a6f9ba7f.js.map