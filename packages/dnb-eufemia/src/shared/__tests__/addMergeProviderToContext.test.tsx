/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { addMergeProviderToContext } from '../addMergeProviderToContext'
import { render } from '@testing-library/react'

describe('addMergeProviderToContext', () => {
  const MergeProviderContext = addMergeProviderToContext(
    React.createContext<{
      required: string
      optional?: string
      number?: number
    }>({
      required: 'default',
    })
  )

  const ContextUser = () => {
    const context = React.useContext(MergeProviderContext)
    return (
      <>
        <div id="test-required">{context.required}</div>
        <div id="test-optional">{context.optional}</div>
        <div id="test-number">{context.number}</div>
      </>
    )
  }
  it('Context should still work as normal and contain default values', () => {
    render(<ContextUser />)
    expect(document.querySelector('#test-required').textContent).toBe(
      'default'
    )
    expect(document.querySelector('#test-optional').textContent).toBe('')
    expect(document.querySelector('#test-number').textContent).toBe('')
  })

  it('Provider should still work as normal and overwrite parent Provider properties', () => {
    render(
      <MergeProviderContext.Provider
        value={{ required: 'one', optional: 'one' }}
      >
        <MergeProviderContext.Provider value={{ required: 'two' }}>
          <ContextUser />
        </MergeProviderContext.Provider>
      </MergeProviderContext.Provider>
    )
    expect(document.querySelector('#test-required').textContent).toBe(
      'two'
    )
    expect(document.querySelector('#test-optional').textContent).toBe('')
  })

  it('MergeProvider should keep parent Provider properties', () => {
    render(
      <MergeProviderContext.Provider
        value={{ required: 'one', optional: 'one' }}
      >
        <MergeProviderContext.MergeProvider value={{ required: 'two' }}>
          <ContextUser />
        </MergeProviderContext.MergeProvider>
      </MergeProviderContext.Provider>
    )
    expect(document.querySelector('#test-required').textContent).toBe(
      'two'
    )
    expect(document.querySelector('#test-optional').textContent).toBe(
      'one'
    )
  })

  it('MergeProvider should make all properties optional', () => {
    render(
      <MergeProviderContext.Provider
        value={{ required: 'one', optional: 'one' }}
      >
        <MergeProviderContext.MergeProvider value={{ optional: 'two' }}>
          <ContextUser />
        </MergeProviderContext.MergeProvider>
      </MergeProviderContext.Provider>
    )
    expect(document.querySelector('#test-required').textContent).toBe(
      'one'
    )
    expect(document.querySelector('#test-optional').textContent).toBe(
      'two'
    )
  })

  it('MergeProvider can add new properties', () => {
    render(
      <MergeProviderContext.Provider
        value={{ required: 'one', optional: 'one' }}
      >
        <MergeProviderContext.MergeProvider value={{ number: 2 }}>
          <ContextUser />
        </MergeProviderContext.MergeProvider>
      </MergeProviderContext.Provider>
    )
    expect(document.querySelector('#test-required').textContent).toBe(
      'one'
    )
    expect(document.querySelector('#test-optional').textContent).toBe(
      'one'
    )
    expect(document.querySelector('#test-number').textContent).toBe('2')
  })

  it('MergeProvider can be nested', () => {
    render(
      <MergeProviderContext.Provider
        value={{ required: 'one', optional: 'one' }}
      >
        <MergeProviderContext.MergeProvider
          value={{ optional: 'two', number: 2 }}
        >
          <MergeProviderContext.MergeProvider value={{ number: 3 }}>
            <ContextUser />
          </MergeProviderContext.MergeProvider>
        </MergeProviderContext.MergeProvider>
      </MergeProviderContext.Provider>
    )
    expect(document.querySelector('#test-required').textContent).toBe(
      'one'
    )
    expect(document.querySelector('#test-optional').textContent).toBe(
      'two'
    )
    expect(document.querySelector('#test-number').textContent).toBe('3')
  })
})
