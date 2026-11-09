import { useContext, useEffect, useSyncExternalStore } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import { isMac } from '../../shared/helpers'
import type { SearchProps } from './types'

const searchDefaultProps: Partial<SearchProps> = {
  variant: 'default',
  pill: false,
  shortcut: false,
  size: 'medium',
  labelSrOnly: true,
  showClearButton: true,
}

const subscribeToPlatform = () => () => undefined
const getShortcutHint = () => (isMac() ? '⌘ K' : 'Ctrl K')
const getServerShortcutHint = () => null

// Autocomplete injects trigger props, so keep them off the native element.
function ShortcutHint() {
  const hint = useSyncExternalStore(
    subscribeToPlatform,
    getShortcutHint,
    getServerShortcutHint
  )

  return hint ? (
    <kbd className="dnb-search__shortcut" aria-hidden="true">
      {hint}
    </kbd>
  ) : null
}

export default function useSearchProps<Props extends SearchProps>(
  localProps: Props,
  defaults: Partial<Props>
) {
  const context = useContext(Context)
  const { variant, pill, shortcut, className, ...props } =
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

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.repeat ||
        event.altKey ||
        event.shiftKey ||
        !(event.metaKey || event.ctrlKey) ||
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

      if (input) {
        event.preventDefault()
        input.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [shortcut, props.disabled])

  return {
    ...props,
    className: clsx(
      'dnb-search',
      `dnb-search--${variant}`,
      pill && 'dnb-search--pill',
      shortcut && !props.disabled && 'dnb-search--shortcut',
      className
    ),
    'aria-keyshortcuts':
      shortcut && !props.disabled
        ? 'Meta+K Control+K'
        : props['aria-keyshortcuts'],
    submitElement:
      props.submitElement ??
      (shortcut && !props.showSubmitButton && !props.disabled ? (
        <ShortcutHint />
      ) : undefined),
  }
}
