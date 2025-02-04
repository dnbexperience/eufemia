import type { Preview } from '@storybook/react'

import '@dnb/eufemia/src/style/dnb-ui-core.scss'

// Default theme
import '@dnb/eufemia/src/style/themes/theme-ui/ui-theme-components.scss'
import '@dnb/eufemia/src/style/themes/theme-ui/ui-theme-basis.scss'

// Sbanken styles
// import '@dnb/eufemia/src/style/themes/theme-sbanken/sbanken-theme-components.scss'
// import '@dnb/eufemia/src/style/themes/theme-sbanken/sbanken-theme-basis.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
