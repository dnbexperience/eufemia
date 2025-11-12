import { Field, Form, Iterate, Tools, Value, Wizard } from '../../..'
import { Flex } from '../../../../../components'
import {
  UploadFile,
  UploadFileNative,
} from '../../../../../components/Upload'
import { P } from '../../../../../elements'
import { UploadValue } from '../Upload'

export default {
  title: 'Eufemia/Extensions/Forms/Upload',
}

const createRequest = () => {
  let timeout: NodeJS.Timeout | null
  let resolvePromise: ((value?: unknown) => void) | undefined

  const fn = (
    t: number
  ): Promise<{ hasError: boolean; cancel?: boolean }> => {
    return new Promise((resolve) => {
      resolvePromise = resolve
      timeout = setTimeout(() => {
        resolve({ hasError: false })
      }, t)
    })
  }

  fn.cancel = () => {
    resolvePromise?.({ hasError: true })
    clearTimeout(timeout)
    timeout = null
  }

  return fn
}

function createMockFile(name: string, size: number, type: string) {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
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
    await request(Math.floor(8000)) // Simulate a request

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

async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log('Making API request to remove: ' + fileItem.file.name)
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

export const AsyncEverything = () => {
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

  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          onFileDelete={mockAsyncFileRemoval}
          onFileClick={mockAsyncOnFileClick}
          fileHandler={mockAsyncFileUpload}
          id="upload-example-async"
        />
      </Flex.Stack>
    </Form.Handler>
  )
}

interface DocumentMetadata {
  id: string
  fileName: string
}

const defaultValue = [
  {
    id: '1234',
    fileName: 'myFile.pdf',
  },
] satisfies DocumentMetadata[] as unknown as UploadValue

const filesCache = new Map<string, File>()
const transformIn = (external?: DocumentMetadata[]) => {
  return (
    external?.map(({ id, fileName }) => {
      const file: File = filesCache.get(id) || new File([], fileName)

      return { id, file } satisfies UploadFileNative
    }) || []
  )
}
const transformOut = (internal?: UploadValue) => {
  return (
    internal?.map(({ id, file }) => {
      if (!filesCache.has(id)) {
        filesCache.set(id, file)
      }

      return { id, fileName: file.name } satisfies DocumentMetadata
    }) || []
  )
}

export function TransformInAndOut() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.Upload
          path="/documents"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue={defaultValue}
          onFileClick={({ fileItem }) => {
            console.log('onFileClick', fileItem)
          }}
        />

        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function SessionStorage() {
  return (
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
  )
}

