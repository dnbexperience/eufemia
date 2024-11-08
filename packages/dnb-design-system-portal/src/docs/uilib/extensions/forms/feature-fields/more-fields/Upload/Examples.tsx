import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { createMockFile } from '@dnb/eufemia/src/components/upload/__tests__/testHelpers'

export const BasicUsage = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.Upload
          label="My custom label"
          labelDescription="My description"
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Required = () => {
  return (
    <ComponentBox>
      <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
        <Flex.Stack>
          <Field.Upload path="/myFiles" required />
          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Upload
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      />
    </ComponentBox>
  )
}

export const Customized = () => {
  return (
    <ComponentBox data-visual-test="upload-field-customized">
      <Field.Upload
        title="My custom title"
        text="My text with a help button"
        width="large"
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
        warning="Warning message"
        acceptedFileTypes={['pdf']}
        filesAmountLimit={1}
        fileMaxSize={1}
      />
    </ComponentBox>
  )
}

export const WithPath = () => {
  return (
    <ComponentBox scope={{ createMockFile }}>
      <Form.Handler
        onChange={(data) => console.log('onChange', data)}
        data={{
          myFiles: [
            { file: createMockFile('fileName-1.png', 100, 'image/png') },
          ],
        }}
      >
        <Field.Upload path="/myFiles" />
      </Form.Handler>
    </ComponentBox>
  )
}
