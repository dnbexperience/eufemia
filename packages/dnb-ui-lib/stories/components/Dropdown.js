/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Dropdown,
  Button,
  FormLabel,
  FormSet,
  FormRow,
  Number
  // Checkbox
} from '../../src/components'

const CustomStyle = styled.div`
  [data-dnb-test='dropdown-list'] .dnb-dropdown__options {
    position: relative;
    max-width: var(--dropdown-width);
  }
  .dnb-dropdown__shell {
    width: 10rem;
  }
  .dnb-dropdown__list {
    min-width: 20rem;
  }
`

const DropdownStory = () => {
  const [data, setData] = useState(dropdownData)
  const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <CurrencyDropdown />
      </Box>
      <Box>
        <DropdownStates />
      </Box>
      <Box>
        <DropdownStatesSync />
      </Box>
      <Box>
        <FormRow
          label="Vertical label_direction:"
          label_direction="vertical"
        >
          <Dropdown
            label="Vertical A:"
            title="Default option"
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
            icon_position="left"
          />
          <Dropdown
            title="Default option"
            label="Vertical B:"
            align_dropdown="right"
            icon_position="left"
            data={dropdownData}
          />
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
            value={value}
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
          // value={3}
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
          on_change={({ value }) => {
            console.log('on_change', value)
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
          on_change={({ value }) => {
            console.log('on_change', value)
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
          on_change={({ value }) => {
            console.log('on_change', value)
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
          value={4}
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
          value={2}
        />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="medium"
          icon_position="left"
          value={2}
        />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="large"
          icon_position="left"
          value={2}
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
                <Number ban>12345678902</Number>
              </span>
              <span className="dnb-dropdown__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-dropdown__option">
            <span className="dnb-dropdown__option__inner">
              <span className="dnb-dropdown__option__item">
                <Number ban>11345678962</Number>
              </span>
              <span className="dnb-dropdown__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-dropdown__option last-of-type">
            <span className="dnb-dropdown__option__inner">
              <span className="dnb-dropdown__option__item">
                <Number ban>15349648901</Number>
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
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      <>Custom content {'🔥'}</>
    ]
  }
]
const dropdownDataScrollable = [
  {
    selected_value: 'AA',
    content: 'A'
  },
  {
    content: [
      <Number key={12345678902} ban>
        12345678902
      </Number>,
      'B'
    ]
  },
  {
    selected_value: 'CC',
    content: [
      <Number key={11345678962} ban>
        11345678962
      </Number>,
      'C'
    ]
  },
  {
    selected_value: 'DD',
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      'D'
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
    content: ['F', 'F', 'F', 'F', 'F']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
]

const Flag = () => <>COUNTRY FLAG</> // These <> are Fragments, like React.Fragment

// This component populates the dropdown and handles the reset if, and only if, the value is undefined
function CurrencySelector({ currencies, onChange, value, ...props }) {
  let itemIndex = currencies.indexOf(value)
  itemIndex = itemIndex > -1 ? itemIndex : null
  // console.log('props', props)
  // console.log('itemIndex:', itemIndex)
  return (
    <Dropdown
      {...props}
      value={itemIndex}
      title={strings.currencyBlankLabel}
      // eslint-disable-next-line camelcase
      on_change={({ data: { selected_value }, event }) => {
        console.log('event', event)
        if (event && typeof event.persist === 'function') {
          event.persist()
        }
        onChange(selected_value)
      }}
      data={currencies.map(currency => ({
        selected_value: currency,
        content: (
          <>
            {currency} <Flag currency={currency} />
          </>
        )
      }))}
    />
  )
}
CurrencySelector.propTypes = {
  value: PropTypes.string,
  currencies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
CurrencySelector.defaultProps = {
  value: null
}

function DropdownStates() {
  const [state, setState] = useState({})

  const handleOnChange = props => {
    console.log('DropdownStates', props)
    setState({ state: Math.random() })
  }

  return (
    <FormRow vertical>
      <>{JSON.stringify(state)}</>
      <Dropdown
        data={dropdownDataScrollable}
        title="Dropdown 1"
        on_change={handleOnChange}
      />
      <Dropdown
        top
        data={dropdownDataScrollable}
        title="Dropdown 2"
        on_change={handleOnChange}
      />
    </FormRow>
  )
}

function DropdownStatesSync() {
  const [state, setState] = useState({})

  const handleOnChange = props => {
    console.log('DropdownStates', props)
    setState({ state: Math.random() })
  }

  return (
    <FormRow vertical>
      <>{JSON.stringify(state)}</>
      <Dropdown
        data={dropdownDataScrollable}
        // value={0}
        default_value={0}
        title="Dropdown 1"
        on_change={handleOnChange}
      />
      <Dropdown
        top
        data={dropdownDataScrollable}
        // value={1}
        default_value={1}
        title="Dropdown 2"
        on_change={handleOnChange}
      />
    </FormRow>
  )
}

function CurrencyDropdown() {
  // You can regard this as part of a state object that we eventually push to the backend iot conduct a Request for Quote in a Foreign Exchange (FX) transaction
  // The string reps of the currencies are pulled from an API that provides valid currency pairs for specific FX instruments
  const [ccyPair, setCcyPair] = useState({ base: 'EUR', terms: 'SEK' })

  useEffect(() => {
    console.log('ccyPair:', ccyPair)
  }, [ccyPair])

  // Whenever a user selects a new base currency, the termscurrency select should be forced to reset.
  const handleBaseCurrencyChange = base =>
    setCcyPair(prev => ({ ...prev, base, terms: undefined }))
  const handleTermsCurrencyChange = terms =>
    setCcyPair(prev => ({ ...prev, terms }))

  return (
    <>
      <CurrencySelector
        value={ccyPair.base}
        currencies={baseCurrencies}
        onChange={handleBaseCurrencyChange}
      />
      <CurrencySelector
        value={ccyPair.terms}
        currencies={termsCurrencies}
        onChange={handleTermsCurrencyChange}
      />
      <Button
        text="New base"
        onClick={() => {
          const base = 'USD'
          setCcyPair(prev => ({ ...prev, base, terms: undefined }))
        }}
      />
    </>
  )
}

// Mock currency data somewhat simplified
const baseCurrencies = ['EUR', 'USD']

const termsCurrencies = ['SEK', 'NOK']

const strings = {
  currencyBlankLabel: '-- Choose Currency --'
}
