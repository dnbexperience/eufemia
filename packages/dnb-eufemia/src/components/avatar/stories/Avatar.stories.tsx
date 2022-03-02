/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import Avatar from '../Avatar'
import { Provider } from '../../../shared'

export default {
  title: 'Eufemia/Components/Avatar',
}

export const AvatarWithoutGroup = () => {
  return (
    <Provider>
      <Avatar>Without Group</Avatar>
    </Provider>
  )
}
export const AvatarWithoutLabel = () => {
  return (
    <Provider>
      <Avatar hasLabel>Avatar.WithoutLabel</Avatar>
    </Provider>
  )
}
