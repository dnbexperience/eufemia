/**
 * Shared HTML-building helpers for the SSG prerender pipeline.
 *
 * Plain ESM so BOTH the prerender.mjs build entry (which runs under
 * plain Node and cannot import .ts) and the typed prerender-utils.ts
 * facade import the exact same implementation. Do not re-inline these
 * bodies elsewhere — a previous fix landed in only one of two copies
 * because this logic was duplicated.
 *
 * injectHtml takes `contentScript` as a parameter (rather than importing
 * getContentScript) so this module stays free of .ts/.tsx dependencies
 * and remains importable by plain Node.
 */

/**
 * Inject prerendered HTML, styles, meta tags, and preloads into the
 * client template.
 *
 * - Replaces the empty `<div id="root"></div>` with the rendered content
 * - Injects SEO meta tags (title, description, Open Graph) into `<head>`
 * - Injects Emotion CSS extracted during SSR into `<head>`
 * - Adds `<link rel="stylesheet">` tags for route-specific CSS chunks
 * - Adds `<link rel="modulepreload">` tags for route-specific JS chunks
 *
 * @param {string} template
 * @param {string} appHtml
 * @param {{ js: string[], css: string[] }} preloads
 * @param {string} contentScript
 * @param {string} [emotionCss]
 * @param {{ url: string, title: string, description: string, mdPath?: string }} [meta]
 * @param {Record<string, string>} [themeCssPaths]
 * @returns {string}
 */
