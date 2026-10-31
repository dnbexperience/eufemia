import type { HomePlay } from './homePlay'

export default function dance(): HomePlay {
  return {
    pose: (time, index, length) => {
      const beat = time * Math.PI * 2 * (96 / 60)
      const step = beat + (index % 2) * Math.PI
      return {
        angle: Math.sin(step / 2) * 0.16,
        lift: -((1 - Math.cos(beat)) / 2) * Math.min(36, length * 0.15),
        balance: Math.sin(step) * 0.2 + Math.sin(beat / 4) * 0.14,
        pitch: Math.cos(step / 2) * 0.1,
        x: Math.sin(beat / 2 + index) * 12,
      }
    },
  }
}
