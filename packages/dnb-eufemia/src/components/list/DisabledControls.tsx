import { useContext } from 'react'
import type { ReactNode } from 'react'
import Context from '../../shared/Context'

/**
 * Disables the Eufemia form elements, buttons and links inside a disabled item.
 * It always renders the provider, so the children keep their state when `disabled` changes.
 */
export default function DisabledControls({
  disabled,
  children,
}: {
  disabled?: boolean
  children: ReactNode
}) {
  const context = useContext(Context)

  return (
    <Context
      value={
        disabled
          ? {
              ...context,
              formElement: { ...context.formElement, disabled: true },
              Button: { ...context.Button, disabled: true },
              Anchor: { ...context.Anchor, disabled: true },
            }
          : context
      }
    >
      {children}
    </Context>
  )
}
