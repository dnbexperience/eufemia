import { useTheme } from '@dnb/eufemia/src/shared'

export default function FilterByTheme({ children, name }) {
  const themeName = useTheme()?.name

  if (themeName === name) {
    return children
  }

  return null
}
