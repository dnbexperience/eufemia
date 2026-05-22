import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'
import type { UploadValue } from '@dnb/eufemia/src/extensions/forms/Field/Upload'

// Our external format
type DocumentMetadata = {
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

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  const files = external as DocumentMetadata[] | undefined
  return (
    files?.map(({ id, fileName }) => {
      const file: File =
        filesCache.get(id) ||
        new File([], fileName, { type: 'images/png' })

      return { id, file }
    }) || []
  )
}

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: UploadValue | unknown) => {
  const files = internal as UploadValue | undefined
  return (
    files?.map(({ id, file }) => {
      if (!filesCache.has(id)) {
        filesCache.set(id, file)
      }

      return { id, fileName: file.name }
    }) || []
  )
}

function MyForm() {
  return (
    <Form.Handler>
      <Field.Upload
        path="/documents"
        transformIn={transformIn}
        transformOut={transformOut}
        defaultValue={defaultValue}
      />

      <Tools.Log />
    </Form.Handler>
  )
}
