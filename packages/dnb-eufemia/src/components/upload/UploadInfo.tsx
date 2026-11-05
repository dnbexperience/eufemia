import { useContext } from 'react'
import type { ReactNode } from 'react'
import { uploadDefaultProps, UploadContext } from './UploadContext'
import Lead from '../../elements/Lead'
import P from '../../elements/P'
import Dl from '../../elements/Dl'
import Dt from '../../elements/Dt'
import Dd from '../../elements/Dd'
import { formatNumber } from '../number-format/NumberUtils'
import { isArrayOfObjects, isArrayOfStrings } from './UploadVerify'
import Table from '../Table'
import Tr from '../table/TableTr'
import Th from '../table/TableTh'
import Td from '../table/TableTd'
import AccordionTertiary from '../accordion/AccordionTertiary'
import type { UploadAcceptedFileTypeObject, UploadProps } from './types'
import Flex from '../../components/Flex'

const prettifyAcceptedFileFormats = (acceptedFileTypes) =>
  acceptedFileTypes.join(', ').toUpperCase()

const formatFileSize = (
  fileSizeContent: ReactNode,
  size: number | string,
  locale: string
) =>
  String(fileSizeContent).replace(
    '%size',
    formatNumber(size, { locale }).toString()
  )

// The file limits show the descriptions as table headers, without the colon
const removeTrailingColon = (text: ReactNode) =>
  typeof text === 'string' ? text.replace(/\s*:$/, '') : text

function useFileLimits() {
  const {
    acceptedFileTypes,
    filesAmountLimit,
    fileMaxSize,
    fileSizeContent,
    locale,
  } = useContext(UploadContext)

  const prettifiedAcceptedFileFormats =
    prettifyAcceptedFileFormats(acceptedFileTypes)

  const isAcceptedFileTypeListOfStrings =
    isArrayOfStrings(acceptedFileTypes)

  const displayAcceptedFileFormatsListItem =
    isAcceptedFileTypeListOfStrings && prettifiedAcceptedFileFormats

  const displayFileMaxSizeItem =
    isAcceptedFileTypeListOfStrings && fileMaxSize

  const fileMaxSizeText = displayFileMaxSizeItem
    ? formatFileSize(fileSizeContent, fileMaxSize, locale)
    : null

  const displayFilesAmountLimitItem =
    filesAmountLimit < uploadDefaultProps.filesAmountLimit

  const displayAcceptedFileFormatsTable =
    !displayAcceptedFileFormatsListItem &&
    isArrayOfObjects(acceptedFileTypes)

  const displayList =
    displayAcceptedFileFormatsListItem ||
    displayFileMaxSizeItem ||
    displayFilesAmountLimitItem

  return {
    prettifiedAcceptedFileFormats,
    displayAcceptedFileFormatsListItem,
    fileMaxSizeText,
    displayFilesAmountLimitItem,
    displayAcceptedFileFormatsTable,
    displayList,
  }
}

