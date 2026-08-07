import Badge from '../../components/Badge'
import type { BadgeProps } from '../../components/badge/Badge'

export default function SidebarMenuBadge({
  badge,
  badgeProps,
}: {
  badge?: BadgeProps['content']
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
}) {
  if (badge === undefined || badge === null) {
    return null
  }

  return (
    <span className="dnb-sidebar-menu__badge">
      <Badge {...badgeProps} content={badge} />
    </span>
  )
}
