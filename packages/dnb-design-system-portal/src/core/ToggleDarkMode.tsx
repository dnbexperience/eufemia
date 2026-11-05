import { useThemeHandler } from '../../vite/client/shims/theme-handler'
import type { ThemeColorScheme } from '@dnb/eufemia/src/shared/Theme'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ToggleDarkMode(props) {
  const { disabled, ...rest } = props
  const { colorScheme = 'auto', setTheme } = useThemeHandler()

  return (
    <Field.Selection
      variant="button"
      optionsLayout="horizontal"
      value={colorScheme}
      disabled={disabled}
      data={[
        { value: 'auto', title: 'Auto' },
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
      ]}
      onChange={(value: string) => {
        setTheme({ colorScheme: value as ThemeColorScheme })
      }}
      {...rest}
    />
  )
}
