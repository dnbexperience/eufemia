import detectCountryCode from '../detectCountryCode'
import countryCodes from '../constants/countryCodes'
import countries from '../../extensions/forms/constants/countries'

describe('countryCodes', () => {
  it('should contain the same CDC values as countries', () => {
    const fromCountries = Array.from(
      new Set(countries.map((c) => c.cdc)),
    ).sort()
    const fromCountryCodes = Array.from(new Set([...countryCodes])).sort()

    expect(fromCountryCodes).toEqual(fromCountries)
  })
})

describe('detectCountryCode', () => {
  it('should detect +47 (Norway)', () => {
    expect(detectCountryCode('+4712345678')).toEqual({
      countryCode: '+47',
      phoneNumber: '12345678',
    })
  })

  it('should detect +46 (Sweden)', () => {
    expect(detectCountryCode('+46701234567')).toEqual({
      countryCode: '+46',
      phoneNumber: '701234567',
    })
  })

  it('should detect +45 (Denmark)', () => {
    expect(detectCountryCode('+4512345678')).toEqual({
      countryCode: '+45',
      phoneNumber: '12345678',
    })
  })

  it('should detect +44 (United Kingdom)', () => {
    expect(detectCountryCode('+447911123456')).toEqual({
      countryCode: '+44',
      phoneNumber: '7911123456',
    })
  })

  it('should detect +1 (USA/Canada)', () => {
    expect(detectCountryCode('+12025551234')).toEqual({
      countryCode: '+1',
      phoneNumber: '2025551234',
    })
  })

  it('should detect +49 (Germany)', () => {
    expect(detectCountryCode('+4930123456')).toEqual({
      countryCode: '+49',
      phoneNumber: '30123456',
    })
  })

  it('should detect +33 (France)', () => {
    expect(detectCountryCode('+33612345678')).toEqual({
      countryCode: '+33',
      phoneNumber: '612345678',
    })
  })

  it('should detect +91 (India)', () => {
    expect(detectCountryCode('+919876543210')).toEqual({
      countryCode: '+91',
      phoneNumber: '9876543210',
    })
  })

  it('should detect +86 (China)', () => {
    expect(detectCountryCode('+8613912345678')).toEqual({
      countryCode: '+86',
      phoneNumber: '13912345678',
    })
  })

  it('should detect +7 (Russia)', () => {
    expect(detectCountryCode('+79161234567')).toEqual({
      countryCode: '+7',
      phoneNumber: '9161234567',
    })
  })

  it('should detect 3-digit code +354 (Iceland)', () => {
    expect(detectCountryCode('+3541234567')).toEqual({
      countryCode: '+354',
      phoneNumber: '1234567',
    })
  })

  it('should detect 3-digit code +358 (Finland)', () => {
    expect(detectCountryCode('+358501234567')).toEqual({
      countryCode: '+358',
      phoneNumber: '501234567',
    })
  })

  it('should prefer NANP sub-code +1-684 (American Samoa) over +1', () => {
    expect(detectCountryCode('+16841234567')).toEqual({
      countryCode: '+1-684',
      phoneNumber: '1234567',
    })
  })

  it('should prefer UK Crown Dependency +44-1481 (Guernsey) over +44', () => {
    expect(detectCountryCode('+441481123456')).toEqual({
      countryCode: '+44-1481',
      phoneNumber: '123456',
    })
  })

  it('should return undefined for value without + prefix', () => {
    expect(detectCountryCode('4712345678')).toBeUndefined()
  })

  describe('00 prefix normalization', () => {
    it('should detect 0047 as +47 (Norway)', () => {
      expect(detectCountryCode('004712345678')).toEqual({
        countryCode: '+47',
        phoneNumber: '12345678',
      })
    })

    it('should detect 0046 as +46 (Sweden)', () => {
      expect(detectCountryCode('0046701234567')).toEqual({
        countryCode: '+46',
        phoneNumber: '701234567',
      })
    })

    it('should detect 001 as +1 (USA)', () => {
      expect(detectCountryCode('0012025551234')).toEqual({
        countryCode: '+1',
        phoneNumber: '2025551234',
      })
    })

    it('should detect 00358 as +358 (Finland)', () => {
      expect(detectCountryCode('00358501234567')).toEqual({
        countryCode: '+358',
        phoneNumber: '501234567',
      })
    })

    it('should return undefined for just "00"', () => {
      expect(detectCountryCode('00')).toBeUndefined()
    })

    it('should return undefined for short 00 values like "007"', () => {
      expect(detectCountryCode('007')).toBeUndefined()
      expect(detectCountryCode('008')).toBeUndefined()
      expect(detectCountryCode('0044')).toBeUndefined()
    })

    it('should return undefined for 00 + country code with no subscriber number', () => {
      expect(detectCountryCode('0047')).toBeUndefined()
      expect(detectCountryCode('001')).toBeUndefined()
      expect(detectCountryCode('00354')).toBeUndefined()
    })

    it('should return undefined for 00 followed by unknown code', () => {
      expect(detectCountryCode('0099912345')).toBeUndefined()
    })
  })

  it('should return undefined for non-string value', () => {
    expect(
      detectCountryCode(undefined as unknown as string),
    ).toBeUndefined()
    expect(detectCountryCode(null as unknown as string)).toBeUndefined()
    expect(detectCountryCode(12345 as unknown as string)).toBeUndefined()
  })

  it('should return undefined when value is just a country code with no phone number', () => {
    expect(detectCountryCode('+47')).toBeUndefined()
    expect(detectCountryCode('+1')).toBeUndefined()
    expect(detectCountryCode('+354')).toBeUndefined()
  })

  it('should return undefined for unknown code', () => {
    expect(detectCountryCode('+99912345')).toBeUndefined()
  })

  it('should return undefined for empty string', () => {
    expect(detectCountryCode('')).toBeUndefined()
  })

  it('should return undefined for just "+"', () => {
    expect(detectCountryCode('+')).toBeUndefined()
  })

  it('should detect short phone numbers', () => {
    expect(detectCountryCode('+470')).toEqual({
      countryCode: '+47',
      phoneNumber: '0',
    })
  })
})
