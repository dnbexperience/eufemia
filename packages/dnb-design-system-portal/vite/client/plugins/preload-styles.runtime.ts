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

if (
  search.includes('fullscreen') ||
  search.includes('focusmode') ||
  search.includes('data-visual-test')
) {
  const s = document.createElement('style')

  let css =
    'header.sticky-menu{display:none!important}' +
    'nav#portal-sidebar-menu{display:none!important}' +
    '.dnb-app-content{margin-left:0!important}' +
    ':root{--aside-width:0}'

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

  s.id = 'fullscreen-preload-style'
  s.textContent = css
  document.head.appendChild(s)
}
