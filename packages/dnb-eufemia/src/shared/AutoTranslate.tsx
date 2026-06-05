import type { JSX, ReactNode } from 'react'
import Provider from './Provider'
import { PortalRootProvider } from '../components/portal-root/PortalRoot'

export type AutoTranslateProps = {
  /**
   * Set to `true` to disable browser translation (e.g. Google Translate)
   * on all form components and their portal content within this scope.
   */
  off?: boolean

  children: ReactNode
}

export default function AutoTranslate({
  off,
  children,
}: AutoTranslateProps): JSX.Element {
  if (!off) {
    return <>{children}</>
  }

  return (
    <Provider formElement={{ translate: 'no' }}>
      <PortalRootProvider translate="no">{children}</PortalRootProvider>
    </Provider>
  )
}
