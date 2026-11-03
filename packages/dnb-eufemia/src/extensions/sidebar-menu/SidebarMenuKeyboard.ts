export const sidebarMenuActionSelector = '.dnb-sidebar-menu__item__action'

export function getSidebarMenuItems(container: HTMLElement) {
  const menu = container.closest('.dnb-sidebar-menu')
  return Array.from(
    container.querySelectorAll<HTMLElement>(sidebarMenuActionSelector)
  ).filter(
    (item) =>
      item.tabIndex >= 0 &&
      !item.matches(':disabled, [aria-disabled="true"]') &&
      !item.closest('[hidden], [inert], [aria-hidden="true"]') &&
      !item.closest(
        '.dnb-sidebar-menu__accordion__trigger[aria-expanded="false"] ~ .dnb-sidebar-menu__accordion__content'
      ) &&
      item.closest('.dnb-sidebar-menu') === menu &&
      item.getClientRects().length > 0 &&
      getComputedStyle(item).visibility === 'visible'
  )
}
