/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ComponentBox from '../../../../shared/tags/ComponentBox'
// import { Space } from 'dnb-ui-lib/src/components'
import styled from '@emotion/styled'
import { Space } from 'dnb-ui-lib/src/components'

const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
const TestStyles = styled.div`
  /* // make sure our input gets an explicit width, because of mac/linux rendering differences */
  .dnb-input {
    &__input {
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
          caption="Spacing method #2 - `FormRow` component"
          data-dnb-test="spacing-method-2"
        >
          {/* @jsx */ `
<FormRow>
  <Input label="Input A:" />
</FormRow>
<FormRow top="medium">
  <Input label="Input B:" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing method #3 - Define the space directly"
          data-dnb-test="spacing-method-3"
        >
          {/* @jsx */ `
<FormRow>
  <Input label="Input A:" right="small" />
  <Input label="Input B:" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing with `collapse` set to false"
          hideCode
        >
          {/* @jsx */ `
<Space bottom="small" collapse={false}>
  <div>I have <code className="dnb-code">bottom="small"</code></div>
</Space>
<Space top="large">
  <div>I have <code className="dnb-code">top="large"</code></div>
</Space>
          `}
        </ComponentBox>
        <ComponentBox
          caption="All four values will result in a equivalent margin"
          data-dnb-test="spacing-margins"
          hideCode
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
        {false && IS_TEST && (
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

const Block = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  background-color: var(--color-mint-green);
`
const Line = styled.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;

  width: 0.0625rem;
  height: 100%;

  background-color: var(--color-cherry-red);
  ${'' /* border-left: 0.0625rem dotted var(--color-cherry-red); */}
`
const MarginContainer = styled.div`
  position: relative;
`
const Margin = styled.div`
  position: absolute;
  bottom: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(213, 30, 149, 0.25);
  ${'' /* border-left: 0.0625rem dotted var(--color-cherry-red); */}
`
const Label = styled.label`
  display: block;
  width: 1rem;
  margin-left: 0.25rem;
  font-size: 0.5rem;
  text-align: center;
  color: var(--color-black-80);
`

const MagicBox = ({ label, ...rest }) => {
  const ref = React.createRef()

  const [spaceInRem, setLabel] = useState(label)
  const [title, setTitle] = useState(null)

  if (!label) {
    useEffect(() => {
      const spaceInPixels = window
        .getComputedStyle(ref.current.parentElement)
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    })
  }

  return (
    <Block {...rest} ref={ref} title={title}>
      <Line style={{ height: `${spaceInRem}rem` }}></Line>
      <Label>{spaceInRem}</Label>
    </Block>
  )
}
MagicBox.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ])
}
MagicBox.defaultProps = {
  label: null
}

const VisualSpace = ({ label, children, ...rest }) => {
  const ref = React.createRef()

  const [spaceInRem, setLabel] = useState(label)
  const [title, setTitle] = useState(null)

  if (!label) {
    useEffect(() => {
      const spaceInPixels = window
        .getComputedStyle(ref.current.children[0])
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    })
  }

  return (
    <Space {...rest} title={title}>
      <MarginContainer ref={ref}>
        {children}
        <Margin style={{ height: `${spaceInRem}rem` }}>
          <Label>{spaceInRem}</Label>
        </Margin>
      </MarginContainer>
    </Space>
  )
}
VisualSpace.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  children: PropTypes.node
}
VisualSpace.defaultProps = {
  label: null,
  children: null
}

export { MagicBox, VisualSpace }
