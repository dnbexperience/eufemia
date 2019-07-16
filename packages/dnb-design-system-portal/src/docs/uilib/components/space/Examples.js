/**
 * UI lib Component Example
 *
 */

import React, {
  PureComponent
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

const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
const TestStyles = styled.div`
  /* // make sure our input gets an explicit width, because of mac/linux rendering differences */
  .dnb-input {
    &__inner {
      width: 8rem;
    }
  }
  [data-dnb-test='spacing-margins'] {
    display: flex;
  }
`

class Example extends PureComponent {
  render() {
    return (
      <TestStyles>
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
          caption="All four values will result in a equivalent margin"
          data-dnb-test="spacing-margins"
        >
          {/* @jsx */ `
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" >
  <details>
    <summary>
      I have four <code className="dnb-code">2.5rem</code> margins!
    </summary>
    And this are my CSS classes: <code className="dnb-code">dnb-space dnb-space__top--large dnb-space__top--x-small dnb-space__right--large dnb-space__right--x-small dnb-space__bottom--large dnb-space__bottom--x-small dnb-space__left--large dnb-space__left--x-small</code>
  </details>
</Space>
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
          caption="Spacing method #3 - `FormRow` component"
          data-dnb-test="spacing-method-1"
        >
          {/* @jsx */ `
<FormRow direction="vertical">
  <Input label="Input:" />
  <Input label="Input:" top="medium" />
</FormRow>
          `}
        </ComponentBox>
        {!IS_TEST && (
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
        )}
      </TestStyles>
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
