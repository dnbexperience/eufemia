import React, { useEffect, useRef } from 'react'

// Components
import Button from '../button/Button'

// Icons
import { folder as FolderIcon } from '../../icons'

// Shared
import { makeUniqueId } from '../../shared/component-helper'

// Internal
import { UploadContext } from './UploadContext'
import UploadStatus from './UploadStatus'
import useUpload from './useUpload'

const UploadFileInput = () => {
  const fileInput = useRef<HTMLInputElement>(null)

  const context = React.useContext(UploadContext)

  const {
    id,
    acceptedFileTypes,
    buttonText,
    onInputUpload,
    filesAmountLimit,
  } = context

  const { internalFiles } = useUpload(id)

  const accept = acceptedFileTypes.reduce((accept, format, index) => {
    const previus = index === 0 ? '' : `${accept},`
    return `${previus} .${format}`
  }, '')

  useEffect(() => {
    fileInput.current.value = null
    fileInput.current.accept = accept
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const openFileDialog = () => fileInput.current?.click()

  const sharedId = id || makeUniqueId()

  return (
    <div data-testid="upload-file-input">
      <Button
        top="medium"
        id={`${sharedId}-input`}
        data-testid="upload-file-input-button"
        className="dnb-upload__file-input-button"
        icon={FolderIcon}
        icon_position="left"
        variant="secondary"
        wrap
        onClick={openFileDialog}
        disabled={internalFiles.length > filesAmountLimit}
      >
        {buttonText}
      </Button>

      <UploadStatus />

      <input
        aria-labelledby={`${sharedId}-input`}
        data-testid="upload-file-input-input"
        ref={fileInput}
        className="dnb-upload__file-input"
        type="file"
        onChange={handleFileInput}
        multiple={filesAmountLimit > 1}
      />
    </div>
  )

  function handleFileInput(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement
    const { files } = target

    onInputUpload(
      Array.from(files).map((file) => {
        return { file }
      })
    )
  }
}

export default UploadFileInput
