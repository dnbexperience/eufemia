/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'

import {
  Space,
  // Checkbox,
  // Radio,
  Input,
  // FormLabel,
  // FormRow
} from '@dnb/eufemia/src/components'
import { H1, H2 } from '@dnb/eufemia/src/elements'
import Provider from '@dnb/eufemia/src/shared/Provider'
// import { spacingPropTypes, createSpacingClasses } from '@dnb/eufemia/src/components/space/SpacingHelper'

export default {
  title: 'Eufemia/Components/Space',
}

export const SpaceSandbox = () => (
  <Wrapper skipCoreStyle>
    <Global
      styles={css`
        :root {
          --spacing-modifier: 1;
          --spacing-xx-small: calc(0.25rem * var(--spacing-modifier));
          --spacing-x-small: calc(0.5rem * var(--spacing-modifier));
          --spacing-small: calc(1rem * var(--spacing-modifier));
          --spacing-medium: calc(1.5rem * var(--spacing-modifier));
          --spacing-large: calc(2rem * var(--spacing-modifier));
          --spacing-x-large: calc(3rem * var(--spacing-modifier));
          --spacing-xx-large: calc(3.5rem * var(--spacing-modifier));
        }
      `}
    />

    <code>With dnb-core-style</code>
    <div className="dnb-core-style">
      <TestCase />
    </div>

    <code>Without</code>
    <TestCase />
    <Box>
      <CustomStyle>
        <VisualSpace>
          {/* <MagicBox top="medium" /> */}
          <Space top="large x-small">
            <Input label="Input:" />
          </Space>
        </VisualSpace>
      </CustomStyle>
    </Box>
    <Box>
      <Provider
        space={{
          no_collapse: true,
        }}
      >
        <Collapsing bottom="small">
          <H1>H1</H1>
        </Collapsing>
        <Collapsing top="large">
          <H2>H2</H2>
        </Collapsing>
      </Provider>
    </Box>
    <Box>
      <Collapsing bottom="small" no_collapse={true}>
        <div>
          I have <code className="dnb-code">bottom="small"</code>
        </div>
      </Collapsing>
      <Collapsing top="large">
        <div>
          I have <code className="dnb-code">top="large"</code>
        </div>
      </Collapsing>
    </Box>
  </Wrapper>
)

const CustomStyle = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 0 1px var(--color-fire-red);

  .box {
    background-color: blue;
    height: 150px;
    width: 200px;
    color: var(--color-white);
  }
`

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

  background-color: var(--color-fire-red);
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
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
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
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

  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
      const spaceInPixels = window
        .getComputedStyle(ref.current.parentElement)
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    }
  }, [label, ref])

  return (
    <Block {...rest} ref={ref} title={title}>
      <Line style={{ height: `${spaceInRem}rem` }} />
      <Label>{spaceInRem}</Label>
    </Block>
  )
}
MagicBox.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
}
MagicBox.defaultProps = {
  label: null,
}

const VisualSpace = ({ label, children, ...rest }) => {
  const ref = React.createRef()

  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
      const spaceInPixels = window
        .getComputedStyle(ref.current.children[0])
        .getPropertyValue('margin-top')
      const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
      setLabel(spaceInRem)

      const title = ref.current.parentElement.getAttribute('class')
      setTitle(title)
    }
  }, [label, ref])

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
    PropTypes.node,
  ]),
  children: PropTypes.node,
}
VisualSpace.defaultProps = {
  label: null,
  children: null,
}

const Collapsing = styled(Space)`
  border: 1px solid;
`

function TestCase() {
  const listOfBoxes = []
  for (let i = 0, c = 0, l = 20; i <= l; i++) {
    listOfBoxes.push(String(c))
    c += 0.5
  }
  return (
    <CustomStyle>
      {listOfBoxes.map((v) => (
        <Space key={v} top={v}>
          <MagicBox />
        </Space>
      ))}
    </CustomStyle>
  )
}
