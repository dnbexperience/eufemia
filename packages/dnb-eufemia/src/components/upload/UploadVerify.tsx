import { format } from '../number-format/NumberUtils'
import {
  UploadFile,
  UploadContextProps,
  UploadAcceptedFileTypes,
} from './types'

export const BYTES_IN_A_MEGA_BYTE = 1048576

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
    if (
      fileMaxSize &&
      // Converts from b (binary) to MB (decimal)
      file.size / BYTES_IN_A_MEGA_BYTE > fileMaxSize
    ) {
      return String(errorLargeFile).replace(
        '%size',
        format(fileMaxSize).toString()
      )
    }
    return null
  }

  const handleType = (file: File) => {
    if (acceptedFileTypes.length === 0) {
      return false
    }
    const fileType = hasPreferredMimeType(acceptedFileTypes, file)
      ? file.type
      : getFileTypeFromExtension(file) || file.type
    const foundType = extendWithAbbreviation(acceptedFileTypes).some(
      (type) => {
        /**
         * "file.type" can be e.g. "images/png"
         */
        return fileType.includes(type)
      }
    )
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

export function getFileTypeFromExtension(file: File) {
  return (
    (file.name.includes('.') && file.name.replace(/.*\.([^.]+)$/, '$1')) ||
    null
  )
}

export function getAcceptedFileTypes(
  acceptedFileTypes: UploadAcceptedFileTypes
) {
  return extendWithAbbreviation(acceptedFileTypes)
    .map((type) => (type.includes('/') ? type : `.${type}`))
    .join(',')
}

export function hasPreferredMimeType(
  acceptedFileTypes: UploadAcceptedFileTypes,
  file: File
) {
  return (
    file.type.split('/')[1] &&
    (!acceptedFileTypes?.length ||
      acceptedFileTypes?.some(
        (type) => type.toLowerCase() === file.type.toLowerCase()
      ))
  )
}

export function extendWithAbbreviation(
  acceptedFileTypes: UploadAcceptedFileTypes,
  abbreviations = { jpg: 'jpeg' }
) {
  const list = [...acceptedFileTypes]

  Object.entries(abbreviations).forEach(([type, abbr]) => {
    if (list.some((t) => t === type) && !list.some((t) => t === abbr)) {
      list.push(abbr)
    }
  })

  return list
}
