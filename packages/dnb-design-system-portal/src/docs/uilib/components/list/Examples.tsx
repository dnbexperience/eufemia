/**
 * List component examples
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Anchor,
  Avatar,
  Code,
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
      <List.Container>
        <List.Item.Variant.Content>List item 1</List.Item.Variant.Content>

        <List.Item.Variant.Content>List item 2</List.Item.Variant.Content>

        <List.Item.Variant.Content>List item 3</List.Item.Variant.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const RowsWithSlots = () => {
  return (
    <ComponentBox data-visual-test="list-slots">
      <List.Container>
        <List.Item.Variant.Content>
          <List.Item.Layout.Start>Start</List.Item.Layout.Start>
          <List.Item.Layout.Center>Center</List.Item.Layout.Center>
          <List.Item.Layout.End>End</List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          <List.Item.Layout.Start>Label</List.Item.Layout.Start>
          <List.Item.Layout.End>Value</List.Item.Layout.End>
        </List.Item.Variant.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const NavigableItem = () => {
  return (
    <ComponentBox data-visual-test="list-navigate" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Variant.Navigate onClick={() => console.log('Clicked')}>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>
            Navigate to details
          </List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>
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
        <List.Item.Variant.Navigate href="#details">
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Link to details</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>

        <List.Item.Variant.Navigate
          href="https://eufemia.dnb.no/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>
            External link (opens in new tab)
          </List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={5678} />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAnchor = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Variant.Content>
          <List.Item.Layout.Title>
            <Anchor href="#">Link to page one</Anchor>
          </List.Item.Layout.Title>
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>
            <Anchor href="#">Link with icon</Anchor>
          </List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          <List.Item.Layout.Start>Label</List.Item.Layout.Start>
          <List.Item.Layout.Center>
            <Anchor href="#">Centered link</Anchor>
          </List.Item.Layout.Center>
          <List.Item.Layout.End>Value</List.Item.Layout.End>
        </List.Item.Variant.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAvatar = () => {
  return (
    <ComponentBox data-visual-test="list-avatar">
      <List.Container>
        <List.Item.Variant.Content>
          <List.Item.Layout.Start>
            <Avatar size="medium">A</Avatar>
          </List.Item.Layout.Start>
          <List.Item.Layout.Title>Alice Andersen</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Navigate onClick={() => {}}>
          <List.Item.Layout.Start>
            <Avatar size="medium">B</Avatar>
          </List.Item.Layout.Start>
          <List.Item.Layout.Title>Bob Berg</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <Value.Currency value={5678} showEmpty />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>

        <List.Item.Variant.Accordion>
          <List.Item.Variant.Accordion.Header>
            <List.Item.Layout.Start>
              <Avatar size="medium">C</Avatar>
            </List.Item.Layout.Start>
            <List.Item.Layout.Title>
              Carol with image
            </List.Item.Layout.Title>
            <List.Item.Layout.End>Value</List.Item.Layout.End>
          </List.Item.Variant.Accordion.Header>

          <List.Item.Variant.Accordion.Content innerSpace>
            <P>Content goes here.</P>
          </List.Item.Variant.Accordion.Content>
        </List.Item.Variant.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const SelectedState = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Variant.Content>Normal row</List.Item.Variant.Content>

        <List.Item.Variant.Content selected>
          Selected row
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          Another normal row
        </List.Item.Variant.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const SkeletonState = () => {
  return (
    <ComponentBox scope={{ fish_medium }} background="white">
      <List.Container>
        <List.Item.Variant.Navigate skeleton>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Loading item…</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const PendingState = () => {
  return (
    <ComponentBox data-visual-test="list-pending" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Variant.Navigate pending>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Pending item ...</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const ProgressIndicatorRow = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Variant.Content>
          <List.Item.Layout.Start>
            <ProgressIndicator
              size="medium"
              showDefaultLabel
              labelDirection="horizontal"
            />
          </List.Item.Layout.Start>
        </List.Item.Variant.Content>
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
        <List.Item.Variant.Content>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Title</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Title</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>
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
        <List.Item.Variant.Accordion>
          <List.Item.Variant.Accordion.Header>
            <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
            <List.Item.Layout.Title>
              Accordion title
            </List.Item.Layout.Title>
            <List.Item.Layout.End>
              <NumberFormat currency value={1234} />
            </List.Item.Layout.End>
          </List.Item.Variant.Accordion.Header>

          <List.Item.Variant.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Variant.Accordion.Content>
        </List.Item.Variant.Accordion>

        <List.Item.Variant.Accordion open>
          <List.Item.Variant.Accordion.Header>
            <List.Item.Layout.Title>
              Opened by default
            </List.Item.Layout.Title>
          </List.Item.Variant.Accordion.Header>

          <List.Item.Variant.Accordion.Content innerSpace>
            <P>This section is open initially.</P>
          </List.Item.Variant.Accordion.Content>
        </List.Item.Variant.Accordion>

        <List.Item.Variant.Accordion iconPosition="left">
          <List.Item.Variant.Accordion.Header>
            <List.Item.Layout.Title>
              Chevron on the left
            </List.Item.Layout.Title>
          </List.Item.Variant.Accordion.Header>

          <List.Item.Variant.Accordion.Content innerSpace>
            <P>
              Use <Code>iconPosition="left"</Code> to place the chevron on
              the left.
            </P>
          </List.Item.Variant.Accordion.Content>
        </List.Item.Variant.Accordion>
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
        <List.Item.Variant.Content>
          <List.Item.Layout.Start>
            <Field.Boolean label="Checkbox" />
          </List.Item.Layout.Start>
          <List.Item.Layout.End>
            <Value.Currency value={5678} showEmpty />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Content>
          <List.Item.Layout.Start>
            <Radio label="Radio" />
          </List.Item.Layout.Start>
          <List.Item.Layout.End>
            <NumberFormat currency value={1234} />
          </List.Item.Layout.End>
        </List.Item.Variant.Content>

        <List.Item.Variant.Navigate
          onClick={() => console.log('Navigate')}
        >
          <List.Item.Layout.Icon>{fish_medium}</List.Item.Layout.Icon>
          <List.Item.Layout.Title>Item with icon</List.Item.Layout.Title>
          <List.Item.Layout.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.Layout.End>
        </List.Item.Variant.Navigate>
      </List.Container>
    </ComponentBox>
  )
}
