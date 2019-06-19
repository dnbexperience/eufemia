/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'

// UI Components
import ButtonStory from './components/Button'
import Radio from './components/Radio'
import ToggleButton from './components/ToggleButton'
import Checkbox from './components/Checkbox'
import Switch from './components/Switch'
import DatePicker from './components/DatePicker'
import Textarea from './components/Textarea'
import ProgressIndicator from './components/ProgressIndicator'
import Modal from './components/Modal'
import FormLabelStory from './components/FormLabel'
import FormRowStory from './components/FormRow'
import FormSetStory from './components/FormSet'
import {
  Button,
  Tabs,
  Input,
  InputMasked,
  Icon,
  IconPrimary,
  FormLabel,
  Dropdown,
  Logo,
  StepIndicator
} from '../src/components'
import { H2 } from '../src/elements'

const stories = []
export default stories

stories.push(ButtonStory)
stories.push(Radio)
stories.push(ToggleButton)
stories.push(Checkbox)
stories.push(Switch)
stories.push(DatePicker)
stories.push(Textarea)
stories.push(ProgressIndicator)
stories.push(Modal)
stories.push(FormLabelStory)
stories.push(FormRowStory)
stories.push(FormSetStory)

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
  [data-dnb-test='dropdown-list'] .dnb-dropdown__options {
    position: relative;
    max-width: var(--dropdown-width);
  }
