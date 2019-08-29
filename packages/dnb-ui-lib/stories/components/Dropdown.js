/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState, Fragment } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Dropdown,
  Button,
  FormLabel,
  FormSet,
  FormRow,
  Checkbox
} from '../../src/components'

const CustomStyle = styled.div`
  [data-dnb-test='dropdown-list'] .dnb-dropdown__options {
    position: relative;
    max-width: var(--dropdown-width);
  }
`

const DropdownStory = () => {
  const [data, setData] = useState(dropdownData)
  const [selected_item, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <FormRow
          label="Vertical label_direction:"
          label_direction="vertical"
        >
          <Dropdown
            label="Vertical A:"
            data={() => {
              console.log('dropdownData', dropdownData)
              return dropdownData
            }}
            right="small"
            status="Status message"
            on_change={({ attributes }) => {
              console.log(
                'on_change',
                // event.currentTarget.dataset,
                attributes
              )
            }}
            data-attr={123}
          />
          <Dropdown label="Vertical B:" data={dropdownData} />
        </FormRow>
      </Box>
      <Box>
        <FormRow label="Vertical only:" vertical>
          <Dropdown label="Vertical A:" data={dropdownData} />
          <Dropdown label="Vertical B:" data={dropdownData} top="small" />
        </FormRow>
      </Box>
      <Box>
        <FormSet
          onSubmit={event => {
            console.log('onSubmit', event)
          }}
          on_submit={event => {
            console.log('on_submit', event)
          }}
          prevent_submit
        >
          <select name="x" id="y">
            <option value="a">A</option>
            <option value="b">B</option>
          </select>
          <Dropdown
            label="Label:"
            data={data}
            selected_item={selected_item}
            on_state_update={event => {
              console.log('on_state_update', event)
            }}
            on_change={({ data }) => {
              console.log('on_change', data)
            }}
            on_select={({ data }) => {
              console.log('on_select', data)
            }}
          />
          <Button
            text="Add"
            onClick={() => {
              const id = Math.random()
              dropdownData.unshift({
                selected_value: `I'm New ${id}`,
                content: `New content ${id}`
              })
              // setData(dropdownData)
              setData([...dropdownData])
            }}
          />
          <Button
            text="Remove"
            variant="secondary"
            onClick={() => {
              dropdownData = dropdownData.slice(1)
              console.log('dropdownData', dropdownData)
              setData(dropdownData)
              // setData([...dropdownData])
            }}
          />
          <Button
            text="Randomize"
            variant="tertiary"
            onClick={() => {
              const random = (min, max) =>
                Math.floor(Math.random() * (max - min + 1)) + min
              setSelectedItem(random(0, dropdownData.length - 1))
            }}
          />
        </FormSet>
      </Box>
      <Box>
        <Dropdown
          label="Label vertical:"
          label_direction="vertical"
          title={<>Custom title {'🔥'}</>}
          data={dropdownData}
          on_change={({ data }) => {
            console.log('on_change', data)
          }}
          on_select={({ data }) => {
            console.log('on_select', data)
          }}
          // selected_item={3}
          // disabled
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <FormRow vertical>
          <Dropdown label="Vertical:" data={dropdownData} />
        </FormRow>
      </Box>
      <Box>
        Popup Menu
        <Dropdown
          left="small"
          right="small"
          size="small"
          more_menu={true}
          title="Choose an item"
          data={['Go this this Link', 'Or to this one']}
          on_change={({ selected_item }) => {
            console.log('on_change', selected_item)
          }}
          on_select={({ active_item }) => {
            console.log('on_select', active_item)
          }}
        />
        <Dropdown
          right="small"
          more_menu="true"
          title="Choose an item"
          data={['Go this this Link', 'Or to this one']}
          on_change={({ selected_item }) => {
            console.log('on_change', selected_item)
          }}
          on_select={({ active_item }) => {
            console.log('on_select', active_item)
          }}
        />
        <Dropdown
          prevent_selection="true"
          align_dropdown="right"
          title="Choose an item"
          data={['Go this this Link', 'Or to this one']}
          on_change={({ selected_item }) => {
            console.log('on_change', selected_item)
          }}
          on_select={({ active_item }) => {
            console.log('on_select', active_item)
          }}
        />
      </Box>
      <Box>
        <Dropdown
          label="Label:"
          // direction="top"
          data={dropdownDataScrollable}
          selected_item={4}
          no_scroll_animation="true"
          // status="Message to the user"
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <FormLabel for_id="text-dropdown-1" text="Label:" />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="small"
          icon_position="left"
          selected_item={2}
        />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="medium"
          icon_position="left"
          selected_item={2}
        />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="large"
          icon_position="left"
          selected_item={2}
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box data-dnb-test="dropdown-list">
        <ul className="dnb-dropdown__options">
          <li className="dnb-dropdown__option">
            <span className="dnb-dropdown__option__inner">
              Brukskonto - Kari Nordmann
            </span>
          </li>
          <li className="dnb-dropdown__option dnb-dropdown__option--selected">
            <span className="dnb-dropdown__option__inner">
              <span className="dnb-dropdown__option__item">
                1234.56.78902
              </span>
              <span className="dnb-dropdown__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-dropdown__option">
            <span className="dnb-dropdown__option__inner">
              <span className="dnb-dropdown__option__item">
                1134.56.78962
              </span>
              <span className="dnb-dropdown__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-dropdown__option last-of-type">
            <span className="dnb-dropdown__option__inner">
              <span className="dnb-dropdown__option__item">
                1534.96.48901
              </span>
              <span className="dnb-dropdown__option__item">
                Oppussing - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-dropdown__triangle" />
        </ul>
      </Box>
    </Wrapper>
  )
}

export default [
  'Dropdown',
  () => (
    <CustomStyle>
      <DropdownStory />
    </CustomStyle>
  )
]

let dropdownData = [
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
const dropdownDataScrollable = [
  {
    selected_value: 'AA',
    content: 'A'
  },
  {
    content: ['1234.56.78902', 'B']
  },
  {
    selected_value: 'CC',
    content: ['1134.56.78962', 'C']
  },
  {
    selected_value: 'DD',
    content: ['1534.96.48901', 'D']
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
    content: ['F', 'F', 'F', 'F', 'F']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
]
