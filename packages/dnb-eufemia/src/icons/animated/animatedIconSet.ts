const animatedIconNames = ['arrow_right', 'bell', 'check'] as const

export type AnimatedIconName = (typeof animatedIconNames)[number]

const animatedIconSet: ReadonlySet<string> = new Set(
  animatedIconNames.flatMap((name) => [name, `${name}_medium`])
)

export function isSupportedAnimated(name: string): boolean {
  return animatedIconSet.has(name)
}

export default animatedIconSet
