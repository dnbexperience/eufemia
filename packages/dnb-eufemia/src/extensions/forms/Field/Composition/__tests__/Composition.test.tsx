import { StrictMode, Suspense, startTransition, useState } from 'react'
import { act, render, fireEvent, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import userEvent from '@testing-library/user-event'
import type { JSONSchema } from '../../..'
import { Field, FieldBlock, Form, makeAjvInstance } from '../../..'
import {
  axeComponent,
  wait,
} from '../../../../../core/test-utils/testSetup'

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

  it('should support className', () => {
    render(<Field.Composition className="test-class" label="label" />)

    const element = document.querySelector('.test-class')
    expect(element).toBeInTheDocument()
  })

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

  it('should render as fieldset and legend when label is given', () => {
    render(
      <Field.Composition label="Label">
        <Field.String />
        <Field.String />
      </Field.Composition>
    )

    const element = document.querySelector('.dnb-forms-field-block')
    expect(element.tagName).toBe('FIELDSET')

    const legendElement = element.querySelector('legend')
    expect(legendElement).toBeInTheDocument()
    expect(legendElement).toHaveTextContent('Label')
  })

  it('should render as fieldset even if no label is given', () => {
    render(
      <Field.Composition>
        <Field.String />
        <Field.String />
      </Field.Composition>
    )

    const element = document.querySelector('.dnb-forms-field-block')
    expect(element.tagName).toBe('FIELDSET')
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

  it('should set contentWidth when width is set', () => {
    render(<Field.Composition width="large">content</Field.Composition>)

    const element = document.querySelector(
      '.dnb-forms-field-block__composition'
    )
    expect(element).toHaveClass('dnb-forms-field-block--width-stretch')
    expect(element).toHaveClass(
      'dnb-forms-field-block--content-width-large'
    )
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

  it('should include messages from nested fields in the server-rendered HTML', () => {
    const element = (
      <Field.Composition info="FieldBlock info">
        <Field.String warning="Warning message" />
        <Field.Number info="Field info" />
      </Field.Composition>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)

    expect(
      container.querySelector('.dnb-form-status--warning')
    ).toHaveTextContent('Warning message')
    expect(
      Array.from(
        container.querySelectorAll('.dnb-form-status--information li'),
        (item) => item.textContent
      )
    ).toEqual(['FieldBlock info', 'Field info'])

    const log = vi.spyOn(console, 'error').mockImplementation(vi.fn())
    render(element, { container, hydrate: true })

    expect(log).not.toHaveBeenCalled()
    expect(
      container.querySelector('.dnb-form-status--warning')
    ).toHaveTextContent('Warning message')

    log.mockRestore()
    container.remove()
  })

  it('should show nested messages after hydration when statusPosition is above', async () => {
    const element = (
      <FieldBlock
        id="composition"
        composition
        statusPosition="above"
        info="FieldBlock info"
      >
        <Field.String id="string" warning="Warning message" />
      </FieldBlock>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)

    const status = () =>
      container.querySelector('.dnb-forms-field-block__status')
    const contents = container.querySelector(
      '.dnb-forms-field-block__contents'
    )
    expect(status().nextElementSibling).toBe(contents)

    // The server-rendered status does not contain the warning yet,
    // so the field must not point to it
    expect(
      container.querySelector('.dnb-form-status--warning')
    ).not.toBeInTheDocument()
    expect(container.querySelector('#string')).not.toHaveAttribute(
      'aria-describedby'
    )

    const onRecoverableError = vi.fn()
    const { unmount } = render(element, {
      container,
      hydrate: true,
      onRecoverableError,
    })

    await waitFor(() => {
      expect(
        container.querySelector('.dnb-form-status--warning')
      ).toHaveTextContent('Warning message')
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(
      container.querySelector('.dnb-form-status--information')
    ).toHaveTextContent('FieldBlock info')
    expect(status().nextElementSibling).toBe(
      container.querySelector('.dnb-forms-field-block__contents')
    )
    expect(container.querySelector('#string')).toHaveAttribute(
      'aria-describedby',
      'composition-form-status--warning'
    )
    expect(
      container.querySelector('#composition-form-status--warning')
    ).toHaveTextContent('Warning message')

    unmount()
    container.remove()
  })

  it('should link server-rendered fields to their status messages', () => {
    const container = document.createElement('div')
    container.innerHTML = renderToString(
      <Field.Composition id="composition" info="Shared info">
        <Field.String id="string" warning="Warning" />
        <Field.Number id="number" info="Field info" />
      </Field.Composition>
    )

    expect(container.querySelector('#string')).toHaveAttribute(
      'aria-describedby',
      'composition-form-status--warning'
    )
    expect(container.querySelector('#number')).toHaveAttribute(
      'aria-describedby',
      'composition-form-status--information'
    )
  })

  it('should preserve messages and links when hydrating in StrictMode', () => {
    const element = (
      <StrictMode>
        <Field.Composition id="composition" info="Shared info">
          <Field.String id="string" error="Error" warning="Warning" />
          <Field.Number id="number" info="Field info" />
        </Field.Composition>
      </StrictMode>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    const messages = () =>
      Array.from(
        container.querySelectorAll('.dnb-form-status__text'),
        (message) => message.textContent
      )
    const before = messages()
    const onRecoverableError = vi.fn()
    const { unmount } = render(element, {
      container,
      hydrate: true,
      onRecoverableError,
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(messages()).toEqual(before)
    for (const input of Array.from(container.querySelectorAll('input'))) {
      for (const id of input.getAttribute('aria-describedby').split(' ')) {
        expect(container.querySelector('[id="' + id + '"]')).not.toBeNull()
      }
    }
    unmount()
  })

  it('should link the first revealed validation error without another interaction', async () => {
    render(
      <Field.Composition id="composition">
        <Field.String id="string" required />
      </Field.Composition>
    )

    const input = document.querySelector('input')
    await userEvent.type(input, 'a{Backspace}')
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input).toHaveAttribute(
        'aria-describedby',
        'composition-form-status--error'
      )
    })
    expect(
      document.getElementById(input.getAttribute('aria-describedby'))
    ).toHaveTextContent(nb.Field.errorRequired)
  })

  it.each([false, true])(
    'should hydrate messages inside Suspense with StrictMode=%s',
    async (strict) => {
      const element = (
        <Field.Composition id="composition">
          <Suspense fallback="Loading">
            <Field.String warning="Warning" />
          </Suspense>
        </Field.Composition>
      )
      const contents = strict ? (
        <StrictMode>{element}</StrictMode>
      ) : (
        element
      )
      const container = document.createElement('div')
      container.innerHTML = renderToString(contents)
      const onRecoverableError = vi.fn()
      const { unmount } = render(contents, {
        container,
        hydrate: true,
        onRecoverableError,
      })
      await waitFor(() => {
        expect(container.querySelector('input')).not.toBeNull()
      })
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(
        container.querySelector('.dnb-form-status--warning')
      ).toHaveTextContent('Warning')
      unmount()
    }
  )

  it('should not summarize messages from suspended fields', () => {
    const pending = new Promise(() => undefined)
    function Pending(): never {
      throw pending
    }

    render(
      <StrictMode>
        <Field.Composition info="Visible info">
          <Suspense fallback={<span>Loading</span>}>
            <Field.String warning="Uncommitted warning" />
            <Pending />
          </Suspense>
        </Field.Composition>
      </StrictMode>
    )

    expect(document.querySelector('input')).toBeNull()
    expect(document.querySelector('.dnb-form-status--warning')).toBeNull()
    expect(
      document.querySelector('.dnb-form-status--information')
    ).toHaveTextContent('Visible info')
  })

  it('should retain committed messages in StrictMode and remove unmounted fields', () => {
    const element = (show: boolean) => (
      <StrictMode>
        <Field.Composition id="composition">
          <Field.String info="Visible info" />
          {show && <Field.Number warning="Removed warning" />}
        </Field.Composition>
      </StrictMode>
    )
    const { rerender } = render(element(true))

    expect(
      document.querySelector('.dnb-form-status--warning')
    ).toHaveTextContent('Removed warning')
    expect(
      document.querySelector('.dnb-form-status--information')
    ).toHaveTextContent('Visible info')

    rerender(element(false))

    expect(document.querySelector('.dnb-form-status--warning')).toBeNull()
    expect(
      document.querySelector('.dnb-form-status--information')
    ).toHaveTextContent('Visible info')
  })

  it('should use the outer status IDs through nested compositions', () => {
    render(
      <Field.Composition id="outer">
        <Field.Composition id="inner">
          <Field.String info="Nested info" />
        </Field.Composition>
      </Field.Composition>
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'aria-describedby',
      'outer-form-status--information'
    )
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
  })

  it('should retain the committed message when a transition suspends', async () => {
    const pending = new Promise(() => undefined)
    function Pending(): never {
      throw pending
    }
    function Example() {
      const [suspended, setSuspended] = useState(false)
      return (
        <>
          <button
            onClick={() => startTransition(() => setSuspended(true))}
          >
            Change
          </button>
          <Field.Composition>
            <Suspense fallback="Loading">
              <Field.String warning={suspended ? 'Draft' : 'Committed'} />
              {suspended && <Pending />}
            </Suspense>
          </Field.Composition>
        </>
      )
    }

    render(<Example />)
    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('input')).toBeVisible()
    expect(
      document.querySelector('.dnb-form-status--warning')
    ).toHaveTextContent('Committed')
  })

  it('should register messages when suspended fields commit', async () => {
    let resolve: () => void
    let ready = false
    const pending = new Promise<void>((done) => {
      resolve = done
    })
    function Pending() {
      if (!ready) {
        throw pending
      }
      return null
    }

    render(
      <Field.Composition>
        <Suspense fallback="Loading">
          <Field.String warning="Committed warning" />
          <Pending />
        </Suspense>
      </Field.Composition>
    )

    expect(document.querySelector('.dnb-form-status--warning')).toBeNull()
    await act(async () => {
      ready = true
      resolve()
      await pending
    })

    const input = document.querySelector('input')
    expect(input).toBeVisible()
    expect(
      document.getElementById(input.getAttribute('aria-describedby'))
    ).toHaveTextContent('Committed warning')
  })

  it('should restore validation messages after a suspended field is revealed', async () => {
    const pending = new Promise(() => undefined)
    function Pending(): never {
      throw pending
    }
    function Example() {
      const [suspended, setSuspended] = useState(false)
      return (
        <>
          <button onClick={() => setSuspended(!suspended)}>Toggle</button>
          <Field.Composition>
            <Suspense fallback="Loading">
              <Field.String required validateInitially />
              {suspended && <Pending />}
            </Suspense>
          </Field.Composition>
        </>
      )
    }
    render(<Example />)
    expect(
      document.querySelector('.dnb-form-status--error')
    ).toHaveTextContent(nb.Field.errorRequired)
    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('.dnb-form-status--error')).toBeNull()
    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('input')).toBeVisible()
    expect(
      document.querySelector('.dnb-form-status--error')
    ).toHaveTextContent(nb.Field.errorRequired)
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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

    it('should validate without label', async () => {
      const result = render(
        <Field.Composition>
          <Field.String label="label1" />
          <Field.String label="label2" />
        </Field.Composition>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })

  it('should aggregate state from simultaneous child validations', async () => {
    const firstValidator = vi.fn(async () => {
      await wait(100)
      return undefined
    })
    const secondValidator = vi.fn(async () => {
      await wait(20)
      return undefined
    })

    render(
      <FieldBlock label="Outer field block">
        <Field.Composition>
          <Field.String onChangeValidator={firstValidator} />
          <Field.String onChangeValidator={secondValidator} />
        </Field.Composition>
      </FieldBlock>
    )

    const inputs = Array.from(document.querySelectorAll('input'))
    const indicators = Array.from(
      document.querySelectorAll('.dnb-forms-submit-indicator')
    )
    const firstIndicator = indicators[0]
    const secondIndicator = indicators[1]
    const compositionIndicator = indicators[2]
    const outerIndicator = indicators[3]

    fireEvent.change(inputs[0], { target: { value: 'first' } })
    fireEvent.change(inputs[1], { target: { value: 'second' } })

    await waitFor(() => {
      expect(firstIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )
      expect(secondIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )
      expect(outerIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )
    })
    expect(
      document.querySelectorAll(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toHaveLength(3)
    expect(compositionIndicator).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    await waitFor(() => {
      expect(firstIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )
      expect(secondIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-complete'
      )
      expect(outerIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )
      expect(
        document.querySelectorAll(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toHaveLength(2)
    })
  })

  it('should show submit indicator on Form.SubmitButton inside Field.Composition', async () => {
    const onSubmit = async () => {
      await wait(100)
    }

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Composition width="large">
          <Field.String path="/value" value="test" />
          <Form.SubmitButton text="Submit" />
        </Field.Composition>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const indicator = button.querySelector('.dnb-forms-submit-indicator')

    expect(indicator).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    await userEvent.click(button)

    expect(indicator).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
  })
})
