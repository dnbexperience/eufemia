import { Field, Form, Tools } from '../../..'
import { Flex } from '../../../../../components'
import useUpload from '../../../../../components/upload/useUpload'
import { createRequest } from '../../../Form/Handler/stories/FormHandler.stories'
import { UploadValue } from '../Upload'
// import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

export default {
  title: 'Eufemia/Extensions/Forms/Upload',
}

export function Upload() {
  // const { setFiles } = OriginalUpload.useUpload('unique-id')

  // React.useEffect(() => {
  //   setFiles([
  // { file: createMockFile('fileName-1.png', 100, 'image/png') },
  //   ])
  // }, [setFiles])

  return (
    <Form.Handler
      top
      defaultData={{
        myFiles: [
          // { file: createMockFile('fileName-1.png', 100, 'image/png') },
        ],
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

function mockSyncFileUpload(newFiles: UploadValue) {
  return newFiles.map((file) => {
    if (file.file.name.length > 5) {
      file.errorMessage = 'File length is too long'
    }
    return file
  })
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

const Output = () => {
  const { files } = useUpload('async_upload_context_id')
  return <Tools.Log data={files} top />
}
export const WithAsyncFileHandler = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          id="async_upload_context_id"
          path="/attachments"
          labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
          fileHandler={mockSyncFileUpload}
          required
        />
        <Form.SubmitButton />
      </Flex.Stack>
      <Output />
    </Form.Handler>
  )
}
