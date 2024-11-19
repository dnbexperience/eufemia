/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  ProgressIndicator,
  Button,
  FormRow,
  Dialog,
  Flex,
  IconPrimary,
  NumberFormat,
} from '@dnb/eufemia/src'

export const ProgressIndicatorDefaultExample = () => (
  <ComponentBox>
    <ProgressIndicator />
  </ComponentBox>
)

export const ProgressIndicatorCircularExample = () => (
  <ComponentBox>
    <ProgressIndicator type="circular" />
  </ComponentBox>
)

export const ProgressIndicatorCircularLabelHorizontalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      // label="Custom label ..."
      type="circular"
      showDefaultLabel={true}
      labelDirection="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularLabelVerticalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      // label="Custom label ..."
      type="circular"
      showDefaultLabel={true}
      labelDirection="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularLabelInsideExample = () => (
  <ComponentBox>
    <ProgressIndicator
      right
      label={<IconPrimary icon="save" />}
      type="circular"
      labelDirection="inside"
    />

    <ProgressIndicator
      progress={72}
      size="large"
      type="circular"
      labelDirection="inside"
      data-visual-test="progress-indicator-label-inside"
    >
      <span className="dnb-p dnb-t__weight--bold dnb-t__size--small">
        {72}%
      </span>
    </ProgressIndicator>
  </ComponentBox>
)

export const ProgressIndicatorCircularPrimaryExample = () => (
  <ComponentBox data-visual-test="progress-indicator-circular--primary">
    <ProgressIndicator
      type="circular"
      progress="50"
      size="large"
      noAnimation
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularRandomExample = () => (
  <ComponentBox>
    {() => {
      const ChangeValue = () => {
        const [value, setValue] = React.useState(50)
        return (
          <Flex.Horizontal align="center">
            <ProgressIndicator
              type="circular"
              progress={value}
              showDefaultLabel
              noAnimation
            />
            <Button
              left
              size="small"
              variant="secondary"
              onClick={() => setValue(Math.random() * 100)}
            >
              Change
            </Button>
          </Flex.Horizontal>
        )
      }

      return <ChangeValue />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCircularRandomTransitionExample = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [progress, setProgressIndicator] = React.useState(
          random(1, 100),
        )
        React.useEffect(() => {
          const timer = setInterval(
            () => setProgressIndicator(random(1, 100)),
            1e3,
          )
          return () => clearInterval(timer)
        })
        return (
          <ProgressIndicator
            type="circular"
            size="large"
            progress={progress}
          />
        )
      }
      return <Example />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCircularRandomOnCompleteExample = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [visible, setVisible] = React.useState(true)
        React.useEffect(() => {
          const timer = setInterval(
            () => setVisible(!visible),
            random(2400, 4200),
          )
          return () => clearTimeout(timer)
        })
        return (
          <ProgressIndicator
            type="circular"
            size="large"
            visible={visible}
            onComplete={() => {
              console.log('on_complete_circular')
            }}
          />
        )
      }
      return <Example />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCircularDialogExample = () => (
  <ComponentBox>
    <Dialog
      spacing={false}
      maxWidth="12rem"
      fullscreen={false}
      alignContent="centered"
      hideCloseButton
      triggerAttributes={{ text: 'Show' }}
      preventClose={false}
    >
      <ProgressIndicator
        type="circular"
        showDefaultLabel
        labelDirection="vertical"
        top="large"
        bottom="large"
        size="large"
      />
    </Dialog>
  </ComponentBox>
)

export const ProgressIndicatorLinearDefaultExample = () => (
  <ComponentBox>
    <ProgressIndicator type="linear" />
  </ComponentBox>
)

export const ProgressIndicatorLinearSmallExample = () => (
  <ComponentBox>
    <ProgressIndicator type="linear" size="small" />
  </ComponentBox>
)

export const ProgressIndicatorLinearLabelHorizontalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      type="linear"
      // label="Custom label ..."
      showDefaultLabel={true}
      labelDirection="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearLabelVerticalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      type="linear"
      // label="Custom label ..."
      showDefaultLabel={true}
      labelDirection="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearLargeExample = () => (
  <ComponentBox data-visual-test="progress-indicator-linear--primary">
    <ProgressIndicator
      type="linear"
      progress="50"
      size="large"
      noAnimation
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearRandomExample = () => (
  <ComponentBox>
    {() => {
      const ChangeValue = () => {
        const [value, setValue] = React.useState(50)
        return (
          <FormRow centered>
            <ProgressIndicator
              type="linear"
              progress={value}
              noAnimation
            />
            <Button
              left
              size="small"
              variant="secondary"
              onClick={() => setValue(Math.random() * 100)}
            >
              Change
            </Button>
          </FormRow>
        )
      }

      return <ChangeValue />
    }}
  </ComponentBox>
)

export const ProgressIndicatorLinearRandomTransitionExample = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [progress, setProgressIndicator] = React.useState(
          random(1, 100),
        )
        React.useEffect(() => {
          const timer = setInterval(
            () => setProgressIndicator(random(1, 100)),
            1e3,
          )
          return () => clearInterval(timer)
        })
        return <ProgressIndicator type="linear" progress={progress} />
      }
      return <Example />
    }}
  </ComponentBox>
)

