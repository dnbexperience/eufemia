import type { HomePlay } from './homePlay'
import darkMode from './darkMode'
import './sleep.scss'

export default function sleep(root: HTMLElement): HomePlay {
  const restoreTheme = darkMode()
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]')
  )
  const awakened = items.map(() => -Infinity)
  let now = 0
  const wake = (event: PointerEvent | MouseEvent) => {
    if (event.button !== 0) {
      return
    }
    const item = (event.target as Element).closest<HTMLElement>(
      '[data-hanging-item]'
    )
    const index = items.indexOf(item)
    if (index < 0) {
      return
    }
    if (event.type === 'pointerdown') {
      // Keep the sleeping control under the pointer until its normal click completes.
      event.stopPropagation()
      return
    }
    awakened[index] = now
    item.dataset.sleepWake = ''
  }
  root.addEventListener('pointerdown', wake, true)
  root.addEventListener('click', wake, true)
  let resting: Array<{ x: number; floor: number; tilt: number }>
  root.classList.add('dnb-home-sleep')
  return {
    pose: (time, index, length) => {
      now = time
      resting ??= items.map((item) => {
        const depth = Number(
          getComputedStyle(item).getPropertyValue('--depth')
        )
        const carnegie = item.dataset.hangingItem === 'carnegie'
        item.style.setProperty(
          '--sleep-turn',
          (carnegie ? -0.1 : Math.sin(depth * 2.1 + 0.4) * 0.45) + 'rad'
        )
        return {
          x:
            root.clientWidth *
              (carnegie
                ? 0.29
                : 0.5 + Math.sin(depth * 2.4 + 0.4) * 0.23) -
            item.offsetLeft,
          floor:
            (item.lastElementChild as HTMLElement).offsetTop -
            8 +
            (carnegie ? -2 : 0),
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
      const elapsed = Math.min(1.2, time - awakened[index])
      const awake = Math.max(
        0,
        Math.min(1, elapsed * 14, (1.2 - elapsed) / 0.35)
      )
      if (items[index].hasAttribute('data-sleep-wake')) {
        items[index].style.setProperty('--sleep-wake', String(awake))
        if (elapsed >= 1.2) {
          delete items[index].dataset.sleepWake
        }
      }
      return {
        angle: 0,
        lift: (resting[index].floor - length) * fall - awake * 140,
        pitch:
          fall *
          (items[index].dataset.hangingItem === 'carnegie' ? 1.35 : 1.28) *
          (1 - awake),
        balance:
          -resting[index].tilt * fall +
          settle +
          Math.sin(elapsed * 42) * 0.14 * awake,
        x: resting[index].x * fall,
      }
    },
    dispose: () => {
      root.removeEventListener('pointerdown', wake, true)
      root.removeEventListener('click', wake, true)
      items.forEach((item) => {
        item.style.removeProperty('--sleep-wake')
        item.style.removeProperty('--sleep-turn')
        delete item.dataset.sleepWake
      })
      root.classList.remove('dnb-home-sleep')
      restoreTheme()
    },
  }
}
