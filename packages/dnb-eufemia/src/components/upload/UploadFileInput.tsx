import React, { useEffect, useRef } from 'react'

// Components
import Button from '../button/Button'

// Icons
import { folder as FolderIcon } from '../../icons'

// Shared
import { format } from '../number-format/NumberUtils'

// Internal
import { UploadFile } from './types'

export interface UploadFileInputProps {
  acceptedFormats: string[]
  onUpload: (files: UploadFile[]) => void
  fileMaxSize: number
  uploadFileButtonText: React.ReactNode
  uploadErrorLargeFile: React.ReactNode
  multipleFiles: boolean
}

const BYTES_IN_A_MEGA_BYTE = 1048576

const UploadFileInput = ({
  acceptedFormats,
  uploadFileButtonText,
  onUpload,
  fileMaxSize,
  uploadErrorLargeFile,
  multipleFiles = false,
}: UploadFileInputProps) => {
  const fileInput = useRef<HTMLInputElement>(null)

  const accept = acceptedFormats.reduce((accept, format, index) => {
    const previus = index === 0 ? '' : `${accept},`
    return `${previus} .${format}`
  }, '')

  useEffect(() => {
    fileInput.current.value = null
    fileInput.current.accept = accept
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const openFileDialog = () => fileInput.current?.click()

  return (
    <div
      data-testid="upload-file-input"
      className="dnb-upload__button-section"
    >
      <Button
        data-testid="upload-file-input-button"
        icon={FolderIcon}
        icon_position="left"
        variant="secondary"
        wrap
        onClick={openFileDialog}
      >
        {uploadFileButtonText}
      </Button>

      <input
        data-testid="upload-file-input-input"
        ref={fileInput}
        className="dnb-upload__file-input"
        type="file"
        onChange={handleFileInput}
        multiple={multipleFiles}
      />
    </div>
  )

  function handleFileInput({ target: { files } }) {
    const uploadFile = [...Array(files.length)].map((_item, index) => {
      const file: UploadFile = { file: files[index] }
      const errorMessage = getErrorMessage(file.file.size)

      if (errorMessage) return { ...file, errorMessage }
      return file
    })
    onUpload(uploadFile)
  }

  function getErrorMessage(fileSize: number) {
    const errorMessage = String(uploadErrorLargeFile).replace(
      '%size',
      format(fileMaxSize).toString()
    )
    // Converts from b (binary) to MB (decimal)
    return fileSize / BYTES_IN_A_MEGA_BYTE > fileMaxSize
      ? errorMessage
      : null
  }
}

export default UploadFileInput
