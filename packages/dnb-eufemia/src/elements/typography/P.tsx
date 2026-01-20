/**
 * HTML Element
 *
 */

import React, { createContext, useContext } from 'react'
import clsx from 'clsx'
import Typography, {
  TypographySize,
  TypographyProps,
  TypographyContext,
} from './Typography'

export type PSize = TypographySize

export type PProps = TypographyProps<HTMLParagraphElement>

function P(props: PProps) {
  const {
    element = 'p',
    className,
    proseMaxWidth: proseMaxWidthProp,
    ...rest
  } = props

  const paragraphContext = useContext(ParagraphContext)
  const { proseMaxWidth: proseMaxWidthContext } =
    useContext(TypographyContext)

  // Use prop value if provided, otherwise fall back to context
  const proseMaxWidth = proseMaxWidthProp ?? proseMaxWidthContext

  return (
    <ParagraphContext.Provider value={{ isNested: true }}>
      <Typography
        element={
          element === 'p' && paragraphContext?.isNested ? 'span' : element
        }
        className={clsx('dnb-p', className)}
        proseMaxWidth={proseMaxWidth}
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
