/**
 * Cypress e2e Test
 *
 */

describe('Page Heading', () => {
  beforeEach(() => {
    cy.visit('/uilib/components')

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  it('should have correct heading element', () => {
    cy.get('h1').its('length').should('equal', 1)

    cy.get('#tabbar-content > *')
      .then((elements) => elements[0].tagName)
      .should('equal', 'H1')

    cy.get('#tabbar-content > h1 ~ p ~ *')
      .then((elements) => elements[0].tagName)
      .should('equal', 'H2')

    cy.get('#tabbar-content > h1 ~ p ~ *')
      .then((elements) => elements[0].tagName)
      .should('equal', 'H2')

    // App should re-render
    cy.get('#portal-sidebar-menu ul li a[href*="/uilib/components/"]')
      .first()
      .click()

    cy.get('#tabbar-content > h1 ~ p ~ *')
      .then((elements) => elements[0].tagName)
      .should('equal', 'H2')
  })
})
