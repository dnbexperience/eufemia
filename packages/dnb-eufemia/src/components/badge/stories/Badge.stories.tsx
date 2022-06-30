/**
 * Storybook stories
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import Badge from '../Badge'
import Avatar from '../../avatar/Avatar'

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
  return <Badge {...props} />
}

const TemplateAvatar = (props) => {
  return (
    <Badge {...props}>
      <Avatar variant="secondary" size="large">
        A
      </Avatar>
    </Badge>
  )
}

const TemplateText = (props) => {
  return (
    <>
      This is a text with multiple <Badge {...props} /> badges, to display
      that <Badge {...props} /> it looks nice <Badge {...props} /> inline
      :)
    </>
  )
}
