/**
 * PaymentCard Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import type { PaymentCardProps } from '../PaymentCard'
import PaymentCard, {
  Designs,
  ProductType,
  CardType,
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
  productCode: 'NK1',
  cardNumber: '************1337',
  cardStatus: 'active',
  variant: 'normal',
  digits: 'digits',
  rawData: null,
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
      render(<PaymentCard {...englishProps} cardStatus="expired" />)

      expect(screen.queryByText(en.textExpired)).toBeInTheDocument()
    })

    it('has correct notActive status', () => {
      render(<PaymentCard {...englishProps} cardStatus="notActive" />)

      expect(screen.queryByText(en.textNotActive)).toBeInTheDocument()
    })

    it('has correct renewed status', () => {
      render(<PaymentCard {...englishProps} cardStatus="renewed" />)

      expect(screen.queryByText(en.textRenewed)).toBeInTheDocument()
    })

    it('has correct replaced status', () => {
      render(<PaymentCard {...englishProps} cardStatus="replaced" />)

      expect(screen.queryByText(en.textReplaced)).toBeInTheDocument()
    })

    it('has correct orderInProcess status', () => {
      render(<PaymentCard {...englishProps} cardStatus="orderInProcess" />)

      expect(screen.queryByText(en.textOrderInProcess)).toBeInTheDocument()
    })

    it('has correct blocked status', () => {
      render(<PaymentCard {...englishProps} cardStatus="blocked" />)

      expect(screen.queryByText(en.textBlocked)).toBeInTheDocument()
    })

    it('has correct unknown status', () => {
      render(<PaymentCard {...englishProps} cardStatus="unknown" />)

      expect(screen.queryByText(en.textUnknown)).toBeInTheDocument()
    })
  })

  describe('Norwegian locale', () => {
    it('has correct expired status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="expired" />)

      expect(screen.queryByText(nb.textExpired)).toBeInTheDocument()
    })

    it('has correct notActive status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="notActive" />)

      expect(screen.queryByText(nb.textNotActive)).toBeInTheDocument()
    })

    it('has correct renewed status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="renewed" />)

      expect(screen.queryByText(nb.textRenewed)).toBeInTheDocument()
    })

    it('has correct replaced status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="replaced" />)

      expect(screen.queryByText(nb.textReplaced)).toBeInTheDocument()
    })

    it('has correct orderInProcess status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="orderInProcess" />)

      expect(screen.queryByText(nb.textOrderInProcess)).toBeInTheDocument()
    })

    it('has correct blocked status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="blocked" />)

      expect(screen.queryByText(nb.textBlocked)).toBeInTheDocument()
    })

    it('has correct unknown status', () => {
      render(<PaymentCard {...defaultProps} cardStatus="unknown" />)

      expect(screen.queryByText(nb.textUnknown)).toBeInTheDocument()
    })
  })

  it('reacts rawData with correct rendering', () => {
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
        productCode="UNDEFINED"
        rawData={customData}
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

  it('has correct card type text (debit)', () => {
    render(<PaymentCard {...englishProps} />)

    expect(screen.queryByText('Debit')).toBeInTheDocument()
  })

  it('has correct card type text (credit)', () => {
    render(<PaymentCard {...englishProps} productCode="043" />)

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

  it('should override textExpired', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textExpired: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="expired" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textBlocked', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textBlocked: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="blocked" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textNotActive', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textNotActive: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="notActive" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textOrderInProcess', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textOrderInProcess: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="orderInProcess" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textRenewed', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textRenewed: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="renewed" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textReplaced', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textReplaced: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="replaced" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textUnknown', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textUnknown: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="unknown" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textNew', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textNew: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="new" />
      </Provider>
    )

    expect(screen.queryByText(customText)).toBeInTheDocument()
  })

  it('should override textNewOrder', () => {
    render(
      <Provider
        locale="nb-NO"
        translations={{
          'nb-NO': {
            PaymentCard: { textNewOrder: customText },
          },
        }}
      >
        <PaymentCard {...defaultProps} cardStatus="newOrder" />
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
