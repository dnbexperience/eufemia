/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Switch, FormLabel, HelpButton, GlobalStatus } from '../..'

export default {
  title: 'Eufemia/Components/Switch',
}

export const SwitchSandbox = () => (
  <Wrapper>
    <Box>
      <ControlledSwitch />
    </Box>

    <Box>
      <Switch
        checked
        status="Error message"
        status_state="info"
        size="large"
      />
    </Box>
    <Box>
      <Switch
        label="Checked"
        checked
        suffix={<HelpButton>Help</HelpButton>}
      />
    </Box>
    <Box>
      <Switch
        label="Checked"
        label_position="left"
        suffix={<HelpButton>Help</HelpButton>}
      />
    </Box>
    <Box>
      Text: <FormLabel forId="switch">Unchecked:</FormLabel>
      <Switch id="switch" checked={false} />
    </Box>
    <Box>
      <p className="dnb-p">
        <Switch label="Checked:" checked label_position="left" />
      </p>
    </Box>
    <Box>
      Text:{' '}
      <Switch
        label="Unchecked disabled:"
        checked={false}
        disabled
        label_position="left"
      />
    </Box>
    <Box>
      Text: <Switch label="Checked disabled" checked disabled />
    </Box>
    <Box>
      <Switch
        label="Unchecked status error:"
        label_position="left"
        checked={false}
        status="error"
      />
    </Box>
    <Box>
      <Switch
        label="Label:"
        label_position="left"
        checked
        status="Error message Vulputate consequat pellentesque senectus conubia proin sapien felis inceptos eu"
        status_state="info"
      />
    </Box>
    <Box>
      <Switch
        label="Label"
        checked
        status="Error message Vulputate consequat pellentesque senectus conubia proin sapien felis inceptos eu"
      />
    </Box>
  </Wrapper>
)

function ControlledSwitch() {
  const [isChecked, setIsChecked] = React.useState(false)

  return (
    <>
      Controlled Switch
      <Switch
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Switch
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Switch
        label="First"
        value="first"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
