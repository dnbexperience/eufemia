import { useCallback, useEffect } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import useId from '../../shared/helpers/useId'
import { useSharedState } from '../../shared/helpers/useSharedState'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import AccordionTertiaryContent from './AccordionTertiaryContent'
import type { AccordionTertiarySharedState } from './AccordionTertiaryContent'
import { chevron_down, chevron_up } from '../../icons'
import Icon from '../icon/Icon'

const chevronIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})

export type AccordionTertiaryProps = Omit<
  ButtonProps,
  'variant' | 'children' | 'onClick'
> & {
  /**
   * A title as a string or React element. It will be used as the button text.
   */
  title?: ReactNode

  /**
   * Use `true` or `false` to control the expanded/collapsed state of the accordion.
   */
  expanded?: boolean

  /**
   * If set to `true`, the open and close animation will be omitted.
   */
  noAnimation?: boolean

  /**
   * If set to `true`, the content remains mounted when collapsed.
   */
  keepInDOM?: boolean

  /**
   * If set to `true`, collapsed content remains findable by the browser's find-in-page feature.
   */
  openOnFind?: boolean

  /**
   * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, event }`.
   */
  onChange?: (event: {
    expanded: boolean
    event: MouseEvent | Event
  }) => void

  children?: ReactNode
}

export type { AccordionTertiarySharedState } from './AccordionTertiaryContent'

function shouldFocusContentFromClick(event: MouseEvent) {
  if (event.detail === 0) {
    return true
  }

  const { documentElement } = document

  return documentElement.getAttribute('data-whatinput') === 'keyboard'
}

export default function AccordionTertiary(props: AccordionTertiaryProps) {
  const {
    title,
    expanded: expandedProp,
    noAnimation,
    openOnFind: openOnFindProp,
    keepInDOM,
    className,
    children,
    onChange,
    icon = chevronIcon,
    iconPosition,
    ...rest
  } = props
  const openOnFind = openOnFindProp ?? keepInDOM

  const id = useId(props.id)
  const contentId = `${id}-content`

  const { data, set } = useSharedState<AccordionTertiarySharedState>(id, {
    expanded: expandedProp ?? false,
  })

  useEffect(() => {
    if (expandedProp !== undefined) {
      set({ expanded: expandedProp, shouldFocusContent: false })
    }
  }, [expandedProp, set])

  const expanded = data?.expanded ?? false
  const shouldFocusContent = data?.shouldFocusContent ?? false

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const next = !expanded
      set({
        expanded: next,
        shouldFocusContent: next && shouldFocusContentFromClick(event),
      })
      onChange?.({ expanded: next, event })
    },
    [expanded, set, onChange]
  )

  const handleBeforeMatch = useCallback(
    (event: Event) => {
      if (!expanded) {
        set({ expanded: true, shouldFocusContent: false })
        onChange?.({ expanded: true, event })
      }
    },
    [expanded, onChange, set]
  )

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-accordion',
      'dnb-accordion__variant--tertiary',
      expanded && 'dnb-accordion--expanded',
      className
    ),
  })

  const WrapperElement = children ? 'div' : 'span'

  return (
    <WrapperElement {...mainParams}>
      <Button
        {...rest}
        variant="tertiary"
        icon={icon}
        iconPosition={iconPosition ?? 'left'}
        transitionState={expanded ? 'expanded' : 'collapsed'}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={handleClick}
        className="dnb-accordion__tertiary-button"
      >
        {title}
      </Button>

      {children && (
        <AccordionTertiaryContent
          contentId={contentId}
          expanded={expanded}
          noAnimation={noAnimation}
          shouldFocusContent={shouldFocusContent}
          onFocusHandled={() =>
            set({ ...data, shouldFocusContent: false })
          }
          openOnFind={openOnFind}
          onBeforeMatch={handleBeforeMatch}
          keepInDOM={keepInDOM}
        >
          {children}
        </AccordionTertiaryContent>
      )}
    </WrapperElement>
  )
}
