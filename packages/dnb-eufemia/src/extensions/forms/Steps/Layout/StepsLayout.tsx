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
import StepsContext, {
  StepIndex,
  StepsContextState,
} from '../Context/StepsContext'
import Provider from '../../DataContext/Provider'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import { ComponentProps, EventReturnWithStateObject } from '../../types'

export type Props = ComponentProps & {
  id?: string
  mode?: 'static' | 'strict' | 'loose'
  scrollTopOnStepChange?: boolean
  initialActiveIndex?: StepIndex
  onStepChange?: (
    index: StepIndex,
    mode: 'previous' | 'next'
  ) =>
    | EventReturnWithStateObject
    | void
    | Promise<EventReturnWithStateObject | void>
  children: React.ReactNode
  variant?: 'sidebar' | 'drawer'
  noAnimation?: boolean
  sidebarId?: string
}

function StepsLayout(props: Props) {
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
  } = useContext(DataContext)

  const id = useId(_id)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<StepIndex>(initialActiveIndex)
  const errorOnStepRef = useRef<Record<StepIndex, boolean>>({})

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
      mode,
    }: {
      index: StepIndex
      skipErrorCheck: boolean
      mode: 'previous' | 'next'
    }) => {
      handleSubmitCall({
        skipErrorCheck,
        skipFieldValidation: skipErrorCheck,
        enableAsyncBehaviour: isAsync(onStepChange),
        onSubmit: async () => {
          const result = await callOnStepChange(index, mode)

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
    (index: StepIndex, options?: { skipErrorCheck: boolean }) => {
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

  const providerValue = useMemo(
    () => ({
      activeIndex: activeIndexRef.current,
      setActiveIndex,
      handlePrevious,
      handleNext,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndexRef.current, setActiveIndex, handlePrevious, handleNext]
  )

  // - Handle shared state
  const sharedState = useSharedState<StepsContextState>(
    hasContext && id ? id + '-steps' : undefined
  )
  const { extend } = sharedState
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
    warn('You may wrap StepsLayout in Form.Handler')
    return (
      <Provider>
        <StepsLayout {...props} id={id} />
      </Provider>
    )
  }

  return (
    <StepsContext.Provider value={providerValue}>
      <Space
        className={classnames(
          'dnb-forms-steps-layout',
          variant === 'drawer' && 'dnb-forms-steps-layout--drawer',
          className
        )}
        {...rest}
      >
        <aside className="dnb-forms-steps-layout__sidebar">
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

        <div className="dnb-forms-steps-layout__contents">
          <Contents />
        </div>
      </Space>
    </StepsContext.Provider>
  )
}

StepsLayout._supportsSpacingProps = true

export default StepsLayout
