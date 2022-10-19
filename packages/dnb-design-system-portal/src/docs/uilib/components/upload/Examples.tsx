/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

const createMockFile = (name: string, size: number, type: string) => {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

const useMockFiles = (setFiles, extend) => {
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName.png', 123, 'image/png'),
        ...extend,
      },
    ])
  }, [])
}

export const UploadPrefilledFileList = () => (
  <ComponentBox
    useRender
    data-visual-test="upload-file-list"
    scope={{ useMockFiles }}
  >
    {
      /* jsx */ `
const Component = () => {
  const {files, setFiles} = Upload.useUpload('file-list')
  useMockFiles(setFiles, { errorMessage: 'This is no real file!' })

  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='file-list'
    />
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

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

export const UploadSingleFile = () => (
  <ComponentBox useRender>
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-single-file')
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id='upload-single-file'
      singleFile={true}
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
  <ComponentBox
    scope={{ useMockFiles }}
    useRender
    data-visual-test="upload-is-loading"
  >
    {
      /* jsx */ `
const Component = () => {  
  const {files, setFiles} = Upload.useUpload('upload-is-loading')
  useMockFiles(setFiles, { isLoading: true })
  
  return (
    <>
      <Upload
        acceptedFileTypes={['jpg', 'png']}
        id='upload-is-loading'
      />
      <ToggleButton top='small' disabled={files.length < 1} checked onChange={({ checked }) => {
        setFiles(files.map((file) => {
          return {...file, isLoading: checked}
        }))
      }}
      >Files is loading toggle</ToggleButton>
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
      <ToggleButton
        top='small'
        disabled={files.length < 1} 
        onChange={
          ({ checked }) => {
            setFiles(
              files.map((file) => {
                return {...file, errorMessage: checked? 'custom error message': null}
              })
            )
          }
        }
      >
        Toggle error message
      </ToggleButton>
    </>
  )
}
render(<Component />)
  `
    }
  </ComponentBox>
)

export const UploadAcceptedFormats = () => (
  <ComponentBox useRender>
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
  <ComponentBox>
    {
      /* jsx */ `
<Upload 
  acceptedFileTypes={['jpg', 'png']}
  id='upload-custom-text'
  title='custom title'
  text='custom text'
  fileTypeDescription='custom fileTypeDescription'
  fileSizeDescription='custom fileSizeDescription'
  fileSizeContent='custom fileSizeContent'
  buttonText='custom buttonText'
  loadingText='custom loadingText'
  deleteButton='custom deleteButton'
 />
     `
    }
  </ComponentBox>
)
