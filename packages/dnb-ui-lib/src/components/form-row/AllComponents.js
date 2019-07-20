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

const AllComponents = ({ horizontal, vertical, showText }) => {
  const params = {
    left: horizontal ? 'small' : null,
    top: !horizontal || vertical ? 'small' : null
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
      <DatePicker label="DatePicker:" {...params} />
      <Dropdown
        label="Dropdown:"
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <Checkbox label="Checkbox" {...params} />
      <Radio label="Radio" {...params} />
      <Radio.Group label="Radio Group:" {...params}>
        <Radio label="Radio A" value="a" />
        <Radio label="Radio B" value="b" />
      </Radio.Group>
      <ToggleButton label="Toggle:" text="Toggle" {...params} />
      <ToggleButton.Group label="Toggle Group:" {...params}>
        <ToggleButton text="Toggle A" value="a" />
        <ToggleButton text="Toggle B" value="b" />
      </ToggleButton.Group>
      <Switch label="Switch" {...params} />
      <Input label="Input A:" {...params} />
      <Input label="Input B:" {...params} />
      <Input label="Input C:" stretch {...params} />
      <Textarea label="Textarea A:" rows="5" {...params} />
      <Textarea label="Textarea B:" rows="5" {...params} />
      <Textarea label="Textarea C:" stretch rows="3" {...params} />
      <Slider label="Slider:" value={50} {...params} />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  showText: PropTypes.bool
}
AllComponents.defaultProps = {
  horizontal: null,
  vertical: null,
  showText: null
}

export default AllComponents
