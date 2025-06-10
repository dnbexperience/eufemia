import { getVersion, getSha } from './build-info/BuildInfo'

export const version = getVersion()
export const sha = getSha()

declare global {
  interface Window {
    Eufemia?: {
      version?: string
      versions?: string[]
      sha?: string
      shas?: string[]
    }
    __eufemiaVersions?: string[]
    __eufemiaSHAs?: string[]
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

      get versions(): string[] {
        return window.__eufemiaVersions
      }

      get sha() {
        return sha
      }

      get shas(): string[] {
        return window.__eufemiaSHAs
      }
    }

    window.Eufemia = new Eufemia()
  }
}
