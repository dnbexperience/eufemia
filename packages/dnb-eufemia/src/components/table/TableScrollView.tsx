import { useRef, useState } from 'react'
import type { ReactElement, TableHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import type { ScrollViewAllProps } from '../scroll-view/ScrollView'
import ScrollView from '../scroll-view/ScrollView'
import Button from '../button/Button'
import arrowRight from '../../icons/arrow_right'

import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useTranslation from '../../shared/useTranslation'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

export type TableScrollViewProps = {
  /**
   * The content of the component.
   */
  children: ReactElement<HTMLTableElement>
}

export type TableScrollViewAllProps = TableScrollViewProps &
  Omit<TableHTMLAttributes<HTMLDivElement>, 'children'> &
  SpacingProps &
  ScrollViewAllProps

export default function TableScrollView(props: TableScrollViewAllProps) {
  const { className, children, ref: refProp, ...rest } = props
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const combinedRef = useCombinedRef(refProp, ref)
  const { Table: translations } = useTranslation()

  useLayoutEffect(() => {
    const element = ref.current
    let isInView = false
    const updateIndicator = () => {
      const { clientWidth, scrollWidth, scrollLeft } = element
      const style = getComputedStyle(element)
      const max = Math.max(0, scrollWidth - clientWidth)
      const position = style.direction === 'rtl' ? -scrollLeft : scrollLeft
      if (position <= 0) {
        setTooltipDismissed(false)
      }
      const fadeDistance = Math.min(max, clientWidth / 5)
      const opacity =
        fadeDistance > 1 && style.overflowX !== 'visible'
          ? Math.max(0, 1 - Math.max(0, position) / fadeDistance) ** 2
          : 0

      if (opacity === 0 && document.activeElement === buttonRef.current) {
        element.focus({ preventScroll: true })
      }

      element.toggleAttribute('data-scroll-indicator', opacity > 0)
      if (opacity > 0 && isInView) {
        element.setAttribute('data-scroll-indicator-animate', '')
      }
      element.style.setProperty(
        '--table-scroll-indicator-opacity',
        String(opacity)
      )
    }

    updateIndicator()
    element.addEventListener('scroll', updateIndicator, { passive: true })

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateIndicator)
        : undefined
    observer?.observe(element)
    Array.from(element.children).forEach((child) => {
      if (!child.classList.contains('dnb-table__scroll-indicator')) {
        observer?.observe(child)
      }
    })
    window.addEventListener('resize', updateIndicator)
    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            isInView = entry.isIntersecting
            updateIndicator()
          })
        : undefined
    intersectionObserver?.observe(buttonRef.current)

    return () => {
      observer?.disconnect()
      intersectionObserver?.disconnect()
      element.removeEventListener('scroll', updateIndicator)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [children])

  return (
    <ScrollView
      ref={combinedRef}
      className={clsx('dnb-table__scroll-view', className)}
      interactive="auto"
      {...rest}
    >
      {children}
      <Button
        ref={buttonRef}
        className="dnb-table__scroll-indicator"
        icon={arrowRight}
        size="small"
        aria-label={translations.scrollButtonSR}
        tooltip={
          tooltipDismissed ? undefined : translations.scrollButtonSR
        }
        onClick={() => {
          setTooltipDismissed(true)
          const element = ref.current
          const direction =
            getComputedStyle(element).direction === 'rtl' ? -1 : 1
          element.focus({ preventScroll: true })
          element.scrollBy({
            left: direction * element.clientWidth * 0.8,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }}
      />
    </ScrollView>
  )
}

withComponentMarkers(TableScrollView, { _supportsSpacingProps: true })
