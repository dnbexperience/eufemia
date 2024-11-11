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
            link
          </a>,
        ]}
      />
    )

    expect(container).toHaveTextContent('A, B, C, D, 123 og link')
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

  it('formats array of elements the same as nested in a single fragment in value prop', () => {
    const withRootFragment = [
      <React.Fragment key="fragment">
        <span key="a">a</span>
        <span key="b">b</span>
        <span key="c">c</span>
      </React.Fragment>,
    ]
    const withoutRootFragment = [
      <span key="a">a</span>,
      <span key="b">b</span>,
      <span key="c">c</span>,
    ]
    const { container: containerWithoutRootFragment } = render(
      <ListFormat variant="ol" value={withRootFragment} />
    )

    const { container: containerWithRootFragment } = render(
      <ListFormat variant="ol" value={withoutRootFragment} />
    )

    expect(containerWithoutRootFragment.textContent).toEqual(
      containerWithRootFragment.textContent
    )
  })

  it('formats array of elements the same as nested in a single fragment as children', () => {
    const withRootFragment = [
      <React.Fragment key="fragment">
        <span key="a">a</span>
        <span key="b">b</span>
        <span key="c">c</span>
      </React.Fragment>,
    ]
    const withoutRootFragment = [
      <span key="a">a</span>,
      <span key="b">b</span>,
      <span key="c">c</span>,
    ]
    const { container: containerWithoutRootFragment } = render(
      <ListFormat variant="ol">{withRootFragment}</ListFormat>
    )

    const { container: containerWithRootFragment } = render(
      <ListFormat variant="ol">{withoutRootFragment}</ListFormat>
    )

    expect(containerWithoutRootFragment.textContent).toEqual(
      containerWithRootFragment.textContent
    )
  })

  it('should render different variants', () => {
    const values = [123, 456, 789]
    const { container, rerender } = render(
      <ListFormat variant="ol" value={values} />
    )

    const valueBlock = container

    const ol = valueBlock.querySelector('.dnb-ol') as HTMLOListElement

    expect(ol).toBeInTheDocument()
    expect(ol.children.length).toBe(3)
    expect(ol).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
    rerender(<ListFormat variant="ul" value={values} />)

    const ul = valueBlock.querySelector('.dnb-ul') as HTMLUListElement

    expect(ol).not.toBeInTheDocument()
    expect(ul).toBeInTheDocument()
    expect(ul.children.length).toBe(3)
    expect(ul).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="text" value={values} />)

    expect(ol).not.toBeInTheDocument()
    expect(ul).not.toBeInTheDocument()
    expect(valueBlock).toHaveTextContent('123, 456 og 789')
  })

  it('should render different `listTypes` using value', () => {
    const values = [123, 456, 789]
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a" value={values} />
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ol" listType="A" value={values} />)
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ol" listType="i" value={values} />)
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ol" listType="I" value={values} />)
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ul" listType="circle" value={values} />)
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ul" listType="disc" value={values} />)
    expect(list('ul')).toHaveAttribute('type', 'disc')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(<ListFormat variant="ul" listType="square" value={values} />)
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="unstyled" value={values} />
    )
    expect(list('ul')).not.toHaveAttribute('type')
    expect(list('ul')).toHaveClass('dnb-unstyled-list dnb-ul')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children', () => {
    const values = [123, 456, 789]
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        {values}
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
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="i">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="I">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="circle">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="disc">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="square">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="unstyled">
        {values}
      </ListFormat>
    )
    expect(list('ul')).not.toHaveAttribute('type')
    expect(list('ul')).toHaveClass('dnb-unstyled-list dnb-ul')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children as JSX', () => {
    const values = (
      <>
        <>123</>
        <>456</>
        <>789</>
      </>
    )

    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        {values}
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
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="i">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ol" listType="I">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')
    expect(list('ol')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="circle">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="disc">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <ListFormat variant="ul" listType="square">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'square')
    expect(list('ul')).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
  })

  it('should render different `listTypes` using children as JSX with keys', () => {
    const values = (
      <>
        <React.Fragment key="123">123</React.Fragment>
        <React.Fragment key="456">456</React.Fragment>
        <React.Fragment key="789">789</React.Fragment>
      </>
    )
    const { container, rerender } = render(
      <ListFormat variant="ol" listType="a">
        {values}
      </ListFormat>
    )

    const valueBlock = container

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')

    rerender(
      <ListFormat variant="ol" listType="A">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'A')

    rerender(
      <ListFormat variant="ol" listType="i">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'i')

    rerender(
      <ListFormat variant="ol" listType="I">
        {values}
      </ListFormat>
    )
    expect(list('ol')).toHaveAttribute('type', 'I')

    rerender(
      <ListFormat variant="ul" listType="circle">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'circle')

    rerender(
      <ListFormat variant="ul" listType="disc">
        {values}
      </ListFormat>
    )
    expect(list('ul')).toHaveAttribute('type', 'disc')

    rerender(
      <ListFormat variant="ul" listType="square">
        {values}
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

  it('should support spacing props', () => {
    render(
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ol"
        listType="a"
        top="large"
      />
    )

    const element = document.querySelector('.dnb-list-format')

    expect(element.classList).toContain('dnb-space__top--large')
  })
})

describe('ListFormat aria', () => {
  it('should validate', async () => {
    const Component = render(<ListFormat value={[1]} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('listFormat', () => {
  it('accepts undefined', () => {
    expect(listFormat(undefined)).toBe(undefined)
  })

  it('accepts null', () => {
    expect(listFormat(null)).toBe(null)
  })

  it('accepts array with undefined', () => {
    expect(listFormat([undefined])).toBe('')
  })

  it('accepts array with null', () => {
    expect(listFormat([null])).toBe('')
  })

  it('accepts array with false', () => {
    expect(listFormat([false])).toBe('')
  })

  it('accepts array with 0', () => {
    expect(listFormat([0])).toBe('0')
  })

  it('accepts empty array', () => {
    expect(listFormat([])).toBe('')
  })

  it('accepts array with falsy values', () => {
    expect(listFormat([null, undefined, false, NaN, '', 0, -0])).toBe(
      ', 0 og 0'
    )
  })

  it('accepts array with string values', () => {
    expect(listFormat(['Foo', 'Bar', 'Baz'])).toBe('Foo, Bar og Baz')
  })

  it('accepts array with empty string values', () => {
    expect(listFormat(['', '', ''])).toBe(',  og ')
  })

  it('accepts array with number values', () => {
    expect(listFormat([123, 456, 789])).toBe('123, 456 og 789')
  })

  it('accepts array with negative number values', () => {
    expect(listFormat([-123, -456, -789])).toBe('-123, -456 og -789')
  })

  it('accepts array with jsx values', () => {
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

  it('accepts array with jsx values with keys', () => {
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

  it('formats array of elements the same as nested in a single fragment', () => {
    const withRootFragment = listFormat([
      <React.Fragment key="fragment">
        <span key="a">a</span>
        <span key="b">b</span>
        <span key="c">c</span>
      </React.Fragment>,
    ])
    const withoutRootFragment = listFormat([
      <span key="a">a</span>,
      <span key="b">b</span>,
      <span key="c">c</span>,
    ])
    const { container: containerWithRootFragment } = render(
      withRootFragment as any
    )
    const { container: containerWithoutRootFragment } = render(
      withoutRootFragment as any
    )

    expect(containerWithRootFragment.textContent).toEqual(
      containerWithoutRootFragment.textContent
    )
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
