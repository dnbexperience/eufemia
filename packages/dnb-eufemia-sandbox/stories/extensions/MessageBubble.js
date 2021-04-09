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
      <MessageBubble author="I'm the author">
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        author="I'm the author"
        avatar={chatbot_medium}
        // skeleton
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        author="I'm the author"
        avatar={customer_service_medium}
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box style={{ width: '20rem' }}>
      <MessageBubble
        // skeleton
        avatar={
          <Button
            tooltip="I'm the author"
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
      <MessageBubble
        author="I'm the author"
        color="var(--color-accent-yellow)"
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        author="I'm the author"
        primary
        avatar={chatbot_medium}
        avatar_position="right"
        bubble_direction="right"
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble author="I'm the author" bubble_direction="right">
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        author="I'm the author"
        stretch
        avatar={chatbot_medium}
        avatar_position="right"
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
    <Box>
      <MessageBubble
        author="I'm the author"
        stretch
        avatar={chatbot_medium}
      >
        Lorem ipsum dolor sit amet
      </MessageBubble>
    </Box>
  </Wrapper>
)
