import React from 'react'
import classnames from 'classnames'

// Components
import Lead from '../../elements/Lead'
import P from '../../elements/P'
import Dl from '../../elements/Dl'
import Dt from '../../elements/Dt'
import Dd from '../../elements/Dd'
import HeightAnimation from '../height-animation/HeightAnimation'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import Provider from '../../shared/Provider'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import { format } from '../number-format/NumberUtils'
import { LocaleProps, SpacingProps } from '../../shared/types'

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
    fileTypeDescription,
    fileSizeDescription,
    fileSizeContent,
    buttonText,
    loadingText,
    errorLargeFile,
    errorUnsupportedFile,
    deleteButton,
    fileListAriaLabel,
    ...props
  } = extendedProps

  const spacingClasses = createSpacingClasses(props)

  const { files, setFiles } = useUpload(id)

  const prettyfiedAcceptedFileFormats = acceptedFileTypes
    .join(', ')
    .toUpperCase()

  return (
    <HeightAnimation
      open
      data-testid="upload"
      className={classnames('dnb-upload', spacingClasses, className)}
      {...props}
    >
      <Provider skeleton={skeleton}>
        <Lead data-testid="upload-title" space="0">
          {title}
        </Lead>

        <P
          data-testid="upload-text"
          top="xx-small"
          className="dnb-upload__text"
        >
          {text}
        </P>

        <Dl
          top="small"
          bottom={0}
          direction="horizontal"
          className="dnb-upload__condition-list"
        >
          <Dl.Item>
            <Dt data-testid="upload-accepted-formats-description">
              {fileTypeDescription}
            </Dt>
            <Dd data-testid="upload-accepted-formats">
              {prettyfiedAcceptedFileFormats}
            </Dd>
          </Dl.Item>

          <Dl.Item>
            <Dt data-testid="upload-file-size-description">
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
          buttonText={buttonText}
          errorLargeFile={errorLargeFile}
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
      </Provider>
    </HeightAnimation>
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
          const onDeleteFile = () => {
            const cleanedFiles = files.filter(
              (fileListElement) => fileListElement.file != uploadFile.file
            )
            setFiles(cleanedFiles)
          }
          return (
            <UploadFileListCell
              uploadFile={uploadFile}
              key={index}
              onDelete={onDeleteFile}
              deleteButtonText={deleteButton}
              loadingText={loadingText}
            />
          )
        })}
      </ul>
    )
  }

  function onInputUpload(addedFiles: UploadFile[]) {
    const newFiles = [...files, ...addedFiles]

    setFiles(newFiles)
  }
}

Upload.useUpload = useUpload

export default Upload
