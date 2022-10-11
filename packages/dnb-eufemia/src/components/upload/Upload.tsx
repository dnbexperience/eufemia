import React from 'react'
import classnames from 'classnames'

// Components
import Lead from '../../elements/Lead'
import P from '../../../src/elements/P'
import Dl from '../../../src/elements/Dl'
import Dt from '../../../src/elements/Dt'
import Dd from '../../../src/elements/Dd'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import { format } from '../number-format/NumberUtils'
import { LocaleProps, SpacingProps } from 'src/shared/types'

// Internal
import UploadFileInput from './UploadFileInput'
import type { UploadFile, UploadProps } from './types'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'

export const defaultProps = {
  fileMaxSize: 5000,
}

const Upload = (localProps: UploadProps & SpacingProps & LocaleProps) => {
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
    multipleFiles,
    fileMaxSize,
    title,
    text,
    formatsDescription,
    fileSizeDescription,
    fileSizeContent,
    uploadButtonText,
    uploadLoadingText,
    uploadErrorLargeFile,
    deleteButton,
    fileListAriaLabel,
    ...props
  } = extendedProps

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const { files, setFiles } = useUpload(id)

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
      <Lead data-testid="upload-title" space="0">
        {title}
      </Lead>

      <P
        data-testid="upload-text"
        top="xx-small"
        bottom="medium"
        className="dnb-upload__text"
      >
        {text}
      </P>

      <Dl direction="horizontal" className="dnb-upload__condition-list">
        <Dl.Item>
          <Dt
            data-testid="upload-accepted-formats-description"
            className="dnb-upload__condition-list__label"
          >
            {formatsDescription}
          </Dt>
          <Dd data-testid="upload-accepted-formats">
            {prettyfiedAcceptedFileFormats}
          </Dd>
        </Dl.Item>

        <Dl.Item>
          <Dt
            data-testid="upload-file-size-description"
            className="dnb-upload__condition-list__label"
          >
            {fileSizeDescription}
          </Dt>
          <Dd data-testid="upload-file-size">
            {String(fileSizeContent).replace(
              '%size',
              format(fileMaxSize).toString()
            )}
          </Dd>
        </Dl.Item>
      </Dl>

      <UploadFileInput
        id={id}
        acceptedFormats={acceptedFileTypes}
        onUpload={onInputUpload}
        fileMaxSize={fileMaxSize}
        uploadFileButtonText={uploadButtonText}
        uploadErrorLargeFile={uploadErrorLargeFile}
        multipleFiles={multipleFiles}
      />

      <UploadFileList />

      <svg
        className="dnb-upload__outline"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          width="100%"
          height="100%"
          rx="0.25rem"
          ry="0.25rem"
          strokeWidth="2.5"
          strokeDasharray="7 7"
        />
      </svg>
    </div>
  )

  function UploadFileList() {
    if (files == null || files.length < 1) return null

    return (
      <ul
        data-testid="upload-file-list"
        className="dnb-upload__file-list"
        aria-label={fileListAriaLabel}
      >
        {files.map((uploadFile: UploadFile, index: number) => {
          return (
            <UploadFileListCell
              uploadFile={uploadFile}
              key={index}
              onDelete={() => onDeleteFile(uploadFile)}
              deleteButtonText={deleteButton}
              uploadLoadingText={uploadLoadingText}
            />
          )
        })}
      </ul>
    )
  }

  function onDeleteFile(removeFile: UploadFile) {
    const cleanedFiles = files.filter(
      (fileListElement) => fileListElement.file != removeFile.file
    )
    setFiles(cleanedFiles)
  }

  function onInputUpload(addedFiles: UploadFile[]) {
    const newFiles = [...files, ...addedFiles]

    setFiles(newFiles)
  }
}

Upload.useUpload = useUpload

export default Upload
