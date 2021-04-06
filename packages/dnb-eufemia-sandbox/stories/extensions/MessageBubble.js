/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Box, Wrapper } from '../helpers'

import MessageBubble from '@dnb/eufemia/src/extensions/message-bubble'

import '@dnb/eufemia/src/extensions/message-bubble/style'
import {
  chatbot_medium,
  customer_service_medium
} from '@dnb/eufemia/src/icons'

export default {
  title: 'Eufemia/Extensions/MessageBubble'
}

export const MessageBubbles = () => (
  <Wrapper>
    <Box>
      <MessageBubble>Lorem ipsum dolor sit amet</MessageBubble>
    </Box>
    <Box>
      <MessageBubble icon={chatbot_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble icon={customer_service_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble color="#D2F0E9">
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        color="#D2F0E9"
        icon={chatbot_medium}
        icon_position="right"
        bubble_direction="right"
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble bubble_direction="right">
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble stretch>Lorem ipsum dolor sit amet</MessageBubble>
    </Box>
    <Box>
      <MessageBubble stretch icon={chatbot_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
  </Wrapper>
)
