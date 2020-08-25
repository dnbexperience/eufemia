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

<ComponentBox>
{`
<Accordion.Group
	variant="outlined"
	// prerender
	prevent_rerender
	single_container
	remember_state
	// allow_close_all
>
	<Accordion
		// expanded={false}
		bottom
		id="remembered_state-1"
		title="Title1"
		description="Description1"
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
	<Accordion.Content left="xx-large" top="medium">
		<P>Sociis sapien sociosqu vel sollicitudin accumsan laoreet
			gravida himenaeos nostra mollis volutpat bibendum convallis
			cum condimentum dictumst blandit rutrum vehicula
		<Input /></P>
	</Accordion.Content>
	</Accordion>
    <Accordion
		// top="x-large"
		icon_position="right"
		id="remembered_state-2"
    >
		<Accordion.Header>
			<Accordion.Header.Container>
				<IconPrimary icon="bell" />
			</Accordion.Header.Container>
			<Accordion.Header.Title>
				Accordion title
			</Accordion.Header.Title>
		</Accordion.Header>
		<Accordion.Content>
			<P>
				Nec sit mattis natoque interdum sagittis cubilia nibh
				nullam etiam
				<Input />
			</P>
		</Accordion.Content>
    </Accordion>
</Accordion.Group>
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
