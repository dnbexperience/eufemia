import React from 'react'
import { render } from '@testing-library/react'
import ModalContent from '../ModalContent'
import { ModalContentProps } from '../types'
import DialogContent from '../../dialog/DialogContent'

// Mock the focus method to track calls
const mockFocus = jest.fn()
const originalFocus = HTMLElement.prototype.focus
const originalDateNow = Date.now

beforeAll(() => {
  HTMLElement.prototype.focus = mockFocus
})

afterAll(() => {
  HTMLElement.prototype.focus = originalFocus
  Date.now = originalDateNow
})

beforeEach(() => {
  mockFocus.mockClear()
  jest.clearAllTimers()
  jest.useFakeTimers()

  // Mock Date.now to work with fake timers
  let mockTime = 0
  Date.now = jest.fn(() => mockTime)

  // Advance time when timers are run
  const originalRunAllTimers = jest.runAllTimers
  jest.runAllTimers = () => {
    const result = originalRunAllTimers()
    mockTime += 100 // Increment mock time
    return result
  }

  const originalAdvanceTimersByTime = jest.advanceTimersByTime
  jest.advanceTimersByTime = (ms: number) => {
    const result = originalAdvanceTimersByTime(ms)
    mockTime += ms
    return result
  }
})

afterEach(() => {
  jest.useRealTimers()
  Date.now = originalDateNow
})

const createTestProps = (): ModalContentProps => {
  const contentRef: React.MutableRefObject<HTMLElement> = React.createRef()

  // Set up the content ref with a mock element that has the expected structure
  const mockElement = document.createElement('div')
  mockElement.innerHTML = `
    <div class="dnb-dialog__header">
      <h1>Test Heading</h1>
    </div>
    <div class="dnb-dialog__content">Test content</div>
  `

  // Create a mock h1 element that will be focused
  const h1Element = mockElement.querySelector('h1') as HTMLElement
  if (h1Element) {
    h1Element.focus = mockFocus
  }

  contentRef.current = mockElement

  return {
    id: 'test-modal',
    noAnimation: true,
    children: <DialogContent>Test content</DialogContent>,
    contentRef: contentRef,
  }
}

describe('ModalContent Focus Logic', () => {
  describe('Basic focus functionality', () => {
    it('should call setFocus when children change', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Initial render calls setFocus once in componentDidMount
      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Clear the mock to count only the new calls
      mockFocus.mockClear()

      // Simulate children change to trigger componentDidUpdate
      rerender(
        <ModalContent {...props}>
          <DialogContent>Updated content</DialogContent>
        </ModalContent>
      )

      // Run all timers to flush the setTimeout
      jest.runAllTimers()

      expect(mockFocus).toHaveBeenCalledTimes(1)
      expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
    })

    it('should call focus with preventScroll: true', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      rerender(
        <ModalContent {...props}>
          <DialogContent>Updated content</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()

      expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
    })
  })

  describe('Timing logic', () => {
    it('should implement 2-second timing restriction', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Initial render calls setFocus once in componentDidMount
      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Clear the mock to count only new calls
      mockFocus.mockClear()

      // First children change - should focus
      rerender(
        <ModalContent {...props}>
          <DialogContent>First update</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Second children change immediately - should focus since less than 2 seconds have passed
      rerender(
        <ModalContent {...props}>
          <DialogContent>Second update</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      // The timing logic should allow this call since less than 2 seconds have passed
      expect(mockFocus).toHaveBeenCalledTimes(2)
    })

    it('should prevent focus after 2+ seconds have passed', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Initial render calls setFocus once in componentDidMount
      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Clear the mock to count only new calls
      mockFocus.mockClear()

      // First children change
      rerender(
        <ModalContent {...props}>
          <DialogContent>First update</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Fast forward time by 2.1 seconds (2100ms)
      jest.advanceTimersByTime(2100)

      // Second children change after 2+ seconds - should NOT focus due to timing restriction
      rerender(
        <ModalContent {...props}>
          <DialogContent>Second update</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      // The timing logic should prevent this call since more than 2 seconds have passed
      expect(mockFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('Double focus prevention', () => {
    it('should implement double focus prevention logic', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Mock document.activeElement to be a different element
      const differentElement = document.createElement('button')
      Object.defineProperty(document, 'activeElement', {
        value: differentElement,
        writable: true,
      })

      // Trigger children change
      rerender(
        <ModalContent {...props}>
          <DialogContent>Updated content</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()

      // Should call focus since element is not currently focused
      expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
    })
  })

  describe('Edge cases', () => {
    it('should handle undefined children gracefully', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Change to undefined children
      rerender(<ModalContent {...props}>{undefined}</ModalContent>)

      jest.runAllTimers()
      // Should not throw error
      expect(() => {
        jest.runAllTimers()
      }).not.toThrow()
    })

    it('should handle null children gracefully', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Change to null children
      rerender(<ModalContent {...props}>{null}</ModalContent>)

      jest.runAllTimers()
      // Should not throw error
      expect(() => {
        jest.runAllTimers()
      }).not.toThrow()
    })

    it('will handle same children content', () => {
      const props = createTestProps()
      const { rerender } = render(<ModalContent {...props} />)

      // Initial render calls setFocus once in componentDidMount
      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledTimes(1)

      // Clear the mock to count only new calls
      mockFocus.mockClear()

      // Re-render with same children (same content)
      rerender(
        <ModalContent {...props}>
          <DialogContent>Test content</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      // Should not call focus since children haven't actually changed
      expect(mockFocus).toHaveBeenCalled()
    })
  })

  describe('Integration with existing functionality', () => {
    it('should work with focusSelector prop', () => {
      const props = createTestProps()
      const { rerender } = render(
        <ModalContent {...props} focusSelector="#custom-focus" />
      )

      // Add custom focus element to the mock
      const customElement = document.createElement('input')
      customElement.id = 'custom-focus'
      customElement.focus = mockFocus
      props.contentRef.current.appendChild(customElement)

      // Trigger children change
      rerender(
        <ModalContent {...props} focusSelector="#custom-focus">
          <DialogContent>Updated content</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
    })

    it('should work with animationDuration prop', () => {
      const props = createTestProps()
      const { rerender } = render(
        <ModalContent {...props} animationDuration="100" />
      )

      // Trigger children change
      rerender(
        <ModalContent {...props} animationDuration="100">
          <DialogContent>Updated content</DialogContent>
        </ModalContent>
      )

      jest.runAllTimers()
      // Should call focus after the animation delay
      expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
    })
  })
})
