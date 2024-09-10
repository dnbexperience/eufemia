/**
 * UI lib Component Example
 *
 */

import React from 'react'
import { Field, FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { AriaLive, Button, Flex, P } from '@dnb/eufemia/src'

export const AriaLivePlayground = () => (
  <ComponentBox hideCode>
    {() => {
      const priorities = ['low', 'high']
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
              <Field.Boolean label="Enabled" path="/enabled" />
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
                  return (
                    <Field.Option key={key} title={key} value={value} />
                  )
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

      return <AriaLiveExample />
    }}
  </ComponentBox>
)

export const AriaLiveAdditions = () => (
  <ComponentBox hideCode>
    {() => {
      const defaultData = {
        enabled: false,
        content: [<P key="one">Line 1</P>],
      }

      function AriaLiveExample() {
        const { data, update } = Form.useData(
          'aria-live-additions',
          defaultData,
        )

        return (
          <Form.Handler id="aria-live-additions">
            <Flex.Stack>
              <Field.Boolean label="Enabled" path="/enabled" />

              <FieldBlock label="Content">
                <Form.ButtonRow>
                  <Button
                    text="Add more content"
                    variant="secondary"
                    icon="add"
                    icon_position="left"
                    on_click={() => {
                      update('/content', (content) => {
                        const c = content.length + 1
                        content.push(<P key={c}>Line {c}</P>)
                        return content
                      })
                    }}
                  />
                  <Button
                    text="Remove content"
                    variant="tertiary"
                    icon="subtract"
                    icon_position="left"
                    on_click={() => {
                      update('/content', (content) => {
                        content.pop()
                        return content
                      })
                    }}
                  />
                </Form.ButtonRow>
              </FieldBlock>

              <Flex.Item>
                Output:{' '}
                <AriaLive variant="content" disabled={!data.enabled}>
                  Message: {data.content}
                </AriaLive>
              </Flex.Item>
            </Flex.Stack>
          </Form.Handler>
        )
      }

      return <AriaLiveExample />
    }}
  </ComponentBox>
)
