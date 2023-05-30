/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component, {
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
  const Comp = mount(<Component {...defaultProps} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a figcaption', () => {
    render(<Component {...defaultProps} />)

    expect(screen.queryByText('DNB Kortet')).toBeTruthy()
    expect(screen.queryByText('DNB Kortet').tagName).toEqual('FIGCAPTION')
  })

  it('has a valid title in SVG', () => {
    render(<Component {...defaultProps} />)

    expect(screen.queryByText('DNB logo')).toBeTruthy()
    expect(screen.queryByText('DNB logo').tagName).toEqual('title')
  })

  it('has a correct formatted card number', () => {
    render(<Component {...defaultProps} />)

    expect(screen.queryByText('**** **** **** 1337')).toBeTruthy()
  })

  it('has a correct label', () => {
    render(<Component {...defaultProps} />)

    expect(screen.queryByText(nb.text_card_number)).toBeTruthy()
  })

  it('has correct expired status', () => {
    render(<Component {...defaultProps} card_status="expired" />)

    expect(screen.queryByText(nb.text_expired)).toBeTruthy()
  })

  it('has correct blocked status', () => {
    render(<Component {...defaultProps} card_status="blocked" />)

    expect(screen.queryByText(nb.text_blocked)).toBeTruthy()
  })

  it('reacts to locale change', () => {
    const { rerender } = render(<Component {...defaultProps} />)

    expect(screen.queryByText(nb.text_card_number)).toBeTruthy()

    rerender(<Component {...defaultProps} locale="en-GB" />)
    expect(screen.queryByText(en.text_card_number)).toBeTruthy()

    rerender(<Component {...defaultProps} locale="nb-NO" />)
    expect(screen.queryByText(nb.text_card_number)).toBeTruthy()
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
      <Component
        product_code="UNDEFINED"
        raw_data={customData}
        variant="compact"
        card_number="************1337"
      />
    )

    expect(screen.queryByText(customData.productName)).toBeTruthy()
    expect(screen.queryByText(customData.productName).tagName).toEqual(
      'FIGCAPTION'
    )
    expect(
      document.querySelector('div.dnb-payment-card__card--design-gold')
    ).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('PaymentCard scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-payment-card-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
