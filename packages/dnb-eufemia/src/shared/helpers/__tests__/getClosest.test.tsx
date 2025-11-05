import React from 'react'
import { render } from '@testing-library/react'
import { getClosestParent } from '../getClosest'

const Body = () => {
  return (
    <div className="one more classes">
      <div className="some two more classes">
        <div id="some three more classes">
          <div id="four">
            <button>
              <span className="five">content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

describe('getClosestParent', () => {
  render(<Body />)

  const root = document.querySelector('.five')

  it('returns a HTML element based on its class name', () => {
    const element = getClosestParent('two', root)
    expect(element?.getAttribute('class')).toBe('some two more classes')
  })

  it('returns a HTML element based on its class selector', () => {
    const element = getClosestParent('.two', root)
    expect(element?.getAttribute('class')).toBe('some two more classes')
  })

  it('returns the same element of the selector matches', () => {
    const element = getClosestParent('.five', root)
    expect(element?.getAttribute('class')).toBe('five')
  })

  it('returns null if not found', () => {
    const element = getClosestParent('.invalid', root)
    expect(element).toBe(null)
  })

  it('returns a HTML element based on its tag name', () => {
    const element = getClosestParent('BUTTON', root)
    expect(element?.tagName).toBe('BUTTON')
  })
})
