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

export const UploadFileMaxSizeBasedOnFileFormat = () => (
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

export const UploadDisabledFileMaxSize = () => (
  <ComponentBox hideCode>
    {() => {
      const Component = () => {
        const verifyFileMaxSize = (file: File) => {
          const errorMapByType = {
            ['application/pdf']: {
              fileMaxSizeMb: 4,
              errorMessage:
                'Filen du prøver å laste opp er for stor, vi støtter ikke PDF-filer større enn 4 MB.',
            },
            ['image/jpeg']: {
              fileMaxSizeMb: 1,
              errorMessage:
                'Filen du prøver å laste opp er for stor, vi støtter ikke JPG-filer større enn 1 MB.',
            },
          }
          const BYTES_IN_A_MEGA_BYTE = 1048576

          const errorObj = errorMapByType[file.type]

          if (
            errorObj &&
            // Converts from b (binary) to MB (decimal)
            file.size / BYTES_IN_A_MEGA_BYTE > errorObj.fileMaxSizeMb
          ) {
            return errorObj.errorMessage
          }
          return null
        }

        const { files, setFiles } = Upload.useUpload(
          'upload-disabled-file-max-size',
        )

        if (files.length) {
          console.log('files', files, setFiles)
        }

        return (
          <Upload
            text="Dra & slipp eller velg hvilke filer du vil laste opp. PDF-filer kan ikke være større enn 4 MB og JPG-filer ikke større enn 1 MB."
            acceptedFileTypes={['jpg', 'pdf']}
            id="upload-disabled-file-max-size"
            fileMaxSize={false}
            onChange={({ files }) => {
              setFiles(
                files.map((fileItem) => {
                  return {
                    ...fileItem,
                    errorMessage: verifyFileMaxSize(fileItem.file),
                  }
                }),
              )
            }}
          />
        )
      }

      return <Component />
    }}
  </ComponentBox>
)
