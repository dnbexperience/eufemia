import type { Ref } from 'react'
import Button from '../button/Button'
import { useMenuTriggerContext } from './MenuContext'
import type { MenuButtonProps, MenuTriggerRenderProps } from './types'

export default function MenuButton(props: MenuButtonProps) {
  const { children, icon = 'more', variant = 'secondary', ...rest } = props

  const triggerContext = useMenuTriggerContext()

  if (!triggerContext) {
    return <Button variant={variant} icon={icon} {...rest} />
  }

  const { active, triggerProps, open, close, toggle } = triggerContext
  const { ref, ...restTriggerProps } = triggerProps

  // Render function children: pass trigger props through for custom triggers
  if (typeof children === 'function') {
    const renderProps = { ref, ...restTriggerProps }

    // Make active/open/close/toggle non-enumerable so they don't leak
    // to DOM elements when users spread props: {...props}
    Object.defineProperties(renderProps, {
      active: { value: active, enumerable: false },
      open: { value: open, enumerable: false },
      close: { value: close, enumerable: false },
      toggle: { value: toggle, enumerable: false },
    })

    return children(renderProps as MenuTriggerRenderProps)
  }

  return (
    <Button
      variant={variant}
      icon={icon}
      selected={active}
      ref={ref as Ref<HTMLElement>}
      {...restTriggerProps}
      {...rest}
    />
  )
}
