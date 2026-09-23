import { fireEvent, render } from '@testing-library/react'

describe('jsdom virtual console', () => {
  it('reports jsdom notices through the Vitest console', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    window.alert('message')

    expect(consoleError).toHaveBeenCalledWith(
      "Not implemented: Window's alert() method"
    )

    consoleError.mockRestore()
  })

  it('does not report the navigation notice when a link is clicked', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    render(<a href="/somewhere">Link</a>)

    fireEvent.click(document.querySelector('a'))

    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
