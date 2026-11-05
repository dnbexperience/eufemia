import type { HomePlay } from './homePlay'
import './bergen.scss'

export default function bergen(root: HTMLElement): HomePlay {
  const home = root.closest<HTMLElement>('[data-portal-home]')
  const input = home.querySelector<HTMLInputElement>('#portal-home-search')
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]')
  )
  const start = items.map((item) => {
    const box = item.querySelector<HTMLElement>('[data-home-specimen]')
    return {
      x:
        item.getBoundingClientRect().left -
        home.getBoundingClientRect().left,
      y: box.offsetTop,
      dx:
        box.offsetWidth *
        (0.5 - parseFloat(item.style.getPropertyValue('--pin')) / 100),
      dy: box.offsetHeight / 2,
      tilt:
        (parseFloat(item.style.getPropertyValue('--tilt')) * Math.PI) /
        180,
    }
  })
  const stage = document.createElement('span')
  stage.className = 'dnb-home-bergen-stage'
  stage.setAttribute('aria-hidden', 'true')
  home.append(stage)
  root.classList.add('dnb-home-bergen')
  let x = 0
  let y = 0
  let small = false
  const measure = () => {
    const box = input.getBoundingClientRect()
    const area = home.getBoundingClientRect()
    small = box.width < 400
    const font = getComputedStyle(input)
    const measure = document.createElement('canvas').getContext('2d')
    measure.font = `${font.fontSize} ${font.fontFamily}`
    const word =
      box.left +
      parseFloat(font.paddingLeft) -
      input.scrollLeft +
      measure.measureText(input.value).width / 2 -
      area.left
    x = word
    y = box.top + box.height / 2 - area.top
    stage.style.left = x + 'px'
    stage.style.top = y + 'px'
    stage.style.width = Math.min(240, x * 2) + 'px'
  }
  const resize = new ResizeObserver(measure)
  resize.observe(input)
  resize.observe(home)
  measure()

  return {
    space: 'page',
    overflow: true,
    pose: (time, index, length) => {
      const arrival = Math.max(0, time - index * 0.18)
      const progress = Math.min(1, arrival / 1.8)
      const approach = 1 - (1 - progress) ** 3
      const dance = Math.max(0, time - 2.7)
      const lap = (index / items.length) * Math.PI * 2 + dance * 0.5
      const beat = dance * Math.PI * 2 * (96 / 60)
      const danceScale = small ? 0.65 : 0.85
      const radius = small ? 100 : 145
      const hop = Math.abs(Math.sin(arrival * 9)) * 30 * (1 - progress)
      const scale = 1 + (danceScale - 1) * approach
      items[index].style.setProperty('--bergen-scale', String(scale))
      const from = start[index]
      const turn = Math.sin(beat + index * 0.4) * 0.18
      const centreX =
        scale * (Math.cos(turn) * from.dx - Math.sin(turn) * from.dy)
      const centreY =
        scale * (Math.sin(turn) * from.dx + Math.cos(turn) * from.dy)
      const targetX = x + Math.cos(lap) * radius - centreX
      const targetY = y + Math.sin(lap) * radius - centreY
      return {
        angle: 0,
        x: from.x + (targetX - from.x) * approach,
        lift: from.y + (targetY - from.y) * approach - length - hop,
        balance: -from.tilt * approach + turn,
        pitch: 0,
      }
    },
    dispose: () => {
      resize.disconnect()
      stage.remove()
      root.classList.remove('dnb-home-bergen')
      items.forEach((item) => item.style.removeProperty('--bergen-scale'))
    },
  }
}
