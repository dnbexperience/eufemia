import { useContext, useEffect, useSyncExternalStore } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import { isMac } from '../../shared/helpers'
import type { SearchProps } from './types'
import type { AutocompleteAllProps } from '../autocomplete/Autocomplete'

/** Asynchronous results are already filtered by their source. */
export function getSearchOptions({
  mode,
  search,
}: Pick<AutocompleteAllProps, 'mode' | 'search'>) {
  return mode === 'async' ? { filter: false, ...search } : search
}

const searchDefaultProps: Partial<SearchProps> = {
  variant: 'default',
  shortcut: false,
  size: 'medium',
  labelSrOnly: true,
  showClearButton: true,
}

const subscribeToPlatform = () => () => undefined
const getServerPlatform = () => null

// Autocomplete injects trigger props, so keep them off the native element.
function ShortcutHint({ mac }: { mac: boolean | null }) {
  return mac !== null ? (
    <kbd className="dnb-search__shortcut" aria-hidden="true">
      {mac ? '⌘ K' : 'Ctrl K'}
    </kbd>
  ) : null
}

export default function useSearchProps<Props extends SearchProps>(
  localProps: Props,
  defaults: Partial<Props>
) {
  const context = useContext(Context)
  const mac = useSyncExternalStore(
    subscribeToPlatform,
    isMac,
    getServerPlatform
  )
  const { variant, shortcut, className, ...props } =
    extendPropsWithContext(
      Object.fromEntries(
        Object.entries(localProps).filter(
          ([, value]) => value !== undefined
        )
      ) as Props,
      { ...searchDefaultProps, ...defaults },
      context.getTranslation(localProps).Search,
      context.Search
    )

  useEffect(() => {
    if (!shortcut || props.disabled) {
      return undefined
    }

    let shortcutFocus: {
      input: HTMLInputElement
      origin: Element
    } | null = null

    const onFocusOut = (event: FocusEvent) => {
      if (!shortcutFocus) {
        return
      }
      const { input } = shortcutFocus
      const target = event.relatedTarget as Node | null
      const panel = document
        .getElementById(input.getAttribute('aria-controls'))
        ?.closest('.dnb-search__panel')
      const insideNestedControl = Array.from(
        panel?.querySelectorAll('[aria-controls]') ?? []
      ).some((control) =>
        document
          .getElementById(control.getAttribute('aria-controls'))
          ?.contains(target)
      )
      if (
        !input.closest('.dnb-search')?.contains(target) &&
        !panel?.contains(target) &&
        !insideNestedControl
      ) {
        shortcutFocus = null
      }
    }

    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (
        event.key !== 'Escape' ||
        event.defaultPrevented ||
        event.isComposing ||
        !(event.target instanceof HTMLInputElement) ||
        !event.target.closest('.dnb-search--shortcut') ||
        event.target.getAttribute('aria-expanded') === 'true'
      ) {
        return
      }
      if (event.target !== shortcutFocus?.input) {
        return
      }
      event.preventDefault()
      const { input, origin } = shortcutFocus
      shortcutFocus = null
      event.stopPropagation()
      if (origin instanceof HTMLElement && origin.isConnected) {
        origin.focus({ preventScroll: true })
      }
      if (document.activeElement === input) {
        input.blur()
      }
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.repeat ||
        event.altKey ||
        event.shiftKey ||
        (isMac()
          ? !event.metaKey || event.ctrlKey
          : !event.ctrlKey || event.metaKey) ||
        event.key.toLowerCase() !== 'k'
      ) {
        return
      }

      const scope =
        Array.from(
          document.querySelectorAll<HTMLElement>('[aria-modal="true"]')
        )
          .reverse()
          .find(
            (modal) =>
              !modal.closest('[hidden], [inert]') &&
              (modal.checkVisibility?.({ checkVisibilityCSS: true }) ??
                true)
          ) || document
      const inputs = scope.querySelectorAll<HTMLInputElement>(
        '.dnb-search--shortcut input:not(:disabled)'
      )
      const input = Array.from(inputs).find(
        (input) =>
          !input.closest('[hidden], [inert]') &&
          (input.checkVisibility?.({ checkVisibilityCSS: true }) ?? true)
      )

      const activeElement = document.activeElement
      if (
        activeElement instanceof HTMLElement &&
        activeElement !== input &&
        (activeElement.matches(':read-write') ||
          activeElement.isContentEditable)
      ) {
        return
      }

      if (input) {
        event.preventDefault()
        if (activeElement !== input) {
          shortcutFocus = { input, origin: activeElement }
        }
        input.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusout', onFocusOut)
    document.documentElement.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusout', onFocusOut)
      document.documentElement.removeEventListener('keydown', onEscape)
    }
  }, [shortcut, props.disabled])

  return {
    ...props,
    variant,
    className: clsx(
      'dnb-search',
      `dnb-search--${variant}`,
      shortcut && !props.disabled && 'dnb-search--shortcut',
      className
    ),
    'aria-keyshortcuts':
      shortcut && !props.disabled && mac !== null
        ? mac
          ? 'Meta+K'
          : 'Control+K'
        : props['aria-keyshortcuts'],
    submitElement:
      props.submitElement ??
      (shortcut && !props.showSubmitButton && !props.disabled ? (
        <ShortcutHint mac={mac} />
      ) : undefined),
  }
}
