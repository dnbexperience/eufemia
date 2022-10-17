import React from 'react'
import { SkeletonShow } from '../skeleton/Skeleton'
import { LocaleProps, SpacingProps } from '../../shared/types'

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
  fileTypeDescription?: React.ReactNode
  fileSizeDescription?: React.ReactNode
  fileSizeContent?: React.ReactNode
  buttonText?: React.ReactNode
  errorLargeFile?: React.ReactNode
  errorUnsupportedFile?: React.ReactNode
  loadingText?: React.ReactNode
  deleteButton?: React.ReactNode
  fileListAriaLabel?: string
}

export type UploadAllProps = UploadProps &
  SpacingProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>

export type UploadContextProps = {
  id?: string
  acceptedFileTypes: string[]
  onInputUpload: (files: UploadFile[]) => void
  fileMaxSize: number
  buttonText: React.ReactNode
  errorLargeFile: React.ReactNode
  errorUnsupportedFile: React.ReactNode
  multipleFiles: boolean
}

export type UploadFile = {
  file: File
  errorMessage?: React.ReactNode
  isLoading?: boolean
}
