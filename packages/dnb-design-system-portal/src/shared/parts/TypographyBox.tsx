import React from 'react'
import classnames from 'classnames'

export function TypographyBox({ children, className = null, ...props }) {
  return (
    <div className={classnames('typography-box', className)} {...props}>
      {removeNestedParagraphs(children)}
    </div>
  )
}

function removeNestedParagraphs(children: Array<JSX.Element>) {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const jsx = child as JSX.Element
      if (jsx.type?.name === 'p') {
        return jsx.props.children
      } else {
        return React.cloneElement(
          child,
          null,
          removeNestedParagraphs(jsx.props.children),
        )
      }
    }

    return child
  })
}
