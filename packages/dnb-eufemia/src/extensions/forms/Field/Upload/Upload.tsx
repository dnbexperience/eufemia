import React, { useCallback, useContext, useEffect, useRef } from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import {
  useFieldProps,
  useTranslation as useFormsTranslation,
} from '../../hooks'
import { FieldBlockWidth, FieldHelpProps, FieldProps } from '../../types'
import Upload, {
  UploadFile,
  UploadProps,
} from '../../../../components/Upload'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { HelpButton } from '../../../../components'
import DataContext, { ContextState } from '../../DataContext/Context'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import { SpacingProps } from '../../../../shared/types'
import useDataValue from '../../hooks/useDataValue'
import useId from '../../../../shared/helpers/useId'

export type UploadValue = Array<UploadFile>
export type Props = FieldHelpProps &
  Omit<FieldProps<UploadValue>, 'name'> &
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
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)
  const sharedTr = useSharedTranslation().Upload
  const formsTr = useFormsTranslation().Upload

  const id = useId(props.id)
  const { setFiles } = Upload.useUpload(id)
  const { getValue } = useDataValue()

  const validateRequired = useCallback(
    (value: Array<UploadFile>, { required, error }) => {
      if (required) {
        if (Array.isArray(value) && value.length > 0) {
          return undefined
        }

        return error
      }

      return undefined
    },
    []
  )

  const preparedProps = {
    id,
    errorMessages: {
      required: formsTr.errorRequired,
    },
    validateRequired,
    ...props,
  }

  const {
    path,
    className,
    width: widthProp = 'stretch',
    layout,
    label,
    labelDescription,
    disabled,
    help,
    info,
    warning,
    error,
    htmlAttributes,
    handleChange,
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

  useEffect(() => {
    if (path) {
      const files = getValue(path)
      setFiles(files)
    }
  }, [getValue, path, setFiles])

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      handleChange?.(files)
    },
    [handleChange]
  )

  const width = widthProp as FieldBlockWidth
  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    layout,
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
