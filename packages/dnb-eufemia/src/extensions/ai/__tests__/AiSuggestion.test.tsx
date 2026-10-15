import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import { bank } from '../../../icons'
import { Suggestion, Suggestions } from '..'

describe('Ai.Suggestions', () => {
  it('renders a labeled group', () => {
    render(
      <Suggestions>
        <Suggestion suggestion="Block my card" />
      </Suggestions>
    )

    const group = document.querySelector('.dnb-ai-suggestions')
    expect(group).toHaveAttribute('role', 'group')
    expect(group).toHaveAccessibleName('Forslag')
  })

  it('translates the label', () => {
    render(
      <Provider locale="en-GB">
        <Suggestions />
      </Provider>
    )
    expect(
      document.querySelector('.dnb-ai-suggestions')
    ).toHaveAccessibleName('Suggestions')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Suggestions top="large" className="custom" id="list" />)

    const group = document.querySelector('.dnb-ai-suggestions')
    expect(group).toHaveClass('dnb-space__top--large', 'custom')
    expect(group).toHaveAttribute('id', 'list')
  })
})

describe('Ai.Suggestion', () => {
  it('renders a chip with the ai icon', async () => {
    const onClick = vi.fn()
    render(<Suggestion suggestion="Block my card" onClick={onClick} />)

    const button = document.querySelector('button')
    expect(button).toHaveClass(
      'dnb-ai-suggestion--chip',
      'dnb-button--secondary'
    )
    expect(button).not.toHaveClass('dnb-button--size-medium')
    expect(button).toHaveTextContent('Block my card')
    expect(button.querySelector('[data-testid="ai icon"]')).toBeTruthy()

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ suggestion: 'Block my card' })
    )
  })

  it('renders a card', async () => {
    const onClick = vi.fn()
    render(
      <Suggestion
        variant="card"
        icon={bank}
        suggestion="Explain my spending"
        onClick={onClick}
      />
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-ai-suggestion--card')
    expect(button).toHaveAttribute('type', 'button')
    expect(
      button.querySelector('.dnb-ai-suggestion__text')
    ).toHaveTextContent('Explain my spending')
    expect(button.querySelector('[data-testid="bank icon"]')).toBeTruthy()

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ suggestion: 'Explain my spending' })
    )
  })

  it('shows children instead of the suggestion', async () => {
    const onClick = vi.fn()
    render(
      <Suggestion suggestion="Show my transactions" onClick={onClick}>
        Transactions
      </Suggestion>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('Transactions')

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ suggestion: 'Show my transactions' })
    )
  })

  it('supports disabled and spacing props', () => {
    render(
      <>
        <Suggestion suggestion="A" disabled top="small" />
        <Suggestion variant="card" suggestion="B" disabled top="small" />
      </>
    )

    document.querySelectorAll('button').forEach((button) => {
      expect(button).toBeDisabled()
      expect(button).toHaveClass('dnb-space__top--small')
    })
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <Suggestions>
        <Suggestion suggestion="Block my card" />
        <Suggestion variant="card" icon={bank} suggestion="Spending" />
      </Suggestions>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
