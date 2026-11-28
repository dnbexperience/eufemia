import { isValidElement, useMemo, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { applyPageFocus } from '../../shared/helpers'
import useMediaQuery from '../../shared/useMediaQuery'
import BreadcrumbItem from './BreadcrumbItem'
import type { BreadcrumbItemProps } from './BreadcrumbItem'
import BreadcrumbItemContext from './BreadcrumbItemContext'

type Item = {
  key: string
  element: ReactElement<BreadcrumbItemProps>
  itemNo: number
  motion?: 'enter' | 'exit'
}

type Props = {
  data?: Array<BreadcrumbItemProps>
  items?:
    | ReactElement<BreadcrumbItemProps>
    | Array<ReactElement<BreadcrumbItemProps>>
}

export default function BreadcrumbList({ data, items }: Props) {
  const current = useMemo(() => {
    const elements = [
      ...(data?.map((props, i) => (
        <BreadcrumbItem
          key={i}
          variant={
            (i === 0 && 'home') ||
            (i === data.length - 1 && 'current') ||
            null
          }
          {...props}
        />
      )) ?? []),
      ...(Array.isArray(items) ? items : [items]).filter(
        isValidElement<BreadcrumbItemProps>
      ),
    ]

    const occurrences = new Map<string, number>()

    return elements.map((element, itemNo): Item => {
      const { href, to, text } = element.props
      const isData = itemNo < (data?.length ?? 0)
      const identity = JSON.stringify([
        isData ? 'data' : 'child',
        (!isData ? element.key : undefined) ??
          href ??
          (typeof to === 'string' ? to : undefined) ??
          (typeof text === 'string' ? text : itemNo),
      ])
      const occurrence = occurrences.get(identity) ?? 0
      occurrences.set(identity, occurrence + 1)

      return {
        key: identity + ':' + occurrence,
        element,
        itemNo,
      }
    })
  }, [data, items])

  const reducedMotion = useMediaQuery({
    query: '(prefers-reduced-motion: reduce)',
  })
  const [retained, setRetained] = useState(current)
  const previous = useRef(current)
  const previousReducedMotion = useRef(reducedMotion)
  const latest = useRef(current)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const listRef = useRef<HTMLOListElement>(null)
  const focusedElement = useRef<HTMLElement>(null)
  const restoreFocus = useRef(false)

  useLayoutEffect(() => {
    latest.current = current
    if (
      previousReducedMotion.current === reducedMotion &&
      previous.current.length === current.length &&
      previous.current.every(
        ({ key, element }, i) =>
          key === current[i].key &&
          element.props.variant === current[i].element.props.variant
      )
    ) {
      return
    }
    previous.current = current
    previousReducedMotion.current = reducedMotion
    clearTimeout(timer.current)
    restoreFocus.current = Boolean(
      listRef.current?.contains(document.activeElement) ||
      (focusedElement.current && !focusedElement.current.isConnected)
    )

    setRetained((old) => {
      const next = current.map((item): Item => {
        const existing = old.find(({ key }) => key === item.key)
        return {
          ...item,
          motion: reducedMotion
            ? undefined
            : !existing || existing.motion === 'exit'
              ? 'enter'
              : existing.motion,
        }
      })

      if (!reducedMotion) {
        old.forEach((item, index) => {
          if (!current.some(({ key }) => key === item.key)) {
            next.splice(index, 0, { ...item, motion: 'exit' })
          }
        })
      }
      return next
    })

    if (!reducedMotion) {
      // Settle hidden lists too, where no animation may run.
      timer.current = setTimeout(() => setRetained(latest.current), 180)
    }
  }, [current, reducedMotion])

  useLayoutEffect(() => {
    if (restoreFocus.current) {
      restoreFocus.current = false
      if (
        document.activeElement === document.body ||
        document.activeElement?.closest('[inert]')
      ) {
        const target = listRef.current?.querySelector<HTMLElement>(
          '[aria-current="page"]'
        )
        if (target) {
          applyPageFocus(target)
        }
      }
    }
  }, [retained])

  useLayoutEffect(() => () => clearTimeout(timer.current), [])

  return (
    <ol
      ref={listRef}
      className="dnb-breadcrumb__list"
      onFocusCapture={(event) => {
        focusedElement.current = event.target as HTMLElement
      }}
      onBlurCapture={() => {
        focusedElement.current = null
      }}
    >
      {retained.map((item) => {
        const { key, element, itemNo } =
          current.find(({ key }) => key === item.key) ?? item
        return (
          <BreadcrumbItemContext
            key={key}
            value={{ itemNo, animate: true, motion: item.motion }}
          >
            {element}
          </BreadcrumbItemContext>
        )
      })}
    </ol>
  )
}
