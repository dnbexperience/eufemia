import { Children, useContext } from 'react'
import { clsx } from 'clsx'
import Anchor from '../anchor/Anchor'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { TableOfContentContext } from './TableOfContentContext'
import type { TableOfContentItemProps } from './types'

function TableOfContentItem({
  id,
  text,
  children,
  className,
  onClick,
  ...rest
}: TableOfContentItemProps) {
  const context = useContext(TableOfContentContext)

  if (context.depth > context.maxDepth) {
    return null
  }

  const isCurrent = context.currentId === id

  return (
    <li
      {...rest}
      className={clsx('dnb-table-of-content__item', className)}
    >
      <Anchor
        noStyle
        href={'#' + encodeURIComponent(id)}
        aria-current={isCurrent ? 'location' : undefined}
        className={clsx(
          'dnb-table-of-content__link',
          isCurrent && 'dnb-table-of-content__link--current'
        )}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event)
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return
          }

          const target = document.getElementById(id)
          if (target) {
            // Keep native fragment navigation and move keyboard reading order to its destination.
            const hadTabIndex = target.hasAttribute('tabindex')
            if (!hadTabIndex) {
              target.setAttribute('tabindex', '-1')
              target.addEventListener(
                'blur',
                () => target.removeAttribute('tabindex'),
                { once: true }
              )
            }
            target.focus({ preventScroll: true })
          }
        }}
      >
        {text}
      </Anchor>
      {Children.count(children) > 0 &&
        context.depth < context.maxDepth && (
          <TableOfContentContext.Provider
            value={{ ...context, depth: context.depth + 1 }}
          >
            <ul className="dnb-table-of-content__sub-list">{children}</ul>
          </TableOfContentContext.Provider>
        )}
    </li>
  )
}

withComponentMarkers(TableOfContentItem, { _tableOfContentRole: 'item' })

export default TableOfContentItem
