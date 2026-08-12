import type { ReactNode } from 'react'
import '@dnb/eufemia/style/dnb-ui-basis.min.css'
import '@dnb/eufemia/style/dnb-ui-core.min.css'
// The components bundle references flag SVGs through an out-of-package
// url(../../../assets/…) path. When @dnb/eufemia is installed under node_modules
// that path resolves outside the package, so webpack (Next.js) cannot find the
// asset and this import intentionally FAILS the Next.js consumer build. The
// failure is deliberate: it is a living demonstration of why #8951 must be
// fixed. Once #8951 is fixed, REBASE this PR — the build will then pass and this
// smoke test will permanently guard the most commonly consumed CSS bundle
// against bundling regressions.
import '@dnb/eufemia/style/dnb-ui-components.min.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
