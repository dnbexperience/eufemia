/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Badge, Avatar, Grid, Button, Flex } from '@dnb/eufemia/src'

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
      <Badge content={1234} label="Notifications" variant="notification" />{' '}
      Text
    </div>
  </ComponentBox>
)

export const BadgeNotificationAvatar = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-variant-notification-avatar"
  >
    <Badge content={1234} label="Notifications" variant="notification">
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

export const BadgeCornerPosition = () => (
  <ComponentBox hideCode data-visual-test="badge-corner-position">
    <Flex.Container>
      <div data-visual-test="badge-top-left">
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
      </div>
      <div data-visual-test="badge-top-right">
        <Badge
          content={1234}
          label="Notifications"
          vertical="top"
          horizontal="right"
          variant="notification"
        >
          <Avatar.Group label="Persons">
            <Avatar size="large">B</Avatar>
          </Avatar.Group>
        </Badge>
      </div>
      <div data-visual-test="badge-bottom-left">
        <Badge
          content={13}
          label="Notifications"
          vertical="bottom"
          horizontal="left"
          variant="notification"
        >
          <Avatar.Group label="Persons">
            <Avatar size="large">C</Avatar>
          </Avatar.Group>
        </Badge>
      </div>
      <div data-visual-test="badge-bottom-right">
        <Badge
          content={58}
          label="Notifications"
          vertical="bottom"
          horizontal="right"
          variant="notification"
        >
          <Avatar.Group label="Persons">
            <Avatar size="large">D</Avatar>
          </Avatar.Group>
        </Badge>
      </div>
    </Flex.Container>
  </ComponentBox>
)

export const BadgeStatus = () => (
  <ComponentBox hideCode data-visual-test="badge-status">
    <Grid.Container
      rowGap
      columnGap
      style={{
        display: 'inline-grid',
        placeItems: 'start',
        gridTemplateColumns: 'repeat(2, auto)',
      }}
    >
      <Badge content="default" status="default" />
      <Badge content="default (subtle)" status="default" subtle />
      <Badge content="neutral" status="neutral" />
      <Badge content="neutral (subtle)" status="neutral" subtle />
      <Badge content="positive" status="positive" />
      <Badge content="positive (subtle)" status="positive" subtle />
      <Badge content="warning" status="warning" />
      <Badge content="warning (subtle)" status="warning" subtle />
      <Badge content="negative" status="negative" />
      <Badge content="negative (subtle)" status="negative" subtle />
    </Grid.Container>
  </ComponentBox>
)

export const BadgeHide = () => (
  <ComponentBox hideCode data-visual-test="badge-hide">
    {() => {
      const Example = () => {
        const [notifications, setNotifications] = React.useState(1)

        return (
          <>
            <Badge
              content={notifications}
              label="Notifications"
              variant="notification"
              hideBadge={notifications === 0}
            >
              <Avatar.Group label="Persons">
                <Avatar size="large">A</Avatar>
              </Avatar.Group>
            </Badge>

            <div>
              <Button
                icon="subtract"
                onClick={() => setNotifications(notifications - 1)}
                data-remove
              />
              <Button
                icon="add"
                onClick={() => setNotifications(notifications + 1)}
                data-add
              />
            </div>
          </>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)
