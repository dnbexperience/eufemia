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
import useUpload from './useUpload'
import UploadDropzone from './UploadDropzone'
import { UploadContext } from './UploadContext'
import { verifyFiles } from './UploadVerify'

import type { UploadFile, UploadAllProps } from './types'
import UploadFileList from './UploadFileList'

export const defaultProps = {
  fileMaxSize: 5000,
  filesAmountLimit: 100,
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
    filesAmountLimit,
    fileMaxSize,
    title,
    text,
    fileTypeDescription,
    fileSizeDescription,
    fileSizeContent,
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

  const { files, setFiles, setInternalFiles } = useUpload(id)

  const prettyfiedAcceptedFileFormats = acceptedFileTypes
    .join(', ')
    .toUpperCase()

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

  function onInputUpload(newFiles: UploadFile[]) {
    const uniqueFiles = [
      ...files,
      ...newFiles.filter(({ file }) => {
        const foundExisting = files.some(({ file: f }) => {
          return (
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
          )
        })
        return !foundExisting
      }),
    ]

    const verifiedFiles = verifyFiles(uniqueFiles, {
      fileMaxSize,
      acceptedFileTypes,
      errorUnsupportedFile,
      errorLargeFile,
    })

    const validFiles = [...verifiedFiles].slice(0, filesAmountLimit)
    setFiles(validFiles)
    setInternalFiles(verifiedFiles)

    return validFiles
  }
}

Upload.useUpload = useUpload

export default Upload
