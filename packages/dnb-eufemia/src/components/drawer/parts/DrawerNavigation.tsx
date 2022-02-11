import React from 'react'
import classnames from 'classnames'
import ModalHeaderBar, {
  ModalHeaderBarProps,
} from '../../modal/parts/ModalHeaderBar'

export default function DrawerNavigation({
  className,
  ref, //eslint-disable-line
  ...props
}: ModalHeaderBarProps) {
  return (
    <ModalHeaderBar
      {...props}
      className={classnames('dnb-drawer__navigation', className)}
      shadow_class="dnb-drawer__navigation--sticky"
    />
  )
}
