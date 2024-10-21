import React, { useRef } from 'react'
import classnames from 'classnames'

// Components
import Button from '../button/Button'
import Icon from '../../components/Icon'
import FormStatus from '../../components/FormStatus'
import ProgressIndicator from '../../components/progress-indicator'

// Icons
import {
  trash as TrashIcon,
  exclamation_medium as ExclamationIcon,
  file_pdf_medium as pdf,
  file_xls_medium as xls,
  file_ppt_medium as ppt,
  file_csv_medium as csv,
  file_txt_medium as txt,
  file_xml_medium as xml,
  file_medium as file,
} from '../../icons'
import { UploadFile } from './types'

// Shared
import { getPreviousSibling, warn } from '../../shared/component-helper'
import useUpload from './useUpload'
import { getFileTypeFromExtension } from './UploadVerify'

const images = {
  pdf,
  xls,
  ppt,
  csv,
  txt,
  xml,
  file,
}

export type UploadFileListCellProps = {
  id: string

  /**
   * Uploaded file
   */
  uploadFile: UploadFile

  /**
   * Calls onDelete when clicking the delete button
   */
  onDelete: () => void

  /**
   * Text
   */
  loadingText: React.ReactNode
  deleteButtonText: React.ReactNode
}

const UploadFileListCell = ({
  id,
  uploadFile,
  onDelete,
  loadingText,
  deleteButtonText,
}: UploadFileListCellProps) => {
  const { file, errorMessage, isLoading } = uploadFile
  const hasWarning = errorMessage != null

  const fileType = getFileTypeFromExtension(file)

  const imageUrl = URL.createObjectURL(file)
  const cellRef = useRef<HTMLLIElement>()
  const exists = useExistsHighlight(id, file)

  const handleDisappearFocus = () => {
    try {
      const cellElement = cellRef.current
      const focusElement = getPreviousSibling(
        '.dnb-upload',
        cellElement
      ).querySelector(
        '.dnb-upload__file-input-button'
      ) as HTMLButtonElement
      focusElement.focus()
    } catch (e) {
      warn(e)
    }
  }

  const onDeleteHandler = () => {
    handleDisappearFocus()

    onDelete()
  }

  return (
    <li
      className={classnames(
        'dnb-upload__file-cell',
        hasWarning && 'dnb-upload__file-cell--warning',
        exists && 'dnb-upload__file-cell--highlight'
      )}
      ref={cellRef}
    >
      <div className="dnb-upload__file-cell__content">
        <div className="dnb-upload__file-cell__content__left">
          {getIcon()}
          {getTitle()}
        </div>
        <div>
          <Button
            icon={TrashIcon}
            variant="tertiary"
            onClick={onDeleteHandler}
            icon_position="left"
          >
            {deleteButtonText}
          </Button>
        </div>
      </div>

      {getWarning()}
    </li>
  )

  function getIcon() {
    if (isLoading) {
      return <ProgressIndicator />
    }

    if (hasWarning) return <Icon icon={ExclamationIcon} />

    let iconFileType = fileType

    if (!iconFileType) {
      const mimeParts = file.type.split('/')
      iconFileType = images[mimeParts[0]] || images[mimeParts[1]]
    }

    if (!Object.prototype.hasOwnProperty.call(images, iconFileType)) {
      iconFileType = 'file'
    }

    return <Icon icon={images[iconFileType]} />
  }

  function getTitle() {
    return isLoading ? (
      <div
        className={classnames(
          'dnb-upload__file-cell__text-container',
          'dnb-upload__file-cell__text-container--loading'
        )}
      >
        {loadingText}
      </div>
    ) : (
      <div className="dnb-upload__file-cell__text-container">
        <a
          target="_blank"
          href={imageUrl}
          className={classnames(
            'dnb-anchor',
            'dnb-upload__file-cell__title'
          )}
          rel="noopener noreferrer"
        >
          {file.name}
        </a>
      </div>
    )
  }

  function getWarning() {
    return hasWarning ? (
      <FormStatus top="small" text={errorMessage} stretch />
    ) : null
  }
}

export default UploadFileListCell

function useExistsHighlight(id: string, file: File) {
  const { internalFiles } = useUpload(id)
  const [exists, updateExists] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timer>()

  const clearTimers = () => {
    clearTimeout(timerRef.current)
  }

  React.useEffect(() => {
    const exists = internalFiles.some(({ exists, file: f }) => {
      return exists && f.name === file.name && f.size === file.size
    })

    if (exists) {
      updateExists(true)
      clearTimers()
      timerRef.current = setTimeout(() => updateExists(false), 1500) // transition-duration in CSS
    }

    return clearTimers
  }, [file, internalFiles])

  return exists
}
