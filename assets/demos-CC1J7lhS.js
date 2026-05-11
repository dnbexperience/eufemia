import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({AriaLiveAdditions:()=>s,AriaLivePlayground:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{hideCode:!0,noInline:!0,children:`const priorities = ['low', 'high']
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
`}),s=()=>(0,a.jsx)(n,{hideCode:!0,noInline:!0,children:`const defaultData = {
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
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),s||u(`Examples.AriaLiveAdditions`,!0),o||u(`Examples.AriaLivePlayground`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Playground`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Additions`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};