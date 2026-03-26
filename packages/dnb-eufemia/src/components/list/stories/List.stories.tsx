import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DateFormat,
  Flex,
  Heading,
  List,
  NumberFormat,
  PortalRoot,
  Space,
} from '../../../components'
import { Value } from '../../../extensions/forms'
import { fish_medium } from '../../../icons'
import { P } from '../../../elements'

export default {
  title: 'Eufemia/Components/List',
}

export function ListBasic() {
  return (
    <Wrapper>
      <Box>
        <List.Container>
          <List.Item.Basic>
            <List.Cell.Title>
              <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
              List row
            </List.Cell.Title>
            <List.Cell.Start>Start</List.Cell.Start>
            <List.Cell.Center>Center</List.Cell.Center>
            <List.Cell.End>End</List.Cell.End>
            <List.Cell.Footer>Footer</List.Cell.Footer>
          </List.Item.Basic>

          <List.Item.Action
            icon={fish_medium}
            title="Title"
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action
            icon={fish_medium}
            title="Link item (href)"
            href="#section"
            target="_blank"
          >
            <List.Cell.End>
              <Value.Currency value={999} showEmpty />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Basic>
            <List.Cell.Start>
              <Checkbox label="Checkbox" />
            </List.Cell.Start>
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Action
            icon={fish_medium}
            title="Title"
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Action
            icon={fish_medium}
            title="Link item (href)"
            href="#section"
          >
            <List.Cell.End>
              <Value.Currency value={999} showEmpty />
            </List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Basic>
            <List.Cell.Start>
              <Checkbox label="Checkbox" />
            </List.Cell.Start>
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Action
            icon={fish_medium}
            title="Pending"
            pending
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action
            icon={fish_medium}
            title="Skeleton"
            skeleton
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Action
            title="Title"
            chevronPosition="left"
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </Box>

      <Box>
        <List.Container separated>
          <List.Item.Action
            icon={fish_medium}
            title="Title"
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Basic icon={fish_medium} title="Title">
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </Box>

      <Box>
        <List.Container>
          <List.Item.Accordion icon={fish_medium} title="Title">
            <List.Item.Accordion.Header>
              <List.Cell.End>
                <Value.Currency value={1234} showEmpty />
              </List.Cell.End>
            </List.Item.Accordion.Header>
            <List.Item.Accordion.Content>
              <List.Cell.Start innerSpace>Content ...</List.Cell.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>

          <List.Item.Accordion open chevronPosition="left" title="Title">
            <List.Item.Accordion.Content>
              <List.Cell.Start innerSpace>Content ...</List.Cell.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListAccordion() {
  return (
    <Wrapper>
      <Box>
        <List.Container>
          <List.Item.Action
            icon={fish_medium}
            title="Title"
            onClick={() => console.log('Clicked')}
          >
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Accordion icon={fish_medium} title="Title">
            <List.Item.Accordion.Header>
              <List.Cell.End>
                <Value.Currency value={1234} showEmpty />
              </List.Cell.End>
            </List.Item.Accordion.Header>
            <List.Item.Accordion.Content>
              <List.Cell.Start innerSpace>Content ...</List.Cell.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>

          <List.Item.Accordion open chevronPosition="left" title="Title">
            <List.Item.Accordion.Content>
              <List.Cell.Start innerSpace>Content ...</List.Cell.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListFooterWithButtons() {
  return (
    <Wrapper>
      <Box>
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

          <List.Item.Accordion icon={fish_medium} title="Accordion title">
            <List.Item.Accordion.Header>
              <List.Cell.End>
                <NumberFormat currency value={1234} />
              </List.Cell.End>
              <List.Cell.Footer>
                <Button
                  variant="tertiary"
                  text="Next"
                  icon="chevron_right"
                />
              </List.Cell.Footer>
            </List.Item.Accordion.Header>

            <List.Item.Accordion.Content innerSpace>
              <P>Accordion content goes here.</P>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListWithAvatar() {
  return (
    <Wrapper>
      <Box>
        <List.Container>
          <List.Item.Basic title="Alice Andersen">
            <List.Cell.Start>
              <Avatar size="medium">A</Avatar>
            </List.Cell.Start>
            <List.Cell.End>
              <Value.Currency value={1234} showEmpty />
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

          <List.Item.Basic title="Carol with image">
            <List.Cell.Start>
              <Avatar size="medium">C</Avatar>
            </List.Cell.Start>
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </Box>
    </Wrapper>
  )
}

export function ListOverline() {
  const today = new Date()

  return (
    <List.Container>
      <List.Item.Basic title="Title 1">
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

      <List.Item.Action icon={fish_medium}>
        <List.Cell.Title>
          <List.Cell.Title.Overline>
            <DateFormat value={today} dateStyle="medium" hideCurrentYear />
          </List.Cell.Title.Overline>
          Title 4
        </List.Cell.Title>
        <List.Cell.End>
          <Value.Currency value={5678} showEmpty />
        </List.Cell.End>
      </List.Item.Action>
    </List.Container>
  )
}

export function ListSubline() {
  return (
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
    </List.Container>
  )
}

export function ListInsideCard() {
  return (
    <List.Card>
      <Heading size="medium">Transactions</Heading>

      <List.ScrollView maxVisibleListItems={4}>
        <List.Container>
          <List.Item.Action icon={fish_medium} title="Payment received">
            <List.Cell.End>
              <Value.Currency value={1234} />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action icon={fish_medium} title="Transfer sent">
            <List.Cell.End>
              <Value.Currency value={-500} />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action icon={fish_medium} title="Subscription">
            <List.Cell.End>
              <Value.Currency value={-99} />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action icon={fish_medium} title="Refund">
            <List.Cell.End>
              <Value.Currency value={250} />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action icon={fish_medium} title="Salary">
            <List.Cell.End>
              <Value.Currency value={45000} />
            </List.Cell.End>
          </List.Item.Action>

          <List.Item.Action icon={fish_medium} title="Groceries">
            <List.Cell.End>
              <Value.Currency value={-320} />
            </List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </List.ScrollView>
    </List.Card>
  )
}

export function ListWithPortalRoot() {
  return (
    <Wrapper>
      <Box>
        <PortalRoot>
          <Card stack>
            <Heading>Portal List</Heading>

            <List.Container>
              <List.Item.Action
                icon={fish_medium}
                title="Item inside portal"
                onClick={() => console.log('Clicked')}
              >
                <List.Cell.End>
                  <Value.Currency value={1234} showEmpty />
                </List.Cell.End>
              </List.Item.Action>

              <List.Item.Accordion
                icon={fish_medium}
                title="Accordion item"
              >
                <List.Item.Accordion.Header>
                  <List.Cell.End>
                    <Value.Currency value={5678} showEmpty />
                  </List.Cell.End>
                </List.Item.Accordion.Header>
                <List.Item.Accordion.Content innerSpace>
                  <P>Content rendered inside a PortalRoot.</P>
                </List.Item.Accordion.Content>
              </List.Item.Accordion>
            </List.Container>
          </Card>
        </PortalRoot>
      </Box>
    </Wrapper>
  )
}

export function ListBorders() {
  const agreements = [
    { agreementId: 123, agreementName: 'test', amount: 123 },
    { agreementId: 1234, agreementName: 'test', amount: 123 },
  ]

  return (
    <>
      {/* No side borders shown */}
      <List.Card>
        <List.ScrollView>
          <List.Container>
            {agreements.map((agreement) => (
              <List.Item.Action
                key={agreement.agreementId}
                title={agreement.agreementName}
              >
                <List.Cell.End>
                  <NumberFormat currency value={agreement.amount} />
                </List.Cell.End>
              </List.Item.Action>
            ))}
          </List.Container>
        </List.ScrollView>
      </List.Card>

      <Space top="medium" />

      {/* Side borders shown */}
      <List.Card>
        <List.Container>
          {agreements.map((agreement) => (
            <List.Item.Basic
              key={agreement.agreementId}
              title={agreement.agreementName}
            >
              <List.Cell.End>
                <NumberFormat currency value={agreement.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </List.Card>

      <Space top="medium" />

      {/* Side borders shown */}
      <List.Card>
        <List.Container>
          {agreements.map((agreement) => (
            <List.Item.Action
              key={agreement.agreementId}
              title={agreement.agreementName}
            >
              <List.Cell.End>
                <NumberFormat currency value={agreement.amount} />
              </List.Cell.End>
            </List.Item.Action>
          ))}
        </List.Container>
      </List.Card>
    </>
  )
}
