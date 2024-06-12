/**
 * PaymentCard Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import PaymentCard, { Designs, formatCardNumber } from '../'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { render, screen } from '@testing-library/react'
import { PaymentCardProps } from '../types'

const nb = nbNO['nb-NO'].PaymentCard
const en = enGB['en-GB'].PaymentCard

const defaultProps: PaymentCardProps = {
  productCode: 'NK1',
  cardNumber: '************1337',
  cardStatus: 'active',
  variant: 'normal',
  digits: 8,
  customCard: null,
  id: 'id',
  skeleton: false,
  className: 'className',
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
    render(<PaymentCard {...defaultProps} cardStatus="expired" />)

    expect(screen.queryByText(nb.text_expired)).toBeInTheDocument()
  })

  it('has correct not_active status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="not_active" />)

    expect(screen.queryByText(nb.text_not_active)).toBeInTheDocument()
  })

  it('has correct renewed status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="renewed" />)

    expect(screen.queryByText(nb.text_renewed)).toBeInTheDocument()
  })

  it('has correct replaced status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="replaced" />)

    expect(screen.queryByText(nb.text_replaced)).toBeInTheDocument()
  })

  it('has correct order_in_process status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="order_in_process" />)

    expect(
      screen.queryByText(nb.text_order_in_process)
    ).toBeInTheDocument()
  })

  it('has correct blocked status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="blocked" />)

    expect(screen.queryByText(nb.text_blocked)).toBeInTheDocument()
  })

  it('has correct unknown status', () => {
    render(<PaymentCard {...defaultProps} cardStatus="unknown" />)

    expect(screen.queryByText(nb.text_unknown)).toBeInTheDocument()
  })

  // it.skip('reacts to locale change', () => {
  //   const { rerender } = render(<PaymentCard {...defaultProps} />)

  //   expect(screen.queryByText(nb.text_card_number)).toBeInTheDocument()

  //   rerender(<PaymentCard {...defaultProps} locale="en-GB" />)
  //   expect(screen.queryByText(en.text_card_number)).toBeInTheDocument()

  //   rerender(<PaymentCard {...defaultProps} locale="nb-NO" />)
  //   expect(screen.queryByText(nb.text_card_number)).toBeInTheDocument()
  // })

  it('reacts cardData with correct rendering', () => {
    const customData = {
      productCode: 'UNDEFINED',
      productName: 'DNB Custom Card',
      displayName: 'Custom card', // Only showed in compact variant
      cardDesign: Designs.gold,
    }

    render(
      <PaymentCard
        productCode="UNDEFINED"
        customCard={customData}
        variant="compact"
        cardNumber="************1337"
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

describe('Helper functions', () => {
  describe('formatCardNumber', () => {
    it('should format card number', () => {
      const result = formatCardNumber('************1337')
      expect(result).toEqual('**** 1337')
    })

    it('should not break when provided with empty string as value', () => {
      const result = formatCardNumber('')
      expect(result).toEqual('')
    })

    it('should not break when provided with null as value', () => {
      const result = formatCardNumber(null)
      expect(result).toEqual(null)
    })

    it('should format card number to a certain length of 8', () => {
      const result = formatCardNumber('************1337', 8)
      expect(result).toEqual('**** 1337')
    })

    it('should format card number to a certain length of 6', () => {
      const result = formatCardNumber('************1337', 6)
      expect(result).toEqual('** 1337')
    })

    it('should format card number to a certain length of 4', () => {
      const result = formatCardNumber('************1337', 4)
      expect(result).toEqual('1337')
    })

    it('should format card number to a certain length of 1', () => {
      const result = formatCardNumber('************1337', 1)
      expect(result).toEqual('7')
    })

    it('should not break when provided with empty string and a digit', () => {
      const result = formatCardNumber('', 8)
      expect(result).toEqual('')
    })

    it('should not break when provided with a null and a digit', () => {
      const result = formatCardNumber(null, 8)
      expect(result).toEqual(null)
    })

    it('should format when digits is same as card number length', () => {
      const result = formatCardNumber('**1337', 6)
      expect(result).toEqual('** 1337')
    })

    it('should format as without digit, when provided with a digit of 0', () => {
      const result = formatCardNumber('************1337', 0)
      expect(result).toEqual('**** **** **** 1337')
    })

    it('should format as without digit, when provided with a digit greater than the characters in card number', () => {
      const result = formatCardNumber('**1337', 8)
      expect(result).toEqual('** 1337')
    })
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
