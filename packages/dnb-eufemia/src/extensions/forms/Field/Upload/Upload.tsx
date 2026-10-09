import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import {
  useFieldProps,
  usePath,
  useTranslation as useFormsTranslation,
} from '../../hooks'
import type { FieldProps, Identifier } from '../../types'
import type {
  UploadFile,
  UploadFileNative,
  UploadProps,
} from '../../../../components/Upload'
import Upload from '../../../../components/Upload'
import useUpload from '../../../../components/upload/useUpload'
import { isSameFile } from '../../../../components/upload/uploadFileUtils'
import { pickSpacingProps } from '../../../../components/flex/utils'
import mergeProps from '../../../../shared/helpers/mergeProps'
import type { HelpProps } from '../../../../components/help-button/HelpButtonInline'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../../../../components/help-button/HelpButtonInline'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import type { SpacingProps } from '../../../../shared/types'
import { FormError } from '../../utils'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateItemNo'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type { UploadFile, UploadFileNative }
export type UploadValue = Array<UploadFile | UploadFileNative>
type FileHandlerOperation = {
  fieldIdentifier: Identifier
  invalidated: boolean
}

export type FieldUploadProps = Omit<
  FieldProps<UploadValue, UploadValue | undefined>,
  | 'layout'
  | 'layoutOptions'
  | 'onBlurValidator'
  | 'onChangeValidator'
  | 'contentWidth'
  | 'labelSize'
  | 'labelDescriptionInline'
  | 'labelSrOnly'
  | 'labelSize'
> &
  SpacingProps &
  Pick<
    Partial<UploadProps>,
    | 'children'
    | 'title'
    | 'variant'
    | 'text'
    | 'acceptedFileTypes'
    | 'filesAmountLimit'
    | 'fileMaxSize'
    | 'onFileDelete'
    | 'onFileClick'
    | 'skeleton'
    | 'download'
    | 'allowDuplicates'
    | 'buttonProps'
    | 'disableDragAndDrop'
  > & {
    fileHandler?: (
      newFiles: UploadValue
    ) => UploadValue | Promise<UploadValue>
    onValidationError?: (invalidFiles: UploadValue) => UploadValue | void
    width?: 'large' | 'stretch'
  }

