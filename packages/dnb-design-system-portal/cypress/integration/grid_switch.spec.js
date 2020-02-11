/**
 * Cypress e2e Test
 *
 */

describe('Grid', () => {
  beforeEach(() => {
    cy.clearLocalStorage('showGrid')
    cy.visit('/uilib')
  })

  it('click on grid switch should enable the grid', () => {
    cy.get('#switch-grid').click()
    cy.get('html').should('have.attr', 'dev-grid', 'true')
  })
})
