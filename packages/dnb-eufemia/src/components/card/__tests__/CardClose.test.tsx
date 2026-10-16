import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Card from '../index'
import Provider from '../../../shared/Provider'
import svSE from '../../../shared/locales/sv-SE'
import daDK from '../../../shared/locales/da-DK'

describe('CardCloseButton', () => {
  it('preserves legacy close props and composes their handlers', async () => {
    const calls: string[] = []
    const { rerender } = render(
      <Card
        onClose={() => calls.push('close')}
        closeButtonProps={{
          title: 'Dismiss',
          onClick: () => calls.push('button'),
        }}
      >
        Content
      </Card>
    )
    await userEvent.click(
      document.querySelector('.dnb-card__close-button')
    )
    expect(calls).toEqual(['button', 'close'])
    const close = vi.fn()
    rerender(
      <Card onClose={close} closeButtonProps={{ onClick: () => false }}>
        Content
      </Card>
    )
    await userEvent.click(
      document.querySelector('.dnb-card__close-button')
    )
    expect(close).not.toHaveBeenCalled()
    rerender(
      <Card onClose={close}>
        <Card.Info.CloseButton title="Explicit" />
        Content
      </Card>
    )
    expect(
      document.querySelectorAll('.dnb-card__close-button')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-card__close-button')
    ).toHaveAttribute('aria-label', 'Explicit')
  })
  it('is only present when explicitly composed', () => {
    const { rerender } = render(<Card>Information</Card>)
    expect(document.querySelector('.dnb-card__close-button')).toBeNull()
    rerender(
      <Card>
        <Card.Info.CloseButton />
        Information
      </Card>
    )
    expect(
      document.querySelector('.dnb-card__close-button')
    ).toBeInTheDocument()
  })

  it.each(['legacy', 'css'] as const)(
    'keeps the optional control outside the %s content layout',
    (layoutEngine) => {
      render(
        <Card.Info layoutEngine={layoutEngine}>
          <Card.Info.CloseButton />
          <p>Information</p>
        </Card.Info>
      )
      const card = document.querySelector('.dnb-card')
      const button = document.querySelector('.dnb-card__close-button')
      expect(card).toHaveClass('dnb-card--closable')
      expect(button.parentElement).toBe(card)
      expect(
        card.querySelector('.dnb-flex-container').children
      ).toHaveLength(1)
    }
  )

  it.each([
    ['nb-NO', 'Lukk'],
    ['en-GB', 'Close'],
    ['sv-SE', 'Stäng'],
    ['da-DK', 'Luk'],
  ])('uses the close label for %s', (locale, label) => {
    render(
      <Provider locale={locale} translations={{ ...svSE, ...daDK }}>
        <Card>
          <Card.Info.CloseButton />
          Content
        </Card>
      </Provider>
    )
    expect(
      document.querySelector('.dnb-card__close-button')
    ).toHaveAttribute('aria-label', label)
  })

  it('calls the handler without submitting or hiding the card', async () => {
    const onClick = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    const result = render(
      <form onSubmit={onSubmit}>
        <Card.Info aria-label="Tip">
          <Card.Info.CloseButton
            onClick={onClick}
            title="Dismiss tip"
            className="custom-close"
          />
          <p>Information</p>
        </Card.Info>
      </form>
    )
    const button = document.querySelector('.dnb-card__close-button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-label', 'Dismiss tip')
    expect(button).toHaveClass('custom-close')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
    expect(document.querySelector('.dnb-card')).toBeInTheDocument()
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('preserves content state when the close control is toggled', async () => {
    const Example = ({ closable }) => (
      <Card.Info>
        {closable && <Card.Info.CloseButton />}
        <input aria-label="Name" defaultValue="" />
      </Card.Info>
    )
    const { rerender } = render(<Example closable />)
    const input = document.querySelector('input')
    await userEvent.type(input, 'Savings')
    rerender(<Example closable={false} />)
    expect(document.querySelector('input')).toBe(input)
    expect(input).toHaveValue('Savings')
  })
})
