import React from 'react'
import AriaLive from '../AriaLive'
import { Field, FieldBlock, Form } from '../../../extensions/forms'
import { AriaLiveProps } from '../types'
import { Button, Flex } from '../..'
import { P } from '../../../elements'

export default {
  title: 'Eufemia/Components/AriaLive',
}

const priorities = ['low', 'high']
const contents = {
  default: 'This is a default announcement',
  second: 'And a second one',
  third: 'A third one',
  fourth: 'And a fourth one',
}

type Data = {
  enabled: boolean
  content: string
  priority: AriaLiveProps['priority']
}

const defaultData: Data = {
  enabled: true,
  content: contents.default,
  priority: 'low',
}

export function AriaLivePlayground() {
  const { data } = Form.useData<Data>('aria-live', defaultData)

  return (
    <Form.Handler id="aria-live">
      <Flex.Stack>
        <Field.Boolean
          variant="buttons"
          label="Announce"
          path="/enabled"
        />
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
          variant="button"
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
          path="/content"
          multiline
        />
        <Flex.Item>
          Output:{' '}
          <AriaLive
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

export function AriaLiveAdditions() {
  const defaultData = React.useMemo(
    () => ({
      enabled: true,
      content: ['Line 1'],
    }),
    []
  )
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
              on_click={() => {
                update('/content', (content) => {
                  const c = content.length + 1
                  content.push(`Line ${c}`)
                  return [...content]
                })
              }}
            />
            <Button
              text="Remove content"
              variant="tertiary"
              icon="subtract"
              iconPosition="left"
              on_click={() => {
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
          <AriaLive
            variant="content"
            disabled={!data.enabled}
            relevant="all"
          >
            {data.content.map((line, i) => {
              return <P key={i}>{line}</P>
            })}
          </AriaLive>
        </Flex.Item>
      </Flex.Stack>
    </Form.Handler>
  )
}
