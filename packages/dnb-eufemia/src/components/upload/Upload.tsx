import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useCallback } from 'react'
import clsx from 'clsx'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import Provider from '../../shared/Provider'
import Context from '../../shared/Context'
import {
  extendPropsWithContext,
  makeUniqueId,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
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
import FormLabel from '../FormLabel'

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
    pickFormElementProps(context?.formElement),
    translations,
    context.Upload
  )

  const {
    id: idProp,
    variant,
    skeleton,
    className,
    acceptedFileTypes,
    filesAmountLimit,
    fileMaxSize,
    onChange,
    onFileDelete,
    onFileClick,
    download,
    allowDuplicates,
    title,
    text,
    fileTypeTableCaption,
    fileTypeDescription,
    fileSizeDescription,
    fileAmountDescription,
    fileSizeContent,
    buttonText,
    loadingText,
    errorLargeFile,
    errorUnsupportedFile,
    errorAmountLimit,
    deleteButton,
    fileListAriaLabel,
    buttonProps,
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

  const wrapperIsHeightAnimation = disableDragAndDrop || props.disabled

  const UploadWrapper = wrapperIsHeightAnimation
    ? HeightAnimation
    : UploadDropzone

  return (
    <UploadContext
      value={{
        ...extendedProps,
        id,
        onInputUpload,
      }}
    >
      <Provider skeleton={skeleton}>
        <UploadWrapper
          className={clsx(
            'dnb-upload',
            'dnb-form-component',
            variant && `dnb-upload--${variant}`,
            spacingClasses,
            className
          )}
          {...(!wrapperIsHeightAnimation
            ? { hideOutline: variant === 'compact' }
            : {})}
        >
          {variant !== 'compact' && <UploadInfo />}
          {variant === 'compact' && (title || text) && (
            <>
              <CompactLabel id={id} title={title} text={text} />
              {props?.children}
            </>
          )}

          <UploadFileInput
            disabled={props.disabled}
            files={files}
            {...props}
          />

          <UploadFileList />
        </UploadWrapper>
      </Provider>
    </UploadContext>
  )
}

function CompactLabel(props: {
  id: string
  title?: UploadAllProps['title']
  text?: UploadAllProps['text']
}) {
  const { id, title, text } = props
  return (
    <FormLabel
      forId={`${id}-input`}
      vertical
      className="dnb-upload__label"
    >
      <span>
        {title && <span>{title}</span>}
        {title && text && <br />}
        {text && <span className="dnb-upload__text">{text}</span>}
      </span>
    </FormLabel>
  )
}

Upload.useUpload = useUpload

withComponentMarkers(Upload, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Upload
