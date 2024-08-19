import React, { useCallback, useContext, useMemo } from 'react'
import SectionContext, { SectionContextState } from './SectionContext'
import DataContext from '../../DataContext/Context'
import Provider from '../../DataContext/Provider/Provider'
import FieldPropsProvider from '../FieldProps'
import SectionContainerProvider from './containers/SectionContainerProvider'
import ViewContainer from './ViewContainer'
import EditContainer from './EditContainer'

import type { Props as DataContextProps } from '../../DataContext/Provider'
import type { ContainerMode } from './containers/SectionContainer'
import type {
  FieldBlockProps,
  Path,
  FieldProps,
  OnChange,
} from '../../types'

export type OverwritePropsDefaults = {
  [key: Path]: (FieldProps & FieldBlockProps) | OverwritePropsDefaults
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
   * Defines the container mode. Can be `view` or `edit`.
   * Defaults to `view`.
   */
  containerMode?: ContainerMode

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
    containerMode = 'view',
    onChange,
    errorPrioritization = ['contextSchema'],
    children,
  } = props

  if (path && !path.startsWith?.('/')) {
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
      <SectionContainerProvider containerMode={containerMode}>
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
      </SectionContainerProvider>
    </SectionContext.Provider>
  )
}

SectionComponent.ViewContainer = ViewContainer
SectionComponent.EditContainer = EditContainer

SectionComponent._supportsSpacingProps = undefined
export default SectionComponent
