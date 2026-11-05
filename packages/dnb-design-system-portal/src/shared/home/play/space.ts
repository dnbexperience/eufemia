import type { HomePlay } from './homePlay'

export default function space(): HomePlay {
  return {
    pose: (time, index, length) => ({
      angle: Math.sin(time * 0.55 + index) * 0.18,
      lift:
        -(0.5 + Math.sin(time * 0.8 + index * 1.2) * 0.3) *
        Math.min(length * 0.5, 150),
      balance: time * (index % 2 ? -0.28 : 0.28),
      pitch: Math.sin(time * 0.6 + index) * 0.3,
      x: Math.cos(time * 0.4 + index) * 30,
    }),
  }
}
