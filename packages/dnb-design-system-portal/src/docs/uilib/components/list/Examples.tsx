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
        <List.Item.Content>List item 1</List.Item.Content>
        <List.Item.Content>List item 2</List.Item.Content>
        <List.Item.Content>List item 3</List.Item.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const RowsWithSlots = () => {
  return (
    <ComponentBox data-visual-test="list-slots">
      <List.Container>
        <List.Item.Content>
          <List.Item.Start>Start</List.Item.Start>
          <List.Item.Center>Center</List.Item.Center>
          <List.Item.End>End</List.Item.End>
        </List.Item.Content>
        <List.Item.Content>
          <List.Item.Start>Label</List.Item.Start>
          <List.Item.End>Value</List.Item.End>
        </List.Item.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const NavigableItem = () => {
  return (
    <ComponentBox data-visual-test="list-navigate" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Navigate onClick={() => console.log('Clicked')}>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Navigate to details</List.Item.Title>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAnchor = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Content>
          <List.Item.Title>
            <Anchor href="#">Link to page one</Anchor>
          </List.Item.Title>
        </List.Item.Content>
        <List.Item.Content>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>
            <Anchor href="#">Link with icon</Anchor>
          </List.Item.Title>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Content>
        <List.Item.Content>
          <List.Item.Start>Label</List.Item.Start>
          <List.Item.Center>
            <Anchor href="#">Centered link</Anchor>
          </List.Item.Center>
          <List.Item.End>Value</List.Item.End>
        </List.Item.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const WithAvatar = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Content>
          <List.Item.Start>
            <Avatar size="medium">A</Avatar>
          </List.Item.Start>
          <List.Item.Title>Alice Andersen</List.Item.Title>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Content>
        <List.Item.Navigate onClick={() => {}}>
          <List.Item.Start>
            <Avatar size="medium">B</Avatar>
          </List.Item.Start>
          <List.Item.Title>Bob Berg</List.Item.Title>
          <List.Item.End>
            <Value.Currency value={5678} showEmpty />
          </List.Item.End>
        </List.Item.Navigate>
        <List.Item.Accordion>
          <List.Item.Accordion.Header>
            <List.Item.Start>
              <Avatar size="medium">C</Avatar>
            </List.Item.Start>
            <List.Item.Title>Carol with image</List.Item.Title>
            <List.Item.End>Value</List.Item.End>
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
    <ComponentBox data-visual-test="list-selected">
      <List.Container>
        <List.Item.Content>Normal row</List.Item.Content>
        <List.Item.Content selected>Selected row</List.Item.Content>
        <List.Item.Content>Another normal row</List.Item.Content>
      </List.Container>
    </ComponentBox>
  )
}

export const SkeletonState = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Navigate skeleton>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Loading item…</List.Item.Title>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const PendingState = () => {
  return (
    <ComponentBox data-visual-test="list-pending" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Navigate pending>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Loading item ...</List.Item.Title>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Navigate>
      </List.Container>
    </ComponentBox>
  )
}

export const ProgressIndicatorRow = () => {
  return (
    <ComponentBox>
      <List.Container>
        <List.Item.Content>
          <List.Item.Start>
            <ProgressIndicator
              size="medium"
              showDefaultLabel
              labelDirection="horizontal"
            />
          </List.Item.Start>
        </List.Item.Content>
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
        <List.Item.Content>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Title</List.Item.Title>
          <List.Item.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.End>
        </List.Item.Content>
        <List.Item.Content>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Title</List.Item.Title>
          <List.Item.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.End>
        </List.Item.Content>
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
        <List.Item.Accordion>
          <List.Item.Accordion.Header>
            <List.Item.Icon>{fish_medium}</List.Item.Icon>
            <List.Item.Title>Accordion title</List.Item.Title>
            <List.Item.End>
              <NumberFormat currency value={1234} />
            </List.Item.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>

        <List.Item.Accordion open>
          <List.Item.Accordion.Header>
            <List.Item.Title>Opened by default</List.Item.Title>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>This section is open initially.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>

        <List.Item.Accordion iconPosition="left">
          <List.Item.Accordion.Header>
            <List.Item.Title>Chevron on the left</List.Item.Title>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>
              Use <Code>iconPosition="left"</Code> to place the chevron on
              the left.
            </P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const WithFormElements = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Content>
          <List.Item.Start>
            <Field.Boolean label="Checkbox" />
          </List.Item.Start>
          <List.Item.End>
            <Value.Currency value={5678} showEmpty />
          </List.Item.End>
        </List.Item.Content>

        <List.Item.Content>
          <List.Item.Start>
            <Radio label="Radio" />
          </List.Item.Start>
          <List.Item.End>
            <NumberFormat currency value={1234} />
          </List.Item.End>
        </List.Item.Content>

        <List.Item.Navigate onClick={() => console.log('Navigate')}>
          <List.Item.Icon>{fish_medium}</List.Item.Icon>
          <List.Item.Title>Item with icon</List.Item.Title>
          <List.Item.End>
            <Value.Currency value={1234} showEmpty />
          </List.Item.End>
        </List.Item.Navigate>
      </List.Container>
    </ComponentBox>
  )
}
