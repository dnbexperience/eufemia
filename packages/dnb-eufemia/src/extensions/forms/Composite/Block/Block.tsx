import React, { useCallback, useRef } from 'react'
import pointer from 'json-pointer'
import CompositeContext, {
  CompositeContextState,
} from '../CompositeContext'
import FieldPropsProvider from '../../Form/FieldProps'

import type { FieldBlockProps, Path, FieldProps } from '../../types'

export type OverwritePropsDefaults = {
  [key: Path]: FieldProps & FieldBlockProps
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
    required,
    onChange,
    errorPrioritization = ['contextSchema'],
    children,
  } = props
  const dataRef = useRef<unknown>({})

  if (path && !path.startsWith('/')) {
    throw new Error(`path="${path}" must start with a slash`)
  }

  const handleChange = useCallback(
    (path: Path, value: unknown) => {
      pointer.set(dataRef.current, path, value)
      onChange?.(dataRef.current)
    },
    [onChange]
  )

  const fieldProps = required ? { required: true } : undefined

  return (
    <CompositeContext.Provider
      value={{ path, errorPrioritization, handleChange }}
    >
      <FieldPropsProvider overwriteProps={overwriteProps} {...fieldProps}>
        {children}
      </FieldPropsProvider>
    </CompositeContext.Provider>
  )
}

BlockComponent._supportsSpacingProps = true
export default BlockComponent
