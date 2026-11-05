import type { HomePlay } from './homePlay'
import './hide.scss'

export default function hide(root: HTMLElement): HomePlay {
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]')
  )
  const widths = items.map(
    (item) =>
      item.querySelector<HTMLElement>('[data-home-specimen]').offsetWidth
  )
  root.classList.add('dnb-home-hide')
  return {
    space: 'page',
    pose: (time, index, length, width, height) => {
      const progress = Math.min(
        1,
        Math.max(0, (time - index * 0.08) / 0.65)
      )
      const peek = Math.max(0, Math.sin(time * 0.8 - index * 1.1)) ** 16
      const offset = (index % 2 ? 1 : -1) * progress * (1.4 - peek * 0.75)
      const lift =
        Math.min(height * 0.3, window.innerHeight * 0.3) +
        index * 42 +
        Math.sin(time + index) * 8 -
        length
      items[index].style.setProperty('--hide-offset', offset * 100 + '%')
      items[index].style.setProperty(
        '--hide-rope-slant',
        Math.atan2(offset * widths[index], length + lift) + 'rad'
      )
      return {
        angle: 0,
        lift,
        balance: Math.sin(time * 0.7 + index) * 0.08,
        x: index % 2 ? width : 0,
      }
    },
    dispose: () => {
      root.classList.remove('dnb-home-hide')
      items.forEach((item) => {
        item.style.removeProperty('--hide-offset')
        item.style.removeProperty('--hide-rope-slant')
      })
    },
  }
}
