/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { InfoCard } from '@dnb/eufemia/src/components'
import { add as Svg } from '@dnb/eufemia/src/icons'

export default {
  title: 'Eufemia/Components/InfoCard',
}

export const InfoCardSandbox = () => (
  <Wrapper>
    <Box>
      <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
    </Box>

    <Box>
      <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
    </Box>

    <Box>
      <InfoCard
        title="In this example everything is centered"
        centered
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>

    <Box>
      <InfoCard
        icon={Svg}
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>

    <Box>
      <InfoCard
        title="Title of your info/tip"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>

    <Box>
      <InfoCard
        title="Title of your info/tip"
        bottom="small"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />

      <InfoCard
        title="Title of your info/tip"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
        centered
        skeleton
      />
    </Box>

    <Box>
      <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
      <InfoCard text="This " />
    </Box>
    <Box>
      <InfoCard text="This" src="/images/avatars/1501870.jpg" />
      <InfoCard
        text="This is a description of some information or a tip that will inform the user of something that will help them."
        src="/images/avatars/1501870.jpg"
      />
      <InfoCard
        centered
        text="This is a description of some information or a tip that will inform the user of something that will help them."
        src="/images/avatars/1501870.jpg"
      />
    </Box>
    <Box>
      <InfoCard
        on_accept={() => console.log('accept')}
        accept_button_text="accept"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
      <InfoCard
        on_accept={() => console.log('accept')}
        accept_button_text="Accept"
        on_close={() => console.log('close')}
        close_button_text="Close"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>
    <Box>
      <InfoCard
        centered
        on_accept={() => console.log('accept')}
        accept_button_text="Accept"
        on_close={() => console.log('close')}
        close_button_text="Close"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>
  </Wrapper>
)
