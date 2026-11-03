import type { KeyboardEvent } from 'react'

export function handleMenuNavigation(
  event: KeyboardEvent<HTMLElement>,
  {
    items,
    currentIndex = items.indexOf(document.activeElement as HTMLElement),
    focusItem = (item) => item.focus(),
    wrap = true,
  }: {
    items: HTMLElement[]
    currentIndex?: number
    focusItem?: (item: HTMLElement) => void
    wrap?: boolean
  }
) {
  if (!isMenuNavigationKey(event) || items.length === 0) {
    return
  }

  let nextIndex: number
  switch (event.key) {
    case 'ArrowDown':
      nextIndex = currentIndex === -1 ? 0 : currentIndex + 1
      break
    case 'ArrowUp':
      nextIndex = currentIndex === -1 ? items.length - 1 : currentIndex - 1
      break
    case 'Home':
    case 'PageUp':
      nextIndex = 0
      break
    case 'End':
    case 'PageDown':
      nextIndex = items.length - 1
      break
    default:
      if (event.key.length === 1 && event.key !== ' ') {
        const char = event.key.toLowerCase()
        const startIndex = currentIndex === -1 ? 0 : currentIndex + 1
        for (let i = 0; i < items.length; i++) {
          const item = items[(startIndex + i) % items.length]
          if (item.textContent?.trim().toLowerCase().startsWith(char)) {
            focusItem(item)
            break
          }
        }
      }
      return
  }

  event.preventDefault()
  event.stopPropagation()
  const next =
    items[wrap ? (nextIndex + items.length) % items.length : nextIndex]
  if (next) {
    focusItem(next)
  }
}

export function handleMenuAccordionNavigation(
  event: KeyboardEvent<HTMLElement>,
  {
    isOpen,
    setOpen,
    focusFirstChild,
    closeSelf,
    toggleOnActivate = false,
  }: {
    isOpen: boolean
    setOpen: (open: boolean) => void
    focusFirstChild: () => void
    closeSelf: () => void
    toggleOnActivate?: boolean
  }
) {
  if (ignoreKeyDown(event)) {
    return
  }

  const activate =
    toggleOnActivate && (event.key === 'Enter' || event.key === ' ')
  if (event.key === 'ArrowRight' || activate) {
    event.preventDefault()
    event.stopPropagation()
    if (!isOpen) {
      setOpen(true)
      requestAnimationFrame(focusFirstChild)
    } else if (activate) {
      setOpen(false)
    } else {
      focusFirstChild()
    }
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    event.stopPropagation()
    closeSelf()
  }
}

function ignoreKeyDown(event: KeyboardEvent<HTMLElement>) {
  return (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    (event.shiftKey && event.key.length !== 1)
  )
}

export function isMenuNavigationKey(event: KeyboardEvent<HTMLElement>) {
  return (
    !ignoreKeyDown(event) &&
    ([
      'ArrowDown',
      'ArrowUp',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ].includes(event.key) ||
      (event.key.length === 1 && event.key !== ' '))
  )
}
