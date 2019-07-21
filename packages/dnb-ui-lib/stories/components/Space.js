/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Space,
  // Checkbox,
  // Radio,
  Input
  // FormLabel,
  // FormRow
} from '../../src/components'

export default [
  'Space',
  () => (
    <Wrapper>
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
        <CustomStyle>
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
          <Space top="10" bottom="1">
            <MagicBox />
          </Space>
          {/* <Space top="large large large large large x-small">
            <MagicBox />
          </Space> */}
          {/* <Space top="medium x-large medium x-small">
            <MagicBox />
          </Space>
          <Space top="1 2">
            <MagicBox />
          </Space>
          <Space top="large x-small">
            <MagicBox />
          </Space>
          <Space top="2.5">
            <MagicBox />
          </Space>
          <Space top="2rem 0.5rem">
            <MagicBox />
          </Space>
          <Space top="32px">
            <MagicBox />
          </Space>
          <FormRow top="large x-small">
            <MagicBox />
          </FormRow> */}
        </CustomStyle>
      </Box>
    </Wrapper>
  )
]

const CustomStyle = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 0 1px var(--color-cherry-red);
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
  label: PropTypes.string
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
  label: PropTypes.string,
  children: PropTypes.node
}
VisualSpace.defaultProps = {
  label: null,
  children: null
}

export { MagicBox, VisualSpace }