function UploadComponent(props: FieldUploadProps) {
  const sharedTr = useSharedTranslation().Upload
  const formsTr = useFormsTranslation().Upload

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': formsTr.errorRequired,
    }),
    [formsTr.errorRequired]
  )

  const validateRequired = useCallback(
    (value: UploadValue, { required, isChanged, error }) => {
      const hasError = value?.some((file) => file.errorMessage)
      if (hasError) {
        return new FormError('Upload.errorInvalidFiles')
      }

      const hasFiles = value?.length > 0

      if (required && ((!isChanged && !hasFiles) || !hasFiles)) {
        return error
      }

      return undefined
    },
    []
  )

  const fromInput = useCallback((value: UploadValue) => {
    value?.forEach((item, index) => {
      if (!item) {
        return
      }

      value[index] = item

      // Store the name in the value, to support session storage (serialization)
      value[index]['name'] = item['name'] || item.file?.name
    })

    return value
  }, [])

  const preparedProps = {
    errorMessages,
    validateRequired,
    fromInput,
    toInput: transformFiles,
    ...props,
  }

  const {
    id,
    className,
    width: widthProp = 'stretch',
    value,
    label,
    labelDescription,
    help,
    htmlAttributes,
    disabled,
    handleChange,
    handleFocus,
    handleBlur,
    fileHandler,
    onValidationError,
    dataContext,
    ...rest
  } = useFieldProps(preparedProps, {
    executeOnChangeRegardlessOfError: true,
  })

  const { identifier } = usePath({
    id,
    path: props.path,
    itemPath: props.itemPath,
  })

  const { setFieldState, setFieldInternals } = dataContext || {}

  // Upload props
  const {
    title = sharedTr.title,
    text = sharedTr.text,
    variant = 'default',
    acceptedFileTypes = ['pdf', 'png', 'jpg', 'jpeg'],
    filesAmountLimit = 100,
    fileMaxSize = 5,
    skeleton,
    onFileDelete,
    onFileClick,
    download,
    allowDuplicates,
    disableDragAndDrop,
    buttonProps,
  } = rest

  const { files, setFiles, clearFiles } = useUpload(id)

  const filesRef = useRef<Array<UploadFile> | undefined>(undefined)

  useMemo(() => {
    filesRef.current = files
  }, [files])

  const fileHandlerOperationsRef = useRef<Set<FileHandlerOperation>>(
    new Set()
  )

  const completeFileHandlerOperation = useCallback(
    (operation: FileHandlerOperation) => {
      const operations = fileHandlerOperationsRef.current
      if (!operations.delete(operation)) {
        return
      }

      const hasPendingOperation = Array.from(operations).some(
        ({ fieldIdentifier }) =>
          fieldIdentifier === operation.fieldIdentifier
      )

      setFieldState?.(
        operation.fieldIdentifier,
        hasPendingOperation ? 'pending' : undefined
      )

      if (!hasPendingOperation) {
        setFieldInternals?.(operation.fieldIdentifier, {
          enableAsyncMode: false,
        })
      }
    },
    [setFieldInternals, setFieldState]
  )

  useEffect(() => {
    const operations = fileHandlerOperationsRef.current
    return () => {
      operations.forEach((operation) => {
        operation.invalidated = true
        completeFileHandlerOperation(operation)
      })
    }
  }, [completeFileHandlerOperation])

  const labelWithItemNo = useIterateItemNo({
    label: label ?? title,
    labelSuffix: props.labelSuffix,
    required: props.required,
  })

  const isPendingOrErrorFile = useCallback(
    (file: UploadFile | UploadFileNative) => {
      return Boolean(file?.isLoading || file?.errorMessage)
    },
    []
  )

  useEffect(() => {
    return () => {
      clearFiles()
    }
  }, [clearFiles])

  useEffect(() => {
    const externalFiles = value ?? []
    const localFiles = filesRef.current ?? []

    const mergedExternalFiles = externalFiles.map((externalFile) => {
      if (!externalFile?.isLoading) {
        return externalFile
      }

      const localResolvedFile = localFiles.find(
        (localFile) =>
          isSameFile(localFile, externalFile) && !localFile?.isLoading
      )

      return localResolvedFile || externalFile
    })

    const filesToPreserve = localFiles.filter((localFile) => {
      if (!isPendingOrErrorFile(localFile)) {
        return false
      }

      return !mergedExternalFiles.some((externalFile) =>
        isSameFile(externalFile, localFile)
      )
    })

    setFiles([...mergedExternalFiles, ...filesToPreserve])
  }, [isPendingOrErrorFile, setFiles, value])

  const handleChangeAsync = useCallback(
    async (files: UploadValue) => {
      const filesArray = files || []
      // Filter out existing files
      const existingFileIds =
        filesRef.current?.map((file) => file.id) || []
      const newFiles = filesArray.filter(
        (file) => !existingFileIds.includes(file.id)
      )
      const newValidFiles = newFiles.filter((file) => !file.errorMessage)

      if (newValidFiles.length > 0) {
        const fieldIdentifier = identifier
        const operation: FileHandlerOperation = {
          fieldIdentifier,
          invalidated: false,
        }
        fileHandlerOperationsRef.current.add(operation)

        setFieldState?.(fieldIdentifier, 'pending')
        setFieldInternals?.(fieldIdentifier, {
          enableAsyncMode: true,
        })

        // Keep the ref current, since the fileHandler can settle before the next render
        const updateFiles = (updatedFiles: UploadValue) => {
          filesRef.current = updatedFiles as Array<UploadFile>
          setFiles(updatedFiles)
        }

        try {
          // Set loading
          const newFilesLoading = newFiles.map((file) => ({
            ...file,
            isLoading: !file.errorMessage,
          }))
          updateFiles([...filesRef.current, ...newFilesLoading])

          let incomingFiles: UploadValue
          try {
            incomingFiles = await fileHandler(newValidFiles)
          } catch (error) {
            const message = error instanceof Error ? error.message : error
            const errorMessage =
              typeof message === 'string' && message
                ? message
                : formsTr.errorUploadFailed
            incomingFiles = newValidFiles.map((file) => ({
              ...file,
              errorMessage,
            }))
          }

          // After an unmount, the path may belong to another field
          if (operation.invalidated) {
            return
          }

          // Results match the handled files by position; a file without a result is removed
          const results = incomingFiles ?? []
          const updatedFiles = filesRef.current.flatMap<
            UploadValue[number]
          >((file) => {
            const index = newValidFiles.findIndex(
              ({ id }) => id === file.id
            )
            if (index < 0) {
              return [file]
            }

            const incomingFile = results[index]
            return incomingFile
              ? [{ ...incomingFile, isLoading: false }]
              : []
          })

          results.slice(newValidFiles.length).forEach((file) => {
            if (file) {
              updatedFiles.push({ ...file, isLoading: false })
            }
          })

          updateFiles(updatedFiles)
          handleChange(updatedFiles.length > 0 ? updatedFiles : undefined)
        } finally {
          completeFileHandlerOperation(operation)
        }
      } else {
        handleChange(files)
      }
    },
    [
      identifier,
      fileHandler,
      onValidationError,
      handleChange,
      setFieldInternals,
      setFieldState,
      setFiles,
      completeFileHandlerOperation,
      formsTr.errorUploadFailed,
    ]
  )

  const processValidationErrors = useCallback(
    (
      files: UploadValue,
      existingFiles: UploadValue
    ): UploadValue | undefined => {
      if (!files || !onValidationError) {
        return files
      }

      const existingFileIds = existingFiles?.map((file) => file.id) ?? []

      const newFiles = files.filter(
        (file) => !existingFileIds.includes(file.id)
      )

      const newInvalidFiles = newFiles.filter((file) => file.errorMessage)

      if (newInvalidFiles.length === 0) {
        return files
      }

      // Allow user to customize invalid files
      const processedInvalidFiles =
        onValidationError(newInvalidFiles) || newInvalidFiles

      // Merge processed files back into changeValue
      return files.map((file) => {
        const processedFile = processedInvalidFiles.find((processed) =>
          isSameFile(processed, file)
        )

        return processedFile || file
      })
    },
    [onValidationError]
  )

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      let changeValue = files?.length === 0 ? undefined : files

      // Prevents the form-status from showing up when adding files
      handleBlur()
      if (changeValue) {
        handleFocus()
      }

      changeValue = processValidationErrors(changeValue, filesRef.current)

      if (fileHandler) {
        handleChangeAsync(changeValue)
      } else {
        handleChange(changeValue)
      }
    },
    [
      handleBlur,
      handleFocus,
      fileHandler,
      processValidationErrors,
      handleChangeAsync,
      handleChange,
    ]
  )

  const width = widthProp as FieldBlockWidth
  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input`,
    labelSrOnly: true,
    className: clsx('dnb-forms-field-upload', className),
    width,
    help: undefined,
    ...pickSpacingProps(props),
  }

  const usedLabelDescription = labelDescription ?? text

  return (
    <FieldBlock {...fieldBlockProps}>
      <Upload
        id={id}
        variant={variant}
        acceptedFileTypes={acceptedFileTypes}
        filesAmountLimit={filesAmountLimit}
        download={download}
        allowDuplicates={allowDuplicates}
        disableDragAndDrop={disableDragAndDrop}
        buttonProps={buttonProps}
        disabled={disabled}
        fileMaxSize={fileMaxSize}
        skeleton={skeleton}
        title={
          help && labelDescription === false ? (
            <LabelWithHelpButton
              label={labelWithItemNo}
              id={id}
              help={help}
            />
          ) : (
            labelWithItemNo
          )
        }
        text={
          help && (labelDescription ?? text) ? (
            <LabelWithHelpButton
              label={usedLabelDescription}
              id={id}
              help={help}
            />
          ) : (
            usedLabelDescription
          )
        }
        {...mergeProps(
          {
            onChange: changeHandler,
            onFileDelete,
            onFileClick,
          },
          htmlAttributes
        )}
      >
        {help && (
          <HelpButtonInlineContent
            contentId={`${id}-help`}
            help={help}
            roundedCorner={variant === 'compact'}
          />
        )}
        {props.children}
      </Upload>
    </FieldBlock>
  )
}

function LabelWithHelpButton(props: {
  label: ReactNode
  id: string
  help?: HelpProps
}) {
  const { label, id, help } = props
  return (
    <>
      {label}
      <HelpButtonInline
        contentId={`${id}-help`}
        left={label ? 'x-small' : false}
        help={help}
      />
    </>
  )
}

export default UploadComponent

withComponentMarkers(UploadComponent, { _supportsSpacingProps: true })

export function transformFiles(
  value: UploadValue
): UploadValue | undefined {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined
    }

    value.map((item) => {
      if (item?.file && !(item.file instanceof File)) {
        // To support session storage, we recreated the file blob.
        item['file'] = new File([], item['name'] || item?.file['name'], {
          lastModified: (item.file as File)?.lastModified ?? 0,
          type: (item.file as File)?.type ?? '',
        })
      }
      return item
    })
  }

  return value
}
