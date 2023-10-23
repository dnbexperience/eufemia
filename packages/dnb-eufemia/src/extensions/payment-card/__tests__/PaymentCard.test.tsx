/**
 * PaymentCard Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import PaymentCard, {
  Designs,
  ProductType,
  CardType,
  PaymentCardProps,
  BankAxeptType,
} from '../PaymentCard'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { render, screen } from '@testing-library/react'

const nb = nbNO['nb-NO'].PaymentCard
const en = enGB['en-GB'].PaymentCard

const defaultProps: PaymentCardProps = {
  product_code: 'NK1',
  card_number: '************1337',
  card_status: 'active',
  variant: 'normal',
  digits: 'digits',
  raw_data: null,
  id: 'id',
  locale: 'locale',
  skeleton: 'skeleton',
  class: 'class',
  className: 'className',
  children: 'children',
}

describe('PaymentCard', () => {
  it('has to have a figcaption', () => {
    render(<PaymentCard {...defaultProps} />)

    expect(screen.queryByText('DNB Kortet')).toBeInTheDocument()
    expect(screen.queryByText('DNB Kortet').tagName).toEqual('FIGCAPTION')
  })

  it('has a valid title in SVG', () => {
    render(<PaymentCard {...defaultProps} />)

    expect(screen.queryByText('DNB logo')).toBeInTheDocument()
    expect(screen.queryByText('DNB logo').tagName).toEqual('title')
  })

  it('has a correct formatted card number', () => {
    render(<PaymentCard {...defaultProps} />)

    expect(screen.queryByText('**** **** **** 1337')).toBeInTheDocument()
  })

  it('has a correct label', () => {
    render(<PaymentCard {...defaultProps} />)

    expect(screen.queryByText(nb.text_card_number)).toBeInTheDocument()
  })

  it('has correct expired status', () => {
    render(<PaymentCard {...defaultProps} card_status="expired" />)

    expect(screen.queryByText(nb.text_expired)).toBeInTheDocument()
  })

  it('has correct not_active status', () => {
    render(<PaymentCard {...defaultProps} card_status="not_active" />)

    expect(screen.queryByText(nb.text_not_active)).toBeInTheDocument()
  })

  it('has correct renewed status', () => {
    render(<PaymentCard {...defaultProps} card_status="renewed" />)

    expect(screen.queryByText(nb.text_renewed)).toBeInTheDocument()
  })

  it('has correct replaced status', () => {
    render(<PaymentCard {...defaultProps} card_status="replaced" />)

    expect(screen.queryByText(nb.text_replaced)).toBeInTheDocument()
  })

  it('has correct order_in_process status', () => {
    render(
      <PaymentCard {...defaultProps} card_status="order_in_process" />
    )

    expect(
      screen.queryByText(nb.text_order_in_process)
    ).toBeInTheDocument()
  })

  it('has correct blocked status', () => {
    render(<PaymentCard {...defaultProps} card_status="blocked" />)

    expect(screen.queryByText(nb.text_blocked)).toBeInTheDocument()
  })

  it('reacts to locale change', () => {
    const { rerender } = render(<PaymentCard {...defaultProps} />)

    expect(screen.queryByText(nb.text_card_number)).toBeInTheDocument()

    rerender(<PaymentCard {...defaultProps} locale="en-GB" />)
    expect(screen.queryByText(en.text_card_number)).toBeInTheDocument()

    rerender(<PaymentCard {...defaultProps} locale="nb-NO" />)
    expect(screen.queryByText(nb.text_card_number)).toBeInTheDocument()
  })

  it('reacts raw_data with correct rendering', () => {
    const customData = {
      productCode: 'UNDEFINED',
      productName: 'DNB Custom Card',
      displayName: 'Custom card', // Only showed in compact variant
      cardDesign: Designs.gold,
      cardType: CardType.Visa,
      productType: ProductType.None,
      bankAxept: BankAxeptType.BankAxept,
    }

    render(
      <PaymentCard
        product_code="UNDEFINED"
        raw_data={customData}
        variant="compact"
        card_number="************1337"
      />
    )

    expect(screen.queryByText(customData.productName)).toBeInTheDocument()
    expect(screen.queryByText(customData.productName).tagName).toEqual(
      'FIGCAPTION'
    )
    expect(
      document.querySelector('div.dnb-payment-card__card--design-gold')
    ).toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<PaymentCard {...defaultProps} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('PaymentCard scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-payment-card-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
