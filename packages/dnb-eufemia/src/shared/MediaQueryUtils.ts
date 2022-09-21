import { isTrue, toKebabCase, warn } from './component-helper'
import { IS_IE11 } from './helpers'

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
  medium: '50em',
  large: '60em',
  'x-large': '72em',
  'xx-large': '80em',
}

export type MediaQueryCondition =
  | {
      min?: number | string | MediaQuerySizes
      max?: number | string | MediaQuerySizes
      screen?: boolean
      minWidth?: number | string | MediaQuerySizes
      maxWidth?: number | string | MediaQuerySizes
      orientation?: string
      handheld?: boolean
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

  /**
   * If set to true, no MediaQuery will be used.
   */
  disabled?: boolean

  /**
   * For debugging
   */
  log?: boolean
} & MediaQueryCondition

export type MediaQueryListener = () => void

export type MediaQueryProps = {
  /**
   * If set to true, it will match and return the given children during SSR.
   */
  matchOnSSR?: boolean

  children?: React.ReactNode
} & MediaQueryProperties

export type MediaQueryState = {
  match?: boolean | null
  mediaQueryList?: { matches: boolean }
}

/**
 * Adds a listener to a given MediaQuery
 *
 * @type {object} string or object { when: { min: 'small' } } that describes the media query
 * @property {string} query - media queries
 * @property {object} when - media queries
 * @property {boolean} not - reverses a media query
 * @param {function} callback function that gets emitted when the given media query
 * @returns function to remove listeners when called
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
 *
 * @returns boolean
 */
export const isMatchMediaSupported = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'

/**
 * Convert user defined media queries to an valid MediaQueryList we can assign a listener to
 *
 * @type {object} object that contains either a query, a when or not
 * @property {string} query - media queries
 * @property {object} when - media queries
 * @property {boolean} not - reverses a media query
 * @property {boolean} log - print used query to console
 * @returns MediaQueryList type
 */
export function makeMediaQueryList(
  {
    query,
    when,
    not = null,
    log = false,
    disabled = false,
  }: MediaQueryProperties = {},
  breakpoints: MediaQueryBreakpoints = null
): MediaQueryList {
  if (disabled || !isMatchMediaSupported()) {
    return null
  }

  if (when) {
    query = buildQuery({ query, when, not }, breakpoints)
  }

  const mediaQueryString = convertToMediaQuery(query, breakpoints)
  const mediaQueryList = window.matchMedia(mediaQueryString)

  if (log) {
    console.log('MediaQuery:', mediaQueryString)
  }

  return mediaQueryList
}

/**
 * Adds a listener to the window.matchMedia Browser API
 *
 * @param {MatchMediaList} mediaQueryList a DOM MatchMediaList object
 * @param {function} callback callback function
 * @returns function to remove listeners when called
 */
export function createMediaQueryListener(
  mediaQueryList: MediaQueryList,
  callback: (matches: boolean, event) => void
): MediaQueryListener {
  if (!mediaQueryList) {
    warn('Invalid MediaQueryList was given')
    return () => null
  }

  const listener = (event) => {
    if (typeof callback === 'function') {
      callback(event?.matches, event)
    }
  }
  if (IS_IE11 || !mediaQueryList?.addEventListener) {
    // Deprecated
    mediaQueryList.addListener(listener)
  } else {
    mediaQueryList.addEventListener('change', listener)
  }

  return () => {
    if (IS_IE11 || !mediaQueryList?.removeEventListener) {
      // Deprecated
      mediaQueryList.removeListener(listener)
    } else {
      mediaQueryList.removeEventListener('change', listener)
    }
  }
}

/**
 * Builds a valid media query we can use on window.matchMedia(...)
 *
 * @type {object} object that contains either a query, a when or not
 * @property {string} query - media queries
 * @property {object} when - media queries
 * @property {boolean} not - reverses a media query
 * @returns media queries as a string
 */
export function buildQuery(
  { query = null, when = null, not = null }: MediaQueryProperties = {},
  breakpoints?: MediaQueryBreakpoints
) {
  if (when) {
    if (typeof when === 'string') {
      when = when.split(/[ ,]/g)
    }

    let listOfQueries = []

    if (Array.isArray(when)) {
      listOfQueries = listOfQueries.concat(
        combineQueries(when, breakpoints)
      )
    } else if (when && typeof when === 'object') {
      const query = convertToMediaQuery(when, breakpoints)
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
 * @param {string} query media query to reverse with "not"
 * @returns reversed query
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
 *
 * @param {*} queries media query definitions as an array that contains either strings with size types or an object with all the media query definitions
 * @returns array of JavaScript based queries
 */
function combineQueries(
  queries: Array<MediaQueryCondition>,
  breakpoints: MediaQueryBreakpoints = null
) {
  return queries
    .reduce((listOfQueries, when, i, arr) => {
      if (breakpoints) {
        breakpoints = mergeBreakpoints(breakpoints)
      }

      const query = convertToMediaQuery(when, breakpoints)

      if (query) {
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
 *
 * @param {array|object|string} query media query definitions
 * @returns media query string
 */
export function convertToMediaQuery(
  query: MediaQueryCondition | Array<MediaQueryCondition>,
  breakpoints: MediaQueryBreakpoints = null
): string {
  if (typeof query === 'string') {
    return query
  }

  // Handling array of media queries
  if (Array.isArray(query)) {
    return query.reduce((acc, q, index) => {
      acc += objToMediaQuery(q, breakpoints)
      if (index < query.length - 1) {
        acc += ', '
      }

      return acc
    }, '') as string
  }

  // Handling single media query
  return objToMediaQuery(query, breakpoints)
}

/**
 * Converts an object with PascalCase defined properties to string based media queries
 * @param {object} obj Object with PascalCase defined properties and respective values
 * @returns media query string
 */
function objToMediaQuery(
  obj: MediaQueryCondition,
  breakpoints: MediaQueryBreakpoints = null
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

  return query
}

/**
 * Corrects breakpoint types
 *
 * @param {string} value small, medium, large etc
 * @param {object} types breakpoints
 * @returns corrected value
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
