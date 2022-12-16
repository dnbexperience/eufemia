import React from 'react'
import classnames from 'classnames'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import Provider from '../../shared/Provider'
import Context from '../../shared/Context'
import {
  extendPropsWithContext,
  makeUniqueId,
} from '../../shared/component-helper'

// Internal
import UploadFileInput from './UploadFileInput'
import useUpload from './useUpload'
import UploadDropzone from './UploadDropzone'
import { UploadContext, defaultProps } from './UploadContext'
import { verifyFiles } from './UploadVerify'

import type { UploadFile, UploadAllProps } from './types'
import UploadFileList from './UploadFileList'
import UploadInfo from './UploadInfo'

export { defaultProps }

const Upload = (localProps: UploadAllProps) => {
  const context = React.useContext(Context)

  const extendedProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(localProps).Upload,
    context.Upload
  )

  const {
    id,
    skeleton,
    className,
    acceptedFileTypes,
    filesAmountLimit,
    fileMaxSize,
    onChange,
    onFileDelete, // eslint-disable-line
    title, // eslint-disable-line
    text, // eslint-disable-line
    fileTypeDescription, // eslint-disable-line
    fileSizeDescription, // eslint-disable-line
    fileAmountDescription, // eslint-disable-line
    fileSizeContent, // eslint-disable-line
    buttonText, // eslint-disable-line
    loadingText, // eslint-disable-line
    errorLargeFile,
    errorUnsupportedFile,
    errorAmountLimit, // eslint-disable-line
    deleteButton, // eslint-disable-line
    fileListAriaLabel, // eslint-disable-line
    ...props
  } = extendedProps

  const spacingClasses = createSpacingClasses(props)

  const { files, setFiles, setInternalFiles, getExistsingFile } =
    useUpload(id)

  const filesRef = React.useRef<UploadFile[]>(files)
  React.useEffect(() => {
    filesRef.current = files
  }) // keep our ref updated on every re-render

  return (
    <UploadContext.Provider
      value={{
        ...extendedProps,
        id,
        onInputUpload,
      }}
    >
      <Provider skeleton={skeleton}>
        <UploadDropzone
          className={classnames('dnb-upload', spacingClasses, className)}
          {...props}
        >
          <UploadInfo />

          <UploadFileInput />

          <UploadFileList />
        </UploadDropzone>
      </Provider>
    </UploadContext.Provider>
  )

  function onInputUpload(newFiles: UploadFile[]) {
    const files = filesRef.current
    const mergedFiles = [
      ...files,
      ...newFiles.map((fileItem) => {
        const { file } = fileItem

        const existingFile = getExistsingFile(file, files)

        fileItem.exists = Boolean(existingFile)
        fileItem.id = fileItem.exists ? existingFile.id : makeUniqueId()

        return fileItem
      }),
    ]

    const verifiedFiles = verifyFiles(
      mergedFiles.filter(({ exists }) => !exists),
      {
        fileMaxSize,
        acceptedFileTypes,
        errorUnsupportedFile,
        errorLargeFile,
      }
    )

    const validFiles = [...verifiedFiles].slice(0, filesAmountLimit)

    setFiles(validFiles)
    setInternalFiles(mergedFiles)

    if (typeof onChange === 'function') {
      onChange({ files: validFiles })
    }

    return validFiles
  }
}

Upload.useUpload = useUpload

export default Upload
