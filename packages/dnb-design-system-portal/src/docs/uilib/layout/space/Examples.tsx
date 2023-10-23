/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Space, Input, Button, P, Code } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import classnames from 'classnames'
import { createSpacingClasses } from '@dnb/eufemia/src/components/space/SpacingHelper'

export const SpaceExamplesMethod1 = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-method-space"
      scope={{ RedBox }}
    >
      <RedBox>
        <Space top="large x-small">
          <Input label="Input:" />
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>
)

export const SpaceExamplesMethod2 = () => (
  <TestStyles>
    <ComponentBox
      scope={{ RedBox, createSpacingClasses, classnames }}
      data-visual-test="spacing-method-form-row"
    >
      {() => {
        const Component = ({ className = null, ...props }) => {
          const spacingClasses = createSpacingClasses(props)

          const cn = classnames('my-comoponent', spacingClasses, className)

          return <div className={cn} {...props} />
        }

        return (
          <RedBox>
            <Component top="small medium large">Space A</Component>
            <Component top>Space B</Component>
          </RedBox>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

export const SpaceExamplesMethod3 = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-method-component">
      <Input label="Input A:" right="small" />
      <Input label="Input B:" />
    </ComponentBox>
  </TestStyles>
)

export const SpaceExampleMarginCollapse = () => (
  <TestStyles>
    <ComponentBox hideCode scope={{ RedBox, Vertical }}>
      <Vertical>
        <RedBox>
          <Space bottom="small">
            <>
              I have <code className="dnb-code">bottom="small"</code>
            </>
          </Space>
        </RedBox>
        <RedBox>
          <Space top="large">
            <>
              I have <code className="dnb-code">top="large"</code>
            </>
          </Space>
        </RedBox>
      </Vertical>
    </ComponentBox>
  </TestStyles>
)

export const SpaceExampleMargins = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-margins" hideCode>
      <Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">
        <details>
          <summary>
            I have four <code className="dnb-code">2.5rem</code> margins!
          </summary>
          And this are my CSS classes:{' '}
          <code className="dnb-code">
            dnb-space dnb-space__top--large dnb-space__top--x-small
            dnb-space__right--large dnb-space__right--x-small
            dnb-space__bottom--large dnb-space__bottom--x-small
            dnb-space__left--large dnb-space__left--x-small
          </code>
        </details>
      </Space>
    </ComponentBox>
  </TestStyles>
)

export const SpaceVisibleWhenVisualTestPatterns = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-patterns"
      scope={{ MagicBox, CustomStyle }}
      hideCode
    >
      {() => {
        const TestCase = (props) => {
          return (
            <CustomStyle {...props}>
              {listOfBoxes.map((v) => (
                <Space key={v} top={v}>
                  <MagicBox />
                </Space>
              ))}
            </CustomStyle>
          )
        }
        const listOfBoxes = []
        for (let i = 0, c = 0, l = 20; i <= l; i++) {
          listOfBoxes.push(String(c))
          c += 0.5
        }
        return (
          <div className="spacing-patterns">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

/**
 * This test case exists because of the reset.css margin=0 for buttons
 */
export const SpaceVisibleWhenVisualTestElements = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-elements"
      scope={{ MagicBox, CustomStyle }}
      hideCode
    >
      {() => {
        const listOfBoxes = []
        for (let i = 0, c = 0, l = 10; i <= l; i++) {
          listOfBoxes.push(String(c))
          c += 1
        }
        const TestCase = (props) => {
          return (
            <CustomStyle {...props}>
              {listOfBoxes.map((v) => (
                <Button
                  key={v}
                  left="x-small"
                  top={v}
                  size="small"
                  custom_content={<MagicBox />}
                />
              ))}
            </CustomStyle>
          )
        }
        return (
          <div className="spacing-elements">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

export const SpaceVisibleWhenVisualTestReset = () => (
  <ComponentBox data-visual-test="spacing-reset">
    {() => {
      const BlueBox = styled.div`
        display: inline-block;
        padding: 0.5rem;
        background: blue;
        ul {
          background: white;
        }
      `
      return (
        <BlueBox>
          <ul className="dnb-space__reset dnb-space__top--small dnb-space__right--small dnb-space__bottom--small dnb-space__left--small">
            <li> </li>
          </ul>
        </BlueBox>
      )
    }}
  </ComponentBox>
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
  children: PropTypes.node,
}
RedBox.defaultProps = {
  children: null,
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

const MagicBox = ({ label = null, ...rest }) => {
  const ref = React.createRef<HTMLDivElement>()

  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    let _isMounted = true
    const init = () => {
      if (_isMounted) {
        try {
          if (!label) {
            const spaceInPixels = window
              .getComputedStyle(ref.current.parentElement)
              .getPropertyValue('margin-top')
            const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
            setLabel(spaceInRem)

            const title = ref.current.parentElement.getAttribute('class')
            setTitle(title)
          }
        } catch (e) {
          console.warn(e)
        }
      }
    }

    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }

    return () => {
      _isMounted = false
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', init)
      }
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

const VisualSpace = ({ label = null, children, ...rest }) => {
  const ref = React.createRef<HTMLDivElement>()

  const [direction, setDirection] = React.useState('top')
  const [spaceInRem, setLabel] = React.useState(label)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (!label) {
      let _isMounted = true
      const init = () => {
        if (_isMounted) {
          try {
            const elem = ref.current
            const style = window.getComputedStyle(elem.children[0])
            const top = parseFloat(style.getPropertyValue('margin-top'))
            const bottom = parseFloat(
              style.getPropertyValue('margin-bottom'),
            )
            let spaceInPixels = top

            if (bottom > 0) {
              spaceInPixels = bottom
              setDirection('bottom')
            }

            const spaceInRem = `${spaceInPixels / 16}`
            setLabel(spaceInRem)

            const title = elem.parentElement.getAttribute('class')
            setTitle(title)
          } catch (e) {
            console.warn(e)
          }
        }
      }

      if (document.readyState === 'complete') {
        init()
      } else if (typeof window !== 'undefined') {
        window.addEventListener('load', init)
      }

      return () => {
        _isMounted = false
        if (typeof window !== 'undefined') {
          window.removeEventListener('load', init)
        }
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
    PropTypes.node,
  ]),
  children: PropTypes.node,
}
VisualSpace.defaultProps = {
  label: null,
  children: null,
}

export { MagicBox, VisualSpace }

export const SpaceExamplesSameResult1 = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* All of these methods will result in the same spacing */}
    <Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
  </ComponentBox>
)

export const SpaceExamplesSameResult2 = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* All of these methods will result in the same spacing */}
    <Space
      space={{
        top: 'large x-small',
        right: '2.5',
        bottom: '2.5rem',
        left: '40px',
      }}
    />
  </ComponentBox>
)

export const SpaceExamplesComponents = () => (
  <ComponentBox hidePreview hideToolbar>
    <Button top="large x-small medium" />
    <Button space={{ top: 'large x-small medium' }} />
  </ComponentBox>
)

export const SpaceExamplesShorthand = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* Equivalent to top="small" */}
    <Button top />
    {/* Equivalent to top="small" right="small" bottom="small" left="small" */}
    <Button space />
  </ComponentBox>
)

export const SpaceExamplesFourDirections = () => (
  <ComponentBox hidePreview hideToolbar>
    <Button space="large x-small medium" />
  </ComponentBox>
)

export const SpaceExampleProvider = () => (
  <ComponentBox hidePreview>
    <Provider space={{ no_collapse: true }}>
      <Space>I do not collapse</Space>
      <Space>I do not collapse</Space>
    </Provider>
  </ComponentBox>
)
