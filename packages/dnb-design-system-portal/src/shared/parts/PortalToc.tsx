import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import PageToc from './PageToc'
import type { PageTocItem } from './PageToc'

const CONTENT_AREA_OFFSET = 56

type TocHeading = {
  level: number
  text: string
  id: string
}

type RegisterHeadingContext = (
  key: string,
  heading: TocHeading
) => () => void

const RegisterHeadingContext =
  createContext<RegisterHeadingContext | null>(null)
const HeadingsContext = createContext<TocHeading[]>([])

export function useRegisterTocHeading({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const registerHeading = useContext(RegisterHeadingContext)
  const key = useId()
  const text = useMemo(
    () =>
      extractText(children)
        .replace(/\{#[^}]*\}/g, '')
        .trim(),
    [children]
  )

  useEffect(() => {
    if (!registerHeading || !id) {
      return
    }

    const anchorEl = document.getElementById(id)
    const headingEl = anchorEl?.closest('h1, h2, h3, h4, h5, h6')
    if (!headingEl) {
      return
    }

    return registerHeading(key, {
      level: Number(headingEl.tagName[1]),
      text,
      id,
    })
  }, [registerHeading, key, text, id])
}

export function PortalTocProvider({ children }: { children: ReactNode }) {
  const [headings, setHeadings] = useState<Map<string, TocHeading>>(
    new Map()
  )

  const registerHeading = useCallback<RegisterHeadingContext>(
    (key, heading) => {
      setHeadings((current) => new Map(current).set(key, heading))
      return () =>
        setHeadings((current) => {
          const next = new Map(current)
          next.delete(key)
          return next
        })
    },
    []
  )

  const headingList = useMemo(
    () => Array.from(headings.values()),
    [headings]
  )

  return (
    <RegisterHeadingContext.Provider value={registerHeading}>
      <HeadingsContext.Provider value={headingList}>
        {children}
      </HeadingsContext.Provider>
    </RegisterHeadingContext.Provider>
  )
}

export default function PortalToc() {
  const headingsContext = useContext(HeadingsContext)

  const tocHeadings = useMemo(
    () => headingsContext.filter(({ level }) => level >= 2 && level <= 3),
    [headingsContext]
  )

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    if (tocHeadings.length === 0) {
      return
    }

    let animationFrameId = 0

    const updateCurrent = () => {
      animationFrameId = 0

      const headingPositions = tocHeadings.map(({ id }) => {
        const anchorEl = document.getElementById(id)
        const headingEl =
          anchorEl?.closest('h1, h2, h3, h4, h5, h6') ?? anchorEl
        if (!headingEl) {
          return { top: Number.POSITIVE_INFINITY, marginTop: 0 }
        }
        return {
          top: headingEl.getBoundingClientRect().top,
          marginTop:
            parseFloat(getComputedStyle(headingEl).marginTop) || 0,
        }
      })

      setCurrentIndex(
        computeTocHighlight(
          headingPositions.map((position) => position.top),
          CONTENT_AREA_OFFSET,
          headingPositions.map((position) => position.marginTop)
        )
      )
    }

    const scheduleUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateCurrent)
      }
    }

    updateCurrent()
    window.addEventListener('scroll', scheduleUpdate, {
      passive: true,
    })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [tocHeadings])

  const items = useMemo<PageTocItem[]>(
    () =>
      tocHeadings.map(({ text, id, level }) => ({
        title: text,
        url: `#${id}`,
        level,
      })),
    [tocHeadings]
  )

  const currentUrl =
    currentIndex === null ? null : (items[currentIndex]?.url ?? null)

  return <PageToc headings={items} currentUrl={currentUrl} />
}

export function computeTocHighlight(
  headingTops: number[],
  contentAreaOffset: number,
  headingTopMargins: number[] = []
): number | null {
  if (headingTops.length === 0) {
    return null
  }

  const headingRegionTop = (index: number) =>
    headingTops[index] - (headingTopMargins[index] ?? 0)

  let currentIndex = 0
  for (let index = 0; index < headingTops.length; index++) {
    if (headingRegionTop(index) <= contentAreaOffset) {
      currentIndex = index
    }
  }

  return currentIndex
}

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return ''
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children)
  }
  return ''
}
