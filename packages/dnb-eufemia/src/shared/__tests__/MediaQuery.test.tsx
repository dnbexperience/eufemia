/**
 * MediaQuery Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import MatchMediaMock from 'jest-matchmedia-mock'
import MediaQuery from '../MediaQuery'
import Provider from '../Provider'
import { isMatchMediaSupported as _isMatchMediaSupported } from '../MediaQueryUtils'

const isMatchMediaSupported = _isMatchMediaSupported as jest.Mock

jest.mock('../MediaQueryUtils', () => {
  const orig = jest.requireActual('../MediaQueryUtils')
  return {
    ...orig,
    isMatchMediaSupported: jest.fn(),
  }
})

describe('MediaQuery', () => {
  let matchMedia: MatchMediaMock

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  afterEach(() => {
    matchMedia?.clear()
  })

  afterAll(() => {
    matchMedia?.destroy()
  })

  it('should match for query with medium width', () => {
    matchMedia.useMediaQuery('(min-width: 60em) and (max-width: 72em)')

    const Comp = mount(
      <MediaQuery when={{ min: 'medium', max: 'large' }}>
        medium
      </MediaQuery>
    )
    expect(Comp.text()).toBe('medium')
  })

  it('should match for query when different breakpoints are given', () => {
    matchMedia.useMediaQuery(
      '(min-width: 40em) and (max-width: 80em), (min-width: 0) and (max-width: 30rem), (max-width: 90em)'
    )

    const Comp = mount(
      <Provider
        value={{
          breakpoints: {
            medium: '30rem',
            large: '80rem',
          },
        }}
      >
        <MediaQuery
          when={[
            { min: 'small', max: 'x-large' },
            { min: '0', max: 'medium' },
            { max: 'xx-large' },
          ]}
        >
          medium
        </MediaQuery>
      </Provider>
    )

    expect(Comp.text()).toBe('medium')
  })

  it('should match for query when custom breakpoints are given', () => {
    matchMedia.useMediaQuery(
      '(min-width: 0) and (max-width: 20rem), (max-width: 90rem)'
    )

    const Comp = mount(
      <Provider
        value={{
          breakpoints: {
            xsmall: '20rem',
            wide: '90rem',
          },
        }}
      >
        <MediaQuery when={[{ min: '0', max: 'xsmall' }, { max: 'wide' }]}>
          xsmall
        </MediaQuery>
      </Provider>
    )

    expect(Comp.text()).toBe('xsmall')
  })

  it('should match for query when breakpoint is got removed', () => {
    matchMedia.useMediaQuery(
      '(min-width: 0) and (max-width: 20rem), (min-width: 71rem)'
    )

    const Comp = mount(
      <Provider
        value={{
          breakpoints: {
            xsmall: '20rem',
            large: '71rem',
            'x-large': undefined,
          },
        }}
      >
        <MediaQuery
          when={[
            { min: '0', max: 'xsmall' },
            { min: 'large', max: 'x-large' },
          ]}
        >
          xsmall
        </MediaQuery>
      </Provider>
    )

    expect(Comp.text()).toBe('xsmall')
  })

  it('should match for what ever query is given when matchOnSSR is true', () => {
    isMatchMediaSupported.mockReturnValue(false)

    const Comp = mount(
      <MediaQuery matchOnSSR when={{ min: 'what-every' }}>
        medium
      </MediaQuery>
    )

    expect(Comp.text()).toBe('medium')
  })

  it('should match for query with medium and large width', () => {
    matchMedia.useMediaQuery(
      '(min-width: 60em) and (max-width: 72em), (min-width: 72em) and (max-width: 80em)'
    )

    const Comp = mount(
      <MediaQuery
        when={[
          { min: 'medium', max: 'large' },
          { min: 'large', max: 'x-large' },
        ]}
      >
        medium large
      </MediaQuery>
    )
    expect(Comp.text()).toBe('medium large')
  })

  it('should handle media query changes', () => {
    matchMedia.useMediaQuery(
      'not screen and (min-width: 0) and (max-width: 72em)'
    )

    const Playground = () => {
      const [query, updateQuery] = React.useState({
        screen: true,
        not: true,
        min: '0',
        max: 'large',
      })

      return (
        <>
          <button
            onClick={() => {
              updateQuery({
                ...query,
                screen: !query.screen,
              })
            }}
          >
            Change
          </button>
          <span id="result">
            <MediaQuery matchOnSSR when={query}>
              when
            </MediaQuery>
            <MediaQuery not when={query}>
              not when
            </MediaQuery>
          </span>
        </>
      )
    }

    const Comp = mount(<Playground />)
    expect(Comp.find('#result').text()).toBe('when')

    Comp.simulate('click')
    expect(Comp.find('#result').text()).toBe('not when')

    Comp.simulate('click')
    expect(Comp.find('#result').text()).toBe('when')
  })
})
