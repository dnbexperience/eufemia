/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  IconPrimary,
  Dropdown,
  Button,
  FormLabel,
  NumberFormat,
  Drawer,
  GlobalStatus,
} from '../..'
import { Dialog, Flex, Icon, Link, P } from '../../..'
import { DrawerListDataArray } from '../../../fragments/DrawerList'
import { Provider } from '../../../shared'
import { Field, Form } from '../../../extensions/forms'
import { bank } from '../../../icons'

export default {
  title: 'Eufemia/Components/Dropdown',
}

const CustomStyle = styled.div`
  [data-testid='dropdown-list'].dnb-drawer-list__list {
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
const alignDropdown = 'right'
const iconPosition = 'right'
const open = false

const DropdownStory = () => {
  const [data, setData] = React.useState(dropdownData)
  const [value, setSelectedItem] = React.useState(0)
  return (
    <Wrapper>
      <Box>
        <Dropdown title="Default" data={data} />
        <Dropdown variant="secondary" title="Secondary" data={data} top />
        <Dropdown variant="primary" title="Primary" data={data} top />
        <Dropdown variant="signal" title="Signal" data={data} top />
        <Dropdown variant="tertiary" title="Tertiary" data={data} top />
        <Dropdown
          variant="tertiary"
          title="Tertiary disabled"
          disabled
          data={data}
        />
        <Dropdown
          variant="secondary"
          title="Secondary disabled"
          disabled
          data={data}
          top
        />
        <Dropdown
          variant="primary"
          title="Primary disabled"
          disabled
          data={data}
          top
        />
      </Box>
      <Box>
        <RightAligned>
          <Dropdown
            size="small"
            independentWidth
            iconPosition="left"
            alignDropdown="left"
            variant="tertiary"
            title="Tertiary"
            data={[
              <Link key="item-1" href="/">
                Go to this Link
              </Link>,
              'Or to this one',
            ]}
          />
          <Dropdown
            size="small"
            independentWidth
            variant="tertiary"
            title="Tertiary"
            data={[
              <Link key="item-1" href="/">
                Go to this Link
              </Link>,
              'Or to this one',
            ]}
          />
        </RightAligned>
      </Box>
      <Box>
        <RightAligned>
          <Dropdown
            mode="action-menu"
            title="Action Menu"
            data={[
              <>
                <IconPrimary icon="check" right />
                Save
              </>,
              <>
                <IconPrimary icon="download" right />
                Download
              </>,
            ]}
            onClose={(e) => {
              console.log('onClose', e)
            }}
            onSelect={(e) => {
              console.log('onSelect', e)
            }}
          />
          <Dropdown
            mode="action-menu"
            iconPosition="right"
            alignDropdown="right"
            title="Action Menu"
            data={[
              <>
                <IconPrimary icon="check" right />
                Save
              </>,
              <>
                <IconPrimary icon="download" right />
                Download
              </>,
            ]}
          />
        </RightAligned>
      </Box>
      <Box>
        <RightAligned>
          <Dropdown
            size="small"
            mode="more-menu"
            data={[
              <Link key="item-1" href="/">
                Go to this Link
              </Link>,
              'Or to this one',
            ]}
            alignDropdown="right"
          />
          <Dropdown
            size="small"
            mode="more-menu"
            data={[
              <Link key="item-1" href="/">
                Go to this Link
              </Link>,
              'Or to this one',
            ]}
          />
        </RightAligned>
      </Box>
      <Box>
        <UpdateDataExample />
      </Box>
      <CustomWidth>
        <Box>
          <Drawer>
            <Dropdown label={label} data={dropdownDataScrollable} />
          </Drawer>
        </Box>
        <Box>
          <Dropdown
            size="small"
            skipPortal
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="small"
            open={open}
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={open ? 'x-large x-large' : 0}>
          <Dropdown
            skipPortal
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={open ? 'x-large x-large' : 0}>
          <Dropdown
            size="medium"
            skipPortal
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="medium"
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={open ? 'x-large x-large' : 0}>
          <Dropdown
            size="large"
            skipPortal
            open={open}
            noAnimation
            direction={direction}
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            label={label}
            data={['A', 'B']}
            right
          />
          <Dropdown
            size="large"
            open={open}
            noAnimation
            alignDropdown={alignDropdown}
            iconPosition={iconPosition}
            direction={direction}
            label={label}
            data={['A', 'B']}
            right
          />
        </Box>
        <Box top={open ? 'x-large x-large' : 0}>
          <Box>
            <Dropdown
              size="small"
              open={open}
              label={label}
              noAnimation
              direction={direction}
              alignDropdown={alignDropdown}
              iconPosition={iconPosition}
              mode="more-menu"
              data={[
                <Link key="item-1" href="/">
                  Go to this Link
                </Link>,
                'Or to this one',
              ]}
              right="x-large x-large"
              skipPortal
            />
            <Dropdown
              mode="more-menu"
              open={open}
              label={label}
              noAnimation
              direction={direction}
              alignDropdown={alignDropdown}
              iconPosition={iconPosition}
              data={[
                <Link key="item-1" href="/">
                  Go to this Link
                </Link>,
                'Or to this one',
              ]}
              right="x-large x-large"
            />
            <Dropdown
              size="medium"
              mode="more-menu"
              open={open}
              label={label}
              noAnimation
              direction={direction}
              alignDropdown={alignDropdown}
              iconPosition={iconPosition}
              data={[
                <Link key="item-1" href="/">
                  Go to this Link
                </Link>,
                'Or to this one',
              ]}
              right="x-large x-large"
            />
            <Dropdown
              size="large"
              mode="more-menu"
              open={open}
              label={label}
              noAnimation
              direction={direction}
              alignDropdown={alignDropdown}
              iconPosition={iconPosition}
              data={[
                <Link key="item-1" href="/">
                  Go to this Link
                </Link>,
                'Or to this one',
              ]}
              right="x-large x-large"
            />
          </Box>
        </Box>
      </CustomWidth>
      <Box>
        <CurrencyDropdown />
      </Box>
      <Box>
        <DropdownStatesSync />
      </Box>
      <Box>
        <Provider
          formElement={{
            labelDirection: 'vertical',
          }}
        >
          <Dropdown
            label="Vertical A (function):"
            title="Default option"
            data={() => {
              return dropdownData
            }}
            right
            status="Status message"
            onChange={({ attributes }) => {
              console.log('onChange', attributes)
            }}
            data-attr={123}
            iconPosition="left"
          />
          <Dropdown
            title="Default option"
            label="Vertical B:"
            iconPosition="left"
            data={dropdownData}
          />
        </Provider>
      </Box>
      <Box>
        <Provider
          formElement={{
            labelDirection: 'vertical',
          }}
        >
          <Dropdown label="Vertical A:" data={dropdownData} />
          <Dropdown label="Vertical B:" data={dropdownData} top="small" />
        </Provider>
      </Box>
      <Box>
        <Form.Handler
          onSubmit={(event) => {
            console.log('onSubmit', event)
          }}
        >
          <select name="x" id="y">
            <option value="a">A</option>
            <option value="b">B</option>
          </select>
          <Dropdown
            label="Label:"
            data={data}
            value={value}
            onStateUpdate={(event) => {
              console.log('onStateUpdate', event)
            }}
            onChange={({ data }) => {
              console.log('onChange', data)
            }}
            onSelect={({ data }) => {
              console.log('onSelect', data)
            }}
          />
          <Button
            text="Add"
            onClick={() => {
              const id = Math.random()
              dropdownData.unshift({
                selectedValue: `I'm New ${id}`,
                content: `New content ${id}`,
              })
              setData([...dropdownData])
            }}
          />
          <Button
            text="Remove"
            variant="secondary"
            onClick={() => {
              dropdownData = dropdownData.slice(1)
              setData(dropdownData)
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
        </Form.Handler>
      </Box>
      <Box>
        <Dropdown
          label="Label vertical:"
          labelDirection="vertical"
          title={<>Custom title {'🔥'}</>}
          data={dropdownData}
          onChange={({ data }) => {
            console.log('onChange', data)
          }}
          onSelect={({ data }) => {
            console.log('onSelect', data)
          }}
          status="Status message"
        />
        <p className="dnb-p">
          Eros semper blandit tellus mollis primis quisque platea
          sollicitudin ipsum
        </p>
      </Box>
      <Box>
        <Provider formElement={{ labelDirection: 'vertical' }}>
          <Dropdown label="Vertical:" data={dropdownData} />
        </Provider>
      </Box>
      <Box>
        <span className="dnb-p">Eros semper</span>
        <Dropdown
          label="Label:"
          data={dropdownDataScrollable}
          value={4}
          noScrollAnimation={true}
          status="Message to the user"
          right
        />
        <span className="dnb-p">Eros semper</span>
      </Box>
      <Box>
        <FormLabel forId="text-dropdown-1" text="FormLabel Label:" />
        <Dropdown
          data={dropdownData}
          id="text-dropdown-1"
          size="small"
          iconPosition="left"
          bottom
          value={2}
        />
        <Dropdown
          data={dropdownData}
          size="medium"
          iconPosition="left"
          bottom
          value={2}
        />
        <Dropdown
          data={dropdownData}
          size="large"
          iconPosition="left"
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
        <Flex.Vertical>
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
        </Flex.Vertical>
        <Dropdown size="large" bottom data={() => data} />
        <Dropdown data={dropdownData} size="large" bottom value={2} />
      </Box>
      <Box>
        <span
          data-testid="dropdown-list"
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
                  <NumberFormat ban>12345678902</NumberFormat>
                </span>
                <span className="dnb-drawer-list__option__item">
                  Sparekonto - Ole Nordmann
                </span>
              </span>
            </li>
            <li className="dnb-drawer-list__option">
              <span className="dnb-drawer-list__option__inner">
                <span className="dnb-drawer-list__option__item">
                  <NumberFormat ban>11345678962</NumberFormat>
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
                  <NumberFormat ban>15349648901</NumberFormat>
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

export const DropdownSandbox = () => (
  <CustomStyle>
    <DropdownStory />
  </CustomStyle>
)

let dropdownData: DrawerListDataArray = [
  {
    selectedValue: 'Brukskonto - Kari Nordmann',
    content: (
      <>
        {/* <Checkbox checked aria-hidden />  */}
        Brukskonto - Kari Nordmann
      </>
    ),
  },
  {
    content: [
      <NumberFormat key={12345678902} ban>
        12345678902
      </NumberFormat>,
      'Sparekonto - Ole Nordmann',
      'Line 2',
      'Line 3',
    ],
  },
  {
    selectedValue:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <NumberFormat key={11345678962} ban>
        11345678962
      </NumberFormat>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selectedValue: (
      <React.Fragment key="cs-1">Custom selected {'🔥'}</React.Fragment>
    ),
    content: [
      <NumberFormat key={15349648901} ban>
        15349648901
      </NumberFormat>,
      <React.Fragment key="cs-2">Custom content {'🔥'}</React.Fragment>,
    ],
  },
]
const dropdownDataScrollable = [
  {
    selectedValue: 'AA',
    content: 'A',
  },
  {
    content: [
      <NumberFormat key={12345678902} ban>
        12345678902
      </NumberFormat>,
      'B',
    ],
  },
  {
    selectedValue: 'CC',
    content: [
      <NumberFormat key={11345678962} ban>
        11345678962
      </NumberFormat>,
      'C',
    ],
  },
  {
    selectedValue: 'DD',
    content: [
      <NumberFormat key={15349648901} ban>
        15349648901
      </NumberFormat>,
      'D',
    ],
  },
  {
    content: <>E</>,
  },
  <>Custom content {'🔥'}</>,
  [<React.Fragment key="key2">Custom content X {'🔥'}</React.Fragment>],
  {
    content: 'EE',
  },
  {
    content: 'EEE',
  },
  {
    content: ['F', 'F', 'F', 'F', 'F'],
  },
  {
    content: 'G',
  },
  {
    content: 'H',
  },
]

const Flag = () => <>COUNTRY FLAG</> // These <> are Fragments, like React.Fragment
function CurrencySelector({
  currencies,
  onChange,
  value = null,
  ...props
}) {
  let itemIndex = currencies.indexOf(value)
  itemIndex = itemIndex > -1 ? itemIndex : null
  return (
    <Dropdown
      {...props}
      value={itemIndex}
      title={strings.currencyBlankLabel}
      onChange={({ data: { selectedValue }, event }) => {
        console.log('event', event)
        if (event && typeof event.persist === 'function') {
          event.persist()
        }
        onChange(selectedValue)
      }}
      data={currencies.map((currency) => ({
        selectedValue: currency,
        content: (
          <>
            {currency} <Flag />
          </>
        ),
      }))}
    />
  )
}
CurrencySelector.propTypes = {
  value: PropTypes.string,
  currencies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

function DropdownStatesSync() {
  const [state, setState] = React.useState({})

  const handleOnChange = (props) => {
    console.log('DropdownStates', props)
    setState({ state: Math.random() })
  }

  return (
    <Provider formElement={{ labelDirection: 'vertical' }}>
      <Flex.Vertical>
        <>{JSON.stringify(state)}</>
        <Dropdown
          data={dropdownDataScrollable}
          defaultValue={0}
          title="Dropdown 1"
          onChange={handleOnChange}
        />
        {/* <Dropdown
        top
        data={dropdownDataScrollable}
        defaultValue={1}
        title="Dropdown 2"
        onChange={handleOnChange}
      /> */}
      </Flex.Vertical>
    </Provider>
  )
}

function CurrencyDropdown() {
  const [ccyPair, setCcyPair] = React.useState({
    base: 'EUR',
    terms: 'SEK',
  })

  React.useEffect(() => {
    console.log('ccyPair:', ccyPair)
  }, [ccyPair])
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
const baseCurrencies = ['EUR', 'USD']

const termsCurrencies = ['SEK', 'NOK']

const strings = {
  currencyBlankLabel: '-- Choose Currency --',
}

const initialData = [
  { selectedValue: '1', content: '1' },
  { selectedValue: '2', content: '2' },
  { selectedValue: '3', content: '3' },
  { selectedValue: '4', content: '4' },
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
              onClick={() => {
                const updatedSelectedData = selectedData.filter(
                  (data) => item?.selectedValue !== data?.selectedValue
                )
                setSelectedData(updatedSelectedData)
                setChoiceData(
                  initialData.filter(
                    (data) =>
                      updatedSelectedData.findIndex(
                        ({ selectedValue: updatedValue }) =>
                          updatedValue === data?.selectedValue
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
        mode="prevent"
        enableBodyLock
        data={choiceData}
        onChange={({ data }) => {
          console.log('data', data)
          if (data) {
            setChoiceData(
              choiceData.filter((item) => {
                return data && item?.selectedValue !== data?.selectedValue
              })
            )
            if (
              selectedData.findIndex(
                ({ selectedValue }) => selectedValue === data.selectedValue
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

const filter1ToShow = [
  {
    selectedKey: 'key_1',
    content: 'item_1',
  },
  {
    selectedKey: 'key_2',
    content: 'item_2',
  },
]

const filter2ToShow = [
  {
    selectedKey: 'key_3',
    content: 'item_3',
  },
  {
    selectedKey: 'key_4',
    content: 'item_4',
  },
]

export function UpdateData() {
  const [value, setValue] = React.useState(null)
  const [filtersToShow, setFiltersToShow] = React.useState(filter1ToShow)
  const [preventClose, setPreventClose] = React.useState(true)

  const onFilterChange = ({ value, data }) => {
    setValue(value)
    if (data?.selectedKey === 'key_1' || data?.selectedKey === 'key_2') {
      setFiltersToShow(filter2ToShow)
      setValue(null)
      setTimeout(() => {
        setPreventClose(false)
      }, 1)
      return
    }
    setPreventClose(false)
  }

  const onOpen = () => {
    setFiltersToShow(filter1ToShow)
    setPreventClose(true)
    setValue(null) // important, we have to change be
  }

  return (
    <>
      <Dropdown
        top="10rem"
        data={filtersToShow}
        title={'Velg filter:'}
        onChange={onFilterChange}
        onOpen={onOpen}
        value={value}
        size="large"
        direction="top"
        preventClose={preventClose}
      />
      <Dropdown
        top="10rem"
        data={filtersToShow}
        title={'Velg filter:'}
        onChange={onFilterChange}
        onOpen={onOpen}
        value={value}
        size="large"
        preventClose={preventClose}
      />
    </>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Dropdown
        title="Default"
        data={dropdownData}
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}

export const TypesExample = () => {
  interface MyInterface {
    content: string
    selectedKey: string
  }

  const myData: MyInterface[] = []

  return <Dropdown data={myData} />
}

export function InDialog() {
  const list = Array(30).fill('Content')
  return (
    <Dialog
      alignContent="left"
      maxWidth="35rem"
      title="Ny melding"
      open
      noAnimation
    >
      <Form.Handler>
        <Flex.Stack>
          <Field.Selection
            data={list}
            label="Hva gjelder henvendelsen?"
            dropdownProps={{
              title: 'Velg fra liste',
              direction: 'bottom',
            }}
          />

          <Field.Selection
            data={list}
            label="Emne"
            dropdownProps={{
              title: 'Velg fra liste',
              direction: 'bottom',
            }}
          />

          <Dialog.Action innerSpace={{ top: 'small' }}>
            <Form.SubmitButton />
          </Dialog.Action>
        </Flex.Stack>
      </Form.Handler>
    </Dialog>
  )
}

export function Title() {
  return (
    <>
      <Dropdown
        data={[
          {
            selectedKey: 'test',
            selectedValue: <>my value</>,
            content: 'test',
          },
        ]}
        value={0}
      />

      <Dropdown
        data={[
          {
            selectedKey: 'test',
            selectedValue: <P>my value</P>,
            content: 'test',
          },
        ]}
        value={0}
      />

      <Dropdown
        data={[
          {
            selectedKey: 'test',
            selectedValue: (
              <>
                <Icon icon={bank} />
                Banking
              </>
            ),
            content: 'test',
          },
        ]}
        value={0}
      />

      <Dropdown
        data={[
          {
            selectedKey: 'test',
            selectedValue: <Icon icon={bank} />,
            content: 'test',
          },
        ]}
        value={0}
      />

      <Dropdown
        data={[
          {
            selectedKey: 'test',
            selectedValue: <NumberFormat>11345678962</NumberFormat>,
            content: 'test',
          },
        ]}
        value={0}
      />
    </>
  )
}

export const DropdownIndependentWidth = () => (
  <Wrapper>
    <Dropdown
      independentWidth
      size="default"
      title="sadsadasd sad asdasdas das dasdas d"
      data={dropdownData}
    />
    <Dropdown independentWidth size="default" data={dropdownData} />
    <Dropdown
      independentWidth
      size="default"
      title="s"
      data={dropdownData}
    />
  </Wrapper>
)
