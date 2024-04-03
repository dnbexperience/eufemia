import React, {
  useContext,
  useCallback,
  useRef,
  useReducer,
  useMemo,
  useEffect,
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
  StepIndex,
  WizardContextState,
} from '../Context/WizardContext'
import Provider from '../../DataContext/Provider'
import {
  SharedStateReturn,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import { ComponentProps } from '../../types'

export type Props = ComponentProps & {
  id?: string
  mode?: 'static' | 'strict' | 'loose'
  scrollTopOnStepChange?: boolean
  initialActiveIndex?: StepIndex
  onStepChange?: OnStepChange
  children: React.ReactNode
  variant?: 'sidebar' | 'drawer'
  noAnimation?: boolean
  sidebarId?: string
}

function WizardLayout(props: Props) {
  const {
    className,
    id: _id,
    mode = 'strict',
    scrollTopOnStepChange,
    initialActiveIndex = 0,
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
    scrollToTop,
    setSubmitState,
  } = useContext(DataContext)

  const id = useId(_id)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const errorOnStepRef = useRef<Record<StepIndex, boolean>>({})

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
  const { extend } = sharedStateRef.current

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

  const handleStepChange = useCallback(
    ({
      index,
      skipErrorCheck,
      skipCallOnChange,
      mode,
    }: {
      index: StepIndex
      skipErrorCheck?: boolean
      skipCallOnChange?: boolean
      mode: 'previous' | 'next'
    }) => {
      handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehaviour: isAsync(onStepChange),
        onSubmit: async () => {
          if (!skipCallOnChange) {
            sharedStateRef.current?.data?.onStepChange?.(index, mode)
          }

          const result = skipCallOnChange
            ? undefined
            : await callOnStepChange(index, mode)

          // Hide async indicator
          setFormState('abort')

          if (!skipErrorCheck) {
            // Set the showAllErrors to the step we got to
            setShowAllErrors(errorOnStepRef.current[index])
          }

          if (!(result instanceof Error)) {
            activeIndexRef.current = index
            forceUpdate()
          }

          if (scrollTopOnStepChange) {
            scrollToTop()
          }

          return result
        },
      })
    },
    [
      callOnStepChange,
      handleSubmitCall,
      onStepChange,
      scrollToTop,
      scrollTopOnStepChange,
      setFormState,
      setShowAllErrors,
    ]
  )

  const setActiveIndex = useCallback(
    (
      index: StepIndex,
      options?: { skipErrorCheck?: boolean; skipCallOnChange?: boolean }
    ) => {
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

  const activeIndex = activeIndexRef.current
  const providerValue = useMemo(
    () => ({
      id,
      activeIndex,
      setActiveIndex,
      handlePrevious,
      handleNext,
      setFormError,
    }),
    [
      id,
      activeIndex,
      setActiveIndex,
      handlePrevious,
      handleNext,
      setFormError,
    ]
  )

  // - Handle shared state
  useEffect(() => {
    if (hasContext && id) {
      extend(providerValue)
    }
  }, [id, extend, providerValue]) // eslint-disable-line react-hooks/exhaustive-deps

  const titlesRef = useRef([])
  const Contents = useCallback(() => {
    titlesRef.current = []
    return React.Children.map(children, (child, i) => {
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
              index: i,
            }
          )
        }
      }

      return child
    })
  }, [children])

  if (!hasContext) {
    warn('You may wrap Wizard.Layout in Form.Handler')
    return (
      <Provider>
        <WizardLayout {...props} id={id} />
      </Provider>
    )
  }

  return (
    <WizardContext.Provider value={providerValue}>
      <Space
        className={classnames(
          'dnb-forms-wizard-layout',
          variant === 'drawer' && 'dnb-forms-wizard-layout--drawer',
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

WizardLayout._supportsSpacingProps = true

export default WizardLayout
