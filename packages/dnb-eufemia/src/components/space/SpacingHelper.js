/**
 * Space helper
 *
 */

import PropTypes from 'prop-types'
import { warn } from '../../shared/component-helper'

export const spacingPropTypes = {
  space: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      top: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]),
      right: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]),
      bottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]),
      left: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ])
    })
  ]),
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export const spacingDefaultProps = {
  space: null,
  top: null,
  right: null,
  bottom: null,
  left: null
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
  'xx-large-x2': 7
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
export const createTypeModifyers = (types) => {
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
    const leftOver = num - parseFloat(typeObject[1])
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
export const isValidSpaceProp = (prop) =>
  prop && ['top', 'right', 'bottom', 'left'].includes(prop)

export const removeSpaceProps = ({ ...props }) => {
  for (let i in props) {
    if (isValidSpaceProp(i)) {
      delete props[i]
    }
  }
  return props
}

// Creates a valid space CSS class out from given space types
export const createSpacingClasses = (props, Element = null) => {
  if (typeof props.space !== 'undefined') {
    if (
      typeof props.space === 'string' ||
      typeof props.space === 'number' ||
      (typeof props.space === 'boolean' && props.space)
    ) {
      props.top = props.right = props.bottom = props.left = props.space
    }
    for (let i in props.space) {
      if (!props[i] && isValidSpaceProp(i)) {
        props[i] = props.space[i]
      }
      delete props.space
    }
  }

  return Object.entries(props).reduce((acc, [direction, cur]) => {
    if (isValidSpaceProp(direction)) {
      if (String(cur) === '0' || String(cur) === 'false') {
        acc.push(`dnb-space__${direction}--zero`)
      } else if (cur) {
        const typeModifyers = createTypeModifyers(cur)

        // get the total sum
        const sum = sumTypes(typeModifyers)
        if (sum > 10) {
          warn(
            `Spacing of more than 10rem is not supported! You used ${sum} / (${typeModifyers.join(
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
            )
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
export const createStyleObject = (props) => {
  if (props.top && !(parseFloat(props.top) > 0)) {
    props.top = sumTypes(props.top)
  }
  if (props.bottom && !(parseFloat(props.bottom) > 0)) {
    props.bottom = sumTypes(props.bottom)
  }
  if (props.left && !(parseFloat(props.left) > 0)) {
    props.left = sumTypes(props.left)
  }
  if (props.right && !(parseFloat(props.right) > 0)) {
    props.right = sumTypes(props.right)
  }
  return Object.entries({
    marginTop: props.top && `${props.top}rem`,
    marginBottom: props.bottom && `${props.bottom}rem`,
    maxWidth: props.maxWidth && `${props.maxWidth}rem`,
    maxHeight: props.maxHeight && `${props.maxHeight}rem`,
    width: props.width && `${props.width}rem`,
    height: props.height && `${props.height}rem`
  }).reduce((acc, [key, val]) => {
    if (typeof val !== 'undefined') {
      acc[key] = val
    }
    return acc
  }, {})
}

export const isInline = (Element) => {
  let inline = false
  switch (Element) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'p':
      inline = true
      break
  }

  return inline
}
