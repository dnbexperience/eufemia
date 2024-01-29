import React, { useContext } from 'react'
import { render, act, screen } from '@testing-library/react'
import At from '../At'
import Provider from '../../Provider'
import Context from '../../Context'

describe('At', () => {
  it('should fetch data from context using provided path', () => {
    const contextData = { a: { b: 'test' } }
    const MockComponent = () => {
      const context = useContext(Context)
      return context.data
    }
    render(
      <Provider data={contextData}>
        <At path="/a/b">
          <MockComponent />
        </At>
      </Provider>
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should handle path changes correctly', () => {
    const contextData = { a: { b: 'test' } }
    let handlePathChange = null

    const MockComponent = () => {
      const context = useContext(Context)
      handlePathChange = context.handlePathChange
      return <output>{JSON.stringify(context.data)}</output>
    }

    render(
      <Provider data={contextData}>
        <At path="/a">
          <MockComponent />
        </At>
      </Provider>
    )

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ b: 'test' })
    )

    act(() => {
      handlePathChange('/c', 'new value')
    })

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ b: 'test', c: 'new value' })
    )
  })

  it('should return null if iterate prop is true and data is not an array', () => {
    const contextData = { a: { b: 'test' } }
    const MockComponent = () => {
      const context = useContext(Context)
      return context.data
    }
    render(
      <Provider data={contextData}>
        <At path="/a/b" iterate>
          <MockComponent />
        </At>
      </Provider>
    )

    expect(screen.queryByText('test')).toBeNull()
  })
})
