/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Autocomplete,
  Button,
  // FormLabel,
  // FormSet,
  FormRow,
  Number
  // Checkbox
} from '../../src/components'

const CustomStyle = styled.div``

const AutocompleteStory = () => {
  // const [data, setData] = useState(autocompleteData)
  // const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <Autocomplete
          // opened
          // no_animation
          // value="0"
          data={['AA cc', 'BB cc']}
        ></Autocomplete>
      </Box>
      <Box>
        <Autocomplete
          data={{
            a: 'AA',
            b: 'BB'
          }}
          on_select={e => {
            console.log('on_select', e)
          }}
          on_change={e => {
            console.log('on_change', e)
          }}
        ></Autocomplete>
        <Autocomplete
          on_select={e => {
            console.log('on_select', e)
          }}
          on_change={e => {
            console.log('on_change', e)
          }}
        >
          {{
            a: 'AA',
            b: 'BB'
          }}
        </Autocomplete>
      </Box>
      <Box>
        <Autocomplete data={autocompleteData}></Autocomplete>
      </Box>
      <Box>
        <Autocomplete data={autocompleteDataScrollable}></Autocomplete>
      </Box>
    </Wrapper>
  )
}

export default [
  'Autocomplete',
  () => (
    <CustomStyle>
      <AutocompleteStory />
    </CustomStyle>
  )
]

let autocompleteData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: (
      <>
        {/* <Checkbox checked aria-hidden />  */}
        Brukskonto - Kari Nordmann
      </>
    )
  },
  {
    content: [
      <Number key={12345678902} ban>
        12345678902
      </Number>,
      'Sparekonto - Ole Nordmann'
    ]
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <Number key={11345678962} ban>
        11345678962
      </Number>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: <Fragment key="cs-1">Custom selected {'🔥'}</Fragment>,
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      <Fragment key="cs-2">Custom content {'🔥'}</Fragment>
    ]
  }
]
const autocompleteDataScrollable = [
  {
    selected_value: 'AAA',
    content: 'AA'
  },
  {
    content: [
      <Number key={12345678902} ban>
        12345678902
      </Number>,
      'BB'
    ]
  },
  {
    selected_value: 'CCC',
    content: [
      <Number key={11345678962} ban>
        11345678962
      </Number>,
      'CC'
    ]
  },
  {
    selected_value: 'DDD',
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      'DD'
    ]
  },
  {
    content: <Fragment>E</Fragment>
  },
  <Fragment key="key1">Custom content {'🔥'}</Fragment>,
  [<Fragment key="key2">Custom content X {'🔥'}</Fragment>],
  {
    content: 'EE'
  },
  {
    content: 'EEE'
  },
  {
    content: ['F1', 'F2', 'F3', 'F4', 'F5']
  },
  {
    content: 'GG'
  },
  {
    content: 'HH'
  }
]
