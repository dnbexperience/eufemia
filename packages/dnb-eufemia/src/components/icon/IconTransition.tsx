import { cloneElement } from 'react'
import type { IconFunction, IconSVGProps } from './Icon'

type Point = { cmd: string; x: number; y: number }

/** True when the browser supports the CSS `d` property (Safari does not). */
const supportsCssDProperty =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('d: path("M0 0")')

// Creates a morphable icon that transitions between SVG icon states via CSS `d` interpolation.
// When the paths are structurally incompatible or CSS `d` is unsupported,
// it falls back to stacked SVGs with a transform/opacity crossfade.
export function transition(
  states: Record<string, IconFunction>
): IconFunction {
  const entries = Object.entries(states)
  const [defaultName, defaultIcon] = entries[0]
  const defaultPoints = parsePath(extractPathD(defaultIcon))

  const isCompatible =
    transition.isSupported &&
    defaultPoints.length > 0 &&
    entries.every(([name, icon]) => {
      const d = extractPathD(icon)

      if (!isFullyParseable(d)) {
        return false
      }

      if (name === defaultName) {
        return true
      }

      const points = parsePath(d)
      return points.length === defaultPoints.length
    })

  if (!isCompatible) {
    return createFallbackTransition(entries, defaultName)
  }

  const style: Record<string, string> = {}

  for (const [name, icon] of entries) {
    const points =
      name === defaultName
        ? defaultPoints
        : alignPath(defaultPoints, parsePath(extractPathD(icon)))

    style[`--icon-transition-${name}`] =
      `path('${pointsToString(points)}')`
  }

  style['--icon-transition-default'] =
    `var(--icon-transition-${defaultName})`

  const iconFn: IconFunction = (props?: IconSVGProps) => defaultIcon(props)
  iconFn.__iconTransitionStyle = style
  Object.defineProperty(iconFn, 'name', { value: defaultIcon.name })

  return iconFn
}

/** Fallback: renders all SVGs stacked, toggling visibility via class. */
function createFallbackTransition(
  entries: Array<[string, IconFunction]>,
  defaultName: string
): IconFunction {
  const iconFn: IconFunction = (props?: IconSVGProps) => (
    <>
      {entries.map(([name, iconRenderer]) => {
        const element = iconRenderer(props)
        return cloneElement(
          element as React.ReactElement<Record<string, unknown>>,
          {
            key: name,
            'data-icon-state': name,
            ...(name === defaultName
              ? { className: 'dnb-icon__state--active' }
              : {}),
          }
        )
      })}
    </>
  )

  iconFn.__iconTransitionFallback = true
  Object.defineProperty(iconFn, 'name', {
    value: entries[0][1].name,
  })

  return iconFn
}

/**
 * Activates a named transition state on an icon element.
 * Works for both d-interpolation and fallback transitions.
 */
transition.activate = (element: HTMLElement, state: string) => {
  if (element.classList.contains('dnb-icon--transition-fallback')) {
    element.querySelectorAll('svg[data-icon-state]').forEach((svg) => {
      svg.classList.toggle(
        'dnb-icon__state--active',
        (svg as SVGElement).dataset.iconState === state
      )
    })
  } else {
    element.style.setProperty(
      '--icon-transition',
      `var(--icon-transition-${state})`
    )
  }
}

/**
 * Runs a callback with all CSS transitions disabled on the element
 * and its SVG children, then restores them after a forced reflow.
 */
export function suppressTransitions(
  element: HTMLElement,
  callback: () => void
) {
  const targets = [
    element,
    ...Array.from(element.querySelectorAll<SVGElement>('svg, svg path')),
  ]

  for (const el of targets) {
    el.style.setProperty('transition', 'none')
  }

  callback()

  // Force reflow so the state change is committed without transitions
  element.getBoundingClientRect()

  for (const el of targets) {
    el.style.removeProperty('transition')
  }
}

transition.isSupported = supportsCssDProperty

function extractPathD(iconFn: IconFunction): string {
  const svg = iconFn() as React.ReactElement<
    React.SVGProps<SVGSVGElement> & {
      children?: React.ReactElement<{ d?: string }>
    }
  >

  return svg.props.children?.props?.d
}

/** Returns true when every command in the path is one parsePath handles (M/L/H/V). */
function isFullyParseable(d: string | undefined): boolean {
  if (!d) {
    return false
  }

  const parts = d.match(/[a-zA-Z][^a-zA-Z]*/g) || []
  return parts.every((part) => 'mlhvMLHV'.includes(part[0]))
}

/** Parses an SVG path `d` string into absolute M/L points. */
function parsePath(d: string | undefined): Point[] {
  if (!d) {
    return []
  }

  const parts = d.match(/[a-zA-Z][^a-zA-Z]*/g) || []
  const points: Point[] = []
  let x = 0
  let y = 0

  for (const part of parts) {
    const command = part[0]
    const type = command.toLowerCase()
    const numbers = Array.from(
      part.slice(1).matchAll(/-?\d*\.?\d+/g),
      (match) => Number(match[0])
    )
    const isRelative = command === type
    const resolve = (current: number, value: number) =>
      isRelative ? current + value : value

    if (type === 'm' || type === 'l') {
      for (let i = 0; i < numbers.length; i += 2) {
        x = resolve(x, numbers[i])
        y = resolve(y, numbers[i + 1])
        points.push({
          cmd: i === 0 && type === 'm' ? 'M' : 'L',
          x,
          y,
        })
      }
    } else if (type === 'h') {
      x = resolve(x, numbers[0])
      points.push({ cmd: 'L', x, y })
    } else if (type === 'v') {
      y = resolve(y, numbers[0])
      points.push({ cmd: 'L', x, y })
    }
  }

  return points
}

function pointsToString(points: Point[]): string {
  return points
    .map((point) => `${point.cmd}${point.x} ${point.y}`)
    .join(' ')
}

function squaredDistance(pointsA: Point[], pointsB: Point[]): number {
  return pointsA.reduce(
    (sum, point, i) =>
      sum + (point.x - pointsB[i].x) ** 2 + (point.y - pointsB[i].y) ** 2,
    0
  )
}

/** Reverses subpath point order when it reduces squared distance to the reference. */
function alignPath(reference: Point[], target: Point[]): Point[] {
  if (reference.length !== target.length || reference.length === 0) {
    return target
  }

  // Split into subpaths (each starting with M)
  const subpaths: Array<[Point[], Point[]]> = []

  for (let i = 0; i < reference.length; i++) {
    if (reference[i].cmd === 'M') {
      subpaths.push([[], []])
    }

    subpaths[subpaths.length - 1][0].push(reference[i])
    subpaths[subpaths.length - 1][1].push(target[i])
  }

  return subpaths.flatMap(([referenceSubpath, targetSubpath]) => {
    const reversed = [...targetSubpath].reverse().map((point, index) => ({
      ...point,
      cmd: index === 0 ? 'M' : 'L',
    }))

    return squaredDistance(referenceSubpath, reversed) <
      squaredDistance(referenceSubpath, targetSubpath)
      ? reversed
      : targetSubpath
  })
}
