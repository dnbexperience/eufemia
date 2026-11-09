import type { InputProps } from '../input/Input'

export type SearchProps = Pick<
  InputProps,
  | 'label'
  | 'lang'
  | 'placeholder'
  | 'labelSrOnly'
  | 'size'
  | 'disabled'
  | 'skeleton'
  | 'className'
  | 'stretch'
  | 'showClearButton'
  | 'showSubmitButton'
  | 'submitElement'
  | 'aria-keyshortcuts'
> & {
  /**
   * Choose `default`, `hero` for a large search, or `compact` to expand on focus and while results or a query are present. Defaults to `default`.
   */
  variant?: 'default' | 'hero' | 'compact'
  /**
   * Use a pill shape instead of the theme's normal corner radius. Applies to any variant. Defaults to `false`.
   */
  pill?: boolean
  /**
   * Enable Cmd+K and Ctrl+K to focus the first visible, enabled Search with a shortcut. Shows a platform-specific hint when the input is empty. Defaults to `false`.
   */
  shortcut?: boolean
}
