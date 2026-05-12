import type { HTMLProps, ReactNode } from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { LocaleProps, SpacingProps } from '../../shared/types'
import type { SharedStateId } from '../../shared/helpers/useSharedState'
import type { ButtonProps } from '../Button'

export type UploadAcceptedFiles = string[]

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
   * defines the appearance. Use one of these: `default` or `compact`. Defaults to `default`.
   */
  variant?: 'default' | 'compact'

  /**
   * List of accepted file types.
   */
  acceptedFileTypes:
    | UploadAcceptedFiles
    | UploadAcceptedFileTypesWithFileMaxSize

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Defines the amount of files the user can select and upload
   * Default: `100`
   */
  filesAmountLimit?: number

  /**
   * Defines the max file size of each file in MB. Use either `0` or `false` to disable.
   * Default: `5 MB`
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
   * Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`. When providing this property, the file will be rendered as a button instead of an anchor or plain text.
   */
  onFileClick?: ({
    fileItem,
  }: {
    fileItem: UploadFile
  }) => void | Promise<void>

  /**
   * Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window.
   * Default: `false`
   */
  download?: boolean

  /**
   * Allows uploading of duplicate files.
   * Default: `false`
   */
  allowDuplicates?: boolean

  /**
   * Disables file drag and drop, by removing the drop zone.
   * Default: `false`
   */
  disableDragAndDrop?: boolean

  /**
   * Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object, to customize the upload button behavior and appearance.
   */
  buttonProps?: ButtonProps

  /**
   * Custom text properties
   */
  title?: ReactNode
  text?: ReactNode
  fileTypeTableCaption?: ReactNode
  fileTypeDescription?: ReactNode
  fileSizeDescription?: ReactNode
  fileAmountDescription?: ReactNode
  fileSizeContent?: ReactNode
  buttonText?: ReactNode
  errorLargeFile?: ReactNode
  errorUnsupportedFile?: ReactNode
  errorAmountLimit?: ReactNode
  loadingText?: ReactNode
  deleteButton?: ReactNode
  listAriaLabel?: string
  children?: ReactNode
}

export type UploadAllProps = UploadProps &
  SpacingProps &
  LocaleProps &
  Omit<HTMLProps<HTMLElement>, 'onChange' | 'title'>

export type UploadContextValue = {
  id?: string
  onInputUpload: (files: Array<UploadFileNative>) => void
} & Partial<UploadAllProps>

export type UploadFile = {
  file: File
  id: string
  exists: boolean
  isLoading?: boolean
  errorMessage?: ReactNode
  description?: ReactNode
  removeDeleteButton?: boolean
  deleteButtonProps?: ButtonProps
  removeLink?: boolean
}

export type UploadFileNative = Omit<UploadFile, 'id' | 'exists'> &
  Partial<Pick<UploadFile, 'id' | 'exists'>>
