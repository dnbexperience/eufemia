import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, JSONSchema } from '../../..'
import { axeComponent } from '../../../../../core/jest/jestSetup'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Field.Composition', () => {
  const blockError = 'FieldBlock error'
  const blockWarning = 'FieldBlock warning'
  const blockInfo = 'FieldBlock info'
  const firstError = 'First error'
  const firstWarning = 'First warning'
  const firstInfo = 'First info'
  const secondError = 'Second error'
  const secondWarning = 'Second warning'
  const secondInfo = 'Second info'

  it('should not display error messages initially', () => {
    render(
      <Field.Composition>
        <Field.String required />
        <Field.String required />
      </Field.Composition>
    )

    const element = document.querySelector('.dnb-form-status')
    expect(element).toBeNull()
  })

  it('should display both error messages with summary in one status', () => {
    render(
      <Field.Composition>
        <Field.String error={new Error(firstError)} />
        <Field.Number error={new Error(secondError)} />
      </Field.Composition>
    )

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent(
      nb.Field.errorSummary + firstError + secondError
    )

    const ul = document.querySelector('ul')
    expect(ul.previousSibling).toHaveTextContent(nb.Field.errorSummary)

    const [first, second] = Array.from(ul.querySelectorAll('li'))
    expect(first).toHaveTextContent(firstError)
    expect(second).toHaveTextContent(secondError)
  })

  it('should show identical messages once, initially', () => {
    render(
      <Field.Composition>
        <Field.String error={new Error(firstError)} />
        <Field.Number error={new Error(firstError)} />
      </Field.Composition>
    )

    const status = document.querySelector('.dnb-form-status')
    const ul = document.querySelector('ul')

    expect(ul).toBeNull()
    expect(status).toHaveTextContent(firstError)
  })

  it('should show identical messages once, interactively', async () => {
    render(
      <Field.Composition>
        <Field.String required warning={firstWarning} info={firstInfo} />
        <Field.Number required warning={firstWarning} info={firstInfo} />
      </Field.Composition>
    )

    const [firstInput, secondInput] = Array.from(
      document.querySelectorAll('input')
    )

    {
      const statuses = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )
      const [warningStatus, infoStatus] = statuses

      expect(statuses).toHaveLength(2)
      expect(warningStatus).toHaveTextContent(firstWarning)
      expect(infoStatus).toHaveTextContent(firstInfo)
    }

    await userEvent.type(firstInput, 'x{Backspace}')
    fireEvent.blur(firstInput)

    {
      const statuses = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )
      const [errorStatus, warningStatus, infoStatus] = statuses

      expect(statuses).toHaveLength(3)
      expect(errorStatus).toHaveTextContent(nb.Field.errorRequired)
      expect(warningStatus).toHaveTextContent(firstWarning)
      expect(infoStatus).toHaveTextContent(firstInfo)
    }

    await userEvent.type(firstInput, 'x')
    await userEvent.type(secondInput, '1{Backspace}')
    fireEvent.blur(secondInput)

    {
      const statuses = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )
      const [errorStatus, warningStatus, infoStatus] = statuses

      expect(statuses).toHaveLength(3)
      expect(errorStatus).toHaveTextContent(nb.Field.errorRequired)
      expect(warningStatus).toHaveTextContent(firstWarning)
      expect(infoStatus).toHaveTextContent(firstInfo)
    }

    await userEvent.type(secondInput, '1')

    {
      const statuses = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )
      const [warningStatus, infoStatus] = statuses

      expect(statuses).toHaveLength(2)
      expect(warningStatus).toHaveTextContent(firstWarning)
      expect(infoStatus).toHaveTextContent(firstInfo)
    }
  })

  it('should have display both error, warning and info messages', () => {
    render(
      <Field.Composition>
        <Field.String
          error={new Error(firstError)}
          warning={firstWarning}
          info={firstInfo}
        />
        <Field.Number
          error={new Error(secondError)}
          warning={secondWarning}
          info={secondInfo}
        />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + firstError + secondError
    )
    expect(warning).toHaveTextContent(
      nb.Field.stateSummary + firstWarning + secondWarning
    )
    expect(info).toHaveTextContent(
      nb.Field.stateSummary + firstInfo + secondInfo
    )
  })

  it('should combine nested FieldBlock messages', () => {
    render(
      <Field.Composition
        error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
      >
        <Field.String
          error={new Error(firstError)}
          warning={firstWarning}
          info={firstInfo}
        />
        <Field.Number
          error={new Error(secondError)}
          warning={secondWarning}
          info={secondInfo}
        />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    expect(warning).toHaveTextContent(
      nb.Field.stateSummary + blockWarning + firstWarning + secondWarning
    )
    expect(info).toHaveTextContent(
      nb.Field.stateSummary + blockInfo + firstInfo + secondInfo
    )
  })

  it('should show nested FieldBlock error initially for the first input', () => {
    render(
      <Field.Composition
        error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
      >
        <Field.String
          warning={firstWarning}
          info={firstInfo}
          required
          validateInitially
        />
        <Field.Number warning={secondWarning} info={secondInfo} required />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + nb.Field.errorRequired
    )
    expect(warning).toHaveTextContent(
      nb.Field.stateSummary + blockWarning + firstWarning + secondWarning
    )
    expect(info).toHaveTextContent(
      nb.Field.stateSummary + blockInfo + firstInfo + secondInfo
    )
  })

  it('should show nested FieldBlock error initially for the second input', () => {
    render(
      <Field.Composition
        error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
      >
        <Field.String warning={firstWarning} info={firstInfo} required />
        <Field.Number
          warning={secondWarning}
          info={secondInfo}
          required
          validateInitially
        />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + nb.Field.errorRequired
    )
    expect(warning).toHaveTextContent(
      nb.Field.stateSummary + blockWarning + firstWarning + secondWarning
    )
    expect(info).toHaveTextContent(
      nb.Field.stateSummary + blockInfo + firstInfo + secondInfo
    )
  })

  it('should handle all statuses together with interactive statuses', async () => {
    render(
      <Field.Composition
        error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
      >
        <Field.String
          error={new Error(firstError)}
          warning={firstWarning}
          info={firstInfo}
          required
        />
        <Field.Number
          error={new Error(secondError)}
          warning={secondWarning}
          info={secondInfo}
          required
        />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )

    const toHaveWarningAndInfo = () => {
      expect(warning).toHaveTextContent(
        nb.Field.stateSummary + blockWarning + firstWarning + secondWarning
      )
      expect(info).toHaveTextContent(
        nb.Field.stateSummary + blockInfo + firstInfo + secondInfo
      )
    }

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    const [firstInput, secondInput] = Array.from(
      document.querySelectorAll('input')
    )

    // 1. Check the "first" input
    await userEvent.type(firstInput, 'x')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(firstInput, '{Backspace}')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    fireEvent.blur(firstInput)

    expect(error).toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary +
        blockError +
        nb.Field.errorRequired +
        firstError +
        secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(firstInput, 'x')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )

    fireEvent.blur(firstInput)

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    // 2. Check the "second" input
    await userEvent.type(secondInput, '1')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(secondInput, '{Backspace}')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    fireEvent.blur(secondInput)

    expect(error).toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary +
        blockError +
        firstError +
        nb.Field.errorRequired +
        secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(secondInput, '1')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )

    fireEvent.blur(secondInput)

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()
  })

  it('should handle correct aria-describedby', async () => {
    render(
      <Field.Composition
        error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
      >
        <Field.String
          error={new Error(firstError)}
          warning={firstWarning}
          info={firstInfo}
          required
        />
        <Field.Number
          error={new Error(secondError)}
          warning={secondWarning}
          info={secondInfo}
          required
        />
      </Field.Composition>
    )

    const [error, warning, info] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )

    const toHaveWarningAndInfo = () => {
      expect(warning).toHaveTextContent(
        nb.Field.stateSummary + blockWarning + firstWarning + secondWarning
      )
      expect(info).toHaveTextContent(
        nb.Field.stateSummary + blockInfo + firstInfo + secondInfo
      )
    }

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    const [firstInput, secondInput] = Array.from(
      document.querySelectorAll('input')
    )

    // 1. Check the "first" input
    await userEvent.type(firstInput, 'x')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(firstInput, '{Backspace}')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    fireEvent.blur(firstInput)

    expect(error).toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary +
        blockError +
        nb.Field.errorRequired +
        firstError +
        secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(firstInput, 'x')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )

    fireEvent.blur(firstInput)

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    // 2. Check the "second" input
    await userEvent.type(secondInput, '1')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(secondInput, '{Backspace}')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()

    fireEvent.blur(secondInput)

    expect(error).toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary +
        blockError +
        firstError +
        nb.Field.errorRequired +
        secondError
    )
    toHaveWarningAndInfo()

    await userEvent.type(secondInput, '1')

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )

    fireEvent.blur(secondInput)

    expect(error).not.toHaveTextContent(nb.Field.errorRequired)
    expect(error).toHaveTextContent(
      nb.Field.errorSummary + blockError + firstError + secondError
    )
    toHaveWarningAndInfo()
  })

  describe('schema', () => {
    it('should show required error on submit', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['first', 'last'],
        properties: {
          first: {
            type: 'string',
          },
          last: {
            type: 'string',
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <Field.Composition>
            <Field.Name.First path="/first" />
            <Field.Name.Last path="/last" />
          </Field.Composition>
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      const statusMessages = document.querySelectorAll('.dnb-form-status')
      expect(statusMessages).toHaveLength(1)
      expect(statusMessages[0]).toHaveTextContent(
        nb.FirstName.errorRequired
      )
      expect(statusMessages[0]).toHaveTextContent(
        nb.LastName.errorRequired
      )
    })

    it('should show required error initially when validateInitially is given', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['first', 'last'],
        properties: {
          first: {
            type: 'string',
          },
          last: {
            type: 'string',
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <Field.Composition>
            <Field.Name.First path="/first" validateInitially />
            <Field.Name.Last path="/last" validateInitially />
          </Field.Composition>
        </Form.Handler>
      )

      const statusMessages = document.querySelectorAll('.dnb-form-status')
      expect(statusMessages).toHaveLength(1)
      expect(statusMessages[0]).toHaveTextContent(
        nb.FirstName.errorRequired
      )
      expect(statusMessages[0]).toHaveTextContent(
        nb.LastName.errorRequired
      )
    })

    it('should show minLength error initially when validateInitially is given', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 3,
          },
          last: {
            type: 'string',
            minLength: 6,
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <Field.Composition>
            <Field.String path="/first" value="f" validateInitially />
            <Field.String path="/last" value="l" validateInitially />
          </Field.Composition>
        </Form.Handler>
      )

      const statusMessages = document.querySelectorAll('.dnb-form-status')
      expect(statusMessages).toHaveLength(1)
      expect(statusMessages[0]).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessages[0]).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )
    })

    it('should validate error continuously when continuousValidation is given', async () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 3,
          },
          last: {
            type: 'string',
            minLength: 6,
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <Field.Composition>
            <Field.String
              path="/first"
              value="f"
              validateInitially
              continuousValidation
            />
            <Field.String
              path="/last"
              value="l"
              validateInitially
              continuousValidation
            />
          </Field.Composition>
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))
      const statusMessages = document.querySelectorAll('.dnb-form-status')
      expect(statusMessages).toHaveLength(1)

      const statusMessage = statusMessages[0]

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      await userEvent.type(first, 'i')

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )

      await userEvent.type(first, 'rst')

      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      await userEvent.type(last, 'ast name')

      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)

      await userEvent.type(last, '{Backspace>4}')

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )
    })

    it('should validate error continuously when validateContinuously is given', async () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 3,
          },
          last: {
            type: 'string',
            minLength: 6,
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <Field.Composition>
            <Field.String
              path="/first"
              value="f"
              validateInitially
              validateContinuously
            />
            <Field.String
              path="/last"
              value="l"
              validateInitially
              validateContinuously
            />
          </Field.Composition>
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))
      const statusMessages = document.querySelectorAll('.dnb-form-status')
      expect(statusMessages).toHaveLength(1)

      const statusMessage = statusMessages[0]

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      await userEvent.type(first, 'i')

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )

      await userEvent.type(first, 'rst')

      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      await userEvent.type(last, 'ast name')

      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '3')
      )
      expect(statusMessage).not.toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)

      await userEvent.type(last, '{Backspace>4}')

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '6')
      )
    })
  })
  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Composition label="composition">
          <Field.String label="label1" required />
          <Field.String label="label2" required />
        </Field.Composition>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })
})
