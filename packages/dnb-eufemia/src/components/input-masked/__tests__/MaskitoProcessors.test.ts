import { createNumberFormattingProcessor } from '../MaskitoProcessors'

describe('MaskitoProcessors', () => {
  it('should format numbers with thousands separator', () => {
    const processor = createNumberFormattingProcessor({
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: ' ',
      allowDecimal: true,
      decimalSymbol: ',',
      decimalLimit: 2,
    })

    const elementState = {
      value: '1234,56', // Use comma as decimal separator
      selection: [0, 0] as const,
    }

    const initialElementState = {
      value: '',
      selection: [0, 0] as const,
    }

    const result = processor(elementState, initialElementState)

    expect(result.value).toBe('1 234,56')
  })

  it('should format currency with prefix and suffix', () => {
    const processor = createNumberFormattingProcessor({
      prefix: 'NOK ',
      suffix: ' kr',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: ' ',
      allowDecimal: true,
      decimalSymbol: ',',
      decimalLimit: 2,
    })

    const elementState = {
      value: '1234,56', // Use comma as decimal separator
      selection: [0, 0] as const,
    }

    const initialElementState = {
      value: '',
      selection: [0, 0] as const,
    }

    const result = processor(elementState, initialElementState)

    expect(result.value).toBe('NOK 1 234,56 kr')
  })
})
