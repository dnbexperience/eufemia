/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  add_medium as AddIcon,
  subtract_medium as SubtractIcon,
} from '@dnb/eufemia/src/icons'

export const AccordionDefaultExample = () => (
  <ComponentBox data-visual-test="accordion-default">
    {() => /* jsx */ `
<Accordion
  expanded
	remember_state
	id="single-accordion"
	title="Accordion title"
>
	Accordion content
</Accordion>
<Accordion.Provider
	top
	remember_state
	icon="bell"
	icon_position="right"
>
	<Accordion
		id="single-provider-accordion"
		title="Accordion title"
	>
		Accordion content
	</Accordion>
</Accordion.Provider>
`}
  </ComponentBox>
)

export const AccordionLargeContentExample = () => (
  <ComponentBox data-visual-test="accordion-large" hideCode>
    {() => /* jsx */ `
<Accordion expanded bottom="large" title="Large content with long titleScelerisque eget cubilia tempus ipsum aenean dolor suscipit egestas potenti at eleifend platea interdum magnis amet molestie sem faucibus netus "
>
  <P>Hendrerit dictum elit facilisis aliquet eleifend potenti leo nec praesent sollicitudin elementum scelerisque ridiculus neque nisi risus et habitant torquent nam pellentesque dictumst porttitor accumsan a nibh fringilla facilisi lacus sagittis mauris libero tellus justo ultricies tempor viverra sodales vestibulum proin tempus lorem cubilia at velit sociis sit malesuada class consectetur turpis metus vulputate tortor cum nisl ornare ligula platea quam gravida sapien penatibus ad curae varius hac ultrices ipsum felis vehicula fermentum rutrum parturient congue sed vel magnis laoreet donec id consequat augue mi semper volutpat urna in condimentum luctus cursus fames dignissim magna suspendisse bibendum mus natoque diam</P>
</Accordion>
`}
  </ComponentBox>
)

export const AccordionCustomisationExample = () => (
  <ComponentBox data-visual-test="accordion-custom">
    {() => /* jsx */ `
<Accordion
  group="unique-id"
  left_component={<IconPrimary icon="bell" />}
>
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Sociis sapien sociosqu vel sollicitudin accumsan laoreet
      gravida himenaeos nostra mollis volutpat bibendum convallis
      cum condimentum dictumst blandit rutrum vehicula
    </P>
  </Accordion.Content>
</Accordion>
<Accordion top expanded={true} group="unique-id">
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Nec sit mattis natoque interdum sagittis cubilia nibh nullam
      etiam
    </P>
  </Accordion.Content>
</Accordion>
`}
  </ComponentBox>
)

export const AccordionContainerExample = () => (
  <ComponentBox useRender hideCode data-visual-test="accordion-container">
    {() => /* jsx */ `
function AccordionWithContainer() {
  const ref1 = React.useRef()
  const ref2 = React.useRef()
  const [changeHeight] = React.useState(() => ({ ref1, ref2 }))
  return (
    <Accordion.Group
      prevent_rerender
      single_container
      remember_state
      id="remembered-state"
      // prerender
      // allow_close_all
    >
      <Accordion
        bottom
        id="remembered-state-1"
        title="Title1"
        description="Description1"
        expanded={true}
        // element="h2"
        // heading
        // heading={Heading}
        // heading_level="3"
      >
        <Accordion.Header title="Title2" description="Description2">
          {/* Title 3 string */}
          <Accordion.Header.Title key="title">
            Title 3
          </Accordion.Header.Title>
          <Accordion.Header.Description>
            Description 3
          </Accordion.Header.Description>
          {/* <Accordion.Header.Icon key="icon" /> */}
        </Accordion.Header>
        <Accordion.Content
          left="xx-large"
          top="medium"
          instance={changeHeight.ref1}
        >
          <ChangingContent changeHeight={changeHeight.ref1}>
            <div
              style={{
                height: '10rem',
                background: 'var(--color-sea-green-30)'
              }}
            >
              <P top bottom="xx-large">
                Simulation of content height
              </P>
            </div>
          </ChangingContent>
        </Accordion.Content>
      </Accordion>
      <Accordion
        icon_position="right"
        id="remembered-state-2"
        // top="x-large"
      >
        <Accordion.Header>
          <Accordion.Header.Container>
            <IconPrimary icon="bell" />
          </Accordion.Header.Container>
          <Accordion.Header.Title>Accordion title</Accordion.Header.Title>
        </Accordion.Header>
        <Accordion.Content
          left="xx-large"
          top="medium"
          instance={changeHeight.ref2}
        >
          <ChangingContent changeHeight={changeHeight.ref2}>
            <div
              style={{
                height: '20rem',
                background: 'var(--color-sand-yellow)'
              }}
            >
              <P top bottom="xx-large">
                Simulation of content height
              </P>
            </div>
          </ChangingContent>
        </Accordion.Content>
      </Accordion>
    </Accordion.Group>
  )
}
function ChangingContent({ changeHeight, children }) {
  const [contentSize, changeContentSize] = React.useState(false)
  React.useEffect(() => {
    changeHeight.current.setContainerHeight()
  }, [changeHeight, contentSize])
  return (
    <>
      <ToggleButton
        checked={contentSize}
        on_change={() => {
          changeContentSize((s) => !s)
        }}
        bottom
      >
        Toggle content size
      </ToggleButton>
      {contentSize ? children : null}
    </>
  )
}
render(<AccordionWithContainer />)
`}
  </ComponentBox>
)

export const AccordionGroupExample = () => (
  <ComponentBox data-visual-test="accordion-group">
    {() => /* jsx */ `
<Accordion.Group expanded allow_close_all>
	<Accordion expanded={false}>
    <Accordion.Header>Accordion title</Accordion.Header>
    <Accordion.Content top="x-large">
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet
        gravida himenaeos nostra mollis volutpat bibendum convallis
        cum condimentum dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
	</Accordion>
	<Accordion top>
    <Accordion.Header>Accordion title</Accordion.Header>
    <Accordion.Content>
      <P>
        Nec sit mattis natoque interdum sagittis cubilia nibh
        nullam etiam
      </P>
    </Accordion.Content>
	</Accordion>
</Accordion.Group>
`}
  </ComponentBox>
)

export const AccordionPlainVariant = () => {
  return typeof window !== 'undefined' && window.IS_TEST ? (
    <ComponentBox
      data-visual-test="accordion-variant-plain"
      scope={{ AddIcon, SubtractIcon }}
    >
      {() => /* jsx */ `
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  icon_position="right"
>
  content
</Accordion>
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  icon_position="right"
  expanded
>
  content
</Accordion>
`}
    </ComponentBox>
  ) : null
}
