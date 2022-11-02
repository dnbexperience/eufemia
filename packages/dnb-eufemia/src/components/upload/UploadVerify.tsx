import { format } from '../number-format/NumberUtils'
import { UploadContextProps, UploadFile } from './types'

const BYTES_IN_A_MEGA_BYTE = 1048576

export function verifyFiles(
  files: UploadFile[],
  context: Pick<
    UploadContextProps,
    | 'errorUnsupportedFile'
    | 'errorLargeFile'
    | 'acceptedFileTypes'
    | 'fileMaxSize'
  >
) {
  const {
    fileMaxSize,
    acceptedFileTypes,
    errorLargeFile,
    errorUnsupportedFile,
  } = context

  const handleSize = (file: File) => {
    return (
      // Converts from b (binary) to MB (decimal)
      file.size / BYTES_IN_A_MEGA_BYTE > fileMaxSize
        ? String(errorLargeFile).replace(
            '%size',
            format(fileMaxSize).toString()
          )
        : null
    )
  }

  const handleType = (file: File) => {
    if (acceptedFileTypes.length === 0) {
      return false
    }
    const foundType = acceptedFileTypes.some((type) => {
      /**
       * "file.type" can be e.g. "images/png"
       */
      return file.type.includes(type)
    })
    return !foundType ? errorUnsupportedFile : null
  }

  const cleanedFiles = files.map((item) => {
    const { file } = item

    const errorMessage = handleSize(file) || handleType(file)

    if (errorMessage) {
      item.errorMessage = errorMessage
    }

    return item
  })

  return cleanedFiles
}
