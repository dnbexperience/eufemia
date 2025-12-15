import { Flex, Anchor } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  FormError,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { createMockFile } from '../../../../../../../docs/uilib/components/upload/Examples'
import { UploadValue } from '@dnb/eufemia/src/extensions/forms/Field/Upload'
import { createRequest } from '../../../Form/SubmitIndicator/Examples'

export const BasicUsage = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.Upload
          label="My custom label"
          labelDescription="My description"
          onChange={(files) => console.log('onChange', files)}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const CompactVariant = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.Upload
          variant="compact"
          label="My custom label"
          labelDescription="My description"
          onChange={(files) => console.log('onChange', files)}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const CompactVariantHelpButton = () => {
  return (
    <ComponentBox data-visual-test="upload-field-compact-help-button">
      <Form.Handler>
        <Field.Upload
          help={{
            open: true,
            title: 'Hva betyr lånebeløp?',
            content: (
              <>
                Dette er hvor mye du har tenkt å låne{' '}
                <Anchor href="#test">totalt</Anchor>.
              </>
            ),
          }}
          variant="compact"
          label="My custom label"
          labelDescription="My description"
          onChange={(files) => console.log('onChange', files)}
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
    <ComponentBox data-visual-test="upload-field-help-button">
      <Field.Upload
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
    </ComponentBox>
  )
}

export const WithHelpWithoutLabelDescription = () => {
  return (
    <ComponentBox data-visual-test="upload-field-help-button-without-label-description">
      <Field.Upload
        labelDescription={false}
        help={{
          open: true,
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
          open: true,
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
    <ComponentBox scope={{ createRequest }}>
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

          for (const [index, file] of Object.entries(newFiles)) {
            const formData = new FormData()
            formData.append('file', file.file, file.file.name)

            const request = createRequest()
            await request(Math.floor(Math.random() * 2000) + 1000) // Simulate a request

            try {
              const mockResponse = {
                ok: (parseFloat(index) + 2) % 2 === 0, // Every other request will fail
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
    <ComponentBox>
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

export const WithAsyncOnFileDelete = () => {
  return (
    <ComponentBox scope={{ createRequest }}>
      {() => {
        async function mockAsyncFileRemoval({ fileItem }) {
          const request = createRequest()
          console.log(
            `making API request to remove: ${fileItem.file.name}`,
          )
          await request(3000) // Simulate a request
          const mockResponse = {
            successful_removal: Math.random() < 0.5, // Randomly fails to remove the file
          }
          if (!mockResponse.successful_removal) {
            throw new Error('Unable to remove this file')
          }
        }

        return (
          <Field.Upload
            onFileDelete={mockAsyncFileRemoval}
            acceptedFileTypes={['jpg', 'png']}
          />
        )
      }}
    </ComponentBox>
  )
}

export const WithAsyncOnFileClick = () => {
  return (
    <ComponentBox scope={{ createRequest, createMockFile }}>
      {() => {
        async function mockAsyncFileClick({ fileItem }) {
          const request = createRequest()
          console.log(
            `making API request to fetch the url of the file: ${fileItem.file.name}`,
          )
          await request(2000) // Simulate a request
          window.open(
            `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
            '_blank',
          )
        }

        return (
          <Form.Handler
            data={{
              myFiles: [
                {
                  file: createMockFile('1501870.jpg', 100, 'image/png'),
                  id: '1',
                },
              ],
            }}
          >
            <Field.Upload
              path="/myFiles"
              onFileClick={mockAsyncFileClick}
            />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export function SessionStorage() {
  return (
    <ComponentBox>
      <Form.Handler sessionStorageId="documents">
        <Flex.Stack>
          <Form.Card>
            <Field.Upload path="/documents" />
            <Value.Upload
              path="/documents"
              label="Uploaded files"
              placeholder="No files uploaded."
              variant="ol"
              showEmpty
            />
          </Form.Card>

          <Form.SubmitButton />
          <Tools.Log />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithFileItemOptions = () => {
  return (
    <ComponentBox scope={{ createMockFile }}>
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler
              data={{
                myFiles: [
                  {
                    file: createMockFile(
                      'fileName-1.png',
                      100,
                      'image/png',
                    ),
                    id: '1',
                    description: 'My description',
                    errorMessage: 'My error message',
                    removeDeleteButton: true,
                  },
                ],
              }}
            >
              <Field.Upload
                path="/myFiles"
                fileHandler={mockFileHandler}
                required
              />
            </Form.Handler>
          )
        }

        function mockFileHandler(newFiles: UploadValue) {
          return newFiles.map((file) => {
            file.errorMessage = 'File has a problem'
            file.description = 'File description'
            file.removeDeleteButton = true

            return file
          })
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const WithFileSizeValidation = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      {() => {
        const MAX_SIZE = 500 * 1024 // 500 KB
        const MIN_SIZE = 50 * 1024 // 50 KB

        const myTranslation = {
          'nb-NO': {
            errorFileTooSmall: 'Filen er for liten.',
            errorFileTooLarge: 'Filen er for stor.',
          },
          'en-GB': {
            errorFileTooSmall: 'File is too small.',
            errorFileTooLarge: 'File is too large.',
          },
        }

        function MyField() {
          const tr = Form.useTranslation()

          const fileHandler = (newFiles: UploadValue) => {
            return newFiles.map((item) => {
              console.log('item:', item)

              if (item.file.size < MIN_SIZE) {
                item.errorMessage = tr['errorFileTooSmall']
              }
              if (item.file.size > MAX_SIZE) {
                item.errorMessage = tr['errorFileTooLarge']
              }

              return item
            })
          }

          return (
            <Field.Upload
              label="Label"
              labelDescription="This is a Field"
              path="/myField"
              acceptedFileTypes={['PNG']}
              fileMaxSize={false}
              fileHandler={fileHandler}
            />
          )
        }

        return (
          <Form.Handler
            translations={myTranslation}
            onSubmit={(data) => console.log('onSubmit', data)}
          >
            <Form.Card>
              <MyField />
            </Form.Card>

            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const Width = () => {
  return (
    <ComponentBox
      scope={{ createMockFile }}
      data-visual-test="upload-field-width"
    >
      <Form.Handler
        data={{
          myFiles: [
            { file: createMockFile('fileName-1.png', 100, 'image/png') },
          ],
        }}
      >
        <Form.Card>
          <Field.String width="stretch" />
          <Field.Upload path="/myFiles" label="default" />
          <Field.Upload path="/myFiles" width="large" label="large" />
          <Field.Upload path="/myFiles" width="stretch" label="stretch" />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
