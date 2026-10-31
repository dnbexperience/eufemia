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
  dance: () => import('./dance'),
  run: () => import('./run'),
  jump: () => import('./jump'),
  swing: () => import('./swing'),
  christmas: () => import('./christmas'),
  space: () => import('./space'),
  sleep: () => import('./sleep'),
  dead: () => import('./dead'),
  party: () => import('./party'),
  hide: () => import('./hide'),
}

export const homePlayCommands = Object.keys(commands)

export function loadHomePlay(value: string) {
  const command = value.trim().toLowerCase()
  return Object.hasOwn(commands, command)
    ? commands[command as keyof typeof commands]()
    : undefined
}
