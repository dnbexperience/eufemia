/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useEffect } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Upload } from '../..'

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
          filesAmountLimit={2}
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
    </Wrapper>
  )
}
