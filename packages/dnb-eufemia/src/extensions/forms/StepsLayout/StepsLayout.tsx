import React, { useContext, useState, useCallback } from 'react'
import classnames from 'classnames'
import { Div } from '../../../elements'
import { StepIndicator } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import DataContext from '../DataContext/Context'
import Step, { Props as StepProps } from './Step'
import StepsContext from './StepsContext'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import Buttons from './Buttons'

export type Props = ComponentProps & {
  mode?: 'static' | 'strict' | 'loose'
  scrollTopOnStepChange?: boolean
  initialActiveIndex?: number
  onStepChange?: (index: number) => void
  children: React.ReactNode
}

function StepsLayout(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    mode = 'loose',
    scrollTopOnStepChange,
    initialActiveIndex = 0,
    onStepChange,
    children,
  } = props
  const dataContext = useContext(DataContext)
  const [activeIndex, setActiveIndex] =
    useState<number>(initialActiveIndex)

  const handlePrevious = useCallback(() => {
    setActiveIndex((activeIndex) => {
      onStepChange?.(activeIndex - 1)
      return activeIndex - 1
    })
    if (scrollTopOnStepChange) {
      window?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [scrollTopOnStepChange, onStepChange])

  const handleNext = useCallback(() => {
    if (!dataContext.hasErrors()) {
      setActiveIndex((activeIndex) => {
        onStepChange?.(activeIndex + 1)
        return activeIndex + 1
      })
      if (scrollTopOnStepChange) {
        window?.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      dataContext.setShowAllErrors(true)
    }
  }, [dataContext, scrollTopOnStepChange, onStepChange])

  const stepIndicatorData = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Step) {
      throw new Error('Only Step can be children of Steps')
    }
    return child.props.title ?? 'Title missing'
  }) as string[]

  const handleChange = useCallback(({ current_step }) => {
    setActiveIndex(current_step)
  }, [])

  return (
    <StepsContext.Provider
      value={{
        activeIndex,
        handlePrevious,
        handleNext,
      }}
    >
      <Div
        className={classnames('dnb-forms-steps-layout', className)}
        data-testid={dataTestId ?? 'steps-layoyt'}
        {...forwardSpaceProps(props)}
      >
        <aside className="dnb-forms-steps-layout__sidebar">
          <StepIndicator.Sidebar sidebar_id="steps-sidebar" />
          <StepIndicator
            bottom
            current_step={activeIndex}
            data={stepIndicatorData}
            mode={mode}
            no_animation
            on_change={handleChange}
            sidebar_id="steps-sidebar"
            title=""
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
      </Div>
    </StepsContext.Provider>
  )
}

StepsLayout.Step = Step
StepsLayout.NextButton = NextButton
StepsLayout.PreviousButton = PreviousButton
StepsLayout.Buttons = Buttons

export default StepsLayout
