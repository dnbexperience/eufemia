import React, { useRef } from 'react'

// Components
import Button from '../button/Button'

// Icons
import { folder as FolderIcon } from '../../icons'

// Shared
import { makeUniqueId } from '../../shared/component-helper'

// Internal
import { UploadContext } from './UploadContext'
import UploadStatus from './UploadStatus'
import { getAcceptedFileTypes } from './UploadVerify'

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

  const openFileDialog = () => fileInput.current?.click()

  const sharedId = id || makeUniqueId()
  const accept = getAcceptedFileTypes(acceptedFileTypes)

  return (
    <div className="dnb-upload__file-input-area">
      <Button
        top="medium"
        id={`${sharedId}-input`}
        className="dnb-upload__file-input-button"
        icon={FolderIcon}
        icon_position="left"
        variant="secondary"
        wrap
        onClick={openFileDialog}
      >
        {buttonText}
      </Button>

      <UploadStatus />

      <input
        aria-labelledby={`${sharedId}-input`}
        ref={fileInput}
        accept={accept}
        className="dnb-upload__file-input"
        type="file"
        onChange={onChangeHandler}
        onClick={onClickHandler}
        multiple={filesAmountLimit > 1}
      />
    </div>
  )

  function onChangeHandler(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement
    const { files } = target

    onInputUpload(
      Array.from(files).map((file) => {
        return { file }
      })
    )
  }

  function onClickHandler(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement

    /**
     * This resets the internal state.
     * Some browsers (chromium) to check for already selected files.
     * But we have our own logic for that.
     * We also align the UX to be the same to all browsers,
     * and to be same when the drag file API is used.
     */
    target.value = null
  }
}

export default UploadFileInput
