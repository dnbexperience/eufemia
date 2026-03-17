/**
 * Space helper
 *
 */

import { warn } from '../../shared/component-helper'

import type {
  SpaceType,
  SpacingUnknownProps,
  SpacingProps,
  SpacePositiveSize,
  SpacePositiveRemValue,
  SpaceStringValue,
  InnerSpacingElementProps,
  InnerSpaceType,
  InnerSpaceTypeMedia,
} from './types'

type SpaceNumber = number
type InnerSpacingProps = Omit<SpacingProps, 'innerSpace'> & {
  innerSpace?: InnerSpaceType
}

export const spacingDefaultProps: SpacingProps = {
  space: null,
  innerSpace: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
}
// IMPORTANT: Keep the shorthand after the long type names
export const spacePatterns: Record<
  SpacePositiveSize,
  SpacePositiveRemValue
> = {
  'xx-small': 0.25,
  'x-small': 0.5,
  small: 1,
  medium: 1.5,
  large: 2,
  'x-large': 3,
  'xx-large': 3.5,
  'xx-large-x2': 7,
}

/**
 * Helper function to generate a calc(var(--spacing-large) + var(--spacing-small))
 *
 * @param types 'small', '16px', '1rem'
 * @returns e.g. calc(var(--spacing-large) + var(--spacing-small))
 */
globalThis.CALC_CACHE = {}
export const calc = (...types: Array<SpaceType>) => {
  const hash = types.join('|')
  if (globalThis.CALC_CACHE[hash]) {
    return globalThis.CALC_CACHE[hash]
  }

  const result: Array<string> = []

  types.forEach((rawTypes) => {
    createTypeModifiers(rawTypes as SpaceType).forEach((type) => {
      result.push(`var(--spacing-${type})`)
    })
  })

  return result.length
    ? (globalThis.CALC_CACHE[hash] = `calc(${result.join(' + ')})`)
    : null
}

/**
 * Creates a valid space CSS style out from given space types
 *
 * @param props
 * @returns { '--space-b-l': '2rem', '--space-t-l': '1rem' }
 */
export const createSpacingProperties = (
  props: InnerSpacingProps
): React.CSSProperties => {
  if (props?.innerSpace) {
    return computeProperties(props.innerSpace)
  }

  return {}
}

function hasMediaSize(media: InnerSpaceTypeMedia) {
  const keys = Object.keys(media)
  return (
    keys.includes('small') ||
    keys.includes('medium') ||
    keys.includes('large')
  )
}

function hasSize(space: InnerSpacingElementProps) {
  const keys = Object.keys(space)
  return (
    keys.includes('top') ||
    keys.includes('right') ||
    keys.includes('bottom') ||
    keys.includes('left') ||
    keys.includes('inline') ||
    keys.includes('block')
  )
}

function computeProperties(space: InnerSpaceType) {
  if (!hasMediaSize(space as InnerSpaceTypeMedia)) {
    space = {
      small: space,
      medium: space,
      large: space,
    } as InnerSpaceTypeMedia
  }

  const result = {}

  for (const size in space as InnerSpaceTypeMedia) {
    const value = space?.[size] as SpaceType | InnerSpacingElementProps
    const props = transformToAll(value)

    for (const key in props as InnerSpaceTypeMedia) {
      if (isValidInnerSpaceProp(key)) {
        const cur = props[key]
        const name = `--space-${key[0]}-${size[0]}`

        if (String(cur) === '0' || String(cur) === 'false') {
          result[name] = '0'
        } else if (cur) {
          const typeModifiers = createTypeModifiers(cur as SpaceType)
          const sum = sumTypes(typeModifiers)
          result[name] = `${sum}rem`
        }
      }
    }
  }

  return result as React.CSSProperties
}

function transformToAll(value: SpaceType | InnerSpacingElementProps) {
  let result = value

  if (!hasSize(value as InnerSpacingElementProps)) {
    result = {
      top: value,
      right: value,
      bottom: value,
      left: value,
    } as InnerSpacingElementProps
  }

  return expandInnerSpaceShorthand(result as InnerSpacingElementProps)
}

function expandInnerSpaceShorthand(space: InnerSpacingElementProps) {
  const result = { ...space }

  if (typeof result.inline !== 'undefined') {
    result.left = result.left ?? result.inline
    result.right = result.right ?? result.inline
  }

  if (typeof result.block !== 'undefined') {
    result.top = result.top ?? result.block
    result.bottom = result.bottom ?? result.block
  }

  return result
}

function isValidInnerSpaceProp(propName: string) {
  return ['top', 'right', 'bottom', 'left'].includes(propName)
}

/**
 * Creates a valid space CSS class out from given space types
 *
 * @param props
 * @param Element to check if it should be handled as inline
 * @returns "dnb-space__large dnb-space__small"
 */
