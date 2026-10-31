import type { HomePlay } from './homePlay'
import darkMode from './darkMode'
import './sleep.scss'

export default function sleep(root: HTMLElement): HomePlay {
  const restoreTheme = darkMode()
  let resting: Array<{ x: number; floor: number; tilt: number }>
  root.classList.add('dnb-home-sleep')
  return {
    pose: (time, index, length) => {
      resting ??= Array.from(
        root.querySelectorAll<HTMLElement>('[data-hanging-item]')
      ).map((item) => {
        const depth = Number(
          getComputedStyle(item).getPropertyValue('--depth')
        )
        return {
          x: root.clientWidth * 0.52 + (depth - 2.5) * 9 - item.offsetLeft,
          floor: (item.lastElementChild as HTMLElement).offsetTop - 8,
          tilt:
            (parseFloat(item.style.getPropertyValue('--tilt')) * Math.PI) /
            180,
        }
      })
      const progress = Math.max(
        0,
        Math.min(1, (time - index * 0.09) / 0.8)
      )
      const fall = progress * progress
      const settle =
        Math.sin(progress * Math.PI * 3) * (1 - progress) * 0.12
      return {
        angle: 0,
        lift: (resting[index].floor - length) * fall,
        pitch: fall * 1.28,
        balance: -resting[index].tilt * fall + settle,
        x: resting[index].x * fall,
      }
    },
    dispose: () => {
      root.classList.remove('dnb-home-sleep')
      restoreTheme()
    },
  }
}
