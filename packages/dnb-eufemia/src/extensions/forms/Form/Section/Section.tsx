import React, { useCallback, useContext, useMemo } from 'react'
import SectionContext, { SectionContextState } from './SectionContext'
import DataContext from '../../DataContext/Context'
import Provider from '../../DataContext/Provider/Provider'
import FieldPropsProvider from '../FieldProps'

import type { Props as DataContextProps } from '../../DataContext/Provider'
import type {
  FieldSectionProps,
  Path,
  FieldProps,
  OnChange,
} from '../../types'

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
   * Makes all fields inside it required.
   */
  required?: boolean

  /**
   * Only for internal use and undocumented for now.
   * Prioritize error techniques for the section.
   * Can be `fieldSchema`, `sectionSchema` or `contextSchema.
   */
  errorPrioritization?: SectionContextState['errorPrioritization']
} & Pick<
  DataContextProps<unknown>,
  'data' | 'defaultData' | 'onChange' | 'translations'
>

export type LocalProps = SectionProps & {
  children: React.ReactNode
}

function SectionComponent(props: LocalProps) {
  const {
    path,
    overwriteProps,
    translations,
    required,
    data,
    defaultData,
    onChange,
    errorPrioritization = ['contextSchema'],
    children,
  } = props

  if (path && !path.startsWith('/')) {
    throw new Error(`path="${path}" must start with a slash`)
  }

  const { hasContext, addOnChangeHandler } = useContext(DataContext)

  const { path: nestedPath, props: nestedProps } =
    useContext(SectionContext) || {}

  const handleChange = useCallback<OnChange<unknown>>(
    (...args) => onChange?.(...args),
    [onChange]
  )
  addOnChangeHandler?.(handleChange)

  const identifier = useMemo(() => {
    return `${nestedPath && nestedPath !== '/' ? nestedPath : ''}${
      path || ''
    }`
  }, [path, nestedPath])
  const fieldProps = required ? { required: true } : undefined

  if (!hasContext) {
    return (
      <Provider data={data} defaultData={defaultData}>
        <SectionComponent {...props} />
      </Provider>
    )
  }

  return (
    <SectionContext.Provider
      value={{
        path: identifier,
        errorPrioritization,
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
