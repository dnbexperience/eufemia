import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import {
  createMockFile,
  mockAsyncFileUpload,
} from '../../../../../../../docs/uilib/components/upload/Examples'
import useUpload from '@dnb/eufemia/src/components/upload/useUpload'

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

export const WithAsyncFileHandler = () => {
  return (
    <ComponentBox scope={{ mockAsyncFileUpload, useUpload, Tools }}>
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler onSubmit={async (form) => console.log(form)}>
              <Flex.Stack>
                <Field.Upload
                  id="async_upload_context_id"
                  path="/attachments"
                  labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
                  asyncFileHandler={mockAsyncFileUpload}
                  required
                />
                <Form.SubmitButton />
              </Flex.Stack>
              <Output />
            </Form.Handler>
          )
        }

        const Output = () => {
          const { files } = useUpload('async_upload_context_id')
          return <Tools.Log data={files} top />
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