`

stories.push([
  'Logo',
  () => (
    <Wrapper>
      <Box>
        <Logo size="80" style={{ color: 'var(--color-cherry-red)' }} />
      </Box>
      <Box>
        <h1 className="dnb-h1">
          H1 with the DNB Logo <Logo size="auto" />
        </h1>
        <p className="dnb-p">
          Text with the DNB Logo <Logo />
        </p>
      </Box>
    </Wrapper>
  )
])

const tablistDataWithContent = [
  { title: 'First', key: 'first', content: <H2>First</H2> },
  { title: 'Second', key: 'second', content: () => <H2>Second</H2> }
]

stories.push([
  'Tabs',
  () => (
    <Wrapper>
      <Box>
        <Tabs data={tabsData}>{exampleTabsContent}</Tabs>
      </Box>
      <Box>
        <Tabs data={tablistDataWithContent} />
      </Box>
      <Box>
        <Tabs
          selected_key="second"
          data={{
            first: { title: 'First', content: () => <H2>First</H2> },
            second: { title: 'Second', content: () => <H2>Second</H2> }
          }}
        />
      </Box>
      <Box>
        <Tabs section_style="mint-green">
          <Tabs.Content title="First">
            <H2>First</H2>
          </Tabs.Content>
          <Tabs.Content title="Second" selected>
            <H2>Second</H2>
          </Tabs.Content>
        </Tabs>
      </Box>
      <Box>
        <Tabs
          align="right"
          label="Some Tabs label"
          data={tabsData}
          render={({ Wrapper, Content, TabsList, Tabs }) => {
            return (
              <Wrapper>
                <TabsList className="dnb-section">
                  <small>I'm on the left side</small>
                  <Tabs />
                </TabsList>
                <Content />
              </Wrapper>
            )
          }}
        >
          {exampleTabsContent}
        </Tabs>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Inputs',
  () => (
    <CustomStyle>
      <Wrapper>
        <Box>
          <Input
            label="Label:"
            on_change={event => {
              console.log('on_change', event)
            }}
          >
            Input ...
          </Input>
        </Box>
        <Box>
          <p className="dnb-p">
            <Input label="ReadOnly:" value="Placeholder ..." readOnly />
          </p>
        </Box>
        <Box>
          <Input
            label="Search:"
            type="search"
            submit_button_title="Search"
            placeholder="Search text placeholder"
          />
        </Box>
        <Box>
          <Input
            disabled
            label="Disabled search:"
            type="search"
            submit_button_title="Search"
            placeholder="Search text placeholder"
          />
        </Box>
        <Box>
          <Input
            label="Input with status:"
            status="Message to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <Input
            label="Input with description:"
            description="Description to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <InputMasked
            label="Masked:"
            autocomplete="off"
            // value="1000000"
            mask={[
              '+',
              /[4]/, // have to start with 4
              /[5-7]/, // can be 5,6 or 7
              ' ',
              '/',
              ' ',
              /[49]/, // have to start with 4 or 9
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/
            ]}
            show_mask="true"
          />
        </Box>
        <Box>
          <form
            onSubmit={event => {
              console.log('onSubmit', event)
              event.preventDefault()
              // event.persist()
            }}
          >
            <Input
              label="Label:"
              on_change={event => {
                console.log('on_change', event)
              }}
              onChange={event => {
                console.log('onChange', event)
              }}
              on_submit={event => {
                console.log('on_submit', event)
              }}
              onSubmit={event => {
                console.log('on_submit', event)
              }}
              value="Input ..."
            />
            <Button
              text="Submit"
              type="submit"
              on_click={event => {
                console.log('on_click', event)
              }}
              onClick={event => {
                console.log('onClick', event)
              }}
            />
          </form>
        </Box>
      </Wrapper>
    </CustomStyle>
  )
])

const svg = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.5 16.992H17.5C15.329 16.9253 13.2054 17.6344 11.51 18.992"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 17.008L14.184 8.641"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.605 2.133L11.236 1.203"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.605 2.133C6.728 4.066 3.56 7.618 4.984 11.211L5.168 11.676C5.21677 11.7996 5.31273 11.8987 5.43468 11.9514C5.55663 12.0041 5.69456 12.0061 5.818 11.957L7.484 11.3C7.60731 11.2513 7.70622 11.1556 7.759 11.034L8.238 9.925L9.346 10.405C9.46781 10.4578 9.6056 10.4599 9.729 10.411L18.64 6.874C18.7633 6.8253 18.8622 6.72962 18.915 6.608L19.394 5.5L20.5 5.98C20.6223 6.03056 20.7597 6.03056 20.882 5.98L22.549 5.319C22.6723 5.27022 22.7712 5.17443 22.8239 5.05271C22.8766 4.93099 22.8788 4.79332 22.83 4.67L22.645 4.205C21.223 0.616 16.482 0.2 11.605 2.133Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.5 23.008C22.411 22.9713 21.5367 22.097 21.5 21.008C21.5 22.1126 20.6046 23.008 19.5 23.008C18.3954 23.008 17.5 22.1126 17.5 21.008C17.5 22.1126 16.6046 23.008 15.5 23.008C14.3954 23.008 13.5 22.1126 13.5 21.008C13.4633 22.097 12.589 22.9713 11.5 23.008C10.411 22.9713 9.53674 22.097 9.5 21.008C9.46326 22.097 8.58899 22.9713 7.5 23.008C6.41101 22.9713 5.53674 22.097 5.5 21.008C5.46326 22.097 4.58899 22.9713 3.5 23.008C2.41101 22.9713 1.53674 22.097 1.5 21.008C1.45654 21.6905 1.08343 22.3091 0.5 22.666"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
stories.push([
  'Icons',
  () => (
    <Wrapper>
      <Box>
        <h1>
          My H1 with an Icon <Icon icon={svg} size="auto" />
        </h1>
        <h4>
          My H4 with the same Icon <Icon icon={svg} size="auto" />
        </h4>
      </Box>
      <Box>
        <IconPrimary icon="add" size="medium" />
      </Box>
      <Box>
        <Button icon="add" />
      </Box>
      <Box>
        <Button title="Click Me" on_click={showMe}>
          <IconPrimary icon="add" size="medium" />
        </Button>
      </Box>
      <Box>
        <Button
          title="Click Me"
          on_click={showMe}
          variant="tertiary"
          icon="add"
        />
      </Box>
    </Wrapper>
  )
])

stories.push([
  'StepIndicator',
  () => (
    <Wrapper>
      <Box>
        <StepIndicator
          active_url="?d"
          data={[
            {
              title: 'Om din nye bolig',
              url: '?a'
            },
            {
              title: 'Ditt lån og egenkapital',
              url: '?b'
            },
            {
              title: 'Oppsummering',
              url: '?c',
              url_future: ''
            }
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          active_item="3"
          data={[
            {
              title: 'Om din nye bolig'
            },
            {
              title: 'Ditt lån og egenkapital'
            },
            {
              title: 'Oppsummering'
            }
          ]}
        />
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Dropdown',
  () => (
    <CustomStyle>
      <Wrapper>
        {/* <Box>
          <select name="x" id="x">
            <option value="Value 1">A 1</option>
            <option value="Value 2">B 2</option>
            <option value="Value 3">C 3</option>
            <option value="Value 3">S 4</option>
          </select>
        </Box> */}
        <Box>
          <Dropdown data={dropdownData} selected_item={0} label="Label:" />
        </Box>
        <Box>
          <Dropdown
            label="Label:"
            data={dropdownData}
            selected_item={3}
            disabled
            show_value_outside
          />
          <p className="dnb-p">
            Eros semper blandit tellus mollis primis quisque platea
            sollicitudin ipsum
          </p>
        </Box>
        <Box>
          <Dropdown
            label="Label:"
            // direction="top"
            data={dropdownDataScrollable}
            selected_item={4}
            no_scroll_animation={true}
            status="Message to the user"
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
                  Feriekonto - Kari Nordmann med et kjempelangt
                  etternavnsen
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
    </CustomStyle>
  )
])

const exampleTabsContent = {
  first: () => <H2>First</H2>,
  second: () => <Input>Focus me with next Tab key</Input>,
  third: () => (
    <p className="dnb-p">
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: () => <H2>Fourth</H2>
}
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]

const showMe = e => {
  console.log('showMe', e)
}

const dropdownData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: 'Brukskonto - Kari Nordmann'
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
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
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
    content: 'E'
  },
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
