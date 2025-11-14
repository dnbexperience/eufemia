import React from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { LocaleProps, SpacingProps } from '../../shared/types'
import type { SharedStateId } from '../../shared/helpers/useSharedState'
import { ButtonProps } from '../Button'

export type UploadAcceptedFileTypes = string[]

export type UploadAcceptedFileTypesWithFileMaxSize =
  UploadAcceptedFileTypeObject[]

export type UploadAcceptedFileTypeObject = {
  fileType: string
  fileMaxSize?: number | false
}

export type UploadProps = {
  /**
   * unique id used with the useUpload hook to manage the files
   */
  id?: SharedStateId

  /**
   * defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.
   */
  variant?: 'normal' | 'compact'

  /**
   * list of accepted file types.
   */
  acceptedFileTypes:
    | UploadAcceptedFileTypes
    | UploadAcceptedFileTypesWithFileMaxSize

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
   * Defines the max file size of each file in MB. Use either `0` or `false` to disable.
   * Default: 5 MB
   */
  fileMaxSize?: number | false

  /**
   * will be called on `files` changes made by the user. Access the files with `{ files }`.
   */
  onChange?: ({ files }: { files: Array<UploadFile> }) => void

  /**
   * will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.
   */
  onFileDelete?: ({
    fileItem,
  }: {
    fileItem: UploadFile
  }) => void | Promise<void>

  /**
   * Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`.
   */
  onFileClick?: ({
    fileItem,
  }: {
    fileItem: UploadFile
  }) => void | Promise<void>

  /**
   * Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window.
   * Default: false
   */
  download?: boolean

  /**
   * Allows uploading of duplicate files.
   * Default: false
   */
  allowDuplicates?: boolean

  /**
   * Disables file drag and drop, by removing the drop zone.
   * Default: false
   */
  disableDragAndDrop?: boolean

  /**
   * Custom icon used for the upload button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon="information"`), other icons should be set as React elements. Defaults to the `folder` icon.
   */
  buttonProps?: ButtonProps

  /**
   * Custom text properties
   */
  title?: React.ReactNode
  text?: React.ReactNode
  fileTypeTableCaption?: React.ReactNode
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
  children?: React.ReactNode
}

export type UploadAllProps = UploadProps &
  SpacingProps &
  LocaleProps &
  Omit<React.HTMLProps<HTMLElement>, 'onChange' | 'title'>

export type UploadContextProps = {
  id?: string
  onInputUpload: (files: Array<UploadFileNative>) => void
} & Partial<UploadAllProps>

export type UploadFile = {
  file: File
  id: string
  exists: boolean
  isLoading?: boolean
  errorMessage?: React.ReactNode
  description?: React.ReactNode
  removeDeleteButton?: boolean
  deleteButtonProps?: ButtonProps
}

export type UploadFileNative = Omit<UploadFile, 'id' | 'exists'> &
  Partial<Pick<UploadFile, 'id' | 'exists'>>
