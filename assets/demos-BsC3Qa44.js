import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./Anchor-VfvEVqst.js";import{t as i}from"./Button-CMFzxkr4.js";import{t as a}from"./P-avM674pJ.js";import{c as o}from"./ToggleButton-BtQrsiHY.js";import{a as s}from"./Selection-BFV7H91n.js";import{t as c}from"./Form-913YPZs6.js";import{t as l}from"./Field-CbVmykdw.js";import{W as u}from"./index-D7e1avVt.js";import{t as d}from"./ComponentBox-CE7bpcJy.js";var f=e({AriaLiveAdditions:()=>h,AriaLivePlayground:()=>m}),p=t(n()),m=()=>(0,p.jsx)(d,{hideCode:!0,stableName:`AriaLivePlayground`,sourceImports:[`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { AriaLive, Button, Flex, P } from '@dnb/eufemia'`],__buildScope:{Form:c,Flex:o,Field:l,AriaLive:r},noInline:!0,children:`const priorities = ['low', 'high']
const contents = {
  default: 'This is a default announcement',
  second: 'And a second one',
  third: 'A third one',
  fourth: 'And a fourth one',
}
const priority: 'low' | 'high' = 'low'
const defaultData = {
  enabled: false,
  content: contents.default,
  priority,
}
function AriaLiveExample() {
  const { data } = Form.useData('aria-live-playground', defaultData)
  return (
    <Form.Handler id="aria-live-playground">
      <Flex.Stack>
        <Field.Boolean label="Announcement enabled" path="/enabled" />
        <Field.Selection
          variant="button"
          optionsLayout="horizontal"
          label="Priority"
          path="/priority"
        >
          {priorities.map((content) => {
            return (
              <Field.Option
                key={content}
                title={content}
                value={content}
              />
            )
          })}
        </Field.Selection>

        <Field.Selection
          optionsLayout="horizontal"
          label="Content"
          path="/content"
        >
          {Object.entries(contents).map(([key, value]) => {
            return <Field.Option key={key} title={key} value={value} />
          })}
        </Field.Selection>

        <Field.String
          label="Content as freetext"
          path="/content-as-free-text"
          multiline
        />

        <Flex.Item>
          Output:{' '}
          <AriaLive
            delay={1000}
            disabled={!data.enabled}
            priority={data.priority}
            showAnnouncement
          >
            Message: {data.content}
          </AriaLive>
        </Flex.Item>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<AriaLiveExample />)
`}),h=()=>(0,p.jsx)(d,{hideCode:!0,stableName:`AriaLiveAdditions`,sourceImports:[`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { AriaLive, Button, Flex, P } from '@dnb/eufemia'`],__buildScope:{Form:c,Flex:o,Field:l,FieldBlock:s,Button:i,AriaLive:r,P:a},noInline:!0,children:`const defaultData = {
  enabled: false,
  content: ['Line 1'],
}
function AriaLiveExample() {
  const { data, update } = Form.useData('aria-live-additions', defaultData)
  return (
    <Form.Handler id="aria-live-additions">
      <Flex.Stack>
        <Field.Boolean label="Announcement enabled" path="/enabled" />

        <FieldBlock label="Content">
          <Form.ButtonRow>
            <Button
              text="Add more content"
              variant="secondary"
              icon="add"
              iconPosition="left"
              onClick={() => {
                update('/content', (content) => {
                  const c = content.length + 1
                  content.push(\`Line \${c}\`)
                  return [...content]
                })
              }}
            />
            <Button
              text="Remove content"
              variant="tertiary"
              icon="subtract"
              iconPosition="left"
              onClick={() => {
                update('/content', (content) => {
                  content.pop()
                  return [...content]
                })
              }}
            />
          </Form.ButtonRow>
        </FieldBlock>

        <Flex.Item>
          Output:{' '}
          <AriaLive variant="content" disabled={!data.enabled}>
            Message:{' '}
            {data.content.map((line, i) => {
              return <P key={i}>{line}</P>
            })}
          </AriaLive>
        </Flex.Item>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<AriaLiveExample />)
`});function g(e){let t={h2:`h2`,h3:`h3`,...u(),...e.components};return f||v(`Examples`,!1),h||v(`Examples.AriaLiveAdditions`,!0),m||v(`Examples.AriaLivePlayground`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Playground`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`Additions`}),`
`,(0,p.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};