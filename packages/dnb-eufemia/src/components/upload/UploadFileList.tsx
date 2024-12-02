import React from 'react'
import { UploadFile } from './types'
import { UploadContext } from './UploadContext'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'
import { isAsync } from '../../shared/helpers/isAsync'

function UploadFileList() {
  const context = React.useContext(UploadContext)

  const {
    id,
    fileListAriaLabel,
    deleteButton,
    download,
    loadingText,
    onFileDelete,
    onChange,
  } = context

  const { files, setFiles, setInternalFiles } = useUpload(id)

  if (files === null || files.length < 1) {
    return null
  }

  const removeFile = (fileToBeRemoved, files) => {
    return files.filter(
      (fileListElement) => fileListElement.file != fileToBeRemoved.file
    )
  }

  const updateFile = (fileToBeUpdated, props, files) => {
    return files.map((fileListElement) =>
      fileListElement.id === fileToBeUpdated.id
        ? {
            ...fileListElement,
            ...props,
          }
        : fileListElement
    )
  }

  const updateFiles = (files) => {
    setFiles(files)
    setInternalFiles(files)

    if (typeof onChange === 'function') {
      onChange({ files })
    }
  }

  const handleDeleteAsync = async (uploadFile, files) => {
    updateFiles(
      updateFile(
        uploadFile,
        { isLoading: true, errorMessage: undefined },
        files
      )
    )

    try {
      await onFileDelete({ fileItem: uploadFile })
      updateFiles(removeFile(uploadFile, files))
    } catch (error) {
      updateFiles(
        updateFile(
          uploadFile,
          { isLoading: false, errorMessage: error.message },
          files
        )
      )
    }
  }

  return (
    <ul className="dnb-upload__file-list" aria-label={fileListAriaLabel}>
      {files.map((uploadFile: UploadFile, index: number) => {
        const onDeleteHandler = async () => {
          if (typeof onFileDelete === 'function') {
            if (isAsync(onFileDelete)) {
              handleDeleteAsync(uploadFile, files)
            } else {
              onFileDelete({ fileItem: uploadFile })
              updateFiles(removeFile(uploadFile, files))
            }
          } else {
            updateFiles(removeFile(uploadFile, files))
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
            download={download}
          />
        )
      })}
    </ul>
  )
}

export default UploadFileList
