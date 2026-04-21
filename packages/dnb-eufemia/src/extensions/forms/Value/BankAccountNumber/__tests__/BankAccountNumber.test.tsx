import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.BankAccountNumber', () => {
  it('renders value', () => {
    render(<Value.BankAccountNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.BankAccountNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.BankAccountNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.BankAccountNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.BankAccountNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.BankAccountNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.BankAccountNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '20001234567' }}>
        <Value.BankAccountNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
  })

  it('does not render when value is null', () => {
    render(<Value.BankAccountNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('does not render when value is undefined', () => {
    render(<Value.BankAccountNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  describe('bankAccountType prop', () => {
    it('renders Norwegian BBAN by default', () => {
      render(<Value.BankAccountNumber value="20001234567" />)
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('2000 12 34567')
    })

    it('renders IBAN formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('NO93 8601 1117 947')
    })

    it('renders Swedish BBAN formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishBban"
          value="50001234567"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('5000-1234567')
    })

    it('renders Swedish Bankgiro formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="59140129"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('5914-0129')
    })

    it('renders 7-digit Swedish Bankgiro formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="5914012"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('591-4012')
    })

    it('renders Swedish Plusgiro formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="1263664"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('126366-4')
    })

    it('renders 8-digit Swedish Plusgiro formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="12636641"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('1263664-1')
    })

    it('renders 2-digit Swedish Plusgiro formatted value', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="12"
        />
      )
      expect(
        document.querySelector(
          '.dnb-forms-value-string .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('1-2')
    })
  })

  describe('labels per bankAccountType', () => {
    it('uses default label for norwegianBban', () => {
      render(<Value.BankAccountNumber value="20001234567" />)

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        nb.BankAccountNumber.label
      )
    })

    it('uses IBAN label for iban type', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
        />
      )

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        nb.BankAccountNumber.labelIban
      )
    })

    it('uses Swedish account number label for swedishBban type', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishBban"
          value="50001234567"
        />
      )

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishBban
      )
    })

    it('uses Bankgiro label for swedishBankgiro type', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="59140129"
        />
      )

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishBankgiro
      )
    })

    it('uses Plusgiro label for swedishPlusgiro type', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="1263664"
        />
      )

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishPlusgiro
      )
    })

    it('allows overriding label via prop', () => {
      render(
        <Value.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
          label="Custom label"
        />
      )

      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Custom label'
      )
    })
  })
})
