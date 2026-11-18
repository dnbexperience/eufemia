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
  return `(function(){try{var t=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var s=t.colorScheme;if(s==='auto'||!s){s=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.classList.add('${escapeForScriptString(scopeHash)}');if(s){globalThis.${GLOBAL_KEY}=s}}catch(e){}})()`
}

// Keeps a value inside a single-quoted string and the surrounding <script>
function escapeForScriptString(value: string) {
  return String(value).replace(
    /[\\'<\n\r\u2028\u2029]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
  )
}

/**
 * Returns the inline script that adds the color-scheme class to <body>
 * and swaps the color-scheme classes on server-rendered Theme elements
 * while they are parsed, so the browser never paints them in the
 * wrong color scheme.
 * Place this as the first child of <body>.
 */
export function getBodyScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s){document.body.classList.add('${CLASS_PREFIX}'+s);if(s==='dark'&&document.readyState==='loading'&&typeof MutationObserver==='function'){var m=new MutationObserver(function(r){for(var i=0;i<r.length;i++){var n=r[i].addedNodes;for(var j=0;j<n.length;j++){var e=n[j];if(e.nodeType===1&&e.classList.contains('${CLASS_PREFIX}light')){e.classList.remove('${CLASS_PREFIX}light');e.classList.add('${CLASS_PREFIX}dark')}}}});m.observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',function(){m.disconnect()},{once:true})}}})()`
}

/**
 * Returns the inline script that swaps color-scheme classes
 * on all .eufemia-theme elements in the static HTML.
 * Place this after the main content div.
 */
export function getContentScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s&&s!=='light'){var o=s==='dark'?'light':'dark';document.querySelectorAll('.${CLASS_PREFIX}'+o).forEach(function(el){el.classList.remove('${CLASS_PREFIX}'+o);el.classList.add('${CLASS_PREFIX}'+s)})}})()`
}
