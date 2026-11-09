import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { clsx } from 'clsx'
import Autocomplete from '../autocomplete/Autocomplete'
import Popover from '../popover/Popover'
import type { PopoverProps } from '../popover/types'
import type { SearchAutocompleteProps } from './SearchAutocomplete'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useSearchProps from './useSearchProps'

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
    popoverProps,
    inputRef,
    align = 'left',
    ...props
  } = useSearchProps(localProps, {
    preventSelection: true,
    keepValue: true,
    noScrollAnimation: true,
    openOnFocus: true,
  })
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
    <Autocomplete
      {...props}
      inputRef={setInputRef}
      resultsRender={({ results, open, close, resultsRef }) => (
        <SearchPanelSurface
          {...popoverProps}
          className={clsx('dnb-search__panel', popoverProps?.className)}
          inputRef={targetRef}
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
          <span className="dnb-search__panel-content" role="presentation">
            {children ? children({ results, close }) : results}
          </span>
        </SearchPanelSurface>
      )}
    />
  )
}

function SearchPanelSurface({
  inputRef,
  ...props
}: PopoverProps & {
  inputRef: RefObject<HTMLInputElement>
  contentRef: RefObject<HTMLSpanElement>
}) {
  const { open, contentRef } = props

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
        }
      }

      if (next) {
        event.preventDefault()
        next.focus()
      }
    }

    const ownerDocument = inputRef.current?.ownerDocument
    ownerDocument?.addEventListener('keydown', onKeyDown)
    return () => ownerDocument?.removeEventListener('keydown', onKeyDown)
  }, [open, inputRef, contentRef])

  return <Popover {...props} />
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
