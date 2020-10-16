---
title: 'Accordion'
status: 'wip'
order: 20
# showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

# Accordion

**Under development**

## Single Accordion

<ComponentBox>
{`
<Accordion
	remember_state
	id="single-accordion"
	variant="outlined"
	title="Accordion title"
>
	Accordion content
</Accordion>
<Accordion.Provider
	top
	remember_state
	icon="bell"
	icon_position="right"
	variant="outlined"
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

## Accordion with a single container

A single container is used only for wider screens (desktop).

<ComponentBox useRender hideCode>
{`
function AccordionWithContainer() {
  const ref1 = React.useRef()
  const ref2 = React.useRef()
  const [changeHeight] = React.useState(() => ({ ref1, ref2 }))
  return (
    <Accordion.Group
      variant="outlined"
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

## Grouped Accordion

**NB:** Please to avoid using a group, because it initiate an unexpected result, something the user not would expect to happen. It is an automated out of context UI execution.

<ComponentBox>
{`
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
