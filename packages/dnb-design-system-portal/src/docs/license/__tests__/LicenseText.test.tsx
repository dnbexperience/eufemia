import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import license from '../../../../../../LICENSE?raw'
import LicenseText, { parseLicense } from '../LicenseText'

afterEach(cleanup)

// The words of the license, in order, as one line
function words(text: string) {
  return text.split(/\s+/).filter(Boolean).join(' ')
}

// Reads the rendered page back as plain text, block by block.
// A term and its description are joined as "Term: description" again.
function renderedText(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll('h2, p, dt, dd:not([aria-hidden])')
  )
    .map((element) =>
      element.tagName === 'DT'
        ? `${element.textContent}:`
        : element.textContent
    )
    .join(' ')
}

describe('LicenseText', () => {
  it('shows every word of the LICENSE file, in order', () => {
    const { container } = render(<LicenseText license={license} />)

    expect(words(renderedText(container))).toBe(words(license))
  })

  it('does not keep the hard line breaks of the file', () => {
    const { container } = render(<LicenseText license={license} />)

    expect(container.querySelectorAll('br')).toHaveLength(0)
    expect(container.querySelector('p').textContent).toBe(
      'The Software is provided to you by the Licensor under the License, as defined below, subject to the following condition.'
    )
  })

  it('shows the license name as a heading', () => {
    const { container } = render(<LicenseText license={license} />)

    expect(container.querySelector('h2').textContent).toBe(
      '"Commons Clause" License Condition v1.0'
    )
  })

  it('shows the software, license and licensor as a definition list', () => {
    const { container } = render(<LicenseText license={license} />)

    const terms = Array.from(container.querySelectorAll('dt'))
    const descriptions = Array.from(container.querySelectorAll('dd'))

    expect(terms.map((dt) => dt.textContent)).toEqual([
      'Software',
      'License',
      'Licensor',
    ])
    expect(descriptions.map((dd) => dd.textContent)).toEqual([
      'DNB Design System (Eufemia)',
      'Apache 2.0 with Commons Clause',
      'DNB Bank ASA, Org nr. 984 851 006',
    ])
  })

  it('makes the URLs into links', () => {
    const { container } = render(<LicenseText license={license} />)

    const links = Array.from(container.querySelectorAll('a'))

    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://commonsclause.com/',
      'https://www.dnb.no/',
    ])
    expect(links.map((a) => a.textContent)).toEqual([
      'https://commonsclause.com/',
      'https://www.dnb.no/',
    ])
  })
})

describe('parseLicense', () => {
  it('joins Windows line endings and keeps punctuation out of links', () => {
    const blocks = parseLicense(
      'Title\r\n\r\nSee https://example.com/a.\r\nNext line\r\n'
    )

    expect(blocks).toEqual([
      { type: 'heading', text: 'Title' },
      { type: 'paragraph', text: 'See https://example.com/a. Next line' },
    ])

    const { container } = render(
      <LicenseText
        license={'Title\n\nSee https://example.com/a, (https://b.no).'}
      />
    )

    expect(
      Array.from(container.querySelectorAll('a')).map((a) =>
        a.getAttribute('href')
      )
    ).toEqual(['https://example.com/a', 'https://b.no'])
    expect(container.querySelector('p').textContent).toBe(
      'See https://example.com/a, (https://b.no).'
    )
  })

  it('does not make a list of a single line or of lines with a URL only', () => {
    expect(
      parseLicense('Title\n\nLicense: MIT\n\nhttps://a.no/\nhttps://b.no/')
    ).toEqual([
      { type: 'heading', text: 'Title' },
      { type: 'paragraph', text: 'License: MIT' },
      { type: 'paragraph', text: 'https://a.no/ https://b.no/' },
    ])
  })
})
