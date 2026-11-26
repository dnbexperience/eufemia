import { isValidElement, useMemo, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
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
  const listRef = useRef<HTMLOListElement>(null)
  const restoreFocus = useRef(false)

  useLayoutEffect(() => {
    if (previous.current === current) {
      return
    }
    previous.current = current
    restoreFocus.current = listRef.current?.contains(
      document.activeElement
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
  }, [current, reducedMotion])

  useLayoutEffect(() => {
    if (restoreFocus.current) {
      restoreFocus.current = false
      if (
        document.activeElement === document.body ||
        document.activeElement?.closest('[inert]')
      ) {
        listRef.current
          ?.querySelector<HTMLElement>('[aria-current="page"]')
          ?.focus()
      }
    }
  }, [retained])

  useLayoutEffect(() => {
    if (!retained.some(({ motion }) => motion)) {
      return undefined
    }

    if (reducedMotion) {
      setRetained(current)
      return undefined
    }

    // Settle hidden lists too, where no animation may run.
    const timer = setTimeout(() => setRetained(current), 180)
    return () => clearTimeout(timer)
  }, [retained, current, reducedMotion])

  return (
    <ol ref={listRef} className="dnb-breadcrumb__list">
      {retained.map(({ key, element, itemNo, motion }) => (
        <BreadcrumbItemContext
          key={key}
          value={{ itemNo, animate: true, motion }}
        >
          {element}
        </BreadcrumbItemContext>
      ))}
    </ol>
  )
}
