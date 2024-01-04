/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Space, Input, Button, P, Code } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import classnames from 'classnames'
import {
  createSpacingClasses,
  createSpacingProperties,
  removeSpaceProps,
} from '@dnb/eufemia/src/components/space/SpacingHelper'
import { Theme } from '@emotion/react'

export const Method1 = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-method-space"
      scope={{ RedBox }}
    >
      <RedBox>
        <Space top="large x-small">
          <Input label="Input" />
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>
)

export const Method2 = () => (
  <TestStyles>
    <ComponentBox data-visual-test="spacing-method-component">
      <Input label="Input A" right="small" />
      <Input label="Input B" />
    </ComponentBox>
  </TestStyles>
)

export const Method3 = () => (
  <TestStyles>
    <ComponentBox
      scope={{
        RedBox,
        createSpacingClasses,
        createSpacingProperties,
        removeSpaceProps,
        classnames,
      }}
      data-visual-test="spacing-method-form-row"
    >
      {() => {
        const Component = ({
          className = null,
          style = null,
          ...props
        }) => {
          const spacingClasses = createSpacingClasses(props)
          const spacingProperties = createSpacingProperties(props)

          const cn = classnames(
            'my-component',
            'dnb-space',
            spacingClasses,
            className,
          )
          const st = { ...style, ...spacingProperties }

          return (
            <div className={cn} style={st} {...removeSpaceProps(props)} />
          )
        }

        return (
          <>
            <RedBox>
              <Component top="small medium large">Space A</Component>
            </RedBox>
            <RedBox>
              <Component top>Space B</Component>
            </RedBox>
            <RedBox>
              <Component innerSpace="large">Inner Space</Component>
            </RedBox>
            <RedBox>
              <Component innerSpace={{ large: true }}>
                Has space when breakpoint is large
              </Component>
            </RedBox>
          </>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

export const InnerSpace = () => (
  <TestStyles>
    <ComponentBox data-visual-test="inner-spacing" scope={{ RedBox }}>
      <RedBox>
        <Space
          innerSpace={{
            small: 'large x-small',
            medium: true,
            large: {
              top: '2rem',
              left: '16px',
              bottom: 'large',
              right: '5rem',
            },
          }}
        >
          <P>Content</P>
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>
)

export const MarginCollapse = () => (
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

export const Margins = () => (
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

const RedBox = ({ children, ...props }) => {
  return (
    <CustomStyle>
      <VisualSpace {...props}>{children}</VisualSpace>
    </CustomStyle>
  )
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
const RelativeContainer = styled.div`
  position: relative;
`

declare module '@emotion/react' {
  export interface Theme {
    unit?: string
  }
}

const Margin = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.theme.unit === 'padding'
      ? 'rgba(30, 112, 213, 0.25)'
      : 'rgba(213, 30, 149, 0.25)'};
`
const VisualSpaceTop = styled(Margin)`
  top: ${(props) => (props.theme.unit === 'padding' ? 0 : 'auto')};
  bottom: 100%;
`
const VisualSpaceBottom = styled(Margin)`
  top: ${(props) => (props.theme.unit === 'padding' ? 'auto' : '100%')};
  bottom: 0;
`
const VisualSpaceLeft = styled(Margin)`
  left: auto;
  right: auto;
`
const VisualSpaceRight = styled(Margin)`
  left: auto;
  right: 0;
`

const Label = styled.label`
  display: block;
  width: 1rem;
  margin-left: 0.25rem;
  font-size: calc(var(--font-size-basis) - 0.5rem);
  text-align: center;
  color: var(--color-black-80);
`

const MagicBox = (props) => {
  const ref = React.createRef<HTMLDivElement>()

  const [spaceInRem, setValue] = React.useState('')
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    const elem = ref.current
    const run = () => {
      try {
        const spaceInPixels = window
          .getComputedStyle(elem.parentElement)
          .getPropertyValue('margin-top')
        const spaceInRem = `${parseFloat(spaceInPixels) / 16}`
        setValue(spaceInRem)

        const title = elem.parentElement.getAttribute('class')
        setTitle(title)
      } catch (e) {
        console.warn(e)
      }
    }

    if (document.readyState === 'complete') {
      run()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', run)
    }

    return () => {
      window.removeEventListener('load', run)
    }
  }, [])

  return (
    <Block {...props} ref={ref} title={title}>
      <Line style={{ height: `${spaceInRem}rem` }} />
      <Label>{spaceInRem}</Label>
    </Block>
  )
}

const VisualSpace = ({ children, ...rest }) => {
  const ref = React.createRef<HTMLDivElement>()
  const initValue = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
  const [margin, setMargin] = React.useState(initValue)
  const [padding, setPadding] = React.useState(initValue)
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    const elem = ref.current
    const run = () => {
      try {
        const margin = { ...initValue }
        const padding = { ...initValue }
        const style = window.getComputedStyle(elem.children[0])

        Object.keys(initValue).forEach((key) => {
          margin[key] =
            parseFloat(style.getPropertyValue(`margin-${key}`)) / 16
          padding[key] =
            parseFloat(style.getPropertyValue(`padding-${key}`)) / 16
        })

        setMargin(margin)
        setPadding(padding)

        const title = elem.parentElement.getAttribute('class')
        setTitle(title)
      } catch (e) {
        console.warn(e)
      }
    }

    if (document.readyState === 'complete') {
      run()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', run)
    }

    let timeout: NodeJS.Timeout
    const onResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(run, 10)
    }

    window.addEventListener('resize', onResize)

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', run)
        window.removeEventListener('resize', onResize)
      }
    }
  }, [])

  const makeVisualHelper = ({ space, unit }) =>
    Object.keys(initValue).map((key) => {
      const theme = { unit } as Theme

      let Comp = null
      switch (key) {
        case 'top':
          Comp = VisualSpaceTop
          break
        case 'right':
          Comp = VisualSpaceRight
          break
        case 'bottom':
          Comp = VisualSpaceBottom
          break
        case 'left':
          Comp = VisualSpaceLeft
          break
      }

      const name = key === 'top' || key === 'bottom' ? 'height' : 'width'

      return (
        <Comp
          key={key}
          theme={theme}
          style={{
            [name]: `${space[key]}rem`,
          }}
        >
          <Label>{space[key] || ''}</Label>
        </Comp>
      )
    })

  return (
    <Space {...rest} title={title}>
      <RelativeContainer ref={ref}>
        {children}
        {makeVisualHelper({ space: margin, unit: 'margin' })}
        {makeVisualHelper({ space: padding, unit: 'padding' })}
      </RelativeContainer>
    </Space>
  )
}

export { MagicBox, VisualSpace }

export const SameResult1 = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* All of these methods will result in the same spacing */}
    <Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
  </ComponentBox>
)

export const SameResult2 = () => (
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

export const Components = () => (
  <ComponentBox hidePreview hideToolbar>
    <Button top="large x-small medium" />
    <Button space={{ top: 'large x-small medium' }} />
  </ComponentBox>
)

export const Shorthand = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* Equivalent to top="small" */}
    <Button top />
    {/* Equivalent to top="small" right="small" bottom="small" left="small" */}
    <Button space />
  </ComponentBox>
)

export const FourDirections = () => (
  <ComponentBox hidePreview hideToolbar>
    <Button space="large x-small medium" />
  </ComponentBox>
)

export const ProviderExample = () => (
  <ComponentBox hidePreview>
    <Provider space={{ no_collapse: true }}>
      <Space>I do not collapse</Space>
      <Space>I do not collapse</Space>
    </Provider>
  </ComponentBox>
)
