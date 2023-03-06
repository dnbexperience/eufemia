/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Input,
  H2,
  P,
  Button,
  Skeleton,
  ToggleButton,
  FormRow,
} from '@dnb/eufemia/src'
import { AllComponents } from '../form-row/Examples'
import Provider from '@dnb/eufemia/src/shared/Provider'
import { Article } from '@dnb/eufemia/src/components/skeleton/figures'

export const SkeletonInputExample = () => (
  <ComponentBox>
    <Input label="Input" skeleton />
  </ComponentBox>
)

export const SkeletonToggleExample = () => (
  <ComponentBox data-visual-test="skeleton-exclude">
    {() => {
      const UserData = () => {
        const [state, setState] = React.useState(true)
        return (
          <Skeleton show={state}>
            <H2 top bottom>
              Heading
            </H2>
            <P top bottom>
              Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
            </P>
            <Input label_direction="vertical" label="Input" />
            <Skeleton.Exclude>
              <ToggleButton
                checked={state}
                on_change={({ checked }) => setState(checked)}
                top="large"
              >
                Toggle
              </ToggleButton>
            </Skeleton.Exclude>
          </Skeleton>
        )
      }

      return <UserData />
    }}
  </ComponentBox>
)

export const SkeletonWrapperExample = () => (
  <ComponentBox>
    <Skeleton show>
      <H2 top bottom>
        Heading
      </H2>
      <P top bottom>
        Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
      </P>
      <Button>Button</Button>
    </Skeleton>
  </ComponentBox>
)

export const SkeletonEufemiaProviderExample = () => (
  <ComponentBox scope={{ Provider }}>
    <Provider skeleton={true}>
      <H2 top bottom>
        Heading
      </H2>
      <P top bottom>
        Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
      </P>
      <Button>Button</Button>
    </Provider>
  </ComponentBox>
)

export const SkeletonFiguresExample = () => (
  <ComponentBox
    scope={{ Article }}
    data-visual-test="skeleton-figure-article"
  >
    <Skeleton show figure={<Article rows={5} />}>
      hidden content
    </Skeleton>
  </ComponentBox>
)

export const SkeletonVisualTests = () => {
  if (!globalThis.IS_TEST) {
    return <></>
  }
  return (
    <>
      <ComponentBox
        data-visual-test="skeleton-all-horizontal"
        scope={{ AllComponents }}
      >
        <FormRow>
          <Skeleton show no_animation>
            <AllComponents />
          </Skeleton>
        </FormRow>
      </ComponentBox>
      <ComponentBox
        data-visual-test="skeleton-all-vertical"
        scope={{ AllComponents }}
      >
        <FormRow vertical={true}>
          <Skeleton show no_animation>
            <AllComponents />
          </Skeleton>
        </FormRow>
      </ComponentBox>
    </>
  )
}
