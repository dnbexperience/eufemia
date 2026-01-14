import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import classnames from 'classnames'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import {
  useFieldProps,
  usePath,
  useTranslation as useFormsTranslation,
} from '../../hooks'
import { FieldProps } from '../../types'
import Upload, {
  UploadFile,
  UploadFileNative,
  UploadProps,
} from '../../../../components/Upload'
import useUpload from '../../../../components/upload/useUpload'
import { pickSpacingProps } from '../../../../components/flex/utils'
import HelpButtonInline, {
  HelpButtonInlineContent,
  HelpProps,
} from '../../../../components/help-button/HelpButtonInline'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import { SpacingProps } from '../../../../shared/types'
import { FormError } from '../../utils'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateItemNo'

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
    width?: 'large' | 'stretch'
  }

const getFileIdsKey = (files: UploadValue) =>
  files?.map((f) => f.id).join(',') || ''

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
    variant = 'normal',
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

  // Use identifier instead of id when in an Iterate context to ensure each instance has its own file state
  const uploadId = props.itemPath ? identifier : id
  const { files, setFiles } = useUpload(uploadId)

  const labelWithItemNo = useIterateItemNo({
    label: label ?? title,
    labelSuffix: props.labelSuffix,
    required: props.required,
  })

  const filesRef = useRef<Array<UploadFile>>()
  const lastHandleChangeValueRef = useRef<string>()

  useEffect(() => {
    filesRef.current = files
  }, [files])

  // Helper to update files and notify parent
  const updateFiles = useCallback(
    (newFiles: UploadValue) => {
      setFiles(newFiles)
      lastHandleChangeValueRef.current = getFileIdsKey(newFiles)
      handleChange(newFiles)
    },
    [setFiles, handleChange]
  )

  const syncExternalValue = useCallback(
    (externalValue: UploadValue) => {
      const valueKey = getFileIdsKey(externalValue)

      // Skip echo updates (our own updates coming back)
      if (lastHandleChangeValueRef.current === valueKey) return

      const hasLoadingInValue = externalValue?.some((f) => f.isLoading)
      const hasResolvedInCurrent = filesRef.current?.some(
        (f) => !f.isLoading && f.id
      )

      // Skip stale updates with loading files when we already have resolved files
      if (hasLoadingInValue && hasResolvedInCurrent) return

      // Check for files that need to be preserved (loading or error files)
      const currentFiles = filesRef.current || []
      const pendingFiles = currentFiles.filter(
        (f) => f.isLoading || f.errorMessage
      )

      // Early return if no files to preserve
      if (!pendingFiles.length) {
        setFiles(externalValue)
        return
      }

      // Merge: keep external files and append any pending files not in external value
      const externalIds = new Set(externalValue?.map((f) => f.id) || [])
      const missingInExternal = pendingFiles.filter(
        (f) => !externalIds.has(f.id)
      )

      setFiles(
        missingInExternal.length
          ? [...(externalValue || []), ...missingInExternal]
          : externalValue
      )
    },
    [setFiles]
  )

  useEffect(() => {
    syncExternalValue(value)
  }, [syncExternalValue, value])

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
          // Set loading - update data context and local state without triggering user's onChange
          const newFilesLoading = newFiles.map((file) => ({
            ...file,
            isLoading: !file.errorMessage,
          }))
          const filesWithLoading = [
            ...filesRef.current,
            ...newFilesLoading,
          ]
          setFiles(filesWithLoading)
          dataContext?.handlePathChangeUnvalidated?.(identifier, filesWithLoading)

          const incomingFiles = await fileHandler(newValidFiles)

          if (!incomingFiles) {
            updateFiles(existingFiles)
          } else {
            // merge incoming files into existing order of newFiles.
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
              } else {
                // if there's more files incoming than there's files loading (edge case), add them to end of array.
                newFilesLoading.push(incomingFileObj)
              }
            })

            const currentFiles = filesRef.current
            const indexOfFirstNewFile = currentFiles.findIndex(
              ({ id }) => id === newFiles[0].id
            )

            const updatedFiles = [
              ...currentFiles.slice(0, indexOfFirstNewFile),
              ...(newFilesLoading?.filter((file) => file != null) ?? []),
              ...currentFiles.slice(
                indexOfFirstNewFile + newFilesLoading.length
              ),
            ]
            updateFiles(updatedFiles)
          }
        } finally {
          setFieldState?.(fieldIdentifier, undefined)
        }
      } else {
        updateFiles(files)
      }
    },
    [
      identifier,
      fileHandler,
      setFieldInternals,
      setFieldState,
      setFiles,
      dataContext,
      updateFiles,
    ]
  )

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      const changeValue = files?.length === 0 ? undefined : files
      // Prevents the form-status from showing up
      handleBlur()
      handleFocus()

      if (fileHandler) {
        handleChangeAsync(changeValue)
      } else {
        updateFiles(changeValue)
      }
    },
    [handleBlur, handleFocus, fileHandler, handleChangeAsync, updateFiles]
  )

  const width = widthProp as FieldBlockWidth
  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input`,
    labelSrOnly: true,
    className: classnames('dnb-forms-field-upload', className),
    width,
    help: undefined,
    ...pickSpacingProps(props),
  }

  const usedLabelDescription = labelDescription ?? text

  return (
    <FieldBlock {...fieldBlockProps}>
      <Upload
        id={uploadId}
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

UploadComponent._supportsSpacingProps = true

export function transformFiles(value: UploadValue) {
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
