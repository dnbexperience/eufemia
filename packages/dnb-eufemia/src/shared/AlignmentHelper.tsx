/**
 * Alignment helper
 *
 * This helper element provides needed help when it comes to HTML inline alignment (vertically)
 *
 */

import React from 'react'
import classnames from 'classnames'

type Props = {
  className?: string
  children?: React.ReactNode
  pseudoElementOnly?: boolean
} & React.HTMLAttributes<HTMLSpanElement>

export default function AlignmentHelper({
  className = null,
  children = null,
  pseudoElementOnly = false,
  ...props
}: Props) {
  return (
    <span
      className={classnames(
        pseudoElementOnly
          ? 'dnb-alignment-helper--pseudo-element-only'
          : 'dnb-alignment-helper',
        className
      )}
      aria-hidden
      {...props}
    >
      {children}
    </span>
  )
}
