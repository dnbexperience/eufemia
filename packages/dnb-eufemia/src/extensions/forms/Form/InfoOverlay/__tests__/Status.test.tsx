import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import nbNO from '../../../constants/locales/nb-NO'
import { Form } from '../../..'

describe('Form.InfoOverlay', () => {
  it('should render success with correct text', () => {
    const nb = nbNO['nb-NO'].InfoOverlaySuccess
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay>content</Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('h2')).toBeNull()
    expect(document.querySelector('p')).toBeNull()

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(document.querySelector('h2')).toHaveTextContent(nb.title)
    expect(document.querySelector('p')).toHaveTextContent(nb.description)

    const anchors = document.querySelectorAll('a')
    expect(anchors).toHaveLength(1)

    const [anchor] = Array.from(anchors)
    expect(anchor).toHaveTextContent(nb.buttonText)
    expect(anchor).toHaveAttribute('href', '/')
  })

  it('should render error with correct text', async () => {
    const nb = nbNO['nb-NO'].InfoOverlayError
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay>content</Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('h2')).toBeNull()
    expect(document.querySelector('p')).toBeNull()

    act(() => {
      Form.InfoOverlay.setContent(formId, 'error')
    })

    expect(document.querySelector('h2')).toHaveTextContent(nb.title)
    expect(document.querySelector('p')).toHaveTextContent(nb.description)

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton, retryButton] = Array.from(buttons)
    expect(backButton).toHaveTextContent(nb.cancelButton)
    expect(retryButton).toHaveTextContent(nb.retryButton)
  })

  it('should accept custom buttonHref', () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay
          success={{
            buttonHref: 'http://custom',
          }}
        >
          content
        </Form.InfoOverlay>
      </Form.Handler>
    )

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    const anchor = document.querySelector('a')
    expect(anchor).toHaveAttribute('href', 'http://custom')
  })

  it('should disable href when buttonClickHandler is given', () => {
    const formId = {}
    const buttonClickHandler = jest.fn()

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay success={{ buttonClickHandler }}>
          content
        </Form.InfoOverlay>
      </Form.Handler>
    )

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(button).not.toHaveAttribute('href')
    expect(buttonClickHandler).toHaveBeenCalledTimes(1)
  })

  it('should render success with custom text', () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay
          success={{
            title: 'Custom title',
            description: 'Custom description',
            buttonText: 'Custom button text',
          }}
        >
          content
        </Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('h2')).toBeNull()
    expect(document.querySelector('p')).toBeNull()

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(document.querySelector('h2')).toHaveTextContent('Custom title')
    expect(document.querySelector('p')).toHaveTextContent(
      'Custom description'
    )

    const anchors = document.querySelectorAll('a')
    expect(anchors).toHaveLength(1)

    const [anchor] = Array.from(anchors)
    expect(anchor).toHaveTextContent('Custom button text')
    expect(anchor).toHaveAttribute('href', '/')
  })

  it('should render error with custom text', async () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay
          error={{
            title: 'Custom title',
            description: 'Custom description',
            cancelButton: 'Custom cancel',
            retryButton: 'Custom retry',
          }}
        >
          content
        </Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('h2')).toBeNull()
    expect(document.querySelector('p')).toBeNull()

    act(() => {
      Form.InfoOverlay.setContent(formId, 'error')
    })

    expect(document.querySelector('h2')).toHaveTextContent('Custom title')
    expect(document.querySelector('p')).toHaveTextContent(
      'Custom description'
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton, retryButton] = Array.from(buttons)
    expect(backButton).toHaveTextContent('Custom cancel')
    expect(retryButton).toHaveTextContent('Custom retry')
  })

  it('should keep children in the DOM', () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay>
          <output>content</output>
        </Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('h2')).toBeNull()
    expect(document.querySelector('output')).toHaveTextContent('content')

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(document.querySelector('h2')).toBeInTheDocument()
    expect(document.querySelector('output')).toHaveTextContent('content')
  })

  it('should handle focus', () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay>
          <output>content</output>
        </Form.InfoOverlay>
      </Form.Handler>
    )

    expect(document.querySelector('body')).toHaveFocus()

    act(() => {
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(
      document.querySelector('.dnb-forms-status--success')
    ).toHaveFocus()

    act(() => {
      document.querySelector('body').focus()
      Form.InfoOverlay.setContent(formId, undefined)
    })

    expect(document.querySelector('.dnb-forms-status')).toHaveFocus()
    expect(document.querySelector('.dnb-forms-status')).not.toHaveClass(
      'dnb-forms-status--success'
    )

    act(() => {
      document.querySelector('body').focus()
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(
      document.querySelector('.dnb-forms-status--success')
    ).toHaveFocus()
    expect(document.querySelector('.dnb-forms-status')).toHaveClass(
      'dnb-no-focus'
    )
    expect(document.querySelector('.dnb-forms-status')).toHaveAttribute(
      'tabindex',
      '-1'
    )
  })

  it('should show content when cancel button is clicked', () => {
    const formId = {}

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay>
          <output>content</output>
        </Form.InfoOverlay>
      </Form.Handler>
    )

    act(() => {
      Form.InfoOverlay.setContent(formId, 'error')
    })

    expect(document.querySelector('.dnb-forms-status')).toHaveClass(
      'dnb-forms-status--error'
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton] = Array.from(buttons)

    fireEvent.click(backButton)

    expect(document.querySelector('.dnb-forms-status')).not.toHaveClass(
      'dnb-forms-status--error'
    )
  })

  it('should call onCancel when clicking on cancel button', () => {
    const formId = {}
    const onCancel = jest.fn()

    render(
      <Form.Handler id={formId}>
        <Form.InfoOverlay onCancel={onCancel}>
          <output>content</output>
        </Form.InfoOverlay>
      </Form.Handler>
    )

    act(() => {
      Form.InfoOverlay.setContent(formId, 'error')
    })

    expect(document.querySelector('.dnb-forms-status')).toHaveClass(
      'dnb-forms-status--error'
    )
    expect(onCancel).not.toHaveBeenCalled()

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton] = Array.from(buttons)

    fireEvent.click(backButton)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
