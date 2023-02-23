// In order to let cy wait for MF to get loaded
Cypress.on('uncaught:exception', () => {
  return false
})

// In order to visit a page without JavaScript
Cypress.Commands.add('visitAsHtml', (route: string) => {
  cy.request(route)
    .its('body')
    .then((html) => {
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ''
      )

      cy.document().invoke({ log: false }, 'write', html)
    })
})

export {} // indicate that the file is a module

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      visitAsHtml(route: string)
    }
  }
}
