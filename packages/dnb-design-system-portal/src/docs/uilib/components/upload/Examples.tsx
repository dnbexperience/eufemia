/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Button,
  ToggleButton,
  Img,
  Section,
  Upload,
} from '@dnb/eufemia/src'
import { createRequest } from '../../extensions/forms/Form/SubmitIndicator/Examples'
import { UploadFile } from '@dnb/eufemia/src/components/Upload'

export function createMockFile(name: string, size: number, type: string) {
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
    data-visual-test="upload-file-list"
    scope={{ useMockFiles }}
  >
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload('file-list')

        if (files.length) {
          console.log('files', files)
        }

        useMockFiles(setFiles, { errorMessage: 'This is no real file!' })

        return <Upload acceptedFileTypes={['jpg', 'png']} id="file-list" />
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadBasic = () => (
  <ComponentBox data-visual-test="upload-basic">
    <Upload acceptedFileTypes={['jpg', 'png']} id="upload-basic" />
  </ComponentBox>
)

export const UploadSingleFile = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload('upload-single-file')

        if (files.length) {
          console.log('files', files, setFiles)
        }

        return (
          <Upload
            acceptedFileTypes={['jpg', 'png']}
            id="upload-single-file"
            filesAmountLimit={1}
          />
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadRemoveFile = () => (
  <ComponentBox data-visual-test="upload-remove-files">
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload('upload-remove-files')

        return (
          <>
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-remove-files"
            />

            <Button
              top="small"
              disabled={files.length < 1}
              onClick={() => setFiles([])}
            >
              Remove selected files
            </Button>

            <Preview files={files} />
          </>
        )

        function Preview({ files }) {
          const [images, setImages] = React.useState([])

          React.useEffect(() => {
            files.map(({ file }) => {
              let reader = new FileReader()

              reader.addEventListener(
                'load',
                (event) => {
                  images.push({ blob: event.target, file })
                  setImages([...images])
                  reader = null
                },
                false,
              )

              reader.readAsDataURL(file)
            })
          }, [files])

          return (
            <Section aria-label="List of chosen images">
              {images.map((img, i) => (
                <Img
                  top
                  key={i}
                  src={img.blob.result}
                  alt={img.file.name}
                  height={100}
                />
              ))}
            </Section>
          )
        }
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadIsLoading = () => (
  <ComponentBox
    scope={{ useMockFiles }}
    data-visual-test="upload-is-loading"
  >
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload('upload-is-loading')

        useMockFiles(setFiles, { isLoading: true })

        return (
          <>
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-is-loading"
            />
            <ToggleButton
              top="small"
              disabled={files.length < 1}
              on_change={({ checked }) =>
                setFiles(
                  files.map((fileItem) => {
                    return { ...fileItem, isLoading: checked }
                  }),
                )
              }
            >
              Files is loading toggle
            </ToggleButton>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadErrorMessage = () => (
  <ComponentBox data-visual-test="upload-error-message">
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload(
          'upload-error-message',
        )

        return (
          <>
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-error-message"
            />
            <ToggleButton
              top="small"
              disabled={files.length < 1}
              on_change={({ checked }) => {
                setFiles(
                  files.map((fileItem) => {
                    return {
                      ...fileItem,
                      errorMessage: checked
                        ? 'custom error message'
                        : null,
                    }
                  }),
                )
              }}
            >
              Toggle error message
            </ToggleButton>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadAcceptedFormats = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload(
          'upload-accepted-formats',
        )

        if (files.length) {
          console.log('files', files, setFiles)
        }

        return (
          <Upload
            acceptedFileTypes={['png', 'jpg', 'pdf']}
            id="upload-accepted-formats"
          />
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadFileMaxSizeBasedOnFileType = () => (
  <ComponentBox
    data-visual-test="upload-file-max-size-based-on-file-format"
    hideCode
  >
    <Upload
      id="upload-file-max-size-based-on-file-format"
      fileMaxSize={99}
      acceptedFileTypes={[
        { fileType: 'jpg', fileMaxSize: 1 },
        { fileType: 'doc', fileMaxSize: 1 },
        { fileType: 'svg', fileMaxSize: 1 },
        { fileType: 'gif', fileMaxSize: 1 },
        { fileType: 'doc', fileMaxSize: 4 },
        { fileType: 'docx', fileMaxSize: 4 },
        { fileType: 'tiff', fileMaxSize: 5 },
        { fileType: 'tif', fileMaxSize: 5 },
        { fileType: 'html', fileMaxSize: 6 },
        { fileType: 'htm', fileMaxSize: 6 },
        { fileType: 'xls', fileMaxSize: 7 },
        { fileType: 'xlsx', fileMaxSize: 7 },
        { fileType: 'odt' },
        { fileType: 'pdf' },
        { fileType: 'text', fileMaxSize: false },
        { fileType: 'txt', fileMaxSize: 0 },
        { fileType: 'zip', fileMaxSize: 99 },
      ]}
    />
  </ComponentBox>
)

export const UploadFileMaxSizeBasedOnFileTypeDisabled = () => (
  <ComponentBox>
    <Upload
      id="upload-file-max-size-based-on-file-format-disabled"
      acceptedFileTypes={[
        { fileType: 'jpg', fileMaxSize: 0 },
        { fileType: 'doc', fileMaxSize: false },
        { fileType: 'svg' },
      ]}
    />
  </ComponentBox>
)

export const UploadDisabledFileMaxSize = () => (
  <ComponentBox data-visual-test="upload-disabled-file-max-size">
    <Upload
      acceptedFileTypes={['jpg', 'pdf']}
      id="upload-disabled-file-max-size"
      fileMaxSize={false}
    />
  </ComponentBox>
)

export const UploadNoTitleNoText = () => (
  <ComponentBox data-visual-test="upload-no-title-no-text">
    <Upload
      title={false}
      text={false}
      acceptedFileTypes={['jpg', 'png']}
      id="upload-no-title-no-text"
    />
  </ComponentBox>
)

export const UploadOnFileDelete = () => (
  <ComponentBox
    data-visual-test="upload-on-file-delete"
    scope={{ createRequest }}
  >
    {() => {
      async function mockAsyncFileRemoval({ fileItem }) {
        const request = createRequest()

        try {
          console.log(
            'making API request to remove: ' + fileItem.file.name,
          )
          await request(3000) // Simulate a request
          const mockResponse = {
            successful_removal: false, // Fails to remove the file
          }

          if (!mockResponse.successful_removal) {
            throw new Error('Unable to remove this file')
          }
        } catch (error) {
          throw error
        }
      }

      return (
        <Upload
          onFileDelete={mockAsyncFileRemoval}
          acceptedFileTypes={['jpg', 'png']}
          id="upload-on-file-delete"
        />
      )
    }}
  </ComponentBox>
)
