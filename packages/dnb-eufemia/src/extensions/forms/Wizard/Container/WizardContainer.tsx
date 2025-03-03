import React, {
  useContext,
  useCallback,
  useRef,
  useReducer,
  useMemo,
} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Space, StepIndicator } from '../../../../components'
import {
  convertJsxToString,
  warn,
} from '../../../../shared/component-helper'
import { isAsync } from '../../../../shared/helpers/isAsync'
import useId from '../../../../shared/helpers/useId'
import Step, {
  Props as StepProps,
  handleDeprecatedProps as handleDeprecatedStepProps,
} from '../Step'
import WizardContext, {
  InternalStepStatus,
  InternalStepStatuses,
  InternalVisitedSteps,
  OnStepChange,
  OnStepChangeOptions,
  OnStepsChangeMode,
  SetActiveIndexOptions,
  StepIndex,
  Steps,
  WizardContextState,
} from '../Context/WizardContext'
import DataContext, {
  defaultContextState,
} from '../../DataContext/Context'
import Handler from '../../Form/Handler/Handler'
import {
  SharedStateReturn,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useHandleLayoutEffect from './useHandleLayoutEffect'
import useStepAnimation from './useStepAnimation'
import { ComponentProps } from '../../types'
import { useTranslation } from '../../hooks'
import useVisibility from '../../Form/Visibility/useVisibility'

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
    showAllErrors,
    setSubmitState,
  } = dataContext

  const id = useId(idProp)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const totalStepsRef = useRef<number>(NaN)
  const stepStatusRef = useRef<InternalStepStatuses>({})
  const visitedStepsRef = useRef<InternalVisitedSteps>({})
  const elementRef = useRef<HTMLElement>()
  const stepElementRef = useRef<HTMLElement>()
  const preventNextStepRef = useRef(false)
  const stepsRef = useRef<Steps>({})
  const tmpStepsRef = useRef<Steps>({})
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

  const setStepState = useCallback(
    (index: number, state: InternalStepStatus) => {
      stepStatusRef.current[index] = state
    },
    []
  )

  visitedStepsRef.current[activeIndexRef.current] = true
  const currentState = stepStatusRef.current[activeIndexRef.current]
  if (!showAllErrors && ['error', 'valid'].includes(currentState)) {
    setStepState(activeIndexRef.current, 'valid')
  } else {
    setStepState(
      activeIndexRef.current,
      showAllErrors ? 'error' : undefined
    )
  }

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

        const id = stepsRef.current[index]?.id
        if (id) {
          const previousId = stepsRef.current[previousIndex]?.id
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
            : stepStatusRef.current[index] === 'error'
        )

        if (!preventNextStepRef.current && !(result instanceof Error)) {
          handleLayoutEffect()

          activeIndexRef.current = index
          forceUpdate()
        }

        preventNextStepRef.current = false

        return result
      }

      await handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehavior: isAsync(onStepChange),
        onSubmit: bypassOnNavigation ? () => null : onSubmit,
      })

      if (bypassOnNavigation) {
        await onSubmit()
      }
    },
    [
      bypassOnNavigation,
      callOnStepChange,
      getStepChangeOptions,
      handleLayoutEffect,
      handleSubmitCall,
      isInteractionRef,
      onStepChange,
      setFormState,
      setShowAllErrors,
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

  const handleUnknownStepsState = useCallback(() => {
    const index = activeIndexRef.current
    for (let i = 0; i < totalStepsRef.current; i++) {
      // - Check if the step was visited before,
      // - if, not check if the step has already an state,
      // - if, not check if the step is before the active step and and below.
      // - Only then set the state to "unknown"
      if (
        !visitedStepsRef.current[i] &&
        stepStatusRef.current[i] === undefined &&
        i < index &&
        i !== index
      ) {
        setStepState(i, 'unknown')
      }
    }
  }, [setStepState])

  const hasInvalidStepsState = useCallback(() => {
    const steps = Object.values(stepStatusRef.current)
    return steps.includes('unknown') || steps.includes('error')
  }, [])

  const handleSubmit = useCallback(
    ({ preventSubmit }) => {
      handleUnknownStepsState()

      // - If there is an unknown step state, we need to prevent the submit
      if (hasInvalidStepsState()) {
        return preventSubmit()
      }

      if (activeIndexRef.current + 1 < totalStepsRef.current) {
        handleNext()
        preventSubmit()
      }
    },
    [handleUnknownStepsState, hasInvalidStepsState, handleNext]
  )
  dataContext.setHandleSubmit?.(handleSubmit)

  const { check } = useVisibility()

  const activeIndex = activeIndexRef.current
  const providerValue = useMemo<WizardContextState>(() => {
    return {
      id,
      activeIndex,
      stepElementRef,
      stepsRef,
      updateTitlesRef,
      activeIndexRef,
      totalStepsRef,
      stepStatusRef,
      prerenderFieldProps,
      prerenderFieldPropsRef,
      check,
      setActiveIndex,
      handlePrevious,
      hasInvalidStepsState,
      handleNext,
      setFormError,
    }
  }, [
    id,
    activeIndex,
    prerenderFieldProps,
    check,
    setActiveIndex,
    handlePrevious,
    hasInvalidStepsState,
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
    const count = Object.keys(stepsRef.current).length
    const tmpCount = Object.keys(tmpStepsRef.current).length
    return count !== 0 && tmpCount !== 0 && count !== tmpCount
  }, [])

  // - Call onStepChange when step gets replaced or added (e.g. via includeWhen)
  useLayoutEffect(() => {
    if (stepsLengthDidChange()) {
      callOnStepChange(activeIndexRef.current, 'stepListModified')
      executeLayoutAnimationRef.current?.()
    }
    tmpStepsRef.current = stepsRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsRef.current, callOnStepChange, stepsLengthDidChange])

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

      {prerenderFieldProps && (
        <PrerenderFieldPropsOfOtherSteps
          prerenderFieldPropsRef={prerenderFieldPropsRef}
        />
      )}
    </WizardContext.Provider>
  )
}

