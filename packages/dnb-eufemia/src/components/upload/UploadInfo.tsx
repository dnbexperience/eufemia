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
    children,
  } = context

  const prettifiedAcceptedFileFormats = acceptedFileTypes
    .join(', ')
    .toUpperCase()

  return (
    <>
      <Lead space="0">{title}</Lead>

      <P top="xx-small" className="dnb-upload__text">
        {text}
      </P>

      {children}

      <Dl
        top="small"
        bottom={0}
        layout="horizontal"
        className="dnb-upload__condition-list"
      >
        {prettifiedAcceptedFileFormats && (
          <Dl.Item>
            <Dt>{fileTypeDescription}</Dt>
            <Dd>{prettifiedAcceptedFileFormats}</Dd>
          </Dl.Item>
        )}

        <Dl.Item>
          <Dt>{fileSizeDescription}</Dt>
          <Dd>
            {String(fileSizeContent).replace(
              '%size',
              format(fileMaxSize).toString()
            )}
          </Dd>
        </Dl.Item>

        {filesAmountLimit < defaultProps.filesAmountLimit && (
          <Dl.Item>
            <Dt>{fileAmountDescription}</Dt>
            <Dd>{filesAmountLimit}</Dd>
          </Dl.Item>
        )}
      </Dl>
    </>
  )
}

export default UploadInfo
