/**
 * dnb-ui-lib Component Story
 *
 */

import React, { Fragment } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Autocomplete, Number } from '../../src/components'

const CustomStyle = styled.div`
  .dnb-autocomplete__shell {
    width: 10rem; /* custom width */
  }
  .dnb-autocomplete__list {
    min-width: 10rem; /* custom width */
  }
`

const AutocompleteStory = () => {
  // const [data, setData] = useState(autocompleteData)
  // const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <CustomStyle>
          <Autocomplete size="small" value="A" data={['A']} />
          <Autocomplete
            status="feil"
            size="default"
            value="A"
            data={['A']}
          />
          <Autocomplete size="medium" value="A" data={['A']} />
          <Autocomplete size="large" value="A" data={['A']} />
        </CustomStyle>
      </Box>
      <Box>
        <Autocomplete
          // opened
          // no_animation
          input_value="foo bar th"
          // input_value="a1 a2 cc"
          // input_value="ccc b"
          // value="c"
          data={{
            a: 'A1 A2 CC',
            b: 'BB cC zethx',
            c: 'CCC'
          }}
          // icon_position="left"
          on_select={e => {
            console.log('on_select', e)
          }}
          on_change={e => {
            console.log('on_change', e)
          }}
        ></Autocomplete>
      </Box>
      <Box>
        <Autocomplete
          input_icon={null}
          title="Type to find ..."
          // opened
          // prevent_close
          // no_animation
          // value="0"
          data={[
            {
              content: 'A'
            },
            {
              content: 'B'
            },
            {
              selected_value: 99999999,
              content: [
                <Number phone key={99999999}>
                  99999999
                </Number>,
                'C'
              ]
            },
            {
              selected_value: 99999999,
              content: [
                <Number phone key={99999999}>
                  99999999
                </Number>,
                'D'
              ]
            },
            {
              content: 'E'
            },
            {
              selected_value: 'Find me by keypress',
              content: ['F', 'F', 'F', 'F']
            },
            {
              content: 'G'
            },
            {
              content: 'H'
            }
          ]}
        ></Autocomplete>
      </Box>
      <Box>
        <Autocomplete
          data={{
            a: 'AA',
            b: 'BB'
          }}
          // icon_position="left"
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

export default ['Autocomplete', AutocompleteStory]

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
      <Number key={99999999} phone>
        99999999
      </Number>,
      'Sparekonto - Ole Nordmann'
    ]
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      <>Custom content {'🔥'}</>
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
      <Number key={99999999} phone>
        99999999
      </Number>,
      'BB'
    ]
  },
  {
    selected_value: 'CCC',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'CC'
    ]
  },
  {
    selected_value: 'DDD',
    content: [
      <Number key={99999999} phone>
        99999999
      </Number>,
      'DD'
    ]
  },
  {
    content: <>E</>
  },
  <>Custom content {'🔥'}</>,
  [<Fragment key="key1">Custom content X {'🔥'}</Fragment>],
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
