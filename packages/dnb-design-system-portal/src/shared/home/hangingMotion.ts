import type { HomePlay } from './play/homePlay'

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))
const gravity = 3200
const reboundHeight = (speed: number, length: number) =>
  Math.min(length * 0.45, (speed ** 2 / (2 * gravity)) * 0.3)

export default function mountHangingMotion(
  root: HTMLDivElement,
  enter = false
) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hanging-item]')
  ).map((element) => ({
    element,
    rope: element.querySelector('path'),
    angle: 0,
    velocity: 0,
    balance: 0,
    balanceVelocity: 0,
    gust: 0,
    gustTime: 0,
    pitch: 0,
    pitchVelocity: 0,
    lift: 0,
    drop: undefined as
      | {
          height: number
          rebound: number
          speed: number
          elapsed: number
          duration: number
          fall?: { x: number; y: number; vx: number }
        }
      | undefined,
    length: (element.firstElementChild as HTMLElement).offsetHeight,
  }))
  const findItem = (target: EventTarget) => {
    const element = (target as Element).closest('[data-hanging-item]')
    return items.find((item) => item.element === element)
  }
  const measureLength = (item: (typeof items)[number]) =>
    Math.max(
      1,
      (item.element.firstElementChild as HTMLElement).offsetHeight -
        item.lift
    )
  let drag:
    | {
        item: (typeof items)[number]
        x: number
        y: number
        pointer: number
        moved: boolean
        touch: boolean
        anchorX: number
        anchorY: number
        gripX: number
        gripY: number
        pitch: number
        edge: number
        capture: Element
        lastTime: number
        lastX: number
        lastY: number
        speedX: number
        speed: number
      }
    | undefined
  let frame = 0
  let previous = 0
  let suppressClick = false
  let breezeTimer: ReturnType<typeof setTimeout>
  let play: HomePlay | undefined
  let playTime = 0
  let returning: Animation[] = []
  let playArea = root.getBoundingClientRect()
  let playBounds: Array<{ left: number; right: number; origin: number }> =
    []

  const paint = (item: (typeof items)[number]) => {
    item.element.style.setProperty('--swing', item.angle + 'rad')
    item.element.style.setProperty('--balance', item.balance + 'rad')
    item.element.style.setProperty('--pitch', item.pitch + 'rad')
    item.element.style.setProperty('--lift-y', item.lift + 'px')
    const maxBend = Math.min(18, (item.length + item.lift) * 0.08)
    const bend = clamp(
      -Math.sin(item.angle) * Math.max(0, -item.lift) * 0.6 -
        item.velocity * 5,
      -maxBend,
      maxBend
    )
    item.element.style.setProperty(
      '--rope-curve',
      String(Math.min(1, Math.abs(bend) / 2))
    )
    item.rope?.setAttribute('d', 'M32 0 Q' + (32 + bend) + ' 50 32 100')
  }
  const tick = (time: number, snap = false) => {
    const dt = snap
      ? 0
      : Math.min((time - previous) / 1000 || 1 / 60, 1 / 30)
    previous = time
    let moving = false
    for (const [index, item] of items.entries()) {
      if (play && drag?.item !== item) {
        const pose = play.pose(
          playTime,
          index,
          item.length,
          playArea.width,
          playArea.height,
          playBounds[index]
        )
        const blend = snap ? 1 : 1 - Math.exp(-dt * 14)
        const bounds = playBounds[index]
        item.angle += (pose.angle - item.angle) * blend
        item.lift += (pose.lift - item.lift) * blend
        item.balance += ((pose.balance ?? 0) - item.balance) * blend
        item.pitch += ((pose.pitch ?? 0) - item.pitch) * blend
        const swingX = Math.sin(item.angle) * (item.length + item.lift)
        const travel = clamp(
          (pose.x ?? 0) -
            (play.space === 'page' ? playBounds[index].origin : 0) +
            swingX,
          bounds.left,
          bounds.right
        )
        item.element.style.setProperty(
          '--travel-x',
          (play.fixedAnchors ? 0 : travel - swingX) + 'px'
        )
        item.drop = undefined
        paint(item)
        moving = true
        continue
      }
      if (item.drop && item.drop.elapsed < 0) {
        item.drop.elapsed += dt
        moving = true
        continue
      }
      const held = drag?.item === item && (drag.moved || !drag.touch)
      if (!held) {
        if (item.gustTime < 1) {
          item.velocity +=
            item.gust * Math.sin(Math.PI * item.gustTime) * dt
          item.gustTime = Math.min(1, item.gustTime + dt)
        }
        if (!item.drop?.fall) {
          item.velocity +=
            (-(gravity / item.length) * Math.sin(item.angle) -
              item.velocity * 1.2) *
            dt
          item.angle += item.velocity * dt
        }
        // A little delayed leveling lets the control settle independently of its rope.
        const target = clamp(item.angle * 0.3, -0.12, 0.12)
        item.balanceVelocity +=
          ((target - item.balance) * 35 - item.balanceVelocity * 4) * dt
        item.balance += item.balanceVelocity * dt
        item.pitchVelocity +=
          (-item.pitch * 90 - item.pitchVelocity * 16) * dt
        item.pitch += item.pitchVelocity * dt
        if (item.drop) {
          const drop = item.drop
          drop.elapsed += dt
          if (drop.fall) {
            const time = drop.elapsed
            const { y, vx } = drop.fall
            const x = drop.fall.x + vx * time
            const fallY = y + drop.speed * time + (gravity / 2) * time ** 2
            const radius = Math.hypot(x, fallY)
            item.angle = Math.atan2(x, fallY)
            item.lift = Math.min(0, radius - item.length)
            item.velocity = clamp(
              (vx * fallY - x * (drop.speed + gravity * time)) /
                radius ** 2,
              -2,
              2
            )
            if (radius >= item.length) {
              const impact =
                (vx * x + (drop.speed + gravity * time) * fallY) / radius
              drop.rebound = reboundHeight(impact, item.length)
              drop.duration = drop.elapsed
              drop.fall = undefined
            }
          }
          if (drop.elapsed < drop.duration && !drop.fall) {
            item.lift =
              Math.sign(drop.height) *
              (-Math.abs(drop.height) +
                drop.speed * drop.elapsed +
                (gravity / 2) * drop.elapsed ** 2)
          } else if (!drop.fall && drop.elapsed >= drop.duration) {
            let elapsed = drop.elapsed - drop.duration
            let height = drop.rebound
            // The same gravity sets the timing of every smaller rebound.
            while (height > 0.5) {
              const duration = Math.sqrt((8 * height) / gravity)
              if (elapsed < duration) {
                const progress = elapsed / duration
                item.lift = -4 * height * progress * (1 - progress)
                break
              }
              elapsed -= duration
              height *= 0.3
            }
            if (height <= 0.5) {
              item.lift = 0
              item.drop = undefined
            }
          }
        }
      }
      paint(item)
      moving ||=
        held ||
        Math.abs(item.angle) +
          (item.gustTime < 1 ? Math.abs(item.gust) : 0) +
          Math.abs(item.velocity) +
          Math.abs(item.balance) +
          Math.abs(item.balanceVelocity) +
          Math.abs(item.pitch) +
          Math.abs(item.pitchVelocity) +
          Math.abs(item.lift) +
          (item.drop ? 1 : 0) >
          0.002
    }
    playTime += dt
    frame = moving ? requestAnimationFrame(tick) : 0
  }
  const wake = () => {
    if (!frame && !reduced.matches) {
      previous = 0
      frame = requestAnimationFrame(tick)
    }
  }
  const breeze = () => {
    const box = root.getBoundingClientRect()
    if (
      play ||
      reduced.matches ||
      drag ||
      document.hidden ||
      document.querySelector('[aria-modal="true"]') ||
      root.matches(':hover, :focus-within') ||
      box.bottom <= 0 ||
      box.top >= window.innerHeight
    ) {
      return
    }
    const start = Math.floor(Math.random() * items.length)
    const count = 2 + Math.floor(Math.random() * 2)
    for (let index = 0; index < count; index++) {
      const item = items[(start + index) % items.length]
      if (Math.abs(item.angle) + Math.abs(item.velocity) < 0.002) {
        item.length = measureLength(item)
        item.gust = (Math.random() < 0.5 ? -1 : 1) * 0.04
        item.gustTime = 0
      }
    }
    wake()
  }
  const scheduleBreeze = () => {
    breezeTimer = setTimeout(
      () => {
        breeze()
        scheduleBreeze()
      },
      6000 + Math.random() * 4000
    )
  }
  const down = (event: PointerEvent) => {
    if (event.button !== 0 || reduced.matches || drag) {
      return
    }
    returning.forEach((animation) => animation.cancel())
    suppressClick = false
    const item = findItem(event.target)
    if (item) {
      item.length = measureLength(item)
      item.velocity = item.balanceVelocity = 0
      item.pitchVelocity = 0
      item.drop = undefined
      item.gust = 0
      if (event.pointerType === 'touch') {
        hover(event)
      }
      const box = item.element
        .querySelector('[data-home-specimen]')
        .getBoundingClientRect()
      const capture = event.target as Element
      const anchor = item.element.getBoundingClientRect()
      const radius = item.length + item.lift
      const gripX =
        event.clientX - anchor.left - Math.sin(item.angle) * radius
      const gripY =
        event.clientY - anchor.top - Math.cos(item.angle) * radius
      capture.setPointerCapture(event.pointerId)
      drag = {
        item,
        x: event.clientX,
        y: event.clientY,
        pointer: event.pointerId,
        moved: false,
        touch: event.pointerType === 'touch',
        anchorX: anchor.left,
        anchorY: anchor.top,
        gripX: gripX * Math.cos(item.angle) - gripY * Math.sin(item.angle),
        gripY: gripX * Math.sin(item.angle) + gripY * Math.cos(item.angle),
        pitch: item.pitch,
        edge: clamp(
          ((event.clientX - box.left) / box.width) * 2 - 1,
          -1,
          1
        ),
        capture,
        lastTime: event.timeStamp,
        lastX: event.clientX,
        lastY: event.clientY,
        speedX: 0,
        speed: 0,
      }
      wake()
    }
  }
  const hover = (event: PointerEvent) => {
    if (
      (event.pointerType !== 'mouse' && event.pointerType !== 'touch') ||
      drag ||
      reduced.matches
    ) {
      return
    }
    const item = findItem(event.target)
    if (!item || item.element.contains(event.relatedTarget as Node)) {
      return
    }
    if (Math.abs(item.angle) + Math.abs(item.velocity) < 0.02) {
      const box = item.element
        .querySelector('[data-home-specimen]')
        .getBoundingClientRect()
      item.velocity +=
        event.clientX < box.left + box.width / 2 ? 0.035 : -0.035
      wake()
    }
  }
  const move = (event: PointerEvent) => {
    if (!drag || drag.pointer !== event.pointerId) {
      return
    }
    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y
    if (!drag.moved && Math.hypot(dx, dy) < 5) {
      return
    }
    drag.moved = true
    const element = drag.item.element
    element.dataset.dragging = 'true'
    const x = event.clientX - drag.anchorX
    const y = Math.max(1, event.clientY - drag.anchorY)
    // Keep the grabbed point under the pointer as the control rotates.
    const { gripX, gripY } = drag
    const radius = Math.max(
      1,
      Math.sqrt(Math.max(0, x * x + y * y - gripX * gripX)) - gripY
    )
    const angle = Math.atan2(x, y) - Math.atan2(gripX, radius + gripY)
    const dt = Math.max((event.timeStamp - drag.lastTime) / 1000, 1 / 120)
    drag.item.velocity = clamp((angle - drag.item.angle) / dt, -2, 2)
    drag.item.angle = angle
    const tiltLimit = 0.12 + Math.abs(drag.edge) * 0.4
    drag.item.pitch = clamp(
      drag.pitch - (dy / 160) * tiltLimit,
      -tiltLimit,
      tiltLimit
    )
    drag.item.lift = radius - drag.item.length
    drag.speedX = clamp((event.clientX - drag.lastX) / dt, -1200, 1200)
    drag.speed = clamp((event.clientY - drag.lastY) / dt, -1200, 1200)
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    drag.lastTime = event.timeStamp
    paint(drag.item)
    wake()
  }
  const dropItem = (
    item: (typeof items)[number],
    speed = 0,
    speedX = 0,
    delay = 0
  ) => {
    if (Math.abs(item.lift) > 0) {
      const { angle, lift, length } = item
      const fall =
        lift < 0
          ? {
              x: Math.sin(angle) * (length + lift),
              y: Math.cos(angle) * (length + lift),
              vx: speedX,
            }
          : undefined
      const height = fall
        ? Math.sqrt(Math.max(0, length ** 2 - fall.x ** 2)) - fall.y
        : Math.abs(lift)
      const startSpeed = clamp(
        Math.sign(-lift) * speed,
        fall ? -Math.sqrt(2 * gravity * Math.max(0, fall.y - 24)) : -1200,
        1200
      )
      const impact = Math.sqrt(startSpeed ** 2 + 2 * gravity * height)
      item.drop = {
        height: Math.sign(-lift) * height,
        fall,
        speed: startSpeed,
        rebound: reboundHeight(impact, length),
        elapsed: -delay,
        duration: (impact - startSpeed) / gravity,
      }
    } else {
      item.lift = 0
    }
  }
  const release = (event: PointerEvent) => {
    if (!drag || drag.pointer !== event.pointerId) {
      return
    }
    suppressClick = drag.moved
    const element = drag.item.element
    delete element.dataset.dragging
    const stopped =
      event.type === 'pointercancel' ||
      event.timeStamp - drag.lastTime > 80
    dropItem(
      drag.item,
      stopped ? 0 : drag.speed,
      stopped ? 0 : drag.speedX
    )
    if (stopped && (drag.moved || event.type === 'pointercancel')) {
      drag.item.velocity = 0
    }
    if (drag.capture.hasPointerCapture(event.pointerId)) {
      drag.capture.releasePointerCapture(event.pointerId)
    }
    drag = undefined
    wake()
  }
  const click = (event: MouseEvent) => {
    if (suppressClick && event.detail > 0) {
      event.preventDefault()
      event.stopPropagation()
      suppressClick = false
    }
  }
  const reset = () => {
    returning.forEach((animation) => animation.cancel())
    returning = []
    root.removeAttribute('data-home-play')
    cancelAnimationFrame(frame)
    frame = 0
    drag = undefined
    for (const item of items) {
      item.angle =
        item.gust =
        item.velocity =
        item.balance =
        item.balanceVelocity =
        item.pitch =
        item.pitchVelocity =
        item.lift =
          0
      item.drop = undefined
      item.element.style.removeProperty('--travel-x')
      delete item.element.dataset.dragging
      paint(item)
    }
  }
  const onMotionChange = () => {
    clearTimeout(breezeTimer)
    play?.dispose?.()
    play = undefined
    reset()
    if (!reduced.matches) {
      scheduleBreeze()
    }
  }
  root.addEventListener('pointerdown', down)
  root.addEventListener('pointerover', hover)
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', release)
  window.addEventListener('pointercancel', release)
  root.addEventListener('click', click, true)
  reduced.addEventListener('change', onMotionChange)
  if (!reduced.matches) {
    scheduleBreeze()
  }
  const destroy = () => {
    clearTimeout(breezeTimer)
    play?.dispose?.()
    reset()
    root.removeEventListener('pointerdown', down)
    root.removeEventListener('pointerover', hover)
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', release)
    window.removeEventListener('pointercancel', release)
    root.removeEventListener('click', click, true)
    reduced.removeEventListener('change', onMotionChange)
  }
  if (enter && !reduced.matches) {
    items.forEach((item, index) => {
      item.length = measureLength(item)
      item.lift = -Math.max(0, item.length - 48)
      item.angle = (index % 2 ? -1 : 1) * 0.5
      dropItem(item, 0, 0, index * 0.09)
      paint(item)
    })
    wake()
  }
  const setPlay = (next?: (root: HTMLElement) => HomePlay) => {
    if (!play && !next) {
      return
    }
    const parts = !reduced.matches
      ? items.flatMap(({ element }) => [
          element,
          ...Array.from(element.children),
        ])
      : []
    const snapshot = (element: Element): Keyframe => {
      const style = getComputedStyle(element)
      return {
        ...Object.fromEntries(
          ['transform', 'translate', 'top', 'left', 'height'].map(
            (property) => [property, style.getPropertyValue(property)]
          )
        ),
        zIndex: style.zIndex,
      }
    }
    const before = parts.map(snapshot)
    const positions = parts.map((element) =>
      element.getBoundingClientRect()
    )
    play?.dispose?.()
    reset()
    play = reduced.matches ? undefined : next?.(root)
    if (play?.space) {
      root.dataset.homePlay = play.space
    }
    playArea = (
      play?.space === 'page' || play?.fixedAnchors
        ? root.closest('[data-portal-home]')
        : root
    ).getBoundingClientRect()
    playBounds = items.map(({ element }) => {
      const box = element
        .querySelector('[data-home-specimen]')
        .getBoundingClientRect()
      return {
        left: playArea.left - box.left + 12,
        right: playArea.right - box.right - 12,
        origin: element.getBoundingClientRect().left - playArea.left,
      }
    })
    items.forEach((item) => {
      item.length = measureLength(item)
    })
    playTime = 0
    if (play) {
      tick(0, true)
    }
    returning = parts.map((element, index) => {
      const after = snapshot(element)
      if (!play) {
        after.zIndex = before[index].zIndex
      }
      if (element.hasAttribute('data-hanging-item')) {
        const bounds = element.getBoundingClientRect()
        const travelX = parseFloat(String(after.translate)) || 0
        before[index] = {
          ...before[index],
          left: after.left,
          top: after.top,
          translate: `${positions[index].left - bounds.left + travelX}px ${positions[index].top - bounds.top}px`,
        }
      }
      // An implicit endpoint blends into the live pose as the effect moves.
      return element.animate(
        play ? [{ ...before[index], offset: 0 }] : [before[index], after],
        {
          duration: 650,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }
      )
    })
    wake()
  }
  return { destroy, down, move, release, hover, breeze, setPlay }
}
