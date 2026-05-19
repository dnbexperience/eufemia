import { describe, expect, it } from 'vitest'
import { getPageResetStrategyFromMutation } from '../pageResetStrategy'

describe('getPageResetStrategyFromMutation', () => {
  it('forces a fresh navigation on retries', () => {
    expect(
      getPageResetStrategyFromMutation({
        currentRetry: 1,
        mutationKind: 'none',
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
      })
    ).toBe('navigate')
  })

  it('reloads when the URL matches and the previous test was structural', () => {
    expect(
      getPageResetStrategyFromMutation({
        currentRetry: 0,
        mutationKind: 'structural',
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
      })
    ).toBe('reload')
  })

  it('navigates when the URL differs and the previous test was structural', () => {
    expect(
      getPageResetStrategyFromMutation({
        currentRetry: 0,
        mutationKind: 'structural',
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/dialog/demos/',
      })
    ).toBe('navigate')
  })

  it('does nothing when mutation kind is none', () => {
    expect(
      getPageResetStrategyFromMutation({
        currentRetry: 0,
        mutationKind: 'none',
        targetUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
        currentNavigatedUrl:
          'http://localhost:8000/uilib/components/accordion/demos/',
      })
    ).toBe('none')
  })
})
