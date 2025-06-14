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
    allowDuplicates,
    loadingText,
    onFileDelete,
    onFileClick,
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
      (fileListElement) => !fileIsSame(fileListElement, fileToBeRemoved)
    )
  }

  const fileIsSame = (fileA: UploadFile, fileB: UploadFile) => {
    const idIsSame = fileA.id && fileA.id === fileB.id
    const fileIsSame = fileA.file && fileA.file === fileB.file

    return idIsSame || fileIsSame
  }

  const updateFile = (
    fileToBeUpdated: UploadFile,
    props: Partial<UploadFile>
  ) => {
    return filesRef.current.map((fileListElement: UploadFile) => {
      return fileIsSame(fileListElement, fileToBeUpdated)
        ? {
            ...fileListElement,
            ...props,
          }
        : fileListElement
    })
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

  const handleFileClickAsync = async (uploadFile: UploadFile) => {
    updateFiles(
      updateFile(uploadFile, {
        isLoading: true,
      })
    )

    await onFileClick({ fileItem: uploadFile })
    updateFiles(
      updateFile(uploadFile, {
        isLoading: false,
      })
    )
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

        const onFileClickHandler = async () => {
          if (typeof onFileClick === 'function') {
            if (isAsync(onFileClick)) {
              handleFileClickAsync(uploadFile)
            } else {
              onFileClick({ fileItem: uploadFile })
            }
          }
        }

        return (
          <UploadFileListCell
            key={index}
            id={id}
            uploadFile={uploadFile}
            onDelete={onDeleteHandler}
            onClick={onFileClick && onFileClickHandler}
            deleteButtonText={deleteButton}
            loadingText={loadingText}
            download={download}
            allowDuplicates={allowDuplicates}
          />
        )
      })}
    </ul>
  )
}

export default UploadFileList
