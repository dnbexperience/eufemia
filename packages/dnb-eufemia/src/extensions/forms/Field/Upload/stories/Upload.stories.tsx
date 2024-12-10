import { Field, Form, Tools } from '../../..'
import { Flex } from '../../../../../components'
import {
  UploadFile,
  UploadFileNative,
} from '../../../../../components/Upload'
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

  async function mockAsyncOnFileClick({ fileItem }) {
    const request = createRequest()
    console.log(
      'making API request to fetch the url of the file: ' +
        fileItem.file.name
    )
    await request(3000) // Simulate a request
    window.open(
      'https://eufemia.dnb.no/images/avatars/1501870.jpg',
      '_blank'
    )
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
          onFileClick={mockAsyncOnFileClick}
          fileHandler={mockAsyncFileUpload}
          id="upload-example-async"
          acceptedFileTypes={acceptedFileTypes}
        />
      </Flex.Stack>
    </Form.Handler>
  )
}

interface DocumentMetadata {
  id: string
  type: string
  fileName: string
}

const filesStorage = new Map<string, UploadFile | UploadFileNative>()

/** To the Field's value */
function transformIn(value?: unknown) {
  const items = value as DocumentMetadata[]

  return (items?.map((item) => {
    const file: File =
      item['file'] ||
      (filesStorage.has(item.id)
        ? filesStorage.get(item.id)
        : new File([], item.fileName, { type: 'images/png' }))

    return {
      id: item.id,
      file,
    }
  }) || []) as UploadValue
}

/** To the DataContext */
function transformOut(value?: unknown) {
  const files = value as UploadValue

  return (
    files?.map((item) => {
      if (!filesStorage.has(item.id)) {
        filesStorage.set(item.id, item)
      }

      const file = item?.file
      return {
        id: item.id,
        type: file?.type || 'Unknown',
        fileName: file?.name || 'Unknown',
      }
    }) || []
  )
}

const defaultValue = [
  {
    id: '16eaa778-a29f-4d10-95e9-6b5b728182e8',
    type: 'images/png',
    fileName: 'myFile.pdf',
  },
]

export function TransformInAndOut() {
  return (
    <Form.Handler
    // defaultData={{
    //   documents: defaultValue,
    // }}
    >
      <Flex.Stack>
        <Field.Upload
          label="Label"
          placeholder="This is a Field"
          transformIn={transformIn}
          transformOut={transformOut}
          path="/documents"
          defaultValue={defaultValue as unknown as UploadValue}
        />

        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
