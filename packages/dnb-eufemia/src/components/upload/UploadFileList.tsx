import React from 'react'

// Internal
import UploadFileListCell from './UploadFileListCell'
import { UploadFileListElement, UploadValidationError } from './types'

export interface UploadFileListProps {
  /**
   * List of uploaded files
   */
  files: UploadFileListElement[]
  /**
   * calls with the File object we want to delete
   */
  onDeleteFile: (file: File) => void
  /**
   * Text
   */
  deleteButtonText: React.ReactNode
  errorMessageFileFormat: React.ReactNode
  errorMessageLargeFile: React.ReactNode
}

const UploadFileList = ({
  files,
  onDeleteFile,
  errorMessageFileFormat,
  errorMessageLargeFile,
  deleteButtonText,
}: UploadFileListProps) => {
  if (files.length === 0) return null

  return (
    <div data-testid="upload-file-list" className="dnb-upload__file-list">
      {files.map(
        (fileListElement: UploadFileListElement, index: number) => {
          const { file, error } = fileListElement

          return (
            <UploadFileListCell
              file={file}
              key={index}
              onDelete={() => onDeleteFile(file)}
              errorMessage={getErrorMessage(error)}
              deleteButtonText={deleteButtonText}
            />
          )
        }
      )}
    </div>
  )

  function getErrorMessage(errorType: UploadValidationError) {
    switch (errorType) {
      case UploadValidationError.LARGE_FILE_SIZE:
        return errorMessageLargeFile
      case UploadValidationError.WRONG_FILE_TYPE:
        return errorMessageFileFormat
      default:
        return null
    }
  }
}

export default UploadFileList
