import React, { useContext, useState, useCallback } from 'react'
import classnames from 'classnames'
import { Space, StepIndicator } from '../../../components'
import { warn } from '../../../shared/component-helper'
import { ComponentProps } from '../types'
import DataContext from '../DataContext/Context'
import Step, { Props as StepProps } from './Step'
import StepsContext from './StepsContext'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import Buttons from './Buttons'
import Provider from '../DataContext/Provider'
import useId from '../hooks/useId'

export type Props = ComponentProps & {
  id?: string
  mode?: 'static' | 'strict' | 'loose'
  scrollTopOnStepChange?: boolean
  initialActiveIndex?: number
  onStepChange?: (index: number) => void
  children: React.ReactNode
  variant?: 'sidebar' | 'drawer'
  noAnimation?: boolean
  title?: string
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
    title = '',
    sidebarId,
    ...rest
  } = props
  const dataContext = useContext(DataContext)
  const { hasContext, hasErrors, setShowAllErrors, scrollToTop } =
    dataContext

  const [activeIndex, setActiveIndex] =
    useState<number>(initialActiveIndex)

  const id = useId(_id)

  const handlePrevious = useCallback(() => {
    setActiveIndex((activeIndex) => {
      onStepChange?.(activeIndex - 1)
      return activeIndex - 1
    })
    if (scrollTopOnStepChange) {
      scrollToTop()
    }
  }, [scrollTopOnStepChange, onStepChange, scrollToTop])

  const handleNext = useCallback(() => {
    if (!hasErrors()) {
      setActiveIndex((activeIndex) => {
        onStepChange?.(activeIndex + 1)
        return activeIndex + 1
      })
      if (scrollTopOnStepChange) {
        scrollToTop()
      }
    } else {
      setShowAllErrors(true)
    }
  }, [
    hasErrors,
    scrollTopOnStepChange,
    onStepChange,
    scrollToTop,
    setShowAllErrors,
  ])

  const stepIndicatorData = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Step) {
      throw new Error('Only Step can be children of StepsLayout')
    }
    return child.props.title ?? 'Title missing'
  }) as string[]

  const handleChange = useCallback(({ current_step }) => {
    setActiveIndex(current_step)
  }, [])

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
        activeIndex,
        handlePrevious,
        handleNext,
      }}
    >
      <Space
        className={classnames('dnb-forms-steps-layout', className)}
        {...rest}
      >
        <aside className="dnb-forms-steps-layout__sidebar">
          <StepIndicator.Sidebar sidebar_id={id} />
          <StepIndicator
            bottom
            current_step={activeIndex}
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
            title={title}
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
