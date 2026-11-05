import type { HomePlay } from './homePlay'
import './sail.scss'

export default function sail(root: HTMLElement): HomePlay {
  const home = root.closest('[data-portal-home]')
  const specimens = Array.from(
    root.querySelectorAll<HTMLElement>('[data-home-specimen]')
  )
  let viewportWidth = 0
  let pageTop = 0
  const margin = 240
  const randomSpeed = () => 35 + Math.random() * 75
  let boats: Array<{
    height: number
    length: number
    tilt: number
    x: number
    speed: number
    time: number
  }>
  root.classList.add('dnb-home-sail')

  return {
    space: 'page',
    overflow: true,
    pose: (time, index, _length, width) => {
      if (viewportWidth !== window.innerWidth) {
        viewportWidth = window.innerWidth
        pageTop = home.getBoundingClientRect().top + window.scrollY
        boats = specimens.map((item, index) => ({
          x: -margin - index * 50 - Math.random() * 60,
          speed: randomSpeed(),
          time,
          height: item.getBoundingClientRect().height,
          length: item.offsetTop,
          tilt:
            (parseFloat(
              item.parentElement.style.getPropertyValue('--tilt')
            ) *
              Math.PI) /
            180,
        }))
      }
      const boat = boats[index]
      boat.x += boat.speed * (time - boat.time)
      boat.time = time
      if (boat.x > width + margin) {
        boat.x = -margin
        boat.speed = randomSpeed()
      }
      const wave = time * 1.5 + index * 0.9
      return {
        angle: 0,
        x: boat.x,
        lift:
          window.scrollY +
          window.innerHeight -
          pageTop -
          boat.height -
          28 -
          (index % 3) * 14 -
          Math.sin(wave) * 8 -
          boat.length,
        balance: -boat.tilt + Math.cos(wave) * 0.07,
        pitch: Math.sin(wave - 0.5) * 0.08,
      }
    },
    dispose: () => {
      root.classList.remove('dnb-home-sail')
    },
  }
}
