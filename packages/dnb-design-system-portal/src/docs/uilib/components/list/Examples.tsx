/**
 * List component examples
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Anchor,
  Avatar,
  Button,
  Code,
  Flex,
  Grid,
  List,
  NumberFormat,
  P,
  ProgressIndicator,
  Radio,
} from '@dnb/eufemia/src'
import { Field, Value } from '@dnb/eufemia/src/extensions/forms'
import { fish_medium } from '@dnb/eufemia/src/icons'

export const SimpleRows = () => {
  return (
    <ComponentBox>
      {() => {
        const myList = [
          { name: 'List item 1', amount: 10000 },
          { name: 'List item 2', amount: 5000 },
          { name: 'List item 3', amount: 7500 },
        ]

        return (
          <List.Container>
            {myList.map((account) => (
              <List.Item.Basic key={account.name} title={account.name}>
                <List.Cell.End>
                  <Value.Currency value={account.amount} />
                </List.Cell.End>
              </List.Item.Basic>
            ))}
          </List.Container>
        )
      }}
    </ComponentBox>
  )
}

export const RowsWithSlots = () => {
  return (
    <ComponentBox data-visual-test="list-slots" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Basic>
          <List.Cell.Start>Start</List.Cell.Start>
          <List.Cell.Center>Center</List.Cell.Center>
          <List.Cell.End>End</List.Cell.End>
        </List.Item.Basic>

        <List.Item.Basic
          title="Title"
          subtitle="Subtitle"
          icon={fish_medium}
        >
          <List.Cell.Start>Start</List.Cell.Start>
          <List.Cell.Center>Center</List.Cell.Center>
          <List.Cell.End>End</List.Cell.End>
          <List.Cell.Addition
            style={{ background: 'var(--color-sand-yellow)' }}
          >
            <P>Addition</P>
          </List.Cell.Addition>
        </List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const AdditionWithButtons = () => {
  return (
    <ComponentBox data-visual-test="list-addition" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Basic title="Item with actions" icon={fish_medium}>
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
          <List.Cell.Addition>
            <Flex.Horizontal>
              <Button text="Save" />
              <Button variant="tertiary" text="Delete" />
            </Flex.Horizontal>
          </List.Cell.Addition>
        </List.Item.Basic>

        <List.Item.Action
          icon={fish_medium}
          title="Action item with button"
        >
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
          <List.Cell.Addition>
            <Button variant="secondary" text="Open" />
          </List.Cell.Addition>
        </List.Item.Action>

        <List.Item.Accordion
          icon={fish_medium}
          chevronPosition="left"
          title="Accordion title"
        >
          <List.Item.Accordion.Header>
            <List.Cell.End>
              <NumberFormat currency value={1234} />
            </List.Cell.End>
            <List.Cell.Addition
              style={{
                background: 'var(--color-sand-yellow)',
              }}
            >
              <Button
                variant="tertiary"
                text="Next"
                icon="chevron_right"
              />
            </List.Cell.Addition>
          </List.Item.Accordion.Header>

          <List.Item.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const NavigableItem = () => {
  return (
    <ComponentBox data-visual-test="list-navigate" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Action
          icon={fish_medium}
          title="Navigate to details"
          onClick={() => console.log('Clicked')}
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Action
          chevronPosition="left"
          title="Navigate to details"
          onClick={() => console.log('Clicked')}
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const NavigableItemWithHref = () => {
  return (
    <ComponentBox
      data-visual-test="list-navigate-href"
      scope={{ fish_medium }}
    >
      <List.Container>
        <List.Item.Action
          icon={fish_medium}
          title="Link to details"
          href="#details"
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Action
          icon={fish_medium}
          title="External link (opens in new tab)"
          href="https://eufemia.dnb.no/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <List.Cell.End>
            <NumberFormat currency value={5678} />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAnchor = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Basic
          title={<Anchor href="#">Link to page one</Anchor>}
        />

        <List.Item.Basic
          icon={fish_medium}
          title={<Anchor href="#">Link with icon and end value</Anchor>}
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAvatar = () => {
  return (
    <ComponentBox data-visual-test="list-avatar">
      <List.Container>
        <List.Item.Basic title="Alice Andersen">
          <List.Cell.Start>
            <Avatar size="medium">A</Avatar>
          </List.Cell.Start>
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Basic>

        <List.Item.Action title="Bob Berg" onClick={() => {}}>
          <List.Cell.Start>
            <Avatar size="medium">B</Avatar>
          </List.Cell.Start>
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Accordion title="Carol with image">
          <List.Item.Accordion.Header>
            <List.Cell.Start>
              <Avatar size="medium">C</Avatar>
            </List.Cell.Start>
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>Content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const SelectedState = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Basic>Normal row</List.Item.Basic>

        <List.Item.Basic selected>Selected row</List.Item.Basic>

        <List.Item.Basic>Another normal row</List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const BackgroundColor = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Basic>Normal row</List.Item.Basic>

        <List.Item.Basic
          style={{
            ['--item-background-color' as string]:
              'var(--color-mint-green-12)',
          }}
        >
          Custom background color (not selected)
        </List.Item.Basic>

        <List.Item.Basic>Another normal row</List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const SkeletonState = () => {
  return (
    <ComponentBox scope={{ fish_medium }} background="white">
      <List.Container>
        <List.Item.Action
          icon={fish_medium}
          title="Loading item…"
          skeleton
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const PendingState = () => {
  return (
    <ComponentBox data-visual-test="list-pending" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Action
          icon={fish_medium}
          title="Pending item ..."
          pending
        >
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const ProgressIndicatorRow = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Basic>
          <List.Cell.Start>
            <ProgressIndicator
              size="medium"
              showDefaultLabel
              labelDirection="horizontal"
            />
          </List.Cell.Start>
        </List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const SeparatedLists = () => {
  return (
    <ComponentBox
      data-visual-test="list-separated"
      scope={{ fish_medium }}
    >
      <List.Container separated>
        <List.Item.Basic icon={fish_medium} title="Title 1">
          <List.Cell.End>
            <Value.Currency value={1234} showEmpty />
          </List.Cell.End>
        </List.Item.Basic>

        <List.Item.Basic icon={fish_medium} title="Title 2">
          <List.Cell.End>
            <Value.Currency value={4567} showEmpty />
          </List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const Accordion = () => {
  return (
    <ComponentBox
      data-visual-test="list-accordion"
      scope={{ fish_medium }}
    >
      <List.Container>
        <List.Item.Accordion icon={fish_medium} title="Accordion title">
          <List.Item.Accordion.Header>
            <List.Cell.End>
              <NumberFormat currency value={1234} />
            </List.Cell.End>
          </List.Item.Accordion.Header>

          <List.Item.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>

        <List.Item.Accordion open title="Opened by default">
          <List.Item.Accordion.Content innerSpace>
            <P>This section is open initially.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>

        <List.Item.Accordion
          chevronPosition="left"
          title="Chevron on the left"
        >
          <List.Item.Accordion.Header>
            <List.Cell.End>
              <NumberFormat currency value={1234} />
            </List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>
              Use <Code>chevronPosition="left"</Code> to place the chevron
              on the left.
            </P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const WithFormElements = () => {
  return (
    <ComponentBox
      scope={{ fish_medium }}
      data-visual-test="list-form-elements"
    >
      <List.Container>
        <List.Item.Basic>
          <List.Cell.Start>
            <Field.Boolean label="Checkbox" />
          </List.Cell.Start>
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
        </List.Item.Basic>

        <List.Item.Basic>
          <List.Cell.Start>
            <Radio label="Radio" />
          </List.Cell.Start>
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Basic>

        <List.Item.Action
          icon={fish_medium}
          title="Item with icon"
          onClick={() => console.log('Navigate')}
        >
          <List.Cell.End>
            <Value.Currency value={1234} showEmpty />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const GridColumns = () => {
  return (
    <ComponentBox scope={{ fish_medium }} background="white">
      <Grid.Container
        rowGap
        columnGap
        style={{
          marginInline: 'auto',
          maxInlineSize: 'var(--layout-medium)',
        }}
      >
        <Grid.Item
          span={{
            small: 'full',
            medium: [1, 4],
            large: [5, 12],
          }}
        >
          <List.Container>
            <List.Item.Action
              icon={fish_medium}
              title="Navigate to details"
            >
              <List.Cell.End>
                <NumberFormat currency value={1234} />
              </List.Cell.End>
            </List.Item.Action>

            <List.Item.Action
              icon={fish_medium}
              title="Navigate to details"
            >
              <List.Cell.End>
                <NumberFormat currency value={1234} />
              </List.Cell.End>
            </List.Item.Action>
          </List.Container>
        </Grid.Item>

        <Grid.Item
          span={{
            small: 'full',
            medium: [5, 6],
            large: [1, 4],
          }}
          style={{
            display: 'gid',
            placeContent: 'center',
            textAlign: 'center',
            background: 'var(--color-sand-yellow)',
          }}
        >
          <P>Second Grid Item</P>
        </Grid.Item>
      </Grid.Container>
    </ComponentBox>
  )
}
