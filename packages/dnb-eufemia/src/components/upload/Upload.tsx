import React, { useCallback } from 'react'
import classnames from 'classnames'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import Provider from '../../shared/Provider'
import Context from '../../shared/Context'
import {
  extendPropsWithContext,
  makeUniqueId,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import HeightAnimation from '../height-animation/HeightAnimation'

// Internal
import UploadFileInput from './UploadFileInput'
import useUpload from './useUpload'
import UploadDropzone from './UploadDropzone'
import { UploadContext, defaultProps } from './UploadContext'
import { verifyFiles } from './UploadVerify'

import type { UploadFile, UploadAllProps } from './types'
import UploadFileList from './UploadFileList'
import UploadInfo from './UploadInfo'

export type * from './types'
export { defaultProps }

const Upload = (localProps: UploadAllProps) => {
  const context = React.useContext(Context)

  const { buttonTextSingular, textSingular, ...translations } =
    context.getTranslation(localProps).Upload

  if (localProps?.filesAmountLimit === 1) {
    translations.buttonText = buttonTextSingular
    translations.text = textSingular
  }

  const extendedProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    translations,
    context.Upload
  )

  const {
    id: idProp,
    skeleton,
    className,
    acceptedFileTypes,
    filesAmountLimit,
    fileMaxSize,
    onChange,
    onFileDelete, // eslint-disable-line
    onFileClick, // eslint-disable-line
    download, // eslint-disable-line
    allowDuplicates,
    title, // eslint-disable-line
    text, // eslint-disable-line
    fileTypeTableCaption, // eslint-disable-line
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
    disableDragAndDrop,
    ...props
  } = extendedProps

  const spacingClasses = createSpacingClasses(props)

  const id = useId(idProp)

  const { files, setFiles, setInternalFiles, getExistingFile } =
    useUpload(id)

  const onInputUpload = useCallback(
    (newFiles: Array<UploadFile>) => {
      const mergedFiles = [
        ...files,
        ...newFiles.map((fileItem) => {
          const { file } = fileItem

          const existingFile = getExistingFile(file, files)

          fileItem.exists = Boolean(existingFile)
          fileItem.id =
            fileItem.exists && !allowDuplicates
              ? existingFile.id
              : makeUniqueId()

          return fileItem
        }),
      ]

      const filesToVerify = allowDuplicates
        ? mergedFiles
        : mergedFiles.filter(({ exists }) => !exists)

      const verifiedFiles = verifyFiles(filesToVerify, {
        fileMaxSize,
        acceptedFileTypes,
        errorUnsupportedFile,
        errorLargeFile,
      })

      const validFiles = [...verifiedFiles].slice(
        0,
        filesAmountLimit
      ) as Array<UploadFile>

      setFiles(validFiles)
      setInternalFiles(mergedFiles)

      if (typeof onChange === 'function') {
        onChange({ files: validFiles })
      }

      return validFiles
    },
    [
      acceptedFileTypes,
      errorLargeFile,
      errorUnsupportedFile,
      fileMaxSize,
      files,
      filesAmountLimit,
      getExistingFile,
      onChange,
      setFiles,
      setInternalFiles,
    ]
  )

  const UploadWrapper =
    disableDragAndDrop || props.disabled ? HeightAnimation : UploadDropzone

  return (
    <UploadContext.Provider
      value={{
        ...extendedProps,
        id,
        onInputUpload,
      }}
    >
      <Provider skeleton={skeleton}>
        <UploadWrapper
          className={classnames('dnb-upload', spacingClasses, className)}
        >
          <UploadInfo />

          <UploadFileInput disabled={props.disabled} {...props} />

          <UploadFileList />
        </UploadWrapper>
      </Provider>
    </UploadContext.Provider>
  )
}

Upload.useUpload = useUpload

Upload._formElement = true
Upload._supportsSpacingProps = true

export default Upload
