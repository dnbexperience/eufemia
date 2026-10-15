import { render } from '@testing-library/react'
import { Info } from '..'

describe('Ai.Info', () => {
  it('renders the content', () => {
    render(<Info>AI-generated answers can be wrong.</Info>)
    expect(document.querySelector('.dnb-ai-info')).toHaveTextContent(
      'AI-generated answers can be wrong.'
    )
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Info top="large" className="custom" id="x" />)

    const element = document.querySelector('.dnb-ai-info')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'x')
  })
})
