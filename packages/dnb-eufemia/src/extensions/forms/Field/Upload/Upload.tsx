import React, { useCallback, useEffect, useMemo, useRef } from 'react'
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

export type { UploadFile, UploadFileNative }
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
    | 'onFileClick'
    | 'skeleton'
    | 'download'
  > & {
    fileHandler?: (
      newFiles: UploadValue
    ) => UploadValue | Promise<UploadValue>
  }

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

  const fromInput = useCallback((value: UploadValue) => {
    value.forEach((item, index) => {
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
    handleChange,
    handleFocus,
    handleBlur,
    fileHandler,
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
    onFileClick,
  } = rest

  const { files, setFiles } = useUpload(id)

  const filesRef = useRef<Array<UploadFile>>()

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => {
    setFiles(value)
  }, [setFiles, value])

  const handleChangeAsync = useCallback(
    async (files: UploadValue) => {
      // Filter out existing files
      const existingFileIds =
        filesRef.current?.map((file) => file.id) || []
      const newFiles = files.filter(
        (file) => !existingFileIds.includes(file.id)
      )
      const newValidFiles = newFiles.filter((file) => !file.errorMessage)

      if (newValidFiles.length > 0) {
        // Set loading
        const newFilesLoading = newFiles.map((file) => ({
          ...file,
          isLoading: !file.errorMessage,
        }))
        setFiles([...filesRef.current, ...newFilesLoading])

        const incomingFiles = await fileHandler(newValidFiles)
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

        const indexOfFirstNewFile = filesRef.current.findIndex(
          ({ id }) => id === newFiles[0].id
        )

        const updatedFiles = [
          ...filesRef.current.slice(0, indexOfFirstNewFile),
          ...newFilesLoading,
          ...filesRef.current.slice(indexOfFirstNewFile + newFiles.length),
        ]

        // Set error, if any
        handleChange(updatedFiles)
      } else {
        handleChange(files)
      }
    },
    [setFiles, fileHandler, handleChange]
  )

  const changeHandler = useCallback(
    ({ files }: { files: UploadValue }) => {
      // Prevents the form-status from showing up
      handleBlur()
      handleFocus()

      if (fileHandler) {
        handleChangeAsync(files)
      } else {
        handleChange(files)
      }
    },
    [handleBlur, handleFocus, fileHandler, handleChangeAsync, handleChange]
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
        onFileClick={onFileClick}
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

export function transformFiles(value: UploadValue) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined
    }

    value.map((item) => {
      if (item?.file && !(item.file instanceof File)) {
        // To support session storage, we recreated the file blob.
        item['file'] = new File([], item['name'])
      }
      return item
    })
  }

  return value
}
