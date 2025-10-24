/**
 * HTML Element
 *
 */

import React, { createContext, useContext } from 'react'
import classnames from 'classnames'
import Typography, { TypographySize, TypographyProps } from './Typography'

export type PSize = TypographySize

export type PProps = TypographyProps<HTMLParagraphElement>

function P(props: PProps) {
  const { element = 'p', className, ...rest } = props

  const paragraphContext = useContext(ParagraphContext)

  return (
    <ParagraphContext.Provider value={{ isNested: true }}>
      <Typography
        element={
          element === 'p' && paragraphContext?.isNested ? 'span' : element
        }
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
