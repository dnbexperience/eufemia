/**
 * Cypress e2e Test
 *
 */

describe('Main Menu', () => {
  beforeEach(() => {
    cy.visit('/design-system/')
  })

  it('click on main menu button should open the main menu', () => {
    cy.get('#toggle-main-menu').click()
    cy.get('nav').find('a[href="/uilib/"]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/uilib/`)

    // to verify that we have the new content
    cy.get('nav#portal-sidebar-menu')
      .find('a[href="/uilib/about-the-lib"]')
      .click()
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/uilib/about-the-lib`
    )
  })
})
