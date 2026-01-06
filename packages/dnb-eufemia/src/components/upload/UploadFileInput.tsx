import React, { useCallback, useRef } from 'react'

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
import { UploadFile } from './types'

const UploadFileInput = ({
  children,
  disabled,
  files,
  ...rest
}: {
  children?: React.ReactNode
  files?: UploadFile[]
  disabled?: boolean
}) => {
  const fileInput = useRef<HTMLInputElement>(null)

  const context = React.useContext(UploadContext)

  const {
    id,
    acceptedFileTypes,
    buttonText,
    onInputUpload,
    filesAmountLimit,
    variant,
    buttonProps,
  } = context

  const openFileDialog = () => fileInput.current?.click()

  const sharedId = id || makeUniqueId()
  const accept = getAcceptedFileTypes(acceptedFileTypes)

  const onChangeHandler = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement
      const { files } = target

      onInputUpload(
        Array.from(files).map((file) => {
          return { file }
        })
      )
    },
    [onInputUpload]
  )

  const onClickHandler = useCallback((event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement

    /**
     * This resets the internal state.
     * Some browsers (chromium) to check for already selected files.
     * But we have our own logic for that.
     * We also align the UX to be the same to all browsers,
     * and to be same when the drag file API is used.
     */
    target.value = null
  }, [])

  return (
    <div className="dnb-upload__file-input-area">
      {filesAmountLimit !== files?.length && (
        <Button
          top={variant === 'normal' ? 'medium' : undefined}
          id={`${sharedId}-input`}
          className="dnb-upload__file-input-button"
          icon={FolderIcon}
          icon_position="left"
          variant="secondary"
          wrap
          disabled={disabled}
          text={buttonText}
          {...buttonProps}
          onClick={(e) => {
            openFileDialog()
            buttonProps?.onClick?.(e)
          }}
        />
      )}
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
        disabled={disabled}
        {...rest}
      />
    </div>
  )
}

export default UploadFileInput
