import { act, Fragment } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import TypographyRebels from '../../TypographyRebels'
import Heading from '../../../components/heading/Heading'
import H1 from '../H1'
import H2 from '../H2'
import H3 from '../H3'
import H4 from '../H4'
import H5 from '../H5'
import H6 from '../H6'
import Typography from '../Typography'
import Span from '../../span/Span'
import Theme from '../../../shared/Theme'

const text = 'En enklere hverdag for alle!'
const getRebels = (element: ParentNode = document) =>
  Array.from(element.querySelectorAll('.dnb-t__rebel'))

describe('TypographyRebels', () => {
  it('leaves headings unchanged without the provider', () => {
    render(
      <Theme brand="coconut">
        <H1>{text}</H1>
      </Theme>
    )

    expect(document.querySelector('h1').innerHTML).toBe(text)
  })

  it('defaults to two Rebels spread across eligible words', () => {
    render(
      <Theme brand="coconut">
        <TypographyRebels>
          <H1>{text}</H1>
        </TypographyRebels>
      </Theme>
    )

    expect(getRebels().map(({ textContent }) => textContent)).toEqual([
      'n',
      'a',
    ])
    expect(document.querySelector('h1').textContent).toBe(text)
    expect(document.querySelector('h1').previousSibling).toBeNull()
  })

  it.each([H1, H2, H3, H4, H5, H6, Heading])(
    'gives each heading its own budget (%#)',
    (Component) => {
      render(
        <Theme brand="coconut">
          <TypographyRebels>
            <Component size="large">{text}</Component>
            <Component size="large">{text}</Component>
          </TypographyRebels>
        </Theme>
      )

      expect(getRebels()).toHaveLength(4)
      for (const heading of document.querySelectorAll(
        '[data-flex-item-type="heading"]'
      )) {
        expect(getRebels(heading)).toHaveLength(2)
        expect(heading.textContent).toBe(text)
      }
    }
  )

  it('shares the budget across inline elements and fragments and preserves props', () => {
    const onClick = vi.fn()
    render(
      <Theme brand="coconut">
        <TypographyRebels>
          <H1>
            <Fragment>En </Fragment>
            <strong>enklere hverdag</strong>{' '}
            <a href="#alle" onClick={onClick}>
              for alle!
            </a>
          </H1>
        </TypographyRebels>
      </Theme>
    )

    expect(getRebels()).toHaveLength(2)
    expect(document.querySelector('h1').textContent).toBe(text)
    const link = document.querySelector('a')
    expect(link).toHaveAttribute('href', '#alle')
    expect(getRebels(link)).toHaveLength(1)
    fireEvent.click(link)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each([H1, Heading])(
    'keeps the same selection when words are split across inline children (%#)',
    (Component) => {
      render(
        <Theme brand="coconut">
          <TypographyRebels>
            <Component size="large">Hello world</Component>
            <Component size="large">
              He<span>llo</span> world
            </Component>
            <Component size="large">
              He<Span>llo</Span> world
            </Component>
            <Component size="large">
              H<Span>ello</Span> world
            </Component>
            <Component size="large">
              H
              <em>
                e<Span>llo</Span>
              </em>{' '}
              wo<Fragment>rld</Fragment>
            </Component>
          </TypographyRebels>
        </Theme>
      )

      for (const heading of document.querySelectorAll(
        '[data-flex-item-type="heading"]'
      )) {
        expect(heading.textContent).toBe('Hello world')
        expect(
          getRebels(heading).map(({ textContent }) => textContent)
        ).toEqual(['l', 'o'])
        expect(
          getRebels(heading).map((rebel) => {
            const range = document.createRange()
            range.selectNodeContents(heading)
            range.setEndBefore(rebel)
            return range.toString().length
          })
        ).toEqual([2, 7])
      }
    }
  )

  it('supports nested overrides through the existing Typography context', () => {
    render(
      <TypographyRebels>
        <Theme brand="coconut">
          <Typography.Context responsive>
            <H1>{text}</H1>
            <TypographyRebels maxPerHeading={1}>
              <H2>{text}</H2>
              <TypographyRebels maxPerHeading={0}>
                <H3>{text}</H3>
              </TypographyRebels>
            </TypographyRebels>
          </Typography.Context>
        </Theme>
      </TypographyRebels>
    )

    expect(getRebels(document.querySelector('h1'))).toHaveLength(2)
    expect(getRebels(document.querySelector('h2'))).toHaveLength(1)
    expect(getRebels(document.querySelector('h3'))).toHaveLength(0)
  })

  it.each([
    ['Velkommen til oss', 2, ['l', 'o']],
    ['Fordeler', 1, ['r']],
    ['Velkommen', 2, ['l', 'n']],
    ['Ta', 2, ['a']],
    ['En Spare mer!', 2, ['n', 'e']],
  ])(
    'prefers Rebels away from capitals while retaining a fallback (%s)',
    (value, maxPerHeading, expected) => {
      render(
        <Theme brand="coconut">
          <TypographyRebels maxPerHeading={maxPerHeading}>
            <H1>{value}</H1>
          </TypographyRebels>
        </Theme>
      )

      expect(getRebels().map(({ textContent }) => textContent)).toEqual(
        expected
      )
      expect(document.querySelector('h1').textContent).toBe(value)
    }
  )

  it.each(['ui', 'sbanken', 'eiendom', 'carnegie', undefined] as const)(
    'leaves other brands unchanged (%s)',
    (brand) => {
      render(
        <Theme brand={brand}>
          <TypographyRebels>
            <H1>{text}</H1>
          </TypographyRebels>
        </Theme>
      )

      expect(document.querySelector('h1').innerHTML).toBe(text)
    }
  )

  it('responds to theme, content and limit changes', () => {
    const Example = ({ brand, max = 2, children = text }) => (
      <Theme brand={brand}>
        <TypographyRebels maxPerHeading={max}>
          <H1>{children}</H1>
        </TypographyRebels>
      </Theme>
    )
    const { rerender } = render(<Example brand="coconut" />)
    expect(getRebels()).toHaveLength(2)

    rerender(<Example brand="ui" />)
    expect(getRebels()).toHaveLength(0)

    rerender(
      <Example brand="coconut" max={1}>
        fin
      </Example>
    )
    expect(getRebels()).toHaveLength(1)
    expect(document.querySelector('h1').textContent).toBe('fin')

    rerender(<Example brand="coconut" max={0} />)
    expect(getRebels()).toHaveLength(0)
  })

  it.each([
    ['aefilnort!', 10],
    ['a', 1],
    ['SKY ÆØÅ 123 👨‍👩‍👧‍👦', 0],
    ['á é í ó ñ á é', 0],
    ['👋 spare 😊', 3],
  ])(
    'preserves Unicode text and only uses supported glyphs (%s)',
    (value, count) => {
      render(
        <Theme brand="coconut">
          <TypographyRebels maxPerHeading={20}>
            <H1>{value}</H1>
          </TypographyRebels>
        </Theme>
      )

      expect(getRebels()).toHaveLength(count)
      expect(document.querySelector('h1').textContent).toBe(value)
    }
  )

  it.each([0, -1, NaN, Infinity, 0.5])(
    'disables Rebels for %s',
    (maxPerHeading) => {
      render(
        <Theme brand="coconut">
          <TypographyRebels maxPerHeading={maxPerHeading}>
            <H1>{text}</H1>
          </TypographyRebels>
        </Theme>
      )

      expect(document.querySelector('h1').innerHTML).toBe(text)
    }
  )

  it('rounds fractional limits down', () => {
    render(
      <Theme brand="coconut">
        <TypographyRebels maxPerHeading={1.9}>
          <H1>{text}</H1>
        </TypographyRebels>
      </Theme>
    )

    expect(getRebels()).toHaveLength(1)
  })

  it('only transforms headings using the Sbanken Display font', () => {
    render(
      <Theme brand="coconut">
        <TypographyRebels>
          <H1 family="basis">{text}</H1>
          <H2 size="basis">{text}</H2>
          <H3 size="small">{text}</H3>
          <H4 size="x-small">{text}</H4>
          <H5 size="small" family="heading">
            {text}
          </H5>
          <H6 family="display">{text}</H6>
          <p>{text}</p>
        </TypographyRebels>
      </Theme>
    )

    for (const heading of document.querySelectorAll('h1, h2, h3, h4, p')) {
      expect(getRebels(heading)).toHaveLength(0)
    }
    expect(getRebels(document.querySelector('h5'))).toHaveLength(2)
    expect(getRebels(document.querySelector('h6'))).toHaveLength(2)
  })

  it('supports the Heading text property, including zero', () => {
    render(
      <Theme brand="coconut">
        <TypographyRebels>
          <Heading size="large" text={text}>
            Ignored children
          </Heading>
          <Heading size="large" text={0}>
            Ignored children
          </Heading>
        </TypographyRebels>
      </Theme>
    )

    const headings = document.querySelectorAll('.dnb-heading')
    expect(headings[0].textContent).toBe(text)
    expect(getRebels(headings[0])).toHaveLength(2)
    expect(headings[1].textContent).toBe('0')
    expect(getRebels(headings[1])).toHaveLength(0)
  })

  it('leaves custom components in the heading untouched', () => {
    const CustomContent = () => <span>{text}</span>
    render(
      <Theme brand="coconut">
        <TypographyRebels>
          <H1>
            <CustomContent />
          </H1>
        </TypographyRebels>
      </Theme>
    )

    expect(getRebels()).toHaveLength(0)
    expect(document.querySelector('h1').textContent).toBe(text)
  })

  it('renders deterministically on the server and hydrates without changes', async () => {
    const example = (
      <Theme brand="coconut">
        <TypographyRebels>
          <H1>{text}</H1>
        </TypographyRebels>
      </Theme>
    )
    const html = renderToString(example)
    expect(renderToString(example)).toBe(html)
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>

    await act(async () => {
      root = hydrateRoot(container, example, { onRecoverableError })
    })

    expect(container.innerHTML).toBe(html)
    expect(getRebels(container)).toHaveLength(2)
    expect(onRecoverableError).not.toHaveBeenCalled()
    await act(async () => root.unmount())
  })
})
