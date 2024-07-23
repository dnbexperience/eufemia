import React, { useCallback, useEffect } from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import {
  useFieldProps,
  useTranslation as useFormsTranslation,
} from '../../hooks'
import {
  FieldBlockWidth,
  FieldHelpProps,
  FieldProps,
  FormError,
} from '../../types'
import Upload, {
  UploadFile,
  UploadProps,
} from '../../../../components/Upload'
import useUpload from '../../../../components/upload/useUpload'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { HelpButton } from '../../../../components'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import { SpacingProps } from '../../../../shared/types'

export type UploadValue = Array<UploadFile>
export type Props = FieldHelpProps &
  Omit<FieldProps<UploadValue, UploadValue | undefined>, 'name'> &
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

function UploadComponent(props: Props) {
  const validateRequired = useCallback(
    (value: UploadValue, { required, isChanged, error }) => {
      const hasError = value?.some((file) => file.errorMessage)
      if (hasError) {
        return new FormError(error.message, {
          validationRule: 'invalid',
        })
      }

      if (required && (!isChanged || !(value.length > 0))) {
        return error
      }

      return undefined
    },
    []
  )

  const sharedTr = useSharedTranslation().Upload
  const formsTr = useFormsTranslation().Upload

  const preparedProps = {
    errorMessages: {
      required: formsTr.errorRequired,
      invalid: formsTr.errorInvalidFiles,
    },
    validateRequired,
    ...props,
  }

  const {
    id,
    className,
    width: widthProp = 'stretch',
    layout,
    value,
    label,
    labelDescription,
    disabled,
    help,
    info,
    warning,
    error,
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
  }, [handleBlur, setFiles, value])

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
    forId: id,
    layout,
    label,
    labelSrOnly: true,
    info,
    warning,
    error,
    className,
    disabled,
    width,
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
              <HelpButton
                left={text ? 'x-small' : false}
                title={help.title}
              >
                {help.content}
              </HelpButton>
            </>
          ) : (
            labelDescription ?? text
          )
        }
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

export default UploadComponent

UploadComponent._supportsSpacingProps = true
