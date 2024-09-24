import { isTrue, toKebabCase } from './component-helper'
import { warn } from './helpers'

export type MediaQuerySizes =
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
export type MediaQueryBreakpoints = Partial<
  Record<MediaQuerySizes, string>
>

export const defaultBreakpoints: MediaQueryBreakpoints = {
  small: '40em',
  medium: '60em',
  large: '72em',
  'x-large': '80em',
  'xx-large': '90em',
}

export type MediaQueryCondition =
  | {
      min?: number | string | MediaQuerySizes
      max?: number | string | MediaQuerySizes
      screen?: boolean
      minWidth?: number | string | MediaQuerySizes
      maxWidth?: number | string | MediaQuerySizes
      orientation?: string
      not?: boolean
      all?: boolean
      monochrome?: boolean
      aspectRatio?: string
    }
  | string

export type MediaQueryProperties = {
  /**
   * A MediaQuery as a string similar to the CSS API, but without `@media`.
   */
  query?: MediaQueryCondition

  /**
   * Define a list of sizes to match, given as an object `{ min: 'small', max: 'medium' }` or as an array `[{ min: 'small', max: 'medium' }, { min: 'medium', max: 'large' }]`.
   */
  when?: MediaQueryCondition | Array<MediaQueryCondition>

  /**
   * Reverts the defined queries as a whole.
   */
  not?: boolean
} & MediaQueryCondition

export type MediaQueryOptions = {
  /**
   * If set to true, no MediaQuery will be used.
   */
  disabled?: boolean

  /**
   * Will correct the size of the media query ranges (e.g. medium will be from 40.0625em to 60em)
   * Default: true
   */
  correctRange?: boolean

  /**
   * For debugging
   */
  log?: boolean
}

export type MediaQueryListener = () => void

export type MediaQueryProps = {
  /**
   * If set to true, it will match and return the given children during SSR.
   */
  matchOnSSR?: boolean

  children?: React.ReactNode
} & MediaQueryProperties &
  MediaQueryOptions

export type MediaQueryState = {
  match?: boolean | null
  mediaQueryList?: { matches: boolean }
}

/**
 * Adds a listener to a given MediaQuery
 */
export function onMediaQueryChange(
  property: MediaQueryProperties | string,
  callback?: (matches: boolean, mediaQueryList: MediaQueryList) => void,
  { runOnInit = false } = {}
): MediaQueryListener {
  let query = property
  let when = null
  let not = null

  if (property && typeof property === 'object') {
    query = null
    when = property.when || property
    not = property.not
  }

  const mediaQueryList = makeMediaQueryList({ query, when, not })

  if (runOnInit) {
    if (typeof callback === 'function') {
      callback(mediaQueryList?.matches, mediaQueryList)
    }
  }

  return createMediaQueryListener(mediaQueryList, callback)
}

/**
 * Returns a boolean for whether window.matchMedia is supported or not
 */
export const isMatchMediaSupported = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'

/**
 * Convert user defined media queries to an valid MediaQueryList we can assign a listener to
 */
export function makeMediaQueryList(
  { query, when, not = null }: MediaQueryProperties = {},
  breakpoints: MediaQueryBreakpoints = null,
  options?: MediaQueryOptions
): MediaQueryList {
  const isSupported = isMatchMediaSupported()

  if (options?.disabled || !isSupported) {
    return null
  }

  if (when) {
    query = buildQuery({ query, when, not }, breakpoints, options)
  }

  const mediaQueryString = convertToMediaQuery(query, breakpoints, options)
  const mediaQueryList = window.matchMedia(mediaQueryString)

  if (options?.log) {
    warn('MediaQuery:', mediaQueryString)
  }

  return mediaQueryList
}

/**
 * Adds a listener to the window.matchMedia Browser API
 */
export function createMediaQueryListener(
  mediaQueryList: MediaQueryList,
  callback: (matches: boolean, event: Partial<MediaQueryListEvent>) => void
): MediaQueryListener {
  if (!mediaQueryList) {
    return () => null
  }

  const listener = (event: MediaQueryListEvent) => {
    if (typeof callback === 'function') {
      callback(event?.matches, event)
    }
  }
  if (mediaQueryList?.addEventListener) {
    mediaQueryList.addEventListener('change', listener)
  }

  return () => {
    if (mediaQueryList?.removeEventListener) {
      mediaQueryList.removeEventListener('change', listener)
    }
  }
}

/**
 * Builds a valid media query we can use on window.matchMedia(...)
 */
