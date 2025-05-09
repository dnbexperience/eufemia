import React, { useContext, useLayoutEffect } from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate, Value, Wizard } from '../../..'
import { Div } from '../../../../../elements'
import DataContext from '../../../DataContext/Context'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('PushContainer', () => {
  it('should add a new entry to the array', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler onChange={onChange}>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    await userEvent.type(input, 'Tony')

    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(button)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        entries: [
          {
            name: 'Tony',
          },
        ],
      },
      expect.anything()
    )
  })

  it('should show errors when pressing commit button', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )
  })

  it('should not show error after commit and opening the container again when inside Wizard', async () => {
    render(
      <Form.Handler>
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <Iterate.Array path="/entries">
              <Value.String itemPath="/name" />
            </Iterate.Array>

            <Iterate.PushContainer
              path="/entries"
              required
              bubbleValidation
              openButton={
                <Iterate.PushContainer.OpenButton id="open-button" />
              }
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <Field.String itemPath="/name" />
            </Iterate.PushContainer>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    })

    await userEvent.type(document.querySelector('input'), 'foo')
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate__done-button')
    )

    expect(
      document.querySelector('.dnb-forms-value-block')
    ).toHaveTextContent('foo')

    await userEvent.click(
      document.querySelector('.dnb-forms-iterate__open-button')
    )

    await expect(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    }).toNeverResolve()

    await userEvent.type(document.querySelector('input'), 'bar')
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate__done-button')
    )

    expect(
      document.querySelectorAll('.dnb-forms-value-block')[1]
    ).toHaveTextContent('bar')
  })

  describe('defaultData', () => {
    it('should not mutate when used in Wizard', async () => {
      const defaultData = {
        name: 'Tony',
      }

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>

              <Iterate.PushContainer
                path="/entries"
                defaultData={defaultData}
              >
                <Field.String itemPath="/name" />
              </Iterate.PushContainer>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const previousButton = () => {
        return document.querySelector('.dnb-forms-previous-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelector('input')).toHaveValue('Tony')

      await userEvent.type(document.querySelector('input'), 'X{Backspace}')

      expect(document.querySelector('input')).toHaveValue('Tony')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelector('input')).toHaveValue('Tony')
    })
  })

  describe('showResetButton', () => {
    it('should show a reset button', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" showResetButton>
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector(
        '.dnb-forms-iterate__reset-button'
      )

      expect(button).toBeInTheDocument()

      await userEvent.type(input, 'foo')

      expect(button).toHaveTextContent(nb.IterateEditContainer.resetButton)

      // Click the reset button
      await userEvent.click(button)

      expect(input).toHaveValue('foo')

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      expect(input).toHaveValue('')
    })

    it('should be disabled when there is no content', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" showResetButton>
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector(
        '.dnb-forms-iterate__reset-button'
      )

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()

      await userEvent.type(input, 'foo')

      expect(button).not.toBeDisabled()
      expect(button).toHaveTextContent(nb.IterateEditContainer.resetButton)

      // Click the reset button
      await userEvent.click(button)

      expect(button).not.toBeDisabled()

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      expect(button).toBeDisabled()
    })

    it('should be disabled when there is no content for advanced content', async () => {
      const formData = {
        persons: [
          {
            firstName: 'Ola',
            lastName: 'Nordmann',
          },
          {
            firstName: 'Kari',
            lastName: 'Nordmann',
          },
        ],
      }

      function ExistingPersonDetails() {
        const { data, getValue } = Form.useData<{
          selectedPerson: string
        }>()
        const person = getValue(data.selectedPerson)?.data || {}

        return (
          <>
            <Field.Name.First
              readOnly
              itemPath="/firstName"
              value={person.firstName}
            />
            <Field.Name.Last
              readOnly
              itemPath="/lastName"
              value={person.lastName}
            />
          </>
        )
      }

      function PushContainerContent() {
        const { data, update } = Form.useData<{ selectedPerson: string }>()

        // Clear the PushContainer data when the selected person is "other",
        // so the fields do not inherit existing data.
        useLayoutEffect(() => {
          if (data.selectedPerson === 'other') {
            update('/pushContainerItems/0', {})
          }
        }, [data.selectedPerson, update])

        return (
          <>
            <Field.Selection
              variant="radio"
              required
              path="/selectedPerson"
              dataPath="/persons"
            >
              <Field.Option value="other" label="Other person" />
            </Field.Selection>

            <ExistingPersonDetails />
          </>
        )
      }

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <Iterate.PushContainer
                showResetButton
                path="/representatives"
                isolatedData={{
                  persons: formData.persons.map((data, i) => {
                    return {
                      title: [data.firstName, data.lastName].join(' '),
                      value: '/persons/' + i,
                      data,
                    }
                  }),
                }}
              >
                <PushContainerContent />
              </Iterate.PushContainer>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).toBeDisabled()

      await userEvent.click(screen.getByText('Ola Nordmann'))
      expect(screen.getByLabelText('Ola Nordmann')).toBeChecked()
      expect(screen.getByLabelText('Kari Nordmann')).not.toBeChecked()

      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).not.toBeDisabled()

      // Click the reset button
      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__reset-button')
      )

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))
      expect(screen.getByLabelText('Ola Nordmann')).not.toBeChecked()

      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).toBeDisabled()

      await userEvent.click(screen.getByText('Kari Nordmann'))
      expect(screen.getByLabelText('Kari Nordmann')).toBeChecked()

      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).not.toBeDisabled()

      // Click the reset button
      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__reset-button')
      )

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).toBeDisabled()
    })

    it('should focus on the reset button wrapper after confirming the reset', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" showResetButton>
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector(
        '.dnb-forms-iterate__reset-button'
      )

      expect(button).not.toHaveFocus()

      await userEvent.type(input, 'foo')

      // Click the reset button
      await userEvent.click(button)

      // expect(button).toHaveFocus()

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      const wrapper = button.parentElement

      // expect(wrapper).toHaveFocus()
      expect(wrapper).toHaveClass('dnb-no-focus')
      expect(wrapper).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('requireCommit', () => {
    it('should prevent the form from submitting as long as there is uncommitted data', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer
            path="/entries"
            requireCommit
            onCommit={onCommit}
          >
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(commitButton)

      expect(onCommit).toHaveBeenCalledTimes(1)

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should show error when submitting the form', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" requireCommit>
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.IteratePushContainer.requireCommitText
      )

      await userEvent.click(commitButton)

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    describe('with emptyValue prop', () => {
      it('should submit when "emptyValue" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer path="/entries" requireCommit>
              <Field.String
                itemPath="/name"
                emptyValue="The empty value"
              />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'The empty value' }] },
          expect.anything()
        )
      })

      it('should reset to emptyValue when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer path="/entries" requireCommit>
              <Field.String
                itemPath="/name"
                emptyValue="The empty value"
              />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('The empty valueX')
        expect(
          document.querySelector('.dnb-forms-iterate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'The empty value' }] },
          expect.anything()
        )
      })
    })

    describe('with defaultValue prop', () => {
      it('should submit when "defaultValue" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer path="/entries" requireCommit>
              <Field.String
                itemPath="/name"
                defaultValue="A default value"
              />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })

      it('should reset to defaultValue when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer path="/entries" requireCommit>
              <Field.String
                itemPath="/name"
                defaultValue="A default value"
              />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A default valueX')
        expect(
          document.querySelector('.dnb-forms-iterate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })
    })

    describe('with defaultData prop', () => {
      it('should submit when "defaultData" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer
              path="/entries"
              defaultData={{ name: 'A default value' }}
              requireCommit
            >
              <Field.String itemPath="/name" />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })

      it('should reset to defaultData when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer
              path="/entries"
              defaultData={{ name: 'A default value' }}
              requireCommit
            >
              <Field.String itemPath="/name" />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A default valueX')
        expect(
          document.querySelector('.dnb-forms-iterate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })
    })

    describe('with data prop', () => {
      it('should submit when "data" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer
              path="/entries"
              data={{ name: 'A default value' }}
              requireCommit
            >
              <Field.String itemPath="/name" />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })

      it('should reset to data when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.PushContainer
              path="/entries"
              data={{ name: 'A default value' }}
              requireCommit
            >
              <Field.String itemPath="/name" />
            </Iterate.PushContainer>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-iterate__done-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A default valueX')
        expect(
          document.querySelector('.dnb-forms-iterate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { entries: [{ name: 'A default value' }] },
          expect.anything()
        )
      })
    })

    it('should prevent Wizard step change as long as there is uncommitted data', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()
      const onStepChange = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>

              <Iterate.Array path="/entries">...</Iterate.Array>

              <Iterate.PushContainer
                path="/entries"
                onCommit={onCommit}
                requireCommit
              >
                <Field.String itemPath="/name" />
              </Iterate.PushContainer>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      await userEvent.type(input, 'Tony')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()

      await userEvent.click(commitButton)

      expect(onCommit).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(
        1,
        'next',
        expect.anything()
      )

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should show reset button when there is uncommitted data and the form was submitted', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" requireCommit>
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).toBeInTheDocument()

      await userEvent.click(commitButton)

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('.dnb-forms-iterate__reset-button')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)
    })

    it('should submit form when uncommitted data was cleared (with confirmation)', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer
            path="/entries"
            onCommit={onCommit}
            requireCommit
          >
            <Field.String itemPath="/name" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.IteratePushContainer.requireCommitText
      )

      // Click the reset button
      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__reset-button')
      )

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      expect(onCommit).toHaveBeenCalledTimes(0)
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)
    })
  })

  describe('bubbleValidation', () => {
    it('should prevent the form from submitting as long as there are errors', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer
            path="/entries"
            bubbleValidation
            onCommit={onCommit}
          >
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.click(commitButton)

      expect(onCommit).toHaveBeenCalledTimes(0)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)

      await userEvent.type(input, 'Tony')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(commitButton)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should not show errors when submitting the form when bubbleValidation is false', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" bubbleValidation={false}>
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should show errors when submitting the form', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" bubbleValidation>
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')

      fireEvent.submit(form)

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.type(input, 'Tony')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)
    })

    describe('inside Wizard', () => {
      const previousButton = () => {
        return document.querySelector('.dnb-forms-previous-button')
      }
      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      it('should not prevent Wizard navigation when no error messages are present', async () => {
        render(
          <Form.Handler>
            <Wizard.Container>
              <Wizard.Step>
                <output>Step 1</output>

                <Iterate.PushContainer
                  path="/myList"
                  bubbleValidation
                  openButton={
                    <Iterate.PushContainer.OpenButton id="open-button" />
                  }
                  showOpenButtonWhen={() => true}
                >
                  <Field.String itemPath="/foo" required />
                </Iterate.PushContainer>

                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step>
                <output>Step 2</output>

                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(document.querySelector('#open-button'))
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      it('should show required error after navigating forth and back and opening and closing the container', async () => {
        render(
          <Form.Handler>
            <Wizard.Container>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Iterate.PushContainer
                  path="/does-not-matter"
                  openButton={<Iterate.PushContainer.OpenButton />}
                  showOpenButtonWhen={() => true}
                  bubbleValidation
                >
                  <Field.String required itemPath="/initiateError" />
                </Iterate.PushContainer>
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Field.String path="/otherStep" />
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__open-button')
        )

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__cancel-button')
        )

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__open-button')
        )

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
    })
  })

  it('should show view container after adding a new entry', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/entries">
          <Iterate.EditContainer>EditContainer</Iterate.EditContainer>
          <Iterate.ViewContainer>ViewContainer</Iterate.ViewContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    await userEvent.type(input, 'Tony')

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(0)

    await userEvent.click(button)

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-forms-section-view-block')
      ).toHaveAttribute('aria-hidden', 'false')
    })
  })

  it('should clear the input without an error, when the submit button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.Name.First itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    await userEvent.type(input, '1')
    await userEvent.click(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    await userEvent.type(input, '{Backspace}Tony')

    expect(input).toHaveValue('Tony')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })

  it('should validate input values', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.Name.Last itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should support "required" prop', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries" required>
          <Field.Name.Last itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should inherit "required" from DataContext', async () => {
    render(
      <Form.Handler required>
        <Iterate.PushContainer path="/entries">
          <Field.Name.Last itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should render the "title"', () => {
    render(
      <Iterate.PushContainer path="/entries" title="New entry">
        <Field.String itemPath="/name" />
      </Iterate.PushContainer>
    )

    const title = document.querySelector('.dnb-p--lead')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('New entry')
  })

  it('should render children with initial data value as an object', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries" data={{ name: 'Tony' }}>
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Tony')
  })

  it('should render children with initial data value as a string', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/" data="bar">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )

    await userEvent.type(input, '{Backspace>3}baz')
    expect(input).toHaveValue('baz')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar', 'baz'],
      expect.anything()
    )
  })

  it('should render children and not the button', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={<Iterate.PushContainer.OpenButton />}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')

    expect(document.querySelectorAll('button')).toHaveLength(1)
    expect(
      document.querySelector('.dnb-forms-section-block__inner button')
    ).toBeInTheDocument()
  })

  it('should render correct button text', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const button = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(nb.IteratePushContainer.createButton)
  })

  it('should not show cancel button when no entries are given', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(
      nb.IteratePushContainer.createButton
    )
  })

  it('should show cancel button when open button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={<Iterate.PushContainer.OpenButton />}
          showOpenButtonWhen={(list) => list.length > 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const editBlock = document.querySelector(
      '.dnb-forms-section-edit-block'
    )

    expect(editBlock).toHaveAttribute('aria-hidden', 'false')

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[0])
    }

    expect(editBlock).toHaveAttribute('aria-hidden', 'true')

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate__open-button')
    )

    expect(editBlock).toHaveAttribute('aria-hidden', 'false')

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )
      expect(buttons[1]).toHaveTextContent(
        nb.IterateEditContainer.cancelButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[1])
    }

    expect(editBlock).toHaveAttribute('aria-hidden', 'true')

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate__open-button')
    )

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )
      expect(buttons[1]).toHaveTextContent(
        nb.IterateEditContainer.cancelButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[1])

      expect(editBlock).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('should render OpenButton and hide the form', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={
            <Iterate.PushContainer.OpenButton text="Add new entry" />
          }
          showOpenButtonWhen={(list) => list.length === 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(3)

    const [addButton, cancelButton, openButton] = Array.from(buttons)

    expect(addButton).toHaveTextContent(
      nb.IteratePushContainer.createButton
    )
    expect(cancelButton).toHaveTextContent(
      nb.IterateEditContainer.cancelButton
    )
    expect(openButton).toHaveTextContent('Add new entry')
    expect(document.querySelector('.dnb-forms-section-block')).toHaveClass(
      'dnb-height-animation--hidden'
    )
    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render custom Toolbar', () => {
    const Toolbar = (props) => {
      return (
        <Div id="toolbar" {...props}>
          Custom Toolbar
        </Div>
      )
    }
    Toolbar._supportsSpacingProps = true

    render(
      <Form.Handler>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/" />
          <Toolbar />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const toolbar = document.querySelector('#toolbar')
    expect(toolbar).toHaveTextContent('Custom Toolbar')
    expect(toolbar).toHaveClass('dnb-space__top--medium')
  })

  it('should support spacing props', () => {
    render(
      <Iterate.PushContainer top="large" path="/entries">
        <Field.String itemPath="/name" />
      </Iterate.PushContainer>
    )

    expect(
      document.querySelector('.dnb-forms-section-block__inner')
    ).toHaveClass('dnb-space__top--large')
  })

  it('should support array data', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('')

    await userEvent.type(input, 'bar')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )
  })

  describe('defaultValue', () => {
    it('should render and set defaultValue in data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/myList">
            <Field.String itemPath="/foo" defaultValue="bar" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('bar')
      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('bar')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myList: [{ foo: 'bar' }],
        },
        expect.anything()
      )

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('bar')
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myList: [{ foo: 'bar' }, { foo: 'bar' }],
        },
        expect.anything()
      )
    })

    it('should support "/" as the path and push the defaultValue', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/">
            <Field.String itemPath="/" defaultValue="foo" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('foo')
      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('foo')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(['foo'], expect.anything())

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('foo')
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        ['foo', 'foo'],
        expect.anything()
      )
    })

    it('should render and extend the data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler data={['foo']} onChange={onChange}>
          <Iterate.Array path="/">
            <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
            <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushContainer path="/">
            <Field.String itemPath="/" defaultValue="bar" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const blocks = Array.from(
        document.querySelectorAll('.dnb-forms-section-block')
      )
      const [, , thirdBlock] = blocks

      const input = thirdBlock.querySelector('input')
      expect(input).toHaveValue('bar')

      await userEvent.click(thirdBlock.querySelector('button'))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        ['foo', 'bar'],
        expect.anything()
      )
    })

    it('should not show error message after clearing', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/entries">
            <Field.Name.First
              itemPath="/first"
              defaultValue="first name"
              required
            />
            <Field.Name.Last
              itemPath="/last"
              defaultValue="last name"
              required
            />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const [firstInput, lastInput] = Array.from(
        document.querySelectorAll('input')
      )
      const button = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })
    })

    it('should keep the defaultValue after clearing', async () => {
      const onChange = jest.fn()
      const onCommit = jest.fn()

      let internalContext = null
      const CollectInternalData = () => {
        internalContext = useContext(DataContext)
        return null
      }

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/" onCommit={onCommit}>
            <Field.String itemPath="/" defaultValue="default value" />
            <CollectInternalData />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(internalContext).toMatchObject({
        data: {
          pushContainerItems: ['default value'],
        },
      })

      const input = document.querySelector('input')

      await userEvent.type(input, ' changed')

      const button = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.click(button)
      expect(internalContext.internalDataRef.current).toEqual({
        pushContainerItems: ['default value'],
      })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        ['default value changed'],
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenLastCalledWith(
        ['default value changed'],
        expect.anything()
      )

      await userEvent.click(button)
      expect(internalContext.internalDataRef.current).toEqual({
        pushContainerItems: ['default value'],
      })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        ['default value changed', 'default value'],
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(2)
      expect(onCommit).toHaveBeenLastCalledWith(
        ['default value changed', 'default value'],
        expect.anything()
      )
    })
  })

  it('should support initial data as a string', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/" data="bar">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )

    await userEvent.type(input, '{Backspace>3}baz')
    expect(input).toHaveValue('baz')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar', 'baz'],
      expect.anything()
    )
  })

  it('should support {nextItemNo}', async () => {
    render(
      <Form.Handler data={{ myList: undefined }}>
        <Iterate.Array path="/myList">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer
          path="/myList"
          openButton={
            <Iterate.PushContainer.OpenButton text="Add no. {nextItemNo}" />
          }
          showOpenButtonWhen={(list) => list.length >= 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const openButton = document.querySelector(
      '.dnb-forms-iterate__open-button'
    )
    const doneButton = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    expect(openButton).toHaveTextContent('Add no. 1')

    await userEvent.click(doneButton)
    expect(openButton).toHaveTextContent('Add no. 2')

    const removeButton = document.querySelectorAll('button')[1]
    await userEvent.click(removeButton)
    expect(openButton).toHaveTextContent('Add no. 1')
  })

  it('should inherit "limit" prop from Array and show warning when limit is reached', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList" limit={2}>
          <i />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushContainer path="/myList">
          content
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const doneButton = document.querySelector(
      '.dnb-forms-iterate__done-button'
    )

    // Add first item
    await userEvent.click(doneButton)

    // Add second item
    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    // Try a third one
    await userEvent.click(doneButton)

    await waitFor(() => {
      const element = document.querySelector('.dnb-form-status')
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent('Du har nådd grensen på: 2')
      expect(element).toHaveClass('dnb-form-status--warn')
      expect(document.querySelectorAll('i')).toHaveLength(2)
    })

    const removeButton = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )
    await userEvent.click(removeButton)

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })

  describe('itemPath', () => {
    it('should add item to the correct array', async () => {
      let collectedData = null

      render(
        <Form.Handler
          data={{
            outer: [{ inner: [] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
              <Iterate.RemoveButton />
            </Iterate.Array>

            <Iterate.PushContainer itemPath="/inner">
              <Field.String itemPath="/" defaultValue="bar" />
            </Iterate.PushContainer>
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              collectedData = context.data
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(collectedData).toEqual({
        outer: [{ inner: [] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__done-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['bar'] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-remove-element-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: [] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__done-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['bar'] }],
      })
    })

    it('should use itemPath to determine the initial amount of items when "showOpenButtonWhen" is used', async () => {
      render(
        <Form.Handler
          data={{
            outer: [{ inner: ['existing item'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
            </Iterate.Array>

            <Iterate.PushContainer
              itemPath="/inner"
              openButton={<Iterate.PushContainer.OpenButton />}
              showOpenButtonWhen={() => true}
            >
              <Field.String itemPath="/" />
            </Iterate.PushContainer>
          </Iterate.Array>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-iterate__open-button')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-forms-section-block')
      ).toHaveClass('dnb-height-animation--hidden')

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate__open-button')
      )

      expect(
        document.querySelector('.dnb-forms-section-block')
      ).toHaveClass('dnb-height-animation--is-visible')
    })

    it('should show PushContainer based on the amount of items', async () => {
      render(
        <Form.Handler
          data={{
            outer: [{ inner: ['existing item'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
              <Iterate.RemoveButton />
            </Iterate.Array>

            <Iterate.PushContainer
              itemPath="/inner"
              openButton={<Iterate.PushContainer.OpenButton />}
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <Field.String itemPath="/" />
            </Iterate.PushContainer>
          </Iterate.Array>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-section-block')
      ).toHaveClass('dnb-height-animation--hidden')

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-remove-element-button')
      )

      await new Promise((resolve) => setTimeout(resolve, 1000))

      expect(
        document.querySelector('.dnb-forms-section-block')
      ).toHaveClass('dnb-height-animation--is-visible')
    })
  })

  describe('insertAt', () => {
    it('should add a new entry to the beginning of the array', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler
          onChange={onChange}
          defaultData={{
            entries: ['Existing'],
          }}
        >
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" insertAt={0}>
            <Field.String itemPath="/" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector(
        '.dnb-forms-iterate__done-button'
      )

      await userEvent.type(input, 'First entry')

      expect(onChange).toHaveBeenCalledTimes(0)

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: ['First entry', 'Existing'],
        },
        expect.anything()
      )
    })
  })

  it('should support Visibility', async () => {
    render(
      <Form.Handler
        defaultData={{
          isVisible: false,
          entries: [
            {
              foo: 'First entry',
            },
          ],
        }}
      >
        <Field.Boolean variant="button" path="/isVisible" />

        <Iterate.PushContainer path="/entries">
          <Form.Visibility pathTrue="/isVisible">
            <output>content</output>
          </Form.Visibility>
        </Iterate.PushContainer>
      </Form.Handler>
    )

    expect(document.querySelector('output')).toBeNull()

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('output')).toBeInTheDocument()
  })
})
