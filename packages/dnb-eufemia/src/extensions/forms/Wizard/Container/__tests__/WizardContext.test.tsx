import React, { useCallback } from 'react'
import { render } from '@testing-library/react'
import { wait } from '../../../../../core/jest/jestSetup'
import { Wizard } from '../../..'
import userEvent from '@testing-library/user-event'

import useStep from '../../hooks/useStep'
import { Button } from '../../../../../components'

jest.mock('../../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../../shared/component-helper'
  )
  return {
    ...original,
    warn: jest.fn(),
  }
})

describe('Wizard.Context', () => {
  describe('with "setActiveIndex"', () => {
    const previousButton = () => {
      return document.querySelector('.dnb-forms-previous-button')
    }
    const nextButton = () => {
      return document.querySelector('.dnb-forms-next-button')
    }
    const output = () => {
      return document.querySelector('output')
    }

    it('should skip onStepChange call when skipStepChangeCallBeforeMounted is true', async () => {
      const onStepChange = jest.fn()

      const MyStep = ({ title }) => {
        const { activeIndex, setActiveIndex } = useStep()

        const previous = useCallback(() => {
          setActiveIndex(activeIndex - 1, {
            skipStepChangeCallBeforeMounted: true,
          })
        }, [activeIndex, setActiveIndex])
        const next = useCallback(() => {
          setActiveIndex(activeIndex + 1, {
            skipStepChangeCallBeforeMounted: true,
          })
        }, [activeIndex, setActiveIndex])

        return (
          <Wizard.Step title={title}>
            <output>{title}</output>
            <Button
              className="dnb-forms-previous-button"
              on_click={previous}
            />
            <Button className="dnb-forms-next-button" on_click={next} />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container onStepChange={onStepChange}>
          <MyStep title="Step 1" />
          <MyStep title="Step 2" />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await wait(100) // wait for the isInteractionRef to be set

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(2)

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(3)
    })

    it('should skip onStepChange call when skipStepChangeCall is true', async () => {
      const onStepChange = jest.fn()

      const MyStep = ({ title }) => {
        const { activeIndex, setActiveIndex } = useStep()

        const previous = useCallback(() => {
          setActiveIndex(activeIndex - 1, {
            skipStepChangeCall: true,
          })
        }, [activeIndex, setActiveIndex])
        const next = useCallback(() => {
          setActiveIndex(activeIndex + 1, {
            skipStepChangeCall: true,
          })
        }, [activeIndex, setActiveIndex])

        return (
          <Wizard.Step title={title}>
            <output>{title}</output>
            <Button
              className="dnb-forms-previous-button"
              on_click={previous}
            />
            <Button className="dnb-forms-next-button" on_click={next} />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container onStepChange={onStepChange}>
          <MyStep title="Step 1" />
          <MyStep title="Step 2" />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await wait(100) // wait for the isInteractionRef to be set

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(0)
    })

    it('should skip internal (given in the hook) data onStepChange call when skipStepChangeCallFromHook is true', async () => {
      const onStepChange = jest.fn()

      const MyStep = ({ title }) => {
        const { activeIndex, setActiveIndex } = useStep(undefined, {
          onStepChange,
        })

        const previous = useCallback(() => {
          setActiveIndex(activeIndex - 1, {
            skipStepChangeCallFromHook: true,
          })
        }, [activeIndex, setActiveIndex])
        const next = useCallback(() => {
          setActiveIndex(activeIndex + 1, {
            skipStepChangeCallFromHook: false,
          })
        }, [activeIndex, setActiveIndex])

        return (
          <Wizard.Step title={title}>
            <output>{title}</output>
            <Button
              className="dnb-forms-previous-button"
              on_click={previous}
            />
            <Button className="dnb-forms-next-button" on_click={next} />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container>
          <MyStep title="Step 1" />
          <MyStep title="Step 2" />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await wait(100) // wait for the isInteractionRef to be set

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(2)
    })
  })
})
