import React from 'react'

import inlineScriptProd from '!raw-loader!terser-loader!./inlineScriptProd.js'
import inlineScriptDev from '!raw-loader!terser-loader!./inlineScriptDev.js'

const defaultTheme = process.env.EUFEMIA_THEME_defaultTheme || 'ui'
const availableThemes = process.env.EUFEMIA_THEME_themes || {}
const availableThemesArray = Object.keys(availableThemes)

export function getThemes() {
  return availableThemes
}

export function isValidTheme(themeName) {
  return availableThemesArray.includes(themeName)
}

export function getTheme() {
  try {
    const themeName =
      window.localStorage.getItem('dnb-theme') || defaultTheme

    if (!isValidTheme(themeName)) {
      console.error('Not valid themeName:', themeName)
      return defaultTheme // stop here
    }

    return themeName
  } catch (e) {
    console.error(e)
    return defaultTheme
  }
}

export function setTheme(themeName) {
  if (!isValidTheme(themeName)) {
    console.error('Not valid themeName:', themeName)
    return // stop here
  }

  try {
    window.__updateEufemiaThemeFile(themeName, true)
    window.localStorage.setItem('dnb-theme', themeName)
  } catch (e) {
    console.error(e)
  }
}

let cachedHeadComponents = null
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  let headComponents = getHeadComponents()

  const isDev = process.env.NODE_ENV !== 'production'

  // Make themes to not be embedded, but rather load as css files
  if (!isDev) {
    let defaultElement
    for (const element of headComponents) {
      const href = element.props['data-href']
      if (href && href.includes('.css')) {
        if (
          availableThemesArray.some((name) => {
            return href.includes(`/${name}.`)
          })
        ) {
          const themeName = (href.match(/\/([^.]*)\./) || [])?.[1]

          // Collect all theme CSS file paths
          if (availableThemes[themeName]) {
            availableThemes[themeName].file = href

            // Store the default inline styles,
            // and place it below data-href="/commons.*.css"
            if (themeName === defaultTheme) {
              defaultElement = element
              headComponents[element] = null
            } else {
              // Remove the inline style
              // but not when its the default theme
              delete element.props['data-href']
              delete element.props['data-identity']
              delete element.props.dangerouslySetInnerHTML
            }
          }
        }
      }
    }

    headComponents.push(defaultElement)
  } else {
    for (const key in availableThemes) {
      availableThemes[key].isDev = true
      availableThemes[key].file = `/${key}.css` // during dev, we get this file from the Webpack cache (not in /public)
    }
  }

  /**
   * We cache the result of the first page,
   * and re-use on all other pages.
   */
  if (cachedHeadComponents) {
    headComponents.push(...cachedHeadComponents)
    replaceHeadComponents(headComponents)
    return // stop here
  }

  cachedHeadComponents = []

  cachedHeadComponents.push(
    <link
      id="eufemia-style-theme"
      key="theme-style"
      rel="stylesheet"
      type="text/css"
      as="style"
    />
  )

  const replaceGlobalVars = (s) => {
    return s
      .replace(/__DEFAULT_THEME__/g, JSON.stringify(defaultTheme))
      .replace(/__AVAILABLE_THEMES__/g, JSON.stringify(availableThemes))
  }

  /**
   * NB: The dev script needs to be placed before the prod!
   */
  if (isDev) {
    cachedHeadComponents.push(
      <script
        key="eufemia-style-theme-script-dev"
        dangerouslySetInnerHTML={{
          __html: replaceGlobalVars(inlineScriptDev),
        }}
      />
    )
  }

  cachedHeadComponents.push(
    <script
      key="eufemia-style-theme-script-prod"
      dangerouslySetInnerHTML={{
        __html: replaceGlobalVars(inlineScriptProd),
      }}
    />
  )

  headComponents.push(...cachedHeadComponents)
  replaceHeadComponents(headComponents)
}
