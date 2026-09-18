import type { ScriptHTMLAttributes } from 'react'

/**
 * Applies persisted SidebarMenu state while prerendered HTML is parsed.
 * Keep this function self-contained because getPreHydrationScript serializes it.
 */
function applyPreHydrationState() {
  try {
    const nonce = (document.currentScript as HTMLScriptElement | null)
      ?.nonce

    document
      .querySelectorAll<HTMLElement>('[data-open-items-storage-key]')
      .forEach((menu) => {
        try {
          const key = menu.getAttribute('data-open-items-storage-key')
          if (!key) {
            return
          }

          const storage =
            menu.getAttribute('data-open-items-storage') === 'local'
              ? localStorage
              : sessionStorage
          const value = storage.getItem(key)
          if (!value) {
            return
          }

          const parsed = globalThis['JSON']['parse'](value)
          const isStringArray = (items: unknown): items is string[] =>
            Array.isArray(items) &&
            items.every((item) => typeof item === 'string')
          if (
            !isStringArray(parsed) &&
            !(
              parsed &&
              isStringArray(parsed.openItems) &&
              isStringArray(parsed.closedItems)
            )
          ) {
            return
          }
          const openItems = Array.isArray(parsed)
            ? parsed
            : Array.isArray(parsed?.openItems)
              ? parsed.openItems
              : []
          const closedItems = Array.isArray(parsed?.closedItems)
            ? parsed.closedItems
            : []
          const rules: string[] = []

          const add = (id: unknown, open: boolean) => {
            const root =
              '[data-open-items-storage-key="' +
              CSS.escape(key) +
              '"] [data-sidebar-menu-id="' +
              CSS.escape(String(id)) +
              '"]'
            const animation = root + ' > .dnb-height-animation'
            const trigger =
              root + ' > .dnb-sidebar-menu__accordion__trigger'

            if (open) {
              rules[rules.length] =
                animation +
                '{display:block!important;height:auto!important;overflow-y:visible!important;visibility:visible!important}'
              rules[rules.length] =
                trigger +
                ' .dnb-icon--transition-fallback{--icon-transition:var(--icon-transition-expanded)!important}'
              rules[rules.length] =
                trigger +
                ' svg[data-icon-state="collapsed"]{opacity:0!important;transform:scale(.5)!important}'
              rules[rules.length] =
                trigger +
                ' svg[data-icon-state="expanded"]{opacity:1!important;transform:scale(1)!important}'
            } else {
              rules[rules.length] =
                animation +
                '{height:0!important;overflow-y:clip!important;visibility:hidden!important}'
              rules[rules.length] =
                trigger +
                ' .dnb-icon--transition-fallback{--icon-transition:var(--icon-transition-collapsed)!important}'
              rules[rules.length] =
                trigger +
                ' svg[data-icon-state="collapsed"]{opacity:1!important;transform:scale(1)!important}'
              rules[rules.length] =
                trigger +
                ' svg[data-icon-state="expanded"]{opacity:0!important;transform:scale(.5)!important}'
            }
          }

          openItems.forEach((id) => {
            if (closedItems.indexOf(id) === -1) {
              add(id, true)
            }
          })
          closedItems.forEach((id) => add(id, false))

          menu
            .querySelectorAll<HTMLElement>(
              '.dnb-sidebar-menu__accordion[data-sidebar-menu-id]'
            )
            .forEach((accordion) => {
              if (
                accordion.closest('[data-open-items-storage-key]') !==
                  menu ||
                accordion.hasAttribute('data-sidebar-menu-open-controlled')
              ) {
                return
              }

              const id = accordion.getAttribute('data-sidebar-menu-id')
              if (
                !openItems.includes(id) &&
                !closedItems.includes(id) &&
                !accordion.querySelector('[aria-current="page"]')
              ) {
                add(id, false)
              }
            })

          if (rules.length) {
            const style = document.createElement('style')
            style.setAttribute('data-sidebar-menu-pre-hydration', key)
            if (nonce) {
              style.nonce = nonce
            }
            style.textContent = rules.join('')
            document.head.appendChild(style)
          }
        } catch {
          // Storage can be unavailable or contain invalid data.
        }
      })

    document
      .querySelectorAll<HTMLElement>('[data-scroll-position-storage-key]')
      .forEach((menu) => {
        try {
          const view = menu.closest<HTMLElement>('.dnb-scroll-view')
          const key = menu.getAttribute('data-scroll-position-storage-key')
          if (!view || !key) {
            return
          }

          const storage =
            menu.getAttribute('data-scroll-position-storage') === 'local'
              ? localStorage
              : sessionStorage
          const storedValue = storage.getItem(key)
          const stored = Number(storedValue)
          const hasStoredPosition =
            storedValue !== null && Number.isFinite(stored) && stored >= 0
          const behavior = view.style.getPropertyValue('scroll-behavior')
          const priority =
            view.style.getPropertyPriority('scroll-behavior')

          view.style.setProperty('scroll-behavior', 'auto', 'important')
          if (hasStoredPosition) {
            view.scrollTop = stored
          }

          const active = menu.querySelector<HTMLElement>(
            '[aria-current="page"]'
          )
          if (active && !hasStoredPosition) {
            const viewRect = view.getBoundingClientRect()
            const activeRect = active.getBoundingClientRect()
            if (
              activeRect.top < viewRect.top ||
              activeRect.bottom > viewRect.bottom
            ) {
              view.scrollTop +=
                activeRect.top -
                viewRect.top -
                (viewRect.height - activeRect.height) / 2
            }
          }

          view.style.setProperty('scroll-behavior', behavior, priority)
        } catch {
          // Storage and layout measurement can be unavailable.
        }
      })
  } catch {
    // The bootstrap is an enhancement and must not block the document.
  }
}

/**
 * Returns a blocking script that restores persisted SidebarMenu state before
 * the browser's first paint. Place it after the prerendered menu markup and
 * before the application hydration script.
 */
export function getPreHydrationScript() {
  return '(' + applyPreHydrationState.toString() + ')()'
}

export type SidebarMenuPreHydrationScriptProps = Omit<
  ScriptHTMLAttributes<HTMLScriptElement>,
  'children' | 'dangerouslySetInnerHTML'
>

/**
 * Blocking script for persisted SidebarMenu state in SSR and SSG apps.
 */
export function SidebarMenuPreHydrationScript(
  props: SidebarMenuPreHydrationScriptProps
) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{ __html: getPreHydrationScript() }}
    />
  )
}
