import { Connectors, PathStrict } from '../..'
import {
  GeneralConfig,
  HandlerConfig,
  fetchData,
  getCountryCodeValue,
  handleCountryPath,
  isSupportedCountryCode,
} from '../createContext'
import { COUNTRY as defaultCountry } from '../../../../shared/defaults'
import { SupportedCountries } from '../Bring/postalCode'

describe('createContext', () => {
  // Mock fetch to avoid making actual network requests
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ key: 'value' }),
    status: 200,
  })

  it('should return a function', () => {
    const { withConfig } = Connectors.createContext()
    expect(typeof withConfig).toBe('function')
  })

  it('should return a function with the given url config', () => {
    const { withConfig } = Connectors.createContext({
      fetchConfig: {
        url: 'https://example.com',
      },
    })

    const mock = jest.fn()
    withConfig(mock)

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(
      {
        fetchConfig: {
          url: 'https://example.com',
        },
      },
      undefined
    )
  })

  it('should return a function with the given headers config', () => {
    const { withConfig } = Connectors.createContext({
      fetchConfig: {
        url: 'https://example.com',
        headers: {
          'X-Mybring-API-Uid': 'Uid',
          'X-Mybring-API-Key': 'Key',
        },
      },
    })

    const mock = jest.fn()
    withConfig(mock)

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(
      {
        fetchConfig: {
          url: 'https://example.com',
          headers: {
            'X-Mybring-API-Uid': 'Uid',
            'X-Mybring-API-Key': 'Key',
          },
        },
      },
      undefined
    )
  })

  it('should provide countryCode given in handler config', async () => {
    const url = jest.fn((value, countryCode) => {
      return `https://example.com/${countryCode}`
    })

    const { withConfig } = Connectors.createContext({
      fetchConfig: {
        url,
      },
    })

    type MyHandlerConfig = HandlerConfig & {
      countryCode?:
        | PathStrict
        | SupportedCountries
        | Lowercase<SupportedCountries>
    }

    const connector = jest.fn(
      (generalConfig: GeneralConfig, handlerConfig?: MyHandlerConfig) => {
        return async () => {
          const parameters = {
            countryCode: String(handlerConfig?.countryCode).toLowerCase(),
          }
          await fetchData('testValue', {
            generalConfig,
            parameters,
          })
        }
      }
    )

    const validator = withConfig(connector, {
      countryCode: 'SE',
    })

    expect(connector).toHaveBeenCalledTimes(1)
    expect(connector).toHaveBeenCalledWith(
      {
        fetchConfig: {
          url: expect.any(Function),
        },
      },
      { countryCode: 'SE' }
    )

    await validator()

    expect(url).toHaveBeenCalledTimes(1)
    expect(url).toHaveBeenCalledWith('testValue', { countryCode: 'se' })
  })
})

describe('additional tests', () => {
  // Mocking default country from defaults if needed.
  const mockDefaultCountry = 'NO'

  it('should fetch data and handle preResponseResolver if provided', async () => {
    const mockPreResponseResolver = jest
      .fn()
      .mockReturnValue({ data: { key: 'preResolvedValue' }, status: 201 })

    const data = await fetchData('testValue', {
      generalConfig: { fetchConfig: { url: 'https://example.com' } },
      preResponseResolver: mockPreResponseResolver,
    })

    expect(mockPreResponseResolver).toHaveBeenCalled()
    expect(data).toEqual({
      data: { key: 'preResolvedValue' },
      status: 201,
    })
  })

  it('should handle default country code in getCountryCodeValue', () => {
    const mockAdditionalArgs = {
      props: {},
      getSourceValue: jest.fn().mockReturnValue(mockDefaultCountry),
    }

    const { countryCode, countryCodeValue } = getCountryCodeValue({
      additionalArgs: mockAdditionalArgs as any,
    })

    expect(countryCode).toBe(mockDefaultCountry)
    expect(countryCodeValue).toBe(defaultCountry)
  })

  it('should add handler on path change in handleCountryPath', () => {
    const handler = jest.fn()
    const mockAdditionalArgs = {
      props: { 'data-country-code': '/SE' },
      getSourceValue: jest.fn(),
      setFieldEventListener: jest.fn(),
    } as any

    handleCountryPath({
      value: 'value',
      additionalArgs: mockAdditionalArgs,
      handler,
    })

    expect(mockAdditionalArgs.setFieldEventListener).toHaveBeenCalledWith(
      '/SE',
      'onPathChange',
      expect.any(Function)
    )
  })

  it('should return countryCode provided in props', () => {
    const handler = jest.fn()
    const mockAdditionalArgs = {
      props: { 'data-country-code': 'SE' },
      getSourceValue: jest.fn(),
      setFieldEventListener: jest.fn(),
    } as any

    const { countryCode } = handleCountryPath({
      value: 'value',
      additionalArgs: mockAdditionalArgs,
      handler,
    })

    expect(countryCode).toBe('SE')
  })

  it('should return countryCode as path provided in props', () => {
    const dataContext = {
      myCountryCode: 'SE',
    }
    const handler = jest.fn()
    const mockAdditionalArgs = {
      props: { 'data-country-code': '/myCountryCode' },
      getSourceValue: jest.fn(() => {
        return dataContext.myCountryCode
      }),
      setFieldEventListener: jest.fn(),
    } as any

    const { countryCode } = handleCountryPath({
      value: 'value',
      additionalArgs: mockAdditionalArgs,
      handler,
    })

    expect(countryCode).toBe(dataContext.myCountryCode)
  })

  it('should return countryCode as path provided in config', () => {
    const handler = jest.fn()
    const mockAdditionalArgs = {
      getSourceValue: jest.fn(),
    } as any

    const { countryCode } = handleCountryPath({
      value: 'value',
      countryCode: 'SE',
      additionalArgs: mockAdditionalArgs,
      handler,
    })

    expect(countryCode).toBe('SE')
  })

  it('should validate supported country codes in isSupportedCountryCode', () => {
    const supportedCountryCodes = ['NO', 'DK', 'SE']
    expect(isSupportedCountryCode('NO', supportedCountryCodes)).toBe(true)
    expect(isSupportedCountryCode('XX', supportedCountryCodes)).toBe(false)
  })
})
