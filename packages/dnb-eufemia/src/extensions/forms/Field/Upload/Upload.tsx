import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import clsx from 'clsx'
import type {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import {
  useFieldProps,
  usePath,
  useTranslation as useFormsTranslation,
} from '../../hooks'
import type { FieldProps } from '../../types'
import type {
  UploadFile,
  UploadFileNative,
  UploadProps,
} from '../../../../components/Upload'
import Upload from '../../../../components/Upload'
import useUpload, {
  isFileEqual,
} from '../../../../components/upload/useUpload'
import { pickSpacingProps } from '../../../../components/flex/utils'
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
export type Props = Omit<
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

function UploadComponent(props: Props) {
  const sharedTr = useSharedTranslation().Upload
  const formsTr = useFormsTranslation().Upload

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': formsTr.errorRequired,
    }),
    [formsTr.errorRequired]
  )

  const validateRequired = useCallback(
    (value: UploadValue, { required, isChanged, error }: { required: boolean; isChanged: boolean; error: Error }) => {
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
      ;(value[index] as Record<string, unknown>)['name'] = (item as Record<string, unknown>)['name'] || item.file?.name
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
    // @ts-expect-error - strictFunctionTypes
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

  const { files, setFiles } = useUpload(id)

  const labelWithItemNo = useIterateItemNo({
    label: label ?? title,
    labelSuffix: props.labelSuffix,
    required: props.required,
  })

  const filesRef = useRef<Array<UploadFile> | undefined>(undefined)

  useMemo(() => {
    filesRef.current = files
  }, [files])

  const isSameUploadFile = useCallback(
    (
      fileA: UploadFile | UploadFileNative,
      fileB: UploadFile | UploadFileNative
    ) => {
      if (!fileA || !fileB) {
        return false
      }

      if (fileA.id && fileB.id && fileA.id === fileB.id) {
        return true
      }

      return isFileEqual(fileA.file, fileB.file)
    },
    []
  )

  const isPendingOrErrorFile = useCallback(
    (file: UploadFile | UploadFileNative) => {
      return Boolean(file?.isLoading || file?.errorMessage)
    },
    []
  )

  useEffect(() => {
    const externalFiles = value ?? []
    const localFiles = filesRef.current ?? []

    const mergedExternalFiles = externalFiles.map((externalFile) => {
      if (!externalFile?.isLoading) {
        return externalFile
      }

      const localResolvedFile = localFiles.find(
        (localFile) =>
          isSameUploadFile(localFile, externalFile) &&
          !localFile?.isLoading
      )

      return localResolvedFile || externalFile
    })

    const filesToPreserve = localFiles.filter((localFile) => {
      if (!isPendingOrErrorFile(localFile)) {
        return false
      }

      return !mergedExternalFiles.some((externalFile) =>
        isSameUploadFile(externalFile, localFile)
      )
    })

    setFiles([...mergedExternalFiles, ...filesToPreserve])
  }, [isPendingOrErrorFile, isSameUploadFile, setFiles, value])

  const handleChangeAsync = useCallback(
    async (files: UploadValue) => {
      const filesArray = files || []
      // Filter out existing files
      const existingFileIds =
        filesRef.current?.map((file) => file.id) || []
      const existingFiles = filesArray.filter((file) =>
        existingFileIds.includes(file.id)
      )
      const newFiles = filesArray.filter(
        (file) => !existingFileIds.includes(file.id)
      )
      const newValidFiles = newFiles.filter((file) => !file.errorMessage)

      if (newValidFiles.length > 0) {
        const fieldIdentifier = identifier
        setFieldState?.(fieldIdentifier, 'pending')
        setFieldInternals?.(fieldIdentifier, {
          enableAsyncMode: true,
        })

        try {
          // Set loading
          const newFilesLoading = newFiles.map((file) => ({
            ...file,
            isLoading: !file.errorMessage,
          }))
          setFiles([...filesRef.current, ...newFilesLoading])

          const incomingFiles = await fileHandler(newValidFiles)

          if (!incomingFiles) {
            setFiles(existingFiles)
            handleChange(existingFiles)
          } else {
            // merge incoming files into existing order of newFiles.
            const updatedByResponse = new Set<number>()

            incomingFiles.forEach((file) => {
              const incomingFileObj = {
                ...file,
                isLoading: false,
              }
              const foundIndex = newFilesLoading.findIndex(
                (newFile) => newFile.isLoading
              )
              if (foundIndex >= 0) {
                newFilesLoading[foundIndex] = incomingFileObj
                updatedByResponse.add(foundIndex)
              } else {
                // if there's more files incoming than there's files loading (edge case), add them to end of array.
                newFilesLoading.push(incomingFileObj)
              }
            })

            // Preserve current isLoading state for files not updated by the upload response.
            // This prevents overwriting loading states set by concurrent operations (e.g., async delete).
            newFilesLoading.forEach((file, index) => {
              if (updatedByResponse.has(index)) {
                return // stop here
              }

              const currentFile = filesRef.current?.find(
                (f) =>
                  (f.id && f.id === file.id) ||
                  (f.file && f.file === file.file)
              )

              if (currentFile?.isLoading) {
                newFilesLoading[index] = {
                  ...file,
                  isLoading: true,
                }
              }
            })

            const indexOfFirstNewFile = filesRef.current.findIndex(
              ({ id }) => id === newFiles[0].id
            )

            const updatedFiles = [
              ...filesRef.current.slice(0, indexOfFirstNewFile),
              ...(newFilesLoading?.filter((file) => file != null) ?? []),
              ...filesRef.current.slice(
                indexOfFirstNewFile + newFilesLoading.length
              ),
            ]
            setFiles(updatedFiles)
            handleChange(updatedFiles)
          }
        } finally {
          setFieldState?.(fieldIdentifier, undefined)
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
        const processedFile = processedInvalidFiles.find(
          (processed) =>
            processed.id === file.id ||
            (processed.file && processed.file === file.file)
        )

        return processedFile || file
      })
    },
    [onValidationError]
  )

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      let changeValue = files?.length === 0 ? undefined : files

      // Prevents the form-status from showing up
      handleBlur()
      handleFocus()

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
        onChange={changeHandler}
        onFileDelete={onFileDelete}
        onFileClick={onFileClick}
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
        {...htmlAttributes}
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
  label: React.ReactNode
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
        item['file'] = new File([], (item as Record<string, unknown>)['name'] as string || item?.file['name'], {
          lastModified: (item.file as File)?.lastModified ?? 0,
          type: (item.file as File)?.type ?? '',
        })
      }
      return item
    })
  }

  return value
}
