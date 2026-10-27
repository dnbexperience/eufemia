import type { ScriptHTMLAttributes } from 'react'

/** Restores persisted disclosure styling before the initial HTML is painted. */
function applyPreHydrationState() {
  const nonce = (document.currentScript as HTMLScriptElement | null)?.nonce
  document
    .querySelectorAll<HTMLElement>(
      '[data-table-of-content-expanded-storage-key]'
    )
    .forEach((nav) => {
      try {
        const key = nav.getAttribute(
          'data-table-of-content-expanded-storage-key'
        )
        const query = nav.getAttribute('data-table-of-content-query')
        const storage =
          nav.getAttribute('data-table-of-content-expanded-storage') ===
          'local'
            ? localStorage
            : sessionStorage
        const stored = storage.getItem(key)
        if (
          (stored !== 'true' && stored !== 'false') ||
          !query ||
          !nav.id
        ) {
          return
        }
        const scope = '#' + CSS.escape(nav.id)
        const open = stored === 'true'
        const style = document.createElement('style')
        style.setAttribute('data-table-of-content-pre-hydration', key)
        if (nonce) {
          style.nonce = nonce
        }
        style.textContent =
          '@media ' +
          query +
          '{' +
          scope +
          ' .dnb-table-of-content__list-wrapper{display:' +
          (open ? 'block' : 'none') +
          '!important}' +
          scope +
          ' .dnb-table-of-content__toggle .dnb-icon--transition-fallback{--icon-transition:var(--icon-transition-' +
          (open ? 'expanded' : 'collapsed') +
          ')!important}' +
          scope +
          ' .dnb-table-of-content__toggle svg[data-icon-state="collapsed"]{opacity:' +
          (open ? '0' : '1') +
          '!important}' +
          scope +
          ' .dnb-table-of-content__toggle svg[data-icon-state="expanded"]{opacity:' +
          (open ? '1' : '0') +
          '!important}' +
          '}'
        document.head.appendChild(style)
      } catch {
        // Storage may be unavailable.
      }
    })
}

/** Place after prerendered navigation markup and before application hydration. */
export function getPreHydrationScript() {
  return '(' + applyPreHydrationState.toString() + ')()'
}

export function TableOfContentPreHydrationScript(
  props: Omit<
    ScriptHTMLAttributes<HTMLScriptElement>,
    'children' | 'dangerouslySetInnerHTML'
  >
) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{ __html: getPreHydrationScript() }}
    />
  )
}
