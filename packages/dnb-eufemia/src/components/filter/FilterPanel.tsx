import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  /**
   * Keeps closed panel content findable by the browser's find-in-page feature. Matching content opens the panel. Defaults to `false`.
   */
  openOnFind?: boolean
  children?: ReactNode
}

function FilterPanel({
  className,
  openOnFind = false,
  children,
}: FilterPanelProps) {
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
  const [contentElement, setContentElement] =
    useState<HTMLDivElement>(null)
  const [showCloseButton, setShowCloseButton] = useState(false)

  useEffect(() => {
    const panel = panelDivRef.current
    if (!panelOpen || isManual || !panel || !contentElement) {
      return undefined
    }

    const updateCloseButton = () => {
      const panelStyle = window.getComputedStyle(panel)
      const panelTop = panel.getBoundingClientRect().top
      const buttonTop =
        panelButtonRef.current?.getBoundingClientRect().top ?? panelTop
      // Measure from the toggle so scrolling does not change the result.
      const height =
        panelTop -
        buttonTop +
        contentElement.getBoundingClientRect().height +
        (parseFloat(panelStyle.paddingTop) || 0) +
        (parseFloat(panelStyle.paddingBottom) || 0)
      const needsCloseButton =
        !panelButtonRef.current || height > window.innerHeight

      if (
        !needsCloseButton &&
        document.activeElement ===
          panel.querySelector('.dnb-filter__panel-close')
      ) {
        panelButtonRef.current?.focus()
      }
      setShowCloseButton(needsCloseButton)
    }

    updateCloseButton()
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateCloseButton)
        : undefined
    observer?.observe(contentElement)
    window.addEventListener('resize', updateCloseButton)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateCloseButton)
    }
  }, [panelOpen, isManual, contentElement, panelButtonRef])

  const itemContextValue = useMemo(() => ({ panelRef: panelDivRef }), [])

  return (
    <HeightAnimation
      open={panelOpen}
      openOnFind={openOnFind}
      onBeforeMatch={() => setPanelOpen(true)}
    >
      <FilterItemContext value={itemContextValue}>
        <div
          ref={panelDivRef}
          className={clsx('dnb-filter__panel', className)}
        >
          <div
            ref={setContentElement}
            className="dnb-filter__panel-content"
          >
            {children}
          </div>

          {(isManual || showCloseButton) && (
            <Hr className="dnb-filter__hr" space={0} />
          )}

          {isManual ? (
            <div className="dnb-filter__panel-actions">
              <Button variant="primary" onClick={handleApply}>
                {applyFilterLabel}
              </Button>
              <Button
                variant="tertiary"
                icon={false}
                onClick={handleClose}
              >
                {cancelFilterLabel}
              </Button>
            </div>
          ) : showCloseButton ? (
            <Button
              variant="tertiary"
              icon={close}
              iconPosition="left"
              onClick={handleClose}
              className="dnb-filter__panel-close"
            >
              {hideFilterLabel}
            </Button>
          ) : null}
        </div>
      </FilterItemContext>
    </HeightAnimation>
  )
}

export default FilterPanel
