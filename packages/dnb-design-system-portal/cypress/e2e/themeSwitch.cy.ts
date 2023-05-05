/**
 * Cypress e2e Test
 *
 */

describe('Theme', () => {
  beforeEach(() => {
    cy.visit('/uilib?data-visual-test') // skip animation

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('eufemia-theme')
  })

  it('should have preload link', () => {
    cy.get('link[href^="/ui."][rel="preload"]')
      .should('exist')
      .its('length')
      .should('equal', 1)
  })

  it('should load css file', () => {
    cy.get('#portal-tools').click()

    // Choose last one
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(2).click()

    cy.get('link[href^="/sbanken."]', { timeout: 10000 })
      .should('exist')
      .its('length')
      .should('equal', 1)
  })

  it('should set local storage', () => {
    cy.get('#portal-tools').click()

    // Choose last one
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(2).click()

    cy.getAllLocalStorage().then((result) => {
      expect(Object.values(result)[0]['eufemia-theme']).to.equal(
        '{"name":"sbanken"}'
      )
    })
  })

  it('should switch back and forth', () => {
    cy.get('#portal-tools').click()

    // Choose last one
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(2).click()

    // Choose first one again
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(0).click()

    cy.get('link[href^="/ui."][rel="stylesheet"]', { timeout: 10000 })
      .should('exist')
      .its('length')
      .should('equal', 1)
  })

  it('should load css file after template', () => {
    cy.get('#portal-tools').click()

    // Choose last one
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(2).click()

    cy.get(
      '#eufemia-style-theme + link[href^="/sbanken."][rel="stylesheet"]',
      { timeout: 10000 }
    ).should('exist')

    // Choose first one again
    cy.get('#change-theme').click()
    cy.get('#change-theme-portal ul li').eq(0).click()

    cy.get('#eufemia-style-theme + link[href^="/ui."][rel="stylesheet"]', {
      timeout: 10000,
    }).should('exist')
  })
})
