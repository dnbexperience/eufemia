import React, { useMemo, useState } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import ListFormat, {
  ListFormatProps,
} from '../../../../components/list-format'
import type { UploadFile } from '../../../../components/upload/types'
import { getFileIcon } from '../../../../components/upload/UploadFileListCell'
import { BYTES_IN_A_MEGA_BYTE } from '../../../../components/upload/UploadVerify'
import { Props as FieldUploadProps } from '../../Field/Upload/Upload'
import { format } from '../../../../components/number-format/NumberUtils'
import { UploadFileLink } from '../../../../components/upload/UploadFileListLink'
import { isAsync } from '../../../../shared/helpers/isAsync'

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
        if (!uploadFile) {
          return
        }

        return (
          <UploadFileItem
            key={index}
            uploadFile={uploadFile}
            download={download}
            displaySize={displaySize}
            onFileClick={onFileClick}
          />
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

Upload._supportsSpacingProps = true
export default Upload

function UploadFileItem(
  props: { uploadFile: UploadFile } & Pick<
    Props,
    'download' | 'onFileClick' | 'displaySize'
  >
) {
  const {
    uploadFile,
    download = false,
    displaySize = false,
    onFileClick,
  } = props

  const [loading, setLoading] = useState(false)

  const { file, isLoading: fileIsLoading } = uploadFile || {}

  if (!file) {
    return null
  }

  const handleFileClickAsync = async (uploadFile: UploadFile) => {
    setLoading(true)
    await onFileClick({ fileItem: uploadFile })
    setLoading(false)
  }

  const onFileClickHandler = async () => {
    if (typeof onFileClick === 'function') {
      if (isAsync(onFileClick)) {
        handleFileClickAsync(uploadFile)
      } else {
        onFileClick({ fileItem: uploadFile })
      }
    }
  }

  const imageUrl = URL.createObjectURL(file)

  const text = file.name + (displaySize ? ' ' + getSize(file.size) : '')
  const isLoading = fileIsLoading || loading
  return (
    <span className="dnb-forms-value-upload__item">
      {getFileIcon(file, { isLoading, size: 'medium' }, false)}
      <UploadFileLink
        left="x-small"
        text={text}
        href={imageUrl}
        download={download}
        onClick={onFileClick && onFileClickHandler}
      />
    </span>
  )
}
