import { useCallback, useContext, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Button from '../button/Button'
import HeightAnimation from '../height-animation/HeightAnimation'
import SharedContext from '../../shared/Context'
import { FilterContext, FilterItemContext } from './FilterContext'
import { close } from '../../icons'
import Hr from '../../elements/Hr'

export type FilterPanelProps = {
  className?: string
  children?: ReactNode
}

function FilterPanel({ className, children }: FilterPanelProps) {
  const context = useContext(FilterContext)
  const sharedContext = useContext(SharedContext)
  const { hideFilterLabel, applyFilterLabel, cancelFilterLabel } =
    sharedContext.getTranslation({}).Filter

  if (!context) {
    throw new Error('Filter.Panel must be used inside a Filter.Root.')
  }

  const {
    panelOpen,
    setPanelOpen,
    behavior,
    panelButtonRef,
    revertFilters,
    commitFilters,
  } = context

  const isManual = behavior === 'manual'

  const handleClose = useCallback(() => {
    if (isManual) {
      revertFilters()
    }
    setPanelOpen(false)
    panelButtonRef.current?.focus()
  }, [isManual, revertFilters, setPanelOpen, panelButtonRef])

  const handleApply = useCallback(() => {
    commitFilters()
    setPanelOpen(false)
    panelButtonRef.current?.focus()
  }, [commitFilters, setPanelOpen, panelButtonRef])

  const panelDivRef = useRef<HTMLDivElement>(null)

  const itemContextValue = useMemo(() => ({ panelRef: panelDivRef }), [])

  return (
    <HeightAnimation open={panelOpen}>
      <FilterItemContext value={itemContextValue}>
        <div
          ref={panelDivRef}
          className={clsx('dnb-filter__panel', className)}
        >
          {children}

          <Hr className="dnb-filter__hr" space={0} />

          {isManual ? (
            <div className="dnb-filter__panel-actions">
              <Button variant="primary" onClick={handleApply}>
                {applyFilterLabel}
              </Button>
              <Button variant="tertiary" onClick={handleClose}>
                {cancelFilterLabel}
              </Button>
            </div>
          ) : (
            <Button
              variant="tertiary"
              icon={close}
              iconPosition="left"
              onClick={handleClose}
              className="dnb-filter__panel-close"
            >
              {hideFilterLabel}
            </Button>
          )}
        </div>
      </FilterItemContext>
    </HeightAnimation>
  )
}

export default FilterPanel
