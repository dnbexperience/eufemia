/**
 * Typed facade for the SSG prerender helpers.
 *
 * The implementations live in plain-ESM modules (./prerender-html.mjs
 * for the HTML builders, ./prerender-helpers.mjs for the route/manifest
 * helpers) so the prerender.mjs build entry — which runs under plain
 * Node and cannot import .ts — shares the exact same code. This file
 * adds TypeScript types and supplies getContentScript() so callers keep
 * the ergonomic injectHtml signature.
 */

import { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'
import {
  injectHtml as injectHtmlImpl,
  buildRedirectHtml,
} from './prerender-html.mjs'
import {
  collectUrls as collectUrlsImpl,
  getPageMeta as getPageMetaImpl,
  getMdPath as getMdPathImpl,
  getRoutePreloads as getRoutePreloadsImpl,
  getOutputPath as getOutputPathImpl,
} from './prerender-helpers.mjs'

// Re-export the shared redirect builder unchanged (see prerender-html.mjs).
export { buildRedirectHtml }

export type RouteEntry = {
  path?: string
  children?: RouteEntry[]
  [key: string]: unknown
}

export type SSRManifest = Record<string, string[]>

export type ClientManifestEntry = {
  file: string
  name?: string
  src?: string
  isDynamicEntry?: boolean
  imports?: string[]
  css?: string[]
}

export type ClientManifest = Record<string, ClientManifestEntry>

export type MdxNode = {
  fields: { slug: string }
  frontmatter: Record<string, unknown>
}

export type PageMeta = {
  title: string
  description: string
}

// Re-export the shared route/manifest helpers with precise types. The
// implementations live in ./prerender-helpers.mjs; these annotations pin
// the public contract and are cross-checked against the inferred impls.
export const collectUrls: (routes: RouteEntry[]) => string[] =
  collectUrlsImpl

export const getPageMeta: (
  url: string,
  allMdxNodes: MdxNode[]
) => PageMeta = getPageMetaImpl

export const getMdPath: (
  url: string,
  allMdxNodes: MdxNode[]
) => string | null = getMdPathImpl

export const getRoutePreloads: (
  url: string,
  ssrManifest: SSRManifest,
  clientManifest?: ClientManifest | null
) => { js: string[]; css: string[] } = getRoutePreloadsImpl

export const getOutputPath: (url: string, outDir: string) => string =
  getOutputPathImpl

/**
 * Inject prerendered HTML, styles, meta tags, and preloads into the
 * client template.
 *
 * Thin typed facade over injectHtml in ./prerender-html.mjs: it only
 * supplies the color-scheme content script (which prevents a dark-mode
 * FOUC) so callers keep the ergonomic signature. All HTML-building
 * logic lives in the shared module — do not duplicate it here.
 */
export function injectHtml(
  template: string,
  appHtml: string,
  preloads: { js: string[]; css: string[] },
  emotionCss?: string,
  meta?: {
    url: string
    title: string
    description: string
    mdPath?: string
  },
  themeCssPaths?: Record<string, string>
): string {
  return injectHtmlImpl(
    template,
    appHtml,
    preloads,
    getContentScript(),
    emotionCss,
    meta,
    themeCssPaths
  )
}
