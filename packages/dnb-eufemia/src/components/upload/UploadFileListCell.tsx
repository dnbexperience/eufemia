import React from 'react'
import classnames from 'classnames'

// Components
import Button from '../button/Button'
import Icon from '../../components/Icon'
import FormStatus from '../../components/FormStatus'
import ProgressIndicator from '../../components/progress-indicator'
import P from '../../../src/elements/P'

// Icons
import {
  trash as TrashIcon,
  exclamation_medium as ExclamationIcon,
  file_pdf_medium,
  file_xls_medium,
  file_ppt_medium,
  file_csv_medium,
  file_txt_medium,
  file_xml_medium,
  file_medium,
} from '../../icons'
import { UploadFile } from './types'

const images = {
  pdf: file_pdf_medium,
  xls: file_xls_medium,
  ppt: file_ppt_medium,
  csv: file_csv_medium,
  txt: file_txt_medium,
  xml: file_xml_medium,
  file: file_medium,
}

export interface UploadFileListCellProps {
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
  uploadLoadingText: React.ReactNode
  deleteButtonText: React.ReactNode
}

const UploadFileListCell = ({
  uploadFile,
  onDelete,
  uploadLoadingText,
  deleteButtonText,
}: UploadFileListCellProps) => {
  const { file, errorMessage, isLoading } = uploadFile
  const { name, type } = file

  const fileType = type.split('/')[1]

  const hasWarning = errorMessage != null

  const imageUrl = URL.createObjectURL(file)

  return (
    <li
      data-testid="upload-file-list-cell"
      className={classnames(
        'dnb-upload__file-cell',
        hasWarning && 'dnb-upload__file-cell--warning'
      )}
    >
      <div className="dnb-upload__file-cell__content">
        <div className="dnb-upload__file-cell__content__left">
          {getIcon()}
          {getTitle()}
        </div>
        <div>
          <Button
            data-testid="upload-delete-button"
            icon={TrashIcon}
            variant="tertiary"
            onClick={onDelete}
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
      return <ProgressIndicator data-testid="upload-progress-indicator" />
    }

    if (hasWarning) return <Icon icon={ExclamationIcon} />

    let iconFileType = fileType

    if (!Object.prototype.hasOwnProperty.call(images, fileType)) {
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
        {uploadLoadingText}
      </div>
    ) : (
      <div className="dnb-upload__file-cell__text-container">
        <a
          data-testid="upload-file-anchor"
          target="_blank"
          href={imageUrl}
          className={classnames(
            'dnb-anchor',
            'dnb-upload__file-cell__title'
          )}
          rel="noopener noreferrer"
        >
          {name}
        </a>
        <P
          data-testid="upload-subtitle"
          className="dnb-upload__file-cell__subtitle"
          size="x-small"
          top="xx-small"
        >
          {fileType.toUpperCase()}
        </P>
      </div>
    )
  }

  function getWarning() {
    return hasWarning ? (
      <FormStatus
        data-testid="upload-warning"
        top="small"
        text={errorMessage}
        stretch
      />
    ) : null
  }
}

export default UploadFileListCell
