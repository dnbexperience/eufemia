/**
 * Type definitions for the Eufemia CSS optimizer.
 */

export type StyleGroup = 'components' | 'fragments' | 'extensions'

// NB: StyleManifestEntry and StyleManifest are mirrored by the shipped consumer
// helper in `packages/dnb-eufemia/src/style/optimizer.ts`. Keep both in sync.
export type StyleManifestEntry = {
  /** Source directory name, e.g. `autocomplete` or `date-picker`. */
  name: string

  /** Which part of the library the entry belongs to. */
  group: StyleGroup

  /** The BEM block prefix used by the entry, e.g. `dnb-autocomplete`. */
  classPrefix: string

  /**
   * Transitively resolved component CSS dependencies (directory names). Derived
   * from the `dnb-*` class selectors found in each component's own
   * `style/*.scss` files combined with the sibling components it renders as JSX
   * (for example `Tooltip` via the `tooltip` prop, or `ProgressIndicator` in a
   * loading state). Importing or keeping this entry's CSS also requires keeping
   * these.
   */
  dependencies: string[]
}

export type StyleManifest = {
  /** Manifest schema version. */
  version: number

  /** Map of entry name to its style metadata. */
  entries: Record<string, StyleManifestEntry>

  /**
   * Foundation block prefixes that are always required, independent of which
   * components are used. These are the HTML element styles (`dnb-p`, `dnb-hr`,
   * `dnb-h`, `dnb-ul`, `dnb-ol`, `dnb-code`, `dnb-blockquote`, …) emitted by the
   * shared `Element` wrapper as a runtime `dnb-${tag}` class. Because the class
   * is computed from the tag it never appears as a literal in source or in the
   * built JS, so it can be neither import-detected nor kept by a content scan –
   * the optimizer keeps these unconditionally.
   */
  foundation: string[]

  /**
   * Per-member component dependencies for the Eufemia Forms extension, keyed by
   * the compound member name (`Field.Upload`, `Value.Upload`, `Field.Slider`,
   * …). These are the component CSS dependencies a single field/value variant
   * pulls in on top of the shared forms base (for example `Field.Upload` adds
   * `upload` and `table`). They are deliberately kept out of the `forms`
   * entry's own `dependencies` so the optimizer only keeps a heavy field's CSS
   * when that specific `Field.X`/`Value.X` member is actually used, instead of
   * for every forms import.
   */
  formsFieldDependencies: Record<string, string[]>
}

export type GenerateOptions = {
  /** Absolute path to the `@dnb/eufemia` source root (the `src` folder). */
  sourceRoot: string

  /** Groups to scan. Defaults to components, fragments and extensions. */
  groups?: StyleGroup[]
}
