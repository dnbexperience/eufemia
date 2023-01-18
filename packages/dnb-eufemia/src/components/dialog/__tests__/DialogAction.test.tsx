import React from 'react'
import { render } from '@testing-library/react'
import Dialog from '../Dialog'
import Button from '../../button/Button'

describe('Dialog.Action', () => {
  it('has correct class', () => {
    const MockComponent = () => {
      return (
        <Dialog openState>
          <Dialog.Action>
            <Button>Button</Button>
          </Dialog.Action>
        </Dialog>
      )
    }

    render(<MockComponent />)

    expect(document.querySelector('.dnb-dialog__actions')).toBeTruthy()
  })

  it('supports spacing', () => {
    const MockComponent = () => {
      return (
        <Dialog openState>
          <Dialog.Action top="large">
            <Button>Button</Button>
          </Dialog.Action>
        </Dialog>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('.dnb-dialog__actions')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-dialog__actions',
    ])
  })

  it('should contain children content', () => {
    render(
      <Dialog openState>
        <Dialog.Action>
          <Button>Button</Button>
        </Dialog.Action>
      </Dialog>
    )

    const element = document.querySelector('.dnb-dialog__actions')

    expect(element.textContent).toBe('‌Button')
  })

  it('should be section element', () => {
    const MockComponent = () => {
      return (
        <Dialog openState>
          <Dialog.Action aria-label="Custom section label">
            <Button>Button</Button>
          </Dialog.Action>
        </Dialog>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('.dnb-dialog__actions')

    expect(element.nodeName).toBe('SECTION')
  })

  it('should include custom attributes', () => {
    const MockComponent = () => {
      return (
        <Dialog openState>
          <Dialog.Action aria-label="Custom section label">
            <Button>Button</Button>
          </Dialog.Action>
        </Dialog>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('.dnb-dialog__actions')

    expect(element.getAttribute('aria-label')).toBe('Custom section label')
  })
})
