/**
 * Cypress e2e Test
 *
 */

describe('Page Navigation', () => {
  describe('without JavaScript', () => {
    it('no script tags should exist', () => {
      cy.visitAsHtml('/')
      cy.get('script').should('not.exist')
    })

    it('should not be able to open portal tools', () => {
      cy.visitAsHtml('/uilib')

      cy.get('#portal-tools').click()
      cy.get('#switch-grid').should('not.exist')
    })

    it('should contain page title and heading', () => {
      cy.visitAsHtml('/uilib/components/button')

      cy.title().should('contain', 'Button | Eufemia')
      cy.get('h1').should('contain', 'Button')
    })

    it('should contain button properties page', () => {
      cy.visitAsHtml('/uilib/components/button/properties')

      cy.title().should('contain', 'Button | Eufemia')
      cy.get('h2').should('contain', 'Properties')
    })

    it('components page should include summary list of components', () => {
      cy.visitAsHtml('/uilib/components')

      cy.get('h2').should('contain', 'Components')

      // TODO: fix this in PR
      // cy.get('a[href="/uilib/components/accordion"]').should(
      //   'contain',
      //   'Accordion'
      // )
    })
  })

  describe('with JavaScript', () => {
    beforeEach(() => {
      cy.visit('/')

      // Check if app is mounted
      cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should(
        'exist'
      )
    })

    it('click on first main menu card should open /design-system', () => {
      cy.title().should('contain', 'Eufemia - DNB Design System')

      cy.get('main nav a').first().click()

      cy.title().should('contain', 'About Eufemia | Eufemia')
    })

    it('click on button page should open /uilib/components/button', () => {
      cy.get('main nav a').eq(1).click()
      cy.get('nav a[href="/uilib/components/button/"]').first().click()

      cy.title().should('contain', 'Button | Eufemia')
      cy.get('h1').should('contain', 'Button')
    })

    it('click on properties tab should open /uilib/components/button/properties', () => {
      cy.get('main nav a').eq(1).click()
      cy.get('nav a[href="/uilib/components/button/"]').first().click()
      cy.get('main a[href="/uilib/components/button/properties/"]')
        .first()
        .click()

      cy.title().should('contain', 'Button | Eufemia')
      cy.get('h2').should('contain', 'Properties')
    })

    it('components page should include summary list of components', () => {
      cy.get('main nav a').eq(1).click()
      cy.get('nav a[href="/uilib/components/"]').first().click()

      cy.get('h1').should('contain', 'Components')

      // TODO: fix this in PR
      // cy.get('a[href="/uilib/components/accordion"]').should(
      //   'contain',
      //   'Accordion'
      // )
    })
  })
})
