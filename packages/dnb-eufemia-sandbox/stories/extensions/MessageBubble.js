/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Box, Wrapper } from '../helpers'

import MessageBubble from '@dnb/eufemia/src/extensions/message-bubble'
import { P } from '@dnb/eufemia/src/elements'
import { Button } from '@dnb/eufemia/src/components'

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
      <MessageBubble avatar={chatbot_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble avatar={customer_service_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box style={{ width: '20rem' }}>
      <MessageBubble
        avatar={
          <Button
            tooltip="Hello, it's me!"
            icon={customer_service_medium}
          />
        }
      >
        <P>
          Lorem ipsum dolor sit amet Enim ut eros lectus magnis morbi fusce
          dictumst cubilia cras a arcu ac dapibus sagittis leo molestie
          cursus gravida urna
        </P>
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble primary>Lorem ipsum dolor sit amet</MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        color="var(--color-accent-yellow)"
        avatar={chatbot_medium}
        avatar_position="right"
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
      <MessageBubble
        stretch
        avatar={chatbot_medium}
        avatar_position="right"
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble stretch avatar={chatbot_medium}>
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
  </Wrapper>
)