export const ProgressIndicatorLinearRandomOnCompleteExample = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [visible, setVisible] = React.useState(true)
        React.useEffect(() => {
          const timer = setInterval(
            () => setVisible(!visible),
            random(2400, 4200),
          )
          return () => clearTimeout(timer)
        })
        return (
          <ProgressIndicator
            type="linear"
            size="large"
            visible={visible}
            onComplete={() => {
              console.log('on_complete_linear')
            }}
          />
        )
      }
      return <Example />
    }}
  </ComponentBox>
)

export const ProgressIndicatorLinearDialogExample = () => (
  <ComponentBox>
    <Dialog
      spacing={false}
      maxWidth="12rem"
      fullscreen={false}
      alignContent="centered"
      hideCloseButton
      triggerAttributes={{ text: 'Show' }}
      preventClose={false}
    >
      <ProgressIndicator
        type="linear"
        showDefaultLabel
        labelDirection="vertical"
        top="large"
        bottom="large"
      />
    </Dialog>
  </ComponentBox>
)

export const ProgressIndicatorSizesExample = () => (
  <ComponentBox data-visual-test="progress-indicator-sizes">
    <div style={{ display: 'flex' }}>
      <ProgressIndicator progress="50" size="small" />
      <ProgressIndicator progress="50" size="medium" />
      <ProgressIndicator progress="50" />
      <ProgressIndicator progress="50" size="large" />
    </div>
  </ComponentBox>
)

const StyledLabel = styled.span`
  display: grid;
  place-content: center;
`
const MyCustomLabel = ({ children, ...rest }) => (
  <StyledLabel
    className="dnb-p dnb-t__weight--medium dnb-t__size--small"
    {...rest}
  >
    {children}
  </StyledLabel>
)

export const ProgressIndicatorCountdownExample = () => (
  <ComponentBox scope={{ MyCustomLabel }}>
    {() => {
      const ChangeValue = () => {
        const max = 60
        const [current, setCurrent] = React.useState(10)

        React.useEffect(() => {
          const timer = setInterval(() => {
            setCurrent(current === 0 ? max - 1 : current - 1)
          }, 1000)
          return () => clearTimeout(timer)
        })

        return (
          <ProgressIndicator
            type="countdown"
            progress={(current / max) * 100}
            title={current + ' av ' + max}
            size="large"
            labelDirection="inside"
          >
            <MyCustomLabel aria-hidden>{current}</MyCustomLabel>
          </ProgressIndicator>
        )
      }

      return <ChangeValue />
    }}
  </ComponentBox>
)

const DarkBackground = styled.div`
  background-color: var(--color-emerald-green);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`

export const ProgressIndicatorCustomCountdown = () => (
  <ComponentBox
    hideCode
    data-visual-test="progress-indicator-custom-countdown"
    scope={{
      DarkBackground,
      MyCustomLabel,
    }}
  >
    {() => {
      const MyProgressIndicator = () => {
        const StyledText = styled.span`
          color: var(--color-white);
          font-size: var(--font-size-small);
        `

        const StyledTitle = styled.span`
          display: block;
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-medium);
        `
        const daysLeft = 20
        const daysInMonth = 31

        return (
          <DarkBackground>
            <ProgressIndicator
              type="countdown"
              progress={(daysLeft / daysInMonth) * 100}
              size="6rem"
              labelDirection="inside"
              customColors={{
                line: 'var(--color-summer-green)',
                shaft: 'transparent',
                background: 'var(--color-sea-green)',
              }}
              title={daysLeft + 'days left'}
              customCircleWidth="0.5rem"
            >
              <StyledText>
                <StyledTitle>{daysLeft} d</StyledTitle>
                left
              </StyledText>
            </ProgressIndicator>
          </DarkBackground>
        )
      }
      return <MyProgressIndicator />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCustomHorizontal = () => (
  <ComponentBox
    hideCode
    data-visual-test="progress-indicator-custom-horizontal"
    scope={{
      DarkBackground,
      MyCustomLabel,
    }}
  >
    {() => {
      const MyProgressIndicator = () => {
        const StyledText = styled.span`
          color: white;
          font-size: var(--font-size-basis);
        `
        return (
          <DarkBackground>
            <ProgressIndicator
              type="linear"
              progress={75}
              size="1rem"
              labelDirection="vertical"
              customColors={{
                line: 'var(--color-summer-green)',
                shaft: 'var(--color-sea-green)',
              }}
            >
              <StyledText>
                <NumberFormat percent value={75} /> done
              </StyledText>
            </ProgressIndicator>
          </DarkBackground>
        )
      }

      return <MyProgressIndicator />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCustomizationExample = () => (
  <ComponentBox data-visual-test="progress-indicator-customization">
    <ProgressIndicator
      type="linear"
      progress={32}
      customColors={{
        line: 'red',
        shaft: 'green',
      }}
      size="4rem"
    />
    <ProgressIndicator
      type="circular"
      progress={32}
      customColors={{
        line: 'red',
        shaft: 'green',
        background: 'blue',
      }}
      size="4rem"
    />
  </ComponentBox>
)
