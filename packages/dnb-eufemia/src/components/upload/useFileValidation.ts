import { useState } from 'react'
import { UploadValidationError } from './types'

interface useValidationProps {
  fileMaxSize: number
  acceptedFileTypes: string[]
}

function useFileValivation({
  fileMaxSize,
  acceptedFileTypes,
}: useValidationProps) {
  const [validationError, setValidationError] =
    useState<UploadValidationError>(UploadValidationError.NONE)

  function validate(file: File) {
    setValidationError(UploadValidationError.NONE)

    // Validate file size
    if (file.size > convertMBtoB(fileMaxSize)) {
      setValidationError(UploadValidationError.LARGE_FILE_SIZE)
    }

    // extract file type from file object
    const prettyfiedFileType = file.type.split('/')[1].toLocaleLowerCase()

    if (
      acceptedFileTypes.length > 0 &&
      !acceptedFileTypes.includes(prettyfiedFileType)
    ) {
      setValidationError(UploadValidationError.WRONG_FILE_TYPE)
    }

    return validationError
  }

  return {
    validate,
    validationError,
  }

  function convertMBtoB(bytes: number) {
    return bytes * 1000000
  }
}

export default useFileValivation
