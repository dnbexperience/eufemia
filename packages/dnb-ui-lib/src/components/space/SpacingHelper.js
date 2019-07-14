/**
 * Space helper
 *
 */

// IMPORTANT: Keep the shorthand after the long type names
export const spacePatterns = {
  'x-small': 0.5,
  xs: 0.5,
  small: 1,
  s: 1,
  medium: 1.5,
  m: 1.5,
  large: 2,
  l: 2,
  'x-large': 3,
  'x-l': 3,
  'xx-large': 3.5,
  'xx-l': 3.5
}

export const translateSpace = type => spacePatterns[type] || 0

// Splits a string of: "large x-small" into an array of the same
export const splitTypes = types => {
  return types.split(/ /g).filter(r => {
    return r && r.length > 0
  })
}

// Sums e.g. "large" + "x-small" to be = 2.5rem
export const sumTypes = types => {
  return splitTypes(types)
    .map(type => {
      return translateSpace(type)
    })
    .reduce((acc, cur) => {
      if (cur > 0) {
        acc += cur
      } else if (cur > 0) {
        acc -= cur
      }
      return acc
    }, 0)
}

// Returns an array with modifyers e.g. ["--large" + "--x-small"]
export const createTypeModifyers = types => {
  return splitTypes(types).reduce((acc, cur) => {
    if (cur) {
      const firstLetter = cur[0]
      if (parseFloat(firstLetter) > -1) {
        // can be "2rem" or "32px" - but we want only a number
        let num = parseFloat(cur)

        // check if we got pixels
        if (num >= 8 && /[0-9]px/.test(cur)) {
          num = num / 16
        }

        // check if the type exists in our patterns
        const foundType = findType(num)

        // get the type
        if (foundType) {
          cur = foundType
        } else {
          findNearestTypes(num).forEach(type => {
            if (type) {
              acc.push(`--${type}`)
            }
          })
        }
      }

      if (cur) {
        acc.push(`--${cur}`)
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
export const findNearestTypes = num => {
  let res = []

  const near = Object.entries(spacePatterns)
    .reverse()
    .find(([k, v]) => k && num > v)

  const nearNum = (near && near[1]) || num

  const types = findType(nearNum, { returnObject: true })

  if (types) {
    const nearType = types[0]
    res.push(nearType)
    const leftOver = num - parseFloat(types[1])
    const foundMoreTypes = findNearestTypes(leftOver)
    res = [...res, ...foundMoreTypes]
  }

  return res
}

// Checks if a space prop is valid
export const isValidType = type =>
  ['top', 'right', 'bottom', 'left'].includes(type)

// Creates a valid space CSS class out from given space types
export const createSpacingClasses = types =>
  Object.entries(types).reduce((acc, [type, cur]) => {
    if (cur && isValidType(type)) {
      acc.push(
        createTypeModifyers(cur).map(
          modifyer => `dnb-space__${type}${modifyer}`
        )
      )
    }

    return acc
  }, [])

// Creates a CSS Style Object out from given space types
export const createStyleObject = props => {
  if (props.top && !(parseFloat(props.top) > 0)) {
    props.top = sumTypes(props.top)
  }
  if (props.bottom && !(parseFloat(props.bottom) > 0)) {
    props.bottom = sumTypes(props.bottom)
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