export function FileSizeErrorWithFileHandler() {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  async function uploadFilesWithMockError(newFiles: UploadValue) {
    const updatedFiles: UploadValue = []
    for (const [, file] of Object.entries(newFiles)) {
      await delay(2000)
      updatedFiles.push({
        ...file,
        id: crypto.randomUUID(), // id generated on server
      })
    }
    return updatedFiles
  }

  return (
    <Form.Handler
      defaultData={{
        documents: [],
      }}
    >
      <Flex.Stack>
        <Field.Upload fileHandler={uploadFilesWithMockError} />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function SameFileName() {
  return (
    <Form.Handler
      data={{
        myFiles: [
          {
            file: createMockFile('1.png', 100, 'image/png'),
          },
        ],
      }}
    >
      <Field.Upload
        required
        path="/myFiles"
        onFileDelete={mockAsyncFileRemoval}
      />
    </Form.Handler>
  )
}

export const WithSyncFileHandler = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          id="sync_upload_context_id"
          path="/attachments"
          labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
          fileHandler={function () {
            return [
              undefined,
              {
                file: createMockFile('2.png', 100, 'image/png'),
              },
            ]
          }}
          required
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const AsyncEverythingWithTransform = () => {
  const acceptedFileTypes = ['jpg', 'pdf', 'png']

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

  function transformIn(external?: any) {
    return (
      external?.map((file) => ({
        ...file,
        id: file.id,
        file: new File([], file.fileName),
        errorMessage: file?.errorMessage,
      })) || []
    )
  }

  function transformOut(upload?: UploadValue) {
    return upload?.map((file) => ({
      ...file,
      id: file.id,
      fileName: file.file?.name,
      errorMessage: file?.errorMessage,
    }))
  }

  const myFiles = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
  ]

  return (
    <Form.Handler
      onSubmit={async (form) => console.log(form)}
      data={{
        myFiles,
      }}
    >
      <Flex.Stack>
        <Field.Upload
          path="/myFiles"
          transformIn={transformIn}
          transformOut={transformOut}
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

export const RequiredProperty = () => {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.Upload required />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const IterateArrayUpload = () => {
  async function mockAsyncFileUpload(
    newFiles: UploadFile[]
  ): Promise<any> {
    const updatedFiles: UploadFile[] = []

    for (const [, file] of Object.entries(newFiles)) {
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)

      const request = createRequest()
      await request(8000) // Simulate a request

      try {
        const mockResponse = {
          ok: true,
          json: async () => ({
            server_generated_id:
              file.file.name + '_' + crypto.randomUUID(),
          }),
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

  return (
    <Form.Handler
      onSubmit={(data) => {
        console.log('submitted data:', data)
      }}
      defaultData={{
        listOfFiles: [
          {
            files: undefined,
          },
          {
            files: undefined,
          },
        ],
      }}
    >
      <Iterate.Array path="/listOfFiles">
        <Field.Upload
          itemPath="/files"
          label="Required field with async fileHandler"
          fileHandler={mockAsyncFileUpload}
          onFileDelete={mockAsyncFileRemoval}
          required
          onChange={(e) => {
            console.log('onChange', e)
          }}
        />
      </Iterate.Array>
      <Form.SubmitButton />
      <Tools.Log />
    </Form.Handler>
  )
}

export const TwoAsyncUploads = () => {
  async function mockAsyncFileUpload(
    newFiles: UploadFile[]
  ): Promise<any> {
    const updatedFiles: UploadFile[] = []

    for (const [, file] of Object.entries(newFiles)) {
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)

      const request = createRequest()
      await request(8000) // Simulate a request

      try {
        const mockResponse = {
          ok: true,
          json: async () => ({
            server_generated_id:
              file.file.name + '_' + crypto.randomUUID(),
          }),
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

  return (
    <Form.Handler
      defaultData={{
        files: undefined,
        files1: undefined,
      }}
    >
      <Field.Upload
        path="/files"
        label="Required field with async fileHandler #1"
        fileHandler={mockAsyncFileUpload}
        required
        onChange={(e) => {
          console.log('local onChange #1', e)
        }}
      />
      <Field.Upload
        path="/files1"
        label="Required field with async fileHandler #2"
        fileHandler={mockAsyncFileUpload}
        required
        onChange={(e) => {
          console.log('local onChange #2', e)
        }}
      />

      <Tools.Log />
    </Form.Handler>
  )
}

export const AcceptedFilesTypesProperty = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          acceptedFileTypes={[
            {
              fileType: 'jpg',
              fileMaxSize: 0,
            },
            {
              fileType: 'doc',
              fileMaxSize: false,
            },
            {
              fileType: 'svg',
            },
          ]}
        />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const WizardWithAsyncFileHandler = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Wizard.Container>
        <Wizard.Step title="Step 2">
          <Form.Card>
            <Field.Upload
              id="async_upload_context_id"
              path="/attachments"
              labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
              fileHandler={mockAsyncFileUpload__withoutPromises}
            />
          </Form.Card>

          <Tools.Log />
          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton variant="send" />
          </Form.ButtonRow>
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <Form.MainHeading>Heading</Form.MainHeading>

          <Form.Card>
            <P>Contents of step 2</P>
          </Form.Card>

          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton variant="send" />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}

export const WithOnValidationErrorSimple = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          path="/myFiles"
          fileMaxSize={1}
          acceptedFileTypes={['jpg', 'pdf', 'png']}
          labelDescription="Try uploading files larger than 1 MB or unsupported file types. Invalid files will have customized appearance."
          onValidationError={(invalidFiles) => {
            return invalidFiles.map((file) => ({
              ...file,
              removeLink: true,
              description: 'This file cannot be uploaded',
            }))
          }}
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const WithOnValidationError = () => {
  function syncValidationErrorHandler(
    invalidFiles: UploadValue
  ): UploadValue {
    return invalidFiles.map((file) => ({
      ...file,
      removeLink: true,
      description: 'File validation failed - cannot be uploaded',
    }))
  }

  async function mockAsyncFileHandler(
    validFiles: UploadValue
  ): Promise<UploadValue> {
    const updatedFiles: UploadValue = []

    for (const file of validFiles) {
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)

      const request = createRequest()
      await request(3000) // Simulate upload request

      const mockResponse = {
        ok: true,
        json: async () => ({
          server_generated_id: `server_${
            file.file.name
          }_${crypto.randomUUID()}`,
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

  async function mockAsyncFileDelete({ fileItem }) {
    const request = createRequest()
    console.log('Deleting file: ' + fileItem.file.name)
    await request(2000) // Simulate delete request
  }

  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          path="/myFiles"
          fileMaxSize={1}
          acceptedFileTypes={['jpg', 'pdf', 'png']}
          labelDescription="Try uploading files larger than 1 MB or unsupported file types to see validation error handling. Valid files will be uploaded."
          onValidationError={syncValidationErrorHandler}
          fileHandler={mockAsyncFileHandler}
          onFileDelete={mockAsyncFileDelete}
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const WithOnValidationErrorAndAlwaysFailingUpload = () => {
  function syncValidationErrorHandler(
    invalidFiles: UploadValue
  ): UploadValue {
    return invalidFiles.map((file) => ({
      ...file,
      removeLink: true,
      removeDeleteButton: true,
      description: 'This file failed validation and cannot be uploaded',
    }))
  }

  async function mockAsyncFileHandlerAlwaysFails(
    validFiles: UploadValue
  ): Promise<UploadValue> {
    const updatedFiles: UploadValue = []

    for (const file of validFiles) {
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)

      const request = createRequest()
      await request(2000) // Simulate upload attempt

      // Always fail upload
      updatedFiles.push({
        ...file,
        errorMessage: 'Upload failed: Server rejected this file',
      })
    }

    return updatedFiles
  }

  async function mockAsyncFileDelete({ fileItem }) {
    const request = createRequest()
    console.log('Deleting file: ' + fileItem.file.name)
    await request(1500) // Simulate delete request
  }

  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          path="/myFiles"
          fileMaxSize={1}
          acceptedFileTypes={['jpg', 'pdf', 'png']}
          labelDescription="All uploads will fail. Files larger than 1 MB or unsupported types trigger validation errors (no delete button). Valid files that fail upload can still be deleted."
          onValidationError={syncValidationErrorHandler}
          fileHandler={mockAsyncFileHandlerAlwaysFails}
          onFileDelete={mockAsyncFileDelete}
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
