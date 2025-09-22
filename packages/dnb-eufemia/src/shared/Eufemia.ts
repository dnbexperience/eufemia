import { getVersion, getSha } from './build-info/BuildInfo'

export const version = getVersion()
export const sha = getSha()

declare global {
  interface Window {
    Eufemia?: {
      version?: string
      sha?: string
      shas?: Array<string>
      versions?: Array<{
        js: string
        css: string
        sha: string
        scopeElement: Element
      }>
    }
    __eufemiaVersions?: Array<string>
    __eufemiaSHAs?: Array<string>
  }
}

export function init() {
  if (typeof window !== 'undefined') {
    class Eufemia {
      constructor() {
        if (!window.__eufemiaVersions) {
          window.__eufemiaVersions = []
        }
        if (!window.__eufemiaVersions.includes(this.version)) {
          window.__eufemiaVersions.push(this.version)
        }

        if (!window.__eufemiaSHAs) {
          window.__eufemiaSHAs = []
        }
        if (!window.__eufemiaSHAs.includes(this.sha)) {
          window.__eufemiaSHAs.push(this.sha)
        }
      }

      get version() {
        return version
      }

      get sha() {
        return sha
      }

      get shas(): Array<string> {
        return window.__eufemiaSHAs
      }

      get versions(): Array<{
        js: string
        css: string
        sha: string
        scopeElement: Element
      }> {
        return window.__eufemiaSHAs.map((sha, i) => {
          const scopeElement = document.querySelector(
            `[data-scope-hash-id][data-scope-sha="${sha}"] .dnb-core-style`
          )
          const css = window
            .getComputedStyle(scopeElement || document.body)
            .getPropertyValue('--eufemia-version')
            .replace(/"/g, '')

          // Ensure we always get a valid version, even if there are more SHAs than versions
          const js =
            window.__eufemiaVersions[i] ||
            window.__eufemiaVersions[0] ||
            this.version

          return { js, css, sha, scopeElement }
        })
      }
    }

    window.Eufemia = new Eufemia()
  }
}
