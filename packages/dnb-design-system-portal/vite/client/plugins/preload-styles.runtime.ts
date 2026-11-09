/**
 * Inline preload script injected into index.html before first paint.
 *
 * Prevents layout flicker for fullscreen, focusmode, and visual test
 * mode by hiding the sidebar, header, and other chrome with a
 * <style> element before React mounts.
 *
 * This file is compiled and injected by the preload-styles Vite plugin.
 * It must be self-contained — no imports allowed.
 */

const search = location.search

try {
  const stored = sessionStorage.getItem(
    'portal-sidebar-menu-open-items-shared-scroll-position'
  )
  if (
    stored !== null &&
    Number.isFinite(Number(stored)) &&
    Number(stored) > 0
  ) {
    const style = document.createElement('style')
    style.id = 'portal-sidebar-scroll-restoration'
    style.textContent =
      '#portal-sidebar-menu .portal-sidebar-scroll-view{visibility:hidden!important}'
    document.head.appendChild(style)
    document.addEventListener('DOMContentLoaded', () => style.remove(), {
      once: true,
    })
  }
} catch {
  // The menu remains visible when storage is unavailable.
}

if (
  search.includes('fullscreen') ||
  search.includes('focusmode') ||
  search.includes('data-visual-test')
) {
  const s = document.createElement('style')

  let css =
    'header.sticky-menu{display:none!important}' +
    '.dnb-sidebar-menu-responsive-inline{display:none!important}' +
    ':root{--aside-width:0px}'

  if (search.includes('focusmode')) {
    css +=
      '.dnb-tabs{display:none!important}' +
      '.dnb-breadcrumb{display:none!important}' +
      '#dnb-app-content>div>div{visibility:hidden}'
  }

  if (search.includes('data-visual-test')) {
    css +=
      '.dnb-live-editor{display:none!important}' +
      '.dnb-live-toolbar{display:none!important}'
  }

  s.id = 'portal-preload-style'
  s.textContent = css
  document.head.appendChild(s)
}
