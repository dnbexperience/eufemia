import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Isolation',
}

export function Isolation() {
  return (
    <Form.Handler
      onSubmit={(data) => console.log('onSubmit', data)}
      onChange={async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Regular onChange:', data)
        // return {
        //   info: 'Info message',
        // }
      }}
      defaultData={
        {
          // regular: 'Regular',
          // isolated: 'Isolated',
        }
      }
    >
      <Flex.Stack>
        <Form.Isolation
          onChange={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // console.log('Isolated onChange:', data)
            // return {
            //   info: 'Info message',
            // }
          }}
          onCommit={(data) => console.log('onCommit:', data)}
          // defaultData={{
          //   isolated: 'Isolated',
          // }}
        >
          <Flex.Stack>
            <Field.String
              label="Isolated"
              path="/isolated"
              required
              // validateInitially
            />

            <Flex.Horizontal>
              <Form.SubmitButton text="Commit" />
              <Form.Isolation.CommitButton text="Commit" />
            </Flex.Horizontal>
          </Flex.Stack>
        </Form.Isolation>

        <Field.String label="Synced" path="/isolated" required />
        <Field.String label="Regular" path="/regular" required />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
