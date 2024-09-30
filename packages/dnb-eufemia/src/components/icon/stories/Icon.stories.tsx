/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Button, Icon, IconPrimary } from '../..'
import { add as Svg } from '../../../icons'
import { P, H1, H4 } from '../../..'

export default {
  title: 'Eufemia/Components/Icon',
}

export const IconSandbox = () => (
  <Wrapper>
    <Box>
      text
      <Svg />
      <Icon icon="bell" />
      <Icon icon={Svg} />
    </Box>
    <Box>
      <H1>
        My H1 with an auto <Icon icon={Svg} size="auto" />
      </H1>
      <H4>
        My H4 with the same auto <Icon icon={Svg} size="auto" />
      </H4>
    </Box>
    <Box>
      <IconPrimary icon="add" size="medium" />
    </Box>
    <Box>
      <P>
        text <IconPrimary icon="add" />
        text <IconPrimary icon="add" size="medium" />
        text
      </P>
      <H1>
        text <IconPrimary icon="add" right />
        text <IconPrimary icon="add" size="medium" right />
        auto <IconPrimary icon="add" size="auto" right />
        text
      </H1>
    </Box>
    <Box>
      <P>
        text <IconPrimary icon="add" border right />
        text <IconPrimary icon="add" size="medium" border right />
        text
        <Button icon="add" text="Button" right />
        <Button
          icon={<IconPrimary icon="add" border />}
          text="Button"
          right
        />
      </P>
      <H1 top>
        text <IconPrimary icon="add" border right />
        text <IconPrimary icon="add" size="medium" border right />
        auto <IconPrimary icon="add" size="auto" border right />
        text
      </H1>
    </Box>
    <Box>
      <Button icon="add" right />
      <Button icon="add" variant="primary" />
    </Box>
    <Box>
      <Button title="Click Me" on_click={showMe}>
        <IconPrimary icon="add" size="medium" />
      </Button>
    </Box>
    <Box>
      <Button
        title="Click Me"
        on_click={showMe}
        variant="tertiary"
        icon="add"
      />
    </Box>
    color property text value:
    <Box>
      <IconPrimary icon="add" color="blue" />
      <IconPrimary icon="add" color="green" />
      <IconPrimary icon="add" color="red" />
      <IconPrimary icon="add" color="orange" />
    </Box>
    color property hex value:
    <Box>
      <IconPrimary icon="add" color="#00343E" />
      <IconPrimary icon="add" color="#14555A" />
      <IconPrimary icon="add" color="#007272" />
      <IconPrimary icon="add" color="#A5E1D2" />
      <IconPrimary icon="add" color="#28B482" />
      <IconPrimary icon="add" color="#FDBB31" />
      <IconPrimary icon="add" color="#23195A" />
      <IconPrimary icon="add" color="#6E2382" />
    </Box>
    color property rgb value:
    <Box>
      <IconPrimary icon="add" color="rgb(0,52,62)" />
      <IconPrimary icon="add" color="rgb(20,85,90)" />
      <IconPrimary icon="add" color="rgb(0,114,114)" />
      <IconPrimary icon="add" color="rgb(165,225,210)" />
      <IconPrimary icon="add" color="rgb(40,180,130)" />
      <IconPrimary icon="add" color="rgb(253,187,49)" />
      <IconPrimary icon="add" color="rgb(35,25,90)" />
      <IconPrimary icon="add" color="rgb(110,35,130)" />
    </Box>
    color property CSS Custom Properties name:
    <Box>
      <IconPrimary icon="add" color="var(--color-ocean-green)" />
      <IconPrimary icon="add" color="var(--color-emerald-green)" />
      <IconPrimary icon="add" color="var(--color-sea-green)" />
      <IconPrimary icon="add" color="var(--color-mint-green)" />
      <IconPrimary icon="add" color="var(--color-summer-green)" />
      <IconPrimary icon="add" color="var(--color-accent-yellow)" />
      <IconPrimary icon="add" color="var(--color-indigo)" />
      <IconPrimary icon="add" color="var(--color-violet)" />
    </Box>
  </Wrapper>
)

const showMe = (e) => {
  console.log('showMe', e)
}