function DisplaySteps({
  mode,
  variant,
  noAnimation,
  handleChange,
  sidebarId,
}) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const {
    id,
    activeIndexRef,
    stepsRef,
    updateTitlesRef,
    hasInvalidStepsState,
  } = useContext(WizardContext) || {}
  updateTitlesRef.current = () => {
    forceUpdate()
  }

  const sidebar_id =
    variant === 'drawer' && !sidebarId ? undefined : sidebarId ?? id

  return (
    <aside className="dnb-forms-wizard-layout__indicator">
      <StepIndicator.Sidebar sidebar_id={sidebar_id} />
      <StepIndicator
        bottom
        current_step={activeIndexRef.current}
        data={Object.values(stepsRef.current).map(
          ({ title, inactive, status, statusState }) => ({
            title,
            inactive,
            status,
            status_state: statusState,
          })
        )}
        mode={mode}
        no_animation={noAnimation}
        on_change={handleChange}
        sidebar_id={sidebar_id}
        triggerButtonProps={
          hasInvalidStepsState()
            ? {
                status: 'Unknown state',
                status_state: 'warn',
              }
            : undefined
        }
      />
    </aside>
  )
}

function IterateOverSteps({ children }) {
  const {
    check,
    stepsRef,
    activeIndexRef,
    totalStepsRef,
    stepStatusRef,
    prerenderFieldProps,
    prerenderFieldPropsRef,
  } = useContext(WizardContext)

  stepsRef.current = {}
  let incrementIndex = -1

  const translations = useTranslation()

  const childrenArray = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      let step = child

      if (child?.type !== Step && typeof child.type === 'function') {
        step = child.type.apply(child.type, [
          child.props,
        ]) as React.ReactElement

        if (step?.type === Step) {
          child = step
        }
      }

      if (child?.type === Step) {
        const { title, inactive, include, includeWhen, id } =
          handleDeprecatedStepProps(child.props)

        if (include === false) {
          return null
        }

        if (
          includeWhen &&
          !check({
            visibleWhen: includeWhen,
          })
        ) {
          return null
        }

        incrementIndex++
        const index = incrementIndex
        const state = stepStatusRef.current[index]

        stepsRef.current[index] = {
          id,
          title:
            title !== undefined
              ? convertJsxToString(title)
              : 'Title missing',
          inactive,
          status:
            state === 'error'
              ? translations.Step.stepHasError
              : state === 'unknown'
              ? 'Unknown state'
              : undefined,
          statusState: state === 'error' ? 'error' : undefined, // Shows 'warn' by default
        }
        const key = `${index}-${activeIndexRef.current}`
        const clone = (props) =>
          React.cloneElement(child as React.ReactElement<StepProps>, props)

        if (
          prerenderFieldProps &&
          typeof document !== 'undefined' &&
          index !== activeIndexRef.current &&
          typeof prerenderFieldPropsRef.current['step-' + index] ===
            'undefined'
        ) {
          prerenderFieldPropsRef.current['step-' + index] = () =>
            clone({
              key,
              index,
              prerenderFieldProps: true,
            })
        }

        return clone({
          key,
          index,
        })
      }
    }

    return child
  })

  // Ensure we never have a higher index than the available children
  // else we get a white screen
  if (childrenArray?.length === 0) {
    activeIndexRef.current = 0
  } else if (childrenArray?.length < activeIndexRef.current + 1) {
    activeIndexRef.current = childrenArray.length - 1
  }

  totalStepsRef.current = childrenArray?.length

  return childrenArray
}

function PrerenderFieldPropsOfOtherSteps({
  prerenderFieldPropsRef,
}: {
  prerenderFieldPropsRef: WizardContextState['prerenderFieldPropsRef']
}) {
  const hasRenderedRef = useRef(true)
  if (!hasRenderedRef.current) {
    return null
  }
  hasRenderedRef.current = false

  return (
    <WizardPortal>
      <PrerenderFieldPropsProvider>
        <iframe title="Wizard Prerender" hidden>
          {Object.values(prerenderFieldPropsRef.current).map((Fn, i) => (
            <Fn key={i} />
          ))}
        </iframe>
      </PrerenderFieldPropsProvider>
    </WizardPortal>
  )
}

function WizardPortal({ children }) {
  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(children, document.body)
  }
}

function PrerenderFieldPropsProvider({ children }) {
  const { data, setFieldInternals, updateDataValue } =
    useContext(DataContext)

  return (
    <DataContext.Provider
      value={{
        ...defaultContextState,
        hasContext: true,
        prerenderFieldProps: true,

        // Only enable data and these methods
        data,
        setFieldInternals,
        updateDataValue,
      }}
    >
      <WizardContext.Provider value={{ prerenderFieldProps: true }}>
        {children}
      </WizardContext.Provider>
    </DataContext.Provider>
  )
}

WizardContainer._supportsSpacingProps = true

export default WizardContainer
