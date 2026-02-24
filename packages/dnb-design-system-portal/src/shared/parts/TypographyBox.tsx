import React from 'react'
import clsx from 'clsx'

export function TypographyBox({ children, className = null, ...props }) {
  return (
    <div className={clsx('typography-box', className)} {...props}>
      {removeNestedParagraphs(children)}
    </div>
  )
}

function removeNestedParagraphs(children: Array<React.JSX.Element>) {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const jsx = child as React.JSX.Element
      if (jsx.type?.name === 'p') {
        return jsx.props.children
      } else {
        return React.cloneElement(
          child,
          null,
          removeNestedParagraphs(jsx.props.children)
        )
      }
    }

    return child
  })
}
