import React, { useMemo } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { Anchor, Button } from '../../../../components'
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
        return (
          <span key={index}>
            {getIcon(file)}
            {onFileClick ? (
              <Button
                icon={false}
                size="small"
                variant="tertiary"
                className={classnames('dnb-upload__file-cell__title')}
                onClick={onFileClickHandler}
                left="x-small"
              >
                {file.name}
                {displaySize && getSize(file.size)}
              </Button>
            ) : (
              <Anchor
                target="_blank"
                href={imageUrl}
                download={download ? file.name : null}
                rel="noopener noreferrer"
                className="dnb-anchor--no-launch-icon"
                left="x-small"
              >
                {file.name}
                {displaySize && getSize(file.size)}
              </Anchor>
            )}
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
