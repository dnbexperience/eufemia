import { InteractionInvalidation } from '../InteractionInvalidation'

let ii: InteractionInvalidation

afterEach(() => {
  ii?.revert()
})

beforeEach(() => {
  document.body.innerHTML = /* jsx */ `
<div class="effected">
  <h1 tabindex="0" aria-hidden="true">h1</h1>
  <h2 tabindex="-1" aria-hidden="false">h2</h2>
  <h3>h3</h3>
  <path />
</div>
<div class="bypass">
  <h1 tabindex="0" aria-hidden="true">h1</h1>
  <h2 tabindex="-1" aria-hidden="false">h2</h2>
  <h3>h3</h3>
  <path />
</div>
`
})

describe('InteractionInvalidation', () => {
  describe('without options should', () => {
    beforeEach(() => {
      ii = new InteractionInvalidation()
    })

    const hasDefaultState = (selector: string) => {
      expect(
        document
          .querySelector(`${selector} h1`)
          .getAttribute('aria-hidden')
      ).toBe('true')
      expect(
        document.querySelector(`${selector} h1`).getAttribute('tabindex')
      ).toBe('0')

      expect(
        document
          .querySelector(`${selector} h2`)
          .getAttribute('aria-hidden')
      ).toBe('false')
      expect(
        document.querySelector(`${selector} h2`).getAttribute('tabindex')
      ).toBe('-1')

      expect(document.querySelector(`${selector} h3`)).not.toHaveAttribute(
        'aria-hidden'
      )
      expect(document.querySelector(`${selector} h3`)).not.toHaveAttribute(
        'tabindex'
      )

      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('aria-hidden')
      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('tabindex')
    }

    const hasInvalidatedState = (selector: string) => {
      expect(
        document
          .querySelector(`${selector} h1`)
          .getAttribute('aria-hidden')
      ).toBe('true')
      expect(
        document.querySelector(`${selector} h1`).getAttribute('tabindex')
      ).toBe('-1')

      expect(
        document
          .querySelector(`${selector} h2`)
          .getAttribute('aria-hidden')
      ).toBe('true')
      expect(
        document.querySelector(`${selector} h2`).getAttribute('tabindex')
      ).toBe('-1')

      expect(
        document
          .querySelector(`${selector} h3`)
          .getAttribute('aria-hidden')
      ).toBe('true')
      expect(
        document.querySelector(`${selector} h3`).getAttribute('tabindex')
      ).toBe('-1')

      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('aria-hidden')
      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('tabindex')
    }

    it('be in its original state', () => {
      hasDefaultState('.effected')
    })

    it('have invalidated everything', () => {
      ii.activate()

      hasInvalidatedState('.effected')
    })

    it('have reverted the invalidation', () => {
      ii.activate()
      ii.revert()

      hasDefaultState('.effected')
    })

    it('have invalidated everything, even with a bypassed selector', () => {
      ii.setBypassSelector('.bypass-invalid')
      ii.activate()

      hasInvalidatedState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassSelector', () => {
      ii.activate()
      ii.revert()
      ii.setBypassSelector('.bypass *')
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassElements', () => {
      const bypassElems = Array.from(
        document.querySelectorAll('.bypass *')
      ) as HTMLElement[]
      ii.setBypassElements(bypassElems)
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected', () => {
      ii.activate('.effected')

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })
  })

  describe('with options should', () => {
    beforeEach(() => {
      ii = new InteractionInvalidation({
        ariaHidden: false,
        tabIndex: false,
      })
    })

    const hasDefaultState = (selector: string) => {
      expect(
        document
          .querySelector(`${selector} h1`)
          .getAttribute('aria-hidden')
      ).toBe('true')
      expect(
        document.querySelector(`${selector} h1`).getAttribute('tabindex')
      ).toBe('0')

      expect(
        document
          .querySelector(`${selector} h2`)
          .getAttribute('aria-hidden')
      ).toBe('false')
      expect(
        document.querySelector(`${selector} h2`).getAttribute('tabindex')
      ).toBe('-1')

      expect(document.querySelector(`${selector} h3`)).not.toHaveAttribute(
        'aria-hidden'
      )
      expect(document.querySelector(`${selector} h3`)).not.toHaveAttribute(
        'tabindex'
      )

      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('aria-hidden')
      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('tabindex')
    }

    const hasInvalidatedState = (selector: string) => {
      expect(
        document
          .querySelector(`${selector} h1`)
          .getAttribute('aria-hidden')
      ).toBe('true')

      expect(
        document
          .querySelector(`${selector} h2`)
          .getAttribute('aria-hidden')
      ).toBe('false')
      expect(
        document.querySelector(`${selector} h2`).getAttribute('tabindex')
      ).toBe('-1')

      expect(document.querySelector(`${selector} h3`)).not.toHaveAttribute(
        'aria-hidden'
      )

      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('aria-hidden')
      expect(
        document.querySelector(`${selector} path`)
      ).not.toHaveAttribute('tabindex')
    }

    it('be in its original state', () => {
      hasDefaultState('.effected')
    })

    it('have invalidated everything', () => {
      ii = new InteractionInvalidation({ ariaHidden: false })

      ii.activate()

      hasInvalidatedState('.effected')
    })

    it('have reverted the invalidation', () => {
      ii.activate()
      ii.revert()

      hasDefaultState('.effected')
    })

    it('have invalidated everything, even with a bypassed selector', () => {
      ii.setBypassSelector('.bypass-invalid')
      ii.activate()

      hasInvalidatedState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassSelector', () => {
      ii.activate()
      ii.revert()
      ii.setBypassSelector('.bypass *')
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected', () => {
      ii.activate('.effected')

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })
  })

  describe('dynamic elements (MutationObserver)', () => {
    it('should invalidate elements added to the DOM after activation', async () => {
      ii = new InteractionInvalidation()
      ii.activate()

      const dynamicButton = document.createElement('button')
      dynamicButton.textContent = 'Close toast'
      document.body.appendChild(dynamicButton)

      // MutationObserver callbacks are microtasks
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton.getAttribute('tabindex')).toBe('-1')
      expect(dynamicButton.getAttribute('aria-hidden')).toBe('true')
    })

    it('should invalidate descendants of dynamically added elements', async () => {
      ii = new InteractionInvalidation()
      ii.activate()

      const container = document.createElement('div')
      const innerButton = document.createElement('button')
      innerButton.textContent = 'Close'
      container.appendChild(innerButton)
      document.body.appendChild(container)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(container.getAttribute('tabindex')).toBe('-1')
      expect(container.getAttribute('aria-hidden')).toBe('true')
      expect(innerButton.getAttribute('tabindex')).toBe('-1')
      expect(innerButton.getAttribute('aria-hidden')).toBe('true')
    })

    it('should not invalidate elements inside bypass selectors', async () => {
      ii = new InteractionInvalidation()
      ii.setBypassSelector('.bypass *')
      ii.activate()

      const dynamicButton = document.createElement('button')
      dynamicButton.textContent = 'Allowed'
      document.querySelector('.bypass').appendChild(dynamicButton)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton).not.toHaveAttribute('tabindex')
      expect(dynamicButton).not.toHaveAttribute('aria-hidden')
    })

    it('should not invalidate elements inside bypass elements', async () => {
      const bypassContainer = document.querySelector(
        '.bypass'
      ) as HTMLElement
      ii = new InteractionInvalidation()
      ii.setBypassElements([bypassContainer])
      ii.activate()

      const dynamicButton = document.createElement('button')
      dynamicButton.textContent = 'Allowed'
      bypassContainer.appendChild(dynamicButton)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton).not.toHaveAttribute('tabindex')
      expect(dynamicButton).not.toHaveAttribute('aria-hidden')
    })

    it('should skip script, style, and path elements', async () => {
      ii = new InteractionInvalidation()
      ii.activate()

      const script = document.createElement('script')
      document.body.appendChild(script)

      const style = document.createElement('style')
      document.body.appendChild(style)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(script).not.toHaveAttribute('tabindex')
      expect(script).not.toHaveAttribute('aria-hidden')
      expect(style).not.toHaveAttribute('tabindex')
      expect(style).not.toHaveAttribute('aria-hidden')
    })

    it('should revert dynamically added elements on revert()', async () => {
      ii = new InteractionInvalidation()
      ii.activate()

      const dynamicButton = document.createElement('button')
      document.body.appendChild(dynamicButton)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton.getAttribute('tabindex')).toBe('-1')

      ii.revert()

      expect(dynamicButton).not.toHaveAttribute('tabindex')
      expect(dynamicButton).not.toHaveAttribute('aria-hidden')
    })

    it('should restore original tabindex on dynamically added elements', async () => {
      ii = new InteractionInvalidation()
      ii.activate()

      const dynamicButton = document.createElement('button')
      dynamicButton.setAttribute('tabindex', '0')
      document.body.appendChild(dynamicButton)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton.getAttribute('tabindex')).toBe('-1')

      ii.revert()

      expect(dynamicButton.getAttribute('tabindex')).toBe('0')
    })

    it('should disconnect observer after revert()', async () => {
      ii = new InteractionInvalidation()
      ii.activate()
      ii.revert()

      const dynamicButton = document.createElement('button')
      document.body.appendChild(dynamicButton)

      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(dynamicButton).not.toHaveAttribute('tabindex')
      expect(dynamicButton).not.toHaveAttribute('aria-hidden')
    })
  })
})
