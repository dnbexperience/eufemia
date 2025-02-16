import { Connectors } from '../..'

describe('createContext', () => {
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
})
