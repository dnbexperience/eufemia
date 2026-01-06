import React, { useCallback, useContext, useMemo, useRef } from 'react'
import SectionContext, { SectionContextState } from './SectionContext'
import DataContext from '../../DataContext/Context'
import Provider from '../../DataContext/Provider/Provider'
import FieldPropsProvider from '../../Field/Provider'
import SectionContainerProvider from './containers/SectionContainerProvider'
import ViewContainer from './ViewContainer'
import EditContainer from './EditContainer'
import Toolbar from './Toolbar'
import { cleanPath } from '../../hooks/usePath'

import type { Props as DataContextProps } from '../../DataContext/Provider'
import type { ContainerMode } from './containers/SectionContainer'
import type { Path, FieldProps, OnChange, Schema } from '../../types'
import type { JsonObject } from '../../utils/json-pointer'
import type { SharedFieldBlockProps } from '../../FieldBlock'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type OverwritePropsDefaults = {
  [key: Path]:
    | (FieldProps & SharedFieldBlockProps)
    | OverwritePropsDefaults
}
export type SectionBaseProps<
  overwriteProps = OverwritePropsDefaults,
  Data extends JsonObject = JsonObject,
> = {
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
   * If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode="auto"`.
   */
  validateInitially?: boolean

  /**
   * Defines the container mode. Can be `view`, `edit` or `auto`.
   * When set to `auto`, the mode will initially be "edit" if fields contain errors.
   * Defaults to `auto`.
   */
  containerMode?: ContainerMode
  /**
   * Disables editing for the section.
   * When set to `true`, the section will stay in view mode even if an EditContainer is provided.
   * Defaults to `false`.
   */
  disableEditing?: boolean

  /**
   * Only for internal use and undocumented for now.
   * Prioritize error techniques for the section.
   * Can be `fieldSchema`, `sectionSchema` or `contextSchema.
   */
  errorPrioritization?: SectionContextState['errorPrioritization']
} & Pick<
  DataContextProps<Data>,
  'data' | 'defaultData' | 'onChange' | 'translations'
>

export type SectionProps<
  overwriteProps = OverwritePropsDefaults,
  Data extends JsonObject = JsonObject,
> = SectionBaseProps<overwriteProps, Data> & {
  /**
   * Schema to validate the section data.
   * Accepts AJV or Zod schemas and behaves like the schema passed to Form.Handler.
   */
  schema?:
    | Schema
    | ((props: SectionBaseProps<overwriteProps, Data>) => Schema)
}

export type LocalProps<overwriteProps = OverwritePropsDefaults> =
  SectionProps<overwriteProps> & {
    children: React.ReactNode
  }

function SectionComponent<overwriteProps = OverwritePropsDefaults>(
  props: LocalProps<overwriteProps>
) {
  const {
    path,
    overwriteProps,
    translations,
    required,
    data,
    defaultData,
    validateInitially,
    containerMode = 'auto',
    disableEditing = false,
    onChange,
    errorPrioritization = ['contextSchema'],
    schema,
    children,
  } = props

  if (path && !path.startsWith?.('/')) {
    throw new Error(`path="${path}" must start with a slash`)
  }

  const { hasContext, addOnChangeHandler, registerSectionSchema } =
    useContext(DataContext)

  const { path: nestedPath, props: nestedProps } =
    useContext(SectionContext) || {}

  const isRootRelativePath = path?.startsWith('//')
  const resolvedPath = useMemo(() => {
    if (!path) {
      return path
    }
    if (isRootRelativePath) {
      return (path.substring(1) || '/') as Path
    }
    return path
  }, [isRootRelativePath, path])

  const identifier = useMemo(() => {
    if (!resolvedPath) {
      return nestedPath || ''
    }

    const nestedPrefix =
      !isRootRelativePath && nestedPath && nestedPath !== '/'
        ? nestedPath
        : ''

    const combinedPath = cleanPath(
      `${nestedPrefix}${resolvedPath}`
    ) as Path
    return combinedPath || '/'
  }, [isRootRelativePath, nestedPath, resolvedPath])

  const handleChange = useCallback<OnChange>(
    (...args) => onChange?.(...args),
    [onChange]
  )
  addOnChangeHandler?.(handleChange)

  const resolvedSchema = useMemo(() => {
    if (!schema) {
      return // stop here
    }
    if (typeof schema === 'function') {
      try {
        return (
          schema as (props: SectionBaseProps<overwriteProps>) => Schema
        )(props)
      } catch (_) {
        return // stop here
      }
    }

    return schema

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema])
  const sectionSchemaIdRef = useRef(Symbol('Form.Section.schema'))

  useLayoutEffect(() => {
    if (!registerSectionSchema || !resolvedSchema) {
      return // stop here
    }

    const normalizedIdentifier = identifier || '/'
    return registerSectionSchema({
      id: sectionSchemaIdRef.current,
      path: normalizedIdentifier,
      schema: resolvedSchema,
    })
  }, [identifier, registerSectionSchema, resolvedSchema])
  const fieldProps = required ? { required: true } : undefined

  if (!hasContext) {
    return (
      <Provider data={data} defaultData={defaultData}>
        <SectionComponent {...props} />
      </Provider>
    )
  }

  const sectionProps = props as SectionProps

  return (
    <SectionContext.Provider
      value={{
        path: identifier,
        errorPrioritization,
        props: sectionProps,
      }}
    >
      <SectionContainerProvider
        validateInitially={validateInitially}
        containerMode={containerMode}
        disableEditing={disableEditing}
      >
        <FieldPropsProvider
          overwriteProps={{
            ...overwriteProps,
            ...(resolvedPath
              ? (nestedProps?.overwriteProps?.[
                  resolvedPath.startsWith('/')
                    ? resolvedPath.substring(1)
                    : resolvedPath
                ] as OverwritePropsDefaults)
              : undefined),
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

SectionComponent.Toolbar = Toolbar
SectionComponent.ViewContainer = ViewContainer
SectionComponent.EditContainer = EditContainer

SectionComponent._supportsSpacingProps = undefined
export default SectionComponent
