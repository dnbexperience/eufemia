import { useCallback, useContext, useEffect, useRef } from 'react'
import Button from '../button/Button'
import type {
  ButtonProps,
  ButtonOnClick,
  ButtonClickEvent,
} from '../button/Button'
import { FilterContext } from './FilterContext'
import { filter as filterIcon, close } from '../../icons'
import Icon from '../icon/Icon'
import SharedContext from '../../shared/Context'

const panelToggleIcon = Icon.transition({
  closed: filterIcon,
  open: close,
})

export type FilterPanelButtonProps = Omit<
  ButtonProps,
  | 'variant'
  | 'icon'
  | 'iconPosition'
  | 'transitionState'
  | 'aria-expanded'
  | 'onClick'
> & {
  onClick?: (event: ButtonClickEvent) => void
}

function FilterPanelButton({
  children,
  onClick,
  ...rest
}: FilterPanelButtonProps) {
  const context = useContext(FilterContext)
  const sharedContext = useContext(SharedContext)
  const { panelButtonLabel } = sharedContext.getTranslation({}).Filter

  if (!context) {
    throw new Error(
      'Filter.PanelButton must be used inside a Filter.Root.'
    )
  }

  const { panelOpen, setPanelOpen, panelButtonRef } = context
  const localRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    panelButtonRef.current = localRef.current
  }, [panelButtonRef])

  const handleClick: ButtonOnClick = useCallback(
    (event: ButtonClickEvent) => {
      setPanelOpen(!panelOpen)
      onClick?.(event)
    },
    [panelOpen, setPanelOpen, onClick]
  )

  return (
    <Button
      variant="tertiary"
      icon={panelToggleIcon}
      iconPosition="left"
      transitionState={panelOpen ? 'open' : 'closed'}
      aria-expanded={panelOpen}
      ref={localRef}
      onClick={handleClick}
      {...rest}
    >
      {children ?? panelButtonLabel}
    </Button>
  )
}

export default FilterPanelButton
