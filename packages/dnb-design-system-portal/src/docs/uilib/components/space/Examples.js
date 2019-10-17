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

const TestStyles = styled.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
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
    const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
    return (
      <TestStyles>
        <ComponentBox
          caption="Spacing method #1 - `Space` component. The RedBox is only to visualize the result."
          data-dnb-test="spacing-method-space"
          scope={{ RedBox }}
        >
          {/* @jsx */ `
<RedBox>
  <Space top="large x-small">
    <Input label="Input:" />
  </Space>
</RedBox>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing method #2 - `FormRow` component"
          data-dnb-test="spacing-method-form-row"
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
          data-dnb-test="spacing-method-component"
        >
          {/* @jsx */ `
<FormRow>
  <Input label="Input A:" right="small" />
  <Input label="Input B:" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Spacing with no margin collapse, due to the flex usage"
          hideCode
          scope={{ RedBox, Vertical }}
        >
          {/* @jsx */ `
<Vertical>
  <RedBox>
    <Space bottom="small">
      <>I have <code className="dnb-code">bottom="small"</code></>
    </Space>
  </RedBox>
  <RedBox>
    <Space top="large">
      <>I have <code className="dnb-code">top="large"</code></>
    </Space>
  </RedBox>
</Vertical>
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
const Vertical = styled.div`
  display: inline-flex;
  flex-direction: column;
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

  &.bottom {
    top: 100%;
    bottom: 0;
  }

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

  const [direction, setDirection] = useState('top')
  const [spaceInRem, setLabel] = useState(label)
  const [title, setTitle] = useState(null)

  if (!label) {
    useEffect(() => {
      try {
        const style = window.getComputedStyle(ref.current.children[0])
        const top = parseFloat(style.getPropertyValue('margin-top'))
        const bottom = parseFloat(style.getPropertyValue('margin-bottom'))
        let spaceInPixels = top

        if (bottom > 0) {
          spaceInPixels = bottom
          setDirection('bottom')
        }

        const spaceInRem = `${spaceInPixels / 16}`
        setLabel(spaceInRem)

        const title = ref.current.parentElement.getAttribute('class')
        setTitle(title)
      } catch (e) {
        console.warn(e)
      }
    })
  }

  return (
    <Space {...rest} title={title}>
      <MarginContainer ref={ref}>
        {children}
        <Margin
          style={{ height: `${spaceInRem}rem` }}
          className={direction}
        >
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
