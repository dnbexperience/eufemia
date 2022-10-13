---
showTabs: true
---

import {
UploadBasic,
UploadPrefilledFileList,
UploadRemoveFile,
UploadMultipleFiles,
UploadIsLoading,
UploadErrorMessage,
UploadAcceptedFormats,
UploadCustomText,
} from 'Docs/uilib/components/upload/Examples'

## Demos

### Upload (default)

<UploadBasic />

### 'useUpload' React Hook

By using the `Upload.useUpload` you can remove or add files or the status displayed in the component.

<UploadRemoveFile />

### Upload multiple files

<UploadMultipleFiles />

### Upload loading state

When uploading the file you can set the loading state of the request using the `Upload.useUpload` hook and passing isLoading to the file that is being uploaded.

<UploadIsLoading />

### Upload error message

The only checks we do currently is for the file size and the file type. These errors are handled by the HTML element ´input´ so they aren't selectable. If you want any other error messages you can use the `Upload.useUpload` the same way as with the loading state.

<UploadErrorMessage />

### Upload specific accepted file formats

You can pass the file formats as a string array. This will restrict which files that can be selected.

<UploadAcceptedFormats />

### Upload custom text

All the text can be custom.

<UploadCustomText />

### Upload with prefilled error

<UploadPrefilledFileList />
