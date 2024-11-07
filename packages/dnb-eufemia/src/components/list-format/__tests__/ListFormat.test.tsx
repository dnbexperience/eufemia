/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ListFormat, { listFormat } from '../ListFormat'
import { Provider } from '../../../shared'

import { render } from '@testing-library/react'

describe('ListFormat', () => {
  it('renders string values', () => {
    const { container } = render(
      <ListFormat value={['Foo', 'Bar', 'Baz']} />
    )

    expect(container).toHaveTextContent('Foo, Bar og Baz')
  })

  it('renders number values', () => {
    const { container } = render(<ListFormat value={[123, 456, 789]} />)

    expect(container).toHaveTextContent('123, 456 og 789')
  })

  it('renders jsx values', () => {
    const { container } = render(
      <ListFormat
        value={[
          <>A</>,
          <>
            <b>B</b>
          </>,
          <>C</>,
          'D',
          123,
          <a
            target="_blank"
            href="https://github.com/dnbexperience/eufemia"
            className="dnb-anchor"
            rel="noopener noreferrer"
            key="github"
          >
            Link to Eufemia's Github Repo
          </a>,
        ]}
      />
    )

    expect(container).toHaveTextContent(
      "A, B, C, D, 123 og Link to Eufemia's Github Repo"
    )
  })

  it('renders jsx values with keys', () => {
    const { container } = render(
      <ListFormat
        value={[
          <React.Fragment key="a">A</React.Fragment>,
          <React.Fragment key="b">
            <b>B</b>
          </React.Fragment>,
          <React.Fragment key="c">C</React.Fragment>,
          'D',
          123,
        ]}
      />
    )

    expect(container).toHaveTextContent('A, B, C, D og 123')
  })

  it('renders custom format', () => {
    const { container } = render(
      <ListFormat
        value={[123, 456, 789]}
        format={{ style: 'short', type: 'disjunction' }}
      />
    )

    expect(container).toHaveTextContent('123, 456 eller 789')
  })

  it('should render different variants', () => {
    const { container, rerender } = render(
      <ListFormat variant="ol" value={[123, 456, 789]} />
    )

    const valueBlock = container

    const ol = valueBlock.querySelector('.dnb-ol') as HTMLOListElement

    expect(ol).toBeInTheDocument()
    expect(ol.children.length).toBe(3)
    expect(ol).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
    rerender(<ListFormat variant="ul" value={[123, 456, 789]} />)

    const ul = valueBlock.querySelector('.dnb-ul') as HTMLUListElement

    expect(ol).not.toBeInTheDocument()
    expect(ul).toBeInTheDocument()
    expect(ul.children.length).toBe(3)
    expect(ul).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="text" value={[123, 456, 789]} />)

    expect(ol).not.toBeInTheDocument()
    expect(ul).not.toBeInTheDocument()
    expect(valueBlock).toHaveTextContent('123, 456 og 789')
  })

  it('should render different `listTypes` using value', () => {
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a" value={[123, 456, 789]} />
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="A" value={[123, 456, 789]} />
    )
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="i" value={[123, 456, 789]} />
    )
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="I" value={[123, 456, 789]} />
    )
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="circle" value={[123, 456, 789]} />
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="disc" value={[123, 456, 789]} />
    )
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')

    rerender(
      <ListFormat variant="ul" listType="square" value={[123, 456, 789]} />
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children', () => {
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        {[123, 456, 789]}
      </ListFormat>
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="A">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="i">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="I">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="circle">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="disc">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="square">
        {[123, 456, 789]}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children as JSX', () => {
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="A">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="i">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="I">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="circle">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="disc">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="square">
        <>123</>
        <>456</>
        <>789</>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children as JSX with keys', () => {
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')

    rerender(
      <ListFormat variant="ol" listType="A">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')

    rerender(
      <ListFormat variant="ol" listType="i">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')

    rerender(
      <ListFormat variant="ol" listType="I">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')

    rerender(
      <ListFormat variant="ul" listType="circle">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')

    rerender(
      <ListFormat variant="ul" listType="disc">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')

    rerender(
      <ListFormat variant="ul" listType="square">
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
  })

  it('formats value in different locale using value', () => {
    const { container } = render(
      <Provider locale="en-GB">
        <ListFormat value={['Baz', 'Bar', 'Foo']} />
      </Provider>
    )

    expect(container).toHaveTextContent('Baz, Bar and Foo')
  })

  it('formats value in different locale using children', () => {
    const { container } = render(
      <Provider locale="en-GB">
        <ListFormat>{['Baz', 'Bar', 'Foo']}</ListFormat>
      </Provider>
    )

    expect(container).toHaveTextContent('Baz, Bar and Foo')
  })

  it('formats value in different locale using children as JSX', () => {
    const { container } = render(
      <Provider locale="en-GB">
        <ListFormat>
          <>Baz</>
          <>Bar</>
          <>Foo</>
        </ListFormat>
      </Provider>
    )

    expect(container).toHaveTextContent('Baz, Bar and Foo')
  })

  it('formats value in different locale using children as JSX with keys', () => {
    const { container } = render(
      <Provider locale="en-GB">
        <ListFormat>
          <React.Fragment key="123">Baz</React.Fragment>
          <React.Fragment key="456">Bar</React.Fragment>
          <React.Fragment key="789">Foo</React.Fragment>
        </ListFormat>
      </Provider>
    )

    expect(container).toHaveTextContent('Baz, Bar and Foo')
  })
})

describe('ListFormat aria', () => {
  it('should validate', async () => {
    const Component = render(<ListFormat value={[1]} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('listFormat', () => {
  it('accepts string values', () => {
    expect(listFormat(['Foo', 'Bar', 'Baz'])).toBe('Foo, Bar og Baz')
  })

  it('accepts number values', () => {
    expect(listFormat([123, 456, 789])).toBe('123, 456 og 789')
  })

  it('accepts jsx values', () => {
    expect(
      listFormat([
        <>A</>,
        <>
          <b>B</b>
        </>,
        <>C</>,
        'D',
        123,
      ])
    ).toMatchInlineSnapshot(`
      [
        "",
        <React.Fragment>
          <React.Fragment>
            A
          </React.Fragment>
        </React.Fragment>,
        ", ",
        <React.Fragment>
          <React.Fragment>
            <b>
              B
            </b>
          </React.Fragment>
        </React.Fragment>,
        ", ",
        <React.Fragment>
          <React.Fragment>
            C
          </React.Fragment>
        </React.Fragment>,
        ", ",
        <React.Fragment>
          D
        </React.Fragment>,
        " og ",
        <React.Fragment>
          123
        </React.Fragment>,
        "",
      ]
    `)
  })

  it('accepts jsx values with keys', () => {
    expect(
      listFormat([
        <React.Fragment key="a">A</React.Fragment>,
        <React.Fragment key="b">
          <b>B</b>
        </React.Fragment>,
        <React.Fragment key="c">C</React.Fragment>,
        'D',
        123,
      ])
    ).toMatchInlineSnapshot(`
      [
        "",
        <React.Fragment>
          A
        </React.Fragment>,
        ", ",
        <React.Fragment>
          <b>
            B
          </b>
        </React.Fragment>,
        ", ",
        <React.Fragment>
          C
        </React.Fragment>,
        ", ",
        <React.Fragment>
          D
        </React.Fragment>,
        " og ",
        <React.Fragment>
          123
        </React.Fragment>,
        "",
      ]
    `)
  })

  it('accepts custom format', () => {
    expect(
      listFormat([123, 456, 789], {
        format: { style: 'short', type: 'disjunction' },
      })
    ).toBe('123, 456 eller 789')
  })

  it('accepts custom locale', () => {
    expect(
      listFormat([123, 456, 789], {
        locale: 'en-US',
        format: { style: 'short', type: 'disjunction' },
      })
    ).toBe('123, 456, or 789')
  })
})
