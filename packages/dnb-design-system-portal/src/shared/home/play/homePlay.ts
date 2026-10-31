export type Pose = {
  angle: number
  lift: number
  balance?: number
  pitch?: number
  x?: number
}

export type HomePlay = {
  space?: 'page'
  fixedAnchors?: boolean
  overflow?: boolean
  pose: (
    time: number,
    index: number,
    length: number,
    width: number,
    height: number,
    room: { left: number; right: number }
  ) => Pose
  dispose?: () => void
}

const commands = {
  swing: () => import('./swing'),
  space: () => import('./space'),
  jump: () => import('./jump'),
  dance: () => import('./dance'),
  run: () => import('./run'),
  sleep: () => import('./sleep'),
  hide: () => import('./hide'),
  sail: () => import('./sail'),
  party: () => import('./party'),
  christmas: () => import('./christmas'),
}

export const homePlayCommands = Object.keys(commands).filter(
  (command) => command !== 'sleep'
)

export function isHomePlay(value: string) {
  return Object.hasOwn(commands, value.trim().toLowerCase())
}

export function loadHomePlay(value: string) {
  const command = value.trim().toLowerCase()
  return isHomePlay(command)
    ? commands[command as keyof typeof commands]()
    : undefined
}