export const createSpacingClasses = (
  props:
    | SpacingProps
    /**
     * To support typical not defined props form components
     */
    | SpacingUnknownProps,
  elementName: string | null = null
): string[] => {
  const p = Object.isFrozen(props) ? { ...props } : props

  if (typeof p.space !== 'undefined') {
    if (
      typeof p.space === 'string' ||
      typeof p.space === 'number' ||
      (typeof p.space === 'boolean' && p.space)
    ) {
      p.left = p.left ?? p.space
      p.bottom = p.bottom ?? p.space
      p.right = p.right ?? p.space
      p.top = p.top ?? p.space
    }
    if (typeof p.space === 'object') {
      for (const i in p.space) {
        if (!p[i] && isValidSpaceProp(i)) {
          p[i] = p.space[i]
        }
      }
    }
    delete p.space
  }

  return Object.entries(p).reduce<string[]>((acc, [direction, cur]) => {
    if (isValidSpaceProp(direction) && direction !== 'innerSpace') {
      if (String(cur) === '0' || String(cur) === 'false') {
        acc.push(`dnb-space__${direction}--zero`)
      } else if (cur) {
        const typeModifiers = createTypeModifiers(cur as SpaceType)

        // get the total sum
        const sum = sumTypes(typeModifiers)
        if (sum > 10) {
          warn(
            `Spacing of more than 10rem is not supported! You used ${sum} / (${typeModifiers.join(
              ','
            )})`
          )
        } else {
          // auto combine classes
          const nearestTypes = findNearestTypes(sum, true)

          acc = [
            ...acc,
            ...nearestTypes.map(
              (type) => `dnb-space__${direction}--${type}`
            ),
          ]
        }
      }
    } else if (direction === 'noCollapse') {
      acc.push('dnb-space--no-collapse')
      if (elementName && isInline(elementName)) {
        acc.push('dnb-space--inline')
      }
    }

    return acc
  }, [])
}

// @internal splits types by given string
export const translateSpace = (type: SpaceType) => {
  if (/-x2$/.test(String(type))) {
    return spacePatterns[String(type).replace(/-x2$/, '')] * 2
  }
  return spacePatterns[String(type)] || 0
}

// @internal Splits a string of: "large x-small" into an array of the same
export const splitTypes = (types: SpaceType | Array<SpaceType>) => {
  if (typeof types === 'string') {
    const test = (types as SpaceStringValue).split(/ /g)
    return clean(test as Array<SpaceStringValue>)
  } else if (typeof types === 'boolean') {
    return [types ? ('small' as SpacePositiveSize) : 0]
  } else if (typeof types === 'number') {
    return [types]
  }

  return clean(types) || null

  function clean(t: Array<SpaceType> | Array<SpaceStringValue>) {
    return t?.filter((r) => r && String(r).length > 0)
  }
}

// @internal Sums e.g. "large" + "x-small" to be = 2.5rem
export const sumTypes = (types: SpaceType | Array<SpaceType>) =>
  splitTypes(types)
    .map((type) => translateSpace(type))
    .reduce((acc, cur) => {
      if (cur > 0) {
        acc += cur
      } else if (cur < 0) {
        acc -= cur
      }
      return acc
    }, 0)

// @internal Returns an array with modifiers e.g. ["large", "x-small"]
export const createTypeModifiers = (
  types: SpaceType
): Array<SpaceType> => {
  return (splitTypes(types) || []).reduce((acc, type) => {
    if (type) {
      const firstLetter = String(type)[0]
      if (parseFloat(firstLetter) > -1) {
        // can be "2rem" or "32px" - but we want only a number
        let num = parseFloat(String(type))

        // check if we got pixels
        if (num >= 8 && /[0-9]px/.test(String(type))) {
          num = num / 16
        }

        // check if the type exists in our extensions
        const foundType = findType(num)

        // get the type
        if (foundType) {
          type = foundType
        } else {
          findNearestTypes(num).forEach((type) => {
            if (type) {
              acc.push(type)
            }
          })
        }
      }

      if (!(parseFloat(String(type)) > 0)) {
        acc.push(type)
      }
    }
    return acc
  }, [])
}

// @internal Finds from "2.0" the equivalent type "large"
export const findType = (num: SpaceNumber): SpaceType => {
  const found = findTypeAll(num)

  // get the type
  if (found) {
    return found[0]
  }

  return null
}

// @internal Finds from "2.0" the equivalent type "large" and returns all results
export const findTypeAll = (
  num: SpaceNumber
): Array<SpacePositiveSize | SpacePositiveRemValue> => {
  const listOfSpacePatterns = Object.entries(spacePatterns) as [
    SpacePositiveSize,
    SpacePositiveRemValue,
  ][]
  const found =
    listOfSpacePatterns.find(([k, v]) => k && v === num) || null
  return found
}

// @internal Finds from e.g. a value of "2.5rem" the nearest type = ["large", "x-small"]
export const findNearestTypes = (num: SpaceNumber, multiply = false) => {
  let res = []

  const near = Object.entries(spacePatterns)
    .reverse()
    .filter((k) => (multiply ? true : !k[0].includes('-x'))) // e.g. -x2
    .find(([k, v]) => k && num >= v)
  const nearNum = (near && near[1]) || num
  const types = findTypeAll(nearNum)

  if (types) {
    const nearType = types[0]
    res.push(nearType)
    const leftOver = num - parseFloat(String(types[1]))
    const foundMoreTypes = findNearestTypes(leftOver, multiply)

    // if the value already exists, then replace it with an x2
    foundMoreTypes.forEach((type) => {
      const index = res.indexOf(type)
      if (index !== -1) {
        res[index] = multiply ? `${type}-x2` : type
      }
    })

    res = [...res, ...foundMoreTypes]
  }

  return res
}

// @internal Checks if a space prop is a valid string like "top"
export const isValidSpaceProp = (propName: string) =>
  propName &&
  ['top', 'right', 'bottom', 'left', 'space', 'innerSpace'].includes(
    propName
  )

export const removeSpaceProps = <Props extends SpacingProps>(
  props: Props
): Omit<Props, keyof SpacingProps> => {
  const { space, innerSpace, top, bottom, left, right, ...restProps } =
    props
  return restProps
}

export const isInline = (elementName: string) => {
  switch (elementName) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'p':
      return true
  }

  return false
}
