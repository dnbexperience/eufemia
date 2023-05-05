/**
 * Cypress e2e Test
 *
 */

describe('Grid', () => {
  beforeEach(() => {
    cy.visit('/uilib?data-visual-test') // skip animation

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('showGrid')
  })

  it('click on grid switch should enable the grid', () => {
    cy.get('#portal-tools').click()
    cy.get('#switch-grid').click()
    cy.get('html').should('have.attr', 'show-dev-grid', 'true')
  })
})
