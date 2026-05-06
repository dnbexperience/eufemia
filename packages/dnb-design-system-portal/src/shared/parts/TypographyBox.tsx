import { Children, cloneElement, isValidElement } from 'react'
import type { JSX } from 'react'
import clsx from 'clsx'

export function TypographyBox({ children, className = null, ...props }) {
  return (
    <div className={clsx('typography-box', className)} {...props}>
      {removeNestedParagraphs(children)}
    </div>
  )
}

function removeNestedParagraphs(children: Array<JSX.Element>) {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      const jsx = child as JSX.Element
      if (jsx.type?.name === 'p') {
        return jsx.props.children
      } else {
        return cloneElement(
          child,
          null,
          removeNestedParagraphs(jsx.props.children)
        )
      }
    }

    return child
  })
}
