/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Anchor, { AnchorAllProps } from '../Anchor'
import { bell } from '../../../icons'
import IconPrimary from '../../IconPrimary'
import locales from '../../../shared/locales'

const nb = locales['nb-NO'].Anchor
const en = locales['en-GB'].Anchor

const props: AnchorAllProps = {
  element: 'a',
  lang: 'nb-NO',
}

describe('Anchor element', () => {
  describe('_blank', () => {
    it('should have tooltip', () => {
      render(
        <Anchor href="/url" target="_blank" id="unique-id" lang="nb-NO">
          text
        </Anchor>
      )

      expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
      expect(
        document.querySelector('#unique-id-tooltip.dnb-tooltip__content')
          .textContent
      ).toBe(nb.targetBlankTitle)
    })

    it('should still have tooltip with "dnb-anchor--no-icon" class', () => {
      render(
        <Anchor
          href="/url"
          target="_blank"
          id="unique-id"
          className="dnb-anchor--no-icon"
          lang="nb-NO"
        >
          text
        </Anchor>
      )

      expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
      expect(
        document.querySelector('#unique-id-tooltip.dnb-tooltip__content')
          .textContent
      ).toBe(nb.targetBlankTitle)
    })

    it('should still have tooltip when omitClass prop is true', () => {
      render(
        <Anchor
          href="/url"
          target="_blank"
          id="unique-id"
          omitClass
          lang="nb-NO"
        >
          text
        </Anchor>
      )

      expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
      expect(
        document.querySelector('#unique-id-tooltip.dnb-tooltip__content')
          .textContent
      ).toBe(nb.targetBlankTitle)
    })

    it('has "__launch-icon" class', () => {
      render(
        <Anchor href="/url" target="_blank">
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector(
          '.dnb-anchor .dnb-anchor__launch-icon.dnb-icon.dnb-icon--default'
        )
      ).toBeInTheDocument()
    })

    it('has no "__launch-icon" class when href was mailto, tel or sms', () => {
      const { rerender } = render(
        <Anchor href="mailto:" target="_blank">
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector('.dnb-anchor--launch-icon')
      ).not.toBeInTheDocument()

      rerender(
        <Anchor href="tel:" target="_blank">
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector('.dnb-anchor--launch-icon')
      ).not.toBeInTheDocument()

      rerender(
        <Anchor href="sms:" target="_blank">
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector('.dnb-anchor--launch-icon')
      ).not.toBeInTheDocument()
    })

    it('has no "__launch-icon" class when adding class dnb-anchor--no-launch-icon', () => {
      render(
        <Anchor
          href="/url"
          target="_blank"
          className="dnb-anchor--no-launch-icon"
        >
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector('.dnb-anchor--launch-icon')
      ).not.toBeInTheDocument()
    })

    it('has no tooltip when title was given', () => {
      render(
        <Anchor href="/url" target="_blank" title="Title">
          <span>text</span>
        </Anchor>
      )
      expect(
        document.querySelector('.dnb-tooltip')
      ).not.toBeInTheDocument()
    })

    it('has aria-describedby', () => {
      const { rerender } = render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      const id = (
        document.querySelector('a') as HTMLAnchorElement
      ).getAttribute('aria-describedby')
      expect(
        (document.body.querySelector('#' + id) as HTMLAnchorElement)
          .textContent
      ).toBe(en.targetBlankTitle)

      const title = 'External site'

      rerender(
        <Anchor href="/url" target="_blank" lang="en-GB" title={title}>
          text
        </Anchor>
      )

      expect(
        (document.querySelector('a') as HTMLAnchorElement).getAttribute(
          'title'
        )
      ).toBe(title)
      expect(document.body.querySelector('#' + id)).toBe(null)
    })

    it('icon right overrides launch icon', () => {
      const { rerender } = render(
        <Anchor
          href="/url"
          target="_blank"
          icon={bell}
          iconPosition="right"
        >
          text
        </Anchor>
      )

      expect(document.querySelectorAll('.dnb-icon')).toHaveLength(1)
      expect(
        document.querySelector('.dnb-icon').getAttribute('data-testid')
      ).toBe('bell icon')

      rerender(
        <Anchor
          href="/url"
          target="_blank"
          icon={<IconPrimary icon={bell} />}
          iconPosition="right"
        >
          text
        </Anchor>
      )

      expect(document.querySelectorAll('.dnb-icon')).toHaveLength(1)
      expect(
        document.querySelector('.dnb-icon').getAttribute('data-testid')
      ).toBe('bell icon')
    })

    it('icon left does not override launch icon', () => {
      const { rerender } = render(
        <Anchor
          href="/url"
          target="_blank"
          icon={bell}
          iconPosition="left"
        >
          text
        </Anchor>
      )

      expect(document.querySelectorAll('.dnb-icon')).toHaveLength(2)
      expect(
        document
          .querySelector('.dnb-anchor .dnb-icon:first-child')
          .getAttribute('data-testid')
      ).toBe('bell icon')
      expect(
        document.querySelector('.dnb-anchor .dnb-icon:last-child')
          .classList
      ).toContain('dnb-anchor__launch-icon')

      rerender(
        <Anchor
          href="/url"
          target="_blank"
          icon={<IconPrimary icon={bell} />}
          iconPosition="left"
        >
          text
        </Anchor>
      )

      expect(document.querySelectorAll('.dnb-icon')).toHaveLength(2)
      expect(
        document
          .querySelector('.dnb-anchor .dnb-icon:first-child')
          .getAttribute('data-testid')
      ).toBe('bell icon')
      expect(
        document.querySelector('.dnb-anchor .dnb-icon:last-child')
          .classList
      ).toContain('dnb-anchor__launch-icon')
    })
  })

  it('has dnb-a class', () => {
    render(<Anchor>text</Anchor>)
    expect(document.querySelector('.dnb-a')).toBeInTheDocument()
  })

  it('has href', () => {
    render(<Anchor href="/url">text</Anchor>)
    expect(document.querySelector('[href]')).toBeInTheDocument()
  })

  it('should forward id', () => {
    render(
      <Anchor href="/url" id="unique-id">
        text
      </Anchor>
    )
    expect(document.querySelector('a').getAttribute('id')).toBe(
      'unique-id'
    )
  })

  it('should have tooltip markup in DOM', () => {
    render(
      <Anchor href="/url" id="unique-id" tooltip="Tooltip">
        text
      </Anchor>
    )

    expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
    expect(
      document.querySelector('#unique-id-tooltip.dnb-tooltip__content')
        .textContent
    ).toBe('Tooltip')
  })

  it('should aria-describedby set by tooltip', () => {
    render(
      <Anchor href="/url" id="unique-id" tooltip="Tooltip">
        text
      </Anchor>
    )

    const element = document.getElementById('unique-id')

    expect(element.getAttribute('aria-describedby')).toBe(
      'unique-id-tooltip'
    )
  })

  it('should show tooltip on mouseover', () => {
    globalThis.IS_TEST = true

    render(
      <Anchor href="/url" id="unique-id" tooltip="Tooltip">
        text
      </Anchor>
    )

    const element = document.getElementById('unique-id')
    fireEvent.mouseEnter(element)

    expect(
      document.querySelector('#unique-id-tooltip.dnb-tooltip__content')
        .parentElement.classList
    ).toContain('dnb-tooltip--active')

    globalThis.IS_TEST = false
  })

  it('has "--was-node" class when child was not a string', () => {
    render(
      <Anchor href="/url">
        <span>text</span>
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--was-node')
    ).toBeInTheDocument()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLAnchorElement>()

    render(
      <Anchor ref={ref} to="/url">
        text
      </Anchor>
    )

    const element = document.querySelector('.dnb-anchor')
    expect(ref.current).toBe(element)
  })

  it('gets valid element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLAnchorElement> =
      React.createRef()

    const refFn = (elem: HTMLAnchorElement) => {
      ref.current = elem
    }

    render(<Anchor id="unique" ref={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.tagName).toBe('A')
  })

  it('supports rel', () => {
    render(
      <Anchor rel="external" href="http://www.externallink.com/">
        text
      </Anchor>
    )
    expect(document.querySelector('[rel="external"]')).toBeInTheDocument()
  })

  it('should validate with ARIA rules as a Anchor element', async () => {
    const Component = render(<Anchor {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })

  it('has left icon class when using left icon prop', () => {
    render(
      <Anchor href="/url" icon="bell" iconPosition="left">
        text
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--icon-left')
    ).toBeInTheDocument()
  })

  it('has right icon class when using right icon prop', () => {
    render(
      <Anchor href="/url" icon="bell" iconPosition="right">
        text
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--icon-right')
    ).toBeInTheDocument()
  })

  it('defaults to left icon when using icon prop', () => {
    render(
      <Anchor href="/url" icon="bell">
        text
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--icon-left')
    ).toBeInTheDocument()
  })

  it('should support "to" prop type without forwarding to href', () => {
    render(<Anchor to="/url">text</Anchor>)

    expect(document.querySelector('a')).not.toHaveAttribute('href')
  })

  it('should support custom Link component with "to" prop', () => {
    const Link = ({ children, to, ...rest }) => {
      return (
        <a {...rest} href={to}>
          {children}
        </a>
      )
    }

    render(
      <Anchor to="/url" element={Link}>
        text
      </Anchor>
    )

    expect(document.querySelector('a')).toHaveAttribute('href', '/url')
  })

  it('should have no-animation class if "noAnimation" props is true', () => {
    const { rerender } = render(<Anchor />)

    const anchor = document.querySelector('.dnb-anchor')

    expect(anchor.className).not.toContain('dnb-anchor--no-animation')

    rerender(<Anchor noAnimation />)

    expect(anchor.className).toContain('dnb-anchor--no-animation')
  })

  it('should have no-hover class if "noHover" props is true', () => {
    const { rerender } = render(<Anchor />)

    const anchor = document.querySelector('.dnb-anchor')

    expect(anchor.className).not.toContain('dnb-anchor--no-hover')

    rerender(<Anchor noHover />)

    expect(anchor.className).toContain('dnb-anchor--no-hover')
  })

  it('should have no-style class if "noStyle" props is true', () => {
    const { rerender } = render(<Anchor />)

    const anchor = document.querySelector('.dnb-anchor')

    expect(anchor.className).not.toContain('dnb-anchor--no-style')

    rerender(<Anchor noStyle />)

    expect(anchor.className).toContain('dnb-anchor--no-style')
  })

  it('should have no-underline class if "noUnderline" props is true', () => {
    const { rerender } = render(<Anchor />)

    const anchor = document.querySelector('.dnb-anchor')

    expect(anchor.className).not.toContain('dnb-anchor--no-underline')

    rerender(<Anchor noUnderline />)

    expect(anchor.className).toContain('dnb-anchor--no-underline')
  })
})

describe('Anchor scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it.each(['ui', 'sbanken'])(
    'has to match theme css for %s',
    (themeName) => {
      const css = loadScss(
        require.resolve(
          `../style/themes/dnb-anchor-theme-${themeName}.scss`
        )
      )
      expect(css).toMatchSnapshot()
    }
  )
})
