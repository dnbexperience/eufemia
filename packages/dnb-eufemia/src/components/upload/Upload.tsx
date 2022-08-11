import React, { useState } from 'react'
import classnames from 'classnames'

// Components
import ProgressIndicator from './../progress-indicator'
import Lead from '../../elements/Lead'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import Context from '../../shared/Context'
import { usePropsWithContext } from '../../shared/hooks'
import { format } from '../number-format/NumberUtils'

// Internal
import UploadFileInput from './UploadFileInput'
import UploadFileList from './UploadFileList'
import useFileValivation from './useFileValidation'
import { UploadFileListElement, UploadProps } from './types'

export const defaultProps = {
  fileMaxSize: 5000,
}

const Upload = (localProps: UploadProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    onChange,
    skeleton,
    className,
    acceptedFileTypes,
    multipleFiles,
    fileMaxSize,
    title,
    text,
    isLoading,
    formatsDescription,
    fileSizeDescription,
    fileSizeContent,
    uploadButtonText,
    uploadingLoadingText,
    errorWrongFileFormat,
    errorToLargeFile,
    deleteButton,
    ...props
  } = usePropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation().Upload,
    context.Upload
  )

  const { validate } = useFileValivation({
    fileMaxSize,
    acceptedFileTypes,
  })

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const [files, setFiles] = useState<UploadFileListElement[]>([])

  const prettyfiedAcceptedFileFormats = acceptedFileTypes
    .join(', ')
    .toUpperCase()

  return (
    <div
      data-testid="upload"
      className={classnames(
        'dnb-upload',
        skeletonClasses,
        spacingClasses,
        className
      )}
      {...props}
    >
      <span className="dnb-upload__content-container">
        <Lead data-testid="upload-title" size="basis" top="0" bottom="0">
          {title}
        </Lead>

        <span data-testid="upload-text" className="dnb-upload__text">
          {text}
        </span>

        <dl className="dnb-upload__condition-list">
          <dt
            data-testid="upload-accepted-formats-description"
            className={classnames(
              'dnb-dt',
              'dnb-upload__condition-list__label'
            )}
          >
            {formatsDescription}
          </dt>
          <dd data-testid="upload-accepted-formats" className="dnb-dd">
            {prettyfiedAcceptedFileFormats}
          </dd>
        </dl>

        <dl className="dnb-upload__condition-list">
          <dt
            data-testid="upload-file-size-description"
            className={classnames(
              'dnb-dt',
              'dnb-upload__condition-list__label'
            )}
          >
            {fileSizeDescription}
          </dt>
          <dd data-testid="upload-file-size" className="dnb-dd">
            {String(fileSizeContent).replace(
              '%size',
              format(fileMaxSize).toString()
            )}
          </dd>
        </dl>

        {files != null && (
          <UploadFileList
            files={files}
            onDeleteFile={onDeleteFile}
            errorMessageFileFormat={String(errorWrongFileFormat).replace(
              '%types',
              prettyfiedAcceptedFileFormats
            )}
            errorMessageLargeFile={String(errorToLargeFile).replace(
              '%fileSize',
              String(fileMaxSize)
            )}
            deleteButtonText={deleteButton}
          />
        )}

        <div className="dnb-upload__button-container">
          {getButtonSection()}
        </div>
      </span>
    </div>
  )

  function onDeleteFile(removeFile: File) {
    const cleanedFiles = files.filter(
      (fileListElement) => fileListElement.file != removeFile
    )
    setFiles(cleanedFiles)
    onChange(cleanedFiles)
  }

  function onInputUpload(file: File) {
    const addedFile = [...files, { file, error: validate(file) }]
    setFiles(addedFile)
    onChange(addedFile)
  }

  function getButtonSection() {
    return isLoading ? (
      <span
        data-testid="upload-is-loading"
        className="dnb-upload__loading-section"
      >
        <ProgressIndicator data-testid="upload-is-loading-progress-indicator" />
        <span
          data-testid="upload-is-loading-text"
          className="dnb-upload__loading-section__text"
        >
          {uploadingLoadingText}
        </span>
      </span>
    ) : (
      <UploadFileInput
        onUpload={onInputUpload}
        uploadFileButtonText={uploadButtonText}
        multipleFiles={multipleFiles}
      />
    )
  }
}

export default Upload
