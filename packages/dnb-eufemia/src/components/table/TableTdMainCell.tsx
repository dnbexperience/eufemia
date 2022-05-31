import React from 'react'
import classnames from 'classnames'
import Button from '../button/Button'
import TableTrContext from './TableTrContext'
import type { AvatarProps } from '../avatar/Avatar'

export type TableTdProps = {
  /**
   * Eufemia Avatar
   */
  avatar?: React.ReactElement<AvatarProps>

  /**
   * The Title
   */
  title: React.ReactNode

  /**
   * More info
   */
  info?: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

export default function TdMainCell(
  componentProps: TableTdProps &
    React.TdHTMLAttributes<HTMLTableCellElement>
) {
  const {
    className,
    title,
    avatar = null,
    info = null,

    ...props
  } = componentProps

  return (
    <td
      role="cell"
      className={classnames(
        'dnb-table__td',
        'dnb-table__main_cell',
        className
      )}
      {...props}
    >
      <div className="dnb-table__main_cell__inner">
        {avatar && (
          <div className="dnb-table__main_cell__avatar">{avatar}</div>
        )}
        <div className="dnb-table__main_cell__inner__wrapper">
          <span className="dnb-p dnb-table__main_cell__title">
            {title}
          </span>
          {info && (
            <span className="dnb-p dnb-table__main_cell__info">
              {info}
            </span>
          )}
        </div>
      </div>

      <TableToggleButton />
    </td>
  )
}

export function TableToggleButton(props) {
  const trContext = React.useContext(TableTrContext)
  // console.log('trContext', trContext)

  // const controlsId = trContext.hasAccordionContent
  //   ? `tr-accordion-${trContext.id}`
  //   : `tr-${trContext.id}`
  const title = trContext?.hasAccordionContent
    ? 'Toggle Details' // TODO: needs translation
    : 'Show Details' // TODO: needs translation

  // Debug
  // React.useEffect(() => {
  //   const exists = document.getElementById(controlsId)
  //   if (!exists) {
  //     console.log('does not exists', controlsId)
  //   }
  // }, [controlsId])

  // trContext.id && open ? trContext.id : undefined

  return (
    <Button
      size="small"
      icon="chevron_right"
      variant="tertiary"
      className="dnb-table__toggle-button"
      tooltip={title}
      aria-label={title}
      aria-expanded={Boolean(trContext?.trIsOpen)}
      // aria-controls={controlsId} // Because of a11y they should not be in the DOM
      on_click={trContext?.toggleOpenTr}
      bounding
      {...props}
    />
  )
}
