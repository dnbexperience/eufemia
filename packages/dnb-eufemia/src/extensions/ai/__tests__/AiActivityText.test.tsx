import { render } from '@testing-library/react'
import { ActivityText } from '..'

describe('Ai.ActivityText', () => {
  it('renders the text', () => {
    render(<ActivityText>Thinking</ActivityText>)
    expect(
      document.querySelector('span.dnb-ai-activity-text')
    ).toHaveTextContent('Thinking')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <ActivityText left="small" className="custom" id="s">
        Hi
      </ActivityText>
    )

    const element = document.querySelector('.dnb-ai-activity-text')
    expect(element).toHaveClass('dnb-space__left--small', 'custom')
    expect(element).toHaveAttribute('id', 's')
  })
})
