/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ComponentBox from '../../../../shared/tags/ComponentBox'
// import { Space } from 'dnb-ui-lib/src/components'
import styled from '@emotion/styled'
import { Space } from 'dnb-ui-lib/src/components'

export const SpaceExamplesMethod1 = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-method-space"
      scope={{ RedBox }}
    >
      {
        /* @jsx */ `
<RedBox>
  <Space top="large x-small">
    <Input label="Input:" />
  </Space>
</RedBox>
          `
      }
    </ComponentBox>
  </TestStyles>
)

export const SpaceExamplesMethod2 = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-method-form-row">
      {
        /* @jsx */ `
<FormRow>
  <Input label="Input A:" />
</FormRow>
<FormRow top="medium">
  <Input label="Input B:" />
</FormRow>
          `
      }
    </ComponentBox>
  </TestStyles>
)

export const SpaceExamplesMethod3 = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-method-component">
      {
        /* @jsx */ `
<FormRow>
  <Input label="Input A:" right="small" />
  <Input label="Input B:" />
</FormRow>
          `
      }
    </ComponentBox>
  </TestStyles>
)

export const SpaceExampleMarginCollapse = () => (
  <TestStyles>
    <ComponentBox hideCode scope={{ RedBox, Vertical }}>
      {
        /* @jsx */ `
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
          `
      }
    </ComponentBox>
  </TestStyles>
)

export const SpaceExampleMargins = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-margins" hideCode>
      {
        /* @jsx */ `
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" >
  <details>
    <summary>
      I have four <code className="dnb-code">2.5rem</code> margins!
    </summary>
    And this are my CSS classes: <code className="dnb-code">dnb-space dnb-space__top--large dnb-space__top--x-small dnb-space__right--large dnb-space__right--x-small dnb-space__bottom--large dnb-space__bottom--x-small dnb-space__left--large dnb-space__left--x-small</code>
  </details>
</Space>
          `
      }
    </ComponentBox>
  </TestStyles>
)

export const SpaceVisualTestPatterns = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-patterns"
      scope={{ MagicBox, CustomStyle }}
      hideCode
      useRender
    >
      {
        /* @jsx */ `
const listOfBoxes = []
for (let i = 0, c = 0, l = 20; i <= l; i++) {
  listOfBoxes.push(String(c))
  c += 0.5
}
const TestCase = (props) => {
  return <CustomStyle {...props}>{listOfBoxes.map((v) => (
    <Space key={v} top={v}>
      <MagicBox />
    </Space>
  ))}</CustomStyle>
}
render(
  <div className="spacing-patterns">
    <P bottom small>With <Code>dnb-core-style</Code></P>
    <TestCase className="dnb-core-style" />
    
    <P top bottom small>Without</P>
    <TestCase />
  </div>
)
        `
      }
    </ComponentBox>
  </TestStyles>
)

/**
 * This test case exists because of the reset.css margin=0 for buttons
 */
export const SpaceVisualTestElements = () =>
  !(typeof window !== 'undefined' && window.IS_TEST) ? null : (
    <TestStyles>
      <ComponentBox
        data-visual-test="spacing-elements"
        scope={{ MagicBox, CustomStyle }}
        hideCode
        useRender
      >
        {
          /* @jsx */ `
const listOfBoxes = []
for (let i = 0, c = 0, l = 10; i <= l; i++) {
  listOfBoxes.push(String(c))
  c += 1
}
const TestCase = (props) => {
  return <CustomStyle {...props}>{listOfBoxes.map((v) => (
    <Button key={v} left="x-small" top={v} size="small">
      <MagicBox>B</MagicBox>
    </Button>
  ))}</CustomStyle>
}
render(
  <div className="spacing-elements">
    <P bottom small>With <Code>dnb-core-style</Code></P>
    <TestCase className="dnb-core-style" />
    
    <P top bottom small>Without</P>
    <TestCase />
  </div>
)
        `
        }
      </ComponentBox>
    </TestStyles>
  )

const TestStyles = styled.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
  .dnb-input {
    &__input {
      width: 8rem;
    }
  }
  [data-visual-test='spacing-margins'] {
    display: flex;
  }
`

const CustomStyle = styled.div`
  display: flex;
  width: auto;
  box-shadow: 0 0 0 1px var(--color-fire-red);
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

  background-color: var(--color-fire-red);
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
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
  ${'' /* border-left: 0.0625rem dotted var(--color-fire-red); */}
`
const Label = styled.label`
  display: block;
  width: 1rem;
  margin-left: 0.25rem;
  font-size: calc(var(--font-size-basis) - 0.5rem);
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
    PropTypes.node
  ])
}
MagicBox.defaultProps = {
  label: null
}

const VisualSpace = ({ label, children, ...rest }) => {
  const ref = React.createRef()

  const [direction, setDirection] = React.useState('top')
  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
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
    }
  }, [label, ref])

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
