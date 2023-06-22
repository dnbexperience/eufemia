/**
 * Cypress e2e Test
 *
 */

describe('Page Lists', () => {
  describe('of components', () => {
    beforeEach(() => {
      cy.visit('/uilib/components')

      // Check if app is mounted
      cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should(
        'exist'
      )
    })

    it('should have correct title', () => {
      cy.title().should('contain', 'Components | Eufemia')
      cy.get('h1').should('contain', 'Components')
      cy.get('h1').its('length').should('equal', 1)
    })

    it('should have same amount of components', () => {
      cy.get(
        '#portal-sidebar-menu ul li:has(> a[href*="/uilib/components"]) ~ li:is(.l-3, .l-4):has(> a[href*="/components"]):has(> a:not([href*="/fragments"]))'
      )
        .its('length')
        .then((listLength) => {
          cy.get('#tabbar-content h2:has(a[href*="/uilib/components/"])')
            .its('length')
            .should('equal', listLength)
        })
    })
  })

  describe('of extensions', () => {
    beforeEach(() => {
      cy.visit('/uilib/extensions')

      // Check if app is mounted
      cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should(
        'exist'
      )
    })

    it('should have correct title', () => {
      cy.title().should('contain', 'Extensions | Eufemia')
      cy.get('h1').should('contain', 'Extensions')
      cy.get('h1').its('length').should('equal', 1)
    })

    it('should have same amount of extensions', () => {
      cy.get(
        '#portal-sidebar-menu ul li:has(> a[href*="/uilib/extensions"]) ~ li.l-3:has(> a[href*="/uilib/extensions/"])'
      )
        .its('length')
        .then((listLength) => {
          cy.get('#tabbar-content h2:has(a[href*="/uilib/extensions/"])')
            .its('length')
            .should('equal', listLength)
        })
    })
  })

  describe('of elements', () => {
    beforeEach(() => {
      cy.visit('/uilib/elements')

      // Check if app is mounted
      cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should(
        'exist'
      )
    })

    it('should have correct title', () => {
      cy.title().should('contain', 'Elements | Eufemia')
      cy.get('h1').should('contain', 'Elements')
      cy.get('h1').its('length').should('equal', 1)
    })

    it('should have same amount of elements', () => {
      cy.get(
        '#portal-sidebar-menu ul li.l-2:has(> a[href*="/uilib/elements"]) ~ li:has(> a[href*="/uilib/elements"])'
      )
        .its('length')
        .then((listLength) => {
          cy.get('#tabbar-content ul li:has(a[href*="/uilib/elements/"])')
            .its('length')
            .should('equal', listLength)
        })
    })
  })
})
