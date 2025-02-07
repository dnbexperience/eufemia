import type { Metadata } from 'next'

import '@dnb/eufemia/src/style/dnb-ui-core.scss'

// Default theme
import '@dnb/eufemia/src/style/themes/theme-ui/ui-theme-components.scss'
import '@dnb/eufemia/src/style/themes/theme-ui/ui-theme-basis.scss'

// Sbanken styles
// import '@dnb/eufemia/src/style/themes/theme-sbanken/sbanken-theme-components.scss'
// import '@dnb/eufemia/src/style/themes/theme-sbanken/sbanken-theme-basis.scss'

export const metadata: Metadata = {
  title: 'Next.js with Eufemia Sandbox',
  description: 'To test the Eufemia library with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
