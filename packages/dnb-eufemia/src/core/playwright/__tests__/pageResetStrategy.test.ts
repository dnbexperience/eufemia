import { describe, expect, it } from 'vitest'
import { getPageResetStrategy } from '../pageResetStrategy'

describe('getPageResetStrategy', () => {
  it('forces a fresh navigation on retries', () => {
    expect(
      getPageResetStrategy({
        currentRetry: 1,
        needsHardReset: false,
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
      })
    ).toBe('navigate')
  })

  it('reloads when the configured URL matches the cached URL after a hard reset request', () => {
    expect(
      getPageResetStrategy({
        currentRetry: 0,
        needsHardReset: true,
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
      })
    ).toBe('reload')
  })

  it('navigates when the cached URL differs after a hard reset request', () => {
    expect(
      getPageResetStrategy({
        currentRetry: 0,
        needsHardReset: true,
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/dialog/demos/',
      })
    ).toBe('navigate')
  })
})
