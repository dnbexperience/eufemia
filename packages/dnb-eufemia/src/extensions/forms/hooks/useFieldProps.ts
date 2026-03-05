import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
  AriaAttributes,
} from 'react'
import pointer from '../utils/json-pointer'
import type { ValidateFunction } from 'ajv/dist/2020.js'
import { isZodSchema } from '../utils'
import * as z from 'zod'
import {
  FieldPropsGeneric,
  ProvideAdditionalEventArgs,
  SubmitState,
  Identifier,
  FieldStatus,
  ReceiveAdditionalEventArgs,
} from '../types'
import { Context as DataContext, ContextState } from '../DataContext'
import { clearedData } from '../DataContext/Provider/Provider'
import FieldProviderContext from '../Field/Provider/FieldProviderContext'
import { combineDescribedBy, warn } from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import FieldBlockContext, {
  FieldBlockContextProps,
} from '../FieldBlock/FieldBlockContext'
import IterateItemContext from '../Iterate/IterateItemContext'
import SectionContext from '../Form/Section/SectionContext'
import FieldBoundaryContext from '../DataContext/FieldBoundary/FieldBoundaryContext'
import VisibilityContext from '../Form/Visibility/VisibilityContext'
import WizardContext from '../Wizard/Context'
import WizardStepContext from '../Wizard/Step/StepContext'
import SnapshotContext from '../Form/Snapshot/SnapshotContext'
import usePath from './usePath'
import SharedContext from '../../../shared/Context'
import {
  createReferenceKey,
  createSharedState,
  useSharedState,
} from '../../../shared/helpers/useSharedState'
import { isAsync } from '../../../shared/helpers/isAsync'
import useTranslation from './useTranslation'
import useExternalValue from './useExternalValue'
import useDataValue from './useDataValue'
import useFieldTransform from './useFieldTransform'
import type { TransformerFns } from './useFieldTransform'
import useFieldError, { resolveValidatingState } from './useFieldError'
import useFieldAsync from './useFieldAsync'
import useFieldValidation from './useFieldValidation'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../shared/helpers/useIsomorphicLayoutEffect'

export type DataAttributes = {
  [property: `data-${string}`]: string | boolean | number
}

// Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
// useEffect depend on them (like the external `value`)

