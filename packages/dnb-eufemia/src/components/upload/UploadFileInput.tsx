import React, { useEffect, useRef, useState } from 'react'

// Components
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'

// Icons
import { upload as UploadIcon } from '../../icons'
import { makeUniqueId } from '../../shared/component-helper'

export interface UploadFileInputProps {
  onUpload: (file: File) => void
  uploadFileButtonText: React.ReactNode
  multipleFiles?: boolean
}

const UploadFileInput = ({
  onUpload,
  uploadFileButtonText,
  multipleFiles = false,
}: UploadFileInputProps) => {
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fileInput.current.value = null
    fileInput.current.accept = ''
  })

  const [id] = useState(makeUniqueId)

  const openFileDialog = () => fileInput.current?.click()

  return (
    <span data-testid="upload-file-input">
      <Button
        data-testid="upload-file-input-button"
        icon={UploadIcon}
        icon_position="left"
        variant="secondary"
        onClick={openFileDialog}
      >
        {uploadFileButtonText}
      </Button>

      <FormLabel
        data-testid="upload-file-input-sr-label"
        sr_only
        id={id + '-label'}
        for_id={id}
        text={uploadFileButtonText}
      />

      <input
        id={id}
        data-testid="upload-file-input-input"
        ref={fileInput}
        className="dnb-upload__file-button"
        type="file"
        onChange={handleFileInput}
        multiple={multipleFiles}
        accept=".png"
      />
    </span>
  )

  function handleFileInput(e) {
    onUpload(e.target.files[0])
  }
}

export default UploadFileInput
