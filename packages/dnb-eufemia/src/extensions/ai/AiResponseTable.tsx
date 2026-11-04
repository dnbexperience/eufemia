import { useId, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import Table from '../../components/Table'
import P from '../../elements/P'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from './hooks/useTranslation'

export default function AiResponseTable({
  children,
}: {
  children: ReactElement<HTMLTableElement>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const hintId = useId()
  const [overflows, setOverflows] = useState(false)
  const translation = useTranslation().Ai

  useLayoutEffect(() => {
    const scroll = ref.current
    const measure = () =>
      setOverflows(scroll.scrollWidth > scroll.clientWidth + 1)
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(scroll)
    if (scroll.firstElementChild) {
      observer.observe(scroll.firstElementChild)
    }
    return () => observer.disconnect()
  }, [children])

  return (
    <div className="dnb-ai-response__table">
      <Table.ScrollView
        ref={ref}
        aria-describedby={overflows ? hintId : undefined}
      >
        {children}
      </Table.ScrollView>
      {overflows && (
        <P
          id={hintId}
          className="dnb-ai-response__table-hint"
          size="small"
          top="x-small"
          bottom="zero"
        >
          {translation.tableOverflow}
        </P>
      )}
    </div>
  )
}
