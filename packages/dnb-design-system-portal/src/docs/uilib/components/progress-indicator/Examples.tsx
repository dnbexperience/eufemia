import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  ProgressIndicator,
  Modal,
  FormRow,
  Button,
} from '@dnb/eufemia/src/components'

export const ProgressIndicatorDefault = () => (
  <ComponentBox>
    <ProgressIndicator />
  </ComponentBox>
)

export const ProgressIndicatorCircular = () => (
  <ComponentBox>
    <ProgressIndicator type="circular" />
  </ComponentBox>
)

export const ProgressIndicatorCircularHorizontal = () => (
  <ComponentBox>
    <ProgressIndicator
      // label="Custom label ..."
      type="circular"
      show_label={true}
      label_direction="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularVertical = () => (
  <ComponentBox>
    <ProgressIndicator
      // label="Custom label ..."
      type="circular"
      show_label={true}
      label_direction="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularProgress = () => (
  <ComponentBox data-visual-test="progress-indicator-circular--primary">
    <ProgressIndicator
      type="circular"
      progress="50"
      size="large"
      no_animation
    />
  </ComponentBox>
)

export const ProgressIndicatorCircularRandom = () => (
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

export const ProgressIndicatorCircularTransition = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [progress, setProgressIndicator] = React.useState(
          random(1, 100)
        )

        React.useEffect(() => {
          const timer = setInterval(
            () => setProgressIndicator(random(1, 100)),
            1e3
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

      return <Component />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCircularCallback = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [visible, setVisible] = React.useState(true)

        React.useEffect(() => {
          const timer = setInterval(
            () => setVisible(!visible),
            random(2400, 4200)
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
      return <Component />
    }}
  </ComponentBox>
)

export const ProgressIndicatorCircularModal = () => (
  <ComponentBox>
    <Modal
      spacing={false}
      max_width="12rem"
      fullscreen={false}
      align_content="centered"
      hide_close_button
      trigger_text="Show"
      prevent_close={false}
    >
      <ProgressIndicator
        type="circular"
        show_label
        label_direction="vertical"
        top="large"
        bottom="large"
        size="large"
      />
    </Modal>
  </ComponentBox>
)

export const ProgressIndicatorLinear = () => (
  <ComponentBox>
    <ProgressIndicator type="linear" />
  </ComponentBox>
)

export const ProgressIndicatorLinearSmall = () => (
  <ComponentBox>
    <ProgressIndicator type="linear" size="small" />
  </ComponentBox>
)

export const ProgressIndicatorLinearHorizontal = () => (
  <ComponentBox>
    <ProgressIndicator
      type="linear"
      show_label={true}
      label_direction="horizontal"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearVertical = () => (
  <ComponentBox>
    <ProgressIndicator
      type="linear"
      show_label={true}
      label_direction="vertical"
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearStatic = () => (
  <ComponentBox data-visual-test="progress-indicator-linear--primary">
    <ProgressIndicator
      type="linear"
      progress="50"
      size="large"
      no_animation
    />
  </ComponentBox>
)

export const ProgressIndicatorLinearRandom = () => (
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

export const ProgressIndicatorLinearTransition = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [progress, setProgressIndicator] = React.useState(
          random(1, 100)
        )

        React.useEffect(() => {
          const timer = setInterval(
            () => setProgressIndicator(random(1, 100)),
            1e3
          )
          return () => clearInterval(timer)
        })

        return <ProgressIndicator type="linear" progress={progress} />
      }

      return <Component />
    }}
  </ComponentBox>
)

export const ProgressIndicatorLinearCallback = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min
        const [visible, setVisible] = React.useState(true)
        React.useEffect(() => {
          const timer = setInterval(
            () => setVisible(!visible),
            random(2400, 4200)
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
      return <Component />
    }}
  </ComponentBox>
)

export const ProgressIndicatorLinearModal = () => (
  <ComponentBox>
    <Modal
      spacing={false}
      max_width="12rem"
      fullscreen={false}
      align_content="centered"
      hide_close_button
      trigger_text="Show"
      prevent_close={false}
    >
      <ProgressIndicator
        type="linear"
        show_label
        label_direction="vertical"
        top="large"
        bottom="large"
      />
    </Modal>
  </ComponentBox>
)

export const ProgressIndicatorSizes = () =>
  globalThis.IS_TEST ? (
    <ComponentBox data-visual-test="progress-indicator-sizes">
      <div style={{ display: 'flex' }}>
        <ProgressIndicator progress="50" size="small" />
        <ProgressIndicator progress="50" size="medium" />
        <ProgressIndicator progress="50" />
        <ProgressIndicator progress="50" size="large" />
      </div>
    </ComponentBox>
  ) : null
