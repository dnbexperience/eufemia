/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'

// UI Components
import Input from './components/Input'
import InputMasked from './components/InputMasked'
import ButtonStory from './components/Button'
import Radio from './components/Radio'
import ToggleButton from './components/ToggleButton'
import Checkbox from './components/Checkbox'
import Switch from './components/Switch'
import DatePicker from './components/DatePicker'
import Textarea from './components/Textarea'
import Slider from './components/Slider'
import ProgressIndicator from './components/ProgressIndicator'
import StepIndicator from './components/StepIndicator'
import Modal from './components/Modal'
import FormLabelStory from './components/FormLabel'
import FormRowStory from './components/FormRow'
import FormSetStory from './components/FormSet'
import Dropdown from './components/Dropdown'
import Autocomplete from './components/Autocomplete'
import Drawer from './components/Drawer'
import Tooltip from './components/Tooltip'
import Space from './components/Space'
import Tabs from './components/Tabs'
import FormStatus from './components/FormStatus'
import GlobalStatus from './components/GlobalStatus'
import GlobalError from './components/GlobalError'
import Number from './components/Number'
import Provider from './components/Provider'
import Headings from './components/Headings'
import Icons from './components/Icons'
import Experiments from './components/Experiments'
import Pagination from './components/Pagination'
import PaginationTable from './components/PaginationTable'
import PaginationTableMarker from './components/PaginationTableMarker'
import Skeleton from './components/Skeleton'
import WebComponent from './components/WebComponent'
import Accordion from './components/Accordion'
import { Logo } from '../src/components'

const stories = []
export default stories

stories.push(ButtonStory)
stories.push(Input)
stories.push(InputMasked)
stories.push(Radio)
stories.push(ToggleButton)
stories.push(Checkbox)
stories.push(Switch)
stories.push(DatePicker)
stories.push(Textarea)
stories.push(Slider)
stories.push(ProgressIndicator)
stories.push(StepIndicator)
stories.push(Modal)
stories.push(FormLabelStory)
stories.push(FormRowStory)
stories.push(FormSetStory)
stories.push(Dropdown)
stories.push(Autocomplete)
stories.push(Drawer)
stories.push(Tooltip)
stories.push(Space)
stories.push(Tabs)
stories.push(FormStatus)
stories.push(GlobalStatus)
stories.push(GlobalError)
stories.push(Number)
stories.push(Provider)
stories.push(Headings)
stories.push(Icons)
stories.push(Experiments)
stories.push(Pagination)
stories.push(PaginationTable)
stories.push(PaginationTableMarker)
stories.push(Skeleton)
stories.push(WebComponent)
stories.push(Accordion)

stories.push([
  'Logo',
  () => (
    <Wrapper>
      <Box>
        <Logo size="80" style={{ color: 'var(--color-fire-red)' }} />
      </Box>
      <Box>
        <h1 className="dnb-h--xx-large">
          H1 with the DNB Logo <Logo size="auto" />
        </h1>
        <p className="dnb-p">
          Text with the DNB Logo <Logo />
        </p>
      </Box>
    </Wrapper>
  )
])
