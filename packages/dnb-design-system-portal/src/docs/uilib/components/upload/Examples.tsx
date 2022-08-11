/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const UploadBasic = () => (
  <ComponentBox useRender data-visual-test="upload-basic">
    {
      /* jsx */ `
const Component = () => {
  const {files} = Upload.useUpload('upload-basic')

  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-basic'
    />
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadMultipleFiles = () => (
  <ComponentBox useRender data-visual-test="upload-multiple-files">
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-multiple-files')
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-multiple-files'
      multipleFiles={true}
    />
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)
export const UploadRemoveFile = () => (
  <ComponentBox useRender data-visual-test="upload-remove-files">
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-remove-files')
  return (
    <>
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-remove-files'
    />
    <Button 
      top='small' 
      disabled={files.length < 1} 
      onClick={() => setFiles([])}
    >
    Remove selected files
    </Button>
    </>
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadIsLoading = () => (
  <ComponentBox useRender data-visual-test="upload-is-loading">
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-is-loading')

  return (
    <>
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-is-loading'
    />
    <Button top='small' disabled={files.length < 1} onClick={() => {
      setFiles(files.map((file) => {return {...file, isLoading: true}}))
    }}
    >Files is loading toggle</Button>
    </>
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadErrorMessage = () => (
  <ComponentBox useRender data-visual-test="upload-error-message">
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-error-message')
  return (
    <>
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-error-message'
    />
    <Button top='small' disabled={files.length < 1} onClick={
      () => {
        setFiles(
          files.map((file) => {
            return {...file, errorMessage: 'custom error message'}
          })
          )

    }}
    >Add error message</Button>
    </>
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadAcceptedFormats = () => (
  <ComponentBox useRender data-visual-test="upload-accepted-formats">
    {
      /* jsx */ `
const Component = () => {
  const {files, setFiles} = Upload.useUpload('upload-accepted-formats')

  return (
    <Upload
      acceptedFileTypes={['png', 'jpg', 'pdf']}
      id='upload-accepted-formats'
    />
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadCustomText = () => (
  <ComponentBox data-visual-test="upload-custom-text">
    {
      /* jsx */ `
<Upload 
  acceptedFileTypes={['jpg', 'png']}
  id='upload-custom-text'
  title='custom title'
  text='custom text'
  formatsDescription='custom formatsDescription'
  fileSizeDescription='custom fileSizeDescription'
  fileSizeContent='custom fileSizeContent'
  uploadButtonText='custom uploadButtonText'
  uploadLoadingText='custom uploadLoadingText'
  deleteButton='custom deleteButton'
 />
     `
    }
  </ComponentBox>
)
