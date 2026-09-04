import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import DataContext from '../../DataContext/Context'
import type { ListFormatProps } from '../../../../components/list-format'
import ListFormat from '../../../../components/list-format'
import type { UploadFile } from '../../../../components/upload/types'
import { getFileIcon } from '../../../../components/upload/UploadFileListCell'
import { BYTES_IN_A_MEGA_BYTE } from '../../../../components/upload/UploadVerify'
import type { FieldUploadProps as FieldUploadProps } from '../../Field/Upload/Upload'
import { transformFiles } from '../../Field/Upload/Upload'
import { formatNumber } from '../../../../components/number-format/NumberUtils'
import { UploadFileLink } from '../../../../components/upload/UploadFileListLink'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

type PendingOperation = {
  timeout?: ReturnType<typeof setTimeout>
}

export type ValueUploadProps = ValueProps<Array<UploadFile>> &
  Omit<ListFormatProps, 'value'> &
  Pick<FieldUploadProps, 'download' | 'onFileClick'> & {
    displaySize?: boolean
  }

function Upload(props: ValueUploadProps) {
  const preparedProps = {
    fromExternal: transformFiles,
    ...props,
  }

  const {
    value,
    format,
    className,
    variant = 'text',
    listType,
    download = false,
    displaySize = false,
    onFileClick,
    ...rest
  } = useValueProps(preparedProps)

  const list = useMemo(() => {
    const valueToUse =
      value?.map((uploadFile) => {
        if (!uploadFile) {
          return undefined
        }

        return (
          <UploadFileItem
            key={uploadFile.id}
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

    return undefined
  }, [
    value,
    download,
    displaySize,
    onFileClick,
    format,
    variant,
    listType,
  ])

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-upload', className)}
      {...rest}
    >
      {list}
    </ValueBlock>
  )
}

function getSize(size: number) {
  if (!size) {
    return undefined
  }
  // Converts from b (binary) to MB (decimal)
  const sizeInMb = size / BYTES_IN_A_MEGA_BYTE
  return ` (${formatNumber(sizeInMb, {
    decimals: 0,
  })} MB)`
}

withComponentMarkers(Upload, {
  _supportsSpacingProps: true,
})

export default Upload

function UploadFileItem(
  props: { uploadFile: UploadFile } & Pick<
    ValueUploadProps,
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

  const dataContext = useContext(DataContext)

  // A file waiting for an async onFileClick shows a loading state, so a
  // Promise that never settles would leave it spinning with no way out. Give
  // it the same deadline Form.Handler applies to its own async submit.
  const asyncSubmitTimeout =
    dataContext?.props?.asyncSubmitTimeout ?? 30000
  const pendingOperationRef = useRef<PendingOperation>(null)

  useEffect(
    () => () => {
      clearTimeout(pendingOperationRef.current?.timeout)
      pendingOperationRef.current = null
    },
    []
  )

  const { file, isLoading: fileIsLoading } = uploadFile || {}

  if (!file) {
    return null
  }

  const onFileClickHandler = () => {
    if (typeof onFileClick !== 'function') {
      return
    }

    // "onFileClick" is documented as `void | Promise<void>`. Calling it and
    // inspecting the result supports both, where predicting it from the
    // function declaration would silently drop the Promise of a handler that
    // is not declared `async`.
    const result: unknown = onFileClick({ fileItem: uploadFile })

    if (!(result instanceof Promise)) {
      return
    }

    setLoading(true)

    // A new click supersedes the one before it, so the loading state follows
    // the most recent operation and the previous deadline is dropped
    clearTimeout(pendingOperationRef.current?.timeout)

    const operation: PendingOperation = {}
    pendingOperationRef.current = operation

    // Only returns true for whichever outcome arrives first
    const claimOperation = () => {
      if (pendingOperationRef.current !== operation) {
        return false
      }

      pendingOperationRef.current = null

      return true
    }

    operation.timeout = setTimeout(() => {
      if (claimOperation()) {
        setLoading(false)
      }
    }, asyncSubmitTimeout)

    const stopLoading = () => {
      if (claimOperation()) {
        clearTimeout(operation.timeout)
        setLoading(false)
      }
    }

    void result.then(stopLoading, stopLoading)
  }

  const imageUrl = file?.size > 0 ? URL.createObjectURL(file) : null

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
