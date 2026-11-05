import type { HomePlay } from './homePlay'
import './oslo.scss'

export default function oslo(root: HTMLElement): HomePlay {
  const home = root.closest<HTMLElement>('[data-portal-home]')
  const input = home.querySelector<HTMLInputElement>('#portal-home-search')
  const tilts = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]'),
    (item) =>
      (parseFloat(item.style.getPropertyValue('--tilt')) * Math.PI) / 180
  )
  let width = 0
  let y = 0
  const measure = () => {
    const area = home.getBoundingClientRect()
    const box = input.getBoundingClientRect()
    width = area.width
    y = box.top + box.height / 2 - area.top
  }
  const resize = new ResizeObserver(measure)
  resize.observe(home)
  resize.observe(input)
  root.classList.add('dnb-home-oslo')
  measure()

  return {
    space: 'page',
    overflow: true,
    pose: (time, index, length) => {
      const pair = Math.floor(index / 2)
      const direction = index % 2 ? -1 : 1
      const progress = (time / 14 + pair / 3) % 1
      const meeting = Math.max(0, 1 - Math.abs(progress - 0.5) * 24)
      const bump = Math.sin(meeting * Math.PI * 2) * meeting
      const stride = time * 5 + index * Math.PI
      return {
        angle: 0,
        x:
          width / 2 +
          direction * ((progress * 2 - 1) * (width / 2 + 180) + bump * 36),
        lift:
          y +
          (pair - 1) * 105 -
          20 -
          length -
          Math.abs(Math.sin(stride)) * 5 -
          meeting * 18,
        balance:
          -tilts[index] +
          direction * (0.1 - bump * 0.55) +
          Math.cos(stride) * 0.035,
        pitch: 0,
      }
    },
    dispose: () => {
      resize.disconnect()
      root.classList.remove('dnb-home-oslo')
    },
  }
}
