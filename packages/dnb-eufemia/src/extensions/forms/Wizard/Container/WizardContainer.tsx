import React, {
  useContext,
  useCallback,
  useRef,
  useReducer,
  useMemo,
} from 'react'
import classnames from 'classnames'
import { Space, StepIndicator } from '../../../../components'
import { warn } from '../../../../shared/component-helper'
import { isAsync } from '../../../../shared/helpers/isAsync'
import useId from '../../../../shared/helpers/useId'
import DataContext from '../../DataContext/Context'
import Step, { Props as StepProps } from '../Step'
import WizardContext, {
  OnStepChange,
  SetActiveIndexOptions,
  StepIndex,
  WizardContextState,
} from '../Context/WizardContext'
import Handler from '../../Form/Handler/Handler'
import {
  SharedStateReturn,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useHandleLayoutEffect from './useHandleLayoutEffect'
import { ComponentProps, FieldProps } from '../../types'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type Props = ComponentProps & {
  id?: string
  mode?: 'static' | 'strict' | 'loose'
  omitScrollManagement?: boolean
  omitFocusManagement?: boolean
  initialActiveIndex?: StepIndex
  onStepChange?: OnStepChange
  children: React.ReactNode
  variant?: 'sidebar' | 'drawer'
  noAnimation?: boolean
  sidebarId?: string

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
    fieldPropsRef,
  } = useContext(DataContext)

  const id = useId(idProp)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const errorOnStepRef = useRef<Record<StepIndex, boolean>>({})
  const stepElementRef = useRef<HTMLElement>()
  const fieldPropsMemoryRef = useRef<Record<string, FieldProps>>()

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
      fieldPropsMemoryRef.current = fieldPropsRef.current

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

            // Revert the fieldProps to the previous state before the next step is mounted
            fieldPropsRef.current = fieldPropsMemoryRef.current

            activeIndexRef.current = index
            forceUpdate()
          }

          return result
        },
      })
    },
    [
      callOnStepChange,
      fieldPropsRef,
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

  const titlesRef = useRef([])
  const Contents = useCallback(() => {
    titlesRef.current = []
    return React.Children.map(children, (child, index) => {
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
          titlesRef.current.push(child.props.title ?? 'Title missing')
          return React.cloneElement(
            child as React.ReactElement<StepProps>,
            {
              key: `${index}-${activeIndexRef.current}`,
              index,
            }
          )
        }
      }

      return child
    })
  }, [children])

  const activeIndex = activeIndexRef.current
  const totalSteps = titlesRef.current.length
  const providerValue = useMemo(
    () => ({
      id,
      activeIndex,
      totalSteps,
      stepElementRef,
      setActiveIndex,
      handlePrevious,
      handleNext,
      setFormError,
    }),
    [
      id,
      activeIndex,
      totalSteps,
      setActiveIndex,
      handlePrevious,
      handleNext,
      setFormError,
    ]
  )

  // - Handle shared state
  useLayoutEffect(() => {
    if (id && hasContext) {
      sharedStateRef.current?.extend?.(providerValue)
    }
  }, [id, providerValue]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <aside className="dnb-forms-wizard-layout__sidebar">
          <StepIndicator.Sidebar sidebar_id={id} />
          <StepIndicator
            bottom
            current_step={activeIndexRef.current}
            data={titlesRef.current}
            mode={mode}
            no_animation={noAnimation}
            on_change={handleChange}
            sidebar_id={
              variant === 'drawer' && !sidebarId
                ? ''
                : sidebarId
                ? sidebarId
                : id
            }
          />
        </aside>

        <div className="dnb-forms-wizard-layout__contents">
          <Contents />
        </div>
      </Space>
    </WizardContext.Provider>
  )
}

WizardContainer._supportsSpacingProps = true

export default WizardContainer
