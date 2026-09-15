import type { ScriptHTMLAttributes } from 'react'

/**
 * Returns a blocking script that restores persisted SidebarMenu state before
 * the browser's first paint. Place it after the prerendered menu markup and
 * before the application hydration script.
 */
export function getPreHydrationScript() {
  return `(function(){try{var nonce=document.currentScript&&document.currentScript.nonce;document.querySelectorAll('[data-open-items-storage-key]').forEach(function(menu){var rules=[];var key=menu.getAttribute('data-open-items-storage-key');var add=function(id,open){var root='[data-open-items-storage-key=\"'+CSS.escape(key)+'\"] [data-sidebar-menu-id=\"'+CSS.escape(String(id))+'\"]';var animation=root+' > .dnb-height-animation';var inner=animation+' > .dnb-height-animation__compensate-for-gap';var trigger=root+' > .dnb-sidebar-menu__accordion__trigger';rules.push(animation+'{margin-top:calc(var(--sidebar-menu-accordion-gap,.5rem)*-1)!important}',inner+'{margin-top:var(--sidebar-menu-accordion-gap,.5rem)!important}');if(open){rules.push(animation+'{height:auto!important;overflow-y:visible!important;visibility:visible!important}',trigger+' .dnb-icon--transition-fallback{--icon-transition:var(--icon-transition-expanded)!important}',trigger+' svg[data-icon-state=\"collapsed\"]{opacity:0!important;transform:scale(.5)!important}',trigger+' svg[data-icon-state=\"expanded\"]{opacity:1!important;transform:scale(1)!important}')}else{rules.push(animation+'{height:0!important;overflow-y:clip!important;visibility:hidden!important}',trigger+' .dnb-icon--transition-fallback{--icon-transition:var(--icon-transition-collapsed)!important}',trigger+' svg[data-icon-state=\"collapsed\"]{opacity:1!important;transform:scale(1)!important}',trigger+' svg[data-icon-state=\"expanded\"]{opacity:0!important;transform:scale(.5)!important}')}};var type=menu.getAttribute('data-open-items-storage');var storage=type==='local'?localStorage:sessionStorage;var value=storage.getItem(key);if(!value)return;var parsed=JSON.parse(value);var openItems=Array.isArray(parsed)?parsed:parsed&&Array.isArray(parsed.openItems)?parsed.openItems:[];var closedItems=parsed&&Array.isArray(parsed.closedItems)?parsed.closedItems:[];openItems.forEach(function(id){if(!closedItems.includes(id))add(id,true)});closedItems.forEach(function(id){add(id,false)});if(rules.length){var style=document.createElement('style');style.setAttribute('data-sidebar-menu-pre-hydration',key);if(nonce)style.nonce=nonce;style.textContent=rules.join('');document.head.appendChild(style)}});document.querySelectorAll('[data-scroll-position-storage-key]').forEach(function(menu){var view=menu.closest('.dnb-scroll-view');if(!view)return;var behavior=view.style.getPropertyValue('scroll-behavior');var priority=view.style.getPropertyPriority('scroll-behavior');var key=menu.getAttribute('data-scroll-position-storage-key');var type=menu.getAttribute('data-scroll-position-storage');var storage=type==='local'?localStorage:sessionStorage;var stored=parseFloat(storage.getItem(key)||'0');view.style.setProperty('scroll-behavior','auto','important');if(stored)view.scrollTop=stored;var active=menu.querySelector('[aria-current=\"page\"]');if(active){var vr=view.getBoundingClientRect();var ar=active.getBoundingClientRect();if(ar.top<vr.top||ar.bottom>vr.bottom){view.scrollTop+=ar.top-vr.top-(vr.height-ar.height)/2}}view.style.setProperty('scroll-behavior',behavior,priority)})}catch(e){}})()`
}

export type SidebarMenuPreHydrationScriptProps = Omit<
  ScriptHTMLAttributes<HTMLScriptElement>,
  'children' | 'dangerouslySetInnerHTML'
>

/**
 * Blocking script for persisted SidebarMenu state in SSR and SSG apps.
 */
export function SidebarMenuPreHydrationScript(
  props: SidebarMenuPreHydrationScriptProps
) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{ __html: getPreHydrationScript() }}
    />
  )
}
