/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  email as Email,
  confetti as Confetti,
} from '@dnb/eufemia/src/icons'
import { Badge, Avatar, Icon, Img } from '@dnb/eufemia/src'

export const BadgeNotification = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-notification">
    <Badge content={1} label="Notifications" variant="notification" />
  </ComponentBox>
)

export const BadgeNotificationInline = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-variant-notification-inline"
  >
    <div>
      Text{' '}
      <Badge content={1} label="Notifications" variant="notification" />{' '}
      Text
    </div>
  </ComponentBox>
)

export const BadgeNotificationAvatar = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-variant-notification-avatar"
  >
    <Badge content={1} label="Notifications" variant="notification">
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

export const BadgeDefault = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-default">
    <Badge content="New" />
  </ComponentBox>
)

export const BadgeInformationInline = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-variant-information-inline"
  >
    <div>
      Text <Badge content="Info" variant="information" /> Text
    </div>
  </ComponentBox>
)

export const BadgeInformationAvatar = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-variant-information-avatar"
  >
    <Badge content="Ny" variant="information">
      <Avatar.Group label="Persons">
        <Avatar size="large" variant="secondary">
          A
        </Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

export const BadgeTopLeft = () => (
  <ComponentBox hideCode data-visual-test="badge-top-left">
    <Badge
      content={66}
      label="Notifications"
      vertical="top"
      horizontal="left"
      variant="notification"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

export const BadgeTopRight = () => (
  <ComponentBox hideCode data-visual-test="badge-top-right">
    <Badge
      content={1}
      label="Notifications"
      vertical="top"
      horizontal="right"
      variant="notification"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

export const BadgeBottomLeft = () => (
  <ComponentBox hideCode data-visual-test="badge-bottom-left">
    <Badge
      content={13}
      label="Notifications"
      vertical="bottom"
      horizontal="left"
      variant="notification"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

export const BadgeBottomRight = () => (
  <ComponentBox hideCode data-visual-test="badge-bottom-right">
    <Badge
      content={58}
      label="Notifications"
      vertical="bottom"
      horizontal="right"
      variant="notification"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>
  </ComponentBox>
)

// ALTERNATIVES

export const BadgeMailIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Email }}
    data-visual-test="badge-alternative-icon"
  >
    <Badge
      content={99}
      label="Notifications"
      variant="notification"
      vertical="top"
      horizontal="right"
    >
      <Icon icon={Email} size="x-large" />
    </Badge>
  </ComponentBox>
)

export const BadgeImgWithIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Confetti }}
    data-visual-test="badge-alternative-img"
  >
    <Badge content={<Icon icon={Confetti} />}>
      <Img
        src="https://avatars.githubusercontent.com/u/1501870?v=4"
        alt="Profile picture"
        height="64"
        width="64"
      />
    </Badge>
  </ComponentBox>
)
