import React, { useMemo } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import Icon from '../../../../components/Icon'
import ListFormat, {
  ListFormatProps,
} from '../../../../components/list-format'
import type { UploadFile } from '../../../../components/upload/types'
import { fileExtensionImages } from '../../../../components/upload/UploadFileListCell'
import {
  BYTES_IN_A_MEGA_BYTE,
  getFileTypeFromExtension,
} from '../../../../components/upload/UploadVerify'
import { Props as FieldUploadProps } from '../../Field/Upload/Upload'
import { format } from '../../../../components/number-format/NumberUtils'
import { UploadFileLink } from '../../../../components/upload/UploadFileListLink'

export type Props = ValueProps<Array<UploadFile>> &
  Omit<ListFormatProps, 'value'> &
  Pick<FieldUploadProps, 'download' | 'onFileClick'> & {
    displaySize?: boolean
  }

function Upload(props: Props) {
  const {
    path,
    value,
    format,
    className,
    variant = 'text',
    listType,
    download = false,
    displaySize = false,
    onFileClick,
    ...rest
  } = useValueProps(props)

  const list = useMemo(() => {
    const valueToUse =
      value?.map((uploadFile, index) => {
        const { file } = uploadFile || {}
        if (!file) {
          return
        }
        const onFileClickHandler = () => {
          if (typeof onFileClick === 'function') {
            onFileClick({ fileItem: uploadFile })
          }
        }

        const imageUrl = URL.createObjectURL(file)

        const text =
          file.name + (displaySize ? ' ' + getSize(file.size) : '')

        return (
          <span key={index}>
            {getIcon(file)}

            <UploadFileLink
              left="x-small"
              text={text}
              href={imageUrl}
              download={download}
              onClick={onFileClick && onFileClickHandler}
            />
          </span>
        )
      }) || undefined

    if (valueToUse) {
      return (
        <ListFormat
          value={valueToUse}
          format={format}
          variant={variant}
          listType={listType}
        />
      )
    }
  }, [path, value, variant, listType])

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-upload', className)}
      {...rest}
    >
      {list}
    </ValueBlock>
  )
}

function getSize(size: number) {
  if (!size) {
    return
  }
  // Converts from b (binary) to MB (decimal)
  const sizeInMb = size / BYTES_IN_A_MEGA_BYTE
  return ` (${format(sizeInMb, {
    decimals: 0,
  })} MB)`
}

function getIcon(file: File) {
  if (!file) {
    return
  }
  const fileType = getFileTypeFromExtension(file)

  let iconFileType = fileType

  if (!iconFileType) {
    const mimeParts = file.type.split('/')
    iconFileType =
      fileExtensionImages[mimeParts[0]] ||
      fileExtensionImages[mimeParts[1]]
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      fileExtensionImages,
      iconFileType
    )
  ) {
    iconFileType = 'file'
  }

  return <Icon icon={fileExtensionImages[iconFileType]} />
}

Upload._supportsSpacingProps = true
export default Upload
