import type { HomePlay } from './homePlay'

export default function run(): HomePlay {
  return {
    space: 'page',
    pose: (time, index, length, width, height) => {
      const lap = time * 0.85 + index * 1.05
      const stride = time * 15 + index * 1.8
      return {
        angle: 0,
        lift:
          100 +
          ((Math.sin(lap * 1.3 + index) + 1) / 2) * (height - 240) -
          length -
          Math.abs(Math.sin(stride)) * 30,
        balance: Math.cos(lap) * 0.24 + Math.sin(stride) * 0.08,
        pitch: Math.cos(stride) * 0.18,
        x: 100 + ((Math.sin(lap) + 1) / 2) * (width - 200),
      }
    },
  }
}
