/**
 * List component examples
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Code,
  DateFormat,
  Flex,
  Grid,
  List,
  NumberFormat,
  P,
  ProgressIndicator,
} from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'
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

        <List.Item.Basic title="Title" icon={fish_medium}>
          <List.Cell.End>End</List.Cell.End>
        </List.Item.Basic>

        <List.Item.Basic>
          <List.Cell.Title>
            <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
            Title
            <List.Cell.Title.Subline variant="description">
              Subline
            </List.Cell.Title.Subline>
          </List.Cell.Title>
          <List.Cell.End>End</List.Cell.End>
          <List.Cell.Footer
            style={{ background: 'var(--color-sand-yellow)' }}
          >
            <P>Footer</P>
          </List.Cell.Footer>
        </List.Item.Basic>
      </List.Container>
    </ComponentBox>
  )
}

export const FooterWithButtons = () => {
  return (
    <ComponentBox data-visual-test="list-footer" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Basic title="Item with actions" icon={fish_medium}>
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
          <List.Cell.Footer>
            <Flex.Horizontal>
              <Button text="Save" />
              <Button variant="tertiary" text="Delete" />
            </Flex.Horizontal>
          </List.Cell.Footer>
        </List.Item.Basic>

        <List.Item.Action
          icon={fish_medium}
          title="Action item with button"
        >
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
          <List.Cell.Footer>
            <Button variant="secondary" text="Open" />
          </List.Cell.Footer>
        </List.Item.Action>

        <List.Item.Accordion
          chevronPosition="left"
          title="Accordion title"
        >
          <List.Item.Accordion.Header>
            <List.Cell.End>
              <NumberFormat currency value={1234} />
            </List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Cell.Footer
            style={{
              background: 'var(--color-sand-yellow)',
            }}
          >
            <Button variant="tertiary" text="Next" icon="chevron_right" />
          </List.Cell.Footer>

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
    <ComponentBox data-visual-test="list-action" scope={{ fish_medium }}>
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
          title="Left aligned chevron"
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
      data-visual-test="list-action-href"
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

export const WithDateFormat = () => {
  return (
    <ComponentBox data-visual-test="list-overline">
      <List.Container>
        <List.Item.Basic title="In Basic Item">
          <List.Cell.Start fontSize="small">
            <DateFormat
              value={new Date()}
              dateStyle="medium"
              hideCurrentYear
            />
          </List.Cell.Start>
          <List.Cell.End>
            <Value.Currency value={1234} showEmpty />
          </List.Cell.End>
        </List.Item.Basic>

        <List.Item.Action>
          <List.Cell.Title>
            <List.Cell.Title.Overline>
              <DateFormat
                value={new Date()}
                dateStyle="medium"
                hideCurrentYear
              />
            </List.Cell.Title.Overline>
            In Action Item
          </List.Cell.Title>
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Accordion>
          <List.Item.Accordion.Header>
            <List.Cell.Title>
              <List.Cell.Title.Overline>
                <DateFormat
                  value={new Date()}
                  dateStyle="medium"
                  hideCurrentYear
                />
              </List.Cell.Title.Overline>
              In Accordion Item
            </List.Cell.Title>
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
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

export const ListSubline = () => {
  return (
    <ComponentBox data-visual-test="list-subline" scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Action icon={fish_medium}>
          <List.Cell.Title>
            <span>Item 1</span>
            <List.Cell.Title.Subline>
              <DateFormat
                value={new Date()}
                dateStyle="medium"
                hideCurrentYear
              />
            </List.Cell.Title.Subline>
          </List.Cell.Title>
          <List.Cell.End>
            <Value.Currency value={5678} showEmpty />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Accordion icon={fish_medium}>
          <List.Item.Accordion.Header>
            <List.Cell.Title>
              <span>Item 2</span>
              <List.Cell.Title.Subline>Detail 1</List.Cell.Title.Subline>
              <List.Cell.Title.Subline variant="description">
                Detail 2
              </List.Cell.Title.Subline>
              <List.Cell.Title.Subline>
                <Flex.Horizontal rowGap="x-small">
                  <Badge status="neutral" subtle content="Detail 3" />
                  <Badge status="neutral" subtle content="Detail 3" />
                </Flex.Horizontal>
              </List.Cell.Title.Subline>
            </List.Cell.Title>
            <List.Cell.End>
              <Value.Currency value={5678} showEmpty />
            </List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>

        <List.Item.Action title="Title" icon={fish_medium}>
          <List.Cell.End>
            <Flex.Vertical gap={false}>
              <Value.Currency value={5678} showEmpty />
              <List.Cell.Title.Subline variant="description">
                Subline
              </List.Cell.Title.Subline>
            </Flex.Vertical>
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </ComponentBox>
  )
}

export const WithBadge = () => {
  return (
    <ComponentBox scope={{ fish_medium }}>
      <List.Container>
        <List.Item.Action title="In Action Item" icon={fish_medium}>
          <List.Cell.End>
            <Badge content="Badge" />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Accordion title="In Accordion Item" icon={fish_medium}>
          <List.Item.Accordion.Header>
            <List.Cell.End>
              <Flex.Horizontal>
                <Badge
                  content={3}
                  label="Notifications"
                  variant="notification"
                />
                <Value.Currency value={1234} showEmpty />
              </Flex.Horizontal>
            </List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content innerSpace>
            <P>Accordion content goes here.</P>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    </ComponentBox>
  )
}

export const WithFormElements = () => {
  return (
    <ComponentBox data-visual-test="list-form-elements">
      {() => {
        return (
          <Form.Handler
            defaultData={{
              mySelection: 'bar',
              myArraySelection: ['bar'],
              myDataPath: [
                { value: 'foo', title: 'Foo!', amount: 1234 },
                { value: 'bar', title: 'Baar!', amount: 5678 },
                { value: 'baz', title: 'Baz!', amount: 9999 },
              ],
            }}
          >
            <Flex.Stack>
              <Field.Selection
                label="Single choice"
                variant="radio"
                path="/mySelection"
                dataPath="/myDataPath"
              >
                {({ value: selectedValue, options = [] }) => {
                  return (
                    <List.Container>
                      {options.map(({ value, title, amount }) => {
                        return (
                          <List.Item.Basic
                            key={value}
                            selected={value === selectedValue}
                          >
                            <List.Cell.Start>
                              <Field.Option value={value} title={title} />
                            </List.Cell.Start>
                            <List.Cell.End>
                              <Value.Currency value={amount} />
                            </List.Cell.End>
                          </List.Item.Basic>
                        )
                      })}
                    </List.Container>
                  )
                }}
              </Field.Selection>

              <Field.ArraySelection
                label="Multiple choice"
                variant="checkbox"
                path="/myArraySelection"
                dataPath="/myDataPath"
              >
                {({ value = [], options = [] }) => {
                  return (
                    <List.Container>
                      {options.map(
                        ({ value: optionValue, title, amount }) => {
                          return (
                            <List.Item.Basic
                              key={optionValue}
                              selected={value.includes(optionValue)}
                            >
                              <List.Cell.Start>
                                <Field.Option
                                  value={optionValue}
                                  title={title}
                                />
                              </List.Cell.Start>
                              <List.Cell.End>
                                <Value.Currency value={amount} />
                              </List.Cell.End>
                            </List.Item.Basic>
                          )
                        }
                      )}
                    </List.Container>
                  )
                }}
              </Field.ArraySelection>
            </Flex.Stack>
          </Form.Handler>
        )
      }}
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
