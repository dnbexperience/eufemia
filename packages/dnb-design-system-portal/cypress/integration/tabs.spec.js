/**
 * Cypress e2e Test
 *
 */

describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/uilib/components/button')
  })

  it('click on demos should navigate to the demos page', () => {
    cy.get('.dnb-tabs__tabs__tablist')
      .find('button:nth-of-type(2)')
      .click()
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/uilib/components/button/demos`
    )
  })
})
