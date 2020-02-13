/**
 * Cypress e2e Test
 *
 */

describe('Responsiveness', () => {
  beforeEach(() => {
    cy.visit('/uilib/')
  })

  it('change viewport size should add sidebar menu', () => {
    cy.get('nav#portal-sidebar-menu').should('not.exist')
    cy.viewport('iphone-6')

    cy.get('nav#portal-sidebar-menu').should('exist')
    cy.get('#toggle-sidebar-menu').click()

    cy.get('nav#portal-sidebar-menu')
      .find('a[href="/uilib/about-the-lib"]')
      .click()

    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/uilib/about-the-lib`
    )
    cy.contains('Why does this UI Library exist?').should('exist')
  })
})
