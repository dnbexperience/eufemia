import { useCallback, useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import { clsx } from 'clsx'
import Autocomplete from '../autocomplete/Autocomplete'
import Popover from '../popover/Popover'
import type { PopoverProps } from '../popover/types'
import type { SearchAutocompleteProps } from './SearchAutocomplete'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { combineDescribedBy } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import useSearchProps from './useSearchProps'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

const interactiveSelector =
  'a[href], button, input, select, textarea, label, summary, [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'

export type SearchPanelContentProps = {
  results: ReactNode
  close: () => void
}

export type SearchPanelProps = Omit<
  SearchAutocompleteProps,
  | 'inline'
  | 'resultsRender'
  | 'skipPortal'
  | 'preventClose'
  | 'children'
  | 'align'
> & {
  /** Describe the panel's results and controls, including how to reach them. */
  panelDescription: string
  /** Align the results surface with the input. Defaults to `left`. */
  align?: 'left' | 'center' | 'right'
  /** Place the inline results alongside custom controls outside the listbox. */
  children?: (props: SearchPanelContentProps) => ReactNode
  /** Configure the position and appearance of the results surface. */
  popoverProps?: Pick<
    PopoverProps,
    | 'placement'
    | 'triggerOffset'
    | 'autoAlignMode'
    | 'className'
    | 'noAnimation'
  >
}

function SearchPanel(localProps: SearchPanelProps) {
  const {
    children,
    panelDescription,
    popoverProps,
    inputRef,
    minHeight = 10,
    maxHeight,
    align = 'left',
    ...props
  } = useSearchProps(localProps, {
    preventSelection: true,
    keepValue: true,
    openOnFocus: true,
  })
  const descriptionId = `${useId()}-panel-description`
  const triggerOffset = popoverProps?.triggerOffset ?? 8
  const targetRef = useRef<HTMLInputElement>(null)
  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      targetRef.current = element
      if (typeof inputRef === 'function') {
        inputRef(element)
      } else if (inputRef) {
        inputRef.current = element
      }
    },
    [inputRef]
  )

  return (
    <>
      <Autocomplete
        {...props}
        maxHeight={0}
        aria-describedby={combineDescribedBy(props, descriptionId)}
        inputRef={setInputRef}
        resultsRender={({ results, open, close, resultsRef }) => (
          <SearchPanelSurface
            {...popoverProps}
            className={clsx('dnb-search__panel', popoverProps?.className)}
            inputRef={targetRef}
            minHeight={minHeight}
            maxHeight={maxHeight}
            contentRef={resultsRef}
            triggerOffset={triggerOffset}
            targetElement={targetRef}
            alignOnTarget={align}
            arrowPosition={align}
            arrowEdgeOffset={0}
            horizontalOffset={
              align === 'left'
                ? triggerOffset
                : align === 'right'
                  ? -triggerOffset
                  : 0
            }
            open={open && !props.disabled}
            preventClose
            restoreFocus={false}
            focusOnOpen={false}
            disableFocusTrap
            closeButtonProps={{
              onClick: (event) => {
                event.preventDefault()
                close()
              },
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && !event.defaultPrevented) {
                event.preventDefault()
                event.stopPropagation()
                close()
              }
            }}
            hideArrow
            noInnerSpace
            noMaxWidth
            omitDescribedBy
          >
            <span
              className="dnb-search__panel-content"
              role="presentation"
              onMouseDown={(event) => {
                // Keep focus, typing and result navigation in the input.
                if (
                  !(event.target as Element).closest(interactiveSelector)
                ) {
                  event.preventDefault()
                }
              }}
            >
              {children ? children({ results, close }) : results}
            </span>
          </SearchPanelSurface>
        )}
      />
      <span id={descriptionId} className="dnb-sr-only">
        {panelDescription}
      </span>
    </>
  )
}

