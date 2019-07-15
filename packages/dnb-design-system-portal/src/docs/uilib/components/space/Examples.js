/**
 * UI lib Component Example
 *
 */

import React, {
  PureComponent,
  Fragment
  // , useEffect, useState
} from 'react'
import PropTypes from 'prop-types'
import ComponentBox from '../../../../shared/tags/ComponentBox'
// import { Space } from 'dnb-ui-lib/src/components'
import styled from '@emotion/styled'
import {
  MagicBox,
  VisualSpace
} from '../../../../../../dnb-ui-lib/stories/components/Space'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Spacing method #1 - `Space` component"
          data-dnb-test="spacing-method-1"
          scope={{ VisualSpace, RedBox }}
        >
          {/* @jsx */ `
{/* The RedBox is only to visualize */}
<RedBox>
  <Space top="large x-small">
    <Input label="Input:" />
  </Space>
</RedBox>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing method #2 - `FormRow` component"
          data-dnb-test="spacing-method-1"
        >
          {/* @jsx */ `
<FormRow>
  <Input label="Input:" />
</FormRow>
<FormRow top="medium">
  <Input label="Input:" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing method #2 - `FormRow` component"
          data-dnb-test="spacing-method-1"
        >
          {/* @jsx */ `
<Input label="Input:" />
<Input top="medium" label="Input:" />
          `}
        </ComponentBox>
        <ComponentBox
          caption="All spacing patterns listed (screenshot tests)"
          data-dnb-test="spacing-patterns"
          scope={{ MagicBox, CustomStyle }}
          hideCode
        >
          {/* @jsx */ `
<CustomStyle className="spacing-patterns">
  <Space top="0.5">
    <MagicBox />
  </Space>
  <Space top="1">
    <MagicBox />
  </Space>
  <Space top="1.5">
    <MagicBox />
  </Space>
  <Space top="2">
    <MagicBox />
  </Space>
  <Space top="2.5">
    <MagicBox />
  </Space>
  <Space top="3">
    <MagicBox />
  </Space>
  <Space top="3.5">
    <MagicBox />
  </Space>
  <Space top="4">
    <MagicBox />
  </Space>
  <Space top="4.5">
    <MagicBox />
  </Space>
  <Space top="5">
    <MagicBox />
  </Space>
  <Space top="5.5">
    <MagicBox />
  </Space>
  <Space top="6">
    <MagicBox />
  </Space>
  <Space top="6.5">
    <MagicBox />
  </Space>
  <Space top="7">
    <MagicBox />
  </Space>
  <Space top="7.5">
    <MagicBox />
  </Space>
  <Space top="8">
    <MagicBox />
  </Space>
  <Space top="8.5">
    <MagicBox />
  </Space>
  <Space top="9">
    <MagicBox />
  </Space>
  <Space top="9.5">
    <MagicBox />
  </Space>
  <Space top="10">
    <MagicBox />
  </Space>
</CustomStyle>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />

const CustomStyle = styled.div`
  display: inline-flex;
  width: auto;
  box-shadow: 0 0 0 1px var(--color-cherry-red);
  .dnb-input__input {
    width: 10rem;
  }
`

const RedBox = ({ children }) => {
  return (
    <CustomStyle>
      <VisualSpace>{children}</VisualSpace>
    </CustomStyle>
  )
}
RedBox.propTypes = {
  children: PropTypes.node
}
RedBox.defaultProps = {
  children: null
}
