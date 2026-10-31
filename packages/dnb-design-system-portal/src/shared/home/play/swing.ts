import type { HomePlay } from './homePlay'

export default function swing(): HomePlay {
  return {
    fixedAnchors: true,
    pose: (time, index, length, _width, _height, room) => {
      const left = Math.asin(Math.max(-0.87, room.left / length))
      const right = Math.asin(Math.min(0.87, room.right / length))
      const phase = time * 2.2 + index * 0.55
      return {
        angle: (left + right) / 2 + (Math.sin(phase) * (right - left)) / 2,
        lift: 0,
        balance: Math.sin(phase - 0.4) * 0.12,
      }
    },
  }
}
