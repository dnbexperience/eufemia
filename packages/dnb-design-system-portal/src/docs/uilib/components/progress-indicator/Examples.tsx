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
      show_label={true}
      label_direction="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularLabelVerticalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      // label="Custom label ..."
      type="circular"
      show_label={true}
      label_direction="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularPrimaryExample = () => (
  <ComponentBox data-visual-test="progress-indicator-circular--primary">
    <ProgressIndicator
      type="circular"
      progress="50"
      size="large"
      no_animation
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularRandomExample = () => (
  <ComponentBox>
    {() => {
      const ChangeValue = () => {
        const [value, setValue] = React.useState(50)
        return (
          <FormRow centered>
            <ProgressIndicator
              type="circular"
              progress={value}
              show_label
              no_animation
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
            on_complete={() => {
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
        show_label
        label_direction="vertical"
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
      show_label={true}
      label_direction="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearLabelVerticalExample = () => (
  <ComponentBox>
    <ProgressIndicator
      type="linear"
      // label="Custom label ..."
      show_label={true}
      label_direction="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearLargeExample = () => (
  <ComponentBox data-visual-test="progress-indicator-linear--primary">
    <ProgressIndicator
      type="linear"
      progress="50"
      size="large"
      no_animation
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
              no_animation
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
            on_complete={() => {
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
        show_label
        label_direction="vertical"
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
