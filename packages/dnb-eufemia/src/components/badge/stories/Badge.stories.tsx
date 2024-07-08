/**
 * Storybook stories
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import Badge from '../Badge'
import Avatar from '../../avatar/Avatar'
import { Tabs } from '../../lib'

export default {
  title: 'Eufemia/Components/Badge',
}

export const BadgeSandbox = () => (
  <Wrapper>
    <Box>{Template({ content: 0, variant: 'notification' })}</Box>
    <Box>{Template({ content: 1, variant: 'notification' })}</Box>
    <Box>{Template({ content: 99, variant: 'notification' })}</Box>
    <Box>{Template({ content: 101, variant: 'notification' })}</Box>
    <Box>{Template({ content: 'Test', variant: 'information' })}</Box>
    <Box>{Template({ content: 'Old', variant: 'information' })}</Box>
    <Box>{Template({ content: 'Info', variant: 'information' })}</Box>
    <Box>
      {Template({
        content: 'Long text this is yes, that is true, very true',
        variant: 'information',
      })}
    </Box>
    <Box>{TemplateAvatar({ content: 'New', variant: 'information' })}</Box>
    <Box>
      {TemplateAvatar({
        content: 'Old',
        variant: 'information',
        vertical: 'bottom',
        horizontal: 'left',
      })}
    </Box>
    <Box>
      {TemplateAvatar({
        content: 'New',
        variant: 'information',
        vertical: 'bottom',
        horizontal: 'right',
      })}
    </Box>
    <Box>
      {TemplateAvatar({
        content: 'Info',
        variant: 'information',
        vertical: 'top',
        horizontal: 'right',
      })}
    </Box>

    <Box>
      {TemplateAvatar({
        content: 0,
        variant: 'notification',
        vertical: 'top',
        horizontal: 'left',
      })}
    </Box>

    <Box>
      {TemplateAvatar({
        content: 1,
        variant: 'notification',
        vertical: 'bottom',
        horizontal: 'left',
      })}
    </Box>
    <Box>
      {TemplateAvatar({
        content: 9,
        variant: 'notification',
        vertical: 'bottom',
        horizontal: 'right',
      })}
    </Box>
    <Box>
      {TemplateAvatar({
        content: 99,
        variant: 'notification',
        vertical: 'top',
        horizontal: 'right',
      })}
    </Box>
    <Box>
      {TemplateText({
        content: 1,
        variant: 'notification',
      })}
    </Box>
    <Box>
      {TemplateText({
        content: 99,
        variant: 'notification',
      })}
    </Box>
    <Box>
      {TemplateText({
        content: 'Text',
        variant: 'information',
      })}
    </Box>
  </Wrapper>
)

const Template = (props) => {
  return <Badge label="meaningless label" {...props} />
}

const TemplateAvatar = (props) => {
  return (
    <Badge label="meaningless label" {...props}>
      <Avatar.Group label="meaningless label">
        <Avatar variant="secondary" size="large">
          A
        </Avatar>
      </Avatar.Group>
    </Badge>
  )
}

const TemplateText = (props) => {
  return (
    <>
      This is a text with multiple{' '}
      <Badge label="meaningless label" {...props} /> badges, to display
      that <Badge label="meaningless label" {...props} /> it looks nice{' '}
      <Badge label="meaningless label" {...props} /> inline :)
    </>
  )
}

const badgeData = [
  {
    title: (
      <>
        Meldinger{' '}
        <Badge
          label="Notifications"
          variant="notification"
          vertical="top"
          horizontal="right"
        />
      </>
    ),
    key: '1',
  },
  { title: 'Kontoer', key: '2' },
  { title: 'Noe Annet', key: '3' },
]

const noBadgeData = [
  {
    title: (
      <>
        Meldinger{' '}
        <Badge
          content={2}
          label="Notifications"
          variant="notification"
          vertical="top"
          horizontal="right"
        />
      </>
    ),
    key: '1',
  },
  {
    title: (
      <>
        Meldinger{' '}
        <Badge
          content={300}
          label="Notifications"
          variant="notification"
          vertical="bottom"
          horizontal="right"
        />
      </>
    ),
    key: '2',
  },
  {
    title: (
      <>
        Meldinger{' '}
        <Badge
          content={6}
          label="Notifications"
          variant="notification"
          horizontal="right"
        />
      </>
    ),
    key: '3',
  },
]

export function BadgeInline() {
  return (
    <>
      <Tabs data={badgeData} />
      <Tabs data={noBadgeData} />
      <p>
        Lang tekst med{' '}
        <Badge
          label="Notifications"
          variant="notification"
          vertical="top"
          horizontal="right"
        />{' '}
        i midten
      </p>
      <p>
        Lang tekst med{' '}
        <Badge
          content={2}
          label="Notifications"
          variant="notification"
          vertical="top"
          horizontal="right"
        />{' '}
        i midten
      </p>
    </>
  )
}
