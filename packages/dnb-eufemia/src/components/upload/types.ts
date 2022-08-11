import { SkeletonShow } from '../skeleton/Skeleton'

export interface UploadProps {
  /**
   * Is called when the number of uploaded files change, added or removed
   */
  onChange: (files: UploadFileListElement[]) => void
  /**
   * list of accepted file types.
   */
  acceptedFileTypes: string[]

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /**
   * If set true, accepting multiple files is allowed
   */
  multipleFiles?: boolean

  /**
   * Should be true when uploading the file(s).
   */
  isLoading?: boolean

  /**
   * fileMaxSize is max size of each file in MB
   */
  fileMaxSize?: number

  /**
   * Custom text properties
   */
  title?: React.ReactNode
  text?: React.ReactNode
  formatsDescription?: React.ReactNode
  fileSizeDescription?: React.ReactNode
  fileSizeContent?: React.ReactNode
  uploadButtonText?: React.ReactNode
  uploadingLoadingText?: React.ReactNode
  errorWrongFileFormat?: React.ReactNode
  errorToLargeFile?: React.ReactNode
  deleteButton?: React.ReactNode
}

export interface UploadFileListElement {
  file: File
  error: UploadValidationError
}

export enum UploadValidationError {
  // eslint-disable-next-line no-unused-vars
  NONE,
  // eslint-disable-next-line no-unused-vars
  LARGE_FILE_SIZE,
  // eslint-disable-next-line no-unused-vars
  WRONG_FILE_TYPE,
}
