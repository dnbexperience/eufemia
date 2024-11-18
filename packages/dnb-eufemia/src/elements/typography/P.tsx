/**
 * HTML Element
 *
 */

import React, { createContext, useContext } from 'react'
import classnames from 'classnames'
import Typography, { TypographySize, TypographyProps } from './Typography'

/** @deprecated use TypographySize instead */
export type PSize = TypographySize

export type PProps = TypographyProps<HTMLParagraphElement> & {
  /**
   * Tells the component to use the medium font-weight styling dnb-p--medium defined in paragraphStyle - typography-mixins.scss. Find more details here https://eufemia.dnb.no/uilib/typography/font-weight/
   * @deprecated use the `weight` prop instead
   */
  medium?: boolean
  /**
   * Tells the component to use the bold font-weight styling dnb-p--bold defined in paragraphStyle - typography-mixins.scss. Find more details here https://eufemia.dnb.no/uilib/typography/font-weight/
   * @deprecated use the `weight` prop instead
   */
  bold?: boolean
  /**
   * A string containing a combination of modifiers, used to set both font-size and weight in one property. e.g. "x-small bold" would make the paragraph extra small and bold.
   * Works as a flexible alternative to setting the medium, bold and size props.
   * List of modifiers can be found at https://eufemia.dnb.no/uilib/typography/font-size/ and https://eufemia.dnb.no/uilib/typography/font-weight/
   * @deprecated only font weights "bold" and "medium" and sizes "x-small" and "small" are supported. Use the `size` and `weight` props instead.
   */
  modifier?: string
}

function P(props: PProps) {
  const {
    remainingModifiers,
    element = 'p',
    ...rest
  } = handleDeprecatedProps(props)

  const paragraphContext = useContext(ParagraphContext)

  const modifierClasses = remainingModifiers.reduce((acc, cur) => {
    // only .dnb-p--lead or .dnb-p--bold remain as supported modifiers
    return `${acc} dnb-p--${cur}`
  }, '')

  return (
    <ParagraphContext.Provider value={{ isNested: true }}>
      <Typography
        element={
          element === 'p' && paragraphContext?.isNested ? 'span' : element
        }
        className={classnames('dnb-p', modifierClasses)}
        {...rest}
      />
    </ParagraphContext.Provider>
  )
}

const handleDeprecatedProps = ({
  weight,
  size,
  modifier,
  bold,
  medium,
  ...rest
}: PProps): TypographyProps<HTMLParagraphElement> & {
  remainingModifiers?: string[]
} => {
  let oldWeight
  let oldSize

  const allModifiers = [bold && 'bold', medium && 'medium']
  if (modifier) {
    modifier
      .split(/\s/g)
      .forEach((modifier) => allModifiers.push(modifier))
  }

  const remainingModifiers = allModifiers.filter(Boolean).filter((cur) => {
    if (['x-small'].includes(cur)) {
      oldSize = 'x-small'
    } else if (['small'].includes(cur)) {
      oldSize = oldSize || 'small'
    } else if (['medium'].includes(cur)) {
      oldWeight = oldWeight || 'medium'
    } else if (['bold'].includes(cur)) {
      oldWeight = 'bold'
    } else {
      // only .dnb-p--lead really remains as supported modifier
      return true
    }
    return false
  }, [])

  return {
    weight: weight || oldWeight,
    size: oldSize && size !== 'x-small' ? oldSize : size,
    remainingModifiers,
    ...rest,
  }
}

P._supportsSpacingProps = true

export default P

export type ParagraphContextType = {
  isNested?: boolean
}

export const ParagraphContext =
  createContext<ParagraphContextType>(undefined)
