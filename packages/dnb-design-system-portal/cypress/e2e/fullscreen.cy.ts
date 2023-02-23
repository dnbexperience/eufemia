/**
 * Cypress e2e Test
 *
 */

describe('Fullscreen', () => {
  beforeEach(() => {
    cy.visit('/uilib/components/button')

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  it('click on fullscreen button should navigate to the fullscreen page', () => {
    cy.get('nav#portal-sidebar-menu').should('exist')

    cy.get('button[title="Fullscreen"]').click()

    cy.get('nav#portal-sidebar-menu').should('not.exist')

    cy.location('href').should(
      'include',
      '/uilib/components/button/?fullscreen'
    )
  })
})
