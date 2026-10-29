import { Switch } from '@dnb/eufemia/src/components'
import { useTheme } from '@dnb/eufemia/src/shared'
import { setTheme } from '../../vite/client/shims/theme-handler'

export default function ToggleNativeTypography() {
  const typography = useTheme()?.typography

  return (
    <Switch
      label="Native app font size"
      title="Preview the brand's native app body text size"
      checked={typography === 'native'}
      onChange={({ checked }) => {
        setTheme({ typography: checked ? 'native' : 'web' })
      }}
      skeleton={false}
    />
  )
}
