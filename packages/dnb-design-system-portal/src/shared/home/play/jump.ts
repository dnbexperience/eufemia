import type { HomePlay } from './homePlay'

export default function jump(): HomePlay {
  return {
    pose: (time, index, length) => {
      const phase = ((time + index * 0.16) % 1.8) / 1.8
      const arc = Math.max(0, 1 - ((phase - 0.45) / 0.4) ** 2)
      return {
        angle: Math.sin(time * 2 + index) * 0.08,
        lift: -arc * Math.min(length - 48, 150 + (index % 3) * 35),
        balance: Math.sin(phase * Math.PI * 2) * 0.22,
        pitch: Math.sin(phase * Math.PI * 2) * 0.3,
      }
    },
  }
}
