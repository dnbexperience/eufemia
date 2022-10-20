import React from 'react'
import { UploadFile } from './types'
import { UploadContext } from './UploadContext'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'

function UploadFileList() {
  const context = React.useContext(UploadContext)

  const { id, fileListAriaLabel, deleteButton, loadingText } = context

  const { files, setFiles, setInternalFiles } = useUpload(id)

  if (files == null || files.length < 1) {
    return null
  }

  return (
    <ul
      data-testid="upload-file-list"
      className="dnb-upload__file-list"
      aria-label={fileListAriaLabel}
    >
      {files.map((uploadFile: UploadFile, index: number) => {
        const onDeleteFile = () => {
          const cleanedFiles = files.filter(
            (fileListElement) => fileListElement.file != uploadFile.file
          )

          setFiles(cleanedFiles)
          setInternalFiles(cleanedFiles)
        }
        return (
          <UploadFileListCell
            uploadFile={uploadFile}
            key={index}
            onDelete={onDeleteFile}
            deleteButtonText={deleteButton}
            loadingText={loadingText}
          />
        )
      })}
    </ul>
  )
}

export default UploadFileList
