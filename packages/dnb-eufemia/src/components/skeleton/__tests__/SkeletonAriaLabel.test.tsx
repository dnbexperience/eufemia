import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import Provider from '../../../shared/Provider'
import Anchor from '../../anchor/Anchor'
import Breadcrumb from '../../breadcrumb/Breadcrumb'
import Button from '../../button/Button'
import DatePicker from '../../date-picker/DatePicker'
import FormLabel from '../../form-label/FormLabel'
import Slider from '../../slider/Slider'
import Tag from '../../tag/Tag'
import Textarea from '../../textarea/Textarea'
import { Dd, Dl, Dt, P, Span } from '../../../elements'

// Elements whose role does not allow a name. "a" without href has no role.
const withoutName =
  'abbr, b, caption, cite, code, data, dd, dfn, div, dt, em, figcaption, i, label, legend, mark, p, pre, q, s, small, span, strong, sub, sup, time, u, var, a:not([href])'

const busyLabelOnElementsWithoutName = () =>
  Array.from(
    document.querySelectorAll(`[aria-label="Behandler data ..."]`)
  )
    .filter((element) => !element.hasAttribute('role'))
    .filter((element) => element.matches(withoutName))
    .map((element) => element.tagName.toLowerCase())

describe('skeleton mode', () => {
  it.each<[string, () => ReactNode]>([
    ['Anchor', () => <Anchor href="/path">Link</Anchor>],
    [
      'Breadcrumb.Item',
      () => <Breadcrumb.Item href="/path" text="Page" />,
    ],
    ['Button with href', () => <Button href="/path" text="Link" />],
    ['DatePicker', () => <DatePicker label="Date" />],
    ['Slider', () => <Slider label="Amount" value={10} />],
    ['Textarea', () => <Textarea label="Message" />],
    ['FormLabel', () => <FormLabel forId="input">Label</FormLabel>],
    ['Tag', () => <Tag text="Tag" hasLabel />],
    ['P', () => <P>Paragraph</P>],
    ['Span', () => <Span>Text</Span>],
    [
      'Dl',
      () => (
        <Dl>
          <Dt>Term</Dt>
          <Dd>Description</Dd>
        </Dl>
      ),
    ],
  ])(
    'does not put the busy aria-label on elements without a role in %s',
    (_name, renderNode) => {
      render(<Provider skeleton>{renderNode()}</Provider>)

      expect(document.querySelector('.dnb-skeleton')).toBeInTheDocument()
      expect(busyLabelOnElementsWithoutName()).toEqual([])
    }
  )

  it('keeps a skeleton link a link, so its busy label and aria-disabled are allowed', () => {
    render(
      <Provider skeleton>
        <Anchor href="/path">Link</Anchor>
      </Provider>
    )

    const link = document.querySelector('a')
    expect(link).not.toHaveAttribute('href')
    expect(link).toHaveAttribute('role', 'link')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('aria-label', 'Behandler data ...')
  })

  it('keeps the busy label where a name is allowed', () => {
    render(
      <Provider skeleton>
        <Button text="Button" />
      </Provider>
    )

    expect(document.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Behandler data ...'
    )
  })
})
