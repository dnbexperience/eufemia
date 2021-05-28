/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { createBrowserHistory } from 'history'

export const StepIndicatorStatic = () => (
  <ComponentBox data-visual-test="step-indicator-static">
    {() => /* jsx */ `
<StepIndicator
  sidebar_id="unique-id-static"
  mode="static"
  current_step={1}
  on_change={({ current_step }) => {
    console.log('on_change', current_step)
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ current_step }) =>
        console.log(current_step)
    },
    {
      title: 'Oppsummering',
    }
  ]}
/>
`}
  </ComponentBox>
)

export const StepIndicatorStrict = () => (
  <ComponentBox data-visual-test="step-indicator-strict">
    {() => /* jsx */ `
<StepIndicator
  sidebar_id="unique-id-strict"
  mode="strict"
  current_step={1}
  on_change={({ current_step }) => {
    console.log('on_change', current_step)
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ current_step }) =>
        console.log(current_step)
    },
    {
      title: 'Oppsummering',
    }
  ]}
/>
`}
  </ComponentBox>
)

export const StepIndicatorLoose = () => (
  <ComponentBox data-visual-test="step-indicator-loose" useRender>
    {() => /* jsx */ `
const Layout = styled.div\`
  display: flex;
  max-width: 30rem;

  .dnb-step-indicator__list {
    min-width: 320px;
  }
\`
const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)

  return (
    <Layout>
      <StepIndicator.Sidebar
        sidebar_id="unique-id-loose"
        right="large"
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
            'Cum odio si bolig bla et ta', 
            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',
            'Bibendum sociis'
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
    </Layout>
  )
}
render(<InteractiveDemo />)
`}
  </ComponentBox>
)

export const StepIndicatorCustomized = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
function CustomStepIndicator({ children, ...props }) {
  const [step, setStep] = React.useState(0)
  return (
    <>
      <StepIndicator
        sidebar_id="unique-id-customized"
        mode="loose"
        current_step={step}
        on_change={({ current_step }) => setStep(current_step)}
        {...props}
      />
      <Section style_type="lavender" spacing>
        {children(step)}
      </Section>
    </>
  )
}
render(<CustomStepIndicator
	data={
	[
		{
			title: 'First',
			is_current: true,
		},
		{
			title: 'Second',
		},
		{
			title: 'Last',
		}
	]
	}
>
	{(step) => {
		switch (step) {
			case 0:
				return <>Step One</>
			case 1:
				return <>Step Two</>
			default:
				return <>Fallback</>
		}
	}}
</CustomStepIndicator>)
`}
  </ComponentBox>
)

export const StepIndicatorSidebar = () => (
  <ComponentBox data-visual-test="step-indicator-sidebar">
    {() => /* jsx */ `
<StepIndicator
  style={{ display: 'none' }}
  sidebar_id="unique-id-sidebar"
  mode="loose"
  data={[
    {
      title: 'Om din nye bolig'
    },
    {
      title: 'Ditt lån og egenkapital'
    },
    {
      title: 'Oppsummering',
      is_current: true
    }
  ]}
/>
<StepIndicator.Sidebar sidebar_id="unique-id-sidebar" top="large" />
`}
  </ComponentBox>
)

export const StepIndicatorTextOnly = () => (
  <ComponentBox>
    {() => /* jsx */ `
<StepIndicator
  sidebar_id="unique-id-text"
  mode="static"
  current_step="1"
  data={[
    'Om din nye bolig',
    'Ditt lån og egenkapital',
    'Oppsummering'
  ]}
/>
`}
  </ComponentBox>
)

export const StepIndicatorCustomRenderer = () => (
  <ComponentBox>
    {() => /* jsx */ `
<StepIndicator
  sidebar_id="unique-id-renderer"
  mode="strict"
  current_step={1}
  on_change={({ current_step }) => {
    console.log('on_change', current_step)
  }}
  on_item_render={({ StepItem }) => {
    return (
      <StepItem
        onClick={e => console.log(e)}
      />
    )
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ current_step }) =>
        console.log(current_step),
      on_render: ({ StepItem, props, params }) => (
        <StepItem
          onClick={e => console.log(e)}
        />
      )
    },
    {
      title: 'Oppsummering',
      /*
        We can also overwrite the states
        inactive: true
        is_current: true
      */
    }
  ]}
/>
`}
  </ComponentBox>
)

export const StepIndicatorUrls = () => (
  <ComponentBox
    sidebar_id="unique-id-urls"
    mode="strict"
    data-visual-test="step-indicator-urls"
    scope={{ createBrowserHistory }}
    hideSyntaxButton
    hideCode
    useRender
  >
    {() => /* jsx */ `
const history = createBrowserHistory()
const StepIndicatorWithUrl = () => {
	const [activeUrl, setActiveUrl] = React.useState(history.location.search)
	React.useState(() => {
		const unlisten = history.listen(({ search }) => {
			setActiveUrl(search)
		})
		return () => unlisten()
	}, [])
	return (<StepIndicator
		active_url={activeUrl || '?a'}
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
			url: '?a'
		},
		{
			title: 'Ditt lån og egenkapital',
			url: '?b'
		},
		{
			title: 'Oppsummering',
			url: '?c',
			url_future: ''
		}
		]}
	/>)
}
render(<>
	<StepIndicatorWithUrl />
	<Section spacing style_type="lavender"><Anchor href="?b">Navigate to B</Anchor></Section>
</>)
`}
  </ComponentBox>
)
