import React from 'react'
import { defaultProps, UploadContext } from './UploadContext'
import Lead from '../../elements/Lead'
import P from '../../elements/P'
import Dl from '../../elements/Dl'
import Dt from '../../elements/Dt'
import Dd from '../../elements/Dd'
import { format } from '../number-format/NumberUtils'

const UploadInfo = () => {
  const context = React.useContext(UploadContext)

  const {
    title,
    text,
    acceptedFileTypes,
    fileTypeDescription,
    fileSizeDescription,
    fileAmountDescription,
    fileSizeContent,
    filesAmountLimit,
    fileMaxSize,
  } = context

  const prettyfiedAcceptedFileFormats = acceptedFileTypes
    .join(', ')
    .toUpperCase()

  return (
    <>
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
          <Dt data-testid="upload-accepted-formats">
            {fileTypeDescription}
          </Dt>
          <Dd>{prettyfiedAcceptedFileFormats}</Dd>
        </Dl.Item>

        <Dl.Item>
          <Dt data-testid="upload-file-size">{fileSizeDescription}</Dt>
          <Dd>
            {String(fileSizeContent).replace(
              '%size',
              format(fileMaxSize).toString()
            )}
          </Dd>
        </Dl.Item>

        {filesAmountLimit < defaultProps.filesAmountLimit && (
          <Dl.Item>
            <Dt data-testid="upload-file-amount-limit">
              {fileAmountDescription}
            </Dt>
            <Dd>{filesAmountLimit}</Dd>
          </Dl.Item>
        )}
      </Dl>
    </>
  )
}

export default UploadInfo
