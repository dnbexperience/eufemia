/**
 * Vite plugin that replicates gatsby-plugin-eufemia-theme-handler.
 *
 * At dev server start it:
 * 1. Discovers all Eufemia theme SCSS files using the same glob patterns
 * 2. Generates a virtual module (`virtual:eufemia-theme-styles`) with imports
 * 3. Exports a `useThemeHandler` hook for runtime theme switching
 *
 * The theme switching works via CSS attribute selectors
 * (data-dnb-theme="<name>") that Eufemia's SCSS already supports.
 */

import { type Plugin } from 'vite'
import path from 'node:path'
import glob from 'glob'
import micromatch from 'micromatch'

/**
 * FOUC-prevention scripts matching @dnb/eufemia/shared/ColorSchemeScript.
 * These must stay in sync with getHeadScript / getBodyScript in that module.
 *
 * We inline them here because the Vite config/plugin context cannot import
 * .tsx files from eufemia at config-load time (before Vite's JSX transform
 * is registered).
 */
const SCOPE_HASH = 'eufemia-scope--portal'

function getHeadScript() {
  return `(function(){try{var t=JSON.parse(localStorage.getItem('eufemia-theme')||'{}');var s=t.colorScheme;if(s==='auto'||!s){s=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.classList.add('${SCOPE_HASH}');if(s){globalThis.__eufemiaColorScheme=s}}catch(e){}})()`
}

function getBodyScript() {
  return `(function(){var s=globalThis.__eufemiaColorScheme;if(s){document.body.classList.add('eufemia-theme__color-scheme--'+s)}})()`
}

const VIRTUAL_STYLES_ID = 'virtual:eufemia-theme-styles'
const RESOLVED_VIRTUAL_STYLES_ID = '\0' + VIRTUAL_STYLES_ID

const VIRTUAL_THEME_PREFIX = 'virtual:eufemia-theme-'
const RESOLVED_VIRTUAL_THEME_PREFIX = '\0' + VIRTUAL_THEME_PREFIX

type ThemeConfig = {
  themes: Record<string, { name: string }>
  defaultTheme: string
  filesGlobs: string[]
  includeFiles: string[]
  themeMatchers: RegExp[]
}

function getDefaultConfig(): ThemeConfig {
  return {
    themes: {
      ui: { name: 'DNB' },
      sbanken: { name: 'Sbanken (WIP)' },
      eiendom: { name: 'DNB Eiendom' },
      carnegie: { name: 'DNB Carnegie (WIP)' },
    },
    defaultTheme: 'ui',
    filesGlobs: [
      '**/src/style/dnb-ui-core.scss',
      '**/src/style/themes/**/*-theme-{basis,components,dark-mode}.scss',
      '**/src/extensions/payment-card/**/dnb-*.scss',
    ],
    includeFiles: [
      '**/dnb-ui-core*',
      '**/dnb-ui-basis*',
      '**/*-theme-components*',
      '**/*-theme-basis*',
      '**/*-theme-dark-mode*',
      '**/payment-card/**/*',
    ],
    themeMatchers: [
      /\/themes\/[^/]*theme-([^/.]*)[/.]/,
      /\/themes\/([^/]+)\//,
    ],
  }
}

function collectThemeFiles(config: ThemeConfig): string[] {
  const portalDir = path.resolve(__dirname, '../../..')
  const packageRoot = path.dirname(
    require.resolve('@dnb/eufemia', { paths: [portalDir] })
  )

  const globbyPaths = config.filesGlobs.map((glob) => {
    if (glob.startsWith('./')) {
      return path.join(portalDir, glob).replace(/\\/g, '/')
    }
    return path.join(packageRoot, glob).replace(/\\/g, '/')
  })

  const allFiles = globbyPaths
    .flatMap((pattern) => glob.sync(pattern))
    .filter((file) => {
      // Exclude es/cjs build artifacts
      if (/\/(es|cjs)\/style\//.test(file)) {
        return false
      }
      if (config.includeFiles.length > 0) {
        return config.includeFiles.some((glob) =>
          micromatch.isMatch(file, '**/' + glob)
        )
      }
      return true
    })

  // Sort: core files first, then by theme name for deterministic order
  return allFiles.sort((a, b) => {
    const aIsCore = a.includes('dnb-ui-core')
    const bIsCore = b.includes('dnb-ui-core')
    if (aIsCore && !bIsCore) {
      return -1
    }
    if (!aIsCore && bIsCore) {
      return 1
    }

    // Sort components before basis
    const aIsComponents = a.includes('-components')
    const bIsComponents = b.includes('-components')
    if (aIsComponents && !bIsComponents) {
      return -1
    }
    if (!aIsComponents && bIsComponents) {
      return 1
    }

    return a.localeCompare(b)
  })
}

