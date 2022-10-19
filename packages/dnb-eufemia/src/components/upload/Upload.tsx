import React from 'react'
import classnames from 'classnames'

// Components
import Lead from '../../elements/Lead'
import P from '../../elements/P'
import Dl from '../../elements/Dl'
import Dt from '../../elements/Dt'
import Dd from '../../elements/Dd'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import Provider from '../../shared/Provider'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import { format } from '../number-format/NumberUtils'

// Internal
import UploadFileInput from './UploadFileInput'
import UploadFileListCell from './UploadFileListCell'
import useUpload from './useUpload'
import UploadDropzone from './UploadDropzone'
import { UploadContext } from './UploadContext'
import { verifyFiles } from './UploadVerify'

import type { UploadFile, UploadAllProps } from './types'

export const defaultProps = {
  fileMaxSize: 5000,
}

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
    singleFile,
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
    <UploadContext.Provider
      value={{
        id,
        acceptedFileTypes,
        onInputUpload,
        fileMaxSize,
        buttonText,
        errorLargeFile,
        errorUnsupportedFile,
        singleFile,
      }}
    >
      <Provider skeleton={skeleton}>
        <UploadDropzone
          data-testid="upload"
          className={classnames('dnb-upload', spacingClasses, className)}
          {...props}
        >
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
              <Dt
                data-testid="upload-accepted-formats-description"
                className="dnb-upload__condition-list__label"
              >
                {fileTypeDescription}
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

          <UploadFileInput />

          <UploadFileList />
        </UploadDropzone>
      </Provider>
    </UploadContext.Provider>
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

  function onInputUpload(newFiles: UploadFile[]) {
    const verifiedFiles = verifyFiles([...files, ...newFiles], {
      fileMaxSize,
      acceptedFileTypes,
      errorUnsupportedFile,
      errorLargeFile,
    })
    setFiles(verifiedFiles)
  }
}

Upload.useUpload = useUpload

export default Upload
