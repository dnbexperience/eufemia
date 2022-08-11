import React from 'react'
import classnames from 'classnames'

// Components
import Button from '../button/Button'
import Icon from '../../components/Icon'
import FormStatus from '../../components/FormStatus'

// Icons
import {
  trash_medium as TrashIcon,
  exclamation_medium as ExclamationIcon,
  file_pdf_medium,
  file_xls_medium,
  file_ppt_medium,
  file_csv_medium,
  file_txt_medium,
  file_xml_medium,
  file_medium,
} from '../../icons'

const images = {
  pdf: file_pdf_medium,
  xls: file_xls_medium,
  ppt: file_ppt_medium,
  csv: file_csv_medium,
  txt: file_txt_medium,
  xml: file_xml_medium,
  file: file_medium,
}

interface UploadFileListCellProps {
  /**
   * Uploaded file
   */
  file: File
  /**
   * Calls onDelete when clicking the delete button
   */
  onDelete: () => void
  /**
   * Text
   */
  deleteButtonText: React.ReactNode
  errorMessage?: React.ReactNode
}

const UploadFileListCell = ({
  file,
  onDelete,
  deleteButtonText,
  errorMessage,
}: UploadFileListCellProps) => {
  const { name, type } = file

  const fileType = type.split('/')[1]

  const hasWarning = errorMessage != null

  const imageUrl = URL.createObjectURL(file)

  return (
    <div
      data-testid="upload-file-list-cell"
      className={classnames(
        'dnb-upload__file-cell',
        hasWarning
          ? 'dnb-upload__file-cell--error'
          : 'dnb-upload__file-cell--no-error'
      )}
    >
      <div className="dnb-upload__file-cell__content">
        <div className="dnb-upload__file-cell__content__left">
          {getIcon()}
          <div className="dnb-upload__file-cell__text-container">
            <a
              data-testid="upload-file-anchor"
              target="_blank"
              href={imageUrl}
              className={classnames(
                'dnb-upload__file-cell__title',
                `dnb-upload__file-cell--${hasWarning ? '' : 'no-'}error`
              )}
              rel="noopener noreferrer"
            >
              {name}
            </a>

            <span
              data-testid="upload-subtitle"
              className="dnb-upload__file-cell__subtitle"
            >
              {fileType.toUpperCase()}
            </span>
          </div>
        </div>

        <Button
          data-testid="upload-delete-button"
          icon={TrashIcon}
          variant="tertiary"
          onClick={onDelete}
        >
          {deleteButtonText}
        </Button>
      </div>

      {getWarning()}
    </div>
  )

  function getIcon() {
    if (hasWarning)
      return (
        <Icon
          data-testid="upload-exclamation-icon"
          icon={ExclamationIcon}
        />
      )

    let iconFileType = fileType

    if (!Object.prototype.hasOwnProperty.call(images, fileType)) {
      iconFileType = 'file'
    }
    return (
      <Icon
        icon={images[iconFileType]}
        data-testid={`upload-${iconFileType}-icon`}
      />
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
