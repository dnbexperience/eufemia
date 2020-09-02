/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  // Autocomplete,
  Dropdown,
  Button,
  FormLabel,
  FormSet,
  FormRow,
  Number,
  Modal
  // Checkbox
} from '../../src/components'

const CustomStyle = styled.div`
  [data-dnb-test='dropdown-list'].dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`
const CustomWidth = styled.div`
  /** Because regarding the included label/status etc. we target the "__shell" */
  .dnb-dropdown__shell {
    width: 10rem;
  }

  /** In order to change only the "__list" width */
  .dnb-drawer-list__root {
    width: 8rem;
  }

  /** In Portal mode */
  .dnb-dropdown--is-popup .dnb-drawer-list__root {
    width: 8rem;
  }
`
const RightAligned = styled.div`
  display: flex;
  justify-content: space-between;
`

const direction = 'auto'
const label = 'Label'
const align_dropdown = 'right'
const opened = false

const DropdownStory = () => {
  const [data, setData] = React.useState(dropdownData)
  const [value, setSelectedItem] = React.useState(0)
  return (
    <Wrapper>
      <Box>
        <RightAligned>
          <Dropdown
            size="small"
            // opened
            more_menu
            data={['Go this this Link', 'Or to this one']}
            // skip_portal
            align_dropdown="right"
          />
          <Dropdown
            size="small"
            // opened
            more_menu
            data={['Go this this Link', 'Or to this one']}
            // skip_portal
            // align_dropdown="right"
          />
        </RightAligned>
      </Box>
      <Box>
        <UpdateDataExample></UpdateDataExample>
      </Box>
      <CustomWidth>
        <Box>
          <Modal mode="drawer">
            <Dropdown
              use_drawer_on_mobile
              label={label}
              data={dropdownDataScrollable}
            />
          </Modal>
        </Box>
        <Box>
          <Dropdown
            size="small"
            skip_portal
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            // icon_position="left"
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="small"
            opened={opened}
            use_drawer_on_mobile
            // no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={opened ? 'x-large x-large' : 0}>
          <Dropdown
            skip_portal
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={opened ? 'x-large x-large' : 0}>
          <Dropdown
            size="medium"
            skip_portal
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="medium"
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={opened ? 'x-large x-large' : 0}>
          <Dropdown
            size="large"
            skip_portal
            opened={opened}
            no_animation
            direction={direction}
            align_dropdown={align_dropdown}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="large"
            opened={opened}
            // opened
            no_animation
            align_dropdown={align_dropdown}
            direction={direction}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={opened ? 'x-large x-large' : 0}>
          <Box>
            <Dropdown
              size="small"
              opened={opened}
              // opened
              label={label}
              no_animation
              direction={direction}
              align_dropdown={align_dropdown}
              more_menu={true}
              data={['Go this this Link', 'Or to this one']}
              right="x-large x-large"
              skip_portal
            />
            <Dropdown
              more_menu="true"
              opened={opened}
              label={label}
              no_animation
              direction={direction}
              align_dropdown={align_dropdown}
              data={['Go this this Link', 'Or to this one']}
              right="x-large x-large"
            />
            <Dropdown
              size="medium"
              more_menu="true"
              opened={opened}
              label={label}
              no_animation
              direction={direction}
              align_dropdown={align_dropdown}
              data={['Go this this Link', 'Or to this one']}
              right="x-large x-large"
            />
            <Dropdown
              size="large"
              more_menu
              opened={opened}
              label={label}
              no_animation
              direction={direction}
              align_dropdown={align_dropdown}
              data={['Go this this Link', 'Or to this one']}
              right="x-large x-large"
            />
          </Box>
        </Box>
      </CustomWidth>
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
            label="Vertical A (function):"
            title="Default option"
            data={() => {
              return dropdownData
            }}
            right
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
            // align_dropdown="right"
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
          onSubmit={(event) => {
            console.log('onSubmit', event)
          }}
          on_submit={(event) => {
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
            on_state_update={(event) => {
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
          <Dropdown label="Vertical:" data={dropdownData} />
        </FormRow>
      </Box>
      <Box>
        <span className="dnb-p">Eros semper</span>
        <Dropdown
          label="Label:"
          // direction="top"
          data={dropdownDataScrollable}
          value={4}
          no_scroll_animation="true"
          status="Message to the user"
          right
        />
        <span className="dnb-p">Eros semper</span>
      </Box>
      <Box>
        <FormLabel for_id="text-dropdown-1" text="FormLabel Label:" />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="small"
          icon_position="left"
          bottom
          value={2}
        />
        <Dropdown
          data={dropdownData}
          size="medium"
          icon_position="left"
          bottom
          value={2}
        />
        <Dropdown
          data={dropdownData}
          size="large"
          icon_position="left"
          bottom
          value={2}
        />
        <Dropdown data={dropdownData} size="small" bottom value={2} />
        <Dropdown data={dropdownData} size="medium" bottom value={2} />
        <Dropdown data={dropdownData} size="large" bottom value={2} />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <FormRow direction="vertical">
          <Dropdown
            label="Label:"
            size="default"
            bottom
            data={() => data}
          />
          <Dropdown
            label="Label:"
            size="medium"
            bottom
            data={() => data}
          />
        </FormRow>
        <Dropdown size="large" bottom data={() => data} />
        <Dropdown data={dropdownData} size="large" bottom value={2} />
      </Box>
      <Box>
        <span
          data-dnb-test="dropdown-list"
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
    selected_value: (
      <React.Fragment key="cs-1">Custom selected {'🔥'}</React.Fragment>
    ),
    content: [
      <Number key={15349648901} ban>
        15349648901
      </Number>,
      <React.Fragment key="cs-2">Custom content {'🔥'}</React.Fragment>
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
    content: <>E</>
  },
  <>Custom content {'🔥'}</>,
  [<React.Fragment key="key2">Custom content X {'🔥'}</React.Fragment>],
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
      data={currencies.map((currency) => ({
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
  const [state, setState] = React.useState({})

  const handleOnChange = (props) => {
    console.log('DropdownStates', props)
    setState({ state: Math.random() })
  }

  return (
    <FormRow vertical>
      <>{JSON.stringify(state)}</>
      <Dropdown
        data={dropdownDataScrollable}
        title="use_drawer_on_mobile"
        use_drawer_on_mobile
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
  const [state, setState] = React.useState({})

  const handleOnChange = (props) => {
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
      {/* <Dropdown
        top
        data={dropdownDataScrollable}
        // value={1}
        default_value={1}
        title="Dropdown 2"
        on_change={handleOnChange}
      /> */}
    </FormRow>
  )
}

function CurrencyDropdown() {
  // You can regard this as part of a state object that we eventually push to the backend iot conduct a Request for Quote in a Foreign Exchange (FX) transaction
  // The string reps of the currencies are pulled from an API that provides valid currency pairs for specific FX instruments
  const [ccyPair, setCcyPair] = React.useState({
    base: 'EUR',
    terms: 'SEK'
  })

  React.useEffect(() => {
    console.log('ccyPair:', ccyPair)
  }, [ccyPair])

  // Whenever a user selects a new base currency, the termscurrency select should be forced to reset.
  const handleBaseCurrencyChange = (base) =>
    setCcyPair((prev) => ({ ...prev, base, terms: undefined }))
  const handleTermsCurrencyChange = (terms) =>
    setCcyPair((prev) => ({ ...prev, terms }))

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
          setCcyPair((prev) => ({ ...prev, base, terms: undefined }))
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

const initialData = [
  { selected_value: '1', content: '1' },
  { selected_value: '2', content: '2' },
  { selected_value: '3', content: '3' },
  { selected_value: '4', content: '4' }
]

function UpdateDataExample() {
  const [choiceData, setChoiceData] = React.useState(initialData)
  const [selectedData, setSelectedData] = React.useState([])

  return (
    <>
      <pre>
        Selected data:{' '}
        {selectedData.map((item, i) => {
          return (
            <Button
              key={i}
              size="small"
              on_click={() => {
                const updatedSelectedData = selectedData.filter(
                  ({ selected_value }) =>
                    item?.selected_value !== selected_value
                )
                setSelectedData(updatedSelectedData)
                setChoiceData(
                  initialData.filter(
                    ({ selected_value }) =>
                      updatedSelectedData.findIndex(
                        ({ selected_value: updatedValue }) =>
                          updatedValue === selected_value
                      ) === -1
                  )
                )
              }}
            >
              {item?.content}
            </Button>
          )
        })}
      </pre>

      <Dropdown
        title="Choose an item"
        prevent_selection
        enable_body_lock
        data={choiceData}
        on_change={({ data }) => {
          console.log('data', data)
          if (data) {
            setChoiceData(
              choiceData.filter((item) => {
                return (
                  data && item?.selected_value !== data?.selected_value
                )
              })
            )
            if (
              selectedData.findIndex(
                ({ selected_value }) =>
                  selected_value === data.selected_value
              ) === -1
            ) {
              setSelectedData([...selectedData, data])
            }
          }
        }}
      />
    </>
  )
}
