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
  FormLabel,
  FormSet,
  FormRow,
  Number
  // Checkbox
} from '../../src/components'

const CustomStyle = styled.div`
  ${'' /* --autocomplete-width: 20rem; */}
  ${'' /* .dnb-autocomplete:not(.dnb-autocomplete--is-popup) .dnb-autocomplete__shell {
    width: 20rem;
  }
  .dnb-autocomplete:not(.dnb-autocomplete--is-popup) .dnb-autocomplete__list {
    min-width: 20rem;
  } */}
   [data-dnb-test='autocomplete-list'].dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--autocomplete-width);
  }
`

const AutocompleteStory = () => {
  const [data, setData] = useState(autocompleteData)
  const [value, setSelectedItem] = useState(0)
  return (
    <Wrapper>
      <Box>
        <Autocomplete
          // opened
          // no_animation
          // value="0"
          data={['A', 'B']}
          on_select={e => {
            console.log('on_select', e)
          }}
          on_change={e => {
            console.log('on_change', e)
          }}
        ></Autocomplete>
      </Box>
      <Box>
        <CurrencyAutocomplete />
      </Box>
      <Box>
        <AutocompleteStates />
      </Box>
      <Box>
        <AutocompleteStatesSync />
      </Box>
      <Box>
        <FormRow
          label="Vertical label_direction:"
          label_direction="vertical"
        >
          <Autocomplete
            label="Vertical A (function):"
            title="Default option"
            data={() => {
              return autocompleteData
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
          <Autocomplete
            title="Default option"
            label="Vertical B:"
            align_autocomplete="right"
            icon_position="left"
            data={autocompleteData}
          />
        </FormRow>
      </Box>
      <Box>
        <FormRow label="Vertical only:" vertical>
          <Autocomplete label="Vertical A:" data={autocompleteData} />
          <Autocomplete
            label="Vertical B:"
            data={autocompleteData}
            top="small"
          />
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
          <Autocomplete
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
              autocompleteData.unshift({
                selected_value: `I'm New ${id}`,
                content: `New content ${id}`
              })
              // setData(autocompleteData)
              setData([...autocompleteData])
            }}
          />
          <Button
            text="Remove"
            variant="secondary"
            onClick={() => {
              autocompleteData = autocompleteData.slice(1)
              setData(autocompleteData)
              // setData([...autocompleteData])
            }}
          />
          <Button
            text="Randomize"
            variant="tertiary"
            onClick={() => {
              const random = (min, max) =>
                Math.floor(Math.random() * (max - min + 1)) + min
              setSelectedItem(random(0, autocompleteData.length - 1))
            }}
          />
        </FormSet>
      </Box>
      <Box>
        <Autocomplete
          label="Label vertical:"
          label_direction="vertical"
          title={<>Custom title {'🔥'}</>}
          data={autocompleteData}
          on_change={({ data }) => {
            console.log('on_change', data)
          }}
          on_select={({ data }) => {
            console.log('on_select', data)
          }}
          status="Status message"
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
          <Autocomplete label="Vertical:" data={autocompleteData} />
        </FormRow>
      </Box>
      <Box>
        Popup Menu
        <Autocomplete
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
        <Autocomplete
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
        <Autocomplete
          prevent_selection="true"
          align_autocomplete="right"
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
        <Autocomplete
          label="Label:"
          // direction="top"
          data={autocompleteDataScrollable}
          value={4}
          no_scroll_animation="true"
          status="Message to the user"
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <FormLabel for_id="text-autocomplete-1" text="Label:" />
        <Autocomplete
          data={autocompleteData}
          id="text-autocomplete-1"
          size="small"
          icon_position="left"
          value={2}
        />
        <Autocomplete
          data={autocompleteData}
          id="text-autocomplete-1"
          size="medium"
          icon_position="left"
          value={2}
        />
        <Autocomplete
          data={autocompleteData}
          id="text-autocomplete-1"
          size="large"
          icon_position="left"
          value={2}
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <span
          data-dnb-test="autocomplete-list"
          className="dnb-drawer-list__list"
        >
          <ul className="dnb-drawer-list__options">
            <li className="dnb-drawer-list__option">
              <span className="dnb-drawer-list__option__inner">
                Brukskonto - Kari Nordmann
              </span>
            </li>
            <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
              <span className="dnb-drawer-list__option__inner">
                <span className="dnb-drawer-list__option__item">
                  <Number ban>12345678902</Number>
                </span>
                <span className="dnb-drawer-list__option__item">
                  Sparekonto - Ole Nordmann
                </span>
              </span>
            </li>
            <li className="dnb-drawer-list__option">
              <span className="dnb-drawer-list__option__inner">
                <span className="dnb-drawer-list__option__item">
                  <Number ban>11345678962</Number>
                </span>
                <span className="dnb-drawer-list__option__item">
                  Feriekonto - Kari Nordmann med et kjempelangt
                  etternavnsen
                </span>
              </span>
            </li>
            <li className="dnb-drawer-list__option last-of-type">
              <span className="dnb-drawer-list__option__inner">
                <span className="dnb-drawer-list__option__item">
                  <Number ban>15349648901</Number>
                </span>
                <span className="dnb-drawer-list__option__item">
                  Oppussing - Ole Nordmann
                </span>
              </span>
            </li>
            <li className="dnb-drawer-list__triangle" />
          </ul>
        </span>
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

// This component populates the autocomplete and handles the reset if, and only if, the value is undefined
function CurrencySelector({ currencies, onChange, value, ...props }) {
  let itemIndex = currencies.indexOf(value)
  itemIndex = itemIndex > -1 ? itemIndex : null
  return (
    <Autocomplete
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

function AutocompleteStates() {
  const [state, setState] = useState({})

  const handleOnChange = props => {
    console.log('AutocompleteStates', props)
    setState({ state: Math.random() })
  }

  return (
    <FormRow vertical>
      <>{JSON.stringify(state)}</>
      <Autocomplete
        data={autocompleteDataScrollable}
        title="Autocomplete 1"
        on_change={handleOnChange}
      />
      <Autocomplete
        top
        data={autocompleteDataScrollable}
        title="Autocomplete 2"
        on_change={handleOnChange}
      />
    </FormRow>
  )
}

function AutocompleteStatesSync() {
  const [state, setState] = useState({})

  const handleOnChange = props => {
    console.log('AutocompleteStates', props)
    setState({ state: Math.random() })
  }

  return (
    <FormRow vertical>
      <>{JSON.stringify(state)}</>
      <Autocomplete
        data={autocompleteDataScrollable}
        // value={0}
        default_value={0}
        title="Autocomplete 1"
        on_change={handleOnChange}
      />
      {/* <Autocomplete
        top
        data={autocompleteDataScrollable}
        // value={1}
        default_value={1}
        title="Autocomplete 2"
        on_change={handleOnChange}
      /> */}
    </FormRow>
  )
}

function CurrencyAutocomplete() {
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
        label="a"
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
