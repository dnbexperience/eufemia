/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'
import { createBrowserHistory } from 'history'
import { StepIndicator, Button, Space } from '@dnb/eufemia/src/components'
import { Code } from '@dnb/eufemia/src/elements'
import { Provider } from '@dnb/eufemia/src/shared'

export default {
  title: 'Eufemia/Components/StepIndicator',
}

export function RenderDuringSSR() {
  const [count, increment] = React.useState(0)

  const data = [
    {
      title: 'Velg mottaker ' + count,
    },
    {
      title: 'Bestill eller erstatt ' + count,
      on_click: ({ current_step }) =>
        console.log('current_step:', current_step),
      status:
        'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
    },
    {
      title: 'Oppsummering ' + count,
    },
  ]

  return (
    <>
      <Provider StepIndicator={{ data }}>
        <StepIndicator.Sidebar
          // showInitialData
          // top
          id="sidebar"
          sidebar_id="unique-id-strict"
          // data={data}
          // mode="loose"
          // current_step={2}
        />
        <StepIndicator
          // skeleton
          id="main"
          sidebar_id="unique-id-strict"
          // mode="strict"
          mode="loose"
          data={data}
          // current_step={0}
          current_step={1}
          on_change={({ current_step }) => {
            console.log('on_change', current_step)
          }}
        />
      </Provider>
      <Button
        top
        on_click={() => {
          increment((c) => c + 1)
        }}
        text="increment"
      />
    </>
  )
}

const data = [
  {
    // title: 'First',
    title: <>Bestill eller erstatt</>,
    // 'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentItem }) => console.log('on_click', currentItem),
    status:
      'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
    // status_state: 'warn',
    // on_click: ({ currentItem }) => console.log('on_click', currentItem),
    // on_render: ({ StepItem }) => (
    //   <StepItem
    //     onClick={e => {
    //       console.log('on_render.onClick', e)
    //     }}
    //   />
    // )
  },
  {
    title:
      'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentItem }) => console.log('on_click', currentItem),
    // disabled: true,
    // inactive: true,
    // is_current: true,
  },
  {
    title:
      'Third Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentItem }) => console.log('on_click', currentItem),
  },
]

const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)

  return (
    <div style={{ display: 'flex' }}>
      <StepIndicator.Sidebar
        sidebar_id="unique-id-loose"
        // right="large"
      />

      <Space stretch>
        <StepIndicator
          sidebar_id="unique-id-loose"
          mode="loose"
          current_step={step}
          on_change={({ current_step }) => {
            setStep(current_step)
          }}
          data={[
            // 'a',
            // 'b',
            // 'c',
            'Cum odio si bolig bla et ta',
            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',
            'Bibendum sociis',
          ]}
          bottom
        />

        <Button
          variant="secondary"
          on_click={() => {
            setStep((step) => {
              if (step >= 2) {
                step = -1
              }
              return step + 1
            })
          }}
        >
          Next step
        </Button>
      </Space>
    </div>
  )
}

export const StepIndicatorSandbox = () => {
  const [count, increment] = React.useState(0)
  const [current_step, setCurrentStep] = React.useState(1)
  return (
    <Wrapper>
      <Box>
        <InteractiveDemo />
      </Box>
      <Box>
        <Code>{JSON.stringify({ count, current_step })}</Code>
        <Button
          onClick={() => {
            increment((i) => i + 1)
          }}
        >
          Increment
        </Button>
        <Button
          onClick={() => {
            setCurrentStep((i) => {
              if (i >= 2) {
                i = -1
              }
              return i + 1
            })
          }}
        >
          Step
        </Button>

        <br />
        <br />

        <StepIndicator
          // skeleton
          top="large"
          sidebar_id="unique-step-indicator"
          // hide_numbers
          // mode="static"
          // mode="strict"
          mode="loose"
          current_step={current_step}
          on_change={({ currentItem }) => {
            console.log('on_change', currentItem)
            setCurrentStep(currentItem)
            // console.log('on_change', currentItem)
          }}
          // on_item_render={({ StepItem }) => {
          //   return (
          //     <StepItem
          //       onClick={(e) => {
          //         console.log('on_item_render.onClick', e)
          //       }}
          //     />
          //   )
          // }}
          data={data}
        />
      </Box>
      <Box>
        <StepIndicator.Sidebar
          sidebar_id="unique-step-indicator"
          top="large"
        />
      </Box>
      <Box>
        <StepIndicator
          // skeleton
          top="large"
          sidebar_id="second-unique-step-indicator"
          // mode="static"
          mode="strict"
          current_step={current_step}
          on_change={({ currentItem }) => {
            console.log('on_change', currentItem)
            setCurrentStep(currentItem)
            // console.log('on_change', currentItem)
          }}
          // on_item_render={({ StepItem }) => {
          //   return (
          //     <StepItem
          //       onClick={(e) => {
          //         console.log('on_item_render.onClick', e)
          //       }}
          //     />
          //   )
          // }}
          data={data}
        />
      </Box>
      <Box>
        <StepIndicator
          use_navigation={true}
          active_item={1}
          // on_change={({ currentItem }) => {
          //   console.log('on_change', currentItem)
          // }}
          // on_item_render={({ StepItem }) => {
          //   return (
          //     <StepItem
          //       onClick={(e) => {
          //         console.log('on_item_render.onClick', e)
          //       }}
          //     />
          //   )
          // }}
          data={data}
        />
      </Box>
      <Box>
        <h1>Deprecated</h1>
        <StepIndicator
          hide_numbers
          active_url="?path=/story/components--stepindicator&current"
          data={[
            {
              title: 'First',
              url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator',
            },
            {
              title: 'Second',
              // url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator&current',
            },
            {
              title: 'Third',
              url: '?path=/story/components--stepindicator',
              // url_future: '?path=/story/components--stepindicator&future'
            },
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          // current_step={1}
          data={[
            {
              title: 'First',
            },
            {
              title: 'Second',
              is_current: true,
            },
            {
              title: 'Third',
            },
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          current_step="2"
          data={['First', 'Second', 'Third']}
        />
      </Box>
      <Box>
        <DeprecatedURLCase />
      </Box>
    </Wrapper>
  )
}

function DeprecatedURLCase() {
  const history = createBrowserHistory()
  const StepIndicatorWithUrl = () => {
    const [activeUrl, setActiveUrl] = React.useState(
      history.location.search
    )
    React.useState(() => {
      const unlisten = history.listen(({ search }) => {
        setActiveUrl(search)
      })
      return () => unlisten()
    }, [])
    console.log('activeUrl', activeUrl)
    return (
      <StepIndicator
        active_item="0"
        active_url={activeUrl}
        on_change={() => {
          try {
            e.event.preventDefault()
            history.push(e.item.url)
          } catch (e) {
            //
          }
        }}
        data={[
          {
            title: 'Om din nye bolig',
            url: '?id=eufemia-components-stepindicator--step-indicator-sandbox&a=&viewMode=story',
          },
          {
            title: 'Ditt lån og egenkapital',
            url: '?id=eufemia-components-stepindicator--step-indicator-sandbox&b=&viewMode=story',
          },
          {
            title: 'Oppsummering',
            url: '?id=eufemia-components-stepindicator--step-indicator-sandbox&c=&viewMode=story',
            url_future: '',
          },
        ]}
      />
    )
  }
  return (
    <>
      <StepIndicatorWithUrl />
      <a href="/iframe.html?id=eufemia-components-stepindicator--step-indicator-sandbox&b">
        Navigate to B
      </a>
    </>
  )
}
