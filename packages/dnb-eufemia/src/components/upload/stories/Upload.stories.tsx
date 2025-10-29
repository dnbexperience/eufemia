/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useEffect } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Upload, Dialog, Button, ToggleButton } from '../..'

function createMockFile(name: string, size: number, type: string) {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

export default {
  title: 'Eufemia/Components/Upload',
}

export const UploadSandbox = () => {
  const { files: files1 } = Upload.useUpload('upload-example-1')
  Upload.useUpload('upload-example-6')

  useEffect(() => {
    console.log(files1)
  }, [files1])

  const acceptedFileTypes = ['jpg', 'pdf', 'png']

  return (
    <Wrapper>
      <Box>
        <Upload id="upload-example-1" acceptedFileTypes={['pdf']} />
      </Box>
      <Box>
        <Upload id="upload-example-2" acceptedFileTypes={['jpg', 'pdf']} />
      </Box>
      <Box>
        <Upload
          title="Upload single file"
          id="upload-example-3"
          filesAmountLimit={1}
          acceptedFileTypes={acceptedFileTypes}
        />
      </Box>
      <Box>
        <Upload
          id="upload-example-4"
          fileMaxSize={1}
          acceptedFileTypes={['jpg', 'png']}
        />
      </Box>
      <Box>
        <Upload
          id="upload-example-5"
          acceptedFileTypes={acceptedFileTypes}
          title="custom title"
          text="custom text"
          fileTypeDescription="custom fileTypeDescription"
          fileSizeDescription="custom fileSizeDescription"
          fileSizeContent="custom fileSizeContent"
          buttonText="custom buttonText"
          loadingText="custom uploadingLoadingText"
          deleteButton="custom deleteButton"
        />
      </Box>
      <Box>
        Two Upload components can be controlled using the same id
        <Upload
          id="upload-example-6"
          acceptedFileTypes={acceptedFileTypes}
        />
        <Upload
          top="x-small"
          id="upload-example-7"
          acceptedFileTypes={acceptedFileTypes}
        />
      </Box>
      <Box>
        fileMaxSize disabled, hiding file max size
        <Upload
          id="upload-example-8"
          fileMaxSize={0}
          acceptedFileTypes={acceptedFileTypes}
        />
        <Upload
          id="upload-example-9"
          fileMaxSize={false}
          acceptedFileTypes={acceptedFileTypes}
        />
      </Box>

      <Box>
        fileMaxSize only defined in acceptedFileTypes
        <Upload
          id="upload-example-10"
          acceptedFileTypes={[
            { fileType: 'jpg', fileMaxSize: 1 },
            { fileType: 'png', fileMaxSize: 2 },
            { fileType: 'pdf', fileMaxSize: 3 },
          ]}
        />
        fileMaxSize only defined in acceptedFileTypes and filesAmountLimit
        <Upload
          id="upload-example-10"
          acceptedFileTypes={[
            { fileType: 'jpg', fileMaxSize: 1 },
            { fileType: 'doc', fileMaxSize: 1 },
            { fileType: 'eml', fileMaxSize: 1 },
            { fileType: 'log', fileMaxSize: 1 },
            { fileType: 'msg', fileMaxSize: 1 },
            { fileType: 'odt', fileMaxSize: 1 },
            { fileType: 'png', fileMaxSize: 2 },
            { fileType: 'text', fileMaxSize: 2 },
            { fileType: 'txt', fileMaxSize: 2 },
            { fileType: 'pdf', fileMaxSize: 3 },
          ]}
          filesAmountLimit={2}
        />
        fileMaxSize defined in both acceptedFileTypes & fileMaxSize of 9
        <Upload
          id="upload-example-11"
          acceptedFileTypes={[
            { fileType: 'jpg', fileMaxSize: 1 },
            { fileType: 'doc', fileMaxSize: 1 },
            { fileType: 'svg', fileMaxSize: 1 },
            { fileType: 'gif', fileMaxSize: 1 },
            { fileType: 'eml', fileMaxSize: 1 },
            { fileType: 'png', fileMaxSize: 1 },
            { fileType: 'doc', fileMaxSize: 4 },
            { fileType: 'docx', fileMaxSize: 4 },
            { fileType: 'tiff', fileMaxSize: 5 },
            { fileType: 'tif', fileMaxSize: 5 },
            { fileType: 'html', fileMaxSize: 6 },
            { fileType: 'htm', fileMaxSize: 6 },
            { fileType: 'xls', fileMaxSize: 7 },
            { fileType: 'xlsx', fileMaxSize: 7 },
            { fileType: 'odt' },
            { fileType: 'pdf', fileMaxSize: 7 },
            { fileType: 'text', fileMaxSize: false },
            { fileType: 'txt', fileMaxSize: 0 },
            { fileType: 'zip', fileMaxSize: 99 },
          ]}
          fileMaxSize={99}
        />
        fileMaxSize defined in a few acceptedFileTypes & fileMaxSize of 9
        <Upload
          id="upload-example-12"
          acceptedFileTypes={[
            { fileType: 'gif', fileMaxSize: 1 },
            { fileType: 'jpg' },
            { fileType: 'png', fileMaxSize: 0 },
            { fileType: 'pdf', fileMaxSize: false },
          ]}
          fileMaxSize={9}
        />
        Empty acceptedFileTypes
        <Upload id="upload-example-13" acceptedFileTypes={[]} />
      </Box>
    </Wrapper>
  )
}

export const UploadEdgeCases = () => {
  const { setFiles } = Upload.useUpload('file-list')

  useEffect(() => {
    setFiles([
      undefined,
      {
        file: undefined,
      },
      null,
    ])
  }, [setFiles])

  return (
    <Wrapper>
      <Box>
        <Upload id="file-list" acceptedFileTypes={['pdf']} />
      </Box>
    </Wrapper>
  )
}

export const UploadInAModal = () => {
  return (
    <Wrapper>
      <Box>
        <Dialog>
          <Upload
            id="upload-files-x"
            acceptedFileTypes={['pdf']}
            filesAmountLimit={5}
          />
        </Dialog>
      </Box>
    </Wrapper>
  )
}

export const UploadReset = () => {
  const { setFiles, clearFiles } = Upload.useUpload('reset-files')

  useEffect(() => {
    setFiles([
      { file: createMockFile('fileName1.png', 123, 'image/png') },
      { file: createMockFile('fileName2.png', 123, 'image/png') },
    ])
  }, [setFiles])

  return (
    <Wrapper>
      <Box>
        <Button
          onClick={() => {
            clearFiles()
          }}
        >
          Clear upload
        </Button>
        <Upload
          id="reset-files"
          acceptedFileTypes={['pdf']}
          filesAmountLimit={1}
        />
      </Box>
    </Wrapper>
  )
}

export const UploadDisabled = () => {
  return (
    <Wrapper>
      <Box>
        <Upload id="disabled" disabled acceptedFileTypes={['pdf']} />
      </Box>
    </Wrapper>
  )
}

export const UploadCompact = () => {
  return (
    <Wrapper>
      <Upload
        variant="compact"
        id="asdadasd"
        title="asdasdaaaaa"
        text={false}
        acceptedFileTypes={['pdf']}
      />

      <Upload
        variant="compact"
        id="b123123123"
        title="b1231231"
        text={false}
        acceptedFileTypes={['pdf']}
      />

      <Upload
        variant="compact"
        id="x1221312312"
        title="x12312"
        text={false}
        acceptedFileTypes={['pdf']}
      />
    </Wrapper>
  )
}

export const setFiles = () => {
  const ChildComponent = () => {
    const { files, setFiles } = Upload.useUpload('upload-files')

    return (
      <>
        <Button
          onClick={() => {
            setFiles([])
          }}
        >
          Clear upload
        </Button>
        <Upload
          id="upload-files"
          acceptedFileTypes={['pdf']}
          filesAmountLimit={5}
          fileMaxSize={4.5}
          text={false}
          title={false}
          variant="compact"
        />
        <ToggleButton
          top="small"
          disabled={files.length < 1}
          on_change={({ checked }) =>
            setFiles(
              files.map((fileItem) => {
                return {
                  ...fileItem,
                }
              })
            )
          }
        >
          Files is loading toggle
        </ToggleButton>
      </>
    )
  }

  return <ChildComponent />
}
