import React from 'react'
import { defaultProps, UploadContext } from './UploadContext'
import Lead from '../../elements/Lead'
import P from '../../elements/P'
import Dl from '../../elements/Dl'
import Dt from '../../elements/Dt'
import Dd from '../../elements/Dd'
import { format } from '../number-format/NumberUtils'
import { isArrayOfObjects, isArrayOfStrings } from './UploadVerify'
import Table from '../Table'
import Tr from '../table/TableTr'
import Th from '../table/TableTh'
import Td from '../table/TableTd'
import { UploadAcceptedFileTypeObject, UploadProps } from './types'

const prettifyAcceptedFileFormats = (acceptedFileTypes) =>
  acceptedFileTypes.sort().join(', ').toUpperCase()

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

  const prettifiedAcceptedFileFormats =
    prettifyAcceptedFileFormats(acceptedFileTypes)

  const isAcceptedFileTypeListOfStrings =
    isArrayOfStrings(acceptedFileTypes)

  const displayAcceptedFileFormatsListItem =
    isAcceptedFileTypeListOfStrings && prettifiedAcceptedFileFormats

  const displayFileMaxSizeItem =
    isAcceptedFileTypeListOfStrings && fileMaxSize !== 0 && fileMaxSize

  const displayFilesAmountLimitItem =
    filesAmountLimit < defaultProps.filesAmountLimit

  const displayAcceptedFileFormatsTable =
    isArrayOfObjects(acceptedFileTypes)

  const displayDl =
    displayAcceptedFileFormatsListItem ||
    displayFileMaxSizeItem ||
    displayFilesAmountLimitItem

  return (
    <>
      <Lead space="0">{title}</Lead>

      <P top="xx-small" className="dnb-upload__text">
        {text}
      </P>

      {children}

      {displayDl && (
        <Dl top="small" bottom={0} layout="horizontal">
          {displayAcceptedFileFormatsListItem && (
            <Dl.Item>
              <Dt>{fileTypeDescription}</Dt>
              <Dd>{prettifiedAcceptedFileFormats}</Dd>
            </Dl.Item>
          )}

          {displayFileMaxSizeItem && (
            <Dl.Item>
              <Dt>{fileSizeDescription}</Dt>
              <Dd>
                {String(fileSizeContent).replace(
                  '%size',
                  format(fileMaxSize).toString()
                )}
              </Dd>
            </Dl.Item>
          )}

          {displayFilesAmountLimitItem && (
            <Dl.Item>
              <Dt>{fileAmountDescription}</Dt>
              <Dd>{filesAmountLimit}</Dd>
            </Dl.Item>
          )}
        </Dl>
      )}
      {displayAcceptedFileFormatsTable && (
        <UploadInfoAcceptedFileTypesTable />
      )}
    </>
  )
}

function UploadInfoAcceptedFileTypesTable() {
  const context = React.useContext(UploadContext)

  const {
    acceptedFileTypes,
    fileTypeTableCaption,
    fileTypeDescription,
    fileSizeDescription,
    fileSizeContent,
    fileMaxSize,
  } = context

  const groupByFileMaxSize = (
    acceptedFileTypes: UploadProps['acceptedFileTypes'],
    fallBackFileMaxSize: UploadProps['fileMaxSize']
  ) => {
    const cache = {}
    acceptedFileTypes.forEach((item) => {
      const fileMaxSize = item.fileMaxSize
      const group =
        fileMaxSize === false || fileMaxSize === 0
          ? 0
          : fileMaxSize
          ? fileMaxSize
          : fallBackFileMaxSize === false || fallBackFileMaxSize === 0
          ? 0
          : fallBackFileMaxSize
      cache[group] = cache[group] || []
      cache[group].push(item)
    })

    return cache
  }

  const acceptedFileTypesGroupedByFileMaxSize = groupByFileMaxSize(
    acceptedFileTypes,
    fileMaxSize
  )

  return (
    <Table
      border
      className="dnb-upload__accepted-file-types-table"
      size="small"
    >
      <caption className="dnb-sr-only">{fileTypeTableCaption}</caption>
      <thead>
        <Tr variant="odd" cellSpacing={0}>
          <Th>{fileTypeDescription}</Th>
          <Th>{fileSizeDescription}</Th>
        </Tr>
      </thead>
      <tbody>
        {Object.keys(acceptedFileTypesGroupedByFileMaxSize)
          .sort((a, b) => Number(b) - Number(a))
          .map((key) => {
            return (
              <Tr variant="odd" key={key}>
                <Td>
                  {prettifyAcceptedFileFormats(
                    acceptedFileTypesGroupedByFileMaxSize[key].map(
                      (
                        acceptedFileTypesObj: UploadAcceptedFileTypeObject
                      ) => acceptedFileTypesObj.fileType
                    )
                  )}
                </Td>
                <Td>
                  {key !== '0' &&
                    String(fileSizeContent).replace(
                      '%size',
                      format(key).toString()
                    )}
                </Td>
              </Tr>
            )
          })}
      </tbody>
    </Table>
  )
}

export default UploadInfo
