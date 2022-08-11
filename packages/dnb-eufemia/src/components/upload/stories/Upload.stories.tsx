/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Upload } from '../..'

export default {
  title: 'Eufemia/Components/Upload',
}

export const UploadSandbox = () => {
  const onChange = (files: File[]) => {
    console.log(files)
  }
  return (
    <Wrapper>
      <Box>
        <Upload onChange={onChange} />
      </Box>
      <Box>
        <Upload isLoading onChange={onChange} />
      </Box>
      <Box>
        <Upload
          onChange={onChange}
          fileMaxSize={123}
          acceptedFileTypes={['jpg', 'png']}
        />
      </Box>
      <Box>
        <Upload
          onChange={onChange}
          title="custom title"
          text="custom text"
          formatsDescription="custom formatsDescription"
          fileSizeDescription="custom fileSizeDescription"
          fileSizeContent="custom fileSizeContent"
          uploadButtonText="custom uploadButtonText"
          uploadingLoadingText="custom uploadingLoadingText"
          errorWrongFileFormat="custom errorWrongFileFormat"
          errorToLargeFile="custom errorToLargeFile"
          deleteButton="custom deleteButton"
        />
      </Box>
      <Box>
        <Upload onChange={onChange} skeleton />
      </Box>
    </Wrapper>
  )
}