export function buildQuery(
  { query = null, when = null, not = null }: MediaQueryProperties = {},
  breakpoints?: MediaQueryBreakpoints,
  options?: MediaQueryOptions
) {
  if (when) {
    if (typeof when === 'string') {
      when = when.split(/[ ,]/g)
    }

    let listOfQueries = []

    if (Array.isArray(when)) {
      listOfQueries = listOfQueries.concat(
        combineQueries(when, breakpoints, options)
      )
    } else if (when && typeof when === 'object') {
      const query = convertToMediaQuery(when, breakpoints, options)
      if (query) {
        listOfQueries.push(query)
      }
    }

    if (listOfQueries.length > 0) {
      query = [listOfQueries.join(' '), query || '']
        .filter(Boolean)
        .join(' and ')
        .replace(/ +/g, ' ')
        .replace(/ ,/g, ',')
    }
  }

  if (isTrue(not)) {
    query = reverseQuery(String(query))
  }

  return query || 'not'
}

/**
 * Reverses a media query
 */
function reverseQuery(query: string) {
  if (query.startsWith('not')) {
    return query.replace(/^not +/, '')
  }
  if (!/^(screen|all|print|speech)/.test(query)) {
    query = `all and ${query}`
  }
  return `not ${query}`
}

/**
 * Builds a list of queries based on sizing types, like small, medium
 */
function combineQueries(
  queries: Array<MediaQueryCondition>,
  breakpoints: MediaQueryBreakpoints = null,
  options?: MediaQueryOptions
) {
  return queries
    .reduce((listOfQueries, when, i, arr) => {
      if (breakpoints) {
        breakpoints = mergeBreakpoints(breakpoints)
      }

      const query = convertToMediaQuery(when, breakpoints, options)

      if (query && query !== 'and') {
        switch (arr[i - 1]) {
          case 'and':
            listOfQueries.push('and')
            break

          case 'or':
          default:
            listOfQueries.push(', ')
            break
        }

        listOfQueries.push(query)
      }

      return listOfQueries
    }, [])
    .filter((query, i) => {
      return !(i === 0 && query.startsWith(', '))
    })
}

/**
 * If custom breakpoints are given, we order them by the value
 * and return again an object as before
 */
function mergeBreakpoints(breakpoints: MediaQueryBreakpoints) {
  return Object.entries({
    ...defaultBreakpoints,
    ...breakpoints,
  })
    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

/**
 * Convert a media query from various formats to a valid string based media query
 */
export function convertToMediaQuery(
  query: MediaQueryCondition | Array<MediaQueryCondition>,
  breakpoints: MediaQueryBreakpoints = null,
  options?: MediaQueryOptions
): string {
  if (typeof query === 'string') {
    return query
  }

  // Handling array of media queries
  if (Array.isArray(query)) {
    return query.reduce((acc, q, index) => {
      acc += objToMediaQuery(q, breakpoints, options)
      if (index < query.length - 1) {
        acc += ', '
      }

      return acc
    }, '') as string
  }

  // Handling single media query
  return objToMediaQuery(query, breakpoints, options)
}

/**
 * Converts an object with PascalCase defined properties to string based media queries
 */
function objToMediaQuery(
  obj: MediaQueryCondition,
  breakpoints: MediaQueryBreakpoints = null,
  options?: MediaQueryOptions
): string {
  let hasNot = false
  let query: string | Array<null> = Object.keys(obj).reduce(
    (acc, feature) => {
      let value = obj[feature]
      feature = toKebabCase(feature)

      if (feature === 'not') {
        hasNot = true
        return acc
      }
      if (feature === 'monochrome') {
        feature = `(${feature})`
      }

      if (feature === 'min' || feature === 'max') {
        feature = `${feature}-width`
      }

      // Add em to dimension features
      if (typeof value === 'number' && /[height|width]$/.test(feature)) {
        value = value + 'em'
      }

      if (value === true) {
        acc.push(feature)
      } else if (value === false) {
        acc.push('not ' + feature)
      } else {
        value = getValueByFeature(value, breakpoints)
        if (typeof value !== 'undefined') {
          acc.push(`(${feature}: ${value})`)
        }
      }

      return acc
    },
    []
  )

  if (Array.isArray(query)) {
    query = query.length > 0 ? query.join(' and ') : query.join('')
  }

  if (hasNot) {
    query = reverseQuery(query)
  }

  if (options?.correctRange && /\(min-width: [0-9]+em\)/.test(query)) {
    const size =
      parseFloat(query.match(/\(min-width: ([0-9]+)em\)/)[1]) || 0
    if (size > 0) {
      const correctedSize = (size * 16 + 0.1) / 16 // add 0.1px to the minimum to avoid overlap with and equivalent maximum
      query = query.replace(
        /(min-width: [0-9]+em)/,
        `min-width: ${correctedSize}em`
      )
    }
  }

  return query
}

/**
 * Corrects breakpoint types
 */
function getValueByFeature(
  value: string,
  types: MediaQueryBreakpoints = null
) {
  types = types || defaultBreakpoints
  if (Object.prototype.hasOwnProperty.call(types, value)) {
    value = types[value]
  }
  return value
}
