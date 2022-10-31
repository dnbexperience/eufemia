/**
 * Space helper
 *
 */

import { warn } from '../../shared/component-helper'

import type { SpacingProps } from './types'

type Props = SpacingProps | Record<string, unknown>

type StyleObjectProps = {
  maxWidth?: string
  maxHeight?: string
  width?: string
  height?: string
}

export const spacingDefaultProps = {
  space: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
}
// IMPORTANT: Keep the shorthand after the long type names
export const spacePatterns = {
  'xx-small': 0.25,
  'x-small': 0.5,
  small: 1,
  medium: 1.5,
  large: 2,
  'x-large': 3,
  'xx-large': 3.5,
  'xx-large-x2': 7,
}

export const translateSpace = (type) => {
  if (/-x2$/.test(type)) {
    return spacePatterns[type.replace(/-x2$/, '')] * 2
  }
  return spacePatterns[type] || 0
}

// Splits a string of: "large x-small" into an array of the same
export const splitTypes = (types) => {
  if (typeof types === 'string') {
    types = types.split(/ /g)
  } else if (typeof types === 'boolean') {
    return ['small']
  } else if (typeof types === 'number') {
    return [types]
  }
  return types ? types.filter((r) => r && r.length > 0) : null
}

// Sums e.g. "large" + "x-small" to be = 2.5rem
export const sumTypes = (types) =>
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

// Returns an array with modifiers e.g. ["--large" + "--x-small"]
export const createTypeModifiers = (types) => {
  if (typeof types === 'number') {
    types = String(types)
  }
  return (splitTypes(types) || []).reduce((acc, type) => {
    if (type) {
      const firstLetter = type[0]
      if (parseFloat(firstLetter) > -1) {
        // can be "2rem" or "32px" - but we want only a number
        let num = parseFloat(type)

        // check if we got pixels
        if (num >= 8 && /[0-9]px/.test(type)) {
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

      if (!(parseFloat(type) > 0)) {
        acc.push(type)
      }
    }
    return acc
  }, [])
}

// Finds from "2.0" the equivalent type "large"
export const findType = (num, { returnObject = false } = {}) => {
  const found =
    Object.entries(spacePatterns).find(([k, v]) => k && v === num) || null

  if (returnObject) {
    return found
  }

  // get the type
  if (found) {
    return found[0]
  }

  return found
}

// Finds from e.g. a value of "2.5rem" the nearest type = ["large", "x-small"]
export const findNearestTypes = (num) => {
  let res = []

  const near = Object.entries(spacePatterns)
    .reverse()
    .find(([k, v]) => k && num >= v)
  const nearNum = (near && near[1]) || num

  const typeObject = findType(nearNum, { returnObject: true })

  if (typeObject) {
    const nearType = typeObject[0]
    res.push(nearType)
    const leftOver = num - parseFloat(String(typeObject[1]))
    const foundMoreTypes = findNearestTypes(leftOver)

    // if the value already exists, then replace it with an x2
    foundMoreTypes.forEach((type) => {
      const index = res.indexOf(type)
      if (index !== -1) {
        res[index] = `${type}-x2`
      }
    })

    res = [...res, ...foundMoreTypes]
  }

  return res
}

// Checks if a space prop is a valid string like "top"
export const isValidSpaceProp = (propName: string) =>
  propName && ['top', 'right', 'bottom', 'left'].includes(propName)

export const removeSpaceProps = (props: Props) => {
  const p = Object.isFrozen(props) ? { ...props } : props
  for (const i in p) {
    if (isValidSpaceProp(i)) {
      delete p[i]
    }
  }
  return p
}

// Creates a valid space CSS class out from given space types
export const createSpacingClasses = (props: Props, Element = null) => {
  const p = Object.isFrozen(props) ? { ...props } : props

  if (typeof p.space !== 'undefined') {
    if (
      typeof p.space === 'string' ||
      typeof p.space === 'number' ||
      (typeof p.space === 'boolean' && p.space)
    ) {
      p.top = p.right = p.bottom = p.left = p.space
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

  return Object.entries(p).reduce((acc, [direction, cur]) => {
    if (isValidSpaceProp(direction)) {
      if (String(cur) === '0' || String(cur) === 'false') {
        acc.push(`dnb-space__${direction}--zero`)
      } else if (cur) {
        const typeModifiers = createTypeModifiers(cur)

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
          const nearestTypes = findNearestTypes(sum)

          acc = [
            ...acc,
            ...nearestTypes.map(
              (type) => `dnb-space__${direction}--${type}`
            ),
          ]
        }
      }
    } else if (direction === 'no_collapse') {
      acc.push('dnb-space--no-collapse')
      if (Element && isInline(Element)) {
        acc.push('dnb-space--inline')
      }
    }

    return acc
  }, [])
}

// Creates a CSS Style Object out from given space types
export const createStyleObject = (props: Props & StyleObjectProps) => {
  const p = Object.isFrozen(props) ? { ...props } : props

  if (p.top && !(parseFloat(String(p.top)) > 0)) {
    p.top = sumTypes(p.top)
  }
  if (p.bottom && !(parseFloat(String(p.bottom)) > 0)) {
    p.bottom = sumTypes(p.bottom)
  }
  if (p.left && !(parseFloat(String(p.left)) > 0)) {
    p.left = sumTypes(p.left)
  }
  if (p.right && !(parseFloat(String(p.right)) > 0)) {
    p.right = sumTypes(p.right)
  }
  return Object.entries({
    marginTop: p.top && `${p.top}rem`,
    marginBottom: p.bottom && `${p.bottom}rem`,
    maxWidth: p.maxWidth && `${p.maxWidth}rem`,
    maxHeight: p.maxHeight && `${p.maxHeight}rem`,
    width: p.width && `${p.width}rem`,
    height: p.height && `${p.height}rem`,
  }).reduce((acc, [key, val]) => {
    if (typeof val !== 'undefined') {
      acc[key] = val
    }
    return acc
  }, {})
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
