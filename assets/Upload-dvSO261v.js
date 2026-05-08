import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BueZjotU.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Upload />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Upload`}),` is a wrapper for the `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/`,children:`Upload`}),` component to make it easier to use inside a form.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Upload`,children:`Value.Upload`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Upload`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/more-fields/Upload`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`The data and file format`}),`
`,(0,r.jsxs)(n.p,{children:[`The returned data is an array of objects containing a file object, a unique ID, etc. The `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`file item object`}),` contains the file itself and some additional properties like a unique ID.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`{
  id: '1234',
  file: {
    name: 'file1.jpg',
    size: 1234,
    type: 'image/jpeg',
  },
  // optional properties
  exists: true,
  isLoading: true,
  errorMessage: 'error message',
  description: 'description',
  removeDeleteButton: true,
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`This data format will be returned by the `,(0,r.jsx)(n.code,{children:`onChange`}),` and the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` event handlers.`]}),`
`,(0,r.jsx)(n.h2,{children:`Validation`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`required`}),` property will validate if there are valid files present. If there are files with an error, the validation will fail.`]}),`
`,(0,r.jsxs)(n.p,{children:[`If there are invalid files, the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` event will not be called and a validation error will be shown.`]}),`
`,(0,r.jsx)(n.h3,{children:`Handling validation errors`}),`
`,(0,r.jsxs)(n.p,{children:[`Files are automatically validated for file size and file type based on the `,(0,r.jsx)(n.code,{children:`fileMaxSize`}),` and `,(0,r.jsx)(n.code,{children:`acceptedFileTypes`}),` properties. When files fail these validations, they receive an `,(0,r.jsx)(n.code,{children:`errorMessage`}),` property.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can customize how these invalid files are displayed using the `,(0,r.jsx)(n.code,{children:`onValidationError`}),` callback:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Field.Upload
  fileMaxSize={5}
  onValidationError={(invalidFiles) => {
    return invalidFiles.map((file) => ({
      ...file,
      removeLink: true, // Remove download link
      removeDeleteButton: true, // Remove delete button
      description: 'Cannot be uploaded due to validation error',
    }))
  }}
/>
`})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`How it works:`}),` The component splits newly uploaded files into two groups based on the presence of an `,(0,r.jsx)(n.code,{children:`errorMessage`}),` property:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Files `,(0,r.jsx)(n.strong,{children:`with`}),` `,(0,r.jsx)(n.code,{children:`errorMessage`}),` → sent to `,(0,r.jsx)(n.code,{children:`onValidationError`}),` (if defined)`]}),`
`,(0,r.jsxs)(n.li,{children:[`Files `,(0,r.jsx)(n.strong,{children:`without`}),` `,(0,r.jsx)(n.code,{children:`errorMessage`}),` → sent to `,(0,r.jsx)(n.code,{children:`fileHandler`}),` (if defined)`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`errorMessage`}),` is typically set by built-in validation (file size or file type checks), but can also be set manually. The two callbacks are mutually exclusive and only process newly added files.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Important:`}),` If `,(0,r.jsx)(n.code,{children:`fileHandler`}),` returns a file with an `,(0,r.jsx)(n.code,{children:`errorMessage`}),`, that file is already in the upload list and won't trigger `,(0,r.jsx)(n.code,{children:`onValidationError`}),` again. Handle errors from `,(0,r.jsx)(n.code,{children:`fileHandler`}),` within the `,(0,r.jsx)(n.code,{children:`fileHandler`}),` function itself by returning files with the `,(0,r.jsx)(n.code,{children:`errorMessage`}),` property set.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`onChange`}),` event handler will return an array with `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`file item objects`}),` containing the file object and some additional properties – regardless of the validity of the file.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For error handling of invalid files, you can refer to the `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/`,children:`Upload`}),` component for more details.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Here is `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/more-fields/Upload/#with-file-size-validation`,children:`an example`}),` of how to use the `,(0,r.jsx)(n.code,{children:`fileHandler`}),` property to validate file sizes.`]}),`
`,(0,r.jsxs)(n.h2,{children:[`About the `,(0,r.jsx)(n.code,{children:`value`}),` and `,(0,r.jsx)(n.code,{children:`path`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`path`}),` property represents an array with an object described above:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`render(
  <Form.Handler defaultData={{ myFiles: files }}>
    <Field.Upload path="/myFiles" />
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`value`}),` property represents an array with an object described above:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`render(<Field.Upload value={files} />)
`})}),`
`,(0,r.jsxs)(n.h2,{children:[`About the `,(0,r.jsx)(n.code,{children:`fileHandler`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`fileHandler`}),` is a handler function that supports both asynchronous and synchronous operations. It receives `,(0,r.jsx)(n.strong,{children:`only newly added valid files`}),` as a parameter and returns the processed files (or a Promise when asynchronous).`]}),`
`,(0,r.jsx)(n.h3,{children:`Which files are passed to the handler?`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Only newly added files`}),`: Files that were just uploaded by the user.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Only valid files`}),`: Files that do not have validation errors such as file size and file type (files with `,(0,r.jsx)(n.code,{children:`errorMessage`}),` are excluded).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Not existing files`}),`: Files that were previously uploaded and already exist in the list are not included.`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`What should be returned?`}),`
`,(0,r.jsxs)(n.p,{children:[`Return an array of `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`file item objects`}),` with the same or modified properties:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`Set a new `,(0,r.jsx)(n.code,{children:`id`})]}),`: Typically from a server response after uploading (e.g., `,(0,r.jsx)(n.code,{children:`id: data.serverGeneratedId`}),`).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`Add `,(0,r.jsx)(n.code,{children:`errorMessage`})]}),`: To indicate upload failure and display an error message next to the file.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Modify other properties`}),`: Such as `,(0,r.jsx)(n.code,{children:`description`}),`, `,(0,r.jsx)(n.code,{children:`removeDeleteButton`}),`, `,(0,r.jsx)(n.code,{children:`removeLink`}),`, etc.`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Automatic loading state handling`}),`
`,(0,r.jsxs)(n.p,{children:[`The component automatically handles asynchronous loading states during the upload process, displaying a spinner next to each file while the `,(0,r.jsx)(n.code,{children:`fileHandler`}),` is processing.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-js`,children:`async function virusCheck(newFiles) {
  const promises = newFiles.map(async (file) => {
    const formData = new FormData()
    formData.append('file', file.file, file.file.name)

    return await fetch('/', { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Unable to upload this file')
      })
      .then((data) => {
        return {
          ...file,
          id: data.serverGeneratedId,
        }
      })
      .catch((error) => {
        return {
          ...file,
          errorMessage: error.message,
        }
      })
  })

  return await Promise.all(promises)
}
`})}),`
`,(0,r.jsx)(n.h3,{children:`TransformIn and TransformOut`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`transformIn`}),` and `,(0,r.jsx)(n.code,{children:`transformOut`}),` properties to transform the data from the internal format to the external format and vice versa.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'
import type {
  UploadValue,
  UploadFileNative,
} from '@dnb/eufemia/extensions/forms/Field/Upload'

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
const transformIn = (external?: DocumentMetadata[]) => {
  return (
    external?.map(({ id, fileName }) => {
      const file: File =
        filesCache.get(id) ||
        new File([], fileName, { type: 'images/png' })

      return { id, file }
    }) || []
  )
}

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal?: UploadValue) => {
  return (
    internal?.map(({ id, file }) => {
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
`})}),`
`,(0,r.jsx)(n.h3,{children:`TransformIn considerations`}),`
`,(0,r.jsxs)(n.p,{children:[`The properties of the `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`file item object`}),` is used internally to visually customize the file when displayed. For instance when displaying a spinner when `,(0,r.jsx)(n.code,{children:`isLoading: true`}),`.
It does also exist some internal logic based on these values, so be careful when changing these through `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/getting-started/#transforming-data`,children:`transformers`}),`, like `,(0,r.jsx)(n.code,{children:`transformIn`}),`, as changing or overriding these properties could have unexpected results.
If doing so, it's recommended to pass along the rest of the `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`file item object`}),` using the spread operator (...fileItemObj) or so, as it can contain properties needed internally that one is not aware of, or updated values since last file was uploaded, or even future new internal properties that does not exist yet.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.Handler>
  <Field.Upload
    path="/documents"
    transformIn={(value) => {
      return (value || []).map((fileItemObj) => ({
        ...fileItemObj,
        errorMessage: 'error message',
      }))
    }}
  />
</Form.Handler>
`})}),`
`,(0,r.jsx)(n.h3,{children:`Persist files in session storage`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`sessionStorageId`}),` property can be used to store the files in the session storage so they persist between page reloads.`]}),`
`,(0,r.jsx)(n.p,{children:`But the persisted files only render the file name, and not the file itself. The file blob will be lost during the serialization process.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};