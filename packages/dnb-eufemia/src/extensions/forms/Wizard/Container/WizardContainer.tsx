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
import Step, { Props as StepProps } from '../Step'
import WizardContext, {
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
  const errorOnStepRef = useRef<Record<StepIndex, boolean>>({})
  const stepElementRef = useRef<HTMLElement>()
  const preventNextStepRef = useRef(false)
  const stepsRef = useRef<Steps>({})
  const tmpStepsRef = useRef<Steps>({})
  const updateTitlesRef = useRef<() => void>()
  const prerenderFieldPropsRef = useRef<
    Record<string, () => React.ReactElement>
  >({})

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

  // Store the current state of showAllErrors
  errorOnStepRef.current[activeIndexRef.current] = showAllErrors

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
    useHandleLayoutEffect({
      stepElementRef,
    })

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
    ({
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
      handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehavior: isAsync(onStepChange),
        onSubmit: async () => {
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

          if (!skipErrorCheck) {
            // Set the showAllErrors to the step we got to
            setShowAllErrors(errorOnStepRef.current[index])
          }

          if (!preventNextStepRef.current && !(result instanceof Error)) {
            handleLayoutEffect()

            activeIndexRef.current = index
            forceUpdate()
          }

          preventNextStepRef.current = false

          return result
        },
      })
    },
    [
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
      setActiveIndex(current_step, { skipErrorCheck: true })
    },
    [setActiveIndex]
  )

  const setFormError = useCallback(
    (error: Error) => {
      setSubmitState?.({ error })
    },
    [setSubmitState]
  )

  const handleSubmit = useCallback(
    ({ preventSubmit }) => {
      if (activeIndexRef.current + 1 < totalStepsRef.current) {
        handleNext()
        preventSubmit()
      }
    },
    [handleNext]
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
      prerenderFieldProps,
      prerenderFieldPropsRef,
      check,
      setActiveIndex,
      handlePrevious,
      handleNext,
      setFormError,
    }
  }, [
    activeIndex,
    handleNext,
    handlePrevious,
    id,
    prerenderFieldProps,
    check,
    setActiveIndex,
    setFormError,
  ])

  // - Handle shared state
  useLayoutEffect(() => {
    if (id && hasContext) {
      sharedStateRef.current?.extend?.(providerValue)
    }
  }, [id, providerValue]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    updateTitlesRef.current?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsRef.current])

  const stepsLengthDidChange = useCallback(() => {
    const count = Object.keys(stepsRef.current).length
    const tmpCount = Object.keys(tmpStepsRef.current).length
    return count !== 0 && tmpCount !== 0 && count !== tmpCount
  }, [])

  // - Call onStepChange when step gets replaced or added (e.g. via activeWhen)
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
  const { id, activeIndexRef, stepsRef, updateTitlesRef } =
    useContext(WizardContext) || {}
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
        data={Object.values(stepsRef.current).map(({ title }) => title)}
        mode={mode}
        no_animation={noAnimation}
        on_change={handleChange}
        sidebar_id={sidebar_id}
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
    prerenderFieldProps,
    prerenderFieldPropsRef,
  } = useContext(WizardContext)

  stepsRef.current = {}
  let incrementIndex = -1

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
        if (child.props.active === false) {
          return null
        }

        if (
          child.props.activeWhen &&
          !check({ visibleWhen: child.props.activeWhen })
        ) {
          return null
        }

        incrementIndex++
        const index = incrementIndex

        stepsRef.current[index] = {
          id: child.props.id,
          title:
            child.props.title !== undefined
              ? convertJsxToString(child.props.title)
              : 'Title missing',
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
  const { data, setFieldProps, updateDataValue } = useContext(DataContext)

  return (
    <DataContext.Provider
      value={{
        ...defaultContextState,

        // Only update the props and the data value
        data,
        setFieldProps,
        updateDataValue,
        prerenderFieldProps: true,
        hasContext: true,
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
