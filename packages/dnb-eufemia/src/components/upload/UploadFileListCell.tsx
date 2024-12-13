import React, { useCallback, useRef } from 'react'
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
  file_png_medium as png,
  file_jpg_medium as jpg,
  file_word_medium as doc,
  file_pdf_medium as pdf,
  file_xls_medium as xls,
  file_ppt_medium as ppt,
  file_csv_medium as csv,
  file_txt_medium as txt,
  file_xml_medium as xml,
  file_medium as file,
} from '../../icons'
import { UploadFile, UploadFileNative } from './types'

// Shared
import { getPreviousSibling } from '../../shared/component-helper'
import useUpload from './useUpload'
import { getFileTypeFromExtension } from './UploadVerify'
import UploadFileLink from './UploadFileListLink'
import { ProgressIndicatorAllProps } from '../progress-indicator/types'

// Will be deprecated - and then default to only showing the file icon,
// and not file icon per file extension type
export const fileExtensionImages = {
  png,
  jpg,
  pdf,
  doc,
  docx: doc,
  odt: doc,
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
  uploadFile: UploadFile | UploadFileNative

  /**
   * Calls onDelete when clicking the delete button
   */
  onDelete: () => void

  /**
   * Calls onClick when clicking the file name
   */
  onClick?: () => void

  /**
   * Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window.
   * Default: false
   */
  download?: boolean

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
  onClick,
  loadingText,
  deleteButtonText,
  download,
}: UploadFileListCellProps) => {
  const { file, errorMessage, isLoading } = uploadFile
  const hasWarning = errorMessage != null

  const imageUrl = file?.size > 0 ? URL.createObjectURL(file) : null
  const cellRef = useRef<HTMLLIElement>()
  const exists = useExistsHighlight(id, file)

  const handleDisappearFocus = useCallback(() => {
    const cellElement = cellRef.current
    const focusElement = getPreviousSibling(
      '.dnb-upload',
      cellElement
    )?.querySelector('.dnb-upload__file-input-button') as HTMLButtonElement
    focusElement?.focus({ preventScroll: true })
  }, [cellRef])

  const onDeleteHandler = useCallback(() => {
    handleDisappearFocus()

    onDelete()
  }, [handleDisappearFocus, onDelete])

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
          {getFileIcon(file, { isLoading }, hasWarning)}
          {getTitle()}
        </div>
        <div>
          <Button
            icon={TrashIcon}
            variant="tertiary"
            onClick={onDeleteHandler}
            icon_position="left"
            disabled={isLoading}
          >
            {deleteButtonText}
          </Button>
        </div>
      </div>

      {getWarning()}
    </li>
  )

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
        <UploadFileLink
          text={file.name}
          href={imageUrl}
          download={download}
          onClick={onClick}
        />
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

export function getFileIcon(
  file: File,
  loading?: {
    isLoading: UploadFile['isLoading']
    size?: ProgressIndicatorAllProps['size']
  },
  hasWarning?: boolean
) {
  if (loading?.isLoading) {
    return <ProgressIndicator size={loading?.size ?? 'default'} />
  }

  if (hasWarning) return <Icon icon={ExclamationIcon} />

  let iconFileType = getFileTypeFromExtension(file)

  if (!iconFileType) {
    const mimeParts = file.type.split('/')
    iconFileType =
      fileExtensionImages[mimeParts[0]] ||
      fileExtensionImages[mimeParts[1]]
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      fileExtensionImages,
      iconFileType
    )
  ) {
    iconFileType = 'file'
  }

  return <Icon icon={fileExtensionImages[iconFileType]} />
}
