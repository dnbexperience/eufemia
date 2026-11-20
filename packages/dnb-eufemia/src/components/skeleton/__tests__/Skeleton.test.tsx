/**
 * Skeleton Test
 *
 */

import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import type { SkeletonProps } from '../Skeleton'
import Skeleton from '../Skeleton'
import { Article, Circle, Product, Table } from '../figures'
import Input from '../../input/Input'
import P from '../../../elements/P'
import { render } from '@testing-library/react'
import { skeletonDOMAttributes } from '../SkeletonHelper'
import Provider from '../../../shared/Provider'
import FormLabel from '../../form-label/FormLabel'
import Button from '../../button/Button'

const props: SkeletonProps = {
  children: (
    <>
      <P>paragraph</P>
      <Input id="input" label="label">
        value
      </Input>
    </>
  ),
}

describe('Skeleton component', () => {
  it('has to use the provider to enable a skeleton in a component', () => {
    const { rerender } = render(<Skeleton {...props} />)
    expect(
      document.querySelector('.dnb-input .dnb-skeleton')
    ).not.toBeInTheDocument()
    rerender(<Skeleton {...props} show={true} />)
    expect(
      document.querySelector('.dnb-input .dnb-skeleton')
    ).toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Skeleton {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules while the skeleton is shown', async () => {
    // axe reports a prohibited aria-label only when the content is hidden,
    // like placeholder content behind a skeleton
    const Comp = render(
      <Skeleton show>
        <P aria-hidden>placeholder</P>
      </Skeleton>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gives the busy element a group role, so its aria-label is allowed', () => {
    const { rerender } = render(
      <Skeleton {...props} show ariaBusy="Loading" />
    )

    const element = document.querySelector('.dnb-skeleton__root')
    expect(element.tagName).toBe('DIV')
    expect(element).toHaveAttribute('role', 'group')
    expect(element).toHaveAttribute('aria-label', 'Loading')
    expect(element).toHaveAttribute('aria-busy', 'true')

    rerender(<Skeleton {...props} show={false} ariaBusy="Loading" />)

    expect(element).not.toHaveAttribute('role')
    expect(element).not.toHaveAttribute('aria-label')
  })

  it('keeps the role of an element that has its own', () => {
    const { rerender } = render(
      <Skeleton {...props} show element="section" />
    )

    expect(document.querySelector('section')).not.toHaveAttribute('role')
    expect(document.querySelector('section')).toHaveAttribute('aria-label')

    rerender(<Skeleton {...props} show role="region" />)

    expect(document.querySelector('.dnb-skeleton__root')).toHaveAttribute(
      'role',
      'region'
    )
  })

  it.each([
    ['Article', Article],
    ['Circle', Circle],
    ['Product', Product],
    ['Table', Table],
  ])(
    'figure %s keeps its own classes when a className is given',
    (_name, Figure) => {
      render(<Figure className="custom" />)

      expect(document.querySelector('[aria-busy]')).toHaveClass(
        'dnb-skeleton__figure',
        'custom'
      )
    }
  )
})

// React's deprecated .defaultProps would convert undefined values to the
// declared default. After migrating away from .defaultProps we replicate
// that behavior with removeUndefinedProps so that context overrides still
// work when a consumer passes an explicit `undefined`.
describe('undefined props should fall through to defaults', () => {
  it('should let context override show when prop is explicitly undefined', () => {
    const { container } = render(
      <Skeleton {...props} show={undefined} skeleton={true} />
    )

    // When skeleton is true and show is not explicitly false,
    // the skeleton should still activate
    expect(
      container.querySelector('[aria-busy="true"]')
    ).toBeInTheDocument()
  })
})

describe('skeletonDOMAttributes', () => {
  const context = {
    translation: { Skeleton: { ariaBusy: 'Loading' } },
  }

  it('sets the busy label on elements that can have a name', () => {
    expect(skeletonDOMAttributes({}, true, context)).toEqual({
      disabled: true,
      'aria-disabled': true,
      'aria-label': 'Loading',
    })
    expect(
      skeletonDOMAttributes({}, true, context, 'button')['aria-label']
    ).toBe('Loading')
    expect(
      skeletonDOMAttributes({ role: 'img' }, true, context, 'span')[
        'aria-label'
      ]
    ).toBe('Loading')
  })

  it.each(['p', 'span', 'div', 'label', 'strong'])(
    'does not set the busy label on a %s, which can not have a name',
    (element) => {
      expect(skeletonDOMAttributes({}, true, context, element)).toEqual({
        disabled: true,
        'aria-disabled': true,
      })
    }
  )

  it('does not set the busy label on text elements in skeleton mode', () => {
    render(
      <Provider skeleton>
        <P>Paragraph</P>
        <FormLabel forId="input">Label</FormLabel>
        <Button element="span" text="Tag" />
        <Button text="Button" />
      </Provider>
    )

    for (const selector of ['p', 'label', 'span.dnb-button']) {
      const element = document.querySelector(selector)
      expect(element).toHaveAttribute('aria-disabled', 'true')
      expect(element).not.toHaveAttribute('aria-label')
    }
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Behandler data ...'
    )
  })
})

describe('Skeleton scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
