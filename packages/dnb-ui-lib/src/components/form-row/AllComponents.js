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
  Dropdown,
  Slider,
  Checkbox,
  Radio,
  ToggleButton,
  Switch,
  Input
} from '../'

// const IS_TEST = typeof window !== 'undefined' && window.IS_TEST

const AllComponents = ({ horizontal, showText }) => {
  const params = {
    left: horizontal ? 'small' : null,
    top: !horizontal ? 'small' : null
  }
  return (
    <>
      {showText && (
        <>
          text
          <Space {...params}>
            <p className="dnb-p">paragraph</p>
          </Space>
        </>
      )}
      <Button text="Button" {...params} />
      <IconPrimary icon="bell" size="medium" {...params} />
      <Input label="Input label A:" stretch {...params} />
      <Input label="Input label B:" {...params} />
      <DatePicker label="DatePicker:" {...params} />
      <Dropdown
        label="Dropdown:"
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <Slider label="Slider:" value={50} {...params} />
      <Textarea label="Textarea:" rows="10" {...params} />
      <Textarea label="Textarea:" stretch rows="5" {...params} />
      <ToggleButton label="Toggle:" text="Toggle" {...params} />
      <Checkbox label="Checkbox" {...params} />
      <Radio label="Radio" {...params} />
      <Switch label="Switch" {...params} />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool,
  showText: PropTypes.bool
}
AllComponents.defaultProps = {
  horizontal: null,
  showText: null
}

export default AllComponents
