import {
  getTheme,
  setTheme,
  type ThemeState,
} from '../../../../vite/client/shims/theme-handler'

let previous: ThemeState['colorScheme']
let revision = 0

export default function darkMode() {
  const current = getTheme().colorScheme || 'auto'
  previous = current === 'dark' ? (previous ?? current) : current
  const active = ++revision
  let applied = false
  setTheme({ colorScheme: 'dark' }, () => {
    applied = true
  })
  return () => {
    queueMicrotask(() => {
      if (active !== revision) {
        return
      }
      if (!applied || getTheme().colorScheme === 'dark') {
        setTheme({ colorScheme: previous }, () => {
          if (active === revision) {
            previous = undefined
          }
        })
      } else {
        previous = undefined
      }
    })
  }
}
