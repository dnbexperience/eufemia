import React, { useEffect, useRef } from 'react'
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

  const filesRef = useRef(null)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  if (files === null || files.length < 1) {
    return null
  }

  const removeFile = (fileToBeRemoved: UploadFile) => {
    return filesRef.current.filter(
      (fileListElement) => fileListElement.file != fileToBeRemoved.file
    )
  }

  const updateFile = (
    fileToBeUpdated: UploadFile,
    props: Partial<UploadFile>
  ) => {
    return filesRef.current.map((fileListElement) =>
      fileListElement.id === fileToBeUpdated.id
        ? {
            ...fileListElement,
            ...props,
          }
        : fileListElement
    )
  }

  const updateFiles = (updatedFiles: UploadFile[]) => {
    setFiles(updatedFiles)
    setInternalFiles(updatedFiles)

    if (typeof onChange === 'function') {
      onChange({ files: updatedFiles })
    }
  }

  const handleDeleteAsync = async (uploadFile: UploadFile) => {
    updateFiles(
      updateFile(uploadFile, {
        isLoading: true,
        errorMessage: null,
      })
    )

    try {
      await onFileDelete({ fileItem: uploadFile })
      updateFiles(removeFile(uploadFile))
    } catch (error) {
      updateFiles(
        updateFile(uploadFile, {
          isLoading: false,
          errorMessage: error.message,
        })
      )
    }
  }

  return (
    <ul className="dnb-upload__file-list" aria-label={fileListAriaLabel}>
      {files.map((uploadFile: UploadFile, index: number) => {
        const onDeleteHandler = async () => {
          if (typeof onFileDelete === 'function') {
            if (isAsync(onFileDelete)) {
              handleDeleteAsync(uploadFile)
            } else {
              onFileDelete({ fileItem: uploadFile })
              updateFiles(removeFile(uploadFile))
            }
          } else {
            updateFiles(removeFile(uploadFile))
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
