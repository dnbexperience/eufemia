import { render } from '@testing-library/react'
import * as Ai from '..'

describe('Ai.Shimmer', () => {
  it('renders the text', () => {
    render(<Ai.Shimmer>Thinking</Ai.Shimmer>)
    expect(
      document.querySelector('span.dnb-ai-shimmer')
    ).toHaveTextContent('Thinking')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Ai.Shimmer left="small" className="custom" id="s">
        Hi
      </Ai.Shimmer>
    )

    const element = document.querySelector('.dnb-ai-shimmer')
    expect(element).toHaveClass('dnb-space__left--small', 'custom')
    expect(element).toHaveAttribute('id', 's')
  })
})