export function injectHtml(
  template,
  appHtml,
  preloads,
  contentScript,
  emotionCss,
  meta,
  themeCssPaths
) {
  // React 19 injects <link rel="preload"> elements inline during
  // renderToString for resources like images. Strip them from the app
  // HTML and move them to <head> so they don't break client-side
  // hydration (React can't match the DOM when unexpected <link>
  // elements appear before the root component's first element).
  const reactPreloadLinks = []
  appHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/g, (match) => {
    reactPreloadLinks.push(match)
    return ''
  })

  // StaticRouterProvider injects a <script> with hydration data that
  // is not needed for our hydration approach. Strip it so it doesn't
  // appear inside the root container as unexpected DOM content.
  appHtml = appHtml.replace(
    /<script>window\.__staticRouterHydrationData\s*=[^<]*<\/script>/,
    ''
  )

  // React's renderToString serializes CSS custom properties in inline
  // styles without spaces (e.g. "--var:value") while the browser
  // normalizes them with spaces ("--var: value;"). This causes
  // hydration mismatches. Normalize the format to match the browser.
  appHtml = appHtml.replace(/style="([^"]*)"/g, (_match, styleContent) => {
    const normalized = styleContent
      .split(';')
      .filter(Boolean)
      .map((decl) => {
        const colonIdx = decl.indexOf(':')
        if (colonIdx === -1) return decl
        const prop = decl.slice(0, colonIdx).trim()
        const value = decl.slice(colonIdx + 1).trim()
        return `${prop}: ${value}`
      })
      .join('; ')
    return normalized ? `style="${normalized};"` : 'style=""'
  })

  // Restore sidebar scroll position before first paint so the menu
  // doesn't flash at the top before jumping to the saved position.
  const scrollRestoreScript = `(function(){try{var el=document.getElementById('portal-sidebar-menu');if(el){var s=parseFloat(sessionStorage.getItem('scroll-#portal-sidebar-menu')||'0');if(s){el.style.scrollBehavior='auto';el.scrollTop=s;el.style.scrollBehavior=''}}}catch(e){}})()`

  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>\n\t<script>${contentScript};${scrollRestoreScript}</script>`
  )

  // Inject <link> tags for the brand theme CSS chunks.
  // Only the default theme is enabled (render-blocking) so the browser
  // fetches just that one before the first paint. Every other brand
  // theme is emitted with the `disabled` attribute, which keeps the
  // browser from fetching it until the user switches themes — removing
  // the other themes from the render-blocking critical path and from
  // the initial byte weight. A body-opening script adds the active
  // brand class to <body> so token selectors match immediately.
  if (themeCssPaths && Object.keys(themeCssPaths).length > 0) {
    const defaultTheme = 'ui'
    const linkTags = Object.entries(themeCssPaths)
      .map(([name, href]) => {
        const disabled = name === defaultTheme ? '' : ' disabled'
        return `    <link rel="stylesheet" crossorigin href="${href}" data-eufemia-theme="${name}"${disabled}>`
      })
      .join('\n')

    // Head script: determine the active theme, enable its link (which
    // starts the fetch when it was emitted disabled) and disable the
    // rest, then store the name on globalThis for the body script. For
    // the common case (default theme) this is a no-op — no extra
    // request is made because only the default stylesheet is enabled.
    const headThemeScript = `<script>(function(){try{var t=JSON.parse(localStorage.getItem('eufemia-theme')||'{}');var p=new URLSearchParams(location.search);var n=p.get('eufemia-theme')||t.name||'${defaultTheme}';var links=document.querySelectorAll('link[data-eufemia-theme]');for(var i=0;i<links.length;i++){links[i].disabled=links[i].getAttribute('data-eufemia-theme')!==n}globalThis.__eufemiaTheme=n}catch(e){globalThis.__eufemiaTheme='${defaultTheme}'}})()</script>`

    // Body script: add the brand class to <body> immediately after
    // the opening tag, before any content is rendered.
    const bodyThemeScript = `<script>(function(){var n=globalThis.__eufemiaTheme;if(n){document.body.classList.add('eufemia-theme__'+n)}})()</script>`

    html = html.replace(
      '</head>',
      `${linkTags}\n${headThemeScript}\n  </head>`
    )
    html = html.replace(
      /<body[^>]*>/,
      (match) => `${match}\n     ${bodyThemeScript}`
    )
  }

  // Inject per-page SEO meta tags (title, description, Open Graph)
  if (meta) {
    const siteUrl = 'https://eufemia.dnb.no'
    const defaultDescription =
      'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.'
    const formattedTitle = meta.title
      ? `${meta.title} | Eufemia`
      : 'Eufemia'
    const desc = meta.description || defaultDescription
    const fullUrl = `${siteUrl}${meta.url}`
    const ogImage = `${siteUrl}/dnb/og-image.png`

    // Replace existing title and meta description from the template
    html = html.replace(
      /<title id="head-title">[^<]*<\/title>/,
      `<title id="head-title">${formattedTitle}</title>`
    )
    html = html.replace(
      /<meta id="head-description"[^>]*\/?\s*>/,
      `<meta id="head-description" name="description" content="${desc}" />`
    )

    const ogTags = [
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="Eufemia">`,
      `<meta property="og:title" content="${formattedTitle}">`,
      `<meta property="og:description" content="${desc}">`,
      `<meta property="og:url" content="${fullUrl}">`,
      `<meta property="og:image" content="${ogImage}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="Eufemia Design System">`,
    ]

    if (meta.url === '/') {
      ogTags.push(
        `<link rel="alternate" type="text/plain" title="Eufemia LLM discovery manifest" href="/llms.txt">`
      )
    }

    // Add markdown alternate link when the caller provides an mdPath.
    // This is computed by the prerender loop using allMdxNodes to
    // resolve tab pages to their parent entry's .md file.
    if (meta.mdPath) {
      ogTags.push(
        `<link rel="alternate" type="text/markdown" title="Markdown documentation" href="${meta.mdPath}">`
      )
    }

    html = html.replace(
      '</head>',
      `    ${ogTags.join('\n    ')}\n  </head>`
    )
  }

  // Inject Emotion CSS extracted during SSR into <head> so styles
  // are available before the browser paints the prerendered HTML.
  if (emotionCss) {
    html = html.replace('</head>', `${emotionCss}\n</head>`)
  }

  // Inject route-specific CSS as render-blocking stylesheets so the
  // prerendered HTML has all styles before first paint.
  if (preloads.css.length > 0) {
    const cssTags = preloads.css
      .map((p) => `<link rel="stylesheet" crossorigin href="${p}">`)
      .join('\n    ')
    html = html.replace('</head>', `    ${cssTags}\n  </head>`)
  }

  if (preloads.js.length > 0) {
    const preloadTags = preloads.js
      .map((p) => `<link rel="modulepreload" crossorigin href="${p}">`)
      .join('\n    ')
    html = html.replace('</head>', `    ${preloadTags}\n  </head>`)
  }

  // Inject React-generated preload links that were stripped from the
  // app HTML to avoid hydration mismatches.
  if (reactPreloadLinks.length > 0) {
    const linkTags = reactPreloadLinks.join('\n    ')
    html = html.replace('</head>', `    ${linkTags}\n  </head>`)
  }

  return html
}

/**
 * Build a minimal redirect HTML page.
 *
 * Uses both `<meta http-equiv="refresh">` and a canonical link
 * so search engines follow the redirect correctly.
 *
 * @param {string} redirectUrl
 * @returns {string}
 */
export function buildRedirectHtml(redirectUrl) {
  return [
    '<!DOCTYPE html>',
    '<html><head>',
    `<meta http-equiv="refresh" content="0;url=${redirectUrl}">`,
    `<link rel="canonical" href="${redirectUrl}">`,
    '</head><body></body></html>',
  ].join('')
}
