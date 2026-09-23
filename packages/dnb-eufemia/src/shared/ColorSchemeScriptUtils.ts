// Import-free on purpose: the portal's Vite config loads this at config time.

const STORAGE_KEY = 'eufemia-theme'
const GLOBAL_KEY = '__eufemiaColorScheme'
const CLASS_PREFIX = 'eufemia-theme__color-scheme--'

/**
 * Returns the inline script that resolves the color scheme
 * from localStorage and adds the scope hash to <html>.
 * Place this in <head>.
 */
export function getHeadScript(scopeHash: string) {
  return `(function(){try{var t=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var s=t.colorScheme;if(s==='auto'||!s){s=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.classList.add('${scopeHash}');if(s){globalThis.${GLOBAL_KEY}=s}}catch(e){}})()`
}

/**
 * Returns the inline script that adds the color-scheme class to <body>.
 * Place this as the first child of <body>.
 */
export function getBodyScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s){document.body.classList.add('${CLASS_PREFIX}'+s)}})()`
}

/**
 * Returns the inline script that swaps color-scheme classes
 * on all .eufemia-theme elements in the static HTML.
 * Place this after the main content div.
 */
export function getContentScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s&&s!=='light'){var o=s==='dark'?'light':'dark';document.querySelectorAll('.${CLASS_PREFIX}'+o).forEach(function(el){el.classList.remove('${CLASS_PREFIX}'+o);el.classList.add('${CLASS_PREFIX}'+s)})}})()`
}
