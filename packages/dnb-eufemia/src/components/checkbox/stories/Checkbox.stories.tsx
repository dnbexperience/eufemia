/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { Checkbox, Button, FormLabel, FormRow, GlobalStatus } from '../..'

export default {
  title: 'Eufemia/Components/Checkbox',
}

const CustomRow = styled(FormRow)`
  > .dnb-form-label {
    color: blue;
  }
`

const CustomStyle = styled.div`
  /* empty */
`

export const CheckboxSandbox = () => (
  <CustomStyle>
    <Wrapper>
      <Box>
        <IndeterminateState />
      </Box>

      <Box>
        <ControlledVsUncontrolled />
      </Box>

      <Box>
        <Checkbox />
      </Box>

      <Box>
        <Checkbox checked />
      </Box>

      <Box>
        partial:
        <br />
        <Checkbox left="small" checked disabled />
        <Checkbox left="small" indeterminate />
        <Checkbox left="small" indeterminate checked disabled />
        <Checkbox left="small" indeterminate disabled />
        <Checkbox left="small" indeterminate status="error" checked />
        <Checkbox left="small" status="error" checked />
        <Checkbox left="small" status="error" />
        <Checkbox left="small" indeterminate status="error" />
        <Checkbox left="small" indeterminate size="large" status="error" />
        <Checkbox left="small" indeterminate size="large" status="error" />
      </Box>

      <Box>
        <Checkbox skeleton />
      </Box>

      <Box>
        <Checkbox />
      </Box>
      <Box>
        <Checkbox size="large" />
      </Box>

      <Box>
        <Checkbox checked />
      </Box>

      <Box>
        <Checkbox label="lll" />
      </Box>

      <Box>
        <FormRow disabled label="Without forId (select me)">
          <Checkbox label="Checkbox" />
        </FormRow>
      </Box>
      <Box>
        <Checkbox label="Checkbox" />
      </Box>
      <Box>
        <p className="dnb-p">
          Text: <FormLabel forId="checkbox">Unchecked:</FormLabel>
          <Checkbox id="checkbox" />
        </p>
      </Box>
      <Box>
        <p className="dnb-p">
          Text:{' onchange:'}
          <Checkbox
            label="Checked"
            checked
            on_change={({ checked }) => {
              console.log('on_change', checked)
            }}
          />
        </p>
      </Box>
      <Box>
        <CustomRow>
          <FormLabel forId="checkbox-2">
            Vertical FormLabel for a Checkbox component Sapien rhoncus
            sagittis pharetra ornare platea feugiat cras senectus viverra:
          </FormLabel>
          <Checkbox
            id="checkbox-2"
            label="Unchecked"
            on_change={({ checked }) => {
              console.log('on_change', checked)
            }}
          />
        </CustomRow>
      </Box>
      <Box>
        <FormLabel forId="checkbox-1" vertical>
          Vertical FormLabel for a Checkbox component:
        </FormLabel>
        <Checkbox id="checkbox-1" label="Unchecked disabled" disabled />
      </Box>
      <Box>
        <Checkbox label="Checked disabled" checked disabled />
      </Box>
      <Box>
        <Checkbox
          label="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <Checkbox
          // label="Unchecked status error:"
          label="Unchecked:"
          label_position="left"
          // status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce"
          status_state="info"
        />
      </Box>
      <Box>
        <Checkbox
          // label="Unchecked status error:"
          label="Unchecked:"
          label_position="right"
          // status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce"
          status_state="info"
        />
      </Box>
      <Box>
        <Checkbox
          label="Checked status message"
          checked
          status="Potenti viverra ft quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>

      <Box>
        <Checkbox disabled checked />
        <Checkbox disabled />
        <Checkbox disabled indeterminate checked />
        <Checkbox disabled indeterminate />
        <Checkbox disabled status="error" checked />
        <Checkbox disabled status="error" />
      </Box>

      <Box>
        <Checkbox skeleton checked />
        <Checkbox skeleton />
        <Checkbox skeleton indeterminate checked />
        <Checkbox skeleton indeterminate />
        <Checkbox skeleton status="error" checked />
        <Checkbox skeleton status="error" />
      </Box>
    </Wrapper>
  </CustomStyle>
)

function IndeterminateState() {
  const [checkedParent, setCheckedParent] = React.useState(false)
  const [parentIndeterminateState, setParentIndeterminateState] =
    React.useState(false)

  const [c1State, setC1State] = React.useState(false)
  const [c2State, setC2State] = React.useState(false)

  React.useEffect(() => {
    if (c1State !== c2State) {
      setParentIndeterminateState(true)
    } else {
      setParentIndeterminateState(false)
    }

    if (c1State && c2State) setCheckedParent(true)
    if (!c1State && !c2State) setCheckedParent(false)
  }, [c1State, c2State])

  React.useEffect(() => {
    if (checkedParent) {
      setC1State(true)
      setC2State(true)
    }

    if (!checkedParent) {
      setC1State(false)
      setC2State(false)
    }
  }, [checkedParent])

  return (
    <div>
      {/* 
      change the Field.Toggle api to behave like this?
      <Field.Boolean
        indeterminateRelationsPaths={[
          '/myState1',
          '/myState2',
          '/myState3',
        ]}
      />

      <Field.Boolean path="/myState1" />
      <Field.Boolean path="/myState2" />
      <Field.Boolean path="/myState3" /> */}

      <h2>Indeterminate state</h2>

      <Checkbox
        label="parent"
        checked={checkedParent}
        indeterminate={parentIndeterminateState}
        onChange={(args) => {
          setCheckedParent(args?.checked)
          console.log(args)
        }}
      />
      <br />
      <br />
      <Checkbox
        label="child 1"
        checked={c1State}
        onChange={() => {
          setC1State(!c1State)
        }}
      />
      <br />
      <br />

      <Checkbox
        label="child 2"
        checked={c2State}
        onChange={() => {
          setC2State(!c2State)
        }}
      />
    </div>
  )
}

function ControlledVsUncontrolled() {
  const [checked, setChecked] = React.useState(false)
  const [indeterminate, setIndeterminate] = React.useState(false)
  const [random, setRandom] = React.useState(0)

  return (
    <>
      <Checkbox
        label="Checkbox 1"
        checked={checked}
        indeterminate={indeterminate}
        id="checkbox1"
        on_change={({ checked }) => {
          setChecked(checked)
        }}
      />
      <br />
      <Button on_click={() => setChecked(true)} text="Set checkbox true" />
      <Button
        on_click={() => setChecked(undefined)}
        text="Reset undefined"
      />
      <Button on_click={() => setChecked(null)} text="Reset null" />
      <Button on_click={() => setRandom(Math.random())} text="Rerender" />
      <br />
      <Button
        on_click={() => setIndeterminate(true)}
        text="set indeterminate"
      />
      <Button
        on_click={() => setIndeterminate(undefined)}
        text="set indeterminate undefined"
      />
      <Button
        on_click={() => setIndeterminate(null)}
        text="set indeterminate null"
      />
      <br />
      <code>{JSON.stringify({ checked, indeterminate, random })}</code>
    </>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Checkbox
        label="Checkbox"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
