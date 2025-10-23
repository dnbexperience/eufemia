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
import useEventListener from '../../DataContext/Provider/useEventListener'
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
   * If set to `true`, the wizard will not animate the steps.
   */
  noAnimation?: boolean
  /**
   * Set to `true` to have the list be expanded initially. Defaults to `false`.
   */
  expandedInitially?: boolean
  /**
   * If set to `true`, the wizard will not unmount the steps when navigating back and forth.
   */
  keepInDOM?: boolean
  /**
   * Whether or not to break out (using negative margins) on larger screens. Defaults to `true`.
   */
  outset?: boolean
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
    noAnimation = false,
    expandedInitially = false,
    prerenderFieldProps = true,
    keepInDOM,
    validationMode,
    outset = true,
    ...rest
  } = props

  const dataContext = useContext(DataContext)
  const {
    hasContext,
    setFormState,
    handleSubmitCall,
    setShowAllErrors,
    setSubmitState,
    hasFieldState,
  } = dataContext

  const id = useId(idProp)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const totalStepsRef = useRef<number>(NaN)
  const visitedStepsRef = useRef<InternalVisitedSteps>(new Map())
  const fieldErrorRef = useRef<InternalFieldError>(new Map())
  const storeStepStateRef = useRef<InternalStepStatuses>(new Map())
  const onStepChangeEventsRef = useRef<Set<OnStepChange>>(new Set())
  const hasErrorInOtherStepRef = useRef<boolean>(false)
  const elementRef = useRef<HTMLElement>()
  const stepElementRef = useRef<HTMLElement>()
  const preventNextStepRef = useRef(false)
  const stepsRef = useRef<Steps>(new Map())
  const tmpStepsRef = useRef<number>()
  const stepIndexRef = useRef<number>(-1)
  const updateTitlesRef = useRef<() => void>()
  const prerenderFieldPropsRef = useRef<
    Pick<WizardContextState, 'prerenderFieldPropsRef'>
  >({})

  const bypassOnNavigation = validationMode === 'bypassOnNavigation'

  // - Handle shared state
  const sharedStateRef = useRef<SharedStateReturn<WizardContextState>>()
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
  const syncStepsState = useCallback(
    (index = undefined, forStates = ['unknown', 'error']) => {
      const checkUnknown = forStates.includes('unknown')
      const checkError = forStates.includes('error')

      for (let i = 0; i < totalStepsRef.current; i++) {
        if (index !== undefined && index !== i) {
          continue
        }

        let result: InternalStepStatus = undefined

        if (checkUnknown) {
          const state =
            i < activeIndexRef.current &&
            visitedStepsRef.current.get(i) === undefined
          if (state) {
            result = 'unknown'
          }
        }

        if (checkError) {
          const state = hasFieldErrorInStep(i)
          const existingState = storeStepStateRef.current.get(i)
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
    useCallback(
      (index = undefined, forStates = ['unknown', 'error']) => {
        // Update all steps state before checking
        syncStepsState()

        const checkUnknown = forStates.includes('unknown')
        const checkError = forStates.includes('error')

        // Check if there are any errors in other steps
        for (let i = 0; i < totalStepsRef.current; i++) {
          if (index !== undefined && index !== i) {
            continue
          }

          const state = storeStepStateRef.current.get(i)

          if (checkUnknown) {
            if (state === 'unknown') {
              return true
            }
          }

          if (checkError) {
            if (state === 'error') {
              return true
            }
          }
        }

        return false
      },
      [syncStepsState]
    )

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
          Object.assign(options, { id })
        }

        const previousId = stepsRef.current.get(previousIndex)?.id
        if (previousId) {
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
          onStepChangeEventsRef?.current?.forEach((onStepChange) => {
            if (typeof onStepChange === 'function') {
              onStepChange(index, mode, getStepChangeOptions(index))
            }
          })
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
            // In case steps were visited before, or they use the "keepInDOM" prop,
            // we need to check the step status, because other steps may report an error,
            // so the user will not be able to navigate to the next step,
            // because the form contains errors. Thats why onSubmit will not be called via handleSubmitCall.
            if (
              !hasInvalidStepsState(activeIndexRef.current) &&
              !hasFieldState?.('pending')
            ) {
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
      hasFieldState,
      hasInvalidStepsState,
      isInteractionRef,
      onStepChange,
      setFormState,
      setShowAllErrors,
      setStepAsVisited,
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
    ({ currentStep }) => {
      setActiveIndex(
        currentStep,
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
      // - If there is a step with an error state, we need to prevent the submit
      if (hasInvalidStepsState(undefined, ['error'])) {
        return preventSubmit()
      }

      if (activeIndexRef.current + 1 < totalStepsRef.current) {
        handleNext()
        preventSubmit()
      }
    },
    [hasInvalidStepsState, handleNext]
  )
  useEventListener('onSubmit', handleSubmit)

  // NB: useVisibility needs to be imported here,
  // because it need the outer context to be available.
  const { check } = useVisibility()

  // This is used to map over the children and to give them the correct index,
  // in case it could NOT be given properly, like if no id or title was given in React.StrictMode.
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
      prerenderFieldProps,
      prerenderFieldPropsRef,
      hasErrorInOtherStepRef,
      onStepChangeEventsRef,
      keepInDOM,
      enableMapOverChildren,
      mapOverChildrenRef,
      check,
      setActiveIndex,
      handlePrevious,
      hasInvalidStepsState,
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
        className={classnames('dnb-forms-wizard-layout', className)}
        innerRef={elementRef}
        {...rest}
      >
        <DisplaySteps
          mode={mode}
          noAnimation={noAnimation}
          expandedInitially={expandedInitially}
          handleChange={handleChange}
          outset={outset}
        />

        <div className="dnb-forms-wizard-layout__contents">
          <IterateOverSteps>{children}</IterateOverSteps>
        </div>
      </Space>

      {prerenderFieldProps && !keepInDOM && (
        <PrerenderFieldPropsOfOtherSteps
          prerenderFieldPropsRef={prerenderFieldPropsRef}
          stepsRef={stepsRef}
        />
      )}
    </WizardContext.Provider>
  )
}

WizardContainer._supportsSpacingProps = true

export default WizardContainer
