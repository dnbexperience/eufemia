/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  InfoIcon,
  WarnIcon,
  ErrorIcon,
  MarketingIcon,
} from '@dnb/eufemia/src/components/form-status/FormStatus'

import {
  FormStatus,
  Icon,
  Input,
  ToggleButton,
  Link,
  Grid,
} from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'

export const FormStatusDefault = () => (
  <ComponentBox data-visual-test="form-status">
    <FormStatus text="Failure text" />
  </ComponentBox>
)

export const FormStatusWithInfo = () => (
  <ComponentBox data-visual-test="form-status-info">
    <FormStatus
      title="Hover title"
      text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
      state="info"
    />
  </ComponentBox>
)

export const FormStatusWithStretch = () => (
  <ComponentBox data-visual-test="form-status-stretch">
    <FormStatus
      stretch={true}
      text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
      state="warn"
    />
  </ComponentBox>
)

export const FormStatusWithWarn = () => (
  <ComponentBox data-visual-test="form-status-warn">
    <FormStatus state="warn" variant="outlined">
      Warningmessage. Take notice!
    </FormStatus>
  </ComponentBox>
)

export const FormStatusWithMarketing = () => (
  <ComponentBox data-visual-test="form-status-marketing">
    <FormStatus state="marketing" variant="outlined">
      Marketingmessage. What a deal!
    </FormStatus>
  </ComponentBox>
)

export const FormStatusInput = () => (
  <ComponentBox>
    <Input
      label="Input with status"
      status="You have to fill in this field"
      value="Input value"
    />
  </ComponentBox>
)

/**
 * Not used for now (may be reconsidered)
 */
export const FormStatusAnimation = () => (
  <ComponentBox>
    {() => {
      const ToggleAnimation = () => {
        const [status, setStatus] = React.useState(null)
        const toggleStatus = () => {
          setStatus((s) => (!s ? 'You have to fill in this field' : null))
        }
        return (
          <Provider formElement={{ vertical: false }}>
            <Input
              label="Input with status"
              status={status}
              value="Input value"
              right
            />
            <ToggleButton top on_change={toggleStatus}>
              Toggle
            </ToggleButton>
          </Provider>
        )
      }
      return <ToggleAnimation />
    }}
  </ComponentBox>
)

export const FormStatusCustom = () => (
  <ComponentBox data-visual-test="form-status-custom">
    {() => {
      const CustomStatus = () => (
        <>
          My info <Link href="/">with a link</Link> and more text
        </>
      )

      return (
        <Input
          label="Input with custom status"
          status={<CustomStatus />}
          status_state="info"
          value="Input value"
        />
      )
    }}
  </ComponentBox>
)

export const FormStatusLarge = () => (
  <ComponentBox>
    {() => {
      const myHTML = `
  My HTML
  <a class="dnb-anchor" href="/" target="_blank">with a link</a>
  and more text
`
      const CustomStatus = () => (
        <span dangerouslySetInnerHTML={{ __html: myHTML }} />
      )

      return (
        <FormStatus state="info" size="large" variant="outlined">
          <CustomStatus />
        </FormStatus>
      )
    }}
  </ComponentBox>
)

export const FormStatusWithIcons = ({
  theme = 'ui',
}: {
  theme: string
}) => (
  <ComponentBox
    scope={{ InfoIcon, WarnIcon, ErrorIcon, MarketingIcon, theme }}
    data-visual-test="form-status-icons"
  >
    <Icon
      icon={<InfoIcon theme={theme} />}
      size="medium"
      title="Some title"
      inherit_color={false}
      right
    />
    <Icon
      icon={WarnIcon}
      size="medium"
      title="Some title"
      inherit_color={false}
      right
    />
    <Icon
      icon={ErrorIcon}
      size="medium"
      title="Some title"
      inherit_color={false}
      right
    />
    <Icon
      icon={MarketingIcon}
      size="medium"
      title="Some title"
      inherit_color={false}
    />
  </ComponentBox>
)

export const FormStatusAllVariants = () => (
  <ComponentBox data-visual-test="form-status-all-variants">
    <Grid.Container
      columns={{ small: 2, medium: 3, large: 3 }}
      columnGap="small"
      rowGap="small"
    >
      <Grid.Container columns={1}>
        <FormStatus text="Text" state="info" variant="flat" />
        <FormStatus text="Text" state="info" variant="outlined" />
      </Grid.Container>
      <Grid.Container columns={1}>
        <FormStatus text="Text" state="success" />
        <FormStatus text="Text" state="success" variant="outlined" />
      </Grid.Container>
      <Grid.Container columns={1}>
        <FormStatus text="Text" state="warn" variant="flat" />
        <FormStatus text="Text" state="warn" variant="outlined" />
      </Grid.Container>
      <Grid.Container columns={1}>
        <FormStatus text="Text" state="error" variant="flat" />
        <FormStatus text="Text" state="error" variant="outlined" />
      </Grid.Container>
      <Grid.Container columns={1}>
        <FormStatus text="Text" state="marketing" />
        <FormStatus text="Text" state="marketing" variant="outlined" />
      </Grid.Container>
    </Grid.Container>
  </ComponentBox>
)
