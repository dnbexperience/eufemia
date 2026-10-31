import type { HomePlay } from './homePlay'
import darkMode from './darkMode'

export default function sleep(): HomePlay {
  return {
    dispose: darkMode(),
    pose: (time, index) => ({
      angle: Math.sin(time * 0.65 + index * 0.35) * 0.035,
      lift: -Math.sin(time * 1.1 + index * 0.25) * 3,
      balance: (index % 2 ? -0.16 : 0.16) + Math.sin(time * 1.1) * 0.025,
      pitch: Math.sin(time * 1.1 + index * 0.25) * 0.035,
    }),
  }
}
