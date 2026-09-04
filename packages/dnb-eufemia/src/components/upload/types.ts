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
   * Unique id used together with the `useUpload` hook to manage the files. Needed when wanting to connect with the `useUpload` hook.
   */
  id?: SharedStateId

  /**
   * Defines the appearance. Use one of these: `default` or `compact`. Defaults to `default`.
   */
  variant?: 'default' | 'compact'

  /**
   * List of accepted file types. Either as a string or an [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype). When providing a list of [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype), the accepted file types will be presented in a table (see [example](/uilib/components/upload/demos/#upload-with-file-max-size-based-on-file-type)).
   */
  acceptedFileTypes:
    | UploadAcceptedFiles
    | UploadAcceptedFileTypesWithFileMaxSize

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Defines the amount of files the user can select and upload. Defaults to `100`.
   */
  filesAmountLimit?: number

  /**
   * Defines the max file size of each file in MB. Use either `0` or `false` to disable. Defaults to 5 MB.
   */
  fileMaxSize?: number | false

  /**
   * Deadline in milliseconds for an `onFileDelete` or `onFileClick` that returns a Promise. When the Promise does not settle within it, the file stops showing its loading state and a later settle is ignored, so a Promise that never settles does not leave the file stuck. A timed out deletion keeps the file listed and shows the `errorDeleteTimeout` message. Inside a [Form.Handler](/uilib/extensions/forms/Form/Handler/properties), its `asyncSubmitTimeout` is used instead. Defaults to `30000` (30 seconds).
   */
  asyncFileOperationTimeout?: number

  /**
   * Will be called on `files` changes made by the user. Access the files with `{ files }` (containing each a `fileItem`).
   */
  onChange?: ({ files }: { files: Array<UploadFile> }) => void

  /**
   * Will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`. Return a Promise to keep the file in a loading state until it settles: the file is removed when the Promise resolves, and kept with an error message when it rejects. When it does not settle within `asyncFileOperationTimeout` (or `asyncSubmitTimeout` inside a [Form.Handler](/uilib/extensions/forms/Form/Handler/properties)), the file is kept as well and a later settle is ignored.
   */
  onFileDelete?: ({
    fileItem,
  }: {
    fileItem: UploadFile
  }) => void | Promise<void>

  /**
   * Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`. When providing this property, the file will be rendered as a button instead of an anchor or plain text. Return a Promise to keep the file in a loading state until it settles. When it does not settle within `asyncFileOperationTimeout` (or `asyncSubmitTimeout` inside a [Form.Handler](/uilib/extensions/forms/Form/Handler/properties)), the loading state stops and a later settle is ignored.
   */
  onFileClick?: ({
    fileItem,
  }: {
    fileItem: UploadFile
  }) => void | Promise<void>

  /**
   * Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.
   */
  download?: boolean

  /**
   * Allows uploading of duplicate files. Defaults to `false`.
   */
  allowDuplicates?: boolean

  /**
   * Disables file drag and drop, by removing the drop zone. Defaults to `false`.
   */
  disableDragAndDrop?: boolean

  /**
   * Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object, to customize the upload button behavior and appearance.
   */
  buttonProps?: ButtonProps

  /**
   * Custom text property. Replaces the default title. Can be disabled using `false`.
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
  errorDeleteTimeout?: ReactNode
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
  onInputUpload(files: Array<UploadFileNative>): void
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
