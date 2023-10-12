/**
 * UI lib Component Example
 *
 */

import React, { Suspense } from 'react'
import { createBrowserHistory } from 'history'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Context from '@dnb/eufemia/src/shared/Context'
import {
  Input,
  H2,
  P,
  Button,
  Skeleton,
  ToggleButton,
  FormRow,
  Div,
} from '@dnb/eufemia/src'
import { AllComponents } from '../../layout/form-row/Examples'
import Provider from '@dnb/eufemia/src/shared/Provider'
import { Article } from '@dnb/eufemia/src/components/skeleton/figures'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'

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

export const SkeletonVisibleWhenVisualTests = () => {
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

export const SkeletonInfoProvider = () => (
  <ComponentBox hidePreview>
    <Div id="your-app">
      <Skeleton show={true}>
        <Input>I'm hidden behind the skeleton</Input>
        <Input>I'm hidden behind the skeleton</Input>
      </Skeleton>
    </Div>
  </ComponentBox>
)

export const SkeletonInfoGlobalProvider = () => (
  <ComponentBox scope={{ Provider }} hidePreview>
    <Provider locale="nb-NO">
      <Div id="your-app">
        <Provider skeleton={true}>
          <Input>I'm hidden behind the skeleton</Input>
          <Input>I'm hidden behind the skeleton</Input>
        </Provider>
      </Div>
    </Provider>
  </ComponentBox>
)

export const SkeletonInfoExclude = () => (
  <ComponentBox hidePreview>
    <Skeleton show={true}>
      <Input>I'm hidden behind the skeleton</Input>

      <Skeleton.Exclude>
        <Input>I'm NOT hidden</Input>
      </Skeleton.Exclude>
    </Skeleton>
  </ComponentBox>
)

export const SkeletonInfoSuspense = () => (
  <ComponentBox scope={{ Suspense }} hidePreview hideToolbar>
    <Suspense
      fallback={
        <Skeleton show={true}>
          <Div id="user-data" />
        </Skeleton>
      }
    >
      <Div id="user-data" />
    </Suspense>
  </ComponentBox>
)

export const SkeletonInfoCustom = () => (
  <ComponentBox
    hidePreview
    hideToolbar
    scope={{
      createBrowserHistory,
      skeletonDOMAttributes,
      createSkeletonClass,
      Context,
    }}
  >
    {() => {
      function Component({ skeleton = false, ...params } = {}) {
        const context = React.useContext(Context)

        // Handle accessibility features
        skeletonDOMAttributes(params, skeleton, context)

        // Handle CSS classes – use either "shape" or "font"
        const className = createSkeletonClass('font', skeleton, context)

        return (
          <div {...params} id="my-component" className={className}>
            Hello World
          </div>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)