export default function useFieldProps<Value, EmptyValue, Props>(
  localProps: Props & FieldPropsGeneric<Value, EmptyValue>,
  {
    executeOnChangeRegardlessOfError = false,
    executeOnChangeRegardlessOfUnchangedValue = false,
    updateContextDataInSync = false,
    omitMultiplePathWarning = false,
    forceUpdateWhenContextDataIsSet = false,
    omitSectionPath = false,
  } = {}
): typeof localProps & ReturnAdditional<Value> {
  const { extend } = useContext(FieldProviderContext)
  const props = extend(localProps)

  const {
    path: pathProp,
    value: valueProp,
    defaultValue,
    itemPath,
    emptyValue,
    required: requiredProp,
    disabled: disabledProp,
    readOnly,
    info: infoProp,
    warning: warningProp,
    error: initialErrorProp = 'initial',
    errorMessages,
    onStatusChange,
    onFocus,
    onBlur,
    onChange,
    onBlurValidator,
    onChangeValidator: onChangeValidatorProp,
    exportValidators,
    schema,
    validateInitially,
    validateUnchanged,
    validateContinuously,
    transformIn = (external: unknown) => external as Value,
    transformOut = (internal: Value) => internal,
    toInput = (value: Value) => value,
    fromInput = (value: Value) => value,
    toEvent = (value: Value) => value,
    transformValue = (value: Value) => value,
    provideAdditionalArgs = (
      value: Value,
      additionalArgs: ProvideAdditionalEventArgs
    ) => additionalArgs,
    fromExternal = (value: Value) => value,
    validateRequired = (value, { emptyValue, required, error }) => {
      if (
        required &&
        ((value as unknown) === emptyValue ||
          (typeof emptyValue === 'undefined' && value === ''))
      ) {
        return error
      }
    },
  } = props

  const [salt, forceUpdate] = useReducer(() => ({}), {})
  const isInternalRerenderRef = useRef(undefined)
  useMemo(() => {
    /**
     * This is currently not used, but we keep it here for future use.
     * It lets you check for isInternalRerenderRef.current !== undefined
     * inside a useUpdateEffect or useEffect to know if the component is rerendering from inside or outside.
     */
    isInternalRerenderRef.current = salt
  }, [salt])
  const id = useId(props.id)
  const dataContext = useContext(DataContext)
  const { locale: sharedLocale } = useContext(SharedContext) || {}
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateItemContext = useContext(IterateItemContext)
  const sectionContext = useContext(SectionContext)
  const fieldBoundaryContext = useContext(FieldBoundaryContext)
  const wizardContext = useContext(WizardContext)
  const wizardStepContext = useContext(WizardStepContext)
  const { setMountedField: setMountedFieldSnapshot } =
    useContext(SnapshotContext) || {}
  const { isVisible, keepInDOM } = useContext(VisibilityContext) || {}
  const handleFieldAsVisible = isVisible || keepInDOM

  const { getValueByPath, getSourceValue } = useDataValue()
  const translation = useTranslation()
  const { formatMessage } = translation
  const translationRef = useRef(translation)
  translationRef.current = translation

  const {
    handlePathChangeUnvalidated: handlePathChangeUnvalidatedDataContext,
    handlePathChange: handlePathChangeDataContext,
    updateDataValue: updateDataValueDataContext,
    validateData: validateDataDataContext,
    setFieldState: setFieldStateDataContext,
    setFieldError: setFieldErrorDataContext,
    setFieldInternals: setFieldInternalsDataContext,
    setFieldConnection: setFieldConnectionDataContext,
    revealError: revealErrorDataContext,
    setMountedFieldState: setMountedFieldStateDataContext,
    getAjvInstance: getAjvInstanceDataContext,
    setFieldEventListener,
    errors: dataContextErrors,
    showAllErrors,
    contextErrorMessages,
    fieldDisplayValueRef,
    existingFieldsRef,
    fieldInternalsRef,
    mountedFieldsRef,
    sectionSchemaPathsRef,
    prerenderFieldProps,
    hasContext: hasDataContext,
  } = dataContext || {}
  const onChangeContext = dataContext?.props?.onChange
  const locale = dataContext?.props?.locale ?? sharedLocale

  const disabled = disabledProp ?? readOnly
  const inFieldBlock = Boolean(
    fieldBlockContext && fieldBlockContext.disableStatusSummary !== true
  )

  // Support schema as a factory function evaluated after props are extended
  const resolvedSchema = useMemo(() => {
    const s = schema as unknown
    if (typeof s === 'function') {
      try {
        return (s as (p: typeof props) => unknown)(props) as unknown
      } catch (_) {
        return undefined
      }
    }
    return s

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema])
  const finalSchema = useMemo(() => {
    const s = resolvedSchema
    if (typeof s === 'function') {
      try {
        return s(props)
      } catch (_) {
        return undefined
      }
    }
    return s

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedSchema])
  const hasZodSchema = isZodSchema(finalSchema)
  const {
    setBlockRecord,
    setFieldState: setFieldStateFieldBlock,
    showFieldError: showFieldErrorFieldBlock,
    mountedFieldsRef: mountedFieldsRefFieldBlock,
  } = (inFieldBlock ? fieldBlockContext : {}) as FieldBlockContextProps
  const {
    activeIndex,
    activeIndexRef,
    setFieldError: setFieldErrorWizard,
  } = wizardContext || {}
  const { index: wizardIndex } = wizardStepContext || {}
  const {
    handleChange: handleChangeIterateContext,
    index: iterateIndex,
    arrayValue: iterateArrayValue,
    nestedIteratePath,
  } = iterateItemContext || {}
  const { path: sectionPath, errorPrioritization } = sectionContext || {}
  const {
    setFieldError: setFieldErrorBoundary,
    revealError: revealErrorBoundary,
    showBoundaryErrors,
  } = fieldBoundaryContext || {}

  const hasPath = Boolean(pathProp)
  const isParentRelativePath =
    typeof pathProp === 'string' && pathProp.startsWith('../')
  const hasItemPath = Boolean(itemPath)
  const { path, identifier, makeIteratePath, joinPath, cleanPath } =
    usePath({
      id,
      path: pathProp,
      itemPath,
      omitSectionPath,
    })

  const sectionSchemaPaths = sectionSchemaPathsRef?.current
  const hasSectionSchema = Boolean(
    sectionSchemaPaths?.size &&
      identifier &&
      Array.from(sectionSchemaPaths).some((sectionSchemaPath) => {
        if (sectionSchemaPath === '/') {
          return true
        }
        return (
          identifier === sectionSchemaPath ||
          identifier.startsWith(`${sectionSchemaPath}/`)
        )
      })
  )

  const defaultValueRef = useRef(defaultValue)
  useLayoutEffect(() => {
    // To support React.StrictMode, we also need to add it from inside a useEffect
    defaultValueRef.current = defaultValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
  // useEffect depend on them (like the external `value`)

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  // Internal mutable value reference – explicitly typed to Value
  const valueRef = useRef<Value>(undefined as Value)
  const changedRef = useRef<boolean>(undefined)
  const hasFocusRef = useRef<boolean>(undefined)

  // ─── useFieldTransform ───────────────────────────────────────────────

  const { transformers, getEventArgs } = useFieldTransform<Value>({
    transformIn: transformIn as TransformerFns<Value>['transformIn'],
    transformOut,
    toInput: toInput as TransformerFns<Value>['toInput'],
    fromInput,
    toEvent,
    transformValue,
    provideAdditionalArgs,
    fromExternal,
    validateRequired,
    valueRef,
  })

  const tmpValue = useExternalValue<Value>({
    path: identifier,
    itemPath,
    value: valueProp,
    transformers,
    emptyValue: defaultValue ? undefined : emptyValue,
  })
  const externalValueDeps = tmpValue

  // Ensure externalValue is strongly typed as Value (transformIn returns Value by contract)
  const externalValue: Value = transformers.current.transformIn(
    tmpValue ?? defaultValueRef.current
  ) as Value

  // Initialize valueRef with externalValue on first render (useRef only uses
  // its initializer once, so we set it synchronously here).
  const valueInitializedRef = useRef(false)
  if (!valueInitializedRef.current) {
    valueInitializedRef.current = true
    valueRef.current = externalValue
  }

  // Warn if a field uses a JSON Schema inside Form.Handler without an explicit ajvInstance prop.
  // Skip this warning for internally generated schemas (e.g. from Iterate.Array minItems/maxItems).
  useEffect(() => {
    if (
      finalSchema &&
      !hasZodSchema &&
      // Do not warn for internally generated schemas
      !omitMultiplePathWarning &&
      // Only warn when running inside a Provider (Form.Handler)
      hasDataContext &&
      !dataContext?.props?.ajvInstance
    ) {
      warn(
        `Field${
          identifier ? ` (${identifier})` : ''
        } received a JSON Schema but no ajvInstance was provided to Form.Handler. Provide "ajvInstance" on Form.Handler.`
      )
    }
  }, [
    finalSchema,
    hasZodSchema,
    identifier,
    hasDataContext,
    dataContext?.props?.ajvInstance,
    omitMultiplePathWarning,
  ])

  const required = useMemo(() => {
    if (typeof requiredProp !== 'undefined') {
      return requiredProp
    }

    if (schema || dataContext?.schema) {
      const paths = identifier.split('/')
      if (paths.length > 0) {
        const requiredInSchema = [schema?.['required']]

        // - Handle context schema
        if (paths.length > 1) {
          const schema = dataContext.schema
          const pathWithoutLast = paths.slice(0, -1).join('/properties/')
          const schemaPart = pointer.has(schema, pathWithoutLast)
            ? pointer.get(schema, pathWithoutLast)
            : schema

          const requiredSchemaList = schemaPart?.['required']
          if (Array.isArray(requiredSchemaList)) {
            const rootPath = pathWithoutLast.replace(/properties\//g, '')
            const requiredList = requiredSchemaList.map((path) => {
              path = cleanPath('/' + path)
              return sectionPath && path.startsWith(sectionPath)
                ? path
                : joinPath([sectionPath || rootPath, path])
            })
            requiredInSchema.push(requiredList)
          }
        }

        const collected = requiredInSchema
          .flatMap((value) => value)
          .filter(Boolean)

        if (
          collected.filter(Boolean).some((path) => {
            path = cleanPath('/' + path)
            return identifier === path || sectionPath === path
          })
        ) {
          return true
        }
      }
    }
  }, [
    cleanPath,
    dataContext.schema,
    identifier,
    joinPath,
    requiredProp,
    schema,
    sectionPath,
  ])

  const getFieldByPath = useCallback(
    (path) => {
      return (
        fieldInternalsRef.current?.[path] || {
          props: undefined,
          id: undefined,
        }
      )
    },
    [fieldInternalsRef]
  )

  // Shared schema validator ref — used by both useFieldError (clearErrorState) and useFieldValidation
  const schemaValidatorRef = useRef<
    ValidateFunction | ((value: unknown) => true | z.ZodError<unknown>)
  >(undefined)

  // ─── useFieldError ───────────────────────────────────────────────────

  const {
    error,
    warning,
    info,
    combinedErrorMessages,
    bufferedError,
    bufferedErrorRef,
    errorIsVisible: errorIsVisibleBase,
    ensureErrorMessageObject,
    prepareError,
    persistErrorState,
    clearErrorState,
    revealError,
    hideError,
    setFieldState,
    hasError,
    handleError,
    revealErrorRef,
    localErrorRef,
    localErrorInitiatorRef,
    contextErrorRef,
    fieldStateRef,
    warningRef,
    infoRef,
  } = useFieldError<Value>({
    initialErrorProp,
    warningProp,
    infoProp,
    errorMessages,
    validateInitially,
    validateContinuously,
    disabled,
    identifier,
    locale,
    handleFieldAsVisible,
    inFieldBlock,
    prerenderFieldProps,
    updateContextDataInSync,
    hasZodSchema,
    setFieldStateDataContext,
    setFieldStateFieldBlock,
    setFieldErrorDataContext,
    setFieldErrorBoundary,
    setFieldErrorWizard,
    setBlockRecord,
    showFieldErrorFieldBlock,
    revealErrorDataContext,
    revealErrorBoundary,
    wizardIndex,
    dataContextErrors,
    contextErrorMessages: contextErrorMessages as Record<string, unknown>,
    valueRef,
    hasFocusRef,
    isInternalRerenderRef,
    schemaValidatorRef,
    translationRef,
    formatMessage,
    getFieldByPath,
    getValueByPath,
    forceUpdate,
  })

  const errorIsVisible =
    errorIsVisibleBase || (inFieldBlock && fieldBlockContext.hasErrorProp)

  // ─── useFieldAsync ───────────────────────────────────────────────────

  // Ref used to break the circular dependency between useFieldAsync and useFieldValidation.
  // useFieldAsync needs removeError (which calls validateValue from useFieldValidation),
  // but useFieldValidation hasn't been called yet. The ref is populated after both hooks run.
  const removeErrorRef = useRef<() => void>(() => {})

  const {
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    addToPool,
    runPool,
    yieldAsyncProcess,
    setEventResult,
    callOnChangeContext,
    asyncProcessRef,
    validatedValueRef,
    changeEventResultRef,
  } = useFieldAsync<Value>({
    onChange,
    onChangeContext,
    valueRef,
    forceUpdate,
    persistErrorState,
    revealError,
    setFieldState,
    hasError,
    warningRef,
    infoRef,
    fieldStateRef,
    removeErrorRef,
    hasPath,
    identifier,
    executeOnChangeRegardlessOfError,
    handlePathChangeDataContext: handlePathChangeDataContext as any,
  })

  // ─── useFieldValidation ──────────────────────────────────────────────

  const {
    validateValue,
    startOnChangeValidatorValidation,
    startOnBlurValidatorProcess,
    onChangeValidatorRef,
    onBlurValidatorRef,
    additionalArgs,
  } = useFieldValidation<Value>({
    finalSchema,
    hasZodSchema,
    onChangeValidatorProp,
    onBlurValidator,
    validateInitially,
    validateUnchanged,
    validateContinuously,
    identifier,
    disabled,
    emptyValue,
    required,
    hasDataContext,
    getAjvInstanceDataContext,
    setFieldEventListener,
    getValueByPath,
    getSourceValue,
    exportValidators,
    props,
    dataContext,
    combinedErrorMessages,
    makeIteratePath,
    errorPrioritization,
    sectionPath,
    hasSectionSchema,
    dataContextSchema: dataContext?.schema,
    valueRef,
    changedRef,
    transformers,
    schemaValidatorRef,
    asyncProcessRef,
    validatedValueRef,
    changeEventResultRef,
    localErrorInitiatorRef,
    error,
    persistErrorState,
    clearErrorState,
    revealError,
    hideError,
    setFieldState,
    ensureErrorMessageObject,
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    forceUpdate,
    revealErrorRef,
  })

  // Some fields (e.g. dates) may create new Date instances during locale/value transforms.
  // Compare by timestamp for Date values so "empty" checks are stable across rerenders.
  const valueEqualsEmptyValue = useCallback(
    (value: unknown) => {
      if (value === emptyValue) {
        return true
      }

      if (value instanceof Date && emptyValue instanceof Date) {
        return value.getTime() === emptyValue.getTime()
      }

      return false
    },
    [emptyValue]
  )

  // ─── Wire removeError (circular dependency resolution) ───────────────

  const setChanged = useCallback((state: boolean) => {
    changedRef.current = state
  }, [])

  const removeError = useCallback(() => {
    // Mark as not changed,
    // so the field is considered "fresh" when the user starts typing again.
    setChanged(false)

    // Hide the error message.
    hideError()

    // Remove the local error states.
    clearErrorState()

    // To ensure this field will report back to the context if there are any errors.
    validateValue()
  }, [clearErrorState, hideError, setChanged, validateValue])

  // Update the ref so useFieldAsync's handleChangeEventResult uses the latest removeError
  removeErrorRef.current = removeError

  // ─── External value sync ─────────────────────────────────────────────

  // Use "useLayoutEffect" and "externalValueDidChangeRef"
  // to cooperate with the data context "updateDataValueDataContext" routine further down,
  // which also uses useLayoutEffect.
  const externalValueDidChangeRef = useRef(false)
  useLayoutEffect(() => {
    if (valueRef.current !== externalValue) {
      valueRef.current = externalValue
      externalValueDidChangeRef.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValueDeps, hasItemPath])

  useUpdateEffect(() => {
    // Error or removed error for this field from the surrounding data context (by path)
    if (externalValueDidChangeRef.current) {
      externalValueDidChangeRef.current = false

      // Hide error when the external value has changed, but is the same as the empty value.
      if (
        !validateContinuously &&
        valueEqualsEmptyValue(valueRef.current)
      ) {
        hideError()
      }

      validateValue()
      forceUpdate()
    }
  }, [externalValueDeps, validateContinuously, valueEqualsEmptyValue]) // Keep "externalValue" in the dependency list, so it will be updated when it changes

  const previousLocaleRef = useRef(locale)
  useUpdateEffect(() => {
    if (previousLocaleRef.current !== locale) {
      previousLocaleRef.current = locale
      const hasValidationError =
        hasError() || fieldStateRef.current === 'error'
      const hasVisibleError = revealErrorRef.current === true
      const shouldRevalidateOnLocaleChange =
        changedRef.current ||
        hasValidationError ||
        hasVisibleError ||
        validateInitially ||
        validateUnchanged

      if (
        prerenderFieldProps ||
        (valueEqualsEmptyValue(valueRef.current) &&
          !shouldRevalidateOnLocaleChange)
      ) {
        return // stop here
      }

      if (onBlurValidatorRef.current && shouldRevalidateOnLocaleChange) {
        addToPool(
          'onBlurValidator',
          async () => await startOnBlurValidatorProcess(),
          isAsync(onBlurValidatorRef.current)
        )

        runPool(() => {
          revealError()
          forceUpdate()
        })

        return // stop here
      }
    }
  }, [
    addToPool,
    forceUpdate,
    hasError,
    locale,
    prerenderFieldProps,
    revealError,
    runPool,
    startOnBlurValidatorProcess,
    validateInitially,
    validateUnchanged,
    valueEqualsEmptyValue,
  ])

  // ─── Focus / blur ────────────────────────────────────────────────────

  const setHasFocus = useCallback(
    async (
      hasFocus: boolean,
      overrideValue?: Value,
      localAdditionalArgs?: ProvideAdditionalEventArgs
    ) => {
      const args = getEventArgs({
        eventName: hasFocus ? 'onFocus' : 'onBlur',
        overrideValue,
        additionalArgs: localAdditionalArgs
          ? { ...additionalArgs, ...localAdditionalArgs }
          : additionalArgs,
      })

      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        onFocus?.apply(this, args)
        setMountedFieldStateDataContext(identifier, {
          isFocused: true,
        })
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        onBlur?.apply(this, args)
        setMountedFieldStateDataContext(identifier, {
          isFocused: false,
        })

        if (!changedRef.current && !validateUnchanged) {
          // Avoid showing errors when blurring without having changed the value, so tabbing through several
          // fields does not make errors pop up all over the place
          return
        }

        addToPool(
          'onBlurValidator',
          async () => await startOnBlurValidatorProcess({ overrideValue }),
          isAsync(onBlurValidatorRef.current)
        )

        await runPool(() => {
          // Since the user left the field, show error (if any)
          revealError()
          forceUpdate()
        })
      }
    },
    [
      getEventArgs,
      additionalArgs,
      onFocus,
      setMountedFieldStateDataContext,
      identifier,
      onBlur,
      validateUnchanged,
      addToPool,
      runPool,
      startOnBlurValidatorProcess,
      revealError,
    ]
  )

  // ─── Value updates ───────────────────────────────────────────────────

  const updateValue = useCallback(
    async (newValue: Value) => {
      const currentValue = valueRef.current
      const valueIsUnchanged = newValue === currentValue
      if (!executeOnChangeRegardlessOfUnchangedValue && valueIsUnchanged) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      const transformedValue =
        transformers.current.transformValue(newValue, currentValue) ??
        (emptyValue as unknown as Value)

      const contextValue = transformers.current.transformOut(
        transformedValue,
        transformers.current.provideAdditionalArgs(
          transformedValue,
          additionalArgs
        )
      )

      valueRef.current = transformedValue

      if (hasPath || itemPath) {
        handlePathChangeUnvalidatedDataContext(
          nestedIteratePath || identifier,
          contextValue
        )
      }

      if (itemPath) {
        handleChangeIterateContext?.(
          makeIteratePath(itemPath, '', {
            omitSectionPath: true,
          }),
          contextValue
        )
      }

      addToPool(
        'onChangeValidator',
        validateValue,
        isAsync(onChangeValidatorRef.current)
      )

      addToPool(
        'onChangeContext',
        callOnChangeContext,
        isAsync(onChangeContext)
      )

      await runPool(() => {
        handleError()
      })
    },
    [
      emptyValue,
      additionalArgs,
      hasPath,
      itemPath,
      addToPool,
      validateValue,
      callOnChangeContext,
      onChangeContext,
      runPool,
      handlePathChangeUnvalidatedDataContext,
      nestedIteratePath,
      identifier,
      handleChangeIterateContext,
      makeIteratePath,
      handleError,
      executeOnChangeRegardlessOfUnchangedValue,
    ]
  )

  const setDisplayValue: ReturnAdditional<Value>['setDisplayValue'] =
    useCallback(
      (value, options) => {
        const {
          path: fieldPath = itemPath ? identifier : path,
          type = 'field',
        } = options || {}
        if (!fieldPath || !fieldDisplayValueRef?.current) {
          return // stop here
        }

        fieldDisplayValueRef.current[fieldPath] = valueEqualsEmptyValue(
          valueRef.current
        )
          ? { type }
          : { value, type }
      },
      [
        identifier,
        fieldDisplayValueRef,
        itemPath,
        path,
        valueEqualsEmptyValue,
      ]
    )

  const handleChange = useCallback(
    async (
      argFromInput: Value | unknown,
      localAdditionalArgs: ProvideAdditionalEventArgs = undefined
    ) => {
      const currentValue = valueRef.current
      const fromInput = transformers.current.fromInput(
        argFromInput as Value
      )
      const valueIsUnchanged = fromInput === currentValue

      if (!executeOnChangeRegardlessOfUnchangedValue && valueIsUnchanged) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      // Must be set before validation
      setChanged(true)

      if (asyncBehaviorIsEnabled) {
        hideError()
        await updateValue(fromInput)
      } else {
        updateValue(fromInput)
      }

      if (isAsync(onChange)) {
        addToPool(
          'onChangeLocal',
          async () => {
            const args = getEventArgs({
              eventName: 'onChange',
              additionalArgs: localAdditionalArgs
                ? { ...additionalArgs, ...localAdditionalArgs }
                : additionalArgs,
            })

            await yieldAsyncProcess({
              name: 'onChangeLocal',
              waitFor: [
                {
                  processName: 'onChangeValidator',
                  withStates: ['validating', 'error'],
                  hasValue: args[0],
                },
                {
                  processName: 'onBlurValidator',
                  withStates: ['validating', 'error'],
                  hasValue: args[0],
                },
                {
                  processName: 'onChangeContext',
                  withStates: ['pending', 'error'],
                  hasValue: args[0],
                },
              ],
            })

            defineAsyncProcess('onChangeLocal')

            // Skip sync errors, such as required
            if (!hasError()) {
              // If the value has changed during the async process, we don't want to call the onChange anymore
              await setEventResult(await onChange?.apply(this, args))
            } else {
              await setEventResult(null)
            }
          },
          true
        )
      } else {
        const args = getEventArgs({
          eventName: 'onChange',
          additionalArgs: localAdditionalArgs
            ? { ...additionalArgs, ...localAdditionalArgs }
            : additionalArgs,
        })

        setEventResult(onChange?.apply(this, args))
      }

      await runPool()
    },
    [
      addToPool,
      additionalArgs,
      asyncBehaviorIsEnabled,
      defineAsyncProcess,
      executeOnChangeRegardlessOfUnchangedValue,
      getEventArgs,
      hasError,
      hideError,
      onChange,
      runPool,
      setChanged,
      setEventResult,
      updateValue,
      yieldAsyncProcess,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  // ─── Mount / unmount lifecycle ───────────────────────────────────────

  // Put props into the surrounding data context as early as possible
  setFieldInternalsDataContext?.(identifier, {
    id,
    props,
  })

  const activeIndexTmpRef = useRef(activeIndex)
  useEffect(() => {
    activeIndexTmpRef.current = activeIndex
  }, [activeIndex]) // We want to watch for step changes

  useMemo(() => {
    setMountedFieldStateDataContext(identifier, {
      isPreMounted: true,
    })

    if (typeof isVisible === 'boolean') {
      setMountedFieldStateDataContext(identifier, { isVisible })
    }
  }, [setMountedFieldStateDataContext, identifier, isVisible])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    if (typeof activeIndexRef?.current === 'number') {
      setMountedFieldStateDataContext(identifier, {
        wasStepChange: false,
      })

      return () => {
        const wasStepChange =
          typeof activeIndex === 'number' &&
          // eslint-disable-next-line react-hooks/exhaustive-deps
          activeIndexRef.current !== activeIndexTmpRef.current

        setMountedFieldStateDataContext(identifier, {
          wasStepChange,
        })
      }
    }
  }, [
    activeIndex,
    activeIndexRef,
    identifier,
    prerenderFieldProps,
    setMountedFieldStateDataContext,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    // Mount procedure.
    setMountedFieldStateDataContext(identifier, {
      isMounted: true,
      isPreMounted: true,
    })
    setMountedFieldSnapshot?.(identifier, { isMounted: true })

    // Unmount procedure.
    return () => {
      setMountedFieldStateDataContext(identifier, {
        isMounted: false,
        isPreMounted: false,
      })
      setMountedFieldSnapshot?.(identifier, { isMounted: false })
    }
  }, [
    identifier,
    prerenderFieldProps,
    setMountedFieldSnapshot,
    setMountedFieldStateDataContext,
  ])

  // - Warn when a field path is used multiple times
  useEffect(() => {
    if (
      !omitMultiplePathWarning &&
      !isParentRelativePath &&
      process.env.NODE_ENV !== 'production' &&
      (hasPath || hasItemPath) &&
      (hasPath ? !iterateItemContext : true) &&
      existingFieldsRef?.current
    ) {
      const existingFields = existingFieldsRef.current
      if (existingFields.has(identifier)) {
        warn('Path declared multiple times:', identifier)
      } else {
        existingFields.set(identifier, true)
        return () => {
          existingFields.delete(identifier)
        }
      }
    }
  }, [
    existingFieldsRef,
    hasItemPath,
    hasPath,
    identifier,
    iterateItemContext,
    isParentRelativePath,
    omitMultiplePathWarning,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    const mountedFields = mountedFieldsRef?.current

    // Unmount procedure.
    return () => {
      Promise.resolve().then(() => {
        const isMounted =
          mountedFields?.get?.(identifier)?.isMounted === true
        const sharedAttachments = dataContext?.id
          ? createSharedState<{
              fieldConnectionsRef?: ContextState['fieldConnectionsRef']
            }>(createReferenceKey(dataContext.id, 'attachments')).get?.()
          : undefined
        const hasFieldConnection = Boolean(
          sharedAttachments?.fieldConnectionsRef?.current?.[identifier]
        )

        if (!isMounted && !hasFieldConnection) {
          setFieldErrorDataContext?.(identifier, undefined)
          setFieldErrorBoundary?.(identifier, undefined)
        }
      })

      localErrorRef.current = undefined
    }
  }, [
    identifier,
    dataContext?.id,
    mountedFieldsRef,
    prerenderFieldProps,
    setFieldErrorBoundary,
    setFieldErrorDataContext,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    // Unmount procedure.
    return () => {
      // Have this in a separate useEffect to avoid calling unmount when a step changes
      setFieldErrorWizard?.(wizardIndex, identifier, undefined)
    }
  }, [identifier, prerenderFieldProps, setFieldErrorWizard, wizardIndex])

  // ─── Validation effects ──────────────────────────────────────────────

  useEffect(() => {
    validateValue()
  }, [validateValue])

  useEffect(() => {
    if (prerenderFieldProps || !dataContext?.id) {
      return // stop here
    }

    const sharedAttachments = createSharedState<{
      fieldStatusRef?: React.RefObject<Record<Identifier, unknown>>
    }>(createReferenceKey(dataContext.id, 'attachments')).get?.()

    const status = sharedAttachments?.fieldStatusRef?.current?.[identifier]
    if (status) {
      void setEventResult(status as any)
    }
  }, [
    dataContext?.id,
    identifier,
    locale,
    prerenderFieldProps,
    setEventResult,
  ])

  // Context error handling
  useEffect(() => {
    // Check against the local error state,
    // so we prioritize the local error state over the context error state
    if (!localErrorInitiatorRef.current) {
      const error = contextErrorRef.current
      if (error) {
        persistErrorState('weak', 'dataContextError', error)
        if (validateInitially) {
          handleError()
        }
      } else {
        clearErrorState()
      }
    }
  }, [
    dataContextErrors, // Is needed in order to trigger a re-render when the error state changes.
    clearErrorState,
    handleError,
    persistErrorState,
    prepareError,
    validateInitially,
  ])

  // ─── setContextData ──────────────────────────────────────────────────

  const internalData = dataContext.internalDataRef?.current
  const tmpTransValueRef = useRef<Record<Identifier, unknown>>({
    // Use an unique (per field) starting value (id) for the itemPath, so we later can check if the valueToStore is the same as the current value.
    itemPath: id,
  })
  const setContextData = useCallback(
    ({ preventUpdate = undefined } = {}) => {
      if (!hasPath && !hasItemPath) {
        return // stop here
      }

      let valueToStore: Value | unknown = valueProp

      const storePath = nestedIteratePath
        ? makeIteratePath(itemPath, nestedIteratePath)
        : identifier

      // First, look for existing data in the context
      const hasValue =
        pointer.has(internalData, storePath) || storePath === '/'
      const existingValue =
        storePath === '/'
          ? internalData
          : hasValue
          ? pointer.get(internalData, storePath)
          : undefined

      // If no data where found in the dataContext, look for shared data
      if (
        dataContext.id &&
        !hasValue &&
        typeof existingValue === 'undefined' &&
        typeof valueToStore === 'undefined'
      ) {
        const sharedState = createSharedState(dataContext.id)
        const hasValue = pointer.has(sharedState.data, storePath)
        if (hasValue) {
          const sharedValue = pointer.get(sharedState.data, storePath)
          if (sharedValue) {
            valueToStore = sharedValue as Value
          }
        }
      }

      const hasDefaultValue =
        typeof defaultValueRef.current !== 'undefined' &&
        typeof valueToStore === 'undefined'

      if (hasDefaultValue) {
        // Set the default value if it's not set yet.
        // This takes precedence over the valueToStore.
        valueToStore = defaultValueRef.current
        defaultValueRef.current = undefined
      } else if (!hasValue && typeof valueToStore === 'undefined') {
        valueToStore = emptyValue
      }

      let skipEqualCheck = false

      if (hasItemPath) {
        if (existingValue === valueToStore) {
          if (hasValue) {
            return // stop here, don't store the same value again
          } else {
            // Because the valueToStore is not a part of the data context,
            // we need to check if the valueToStore is the same as the current value,
            // to avoid infinite rerenders.
            if (tmpTransValueRef.current['itemPath'] === valueToStore) {
              return // stop here to avoid infinite rerenders
            }
          }
        }

        // We need to store the valueToStore in a ref, so we can check if it is the same as the current value later.
        tmpTransValueRef.current['itemPath'] = valueToStore

        if (iterateArrayValue === clearedArray) {
          return // stop here, because the array was cleared by handleRemove in the Iterate.Array component
        }

        if (
          typeof valueToStore === 'undefined' &&
          typeof existingValue !== 'undefined'
        ) {
          // On the rerender (after defaultValue was set) and the data context was given, but as "undefined",
          // then we want to use the current value (the defaultValue from the previous render),
          // because else the comparison "valueRef.current !== existingValue" is true and we will set undefined as the new data context value.
          valueToStore = existingValue
        }

        if (itemPath === '/') {
          // The push container uses an object as the default value for the array.
          // But when a root slash is used, we want to make sure the field don't gets the object.
          if (existingValue === clearedData) {
            valueRef.current = undefined
          }

          if (hasDefaultValue && Array.isArray(existingValue)) {
            // Ensures support to have a field with a defaultValue and a itemPath of "/"
            // This way, we ensure the defaultValue is actually set in the data context.
            skipEqualCheck = true
          }
        }
      }

      // Used by e.g. Iterate.Array
      if (updateContextDataInSync) {
        // When an array is given (iterate), we don't want to overwrite the existing array
        if (hasDefaultValue && hasValue) {
          return // stop here, we don't want to overwrite the existing array
        }

        if (Array.isArray(existingValue) && Array.isArray(valueToStore)) {
          if (valueToStore.length !== existingValue.length) {
            skipEqualCheck = true // in order to update the items
          }

          // Keep Iterate.Array in sync with the data context to avoid infinite rerenders
          valueRef.current = existingValue as Value
        }
      }

      // When an Array or Object is used as the value,
      // and the field uses transformIn, the instance may have been changed.
      // The "valueToStore" can be undefined,
      // we then need to ensure we don't overwrite the existing data context value with "undefined".
      if (
        typeof valueToStore === 'undefined' &&
        typeof existingValue !== 'undefined'
      ) {
        valueToStore = existingValue
      }

      if (
        !skipEqualCheck &&
        hasValue &&
        (valueToStore === existingValue ||
          // Prevents an infinite loop by skipping the update if the value hasn't changed
          valueRef.current === existingValue)
      ) {
        return // stop here, we don't want to set same value twice
      }

      if (
        storePath in tmpTransValueRef.current &&
        tmpTransValueRef.current[storePath] === valueToStore
      ) {
        return // stop here, avoid infinite loop
      }

      const valueIn: Value = transformers.current.transformIn(
        valueToStore
      ) as Value
      const transformedValue = transformers.current.transformOut(
        valueIn,
        transformers.current.provideAdditionalArgs(valueIn)
      )
      if (transformedValue !== valueToStore) {
        // When the value got transformed, we want to update the internal value, and avoid an infinite loop
        tmpTransValueRef.current[storePath] = valueToStore
        valueToStore = transformedValue
      }

      // When an itemPath is given, we don't want to rerender the context on every iteration because of performance reasons.
      // We know when the last item is reached, so we can prevent rerenders during the iteration.
      if (
        hasItemPath &&
        !nestedIteratePath && // Ensure we still rerender when absolutePath is set
        iterateIndex < iterateArrayValue?.length - 1
      ) {
        preventUpdate = true
      }

      // Update the data context when a pointer not exists,
      // but was given initially.
      updateDataValueDataContext?.(storePath, valueToStore, {
        preventUpdate,
      })

      if (!preventUpdate) {
        validateDataDataContext?.()
      }
    },
    [
      dataContext.id,
      emptyValue,
      hasItemPath,
      hasPath,
      identifier,
      internalData,
      itemPath,
      iterateArrayValue,
      iterateIndex,
      makeIteratePath,
      nestedIteratePath,
      updateContextDataInSync,
      updateDataValueDataContext,
      validateDataDataContext,
      valueProp,
    ]
  )

  const isEmptyData = useCallback(
    () => {
      return (
        dataContext.isEmptyDataRef?.current ||
        dataContext.internalDataRef?.current ===
          (dataContext.props?.emptyData ?? clearedData)
      )
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dataContext.internalDataRef,
      dataContext.props?.emptyData,
      externalValueDeps, // ensure to include "externalValue" in order to properly remove errors
    ]
  )

  // Use "useLayoutEffect" to be in sync with the data context "updateDataValueDataContext".
  useLayoutEffect(() => {
    if (isEmptyData()) {
      defaultValueRef.current = defaultValue
      setChanged(false)
      hideError()
      clearErrorState()
    }
  }, [clearErrorState, defaultValue, hideError, isEmptyData, setChanged])

  useMemo(() => {
    if (updateContextDataInSync && !isEmptyData()) {
      setContextData({ preventUpdate: true })
    }
  }, [isEmptyData, updateContextDataInSync, setContextData])

  // Use "useLayoutEffect" to avoid flickering when value/defaultValue gets set, and other fields dependent on it.
  // Form.Visibility is an example of a logic, where a field value/defaultValue can be used to set the set state of a path,
  // where again other fields depend on it.
  useLayoutEffect(() => {
    if (!updateContextDataInSync && !isEmptyData()) {
      setContextData()
    }

    // In order to render Iterate.Array with "countPath" immediately
    if (forceUpdateWhenContextDataIsSet) {
      forceUpdate()
    }
  }, [
    forceUpdateWhenContextDataIsSet,
    isEmptyData,
    setContextData,
    updateContextDataInSync,
  ])

  useEffect(() => {
    if (isEmptyData()) {
      setContextData()
      validateValue()
    }
  }, [isEmptyData, setContextData, validateValue])

  // ─── Show / hide errors based on context ─────────────────────────────

  useEffect(() => {
    if (showAllErrors || showBoundaryErrors) {
      // In case of async validation, we don't want to show existing errors before the validation has been completed
      if (fieldStateRef.current !== 'validating') {
        // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
        // something else that should lead to showing the user all errors.
        revealError()
      }
    } else if (showBoundaryErrors === false) {
      hideError()
    }
  }, [hideError, revealError, showAllErrors, showBoundaryErrors])

  useEffect(() => {
    if (
      dataContext.formState === 'pending' &&
      (onChangeValidatorRef.current || onBlurValidatorRef.current)
    ) {
      hideError()
      forceUpdate()
    }
  }, [dataContext.formState, hideError])

  const onSubmitHandler = useCallback(async () => {
    if (hasError()) {
      return // stop here
    }

    addToPool(
      'onChangeValidator',
      startOnChangeValidatorValidation,
      isAsync(onChangeValidatorRef.current)
    )

    addToPool(
      'onBlurValidator',
      startOnBlurValidatorProcess,
      isAsync(onBlurValidatorRef.current)
    )

    await runPool()
  }, [
    addToPool,
    startOnBlurValidatorProcess,
    hasError,
    runPool,
    startOnChangeValidatorValidation,
  ])

  // Validate/call validator functions during submit of the form
  useEffect(() => {
    setFieldEventListener?.(identifier, 'onSubmitCall', onSubmitHandler)
  }, [identifier, onSubmitHandler, setFieldEventListener])

  // Set the error in the field block context if this field is inside a field block
  useEffect(() => {
    if (inFieldBlock) {
      setBlockRecord?.({
        identifier,
        type: 'error',
        content: error,
        showInitially: true,
        show: true,
      })
      setBlockRecord?.({
        identifier,
        type: 'warning',
        content: warning,
        showInitially: true,
        show: true,
      })
      setBlockRecord?.({
        identifier,
        type: 'info',
        content: info,
        showInitially: true,
        show: true,
      })

      return () => {
        // Unmount procedure
        if (mountedFieldsRefFieldBlock) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          mountedFieldsRefFieldBlock.current.set(identifier, true)
        }
      }
    }
  }, [
    error,
    identifier,
    inFieldBlock,
    info,
    mountedFieldsRefFieldBlock,
    setBlockRecord,
    warning,
  ])

  // ─── Status change reporting ─────────────────────────────────────────

  const statusRef = useRef<{
    warning?: FieldStatus['warning']
    info?: FieldStatus['info']
    error?: FieldStatus['error']
    validateInitially?: boolean
  }>(null)

  useEffect(() => {
    if (!onStatusChange) {
      return // stop here
    }

    const status: FieldStatus = {
      info: infoRef.current,
      warning: warningRef.current,
      error: bufferedErrorRef.current,
    }

    const statusVisible =
      Boolean(status.info) ||
      Boolean(status.warning) ||
      (errorIsVisible && Boolean(status.error))

    const previous = statusRef.current
    const hasChanged =
      !previous ||
      previous.error !== status.error ||
      previous.warning !== status.warning ||
      previous.info !== status.info ||
      previous.validateInitially !== validateInitially

    // Call onStatusChange if status has changed AND either:
    // 1. The new status is visible, OR
    // 2. There was a previous status (meaning we're transitioning from visible to not visible)
    if (hasChanged && (statusVisible || previous)) {
      statusRef.current = {
        warning: status.warning,
        info: status.info,
        error: status.error,
        validateInitially,
      }
      onStatusChange(status)
    }
  }, [
    onStatusChange,
    bufferedError,
    warning,
    info,
    validateInitially,
    errorIsVisible,
  ])

  // ─── Connections and HTML attributes ─────────────────────────────────

  const connections = useMemo(() => {
    return {
      setEventResult,
      emptyValue,
    }
  }, [emptyValue, setEventResult])
  setFieldConnectionDataContext?.(identifier, connections)

  // - Handle htmlAttributes
  const htmlAttributes = useMemo(() => {
    return Object.keys(props).reduce<AriaAttributes>(
      (acc, cur) => {
        if (cur.startsWith('aria-') || cur.startsWith('data-')) {
          acc[cur] = props[cur]
        }
        return acc
      },
      { ...props.htmlAttributes }
    )
  }, [props])

  if (bufferedError) {
    htmlAttributes['aria-invalid'] = bufferedError ? 'true' : 'false'
  }
  if (required) {
    htmlAttributes['aria-required'] = 'true'
  }
  if (inFieldBlock) {
    // Mount the field in the field block context
    if (mountedFieldsRefFieldBlock) {
      mountedFieldsRefFieldBlock.current.set(identifier, true)
    }

    // Check if there are any state IDs to be added to the aria-describedby attribute
    const stateIds = fieldBlockContext.fieldStateIdsRef?.current

    if (stateIds) {
      htmlAttributes['aria-describedby'] = combineDescribedBy(
        htmlAttributes,
        [
          bufferedError && stateIds.error,
          warning && stateIds.warning,
          info && stateIds.info,
        ].filter(Boolean)
      )
    }
  } else {
    const ids = [
      (bufferedError || error) && `${id}-form-status--error`,
      warning && `${id}-form-status--warning`,
      info && `${id}-form-status--info`,
    ].filter(Boolean)

    if (ids.length) {
      htmlAttributes['aria-describedby'] = combineDescribedBy(
        htmlAttributes,
        ids
      )
    }
  }

  const help = props.help
  if (help?.title || help?.content) {
    htmlAttributes['aria-describedby'] = combineDescribedBy(
      htmlAttributes,
      `${id}-help`
    )
  }

  const fieldBlockProps = {
    /** Documented APIs */
    info: !inFieldBlock ? infoRef.current : undefined,
    warning: !inFieldBlock ? warningRef.current : undefined,
    error: !inFieldBlock ? bufferedError : undefined,
    required,
    label: props.label,
    labelDescription: props.labelDescription,
    labelDescriptionInline: props.labelDescriptionInline,
    labelSuffix: props.labelSuffix,
    labelSize: props.labelSize,
    labelSrOnly: props.labelSrOnly,
    statusPosition: props.statusPosition,
    layout: props.layout,
    layoutOptions: props.layoutOptions,
    help: props.help,

    /** HTML Attributes */
    disabled:
      onBlurValidator &&
      asyncProcessRef.current === 'onBlurValidator' &&
      fieldStateRef.current === 'validating'
        ? true
        : disabled,

    /** Internal */
    fieldState: resolveValidatingState(fieldStateRef.current),
    labelHeight:
      typeof props['size'] === 'string' ? props['size'] : undefined, // component/field size
  }

  const sharedData = useSharedState('field-block-props-' + id)
  sharedData.set(fieldBlockProps)

  useEffect(() => {
    isInternalRerenderRef.current = undefined
  })

  return {
    ...props,
    ...fieldBlockProps,

    /** HTML Attributes */
    name: props.name || props.path?.replace('/', '') || id,
    autoComplete:
      props.autoComplete ??
      (typeof dataContext.autoComplete === 'boolean'
        ? dataContext.autoComplete
          ? 'on'
          : 'off'
        : undefined),

    /** Documented APIs */
    id,
    value: transformers.current.toInput(valueRef.current),
    hasError: errorIsVisible,
    isChanged: Boolean(changedRef.current),
    props,
    htmlAttributes,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    setChanged,
    setDisplayValue,
    validateValue,
    revealError,
    handleError,
    forceUpdate,

    /** Internal */
    additionalArgs,
    dataContext,
  }
}

export interface ReturnAdditional<Value> {
  /** Documented APIs */
  value: Value
  isChanged: boolean
  htmlAttributes: AriaAttributes | DataAttributes
  setHasFocus: (
    hasFocus: boolean,
    overrideValue?: Value,
    additionalArgs?: ProvideAdditionalEventArgs
  ) => void
  handleError: () => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: (
    value: Value | unknown,
    additionalArgs?: ProvideAdditionalEventArgs
  ) => void
  updateValue: (value: Value) => void
  setChanged: (state: boolean) => void
  setDisplayValue: (
    value: React.ReactNode,
    { path, type }?: { path?: Identifier; type?: 'field' }
  ) => void
  forceUpdate: () => void
  hasError?: boolean

  /** Internal */
  dataContext: ContextState
  fieldState: SubmitState
  additionalArgs: ReceiveAdditionalEventArgs<Value>
}

export { checkForError } from './useFieldError'

export const clearedArray = []
