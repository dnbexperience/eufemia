/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import styled from '@emotion/styled'
import {
  // FormLabel,
  // FormRow,
  Space,
  Button,
  IconPrimary,
  DatePicker,
  Textarea,
  Autocomplete,
  Dropdown,
  Slider,
  Checkbox,
  Radio,
  ToggleButton,
  Switch,
  Input,
} from '../'

const AllComponents = ({ horizontal, vertical, showText, hideLabel }) => {
  const params = {
    left: horizontal ? 'small' : null,
    top: !horizontal || vertical ? 'small' : null,
  }
  let labels = {
    datePicker: 'DatePicker:',
    dropdown: 'Dropdown:',
    autocomplete: 'Autocomplete:',
    checkbox: 'Checkbox',
    radio: 'Radio',
    radioGroup: 'Radio Group:',
    toggleButton: 'Toggle:',
    toggleButtonGroup: 'Toggle Group:',
    switch: 'Switch',
    input: 'Input:',
    textarea: 'Textarea:',
    slider: 'Slider:',
  }
  if (hideLabel) {
    labels = Object.entries(labels).reduce((acc, [k]) => {
      acc[k] = ''
      return acc
    }, {})
  }
  return (
    <>
      {showText && (
        <>
          <Space {...params} inline>
            <p className="dnb-p">
              paragraph{' '}
              <IconPrimary
                icon="bell"
                size="medium"
                {...params}
                style={{ margin: 0 }} // since this is not a block element
              />
            </p>
          </Space>
          text
        </>
      )}
      <Button text="Button" {...params} />
      <Button icon="add" {...params} />
      <Input label={labels.input} {...params} />
      <Input label={labels.input} {...params} />
      <Dropdown
        label={labels.dropdown}
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <Autocomplete
        label={labels.autocomplete}
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <DatePicker label={labels.datePicker} {...params} />
      <IconPrimary
        icon="bell"
        size="medium"
        {...params}
        style={{ marginTop: 0 }} // since this is not a block element
      />
      <Checkbox label={labels.checkbox} {...params} />
      <Radio label={labels.radio} {...params} />
      <Radio.Group label={labels.radioGroup} {...params}>
        <Radio label={labels.radio} value="a" />
        <Radio label={labels.radio} value="b" />
      </Radio.Group>
      <ToggleButton
        label={labels.toggleButton}
        text="Toggle"
        {...params}
      />
      <ToggleButton.Group label={labels.toggleButtonGroup} {...params}>
        <ToggleButton text="Toggle A" value="a" />
        <ToggleButton text="Toggle B" value="b" />
      </ToggleButton.Group>
      <Switch label={labels.switch} {...params} />
      <Textarea label={labels.textarea} rows="5" {...params} />
      <Textarea label={labels.textarea} rows="5" {...params} />
      <Slider label={labels.slider} value={50} {...params} />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  showText: PropTypes.bool,
  hideLabel: PropTypes.bool,
}
AllComponents.defaultProps = {
  horizontal: null,
  vertical: null,
  showText: null,
  hideLabel: null,
}

export default AllComponents
