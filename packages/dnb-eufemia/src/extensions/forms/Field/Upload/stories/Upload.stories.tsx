import { Field, Form, Tools } from '../../..'
import { Flex } from '../../../../../components'
import { createRequest } from '../../../Form/Handler/stories/FormHandler.stories'
import { UploadValue } from '../Upload'

export default {
  title: 'Eufemia/Extensions/Forms/Upload',
}

export function Upload() {
  return (
    <Form.Handler
      top
      defaultData={{
        myFiles: [],
      }}
      onChange={(data) => {
        console.log('global onChange', data)
      }}
      onSubmit={(data) => console.log('global onSubmit', data)}
    >
      <Flex.Stack>
        <Field.Upload
          required
          label="Upload title"
          path="/myFiles"
          onChange={(e) => {
            console.log('local onChange', e)
          }}
          help={{
            title: 'Help title',
            content: 'Help content',
          }}
        />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

async function mockAsyncFileUpload__withoutPromises(
  newFiles: UploadValue
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
          server_generated_id: `${file.file.name}_${crypto.randomUUID()}`,
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
    } catch (error: any) {
      updatedFiles.push({
        ...file,
        errorMessage: error.message,
      })
    }
  }

  return updatedFiles
}

export const WithAsyncFileHandler = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          id="async_upload_context_id"
          path="/attachments"
          labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
          fileHandler={mockAsyncFileUpload__withoutPromises}
          required
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const AsyncEverything = () => {
  const acceptedFileTypes = ['jpg', 'pdf', 'png']

  async function mockAsyncFileRemoval({ fileItem }) {
    const request = createRequest()
    console.log('making API request to remove: ' + fileItem.file.name)
    await request(3000) // Simulate a request
  }

  async function mockAsyncFileUpload(
    newFiles: UploadValue
  ): Promise<UploadValue> {
    const updatedFiles: UploadValue = []

    for (const [, file] of Object.entries(newFiles)) {
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)

      const request = createRequest()
      await request(3000) // Simulate a request

      const mockResponse = {
        ok: false, // Fails virus check
        json: async () => ({
          server_generated_id:
            'server_generated_id' +
            '_' +
            file.file.name +
            '_' +
            crypto.randomUUID(),
        }),
      }

      const data = await mockResponse.json()
      updatedFiles.push({
        ...file,
        id: data.server_generated_id,
      })
    }

    return updatedFiles
  }

  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          onFileDelete={mockAsyncFileRemoval}
          fileHandler={mockAsyncFileUpload}
          id="upload-example-async"
          acceptedFileTypes={acceptedFileTypes}
        />
      </Flex.Stack>
    </Form.Handler>
  )
}
