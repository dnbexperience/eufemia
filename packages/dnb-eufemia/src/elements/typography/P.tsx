/**
 * HTML Element
 *
 */

import React, { createContext, useContext } from 'react'
import classnames from 'classnames'
import Typography, { TypographySize, TypographyProps } from './Typography'

/** @deprecated use TypographySize instead */
export type PSize = TypographySize

export type PProps = TypographyProps<HTMLParagraphElement>

function P({ element = 'p', className, ...rest }: PProps) {
  const paragraphContext = useContext(ParagraphContext)

  return (
    <ParagraphContext.Provider value={{ isNested: true }}>
      <Typography
        element={
          element === 'p' && paragraphContext?.isNested ? 'span' : element
        }
        modifierClassName="dnb-p"
        className={classnames('dnb-p', className)}
        {...rest}
      />
    </ParagraphContext.Provider>
  )
}

P._supportsSpacingProps = true

export default P

export type ParagraphContextType = {
  isNested?: boolean
}

export const ParagraphContext =
  createContext<ParagraphContextType>(undefined)
