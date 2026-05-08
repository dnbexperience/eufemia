/**
 * Icons that are known to render correctly when filled with CSS.
 *
 * To add an icon here, verify that the SVG looks correct when all its
 * paths are filled with `currentColor`.
 */
const filledIconNames = [
  'animal_print',
  'bell',
  'boat',
  'bubble',
  'folder',
  'graph_increase',
  'heart',
  'home',
  'lightbulb',
  'pause',
  'pin',
  'play',
  'reply',
  'shield',
  'star',
  'travel',
  'volume_on',
] as const

export type FilledIconName = (typeof filledIconNames)[number]

const filledIconSet: ReadonlySet<string> = new Set(
  filledIconNames.flatMap((name) => [name, `${name}_medium`])
)

export default filledIconSet
