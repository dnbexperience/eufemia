import React, { useCallback, useContext, useMemo, useRef } from 'react'
import pointer from 'json-pointer'
import SectionContext, { SectionContextState } from './SectionContext'
import FieldPropsProvider from '../FieldProps'

import type { Props as DataContextProps } from '../../DataContext/Provider'
import type { FieldSectionProps, Path, FieldProps } from '../../types'

export type OverwritePropsDefaults = {
  [key: Path]: (FieldProps & FieldSectionProps) | OverwritePropsDefaults
}
export type SectionProps<overwriteProps = OverwritePropsDefaults> = {
  /**
   * Path to the section.
   * When defined, fields inside the section will get this path as a prefix of their own path.
   */
  path?: Path

  /**
   * Overwrite field props for the section.
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
   * Callback when fields in the section are changed.
   */
  onChange?: (data: unknown) => void

  /**
   * Only for internal use and undocumented for now.
   * Prioritize error techniques for the section.
   * Can be `fieldSchema`, `sectionSchema` or `contextSchema.
   */
  errorPrioritization?: SectionContextState['errorPrioritization']
}

export type LocalProps = SectionProps & {
  children: React.ReactNode
}

function SectionComponent(props: LocalProps) {
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
  } = useContext(SectionContext) || {}

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
    <SectionContext.Provider
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
    </SectionContext.Provider>
  )
}

SectionComponent._supportsSpacingProps = 'children'
export default SectionComponent

/**
 * @deprecated use "Form.Section" instead of "Composite.Block"
 */
export function Block(props: LocalProps) {
  return <SectionComponent {...props} />
}
