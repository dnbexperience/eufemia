/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Box, Wrapper } from '../helpers'

import MessageBubble from '@dnb/eufemia/src/extensions/message-bubble'
import P from '@dnb/eufemia/src/elements/P'

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
      <MessageBubble>
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble icon={chatbot_medium}>
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble icon={customer_service_medium}>
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble color="#D2F0E9">
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        color="#D2F0E9"
        icon={chatbot_medium}
        icon_position="right"
        bubble_direction="right"
      >
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble bubble_direction="right">
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble stretch>
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble stretch icon={chatbot_medium}>
        <P>Lorem ipsum dolor sit amet</P>
      </MessageBubble>
    </Box>
  </Wrapper>
)
