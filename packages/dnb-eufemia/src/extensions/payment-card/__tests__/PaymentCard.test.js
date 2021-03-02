/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component, {
  // getCardData,
  Designs,
  ProductType,
  CardType,
  formatCardNumber
} from '../PaymentCard'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'

const nb = nbNO['nb-NO'].PaymentCard
const en = enGB['en-GB'].PaymentCard
const defaultProps = fakeProps(require.resolve('../PaymentCard'), {
  optional: true
})
defaultProps.product_code = 'NK1'
defaultProps.card_number = '************1337'
defaultProps.card_status = 'active'
defaultProps.variant = 'normal'
defaultProps.raw_data = null

describe('PaymentCard', () => {
  const Comp = mount(<Component {...defaultProps} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a figcaption', () => {
    expect(Comp.find('figcaption').text()).toBe('DNB Kortet')
  })

  it('has a valid title in SVG', () => {
    expect(
      Comp.find('svg.dnb-payment-card__card__bank-logo')
        .first()
        .find('title')
        .text()
    ).toContain('DNB')
  })

  it('has a correct formattet card number', () => {
    expect(Comp.find('p.dnb-payment-card__card__numbers').text()).toBe(
      formatCardNumber(defaultProps.card_number)
    )
  })

  it('has a correct label', () => {
    expect(Comp.find('p.dnb-payment-card__card__holder').text()).toBe(
      nb.text_card_number
    )
  })

  it('has correact expired status', () => {
    Comp.setProps({
      card_status: 'expired'
    })
    expect(Comp.exists('div.dnb-payment-card__blocking__overlay')).toBe(
      true
    )
    expect(
      Comp.find('div.dnb-payment-card__blocking__overlay')
        .find('p.dnb-p')
        .text()
    ).toBe(nb.text_expired)
  })

  it('has correact blocked status', () => {
    Comp.setProps({
      card_status: 'blocked'
    })
    expect(Comp.exists('div.dnb-payment-card__blocking__overlay')).toBe(
      true
    )
    expect(
      Comp.find('div.dnb-payment-card__blocking__overlay')
        .find('p.dnb-p')
        .text()
    ).toBe(nb.text_blocked)
  })

  it('reacts to locale change', () => {
    expect(Comp.find('p.dnb-payment-card__card__holder').text()).toBe(
      nb.text_card_number
    )
    Comp.setProps({
      locale: 'en-GB'
    })
    expect(Comp.find('p.dnb-payment-card__card__holder').text()).toBe(
      en.text_card_number
    )
    Comp.setProps({
      locale: 'nb-NO'
    })
    expect(Comp.find('p.dnb-payment-card__card__holder').text()).toBe(
      nb.text_card_number
    )
  })

  it('reacts raw_data with correact rendering', () => {
    const customData = {
      productCode: 'UNDEFINED',
      productName: 'DNB Custom Card',
      displayName: 'Custom card', // Only showed in compact variant
      cardDesign: Designs.gold,
      cardType: CardType.Visa,
      productType: ProductType.BankAxept
    }

    const Comp = mount(
      <Component
        product_code="UNDEFINED"
        raw_data={customData}
        variant="compact"
        card_number="************1337"
      />
    )

    expect(Comp.find('figcaption').text()).toBe(customData.productName)
    expect(Comp.exists('div.dnb-payment-card__card--design-gold')).toBe(
      true
    )
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('PaymentCard scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-payment-card.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-payment-card-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
