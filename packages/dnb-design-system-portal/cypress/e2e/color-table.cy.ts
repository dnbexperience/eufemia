/**
 * Cypress e2e Test
 *
 */

describe('Colors for UI', () => {
  beforeEach(() => {
    cy.visit(
      '/quickguide-designer/colors?data-visual-test&eufemia-theme=ui'
    )

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('eufemia-theme')
  })

  it('table should have correct color', () => {
    cy.get('.dnb-table__scroll-view table tbody tr td').should(
      'have.css',
      'color',
      'rgb(0, 52, 62)'
    )
    cy.get(
      '.dnb-table__scroll-view table tbody tr td:last-of-type'
    ).should('contain', '--color-ocean-green')
  })
})

describe('Colors for Sbanken', () => {
  beforeEach(() => {
    cy.visit(
      '/quickguide-designer/colors?data-visual-test&eufemia-theme=sbanken'
    )

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('eufemia-theme')
  })

  it('table should have correct color', () => {
    cy.get('.dnb-table__scroll-view table tbody tr td').should(
      'have.css',
      'color',
      'rgb(28, 27, 78)'
    )
    cy.get(
      '.dnb-table__scroll-view table tbody tr td:last-of-type'
    ).should('contain', '--sb-color-purple')
  })
})
