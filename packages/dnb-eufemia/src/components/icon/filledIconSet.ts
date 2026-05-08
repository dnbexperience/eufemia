/**
 * Icons that are known to render correctly when filled with CSS.
 *
 * When `filled` is set via `Icon.Filled` (context), only icons in this
 * list will receive the `dnb-icon--filled` class. When `filled` is set
 * directly as a prop, it is always applied regardless of this list.
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
