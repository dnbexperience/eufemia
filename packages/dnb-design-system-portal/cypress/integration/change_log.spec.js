/**
 * Cypress e2e Test
 *
 */

import { changelogVersion } from '../../package.json'

describe('Change log', () => {
  beforeEach(() => {
    cy.visit('/design-system/')
  })

  it('click on main menu button should open the main menu', () => {
    cy.get('main')
      .find('h2:nth-of-type(1)')
      .should('contain', changelogVersion)
  })
})
