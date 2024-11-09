import React from 'react'
import { render, act } from '@testing-library/react'
import { useVerifyChildren, countChildren } from '../useVerifyChildren'

describe('useVerifyChildren', () => {
  it('should not warn when no children are provided', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    const TestComponent = () => {
      const { verifyChild } = useVerifyChildren({
        children: null,
        message: 'Warning message',
      })
      return <button onClick={verifyChild}>Verify</button>
    }

    render(<TestComponent />)

    expect(log).not.toHaveBeenCalled()

    log.mockRestore()
  })

  it('should warn if verifyChild is not called enough times for children', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    const TestComponent = () => {
      const { verifyChild } = useVerifyChildren({
        children: (
          <>
            <span>Child 1</span>
            <span>Child 2</span>
          </>
        ),
        message: 'Warning message',
      })
      return <button onClick={() => verifyChild()}>Verify</button>
    }

    const { getByText } = render(<TestComponent />)
    const button = getByText('Verify')

    act(() => button.click())

    expect(log).toHaveBeenCalledWith(expect.any(String), 'Warning message')

    log.mockRestore()
  })

  it('should ignore specified types', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    const IgnoredComponent = () => <>Ignored</>

    const TestComponent = () => {
      const { verifyChild } = useVerifyChildren({
        children: (
          <>
            <IgnoredComponent />
            <span>Child</span>
          </>
        ),
        message: 'Warning message',
        ignoreTypes: ['IgnoredComponent'],
      })

      verifyChild() // Call verifyChild once

      return <button onClick={() => verifyChild()}>Verify</button>
    }

    render(<TestComponent />)

    expect(log).not.toHaveBeenCalled()

    log.mockRestore()
  })
})

describe('countChildren', () => {
  it('should count valid children elements', () => {
    const children = (
      <>
        <span>Child 1</span>
        {null}
        <span>Child 2</span>
      </>
    )

    const count = countChildren(children)
    expect(count).toBe(2)
  })

  it('should not count fragments or ignored types', () => {
    const children = (
      <>
        <span>Child 1</span>
        <React.Fragment>
          <span>Child 2</span>
        </React.Fragment>
        <span>Child 3</span>
      </>
    )

    const count = countChildren(children, ['span'])
    expect(count).toBe(3)
  })

  it('should handle deeply nested structures', () => {
    const children = (
      <>
        <span>Child 1</span>
        <>
          <span>Child 2</span>
          <>
            <span>Child 3</span>
          </>
        </>
      </>
    )

    const count = countChildren(children)
    expect(count).toBe(3)
  })

  it('should return zero for primitive children', () => {
    const children = 'Primitive Text Node'
    const count = countChildren(children)
    expect(count).toBe(0)
  })
})
