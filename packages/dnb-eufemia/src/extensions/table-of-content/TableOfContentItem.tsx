import { Children, useContext } from 'react'
import { clsx } from 'clsx'
import Anchor from '../../components/anchor/Anchor'
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
  const overflow = context.overflowIds.has(id)
  const hideSubList = context.lastVisibleId === id

  return (
    <li
      {...rest}
      data-table-of-content-overflow={
        (overflow && !rest.hidden) || undefined
      }
      hidden={rest.hidden || (!context.isSidebar && overflow)}
      aria-hidden={
        !context.isSidebar && overflow ? true : rest['aria-hidden']
      }
      className={clsx('dnb-table-of-content__item', className)}
    >
      <Anchor
        noStyle={context.isSidebar}
        noUnderline={context.isSidebar}
        noHover={context.isSidebar}
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
            context.navigate(id)
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
            // Suppress Eufemia tooltips during automatic destination focus.
            const autofocus = target.getAttribute('data-autofocus')
            target.setAttribute('data-autofocus', 'true')
            try {
              target.focus({ preventScroll: true })
            } finally {
              if (autofocus === null) {
                target.removeAttribute('data-autofocus')
              } else {
                target.setAttribute('data-autofocus', autofocus)
              }
            }
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
            <ul
              className="dnb-table-of-content__sub-list"
              data-table-of-content-overflow={hideSubList || undefined}
              hidden={!context.isSidebar && hideSubList}
              aria-hidden={
                (!context.isSidebar && hideSubList) || undefined
              }
            >
              {children}
            </ul>
          </TableOfContentContext.Provider>
        )}
    </li>
  )
}

withComponentMarkers(TableOfContentItem, { _tableOfContentRole: 'item' })

export default TableOfContentItem
