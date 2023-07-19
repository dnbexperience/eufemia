/**
 * GlobalStatus Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import GlobalStatus, { GlobalErrorAllProps } from '../GlobalError'
import { render } from '@testing-library/react'
import { Provider } from '../../../shared'

const status = '404'
const title = 'title'
const text = 'text'

const props: GlobalErrorAllProps = {
  status,
  text,
  title,
}

describe('GlobalError', () => {
  it('has default text for 404', () => {
    render(<GlobalStatus status="404" />)

    expect(
      document.querySelector('.dnb-global-error__inner__content')
        .textContent
    ).toMatchInlineSnapshot(
      `"Vi finner ikke siden du leter etter …Sikker på at du har skrevet riktig adresse? Eller har vi rotet med lenkene?Feilmeldings-kode: 404"`
    )
  })

  it('has default text for 500', () => {
    render(<GlobalStatus status="500" />)

    expect(
      document.querySelector('.dnb-global-error__inner__content')
        .textContent
    ).toMatchInlineSnapshot(
      `"Beklager, her skjedde det noe feil!Tjenesten fungerer ikke slik den skal for øyeblikket, men prøv igjen senere.Feilmeldings-kode: 500"`
    )
  })

  it('has default text for 404 in en-GB', () => {
    render(<GlobalStatus status="404" locale="en-GB" />)

    expect(
      document.querySelector('.dnb-global-error__inner__content')
        .textContent
    ).toMatchInlineSnapshot(
      `"We can't find the page you're looking for …Are you sure you have entered the correct address? Or have we messed with the links?Error code: 404"`
    )
  })

  it('has default text for 500 in en-GB', () => {
    render(
      <Provider locale="en-GB">
        <GlobalStatus status="500" />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-global-error__inner__content')
        .textContent
    ).toMatchInlineSnapshot(
      `"Sorry, a technical error happened!The service is not working properly at the moment. Try again later.Error code: 500"`
    )
  })

  it('has to have title and text props as defined in the prop', () => {
    render(<GlobalStatus {...props} />)

    expect(
      document.querySelector('.dnb-global-error__inner__content h1')
        .textContent
    ).toBe('title')
    expect(
      document.querySelector('.dnb-global-error__inner__content .dnb-p')
        .textContent
    ).toBe('text')
  })

  it('should render status code', () => {
    render(<GlobalStatus {...props} />)

    const elem = document.querySelector('.dnb-global-error__status')
    expect(elem.textContent).toMatchInlineSnapshot(
      `"Feilmeldings-kode: 404"`
    )
    expect(elem.querySelector('code').textContent).toBe('404')
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <GlobalStatus {...props} />
      </Provider>
    )

    expect(document.querySelector('.dnb-p').className).toMatch(
      skeletonClassName
    )
  })

  it('should support spacing props', () => {
    render(<GlobalStatus {...props} top="2rem" />)

    const element = document.querySelector('.dnb-global-error')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-skeleton__root',
      'dnb-space__top--large',
      'dnb-global-error',
      'dnb-global-error--404',
    ])
  })

  it('should add additioanl html props to main element', () => {
    render(<GlobalStatus {...props} aria-label="Label" />)

    const element = document.querySelector('.dnb-global-error')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-label', 'lang'])
  })

  it('should show links when provided', () => {
    render(
      <GlobalStatus
        {...props}
        links={[
          { text: 'Anchor 1', url: 'http://' },
          { text: 'Anchor 2', url: 'http://' },
        ]}
      />
    )

    const elem = document.querySelector('.dnb-global-error__links')

    expect(elem).toBeInTheDocument()
    expect(elem.previousSibling.textContent).toMatchInlineSnapshot(
      `"Her er noen lenker som kanskje kan hjelpe:"`
    )
    expect(elem.textContent).toMatchInlineSnapshot(`"Anchor 1Anchor 2"`)
    expect(elem.querySelectorAll('a.dnb-anchor')).toHaveLength(2)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<GlobalStatus {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('GlobalError scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-global-error-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
