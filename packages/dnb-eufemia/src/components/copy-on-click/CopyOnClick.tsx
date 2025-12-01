/**
 * Web CopyOnClick Component
 */

import React, { useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import type { CopyOnClickAllProps } from './types'
import { runIOSSelectionFix } from '../number-format/NumberUtils'
import {
  copyToClipboard,
  hasSelectedText,
  IS_IOS,
  warn,
} from '../../shared/helpers'
import {
  combineDescribedBy,
  convertJsxToString,
  makeUniqueId,
} from '../../shared/component-helper'
import { useTranslation } from '../../shared'
import { Span } from '../../elements'
import Tooltip from '../Tooltip'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

const CopyOnClick = ({
  children,
  className = null,
  disabled = false,
  showCursor = true,
  copyContent = null,
  tooltipContent = null,
  ...props
}: CopyOnClickAllProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [active, setActive] = React.useState(false)

  useEffect(() => {
    if (IS_IOS) {
      runIOSSelectionFix()
    }
  }, [])

  const {
    CopyOnClick: { clipboard_copy },
  } = useTranslation()

  const copy = useCallback(async (str: string) => {
    const clear = () => clearInterval(timeoutRef.current)
    clear()

    try {
      const success = await copyToClipboard(str)
      if (success === true) {
        setActive(true)

        timeoutRef.current = setTimeout(() => setActive(false), 2000)
      }
    } catch (e) {
      warn(e)
    }

    return () => clear()
  }, [])

  const onClickHandler = useCallback(() => {
    if (!hasSelectedText()) {
      try {
        const str =
          convertJsxToString(copyContent || children) ||
          ref.current.textContent

        if (str) {
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(ref.current)
          selection.removeAllRanges()
          selection.addRange(range)

          copy(str)
        }
      } catch (e) {
        warn(e)
      }
    }
  }, [children, copyContent, copy])

  const { 'aria-describedby': ariaDescribedByProp, ...restProps } = props
  const params = {
    onClick: disabled ? undefined : onClickHandler,
  }
  const message = tooltipContent ?? clipboard_copy
  const sharedDescriptionId = useCopyOnClickDescription(
    typeof message === 'string' ? message : null
  )
  const ariaDescribedBy = sharedDescriptionId
    ? combineDescribedBy(
        ariaDescribedByProp
          ? { 'aria-describedby': ariaDescribedByProp }
          : null,
        { 'aria-describedby': sharedDescriptionId }
      )
    : ariaDescribedByProp

  return (
    <Span
      className={classnames(
        'dnb-copy-on-click',
        showCursor && !disabled && 'dnb-copy-on-click--cursor',
        className
      )}
      ref={ref}
      aria-describedby={ariaDescribedBy}
      {...restProps}
      {...params}
    >
      {children}
      <Tooltip
        active={active}
        targetElement={ref}
        keepInDOM={sharedDescriptionId ? false : undefined}
        omitDescribedBy={Boolean(sharedDescriptionId)}
      >
        {message}
      </Tooltip>
    </Span>
  )
}

CopyOnClick._supportsSpacingProps = true

type DescriptionEntry = {
  id: string
  refs: number
  element?: HTMLSpanElement | null
}

const descriptionRegistry: Map<string, DescriptionEntry> = new Map()
const DESCRIPTIONS_CONTAINER_ID = 'dnb-copy-on-click-descriptions'

function useCopyOnClickDescription(message: string | null) {
  const descriptionId = React.useMemo(() => {
    if (!message) {
      return null
    }
    return getOrCreateEntry(message).id
  }, [message])

  useLayoutEffect(() => {
    if (!message || !descriptionId) {
      return undefined
    }

    const entry = getOrCreateEntry(message)
    entry.refs += 1

    if (typeof document !== 'undefined') {
      entry.element = ensureDescriptionElement(entry, message)
    }

    return () => {
      entry.refs -= 1
      if (entry.refs <= 0) {
        descriptionRegistry.delete(message)
        removeDescriptionElement(entry)
      }
    }
  }, [message, descriptionId])

  return descriptionId
}

function getOrCreateEntry(message: string) {
  let entry = descriptionRegistry.get(message)
  if (!entry) {
    entry = {
      id: makeUniqueId('copy-on-click-description-'),
      refs: 0,
    }
    descriptionRegistry.set(message, entry)
  }
  return entry
}

function ensureDescriptionElement(
  entry: DescriptionEntry,
  message: string
) {
  const doc = typeof document !== 'undefined' ? document : null
  if (!doc) {
    return null
  }

  const container = ensureDescriptionContainer(doc)
  if (!container) {
    return null
  }

  let element = doc.getElementById(entry.id) as HTMLSpanElement | null
  if (!element) {
    element = doc.createElement('span')
    element.id = entry.id
    element.className = 'dnb-sr-only'
    container.appendChild(element)
  } else if (element.parentElement !== container) {
    container.appendChild(element)
  }

  element.textContent = message
  return element
}

function ensureDescriptionContainer(doc: Document) {
  let container = doc.getElementById(
    DESCRIPTIONS_CONTAINER_ID
  ) as HTMLDivElement | null

  if (!container) {
    container = doc.createElement('div')
    container.id = DESCRIPTIONS_CONTAINER_ID
    container.setAttribute('data-dnb-copy-on-click-descriptions', 'true')
    doc.body.appendChild(container)
  }

  return container
}

function removeDescriptionElement(entry: DescriptionEntry) {
  if (entry.element?.parentElement) {
    entry.element.parentElement.removeChild(entry.element)
  } else if (typeof document !== 'undefined') {
    document.getElementById(entry.id)?.remove()
  }

  entry.element = null

  if (typeof document !== 'undefined' && descriptionRegistry.size === 0) {
    document.getElementById(DESCRIPTIONS_CONTAINER_ID)?.remove()
  }
}

export default CopyOnClick
