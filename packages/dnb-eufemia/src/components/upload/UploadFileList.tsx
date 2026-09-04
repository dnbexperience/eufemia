import { useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { UploadFile } from './types'
import { UploadContext } from './UploadContext'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'
import { isSameFile } from './uploadFileUtils'

type FileOperation = {
  timeout?: ReturnType<typeof setTimeout>
}

function UploadFileList() {
  const context = useContext(UploadContext)

  const {
    id,
    listAriaLabel,
    deleteButton,
    download,
    allowDuplicates,
    loadingText,
    asyncFileOperationTimeout,
    errorDeleteTimeout,
    onFileDelete,
    onFileClick,
    onChange,
  } = context

  const { files, setFiles, setInternalFiles } = useUpload(id)

  const filesRef = useRef<UploadFile[] | null>(null)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  // Pending operations are tracked so their deadline can be cleared when the
  // list unmounts, and so a Promise settling afterwards is ignored.
  const operationsRef = useRef<Set<FileOperation>>(new Set())

  useEffect(() => {
    const operations = operationsRef.current
    return () => {
      operations.forEach(({ timeout }) => clearTimeout(timeout))
      operations.clear()
    }
  }, [])

  if (files === null || files.length < 1) {
    return null
  }

  const removeFile = (fileToBeRemoved: UploadFile) => {
    return filesRef.current.filter(
      (fileListElement) => !isSameFile(fileListElement, fileToBeRemoved)
    )
  }

  const updateFile = (
    fileToBeUpdated: UploadFile,
    props: Partial<UploadFile>
  ) => {
    return filesRef.current.map((fileListElement: UploadFile) => {
      return isSameFile(fileListElement, fileToBeUpdated)
        ? {
            ...fileListElement,
            ...props,
          }
        : fileListElement
    })
  }

  const updateFiles = (updatedFiles: UploadFile[]) => {
    // Keep the ref in step synchronously. It is otherwise only refreshed by an
    // effect, so two operations settling in the same tick would both compute
    // from the same stale list, and the second would undo the first.
    filesRef.current = updatedFiles

    setFiles(updatedFiles)
    setInternalFiles(updatedFiles)

    if (typeof onChange === 'function') {
      onChange({ files: updatedFiles })
    }
  }

  /**
   * Gives one async file operation a deadline, so that exactly one of
   * `onResolve`, `onReject` and `onTimeout` runs. A file waiting for the
   * operation shows a loading state and cannot be deleted, so a Promise that
   * never settles would leave it stuck with no way out. A Promise settling
   * after the deadline is ignored, since the file has been recovered by then.
   */
  const runFileOperation = (
    result: Promise<unknown>,
    handlers: {
      onResolve: () => void
      onReject: (error: unknown) => void
      onTimeout: () => void
    }
  ) => {
    const operations = operationsRef.current
    const operation: FileOperation = {}
    operations.add(operation)

    // Only returns true for whichever outcome arrives first
    const claimOperation = () => operations.delete(operation)

    operation.timeout = setTimeout(() => {
      if (claimOperation()) {
        handlers.onTimeout()
      }
    }, asyncFileOperationTimeout)

    void result.then(
      () => {
        if (claimOperation()) {
          clearTimeout(operation.timeout)
          handlers.onResolve()
        }
      },
      (error) => {
        if (claimOperation()) {
          clearTimeout(operation.timeout)
          handlers.onReject(error)
        }
      }
    )
  }

  return (
    <ul className="dnb-upload__file-list" aria-label={listAriaLabel}>
      {files.map((uploadFile: UploadFile, index: number) => {
        const onDeleteHandler = () => {
          if (typeof onFileDelete !== 'function') {
            updateFiles(removeFile(uploadFile))
            return
          }

          // "onFileDelete" is documented as `void | Promise<void>`. Calling it
          // and inspecting the result supports both, where predicting it from
          // the function declaration would silently drop the Promise of a
          // handler that is not declared `async`.
          const result: unknown = onFileDelete({ fileItem: uploadFile })

          if (!(result instanceof Promise)) {
            updateFiles(removeFile(uploadFile))
            return
          }

          updateFiles(
            updateFile(uploadFile, {
              isLoading: true,
              errorMessage: null,
            })
          )

          const keepFileWithError = (errorMessage: ReactNode) => {
            updateFiles(
              updateFile(uploadFile, {
                isLoading: false,
                errorMessage,
              })
            )
          }

          runFileOperation(result, {
            // The file is only removed once the consumer confirms the
            // deletion, which is why the two other outcomes keep it listed
            onResolve: () => updateFiles(removeFile(uploadFile)),
            onReject: (error) =>
              keepFileWithError(
                error instanceof Error ? error.message : String(error)
              ),
            onTimeout: () => keepFileWithError(errorDeleteTimeout),
          })
        }

        const onFileClickHandler = () => {
          if (typeof onFileClick !== 'function') {
            return
          }

          const result: unknown = onFileClick({ fileItem: uploadFile })

          if (!(result instanceof Promise)) {
            return
          }

          updateFiles(updateFile(uploadFile, { isLoading: true }))

          const stopLoading = () => {
            updateFiles(updateFile(uploadFile, { isLoading: false }))
          }

          runFileOperation(result, {
            onResolve: stopLoading,
            onReject: stopLoading,
            onTimeout: stopLoading,
          })
        }

        return (
          <UploadFileListCell
            key={uploadFile.id ?? uploadFile.file?.name ?? index}
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
