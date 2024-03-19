import React, { useContext, useCallback, useRef, useReducer } from 'react'
import classnames from 'classnames'
import { Space, StepIndicator } from '../../../components'
import { warn } from '../../../shared/component-helper'
import { isAsync } from '../../../shared/helpers/isAsync'
import useId from '../../../shared/helpers/useId'
import DataContext from '../DataContext/Context'
import Step, { Props as StepProps } from './Step'
import StepsContext from './StepsContext'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import Buttons from './Buttons'
import Provider from '../DataContext/Provider'
import { ComponentProps, EventReturnWithStateObject } from '../types'

export type Props = ComponentProps & {
  id?: string
  mode?: 'static' | 'strict' | 'loose'
  scrollTopOnStepChange?: boolean
  initialActiveIndex?: number
  onStepChange?: (
    index: number,
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
  const dataContext = useContext(DataContext)
  const {
    hasContext,
    setFormState,
    handleSubmitCall,
    setShowAllErrors,
    showAllErrors,
    scrollToTop,
  } = dataContext

  const id = useId(_id)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const activeIndexRef = useRef<number>(initialActiveIndex)
  const errorOnStepRef = useRef<Record<number, boolean>>({})

  // Store the current state of showAllErrors
  errorOnStepRef.current[activeIndexRef.current] = showAllErrors

  const callOnStepChange = useCallback(
    async (index: number, mode: 'previous' | 'next') => {
      if (isAsync(onStepChange)) {
        return await onStepChange(index, mode)
      }

      return onStepChange?.(index, mode)
    },
    [onStepChange]
  )

  const handlePrevious = useCallback(() => {
    handleSubmitCall({
      skipFieldValidation: true,
      skipErrorCheck: true,
      enableAsyncBehaviour: isAsync(onStepChange),
      onSubmit: async () => {
        const result = await callOnStepChange(
          activeIndexRef.current - 1,
          'previous'
        )

        // Hide async indicator
        setFormState('abort')

        if (!(result instanceof Error)) {
          activeIndexRef.current = activeIndexRef.current - 1
          forceUpdate()
        }

        if (scrollTopOnStepChange) {
          scrollToTop()
        }

        return result
      },
    })
  }, [
    callOnStepChange,
    handleSubmitCall,
    onStepChange,
    scrollToTop,
    scrollTopOnStepChange,
    setFormState,
  ])

  const handleNext = useCallback(() => {
    handleSubmitCall({
      enableAsyncBehaviour: isAsync(onStepChange),
      onSubmit: async () => {
        const result = await callOnStepChange(
          activeIndexRef.current + 1,
          'next'
        )

        // Hide async indicator
        setFormState('abort')

        // Set the showAllErrors to the step we got to
        setShowAllErrors(
          errorOnStepRef.current[activeIndexRef.current + 1]
        )

        if (!(result instanceof Error)) {
          activeIndexRef.current = activeIndexRef.current + 1
          forceUpdate()
        }

        if (scrollTopOnStepChange) {
          scrollToTop()
        }

        return result
      },
    })
  }, [
    callOnStepChange,
    handleSubmitCall,
    onStepChange,
    scrollToTop,
    scrollTopOnStepChange,
    setFormState,
    setShowAllErrors,
  ])

  const stepIndicatorData = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Step) {
      throw new Error('Only Step can be children of StepsLayout')
    }
    return child.props.title ?? 'Title missing'
  }) as string[]

  const handleChange = useCallback(
    ({ current_step }) => {
      activeIndexRef.current = current_step

      // Set the showAllErrors to the step we got to
      setShowAllErrors(errorOnStepRef.current[current_step])

      forceUpdate()
    },
    [setShowAllErrors]
  )

  if (!hasContext) {
    warn('You may wrap StepsLayout in Form.Handler')
    return (
      <Provider>
        <StepsLayout {...props} id={id} />
      </Provider>
    )
  }

  return (
    <StepsContext.Provider
      value={{
        activeIndex: activeIndexRef.current,
        handlePrevious,
        handleNext,
      }}
    >
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
            data={stepIndicatorData}
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
          {React.Children.map(children, (child, i) => {
            if (React.isValidElement(child) && child.type === Step) {
              return React.cloneElement(
                child as React.ReactElement<StepProps>,
                {
                  index: i,
                }
              )
            }
            return child
          })}
        </div>
      </Space>
    </StepsContext.Provider>
  )
}

StepsLayout._supportsSpacingProps = true

StepsLayout.Step = Step
StepsLayout.NextButton = NextButton
StepsLayout.PreviousButton = PreviousButton
StepsLayout.Buttons = Buttons

export default StepsLayout
