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
   * Enable Cmd+K on Mac and Ctrl+K elsewhere to focus the first visible, enabled Search with a shortcut. Leaves shortcuts to other focused text fields and editors. Shows a platform-specific hint when the input is empty. Defaults to `false`.
   */
  shortcut?: boolean
}
