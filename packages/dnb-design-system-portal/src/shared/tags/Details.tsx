/**
 * Inline Tag
 *
 */

import { Children, isValidElement } from 'react'
import type { HTMLAttributes } from 'react'
import clsx from 'clsx'
import Summary from './Summary'
import { detailsBox, detailsBox__content } from './Details.module.scss'

const Details = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDetailsElement>) => {
  const [summary, ...rest] = Children.toArray(children)
  return (
    <details {...props} className={clsx(className, detailsBox)}>
      {isValidElement(summary) && summary.type === Summary ? (
        <>
          {summary}
          <div className={detailsBox__content}>{rest}</div>
        </>
      ) : (
        children
      )}
    </details>
  )
}

export default Details
