/**
 * Cypress e2e Test
 *
 */

describe('Page Scroll', () => {
  beforeEach(() => {
    cy.visit('/contribute/getting-started/')

    // Ensure we do NOT set `scroll-behavior: smooth;`
    cy.get('html').then((elem) => {
      elem[0].setAttribute('data-visual-test', 'true')
    })

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  it('click on a table of content anchor should scroll the page to element', () => {
    cy.get('main .dnb-ul li').eq(6).find('a').click()

    cy.window().its('scrollY').should('be.gte', 2000)
  })
})
