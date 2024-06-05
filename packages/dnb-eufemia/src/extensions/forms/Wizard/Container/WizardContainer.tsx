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
  SetActiveIndexOptions,
  StepIndex,
  WizardContextState,
} from '../Context/WizardContext'
import DataContext, {
  defaultContextState,
} from '../../DataContext/Context'
import Handler from '../../Form/Handler/Handler'
import {
  SharedStateReturn,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useHandleLayoutEffect from './useHandleLayoutEffect'
import { ComponentProps } from '../../types'

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

  const {
    hasContext,
    setFormState,
    handleSubmitCall,
    setShowAllErrors,
    showAllErrors,
    setSubmitState,
  } = useContext(DataContext)

  const id = useId(idProp)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const errorOnStepRef = useRef<Record<StepIndex, boolean>>({})
  const stepElementRef = useRef<HTMLElement>()

  // - Handle shared state
  const sharedStateRef =
    useRef<
      SharedStateReturn<
        WizardContextState & { onStepChange?: OnStepChange }
      >
    >()
  sharedStateRef.current = useSharedState<WizardContextState>(
    hasContext && id ? id + '-wizard' : undefined
  )

  // Store the current state of showAllErrors
  errorOnStepRef.current[activeIndexRef.current] = showAllErrors

  const callOnStepChange = useCallback(
    async (index: StepIndex, mode: 'previous' | 'next') => {
      if (isAsync(onStepChange)) {
        return await onStepChange(index, mode)
      }

      return onStepChange?.(index, mode)
    },
    [onStepChange]
  )

  const { setFocus, scrollToTop, isInteractionRef } =
    useHandleLayoutEffect({ activeIndexRef, stepElementRef })

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
      mode: 'previous' | 'next'
    } & SetActiveIndexOptions) => {
      handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehaviour: isAsync(onStepChange),
        onSubmit: async () => {
          if (!skipStepChangeCallFromHook) {
            sharedStateRef.current?.data?.onStepChange?.(index, mode)
          }

          const result =
            skipStepChangeCall ||
            (skipStepChangeCallBeforeMounted && !isInteractionRef.current)
              ? undefined
              : await callOnStepChange(index, mode)

          // Hide async indicator
          setFormState('abort')

          if (!skipErrorCheck) {
            // Set the showAllErrors to the step we got to
            setShowAllErrors(errorOnStepRef.current[index])
          }

          if (!(result instanceof Error)) {
            handleLayoutEffect()

            activeIndexRef.current = index
            forceUpdate()
          }

          return result
        },
      })
    },
    [
      callOnStepChange,
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

  const titlesRef = useRef({})
  const updateTitlesRef = useRef<() => void>()
  const prerenderFieldPropsRef = useRef<
    Record<string, () => React.ReactElement>
  >({})

  const activeIndex = activeIndexRef.current
  const providerValue = useMemo(() => {
    return {
      id,
      activeIndex,
      stepElementRef,
      titlesRef,
      updateTitlesRef,
      activeIndexRef,
      prerenderFieldProps,
      prerenderFieldPropsRef,
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
  }, [titlesRef.current])

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
  const { id, activeIndexRef, titlesRef, updateTitlesRef } =
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
        data={Object.values(titlesRef.current)}
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
    titlesRef,
    activeIndexRef,
    prerenderFieldProps,
    prerenderFieldPropsRef,
  } = useContext(WizardContext)

  titlesRef.current = {}
  let incrementIndex = -1
  let decrementIndex = -1

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

        if (child.props.active === false) {
          decrementIndex--
        } else {
          incrementIndex++
        }
        const index =
          child.props.active === false ? decrementIndex : incrementIndex

        titlesRef.current[index] =
          child.props.title !== undefined
            ? convertJsxToString(child.props.title)
            : 'Title missing'
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
  if (childrenArray.length === 0) {
    activeIndexRef.current = 0
  } else if (childrenArray.length < activeIndexRef.current + 1) {
    activeIndexRef.current = childrenArray.length - 1
  }

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
