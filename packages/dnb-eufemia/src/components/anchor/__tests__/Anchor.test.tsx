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

const props: AnchorAllProps = {
  element: 'a',
  lang: 'nb-NO',
}

describe('Anchor element', () => {
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
  })

  it('has "--launch-icon" class when target is blank', () => {
    render(
      <Anchor href="/url" target="_blank">
        <span>text</span>
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--launch-icon')
    ).toBeInTheDocument()
  })

  it('has no "--launch-icon" class when target is blank and href was mailto, tel or sms', () => {
    const { rerender } = render(
      <Anchor href="/url" target="_blank">
        <span>text</span>
      </Anchor>
    )
    expect(
      document.querySelector('.dnb-anchor--launch-icon')
    ).toBeInTheDocument()

    rerender(
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

  it('has no tooltip when title was given', () => {
    render(
      <Anchor href="/url" target="_blank" title="Title">
        <span>text</span>
      </Anchor>
    )
    expect(document.querySelector('.dnb-tooltip')).not.toBeInTheDocument()
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

  it('has aria-describedby when target is blank', () => {
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
    ).toBe('Opens a new Window')

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

  it('uses given icon instead of launch icon', () => {
    const { rerender } = render(
      <Anchor href="/url" target="_blank" icon={bell} iconPosition="right">
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
