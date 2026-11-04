import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Theme } from '@dnb/eufemia/src/shared'
import { DocumentLetter } from '../Examples'

afterEach(cleanup)

describe('Document letter branding', () => {
  it.each([
    ['ui', 'DNB'],
    ['sbanken', 'Sbanken'],
    ['carnegie', 'DNB Carnegie'],
    ['eiendom', 'DNB Eiendom'],
  ] as const)('inherits the active %s brand', (brand, name) => {
    render(
      <Theme brand={brand}>
        <DocumentLetter />
      </Theme>
    )
    expect(
      document.querySelector('.dnb-document__return-address').textContent
    ).toContain(`Returadresse: ${name},`)
    expect(
      document.querySelector('.dnb-document__signature').textContent
    ).toBe(`Vennlig hilsen${name}`)
    expect(
      document
        .querySelector('#letter')
        .parentElement.classList.contains(`eufemia-theme__${brand}`)
    ).toBe(true)
    expect(
      document
        .querySelector('.dnb-logo')
        .classList.contains(`dnb-logo--${brand}`)
    ).toBe(true)
  })
})
