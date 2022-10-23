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
   * Defines the amount of files the user can select and upload
   * Default: 100
   */
  filesAmountLimit?: number

  /**
   * fileMaxSize is max size of each file in MB
   * Default: 5 MB
   */
  fileMaxSize?: number

  /**
   * will be called on `files` changes made by the user. Access the files with `{ files }`.
   */
  onChange?: ({ files }: { files: UploadFile[] }) => void

  /**
   * will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.
   */
  onFileDelete?: ({ fileItem }: { fileItem: UploadFile }) => void

  /**
   * Custom text properties
   */
  title?: React.ReactNode
  text?: React.ReactNode
  fileTypeDescription?: React.ReactNode
  fileSizeDescription?: React.ReactNode
  fileAmountDescription?: React.ReactNode
  fileSizeContent?: React.ReactNode
  buttonText?: React.ReactNode
  errorLargeFile?: React.ReactNode
  errorUnsupportedFile?: React.ReactNode
  errorAmountLimit?: React.ReactNode
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
  onInputUpload: (files: UploadFile[]) => void
} & Partial<UploadProps>

export type UploadFile = {
  file: File
  errorMessage?: React.ReactNode
  isLoading?: boolean
  id?: string
}
