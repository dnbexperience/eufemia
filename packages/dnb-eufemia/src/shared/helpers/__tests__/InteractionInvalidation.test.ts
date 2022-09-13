import { InteractionInvalidation } from '../InteractionInvalidation'

let ii: InteractionInvalidation

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

      expect(
        document
          .querySelector(`${selector} h3`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} h3`).hasAttribute('tabindex')
      ).toBe(false)

      expect(
        document
          .querySelector(`${selector} path`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} path`).hasAttribute('tabindex')
      ).toBe(false)
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
        document
          .querySelector(`${selector} path`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} path`).hasAttribute('tabindex')
      ).toBe(false)
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

      expect(
        document
          .querySelector(`${selector} h3`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} h3`).hasAttribute('tabindex')
      ).toBe(false)

      expect(
        document
          .querySelector(`${selector} path`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} path`).hasAttribute('tabindex')
      ).toBe(false)
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

      expect(
        document
          .querySelector(`${selector} h3`)
          .getAttribute('aria-hidden')
      ).toBe(null)

      expect(
        document
          .querySelector(`${selector} path`)
          .hasAttribute('aria-hidden')
      ).toBe(false)
      expect(
        document.querySelector(`${selector} path`).hasAttribute('tabindex')
      ).toBe(false)
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
})