function SearchPanelSurface({
  inputRef,
  minHeight,
  maxHeight,
  ...props
}: PopoverProps & {
  inputRef: RefObject<HTMLInputElement>
  contentRef: RefObject<HTMLSpanElement>
  minHeight?: SearchPanelProps['minHeight']
  maxHeight?: SearchPanelProps['maxHeight']
}) {
  const { open, contentRef } = props

  useIsomorphicLayoutEffect(() => {
    const surface = contentRef.current
    if (!open || !surface) {
      return undefined
    }

    const results = surface.querySelector<HTMLElement>('[role="listbox"]')
    const content = surface.querySelector<HTMLElement>(
      '.dnb-search__panel-content'
    )
    if (!results || !content) {
      return undefined
    }

    const updateHeight = () => {
      const reservedHeight = Math.max(
        0,
        content.offsetHeight - results.offsetHeight
      )
      surface.style.setProperty(
        '--search-panel-reserved-height',
        reservedHeight + 'px'
      )
    }
    updateHeight()
    if (typeof ResizeObserver === 'undefined') {
      return undefined
    }
    const observer = new ResizeObserver(updateHeight)
    observer.observe(content)
    observer.observe(results)
    return () => observer.disconnect()
  }, [open, contentRef, props.children])

  useEffect(() => {
    const input = inputRef.current
    if (!open || !input) {
      return undefined
    }

    // Wrapped controls can require scrolling the surface as well as the list.
    const revealResults = () => {
      if (!input.getAttribute('aria-activedescendant')) {
        return
      }
      const content = contentRef.current?.querySelector<HTMLElement>(
        '.dnb-popover__content'
      )
      const results = content?.querySelector('[role="listbox"]')
      if (content && results) {
        const viewport = content.getBoundingClientRect()
        const list = results.getBoundingClientRect()
        const offset =
          list.bottom > viewport.bottom
            ? list.bottom - viewport.bottom
            : list.top < viewport.top
              ? list.top - viewport.top
              : 0
        content.scrollTop += offset
      }
    }
    revealResults()
    const observer = new MutationObserver(revealResults)
    observer.observe(input, {
      attributes: true,
      attributeFilter: ['aria-activedescendant'],
    })
    return () => observer.disconnect()
  }, [open, inputRef, contentRef, props.children])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    // Keep Tab order beside the input even though the surface is portaled.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented) {
        return
      }

      const input = inputRef.current
      const surface = contentRef.current
      if (!input || !surface) {
        return
      }

      const controls = getTabbableElements(surface)
      let next: HTMLElement | undefined
      if (event.target === input && !event.shiftKey) {
        next = controls[0]
      } else if (surface.contains(event.target as Node)) {
        const index = controls.indexOf(event.target as HTMLElement)
        if (event.shiftKey && index === 0) {
          next = input
        } else if (!event.shiftKey && index === controls.length - 1) {
          const pageControls = getTabbableElements(
            input.ownerDocument
          ).filter((element) => !surface.contains(element))
          const inputIndex = pageControls.indexOf(input)
          next = pageControls
            .slice(inputIndex + 1)
            .find(
              (element) => !input.closest('.dnb-search')?.contains(element)
            )
        } else {
          next = controls[index + (event.shiftKey ? -1 : 1)]
        }
      }

      if (next) {
        event.preventDefault()
        next.focus({
          preventScroll: next === input || surface.contains(next),
        })
      }
    }

    const ownerDocument = inputRef.current?.ownerDocument
    ownerDocument?.addEventListener('keydown', onKeyDown)
    return () => ownerDocument?.removeEventListener('keydown', onKeyDown)
  }, [open, inputRef, contentRef])

  const heightLimit = parseFloat(String(maxHeight))
  const style = {
    '--search-panel-min-height':
      Math.max(0, parseFloat(String(minHeight)) || 0) + 'rem',
    '--search-panel-max-height':
      heightLimit > 0 ? heightLimit + 'rem' : undefined,
  } as CSSProperties

  return <Popover {...props} style={style} />
}

function getTabbableElements(root: ParentNode) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"], summary'
    )
  ).filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.matches(':disabled') &&
      !element.closest('[hidden], [inert]') &&
      (element.checkVisibility?.({ checkVisibilityCSS: true }) ?? true)
  )
}

withComponentMarkers(SearchPanel, {
  _formElement: true,
})

export default SearchPanel
