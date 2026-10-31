import type { HomePlay } from './homePlay'
import darkMode from './darkMode'
import './christmas.scss'

export default function christmas(root: HTMLElement): HomePlay {
  const restoreTheme = darkMode()
  const snow = document.createElement('span')
  snow.className = 'dnb-home-snow'
  snow.setAttribute('aria-hidden', 'true')
  root.appendChild(snow)
  root.classList.add('dnb-home-christmas')
  return {
    pose: (time, index) => ({
      angle: Math.sin(time * 1.5 + index * 0.7) * 0.08,
      lift: 0,
    }),
    dispose: () => {
      restoreTheme()
      snow.remove()
      root.classList.remove('dnb-home-christmas')
    },
  }
}
