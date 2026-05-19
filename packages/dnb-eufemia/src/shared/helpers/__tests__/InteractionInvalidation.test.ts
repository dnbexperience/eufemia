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
      expect.hasAssertions()
      hasDefaultState('.effected')
    })

    it('have invalidated everything', () => {
      expect.hasAssertions()
      ii.activate()

      hasInvalidatedState('.effected')
    })

    it('have reverted the invalidation', () => {
      expect.hasAssertions()
      ii.activate()
      ii.revert()

      hasDefaultState('.effected')
    })

    it('have invalidated everything, even with a bypassed selector', () => {
      expect.hasAssertions()
      ii.setBypassSelector('.bypass-invalid')
      ii.activate()

      hasInvalidatedState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassSelector', () => {
      expect.hasAssertions()
      ii.activate()
      ii.revert()
      ii.setBypassSelector('.bypass *')
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassElements', () => {
      expect.hasAssertions()
      const bypassElems = Array.from(
        document.querySelectorAll('.bypass *')
      ) as HTMLElement[]
      ii.setBypassElements(bypassElems)
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected', () => {
      expect.hasAssertions()
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
      expect.hasAssertions()
      hasDefaultState('.effected')
    })

    it('have invalidated everything', () => {
      expect.hasAssertions()
      ii = new InteractionInvalidation({ ariaHidden: false })

      ii.activate()

      hasInvalidatedState('.effected')
    })

    it('have reverted the invalidation', () => {
      expect.hasAssertions()
      ii.activate()
      ii.revert()

      hasDefaultState('.effected')
    })

    it('have invalidated everything, even with a bypassed selector', () => {
      expect.hasAssertions()
      ii.setBypassSelector('.bypass-invalid')
      ii.activate()

      hasInvalidatedState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected by using setBypassSelector', () => {
      expect.hasAssertions()
      ii.activate()
      ii.revert()
      ii.setBypassSelector('.bypass *')
      ii.activate()

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })

    it('have invalidated only .effected', () => {
      expect.hasAssertions()
      ii.activate('.effected')

      hasDefaultState('.bypass')
      hasInvalidatedState('.effected')
    })
  })
})
