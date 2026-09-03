import type { ReactNode } from 'react'
import '@dnb/eufemia/style/dnb-ui-basis.min.css'
import '@dnb/eufemia/style/dnb-ui-core.min.css'
// Regression guard for issue #8951 (fixed in #8952): the components bundle once
// referenced flag SVGs via an out-of-package url(../../../assets/…) path that
// webpack (Next.js) could not resolve. Importing the most commonly consumed CSS
// bundle here keeps that path covered against a bundling regression.
import '@dnb/eufemia/style/dnb-ui-components.min.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
