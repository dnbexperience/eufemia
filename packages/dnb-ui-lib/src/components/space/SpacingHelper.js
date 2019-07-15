/**
 * Space helper
 *
 */

// IMPORTANT: Keep the shorthand after the long type names
export const spacePatterns = {
  'x-small': 0.5,
  small: 1,
  medium: 1.5,
  large: 2,
  'x-large': 3,
  'xx-large': 3.5,
  'xx-large-x2': 7
}

export const translateSpace = type => {
  if (/-x2$/.test(type)) {
    return spacePatterns[type.replace(/-x2$/, '')] * 2
  }
  return spacePatterns[type] || 0
}

// Splits a string of: "large x-small" into an array of the same
export const splitTypes = types => {
  if (typeof types === 'string') {
    types = types.split(/ /g)
  }
  if (typeof types === 'boolean') {
    types = ['small']
  }
  return types.filter(r => r && r.length > 0)
}

// Sums e.g. "large" + "x-small" to be = 2.5rem
export const sumTypes = types => {
  return splitTypes(types)
    .map(type => translateSpace(type))
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
  return splitTypes(types).reduce((acc, type) => {
    if (type) {
      const firstLetter = type[0]
      if (parseFloat(firstLetter) > -1) {
        // can be "2rem" or "32px" - but we want only a number
        let num = parseFloat(type)

        // check if we got pixels
        if (num >= 8 && /[0-9]px/.test(type)) {
          num = num / 16
        }

        // check if the type exists in our patterns
        const foundType = findType(num)

        // get the type
        if (foundType) {
          type = foundType
        } else {
          findNearestTypes(num).forEach(type => {
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
export const findNearestTypes = num => {
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
    foundMoreTypes.forEach(type => {
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
export const isValidSpaceProp = prop =>
  prop && ['top', 'right', 'bottom', 'left'].includes(prop)

// Creates a valid space CSS class out from given space types
export const createSpacingClasses = props =>
  Object.entries(props).reduce((acc, [direction, cur]) => {
    if (cur && isValidSpaceProp(direction)) {
      const typeModifyers = createTypeModifyers(cur)

      // get the total sum
      const sum = sumTypes(typeModifyers)
      if (sum > 10) {
        console.warn(
          `Spacing of more than 10rem is not supported! You used ${sum} / (${typeModifyers.join(
            ','
          )})`
        )
      } else {
        // auto combine classes
        const nearestTypes = findNearestTypes(sum)
        // console.log('nearestTypes', typeModifyers, sum, nearestTypes)

        acc.push(
          nearestTypes.map(type => `dnb-space__${direction}--${type}`)
        )
      }
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
