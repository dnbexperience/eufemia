/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { createBrowserHistory } from 'history'

export const StepIndicatorDefault = () => (
  <ComponentBox data-visual-test="step-indicator-buttons">
    {() => /* jsx */ `
<StepIndicator
  enable_navigation={true}
  current_step={1}
  on_change={({ currentItem }) => {
    console.log('on_change', currentItem)
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ currentItem }) =>
        console.log(currentItem)
    },
    {
      title: 'Oppsummering',
    }
  ]}
/>
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
        enable_navigation={true}
        current_step={step}
        on_change={({ currentItem }) => setStep(currentItem)}
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
			is_active: true
		},
		{
			title: 'Second',
			is_active: true
		},
		{
			title: 'Last',
			is_active: true
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

export const StepIndicatorNavigation = () => (
  <ComponentBox data-visual-test="step-indicator-default">
    {() => /* jsx */ `
<StepIndicator
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
`}
  </ComponentBox>
)

export const StepIndicatorTextOnly = () => (
  <ComponentBox>
    {() => /* jsx */ `
<StepIndicator
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
  enable_navigation={true}
  current_step={1}
  on_change={({ currentItem }) => {
    console.log('on_change', currentItem)
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
      on_click: ({ currentItem }) =>
        console.log(currentItem),
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
        is_active: true
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
    data-visual-test="step-indicator-urls"
    scope={{ createBrowserHistory }}
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
