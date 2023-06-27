/**
 * Cypress e2e Test
 *
 */

describe('Typography for UI', () => {
  beforeEach(() => {
    // skip animation, use sbanken theme
    cy.visit(
      '/quickguide-designer/fonts?data-visual-test&eufemia-theme=ui'
    )

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('eufemia-theme')
  })

  it('docs should include heading xx-large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading xx-large')
    cy.get('.typography-box > .dnb-h--xx-large').should(
      'have.css',
      'font-size',
      '48px'
    )
  })

  it('docs should include heading x-large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading x-large')
    cy.get('.typography-box > .dnb-h--x-large').should(
      'have.css',
      'font-size',
      '34px'
    )
  })

  it('docs should include heading large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading large')
    cy.get('.typography-box > .dnb-h--large').should(
      'have.css',
      'font-size',
      '26px'
    )
  })

  it('examples should have correct color', () => {
    cy.get('.typography-box > .dnb-h--xx-large').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    )
    cy.get('.typography-box > .dnb-h--x-large').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    )
    cy.get('.typography-box > .dnb-h--large').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    )
    cy.get('.typography-box > .dnb-p').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    )
    cy.get('.typography-box > .dnb-lead').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    )
  })

  it('line-height examples should have correct line-height', () => {
    cy.get('.typography-box > .lh-12').should(
      'have.css',
      'line-height',
      '12px'
    )
    cy.get('.typography-box > .lh-16').should(
      'have.css',
      'line-height',
      '16px'
    )
    cy.get('.typography-box > .lh-20').should(
      'have.css',
      'line-height',
      '20px'
    )
    cy.get('.typography-box > .lh-24').should(
      'have.css',
      'line-height',
      '24px'
    )
    cy.get('.typography-box > .lh-28').should(
      'have.css',
      'line-height',
      '28px'
    )
    cy.get('.typography-box > .lh-32').should(
      'have.css',
      'line-height',
      '32px'
    )
  })

  it('bold text should have correct font-weight', () => {
    cy.get('.typography-box > .dnb-typo-bold').should(
      'have.css',
      'font-weight',
      '600'
    )
  })

  it('examples should not have paragraphs inside headings', () => {
    cy.get('.typography-box *[class^="dnb-h--"] .dnb-p').should(
      'not.exist'
    )
  })
})

describe('Typography for Sbanken', () => {
  beforeEach(() => {
    // skip animation, use sbanken theme
    cy.visit(
      '/quickguide-designer/fonts?data-visual-test&eufemia-theme=sbanken'
    )

    // Check if app is mounted
    cy.get('#dnb-drawer-list__portal', { timeout: 10000 }).should('exist')
  })

  afterEach(() => {
    cy.clearLocalStorage('eufemia-theme')
  })

  it('docs should include heading xx-large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading xx-large')
    cy.get('.typography-box > .dnb-h--xx-large').should(
      'have.css',
      'font-size',
      '50px'
    )
  })

  it('docs should include heading x-large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading x-large')
    cy.get('.typography-box > .dnb-h--x-large').should(
      'have.css',
      'font-size',
      '42px'
    )
  })

  it('docs should include heading large example with correct font-size', () => {
    cy.get('h2').should('contain', 'Heading large')
    cy.get('.typography-box > .dnb-h--large').should(
      'have.css',
      'font-size',
      '34px'
    )
  })

  it('examples should have correct color', () => {
    cy.get('.typography-box > .dnb-h--xx-large').should(
      'have.css',
      'color',
      'rgb(24, 23, 42)'
    )
    cy.get('.typography-box > .dnb-h--x-large').should(
      'have.css',
      'color',
      'rgb(24, 23, 42)'
    )
    cy.get('.typography-box > .dnb-h--large').should(
      'have.css',
      'color',
      'rgb(24, 23, 42)'
    )
    cy.get('.typography-box > .dnb-p').should(
      'have.css',
      'color',
      'rgb(24, 23, 42)'
    )
    cy.get('.typography-box > .dnb-lead').should(
      'have.css',
      'color',
      'rgb(24, 23, 42)'
    )
  })

  it('line-height examples should have correct line-height', () => {
    cy.get('.typography-box > .lh-12').should(
      'have.css',
      'line-height',
      '12px'
    )
    cy.get('.typography-box > .lh-16').should(
      'have.css',
      'line-height',
      '16px'
    )
    cy.get('.typography-box > .lh-20').should(
      'have.css',
      'line-height',
      '20px'
    )
    cy.get('.typography-box > .lh-24').should(
      'have.css',
      'line-height',
      '24px'
    )
    cy.get('.typography-box > .lh-28').should(
      'have.css',
      'line-height',
      '28px'
    )
    cy.get('.typography-box > .lh-32').should(
      'have.css',
      'line-height',
      '32px'
    )
  })

  it('bold text should have correct font-weight', () => {
    cy.get('.typography-box > .dnb-typo-bold').should(
      'have.css',
      'font-weight',
      '700'
    )
  })

  it('examples should not have paragraphs inside headings', () => {
    cy.get('.typography-box *[class^="dnb-h--"] .dnb-p').should(
      'not.exist'
    )
  })
})
