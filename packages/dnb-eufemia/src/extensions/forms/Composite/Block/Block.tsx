import React, { useCallback, useContext, useMemo, useRef } from 'react'
import pointer from 'json-pointer'
import CompositeContext, {
  CompositeContextState,
} from '../CompositeContext'
import FieldPropsProvider from '../../Form/FieldProps'

import type { Props as DataContextProps } from '../../DataContext/Provider'
import type { FieldBlockProps, Path, FieldProps } from '../../types'

export type OverwritePropsDefaults = {
  [key: Path]: (FieldProps & FieldBlockProps) | OverwritePropsDefaults
}
export type BlockProps<overwriteProps = OverwritePropsDefaults> = {
  /**
   * Path to the block.
   * When defined, fields inside the block will get this path as a prefix of their own path.
   */
  path?: Path

  /**
   * Overwrite field props for the block.
   */
  overwriteProps?: overwriteProps | OverwritePropsDefaults

  /**
   * Provide your own translations. Use the same format as defined in the translation files
   */
  translations?: DataContextProps<unknown>['translations']

  /**
   * Makes all fields inside it required.
   */
  required?: boolean

  /**
   * Callback when fields in the block are changed.
   */
  onChange?: (data: unknown) => void

  /**
   * Only for internal use and undocumented for now.
   * Prioritize error techniques for the block.
   * Can be `fieldSchema`, `blockSchema` or `contextSchema.
   */
  errorPrioritization?: CompositeContextState['errorPrioritization']
}

export type LocalProps = BlockProps & {
  children: React.ReactNode
}

function BlockComponent(props: LocalProps) {
  const {
    path,
    overwriteProps,
    translations,
    required,
    onChange,
    errorPrioritization = ['contextSchema'],
    children,
  } = props

  if (path && !path.startsWith('/')) {
    throw new Error(`path="${path}" must start with a slash`)
  }

  const {
    path: nestedPath,
    handleChange: handleNestedChange,
    props: nestedProps,
  } = useContext(CompositeContext) || {}

  const dataRef = useRef<unknown>({})
  const handleChange = useCallback(
    (path: Path, value: unknown) => {
      pointer.set(dataRef.current, path, value)
      onChange?.(dataRef.current)
      handleNestedChange?.(path, value)
    },
    [handleNestedChange, onChange]
  )

  const identifier = useMemo(() => {
    return `${nestedPath && nestedPath !== '/' ? nestedPath : ''}${
      path || ''
    }`
  }, [path, nestedPath])
  const fieldProps = required ? { required: true } : undefined

  return (
    <CompositeContext.Provider
      value={{
        path: identifier,
        errorPrioritization,
        handleChange,
        props,
      }}
    >
      <FieldPropsProvider
        overwriteProps={{
          ...overwriteProps,
          ...(nestedProps?.overwriteProps?.[
            path.substring(1)
          ] as OverwritePropsDefaults),
        }}
        translations={translations}
        {...fieldProps}
      >
        {children}
      </FieldPropsProvider>
    </CompositeContext.Provider>
  )
}

BlockComponent._supportsSpacingProps = 'children'
export default BlockComponent
