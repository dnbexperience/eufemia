/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const UploadBasic = () => (
  <ComponentBox data-visual-test="upload-basic">
    {
      /* jsx */ `
 <Upload
  acceptedFileTypes={['jpg', 'png']}
  onChange={(files) => console.log(files)}
 />
 `
    }
  </ComponentBox>
)

export const UploadIsLoading = () => (
  <ComponentBox data-visual-test="upload-is-loading">
    {
      /* jsx */ `
 <Upload
  acceptedFileTypes={['jpg', 'png']}
  onChange={(files) => console.log(files)}
  isLoading
 />
 `
    }
  </ComponentBox>
)

export const UploadAcceptedFormats = () => (
  <ComponentBox data-visual-test="upload-accepted-formats">
    {
      /* jsx */ `
 <Upload
  acceptedFileTypes={['jpg', 'png']}
  onChange={(files) => console.log(files)}
 />
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
  onChange={(files) => console.log(files)}
  // isLoading
  title='custom title'
  text='custom text'
  formatsDescription='custom formatsDescription'
  fileSizeDescription='custom fileSizeDescription'
  fileSizeContent='custom fileSizeContent'
  uploadButtonText='custom uploadButtonText'
  uploadingLoadingText='custom uploadingLoadingText'
  errorWrongFileFormat='custom errorWrongFileFormat'
  errorToLargeFile='custom errorToLargeFile'
  deleteButton='custom deleteButton'
 />
     `
    }
  </ComponentBox>
)
