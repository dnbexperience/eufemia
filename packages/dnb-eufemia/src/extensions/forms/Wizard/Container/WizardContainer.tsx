import React, {
  useContext,
  useCallback,
  useRef,
  useReducer,
  useMemo,
  useEffect,
} from 'react'
import classnames from 'classnames'
import { Space } from '../../../../components'
import { warn } from '../../../../shared/component-helper'
import { isAsync } from '../../../../shared/helpers/isAsync'
import useId from '../../../../shared/helpers/useId'
import WizardContext, {
  WizardContextState,
} from '../Context/WizardContext'
import type {
  OnStepChange,
  OnStepChangeOptions,
  OnStepsChangeMode,
  SetActiveIndexOptions,
  StepIndex,
  Steps,
  InternalFieldError,
  InternalVisitedSteps,
  InternalStepStatus,
  InternalStepStatuses,
} from '../Context/types'
import DataContext from '../../DataContext/Context'
import Handler from '../../Form/Handler/Handler'
import {
  SharedStateReturn,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useHandleLayoutEffect from './useHandleLayoutEffect'
import useStepAnimation from './useStepAnimation'
import { ComponentProps } from '../../types'
import useVisibility from '../../Form/Visibility/useVisibility'
import { DisplaySteps } from './DisplaySteps'
import { IterateOverSteps } from './IterateOverSteps'
import { PrerenderFieldPropsOfOtherSteps } from './PrerenderFieldPropsOfOtherSteps'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type Props = ComponentProps & {
  id?: string

  /**
   * The mode of the wizard.
   */
  mode?: 'static' | 'strict' | 'loose'

  /**
   * If set to `true`, the wizard will not scroll to the first step when the user clicks on the next button.
   */
  omitScrollManagement?: boolean

  /**
   * If set to `true`, the wizard will not focus on the next step when the user clicks on the next button.
   */
  omitFocusManagement?: boolean

  /**
   * The index of the first step to be rendered.
   */
  initialActiveIndex?: StepIndex

  /**
   * The callback function that will be called when the user clicks on the next button.
   */
  onStepChange?: OnStepChange

  /**
   * The sidebar variant.
   */
  variant?: 'sidebar' | 'drawer'
  sidebarId?: string

  /**
   * If set to `true`, the wizard will not animate the steps.
   */
  noAnimation?: boolean

  /**
   * If set to `true`, the wizard will not unmount the steps when navigating back and forth.
   */
  keepInDOM?: boolean

  /**
   * If set to `true`, the wizard pre-render all steps so the props of each field is available in the data context.
   * Defaults to `true`.
   */
  prerenderFieldProps?: boolean

  /**
   * Determines if and how the validation will be bypassed.
   */
  validationMode?: 'bypassOnNavigation'

  /**
   * The children of the wizard container.
   */
  children: React.ReactNode

  /**
   * @deprecated Is enabled by default. You can disable it with "omitScrollManagement"
   */
  scrollTopOnStepChange?: boolean
}

function WizardContainer(props: Props) {
  const {
    className,
    id: idProp,
    mode = 'strict',
    initialActiveIndex = 0,
    omitScrollManagement,
    omitFocusManagement,
    onStepChange,
    children,
    noAnimation = true,
    prerenderFieldProps = true,
    keepInDOM,
    validationMode,
    variant = 'sidebar',
    sidebarId,
    ...rest
  } = props

  const dataContext = useContext(DataContext)
  const {
    hasContext,
    setFormState,
    handleSubmitCall,
    setShowAllErrors,
    setSubmitState,
  } = dataContext

  const id = useId(idProp)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const totalStepsRef = useRef<number>(NaN)
  const submitCountRef = useRef(0)
  const visitedStepsRef = useRef<InternalVisitedSteps>(new Map())
  const fieldErrorRef = useRef<InternalFieldError>(new Map())
  const storeStepStateRef = useRef<InternalStepStatuses>(new Map())
  const hasErrorInOtherStepRef = useRef<boolean>(false)
  const elementRef = useRef<HTMLElement>()
  const stepElementRef = useRef<HTMLElement>()
  const preventNextStepRef = useRef(false)
  const stepsRef = useRef<Steps>(new Map())
  const tmpStepsRef = useRef<number>()
  const stepIndexRef = useRef<number>(-1)
  const updateTitlesRef = useRef<() => void>()
  const prerenderFieldPropsRef = useRef<
    Record<string, () => React.ReactElement>
  >({})

  const bypassOnNavigation = validationMode === 'bypassOnNavigation'

  // - Handle shared state
  const sharedStateRef =
    useRef<
      SharedStateReturn<
        WizardContextState & { onStepChange?: OnStepChange }
      >
    >()
  sharedStateRef.current = useSharedState<WizardContextState>(
    hasContext && id ? createReferenceKey(id, 'wizard') : undefined
  )

  const hasFieldErrorInStep = useCallback((index: StepIndex) => {
    return Array.from(fieldErrorRef.current.values()).some(
      ({ index: i, hasError }) => {
        return i === index && hasError
      }
    )
  }, [])

  const setStepAsVisited = useCallback((index: StepIndex) => {
    visitedStepsRef.current.set(index, true)
  }, [])

  useEffect(() => {
    if (!initialActiveIndex) {
      setStepAsVisited(activeIndexRef.current)
    }
  }, [initialActiveIndex, setStepAsVisited])

  /**
   * - This method is used to check if a step (or any step) has an invalid state.
   *
   * If a step was not visited before, it will be set to "unknown".
   * If a step was visited before, but has an invalid state, it will be set to "error".
   * If an index is given, it will check if the step, with the given index, has an invalid state.
   */
  const writeStepsState: WizardContextState['writeStepsState'] =
    useCallback(
      (index = undefined, forStates = ['unknown', 'error']) => {
        for (let i = 0; i < totalStepsRef.current; i++) {
          if (index !== undefined && index !== i) {
            continue
          }

          let result: InternalStepStatus = undefined
          const existingState = storeStepStateRef.current.get(i)

          if (forStates.includes('unknown')) {
            const state =
              i < activeIndexRef.current &&
              visitedStepsRef.current.get(i) === undefined
            if (state) {
              result = 'unknown'
            }
          }

          if (forStates.includes('error')) {
            const state = hasFieldErrorInStep(i)
            if (state) {
              result = 'error'
            } else if (existingState === 'error') {
              if (i === activeIndexRef.current) {
                result = undefined
              } else {
                result = existingState
              }
            }
          }

          storeStepStateRef.current.set(i, result)
        }
      },
      [hasFieldErrorInStep]
    )

  const hasInvalidStepsState: WizardContextState['hasInvalidStepsState'] =
    useCallback((index = undefined, forStates = ['unknown', 'error']) => {
      for (let i = 0; i < totalStepsRef.current; i++) {
        if (index !== undefined && index !== i) {
          continue
        }

        const state = storeStepStateRef.current.get(i)

        if (forStates.includes('unknown')) {
          if (state === 'unknown') {
            return true
          }
        }

        if (forStates.includes('error')) {
          if (state === 'error') {
            return true
          }
        }
      }

      return false
    }, [])

  const setFieldError: WizardContextState['setFieldError'] = useCallback(
    (index, path, hasError) => {
      fieldErrorRef.current.set(path, { index, hasError })
    },
    []
  )

  const preventNavigation = useCallback((shouldPrevent = true) => {
    preventNextStepRef.current = shouldPrevent
  }, [])

  const getStepChangeOptions: (index: StepIndex) => OnStepChangeOptions =
    useCallback(
      (index) => {
        const previousIndex = activeIndexRef.current
        const options = {
          preventNavigation,
          previousStep: { index: previousIndex },
        }

        const id = stepsRef.current.get(index)?.id
        if (id) {
          const previousId = stepsRef.current.get(previousIndex)?.id
          Object.assign(options, { id })
          Object.assign(options.previousStep, { id: previousId })
        }

        return options
      },
      [preventNavigation]
    )

  const callOnStepChange = useCallback(
    async (index: StepIndex, mode: OnStepsChangeMode) => {
      if (isAsync(onStepChange)) {
        return await onStepChange(index, mode, getStepChangeOptions(index))
      }

      return onStepChange?.(index, mode, getStepChangeOptions(index))
    },
    [getStepChangeOptions, onStepChange]
  )

  const { setFocus, scrollToTop, isInteractionRef } =
    useHandleLayoutEffect({ elementRef, stepElementRef })

  const executeLayoutAnimationRef = useRef<() => void>()
  useStepAnimation({
    activeIndexRef,
    stepElementRef,
    executeLayoutAnimationRef,
  })

  const handleLayoutEffect = useCallback(() => {
    if (!omitFocusManagement) {
      setFocus()
    }
    if (!omitScrollManagement) {
      scrollToTop()
    }
  }, [omitScrollManagement, omitFocusManagement, setFocus, scrollToTop])

  const handleStepChange = useCallback(
    async ({
      index,
      skipErrorCheck,
      skipStepChangeCall,
      skipStepChangeCallBeforeMounted,
      skipStepChangeCallFromHook,
      mode,
    }: {
      index: StepIndex
      mode: OnStepsChangeMode
    } & SetActiveIndexOptions) => {
      let didSubmit = false
      const onSubmit = async () => {
        if (!skipStepChangeCallFromHook) {
          sharedStateRef.current?.data?.onStepChange?.(
            index,
            mode,
            getStepChangeOptions(index)
          )
        }

        let result = undefined

        if (
          !skipStepChangeCall &&
          !(skipStepChangeCallBeforeMounted && !isInteractionRef.current)
        ) {
          result = await callOnStepChange(index, mode)
        }

        // Hide async indicator
        setFormState('abort')

        // Set the "showAllErrors" to the step we got to
        setShowAllErrors(
          bypassOnNavigation
            ? false
            : hasInvalidStepsState(index, ['error'])
        )

        if (!preventNextStepRef.current && !(result instanceof Error)) {
          handleLayoutEffect()

          activeIndexRef.current = index
          setStepAsVisited(activeIndexRef.current)
          forceUpdate()
        }

        preventNextStepRef.current = false
        didSubmit = true

        return result
      }

      await handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehavior: isAsync(onStepChange),
        onSubmit: bypassOnNavigation ? () => null : onSubmit,
      })

      if (!didSubmit) {
        if (bypassOnNavigation) {
          await onSubmit()
        } else {
          if (mode === 'next') {
            // First we need to write the steps state for the current active index.
            writeStepsState(activeIndexRef.current, ['error'])

            // In case steps were visited before, or they use the "keepInDOM" prop,
            // we need to check the step status, because other steps may report an error,
            // so the user will not be able to navigate to the next step,
            // because the form contains errors. Thats why onSubmit will not be called via handleSubmitCall.
            if (!hasInvalidStepsState(activeIndexRef.current)) {
              await onSubmit()
            }
          }
        }
      }
    },
    [
      bypassOnNavigation,
      callOnStepChange,
      getStepChangeOptions,
      handleLayoutEffect,
      handleSubmitCall,
      hasInvalidStepsState,
      isInteractionRef,
      onStepChange,
      setFormState,
      setShowAllErrors,
      setStepAsVisited,
      writeStepsState,
    ]
  )

  const setActiveIndex = useCallback(
    (index: StepIndex, options?: SetActiveIndexOptions) => {
      if (index === activeIndexRef.current) {
        return
      }

      const mode = index > activeIndexRef.current ? 'next' : 'previous'

      handleStepChange({
        index,
        skipErrorCheck: mode === 'previous',
        mode,
        ...options,
      })
    },
    [handleStepChange]
  )

  const handlePrevious = useCallback(() => {
    setActiveIndex(activeIndexRef.current - 1)
  }, [setActiveIndex])

  const handleNext = useCallback(() => {
    setActiveIndex(activeIndexRef.current + 1)
  }, [setActiveIndex])

  const handleChange = useCallback(
    ({ current_step }) => {
      setActiveIndex(
        current_step,
        mode === 'loose' ? { skipErrorCheck: true } : undefined
      )
    },
    [mode, setActiveIndex]
  )

  const setFormError = useCallback(
    (error: Error) => {
      setSubmitState?.({ error })
    },
    [setSubmitState]
  )

  const handleSubmit = useCallback(
    ({ preventSubmit }) => {
      submitCountRef.current += 1

      // - If there is an unknown step state, we need to prevent the submit
      if (hasInvalidStepsState()) {
        return preventSubmit()
      }

      if (activeIndexRef.current + 1 < totalStepsRef.current) {
        handleNext()
        preventSubmit()
      }
    },
    [hasInvalidStepsState, handleNext]
  )
  dataContext.setFieldEventListener?.(undefined, 'onSubmit', handleSubmit)

  // NB: useVisibility needs to be imported here,
  // because it need the outer context to be available.
  const { check } = useVisibility()

  // This is used to map over the children and to give them the correct index,
  // in case it could be given properly, like if no id or title was given in React.StrictMode.
  const mapOverChildrenRef = useRef(false)
  const enableMapOverChildren = useCallback(() => {
    mapOverChildrenRef.current = true
  }, [])

  const activeIndex = activeIndexRef.current
  const providerValue = useMemo<WizardContextState>(() => {
    return {
      id,
      activeIndex,
      initialActiveIndex,
      stepElementRef,
      stepsRef,
      updateTitlesRef,
      activeIndexRef,
      stepIndexRef,
      totalStepsRef,
      submitCountRef,
      prerenderFieldProps,
      prerenderFieldPropsRef,
      hasErrorInOtherStepRef,
      keepInDOM,
      enableMapOverChildren,
      mapOverChildrenRef,
      check,
      setActiveIndex,
      handlePrevious,
      hasInvalidStepsState,
      writeStepsState,
      setFieldError,
      handleNext,
      setFormError,
    } satisfies WizardContextState
  }, [
    id,
    activeIndex,
    initialActiveIndex,
    prerenderFieldProps,
    keepInDOM,
    enableMapOverChildren,
    check,
    setActiveIndex,
    handlePrevious,
    hasInvalidStepsState,
    writeStepsState,
    setFieldError,
    handleNext,
    setFormError,
  ])

  // - Handle shared state
  useLayoutEffect(() => {
    if (id && hasContext) {
      sharedStateRef.current.extend(providerValue)
    }
  }, [hasContext, id, providerValue])

  useLayoutEffect(() => {
    updateTitlesRef.current?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsRef.current])

  const stepsLengthDidChange = useCallback(() => {
    const tmpCount = tmpStepsRef.current
    if (tmpCount === undefined) {
      return false
    }
    const count = totalStepsRef.current
    return count !== 0 && tmpCount !== 0 && count !== tmpCount
  }, [])

  // - Call onStepChange when step gets replaced or added (e.g. via includeWhen)
  useLayoutEffect(() => {
    if (stepsLengthDidChange()) {
      callOnStepChange(activeIndexRef.current, 'stepListModified')
      executeLayoutAnimationRef.current?.()
    }

    tmpStepsRef.current = totalStepsRef.current

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalStepsRef.current, // Include the totalStepsRef.current to trigger the useEffect on change
    callOnStepChange,
    stepsLengthDidChange,
  ])

  if (!hasContext) {
    warn('You may wrap Wizard.Container in Form.Handler')
    return (
      <Handler>
        <WizardContainer {...props} id={id} />
      </Handler>
    )
  }

  return (
    <WizardContext.Provider value={providerValue}>
      <Space
        className={classnames(
          'dnb-forms-wizard-layout',
          `dnb-forms-wizard-layout--${variant}`,
          className
        )}
        innerRef={elementRef}
        {...rest}
      >
        <DisplaySteps
          mode={mode}
          variant={variant}
          noAnimation={noAnimation}
          handleChange={handleChange}
          sidebarId={sidebarId}
        />

        <div className="dnb-forms-wizard-layout__contents">
          <IterateOverSteps>{children}</IterateOverSteps>
        </div>
      </Space>

      {prerenderFieldProps && !keepInDOM && (
        <PrerenderFieldPropsOfOtherSteps
          prerenderFieldPropsRef={prerenderFieldPropsRef}
        />
      )}
    </WizardContext.Provider>
  )
}

WizardContainer._supportsSpacingProps = true

export default WizardContainer
