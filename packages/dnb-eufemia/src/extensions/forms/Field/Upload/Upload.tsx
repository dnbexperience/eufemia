import React, { useCallback, useEffect, useMemo } from 'react'
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
  >

const validateRequired = (
  value: UploadValue,
  { required, isChanged, error }
) => {
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

  const { setFiles } = useUpload(id)

  useEffect(() => {
    setFiles(value)
  }, [setFiles, value])

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      // Prevents the form-status from showing up
      handleBlur()
      handleFocus()
      handleChange(files)
    },
    [handleBlur, handleChange, handleFocus]
  )

  const width = widthProp as FieldBlockWidth
  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input`,
    labelSrOnly: true,
    className,
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

UploadComponent._supportsSpacingProps = true
