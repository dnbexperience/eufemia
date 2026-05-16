import { useCallback, useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import clsx from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import useId from '../../shared/helpers/useId'
import { useSharedState } from '../../shared/helpers/useSharedState'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import HeightAnimation from '../height-animation/HeightAnimation'
import { chevron_down } from '../../icons'

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
   * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, event }`.
   */
  onChange?: (event: { expanded: boolean; event: MouseEvent }) => void

  children?: ReactNode
}

export type AccordionTertiarySharedState = {
  expanded: boolean
  userInteracted?: boolean
}

export default function AccordionTertiary(props: AccordionTertiaryProps) {
  const {
    title,
    expanded: expandedProp,
    noAnimation,
    className,
    children,
    onChange,
    icon = chevron_down,
    iconPosition,
    ...rest
  } = props

  const id = useId(props.id)
  const contentId = `${id}-content`

  const { data, set } = useSharedState<AccordionTertiarySharedState>(id, {
    expanded: expandedProp ?? false,
  })

  useEffect(() => {
    if (expandedProp !== undefined) {
      set({ expanded: expandedProp, userInteracted: false })
    }
  }, [expandedProp, set])

  const expanded = data?.expanded ?? false
  const userInteracted = data?.userInteracted ?? false
  const contentRef = useRef<HTMLElement>(null)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const next = !expanded
      set({ expanded: next, userInteracted: true })
      onChange?.({ expanded: next, event })
    },
    [expanded, set, onChange]
  )

  const handleContentOpen = useCallback(() => {
    if (userInteracted && contentRef.current) {
      contentRef.current.focus({ preventScroll: true })
      set({ ...data, userInteracted: false })
    }
  }, [userInteracted, data, set])

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-accordion',
      'dnb-accordion__variant--tertiary',
      expanded && 'dnb-accordion--expanded',
      className
    ),
  })

  return (
    <div {...mainParams}>
      <Button
        {...rest}
        variant="tertiary"
        icon={icon}
        iconPosition={iconPosition ?? 'left'}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={handleClick}
        className="dnb-accordion__tertiary-button"
      >
        {title}
      </Button>

      {children && (
        <HeightAnimation
          open={expanded}
          animate={!noAnimation}
          keepInDOM
          element="section"
          ref={contentRef}
          id={contentId}
          className="dnb-accordion__tertiary-content"
          onOpen={handleContentOpen}
          tabIndex={-1}
        >
          {children}
        </HeightAnimation>
      )}
    </div>
  )
}