const UploadInfo = () => {
  const context = useContext(UploadContext)

  const {
    title,
    text,
    fileTypeDescription,
    fileSizeDescription,
    fileAmountDescription,
    filesAmountLimit,
    children,
  } = context

  const {
    prettifiedAcceptedFileFormats,
    displayAcceptedFileFormatsListItem,
    fileMaxSizeText,
    displayFilesAmountLimitItem,
    displayAcceptedFileFormatsTable,
    displayList,
  } = useFileLimits()

  return (
    <Flex.Stack layoutEngine="css" gap="small">
      {(title || text) && (
        <Flex.Stack layoutEngine="css" gap="xx-small">
          {title && <Lead space="0">{title}</Lead>}

          {text && <P className="dnb-upload__text">{text}</P>}
        </Flex.Stack>
      )}
      {children}

      {displayList && (
        <Dl bottom={0} layout="horizontal">
          {displayAcceptedFileFormatsListItem && (
            <Dl.Item>
              <Dt>{fileTypeDescription}</Dt>
              <Dd>{prettifiedAcceptedFileFormats}</Dd>
            </Dl.Item>
          )}

          {fileMaxSizeText && (
            <Dl.Item>
              <Dt>{fileSizeDescription}</Dt>
              <Dd>{fileMaxSizeText}</Dd>
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
    </Flex.Stack>
  )
}

export function UploadFileLimits() {
  const context = useContext(UploadContext)

  const {
    fileLimitsButtonText,
    fileTypeDescription,
    fileSizeDescription,
    fileAmountDescription,
    filesAmountLimit,
  } = context

  const {
    prettifiedAcceptedFileFormats,
    displayAcceptedFileFormatsListItem,
    fileMaxSizeText,
    displayFilesAmountLimitItem,
    displayAcceptedFileFormatsTable,
    displayList,
  } = useFileLimits()

  if (
    !fileLimitsButtonText ||
    !(displayList || displayAcceptedFileFormatsTable)
  ) {
    return null
  }

  return (
    <AccordionTertiary
      title={fileLimitsButtonText}
      iconPosition="right"
      className="dnb-upload__file-limits"
    >
      <div className="dnb-upload__file-limits__content">
        {displayList && (
          <Table border={false} className="dnb-upload__file-limits__table">
            <tbody>
              {displayAcceptedFileFormatsListItem && (
                <Tr variant="odd">
                  <Th scope="row">
                    {removeTrailingColon(fileTypeDescription)}
                  </Th>
                  <Td>{prettifiedAcceptedFileFormats}</Td>
                </Tr>
              )}

              {fileMaxSizeText && (
                <Tr variant="odd">
                  <Th scope="row">
                    {removeTrailingColon(fileSizeDescription)}
                  </Th>
                  <Td>{fileMaxSizeText}</Td>
                </Tr>
              )}

              {displayFilesAmountLimitItem && (
                <Tr variant="odd">
                  <Th scope="row">
                    {removeTrailingColon(fileAmountDescription)}
                  </Th>
                  <Td>{filesAmountLimit}</Td>
                </Tr>
              )}
            </tbody>
          </Table>
        )}

        {displayAcceptedFileFormatsTable && (
          <UploadInfoAcceptedFileTypesTable expandable />
        )}
      </div>
    </AccordionTertiary>
  )
}

function UploadInfoAcceptedFileTypesTable({
  expandable,
}: {
  expandable?: boolean
}) {
  const context = useContext(UploadContext)

  const {
    acceptedFileTypes,
    fileTypeTableCaption,
    fileTypeDescription,
    fileSizeDescription,
    fileSizeContent,
    fileMaxSize,
    locale,
  } = context

  const groupByFileMaxSize = (
    acceptedFileTypes: UploadProps['acceptedFileTypes'],
    fallBackFileMaxSize: UploadProps['fileMaxSize']
  ) => {
    const fileMaxSizeIsFalseOrZero = (
      fileMaxSize: UploadProps['fileMaxSize']
    ) => {
      return fileMaxSize === false || fileMaxSize === 0
    }

    const group = {}
    acceptedFileTypes.forEach((item) => {
      const itemFileMaxSize = item.fileMaxSize
      const groupName = itemFileMaxSize
        ? itemFileMaxSize
        : fileMaxSizeIsFalseOrZero(itemFileMaxSize)
          ? 0
          : fileMaxSizeIsFalseOrZero(fallBackFileMaxSize)
            ? 0
            : fallBackFileMaxSize

      group[groupName] = group[groupName] || []
      group[groupName].push(item)
    })

    return group
  }

  const acceptedFileTypesGroupedByFileMaxSize = groupByFileMaxSize(
    acceptedFileTypes,
    fileMaxSize
  )

  const formatHeader = expandable
    ? removeTrailingColon
    : (text: ReactNode) => text

  return (
    <Table
      border={!expandable}
      className={
        expandable
          ? 'dnb-upload__file-limits__table'
          : 'dnb-upload__accepted-file-types-table'
      }
      size={expandable ? undefined : 'small'}
    >
      <caption className="dnb-sr-only">{fileTypeTableCaption}</caption>
      <thead>
        <Tr variant="odd">
          <Th>{formatHeader(fileTypeDescription)}</Th>
          <Th>{formatHeader(fileSizeDescription)}</Th>
        </Tr>
      </thead>
      <tbody>
        {Object.keys(acceptedFileTypesGroupedByFileMaxSize)
          // Smallest max size first, and the file types without a max size (0) last
          .sort(
            (a, b) => (Number(a) || Infinity) - (Number(b) || Infinity)
          )
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
                    formatFileSize(fileSizeContent, key, locale)}
                </Td>
              </Tr>
            )
          })}
      </tbody>
    </Table>
  )
}

export default UploadInfo
