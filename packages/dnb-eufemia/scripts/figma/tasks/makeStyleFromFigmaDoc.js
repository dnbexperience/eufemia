/**
 * Figma Task
 *
 */

import Color from 'color'

export const makeScssVarsFromFigmaDoc = ({
  existingSassVars,
  newStylesFromDoc,
  prependKey,
  prependSubKey,
}) => {
  const res = {}
  const existingKeys = Object.keys(existingSassVars)
  newStylesFromDoc.forEach(([key, value]) => {
    const foundKey = existingKeys.find((k) => {
      return (
        k === `${prependKey}-${key}` ||
        k === `${prependKey}-${prependSubKey}-${key}`
      )
    })
    if (!foundKey) return {}
    res[foundKey] = value
  })
  return res
}

export const makeScssFromFigmaDoc = (
  expression,
  value,
  {
    existingSassVars = null,
    prependKey = null,
    subkeyToFind = null,
    doReturnExpression = false,
  } = {}
) => {
  if (!value) return null

  let res = ''
  switch (expression) {
    case 'border-width': {
      res = value.weight && `${value.weight}px`
      break
    }
    case 'border-color': {
      res = value.color && Color(value.color).hex()
      break
    }
    case 'border-radius': {
      res = value.height && `${value.height / 20}rem`
      break
    }
    case 'background-color': {
      res = Color(value).hex()
      break
    }
    case 'font-family': {
      res = `'${value.fontFamily}', sans-serif`
      break
    }
    case 'font-size': {
      res = value.fontSize > 0 && `${value.fontSize / 16}rem`
      break
    }
    case 'font-weight': {
      res = value.fontWeight > 0 && `${value.fontWeight / 4}`
      break
    }
    case 'text-align': {
      res =
        value.textAlignHorizontal &&
        `${value.textAlignHorizontal.toLowerCase()}`
      break
    }
    case 'letter-spacing': {
      res = value.letterSpacing > 0 && `${value.letterSpacing}`
      break
    }
    case 'letter-height': {
      res =
        value.lineHeightPercent > 0 && `${value.lineHeightPercent / 100}`
      break
    }
    case 'color': {
      res = Color(value).hex()
      break
    }
    case 'height': {
      res = value.height > 0 && `${String(value.height / 16)}rem`
      break
    }

    default:
      res = null
  }
  if (existingSassVars) {
    const valueExists = findexistingSassVars({
      existingSassVars,
      keyToFind: expression,
      prependKey,
      subkeyToFind,
    })
    if (valueExists && valueExists === res) {
      return null
    }
  }
  if (doReturnExpression) {
    return res ? `${expression}: ${res};` : ''
  } else return res
}

const findexistingSassVars = ({
  existingSassVars,
  prependKey,
  keyToFind,
  subkeyToFind,
}) => {
  const entries = Object.entries(existingSassVars)
  const index = entries.find(
    ([key]) =>
      key === `${prependKey}-${keyToFind}` ||
      key === `${prependKey}-${subkeyToFind}-${keyToFind}`
  )
  let res = index && index.length > 0 ? index[1] : null
  if (typeof res === 'string') res = res.replace(/"/g, "'")
  if (/#/.test(res)) {
    res = Color(res).hex()
  }
  return res
}
