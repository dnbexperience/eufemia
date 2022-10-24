/**
 * MediaQuery Tests
 *
 */

import {
  convertToMediaQuery,
  buildQuery,
  onMediaQueryChange,
  makeMediaQueryList,
} from '../MediaQueryUtils'
import * as helpers from '../helpers'
import { mockMediaQuery } from './helpers/MediaQueryMocker'
const matchMedia = mockMediaQuery()

describe('onMediaQueryChange', () => {
  it('should emit callback when give media query matches', () => {
    const callback = jest.fn()
    onMediaQueryChange({ min: 'small' }, callback)

    matchMedia.useMediaQuery('(min-width: 40em)')
    expect(callback).toHaveBeenCalledTimes(1)

    matchMedia.useMediaQuery('(min-width: 50em)')
    expect(callback).toHaveBeenCalledTimes(1)

    matchMedia.useMediaQuery('(min-width: 40em)')
    expect(callback).toHaveBeenCalledTimes(2)

    expect(callback).toHaveBeenLastCalledWith(true, {
      matches: true,
      media: '(min-width: 40em)',
    })
  })

  it('should accept a "when" property', () => {
    const callback = jest.fn()
    onMediaQueryChange({ when: { min: 'small' } }, callback)

    matchMedia.useMediaQuery('(min-width: 40em)')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should emit callbeck on init', () => {
    const callback = jest.fn()
    onMediaQueryChange({ min: 'large' }, callback, {
      runOnInit: true,
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      false,
      expect.objectContaining({
        matches: false,
      })
    )

    matchMedia.useMediaQuery('(min-width: 60em)')
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        matches: true,
      })
    )
  })

  it('should emit callback on invalid query when "not" was given', () => {
    const callback = jest.fn()
    onMediaQueryChange({ not: true, when: { min: 'small' } }, callback)

    matchMedia.useMediaQuery('not all and (min-width: 40em)')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should accept a string query', () => {
    const callback = jest.fn()
    onMediaQueryChange('(min-width: 40em)', callback)

    matchMedia.useMediaQuery('(min-width: 40em)')
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

describe('buildQuery', () => {
  it('should return query string for media type', () => {
    expect(buildQuery({ when: { screen: true } })).toBe('screen')
  })

  it('should return query string for media type with not', () => {
    expect(buildQuery({ when: { handheld: false } })).toBe('not handheld')
  })

  it('should return query string for media type with orientation', () => {
    expect(buildQuery({ when: { orientation: 'landscape' } })).toBe(
      '(orientation: landscape)'
    )
  })

  it('should return query string for media features', () => {
    expect(buildQuery({ when: { minWidth: 10, maxWidth: 20 } })).toBe(
      '(min-width: 10em) and (max-width: 20em)'
    )
  })

  it('should return same query when given as a string', () => {
    const query = '(min-width: 10em) and (max-width: 20em)'
    expect(buildQuery({ query })).toBe(query)
  })

  it('should return query string for media type and media features', () => {
    expect(
      buildQuery({
        when: {
          screen: true,
          minWidth: 10,
          maxWidth: 20,
        },
      })
    ).toBe('screen and (min-width: 10em) and (max-width: 20em)')
  })

  it('should return query string by given breakpoint type', () => {
    expect(
      buildQuery({
        when: {
          minWidth: 'small',
          maxWidth: 'large',
        },
      })
    ).toBe('(min-width: 40em) and (max-width: 60em)')
  })

  it('should return query string by given but shorten breakpoint type', () => {
    expect(
      buildQuery({
        when: {
          min: 'small',
          max: 'large',
        },
      })
    ).toBe('(min-width: 40em) and (max-width: 60em)')
  })

  it('should return reversed query string by given but shorten breakpoint type', () => {
    expect(
      buildQuery({
        when: {
          not: true,
          min: 'small',
          max: 'large',
        },
      })
    ).toBe('not all and (min-width: 40em) and (max-width: 60em)')
  })

  it('should return reversed query string by given but shorten breakpoint type', () => {
    expect(
      buildQuery({
        when: {
          not: true,
          min: 'small',
          max: 'large',
        },
      })
    ).toBe('not all and (min-width: 40em) and (max-width: 60em)')
  })

  it('should return not change the min value to zero if only a small min property was given', () => {
    expect(
      buildQuery({
        when: {
          min: 'small',
        },
      })
    ).toBe('(min-width: 40em)')

    expect(
      buildQuery({
        when: {
          minWidth: 'small',
        },
      })
    ).toBe('(min-width: 40em)')
  })

  it('should return valid query when numeric values are given to min and max', () => {
    expect(
      buildQuery({
        when: {
          min: 10,
          max: '60em',
        },
      })
    ).toBe('(min-width: 10em) and (max-width: 60em)')
  })

  it('should return not reversed query string by providing reversed twice', () => {
    expect(
      buildQuery({
        not: true,
        when: {
          not: true,
          min: 'small',
          max: 'large',
        },
      })
    ).toBe('all and (min-width: 40em) and (max-width: 60em)')
  })

  it('should return reversed query string', () => {
    expect(
      buildQuery({
        not: true,
        when: {
          min: 'small',
          max: 'large',
        },
      })
    ).toBe('not all and (min-width: 40em) and (max-width: 60em)')
  })

  it('should return query string based on types given as an array', () => {
    expect(
      buildQuery({
        when: [{ max: 'small' }, { min: 'large', max: 'x-large' }],
      })
    ).toBe('(max-width: 40em), (min-width: 60em) and (max-width: 72em)')
  })

  it('should return query string based on types given as a string', () => {
    expect(
      buildQuery({
        when: [{ max: 'small' }, { min: 'x-large', max: 'xx-large' }],
      })
    ).toBe('(max-width: 40em), (min-width: 72em) and (max-width: 80em)')
  })

  it('should return comma seperated query string for multiple media queries', () => {
    expect(
      buildQuery({
        when: [
          { minWidth: 10 },
          { handheld: true, orientation: 'landscape' },
        ],
      })
    ).toBe('(min-width: 10em), handheld and (orientation: landscape)')
  })

  it('should only return feature if its value is true', () => {
    expect(buildQuery({ when: { all: true, monochrome: true } })).toBe(
      'all and monochrome'
    )
  })
})

describe('makeMediaQueryList', () => {
  let log = global.console.log

  beforeEach(() => {
    log = global.console.log
    global.console.log = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()

    global.console.log = log
  })

  it('should return mediaQuery object', () => {
    const query = '(min-width: 40em)'
    matchMedia.useMediaQuery(query)

    expect(makeMediaQueryList({ query })).toEqual({
      matches: true,
      media: query,
      addEventListener: expect.any(Function),
      removeEventListener: expect.any(Function),
      addListener: expect.any(Function),
      removeListener: expect.any(Function),
      dispatchEvent: expect.any(Function),
      onchange: null,
    })
  })

  it('should warn when no mediaQuery is supported', () => {
    const query = '(min-width: 40em)'
    matchMedia.useMediaQuery(query)

    jest.spyOn(helpers, 'warn')

    window.matchMedia = undefined

    expect(makeMediaQueryList({ query })).toEqual(null)

    expect(helpers.warn).toHaveBeenCalledTimes(1)
    expect(helpers.warn).toHaveBeenCalledWith(
      'window.matchMedia is "undefined"'
    )
  })

  it('should dismiss warning', () => {
    const query = '(min-width: 40em)'
    matchMedia.useMediaQuery(query)

    jest.spyOn(helpers, 'warn')

    window.matchMedia = undefined

    expect(makeMediaQueryList({ query, dismissWarning: true })).toEqual(
      null
    )

    expect(helpers.warn).toHaveBeenCalledTimes(0)
  })
})

describe('convertToMediaQuery', () => {
  it('should return query string for media type', () => {
    expect(convertToMediaQuery({ screen: true })).toBe('screen')
  })

  it('should return query string for media type with not', () => {
    expect(convertToMediaQuery({ handheld: false })).toBe('not handheld')
  })

  it('should return query string for media type with orientation', () => {
    expect(convertToMediaQuery({ orientation: 'landscape' })).toBe(
      '(orientation: landscape)'
    )
  })

  it('should return query string for media features', () => {
    expect(convertToMediaQuery({ minWidth: 10, maxWidth: 20 })).toBe(
      '(min-width: 10em) and (max-width: 20em)'
    )
  })

  it('should return query string for media type and media features', () => {
    expect(
      convertToMediaQuery({
        screen: true,
        minWidth: 10,
        maxWidth: 20,
      })
    ).toBe('screen and (min-width: 10em) and (max-width: 20em)')
  })

  it('should return query string by given breakpoint type', () => {
    expect(
      convertToMediaQuery({
        minWidth: 'small',
        maxWidth: 'large',
      })
    ).toBe('(min-width: 40em) and (max-width: 60em)')
  })

  it('should return query string by given but shorten breakpoint type', () => {
    expect(
      convertToMediaQuery({
        min: 'small',
        max: 'large',
      })
    ).toBe('(min-width: 40em) and (max-width: 60em)')
  })

  it('should return reversed query string by given but shorten breakpoint type', () => {
    expect(
      convertToMediaQuery({
        not: true,
        min: 'small',
        max: 'large',
      })
    ).toBe('not all and (min-width: 40em) and (max-width: 60em)')
  })

  it('should add em unit to dimension features', () => {
    expect(
      convertToMediaQuery({
        minWidth: 10,
        aspectRatio: '3/4',
      })
    ).toBe('(min-width: 10em) and (aspect-ratio: 3/4)')
  })

  it('should accept other units for dimension features if passed as string', () => {
    expect(
      convertToMediaQuery({
        minWidth: '10em',
        aspectRatio: '3/4',
      })
    ).toBe('(min-width: 10em) and (aspect-ratio: 3/4)')
  })

  it('should return comma seperated query string for multiple media queries', () => {
    expect(
      convertToMediaQuery([
        { minWidth: 10 },
        { handheld: true, orientation: 'landscape' },
      ])
    ).toBe('(min-width: 10em), handheld and (orientation: landscape)')
  })

  it('should only return feature if its value is true', () => {
    expect(convertToMediaQuery({ all: true, monochrome: true })).toBe(
      'all and monochrome'
    )
  })
})
