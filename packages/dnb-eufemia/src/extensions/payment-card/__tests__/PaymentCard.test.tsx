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
import { formatCardNumber } from '../components/CardNumber'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { render, screen } from '@testing-library/react'
import { Provider } from '../../../shared'

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
  locale: 'nb-NO',
  skeleton: 'skeleton',
  class: 'class',
  className: 'className',
  children: 'children',
}

const englishProps: PaymentCardProps = {
  ...defaultProps,
  locale: 'en-GB',
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

  describe('English locale', () => {
    it('has correct expired status', () => {
      render(<PaymentCard {...englishProps} card_status="expired" />)

      expect(screen.queryByText(en.text_expired)).toBeInTheDocument()
    })

    it('has correct not_active status', () => {
      render(<PaymentCard {...englishProps} card_status="not_active" />)

      expect(screen.queryByText(en.text_not_active)).toBeInTheDocument()
    })

    it('has correct renewed status', () => {
      render(<PaymentCard {...englishProps} card_status="renewed" />)

      expect(screen.queryByText(en.text_renewed)).toBeInTheDocument()
    })

    it('has correct replaced status', () => {
      render(<PaymentCard {...englishProps} card_status="replaced" />)

      expect(screen.queryByText(en.text_replaced)).toBeInTheDocument()
    })

    it('has correct order_in_process status', () => {
      render(
        <PaymentCard {...englishProps} card_status="order_in_process" />
      )

      expect(
        screen.queryByText(en.text_order_in_process)
      ).toBeInTheDocument()
    })

    it('has correct blocked status', () => {
      render(<PaymentCard {...englishProps} card_status="blocked" />)

      expect(screen.queryByText(en.text_blocked)).toBeInTheDocument()
    })

    it('has correct unknown status', () => {
      render(<PaymentCard {...englishProps} card_status="unknown" />)

      expect(screen.queryByText(en.text_unknown)).toBeInTheDocument()
    })
  })

  describe('Norwegian locale', () => {
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

    it('has correct unknown status', () => {
      render(<PaymentCard {...defaultProps} card_status="unknown" />)

      expect(screen.queryByText(nb.text_unknown)).toBeInTheDocument()
    })
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

  it('has correct card type text (debit)', () => {
    render(<PaymentCard {...englishProps} />)

    expect(screen.queryByText('Debit')).toBeInTheDocument()
  })

  it('has correct card type text (credit)', () => {
    render(<PaymentCard {...englishProps} product_code="043" />)

    expect(screen.queryByText('Credit')).toBeInTheDocument()
  })
})

describe('Helper functions', () => {
  describe('formatCardNumber', () => {
    it('should format card number', () => {
      const result = formatCardNumber('************1337', 8)
      expect(result).toEqual('**** 1337')
    })

    it('should not break when provided with empty string as value', () => {
      const result = formatCardNumber('', 8)
      expect(result).toEqual('')
    })

    it('should not break when provided with null as value', () => {
      const result = formatCardNumber(null, 8)
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

describe('PaymentCard translations', () => {
  const customText = 'MySpecialText'

  /** @deprecated – can be removed in v11 */
  it('should not break when setting text_card_number', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_card_number: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} />
      </Provider>
    )

    expect(document.querySelector('.dnb-payment-card')).toBeInTheDocument()
  })

  it('should override text_expired', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_expired: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="expired" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_blocked', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_blocked: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="blocked" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_not_active', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_not_active: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="not_active" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_order_in_process', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_order_in_process: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="order_in_process" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_renewed', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_renewed: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="renewed" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_replaced', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_replaced: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="replaced" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_unknown', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_unknown: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="unknown" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_new', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_new: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="new" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override text_new_order', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { text_new_order: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} card_status="new_order" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
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
