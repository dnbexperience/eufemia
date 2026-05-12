/**
 * Icons that are known to render correctly when filled with CSS.
 *
 * To add an icon here, verify that the SVG looks correct when all its
 * paths are filled with `currentColor`.
 */
const filledIconNames = [
  'heart',
  'star',

  // Interesting icons that work with fill:
  // 'bell',
  // 'bubble',
  // 'folder',
  // 'graph_increase',
  // 'home',
  // 'lightbulb',
  // 'pause',
  // 'pin',
  // 'play',
  // 'reply',
  // 'shield',
  // 'volume_on',

  // Additional icons that work with fill:
  // 'travel',
  // 'animal_print',
  // 'boat',
] as const

export type FilledIconName = (typeof filledIconNames)[number]

const filledIconSet: ReadonlySet<string> = new Set(
  filledIconNames.flatMap((name) => [name, `${name}_medium`])
)

export default filledIconSet
