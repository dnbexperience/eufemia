import { format } from '../number-format/NumberUtils'
import {
  UploadFile,
  UploadContextProps,
  UploadAcceptedFileTypes,
  UploadAcceptedFileTypesWithFileMaxSize,
  UploadFileNative,
} from './types'

export const BYTES_IN_A_MEGA_BYTE = 1048576

export function verifyFiles(
  files: Array<UploadFile | UploadFileNative>,
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

  const getFileType = (
    file: File,
    listOfAcceptedFilesTypes: UploadAcceptedFileTypes
  ) => {
    return hasPreferredMimeType(listOfAcceptedFilesTypes, file)
      ? file.type
      : getFileTypeFromExtension(file) || file.type
  }

  const handleSize = (file: File) => {
    const validateFileSize = (
      fileSize: number,
      maxFileSize: number | false
    ) => {
      if (
        maxFileSize &&
        // Converts from b (binary) to MB (decimal)
        fileSize / BYTES_IN_A_MEGA_BYTE > maxFileSize
      ) {
        return String(errorLargeFile).replace(
          '%size',
          format(maxFileSize).toString()
        )
      }
      return null
    }

    if (
      isArrayOfStrings(acceptedFileTypes) ||
      acceptedFileTypes.length === 0 ||
      !acceptedFileTypes
    ) {
      return validateFileSize(file.size, fileMaxSize)
    } else if (isArrayOfObjects(acceptedFileTypes)) {
      const fileType = getFileType(
        file,
        getAcceptedFileTypesAsListOfStrings(acceptedFileTypes)
      )

      const acceptedFileTypeObj = (
        acceptedFileTypes as UploadAcceptedFileTypesWithFileMaxSize
      ).find((item) => {
        return item.fileType.toLowerCase() === fileType.toLowerCase()
      })

      return validateFileSize(
        file.size,
        acceptedFileTypeObj.fileMaxSize !== undefined
          ? acceptedFileTypeObj.fileMaxSize
          : fileMaxSize
      )
    }
    return null
  }

  const handleType = (file: File) => {
    if (acceptedFileTypes.length === 0) {
      return false
    }

    const listOfAcceptedFilesTypes =
      getAcceptedFileTypesAsListOfStrings(acceptedFileTypes)
    const fileType = getFileType(file, listOfAcceptedFilesTypes)
    const foundType = extendWithAbbreviation(
      listOfAcceptedFilesTypes
    ).some((type) => {
      /**
       * "file.type" can be e.g. "image/png"
       */
      return fileType.toLowerCase().includes(type.toLowerCase())
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

export function getFileTypeFromExtension(file: File) {
  return (
    (file.name.includes('.') && file.name.replace(/.*\.([^.]+)$/, '$1')) ||
    null
  )
}

export function getAcceptedFileTypes(
  acceptedFileTypes:
    | UploadAcceptedFileTypes
    | UploadAcceptedFileTypesWithFileMaxSize
) {
  return extendWithAbbreviation(
    getAcceptedFileTypesAsListOfStrings(acceptedFileTypes)
  )
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

function getAcceptedFileTypesAsListOfStrings(
  acceptedFileTypes:
    | UploadAcceptedFileTypes
    | UploadAcceptedFileTypesWithFileMaxSize
) {
  return isArrayOfStrings(acceptedFileTypes)
    ? (acceptedFileTypes as UploadAcceptedFileTypes)
    : (acceptedFileTypes as UploadAcceptedFileTypesWithFileMaxSize).map(
        (obj) => obj.fileType
      )
}

export function isArrayOfStrings(arr) {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.every((i) => typeof i === 'string')
  )
}

export function isArrayOfObjects(arr) {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.every((i) => typeof i === 'object')
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
