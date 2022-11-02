import React from 'react'
import { UploadFile } from './types'
import { UploadContext } from './UploadContext'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'

function UploadFileList() {
  const context = React.useContext(UploadContext)

  const {
    id,
    fileListAriaLabel,
    deleteButton,
    loadingText,
    onFileDelete,
    onChange,
  } = context

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
        const onDeleteHandler = () => {
          if (typeof onFileDelete === 'function') {
            onFileDelete({ fileItem: uploadFile })
          }

          const cleanedFiles = files.filter(
            (fileListElement) => fileListElement.file != uploadFile.file
          )

          setFiles(cleanedFiles)
          setInternalFiles(cleanedFiles)

          if (typeof onChange === 'function') {
            onChange({ files: cleanedFiles })
          }
        }

        return (
          <UploadFileListCell
            key={index}
            id={id}
            uploadFile={uploadFile}
            onDelete={onDeleteHandler}
            deleteButtonText={deleteButton}
            loadingText={loadingText}
          />
        )
      })}
    </ul>
  )
}

export default UploadFileList
