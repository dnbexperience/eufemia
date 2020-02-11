/**
 * Cypress e2e Test
 *
 */

describe('Fullscreen', () => {
  beforeEach(() => {
    cy.visit('/uilib/components/button')
  })

  it('click on fullscreen button should navigate to the fullscreen page', () => {
    cy.get('button[title="Fullscreen"]').click()
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/uilib/components/button?fullscreen`
    )
  })
})
