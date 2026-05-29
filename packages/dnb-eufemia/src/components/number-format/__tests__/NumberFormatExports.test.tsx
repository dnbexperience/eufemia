/**
 * Tests for NumberFormat named export from index
 *
 * Verifies that sub-components are accessible via dot notation
 * when importing NumberFormat as a named export.
 */

import { render } from '@testing-library/react'

// Import via the barrel file (same as `import NumberFormat from '@dnb/eufemia/components/NumberFormat'`)
import NumberFormat from '../../NumberFormat'

// Import via the main index (same as `import { NumberFormat } from '@dnb/eufemia'`)
import { NumberFormat as NumberFormatFromIndex } from '../../../index'

describe('NumberFormat exports', () => {
  it('should have BankAccountNumber sub-component via barrel import', () => {
    expect(NumberFormat.BankAccountNumber).toBeDefined()
    expect(typeof NumberFormat.BankAccountNumber).toBe('function')
  })

  it('should have all sub-components via barrel import', () => {
    expect(NumberFormat.Number).toBeDefined()
    expect(NumberFormat.Currency).toBeDefined()
    expect(NumberFormat.Percent).toBeDefined()
    expect(NumberFormat.PhoneNumber).toBeDefined()
    expect(NumberFormat.BankAccountNumber).toBeDefined()
    expect(NumberFormat.NationalIdentityNumber).toBeDefined()
    expect(NumberFormat.OrganizationNumber).toBeDefined()
  })

  it('should have BankAccountNumber sub-component via index import', () => {
    expect(NumberFormatFromIndex.BankAccountNumber).toBeDefined()
    expect(typeof NumberFormatFromIndex.BankAccountNumber).toBe('function')
  })

  it('should have all sub-components via index import', () => {
    expect(NumberFormatFromIndex.Number).toBeDefined()
    expect(NumberFormatFromIndex.Currency).toBeDefined()
    expect(NumberFormatFromIndex.Percent).toBeDefined()
    expect(NumberFormatFromIndex.PhoneNumber).toBeDefined()
    expect(NumberFormatFromIndex.BankAccountNumber).toBeDefined()
    expect(NumberFormatFromIndex.NationalIdentityNumber).toBeDefined()
    expect(NumberFormatFromIndex.OrganizationNumber).toBeDefined()
  })

  it('should render NumberFormat.BankAccountNumber from index import', () => {
    render(
      <NumberFormatFromIndex.BankAccountNumber value="20001234567" />
    )

    const element = document.querySelector('.dnb-number-format')
    expect(element).toBeTruthy()
  })
})
