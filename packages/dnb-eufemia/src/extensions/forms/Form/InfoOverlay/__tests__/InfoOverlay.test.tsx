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
        <Form.InfoOverlay>fallback content</Form.InfoOverlay>
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
        <Form.InfoOverlay>fallback content</Form.InfoOverlay>
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
          fallback content
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
          fallback content
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
          fallback content
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
          fallback content
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

  it('should support "id" prop', () => {
    const formId = {}

    render(
      <Form.InfoOverlay id={formId}>fallback content</Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).not.toHaveTextContent('custom content')

    act(() => {
      Form.InfoOverlay.setContent(formId, 'custom content')
    })
    expect(element).toHaveTextContent('custom content')
  })

  it('"id" prop should take precedence over Form.Handler id', () => {
    const formId = {}

    render(
      <Form.Handler id="other-id">
        <Form.InfoOverlay id={formId}>fallback content</Form.InfoOverlay>
      </Form.Handler>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).not.toHaveTextContent('custom content')

    act(() => {
      Form.InfoOverlay.setContent(formId, 'custom content')
    })
    expect(element).toHaveTextContent('custom content')
  })

  it('"setContent" should take precedence over content prop', () => {
    const formId = {}

    render(
      <Form.InfoOverlay id={formId} content="other content">
        never shown
      </Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).toHaveTextContent('other content')

    act(() => {
      Form.InfoOverlay.setContent(formId, 'custom content')
    })
    expect(element).toHaveTextContent('custom content')
  })

  it('should support "content" prop', () => {
    render(
      <Form.InfoOverlay content="custom content">
        never shown
      </Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).toHaveTextContent('custom content')
  })

  it('should not set class of "--*"', () => {
    render(
      <Form.InfoOverlay content="custom content">
        never shown
      </Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element.className).toBe('dnb-forms-info-overlay dnb-no-focus')
  })

  it('should set class of "--success"', () => {
    render(
      <Form.InfoOverlay content="success">never shown</Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).toHaveClass('dnb-forms-info-overlay--success')
  })

  it('should set class of "--error"', () => {
    render(
      <Form.InfoOverlay content="error">never shown</Form.InfoOverlay>
    )

    const element = document.querySelector('.dnb-forms-info-overlay')
    expect(element).toHaveClass('dnb-forms-info-overlay--error')
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
      document.querySelector('.dnb-forms-info-overlay--success')
    ).toHaveFocus()

    act(() => {
      document.querySelector('body').focus()
      Form.InfoOverlay.setContent(formId, undefined)
    })

    expect(document.querySelector('.dnb-forms-info-overlay')).toHaveFocus()
    expect(
      document.querySelector('.dnb-forms-info-overlay')
    ).not.toHaveClass('dnb-forms-info-overlay--success')

    act(() => {
      document.querySelector('body').focus()
      Form.InfoOverlay.setContent(formId, 'success')
    })

    expect(
      document.querySelector('.dnb-forms-info-overlay--success')
    ).toHaveFocus()
    expect(document.querySelector('.dnb-forms-info-overlay')).toHaveClass(
      'dnb-no-focus'
    )
    expect(
      document.querySelector('.dnb-forms-info-overlay')
    ).toHaveAttribute('tabindex', '-1')
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

    expect(document.querySelector('.dnb-forms-info-overlay')).toHaveClass(
      'dnb-forms-info-overlay--error'
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton] = Array.from(buttons)

    fireEvent.click(backButton)

    expect(
      document.querySelector('.dnb-forms-info-overlay')
    ).not.toHaveClass('dnb-forms-info-overlay--error')
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

    expect(document.querySelector('.dnb-forms-info-overlay')).toHaveClass(
      'dnb-forms-info-overlay--error'
    )
    expect(onCancel).not.toHaveBeenCalled()

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [backButton] = Array.from(buttons)

    fireEvent.click(backButton)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
