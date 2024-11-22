import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import { createMockFile } from '../../../../../../../docs/uilib/components/upload/Examples'
import useUpload from '@dnb/eufemia/src/components/upload/useUpload'
import { UploadValue } from '@dnb/eufemia/src/extensions/forms/Field/Upload'
import { createRequest } from '../../../Form/SubmitIndicator/Examples'

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
    <ComponentBox scope={{ createRequest, useUpload, Tools }}>
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler onSubmit={async (form) => console.log(form)}>
              <Flex.Stack>
                <Field.Upload
                  path="/attachments"
                  labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
                  fileHandler={mockAsyncFileUpload}
                  required
                />
                <Form.SubmitButton />
                <Tools.Log />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        async function mockAsyncFileUpload(
          newFiles: UploadValue,
        ): Promise<UploadValue> {
          const updatedFiles: UploadValue = []

          for (const [, file] of Object.entries(newFiles)) {
            const formData = new FormData()
            formData.append('file', file.file, file.file.name)

            const request = createRequest()
            await request(Math.floor(Math.random() * 2000) + 1000) // Simulate a request

            try {
              const mockResponse = {
                ok: false, // Fails virus check
                json: async () => ({
                  server_generated_id:
                    file.file.name + '_' + crypto.randomUUID(),
                }),
              }

              if (!mockResponse.ok) {
                throw new Error('Unable to upload this file')
              }

              const data = await mockResponse.json()
              updatedFiles.push({
                ...file,
                id: data.server_generated_id,
              })
            } catch (error) {
              updatedFiles.push({
                ...file,
                errorMessage: error.message,
              })
            }
          }

          return updatedFiles
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const WithSyncFileHandler = () => {
  return (
    <ComponentBox scope={{ createRequest, useUpload, Tools }}>
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler onSubmit={async (form) => console.log(form)}>
              <Flex.Stack>
                <Field.Upload
                  path="/myattachments"
                  fileHandler={mockSyncFileUpload}
                  required
                />
                <Form.SubmitButton />
                <Tools.Log />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        function mockSyncFileUpload(newFiles: UploadValue) {
          return newFiles.map((file) => {
            if (file.file.name.length > 5) {
              file.errorMessage = 'File name is too long'
            }
            return file
          })
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
