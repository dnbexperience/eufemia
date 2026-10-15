import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Card from '../index'
import Provider from '../../../shared/Provider'
import svSE from '../../../shared/locales/sv-SE'
import daDK from '../../../shared/locales/da-DK'

describe('Card close button', () => {
  it('is absent by default', () => {
    render(
      <Card>
        <p>Information</p>
      </Card>
    )
    expect(document.querySelector('.dnb-card__close-button')).toBeNull()
    expect(document.querySelector('.dnb-card')).not.toHaveClass(
      'dnb-card--closable'
    )
  })

  it.each([
    ['nb-NO', 'Lukk'],
    ['en-GB', 'Close'],
    ['sv-SE', 'Stäng'],
    ['da-DK', 'Luk'],
  ])('uses the close label for %s', (locale, label) => {
    render(
      <Provider locale={locale} translations={{ ...svSE, ...daDK }}>
        <Card onClose={() => undefined}>Content</Card>
      </Provider>
    )
    expect(
      document.querySelector('.dnb-card__close-button')
    ).toHaveAttribute('aria-label', label)
  })

  it('uses a translated label and calls the consumer without submitting or hiding the Card', async () => {
    const onClose = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    const result = render(
      <Provider locale="en-GB">
        <form onSubmit={onSubmit}>
          <Card onClose={onClose} aria-label="Tip">
            <p>Information</p>
          </Card>
        </form>
      </Provider>
    )
    const button = document.querySelector<HTMLButtonElement>(
      '.dnb-card__close-button'
    )

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-label', 'Close')
    await userEvent.click(button)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
    expect(document.querySelector('.dnb-card')).toBeInTheDocument()
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('allows button customization and composes click handlers', async () => {
    const calls: string[] = []
    render(
      <Card
        onClose={() => {
          calls.push('close')
        }}
        closeButtonProps={{
          title: 'Dismiss tip',
          className: 'custom-close',
          onClick: () => {
            calls.push('button')
          },
        }}
      >
        Content
      </Card>
    )

    const button = document.querySelector('.dnb-card__close-button')
    expect(button).toHaveClass('custom-close')
    expect(button).toHaveAttribute('aria-label', 'Dismiss tip')
    await userEvent.click(button)
    expect(calls).toEqual(['button', 'close'])
  })

  it('allows the button handler to cancel dismissal', async () => {
    const onClose = vi.fn()
    render(
      <Card onClose={onClose} closeButtonProps={{ onClick: () => false }}>
        Content
      </Card>
    )
    await userEvent.click(
      document.querySelector('.dnb-card__close-button')
    )
    expect(onClose).not.toHaveBeenCalled()
  })

  it('updates the close button when onClose changes', () => {
    const { rerender } = render(
      <Card onClose={() => undefined}>Content</Card>
    )
    expect(
      document.querySelector('.dnb-card__close-button')
    ).toBeInTheDocument()
    rerender(<Card>Content</Card>)
    expect(document.querySelector('.dnb-card__close-button')).toBeNull()
  })
})
