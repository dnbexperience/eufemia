/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { H2 } from '../../src/elements'

import {
  Button,
  DatePicker,
  Textarea,
  Dropdown,
  Slider,
  Checkbox,
  Radio,
  ToggleButton,
  Switch,
  Input,
  FormLabel,
  FormRow
} from '../../src/components'

// const Center = styled.div`
//   display: flex;
//   justify-content: center;
//   > div {
//     max-width: 60rem;
//   }
// `

export default [
  'FormRow',
  () => (
    // <Center>
    <Wrapper showOverflow>
      <H2 bottom="small">Horizontal label</H2>
      <Box>
        <FormRow
          // indent
          label="Horizontal Legend Aptent maecenas non pharetra libero massa auctor pretium vulputate vivamus:"
          no_wrap="true"
          direction="horizontal"
          content_size="large"
        >
          <AllComponents horizontal />
        </FormRow>
      </Box>

      <H2 bottom="small">Vertical direction</H2>
      <Box>
        <FormRow label="Vertical Legend:" direction="vertical">
          <AllComponents />
        </FormRow>
      </Box>

      <H2 bottom="small">Vertical everything</H2>
      <Box>
        <FormRow label="Vertical Legend:" vertical="true">
          <AllComponents />
        </FormRow>
      </Box>

      <H2 bottom="small">Vertical label</H2>
      <Box>
        <FormRow label="Vertical Legend:" label_direction="vertical">
          <AllComponents horizontal />
        </FormRow>
      </Box>

      <Box>
        <FormRow label="Inputs legend:">
          <Input value="Input value A ..." />
          <Input value="Input value B ..." left="small" />
        </FormRow>
      </Box>
      <Box>
        <FormRow direction="horizontal" indent="default">
          <FormLabel for_id="alone-1">
            A long horizontal FormLabel with a lot of informative text and
            a default size:
          </FormLabel>
          <Checkbox id="alone-1" label="Checkbox" />
        </FormRow>
      </Box>
      <Box>
        <FormRow
          direction="horizontal"
          size="default"
          section_style="mint-green"
          section_spacing="large"
        >
          <FormLabel for_id="alone-2">
            A long horizontal FormLabel with a lot of informative text and
            a default size:
          </FormLabel>
          <Radio.Group
            id="alone-2"
            // label="Group:"
            // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            value="first"
            // disabled
            // name="MyGroup" // The Group Name
          >
            <Radio label="First" value="first" />
            <Radio label="Second" value="second" />
            <Radio
              label="Third"
              value="third"
              // checked
            />
          </Radio.Group>
        </FormRow>
      </Box>
    </Wrapper>
    // </Center>
  )
]

const dropdownData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: (
      <>
        <Checkbox checked /> Brukskonto - Kari Nordmann
      </>
    )
  },
  {
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: ['1534.96.48901', <>Custom content {'🔥'}</>]
  }
]

const AllComponents = ({ horizontal }) => {
  return (
    <>
      text
      <p className="dnb-p">paragraph</p>
      <Button
        text="Button"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Input
        label="Input label A:"
        stretch
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Input
        label="Input label B:"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <DatePicker
        label="DatePicker:"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Dropdown
        label="Dropdown:"
        data={dropdownData}
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Slider
        label="Slider:"
        value={50}
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Textarea
        label="Textarea:"
        rows="10"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Textarea
        label="Textarea:"
        stretch
        rows="5"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <ToggleButton
        label="Toggle:"
        text="Toggle"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Checkbox
        label="Checkbox"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Radio
        label="Radio"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
      <Switch
        label="Switch"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool
}
AllComponents.defaultProps = {
  horizontal: null
}
