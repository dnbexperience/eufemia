/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  ProgressIndicator,
  Button,
  FormRow,
  Dialog,
  Flex,
  IconPrimary,
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
      <span className="dnb-p dnb-p--bold dnb-p__size--small">{72}%</span>
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

const MyCustomLabel = ({ children }) => (
  <Flex.Vertical align="center" spacing={false}>
    <span className="dnb-p dnb-p--bold dnb-p__size--xx-large">
      {children} d
    </span>
    igjen
  </Flex.Vertical>
)

export const ProgressIndicatorCountdownExample = () => (
  <ComponentBox scope={{ MyCustomLabel }}>
    {() => {
      const ChangeValue = () => {
        const maxDays = 31
        const [days, setDays] = React.useState(10)

        React.useEffect(() => {
          const timer = setInterval(() => {
            setDays(days === 0 ? maxDays : days - 1)
          }, 1000)
          return () => clearTimeout(timer)
        })
        return (
          <ProgressIndicator
            type="countdown"
            progress={(days / maxDays) * 100}
            title={days + ' av ' + maxDays}
            size="huge"
            labelDirection="inside"
          >
            <MyCustomLabel>{days}</MyCustomLabel>
          </ProgressIndicator>
        )
      }

      return <ChangeValue />
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