export default function eufemiaThemePlugin(): Plugin {
  const config = getDefaultConfig()
  let isBuild = false

  return {
    name: 'vite-plugin-eufemia-theme',

    configResolved(resolvedConfig) {
      isBuild = resolvedConfig.command === 'build'
    },

    resolveId(id) {
      if (id === VIRTUAL_STYLES_ID) {
        return RESOLVED_VIRTUAL_STYLES_ID
      }
      // Resolve per-theme virtual modules (e.g. virtual:eufemia-theme-sbanken)
      if (id.startsWith(VIRTUAL_THEME_PREFIX)) {
        const themeName = id.slice(VIRTUAL_THEME_PREFIX.length)
        const allThemeNames = Object.keys(config.themes)
        if (allThemeNames.includes(themeName)) {
          return '\0' + id
        }
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_STYLES_ID) {
        const files = collectThemeFiles(config)
        const themeMatchers = config.themeMatchers
        const themeNames = Object.keys(config.themes)

        // Categorize files: core (always loaded) vs theme-specific
        const coreFiles: string[] = []
        const themeFiles: Record<string, string[]> = {}
        for (const name of themeNames) {
          themeFiles[name] = []
        }

        for (const file of files) {
          let matched = false
          for (const re of themeMatchers) {
            const m = file.match(re)
            if (m && m[1] && themeNames.includes(m[1])) {
              themeFiles[m[1]].push(file)
              matched = true
              break
            }
          }
          if (!matched) {
            coreFiles.push(file)
          }
        }

        const coreImports = coreFiles.map(
          (f) => `import '${f.replace(/\\/g, '/')}';`
        )

        if (isBuild) {
          // Build mode: only load core styles statically.
          // ALL theme CSS (including default) is lazy-loaded via
          // dynamic import() into separate CSS chunks. This allows
          // clean theme switching — when switching from ui to sbanken,
          // the ui theme's <link> is removed before loading sbanken's.
          const loaderEntries = themeNames
            .map(
              (name) =>
                `  ${name}: () => import('${VIRTUAL_THEME_PREFIX}${name}'),`
            )
            .join('\n')

          return `
// Auto-generated Eufemia theme style imports (build mode)
// Only core styles are loaded statically — theme CSS is lazy-loaded
${coreImports.join('\n')}

// All themes loaded on demand (including default)
if (typeof window !== 'undefined') {
  const themeLoaders = {
${loaderEntries}
  };

  // Map of theme name → <link> element for loaded themes.
  // We disable/enable links rather than removing them because
  // dynamic import() is cached — once a theme module has been
  // imported, re-importing it won't re-inject its <link>.
  const themeLinks = {};

  // Pick up pre-injected <link> elements for all themes that were
  // added as render-blocking stylesheets during prerendering.
  document.querySelectorAll('link[data-eufemia-theme]').forEach(function(el) {
    themeLinks[el.getAttribute('data-eufemia-theme')] = el;
  });

  window.__loadEufemiaTheme = (name) => {
    const loader = themeLoaders[name];
    if (!loader) {
      return Promise.resolve();
    }

    // If the theme's <link> is already in the DOM (pre-injected during
    // prerender), we can enable it immediately — no network fetch needed.
    if (themeLinks[name]) {
      activateTheme(name);
      return Promise.resolve();
    }

    // Otherwise, dynamically import the theme module. After import(),
    // the bundler injects a <link rel="stylesheet"> for the CSS chunk.
    // Wait for the link's load event before disabling the old theme,
    // so the user never sees unstyled content during the switch.
    return loader().then(() => {
      if (!themeLinks[name]) {
        var link = document.querySelector(
          'link[rel="stylesheet"][href*="eufemia-theme-' + name + '"]'
        );
        if (link) {
          themeLinks[name] = link;
        }
      }

      var newLink = themeLinks[name];
      if (!newLink) {
        activateTheme(name);
        return;
      }

      // If the stylesheet is already loaded (cached), activate now.
      if (newLink.sheet) {
        activateTheme(name);
        return;
      }

      // Wait for the CSS to be fetched and applied before switching.
      return new Promise(function(resolve) {
        newLink.addEventListener('load', function onLoad() {
          newLink.removeEventListener('load', onLoad);
          activateTheme(name);
          resolve();
        });
        // Enable so the browser starts loading it
        newLink.disabled = false;
      });
    });
  };

  function activateTheme(name) {
    // Enable the new theme
    if (themeLinks[name]) {
      themeLinks[name].disabled = false;
    }

    // Disable all other themes
    for (var key in themeLinks) {
      if (key !== name && themeLinks[key]) {
        themeLinks[key].disabled = true;
      }
    }

    // Update body class for portal-scoped CSS
    var body = document.body;
    var themeClassRe = /\\beufemia-theme__(?!color-scheme)\\S+/g;
    body.className = body.className.replace(themeClassRe, '').trim();
    body.classList.add('eufemia-theme__' + name);
  }

  // Auto-load the active theme on startup so prerendered HTML
  // gets styled before React hydrates.
  try {
    var stored = JSON.parse(localStorage.getItem('eufemia-theme') || '{}');
    var params = new URLSearchParams(location.search);
    var initial = params.get('eufemia-theme') || stored.name || '${config.defaultTheme}';
    window.__loadEufemiaTheme(initial);
  } catch(e) {
    window.__loadEufemiaTheme('${config.defaultTheme}');
  }
}
`
        }

        // Dev mode: import ALL theme files and toggle style.disabled
        const allThemeImports = themeNames.flatMap((name) =>
          themeFiles[name].map((f) => `import '${f.replace(/\\/g, '/')}';`)
        )

        const themeFileMap: Record<string, string[]> = {}
        for (const name of themeNames) {
          themeFileMap[name] = themeFiles[name].map((f) =>
            f.replace(/\\/g, '/')
          )
        }

        return `
// Auto-generated Eufemia theme style imports (dev mode)
${coreImports.join('\n')}
${allThemeImports.join('\n')}

// Expose the theme-to-file mapping for runtime style toggling
if (typeof window !== 'undefined') {
  window.__EUFEMIA_THEME_FILES__ = ${JSON.stringify(themeFileMap)};
  window.__EUFEMIA_THEME_NAMES__ = ${JSON.stringify(themeNames)};
  window.__EUFEMIA_DEFAULT_THEME__ = ${JSON.stringify(config.defaultTheme)};

  // Apply initial theme: disable styles for non-active themes
  const getInitialTheme = () => {
    try {
      const data = localStorage.getItem('eufemia-theme');
      const stored = JSON.parse(data?.startsWith('{') ? data : '{}');
      const params = new URLSearchParams(location.search);
      return params.get('eufemia-theme') || stored?.name || ${JSON.stringify(config.defaultTheme)};
    } catch { return ${JSON.stringify(config.defaultTheme)}; }
  };

  const applyThemeStyles = (activeTheme) => {
    const themeFiles = window.__EUFEMIA_THEME_FILES__;
    const allNames = window.__EUFEMIA_THEME_NAMES__;
    const allStyles = document.querySelectorAll('style[data-vite-dev-id]');

    for (const style of allStyles) {
      const devId = style.getAttribute('data-vite-dev-id') || '';
      for (const name of allNames) {
        const files = themeFiles[name];
        const isThisTheme = files.some(f => devId.includes(f) || f.includes(devId));
        if (isThisTheme) {
          style.disabled = (name !== activeTheme);
          break;
        }
      }
    }
  };

  // Make this available globally for setTheme to call
  window.__applyEufemiaThemeStyles__ = applyThemeStyles;

  // Apply on first load — use requestAnimationFrame to ensure styles are injected
  requestAnimationFrame(() => {
    applyThemeStyles(getInitialTheme());
  });
}
`
      }

      // Handle per-theme virtual modules (e.g. virtual:eufemia-theme-sbanken)
      if (id.startsWith(RESOLVED_VIRTUAL_THEME_PREFIX)) {
        const themeName = id.slice(RESOLVED_VIRTUAL_THEME_PREFIX.length)
        const files = collectThemeFiles(config)
        const themeImports: string[] = []

        for (const file of files) {
          for (const re of config.themeMatchers) {
            const m = file.match(re)
            if (m && m[1] === themeName) {
              themeImports.push(`import '${file.replace(/\\/g, '/')}';`)
              break
            }
          }
        }

        return `// Auto-generated ${themeName} theme imports\n${themeImports.join('\n')}\n`
      }
    },

    /**
     * Inject FOUC-prevention scripts from the shared ColorSchemeScript
     * module into the HTML template. This ensures dev and build use the
     * same blocking scripts as the Gatsby html.tsx.
     */
    transformIndexHtml(html) {
      const headScript = `<script>${getHeadScript()}</script>`
      const bodyScript = `<script>${getBodyScript()}</script>`

      html = html.replace('</head>', `${headScript}\n</head>`)
      html = html.replace(
        '<body class="dnb-page-background">',
        `<body class="dnb-page-background">\n\t${bodyScript}`
      )

      return html
    },
  }
}

export { getDefaultConfig }
export type { ThemeConfig }
