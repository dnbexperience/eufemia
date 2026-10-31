import darkMode from './darkMode'
import type { HomePlay } from './homePlay'
import './party.scss'

export default function party(root: HTMLElement): HomePlay {
  const restoreTheme = darkMode()
  const home = root.closest('[data-portal-home]')
  const pageTop = home.getBoundingClientRect().top + window.scrollY
  const dancers = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]')
  )
  const lights = document.createElement('span')
  lights.className = 'dnb-home-party-lights'
  lights.setAttribute('aria-hidden', 'true')
  home.appendChild(lights)
  root.classList.add('dnb-home-party')

  return {
    space: 'page',
    pose: (time, index, length, width) => {
      const lap = time * 0.38 + (index * Math.PI) / 3
      const beat = time * Math.PI * 2 * (96 / 60)
      const depth = Math.sin(lap)
      dancers[index].style.zIndex = String(Math.round(20 + depth * 10))
      return {
        angle: Math.sin(time * 1.8 + index * 0.7) * 0.06,
        x:
          width *
          (0.5 + Math.cos(lap) * 0.3 + Math.sin(time * 0.16) * 0.06),
        lift:
          window.innerHeight * 0.5 -
          pageTop +
          window.scrollY -
          24 +
          depth * Math.min(window.innerHeight * 0.14, 120) -
          length -
          (1 - Math.cos(beat)) * 14,
        balance:
          Math.sin(beat / 2 + index * 0.25) * 0.18 + Math.cos(lap) * 0.12,
        pitch: Math.sin(beat + index * 0.25) * 0.12,
      }
    },
    dispose: () => {
      root.classList.remove('dnb-home-party')
      const fade = lights.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches
          ? 0
          : 650,
        fill: 'forwards',
      })
      fade.onfinish = () => lights.remove()
      dancers.forEach((item) => item.style.removeProperty('z-index'))
      restoreTheme()
    },
  }
}
