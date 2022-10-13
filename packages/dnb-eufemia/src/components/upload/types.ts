import React from 'react'
import { SkeletonShow } from '../skeleton/Skeleton'

export type UploadProps = {
  /**
   * unique id used with the useUpload hook to manage the files
   */
  id: string

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
  uploadErrorLargeFile?: React.ReactNode
  uploadLoadingText?: React.ReactNode
  deleteButton?: React.ReactNode
  fileListAriaLabel?: string
}

export type UploadFile = {
  file: File
  errorMessage?: React.ReactNode
  isLoading?: boolean
}
