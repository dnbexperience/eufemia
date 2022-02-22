/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
// import styled from '@emotion/styled'

import { InfoCard } from '../../'
import { add as Svg } from '../../../icons'

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
        onAccept={() => console.log('accept')}
        acceptButtonText="accept"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
      <InfoCard
        onAccept={() => console.log('accept')}
        acceptButtonText="Accept"
        onClose={() => console.log('close')}
        closeButtonText="Closeeeeeeeeeeeeeee"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>
    <Box>
      <InfoCard
        centered
        onAccept={() => console.log('accept')}
        acceptButtonText="Accept"
        onClose={() => console.log('close')}
        closeButtonText="Close"
        text="This is a description of some information or a tip that will inform the user of something that will help them."
      />
    </Box>
  </Wrapper>
)
