import { getVersion, getSha } from './build-info/BuildInfo'

export const version = getVersion()
export const sha = getSha()

declare global {
  interface Window {
    Eufemia?: {
      version?: string
      versions?: Array<string>
      sha?: string
      shas?: Array<string>
      info?: { versions: Array<{ js: string; css: string; sha: string }> }
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

      get versions(): Array<string> {
        return window.__eufemiaVersions
      }

      get sha() {
        return sha
      }

      get shas(): Array<string> {
        return window.__eufemiaSHAs
      }

      get info(): {
        versions: Array<{ js: string; css: string; sha: string }>
      } {
        return {
          versions: window.__eufemiaSHAs.map((sha, i) => {
            const scope = document.querySelector(
              `[data-scope-hash-id][data-scope-sha="${sha}"]`
            )
            const css = window
              .getComputedStyle(scope || document.body)
              .getPropertyValue('--eufemia-version')
              .replace(/"/g, '')
            const js = window.__eufemiaVersions[i]

            return { js, css, sha }
          }),
        }
      }
    }

    window.Eufemia = new Eufemia()
  }
}
