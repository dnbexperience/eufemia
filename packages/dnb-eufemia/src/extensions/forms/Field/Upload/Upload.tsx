import React, { useCallback, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import {
  useFieldProps,
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
} from '../../../../components/help-button/HelpButtonInline'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import { SpacingProps } from '../../../../shared/types'
import { FormError } from '../../utils'

export type UploadValue = Array<UploadFile | UploadFileNative>
export type Props = Omit<
  FieldProps<UploadValue, UploadValue | undefined>,
  'name'
> &
  SpacingProps & {
    width?: Omit<FieldBlockWidth, 'medium' | 'small'>
  } & Pick<
    Partial<UploadProps>,
    | 'title'
    | 'text'
    | 'acceptedFileTypes'
    | 'filesAmountLimit'
    | 'fileMaxSize'
    | 'onFileDelete'
    | 'skeleton'
  > & {
    asyncFileHandler?: (newFiles: UploadValue) => Promise<UploadValue>
  }

const validateRequired = (
  value: UploadValue,
  { required, isChanged, error }
) => {
  console.log('validateRequired')
  console.log(value)
  const hasError = value?.some((file) => file.errorMessage)
  if (hasError) {
    return new FormError('Upload.errorInvalidFiles')
  }

  const hasFiles = value?.length > 0
  if (required && ((!isChanged && !hasFiles) || !hasFiles)) {
    return error
  }

  return undefined
}

const updateFileLoadingState = (
  files: UploadValue,
  isLoading: boolean
) => {
  return files.map((file) => ({ ...file, isLoading }))
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

  const preparedProps = {
    errorMessages,
    validateRequired,
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
    handleChange,
    handleFocus,
    handleBlur,
    asyncFileHandler,
    ...rest
  } = useFieldProps(preparedProps, {
    executeOnChangeRegardlessOfError: true,
  })

  // Upload props
  const {
    title = sharedTr.title,
    text = sharedTr.text,
    acceptedFileTypes = ['pdf', 'png', 'jpg', 'jpeg'],
    filesAmountLimit = 100,
    fileMaxSize = 5,
    skeleton,
    onFileDelete,
  } = rest

  const { files: fileContext, setFiles } = useUpload(id)

  useEffect(() => {
    validateRequired(value)
  }, [setFiles, value])

  const handleChangeAsync = useCallback(
    async (files: UploadValue) => {
      // Filter out existing files
      const existingFileIds = fileContext?.map((file) => file.id) || []
      const newFiles = files.filter(
        (file) => !existingFileIds.includes(file.id)
      )

      if (newFiles.length > 0) {
        // Set loading
        setFiles([
          ...fileContext,
          ...updateFileLoadingState(newFiles, true),
        ])

        const uploadedFiles = updateFileLoadingState(
          await asyncFileHandler(newFiles),
          false
        )

        handleChange([...fileContext, ...uploadedFiles])
      } else {
        handleChange(files)
      }
    },
    [fileContext, asyncFileHandler, setFiles, updateFileLoadingState]
  )

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      // Prevents the form-status from showing up
      handleBlur()
      handleFocus()

      if (asyncFileHandler) {
        handleChangeAsync(files)
      } else {
        handleChange(files)
      }
    },
    [handleBlur, handleChange, handleFocus, asyncFileHandler, fileContext]
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

  return (
    <FieldBlock {...fieldBlockProps}>
      <Upload
        id={id}
        acceptedFileTypes={acceptedFileTypes}
        filesAmountLimit={filesAmountLimit}
        fileMaxSize={fileMaxSize}
        skeleton={skeleton}
        onChange={changeHandler}
        onFileDelete={onFileDelete}
        title={label ?? title}
        text={
          help ? (
            <>
              {labelDescription ?? text}
              <HelpButtonInline
                contentId={`${id}-help`}
                left={text ? 'x-small' : false}
                help={help}
              />
            </>
          ) : (
            labelDescription ?? text
          )
        }
        {...htmlAttributes}
      >
        {help && (
          <HelpButtonInlineContent contentId={`${id}-help`} help={help} />
        )}
      </Upload>
    </FieldBlock>
  )
}

export default UploadComponent

UploadComponent.useUpload = Upload.useUpload
UploadComponent._supportsSpacingProps = true
