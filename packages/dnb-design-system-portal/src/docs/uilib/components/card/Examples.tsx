import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useRef, useState } from 'react'
import {
  Button,
  Avatar,
  Card,
  Flex,
  Grid,
  HeightAnimation,
  IconPrimary,
  H2,
  Lead,
  P,
  Section,
  Table,
  Td,
  Th,
  Tr,
} from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { Provider } from '@dnb/eufemia/src/shared'
import { fish, lightbulb_medium } from '@dnb/eufemia/src/icons'

export const InfoLayout = () => (
  <ComponentBox
    hideCode
    scope={{ fish, lightbulb_medium }}
    data-visual-test="card-info-layout"
  >
    <Card.Info>
      <Flex.Horizontal wrap={false} gap="small">
        <IconPrimary
          icon={lightbulb_medium}
          size="medium"
          style={{ color: 'var(--token-color-icon-action)' }}
        />
        <Flex.Stack
          gap="small"
          style={{ maxWidth: 'var(--prose-max-width)' }}
        >
          <Flex.Stack gap="x-small">
            <P size="small" weight="medium">
              Title of your info/tip
            </P>
            <P size="small">
              This is a description of some information or a tip that will
              inform the user of something that will help them.
            </P>
          </Flex.Stack>
          <Flex.Horizontal gap="small">
            <Button
              variant="secondary"
              icon={fish}
              href="#info-card-actions"
            >
              Some CTA here
            </Button>
            <Button
              variant="tertiary"
              icon={fish}
              href="#info-card-actions"
            >
              Another CTA
            </Button>
          </Flex.Horizontal>
        </Flex.Stack>
      </Flex.Horizontal>
    </Card.Info>
  </ComponentBox>
)

export const InfoCardActions = () => (
  <ComponentBox hideCode data-visual-test="card-info-actions">
    <Flex.Stack>
      <Card.Info onClick={() => console.log('Start saving')}>
        <Flex.Stack gap="x-small">
          <P size="small" weight="medium">
            Start saving
          </P>
          <P size="small">
            Set up a monthly transfer to build your savings.
          </P>
        </Flex.Stack>
      </Card.Info>
      <Card.Info href="#info-card-layout">
        <Flex.Stack gap="x-small">
          <P size="small" weight="medium">
            Read more about saving
          </P>
          <P size="small">The whole card is a link.</P>
        </Flex.Stack>
      </Card.Info>
    </Flex.Stack>
  </ComponentBox>
)

export const ClosableInfoCard = () => (
  <ComponentBox hideCode data-visual-test="card-info-close">
    {() => {
      const Example = () => {
        const [visible, setVisible] = useState(true)
        const [dismissed, setDismissed] = useState(false)
        const animationRef = useRef<HTMLElement>(null)
        const shouldMoveFocus = useRef(false)

        return !dismissed ? (
          <HeightAnimation
            ref={animationRef}
            open={visible}
            onAnimationStart={(state) => {
              if (state === 'closing') {
                shouldMoveFocus.current =
                  animationRef.current?.contains(document.activeElement) ??
                  false
              }
            }}
            onAnimationEnd={(state) => {
              if (state === 'closed') {
                setDismissed(true)
                if (shouldMoveFocus.current) {
                  document
                    .getElementById('graphic-and-centered-layouts')
                    ?.focus()
                }
              }
            }}
          >
            <Card.Info>
              <Card.Info.CloseButton
                onClick={() => setVisible(false)}
                title="Dismiss savings tip"
              />
              <Flex.Stack gap="x-small">
                <P size="small" weight="medium">
                  A little every month goes a long way
                </P>
                <P size="small">
                  Set up a monthly transfer to build your savings.
                </P>
              </Flex.Stack>
              <Button
                variant="secondary"
                onClick={() => setVisible(false)}
              >
                Got it
              </Button>
            </Card.Info>
          </HeightAnimation>
        ) : null
      }
      return <Example />
    }}
  </ComponentBox>
)

export const InfoCardGraphic = () => (
  <ComponentBox hideCode data-visual-test="card-info-graphic">
    <Flex.Stack>
      <Card.Info>
        <Flex.Horizontal wrap={false}>
          <Avatar size="large" />
          <Flex.Stack gap="x-small">
            <P size="small" weight="medium">
              Your savings adviser
            </P>
            <P size="small">
              Compose an image, illustration, or any other content.
            </P>
          </Flex.Stack>
        </Flex.Horizontal>
      </Card.Info>
      <Card.Info>
        <Flex.Stack
          align="center"
          gap="small"
          style={{ textAlign: 'center' }}
        >
          <Flex.Stack gap="x-small" align="center">
            <H2 size="small">Build your savings</H2>
            <P size="small">Center the content using Flex.</P>
          </Flex.Stack>
          <Flex.Item alignSelf="center">
            <Button variant="secondary" href="#info-card-layout">
              Learn more
            </Button>
          </Flex.Item>
        </Flex.Stack>
      </Card.Info>
      <Card.Info dropShadow={false} innerSpace="small">
        <Flex.Stack gap="x-small">
          <P size="small" weight="medium">
            Text only, without shadow
          </P>
          <P size="small">Card defaults can be overridden.</P>
        </Flex.Stack>
      </Card.Info>
      <Provider skeleton>
        <Card.Info>
          <Flex.Stack gap="x-small">
            <P size="small" weight="medium">
              Loading title
            </P>
            <P size="small">Loading information</P>
          </Flex.Stack>
        </Card.Info>
      </Provider>
    </Flex.Stack>
  </ComponentBox>
)

export const CloseButtonPadding = () => (
  <ComponentBox data-visual-test="card-close-padding" hideCode>
    <Flex.Stack>
      <Card responsive={false}>
        <Card.Info.CloseButton />
        <P size="small">Plain Card with default padding</P>
      </Card>
      <Card.Info>
        <Card.Info.CloseButton />
        <P size="small">Card.Info with responsive padding</P>
      </Card.Info>
      <Card.Info innerSpace="large">
        <Card.Info.CloseButton />
        <P size="small">Card.Info with custom padding</P>
      </Card.Info>
      <Card.Info
        innerSpace={{
          top: 'x-large',
          bottom: 'small',
          left: 'small',
          right: 'small',
        }}
      >
        <Card.Info.CloseButton />
        <P size="small">Card.Info with asymmetric padding</P>
      </Card.Info>
      <Card.Info innerSpace={false}>
        <Card.Info.CloseButton />
        <img
          src="/media/card/savings.webp"
          alt=""
          style={{ width: '100%', height: '8rem', objectFit: 'cover' }}
        />
        <P size="small">Card.Info without padding</P>
      </Card.Info>
    </Flex.Stack>
  </ComponentBox>
)

export const Default = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-border">
      <Card>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum.
        </P>
      </Card>
    </ComponentBox>
  )
}

export const NestedCards = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-nested">
      <Card stack>
        <P>First Card</P>
        <Card stack>
          <P>Second Card</P>
          <Card stack>
            <P>Third Card (edge case)</P>
          </Card>
        </Card>
      </Card>
    </ComponentBox>
  )
}

export const WithDropShadow = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-drop-shadow">
      <Card stack dropShadow>
        <Lead>Card 1</Lead>
        <Card stack top="2.5rem">
          <Lead size="basis">Card 2</Lead>
          <Card
            stack
            top="1.5rem"
            innerSpace={{
              top: true,
              block: '3rem',
              inline: true,
            }}
          >
            <Lead size="small">Card 3 (edge case)</Lead>
          </Card>
        </Card>
      </Card>
    </ComponentBox>
  )
}

export const WithTable = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-table">
      {() => {
        const MyTable = () => (
          <Table.ScrollView>
            <Table border outline size="medium">
              <thead>
                <Tr noWrap>
                  <Th>Column 1</Th>
                  <Th>Column 2</Th>
                  <Th>Column 3</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                </Tr>
                <Tr>
                  <Td colSpan={3} align="right">
                    <Button>Button</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                </Tr>
              </tbody>
            </Table>
          </Table.ScrollView>
        )

        return (
          <Card
            title="Card title"
            responsive={false}
            innerSpace={0}
            filled
          >
            <MyTable />
          </Card>
        )
      }}
    </ComponentBox>
  )
}

export const WithTableOutline = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-table-outline">
      {() => {
        const MyTable = () => (
          <Table.ScrollView>
            <Table border outline size="medium">
              <thead>
                <Tr noWrap>
                  <Th>Column 1</Th>
                  <Th>Column 2</Th>
                  <Th>Column 3</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                </Tr>
                <Tr>
                  <Td colSpan={3} align="right">
                    <Button>Button</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                </Tr>
              </tbody>
            </Table>
          </Table.ScrollView>
        )

        return (
          <Card title="Card title" responsive={false} filled>
            <MyTable />
          </Card>
        )
      }}
    </ComponentBox>
  )
}

export const WithGrid = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-grid">
      <Grid.Container
        columns={{
          small: 1,
          medium: 3,
          large: 3,
        }}
        columnGap="small"
      >
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Grid.Container>
    </ComponentBox>
  )
}

export const WithFlex = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-flex">
      <Flex.Container>
        <Card
          span={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card
          span={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card
          span={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Flex.Container>
    </ComponentBox>
  )
}

export const Stack = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-stack">
      <Card stack>
        <P>Stacked content</P>
        <P>Stacked content</P>
      </Card>
    </ComponentBox>
  )
}

export const WithFormFields = () => {
  return (
    <ComponentBox hideCode>
      <Form.Card>
        <Field.String label="Label" value="Value" />
        <Field.String label="Label" value="Value" />
      </Form.Card>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox hideCode hidePreview>
      <Card aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id" space={0}>
          Heading
        </Form.SubHeading>
        <P>Content inside a landmark ...</P>
      </Card>
    </ComponentBox>
  )
}

export const WithoutPadding = () => {
  return (
    <ComponentBox hideCode>
      <Card innerSpace={false} align="stretch">
        <P>no inner space</P>
      </Card>
    </ComponentBox>
  )
}

export const WithNestedSection = () => {
  return (
    <ComponentBox hideCode data-visual-test="card-nested-section">
      <Flex.Stack>
        <Card gap="x-small" align="stretch">
          <Form.SubHeading>Card with a nested Section</Form.SubHeading>
          <Section
            variant="information"
            innerSpace={{ top: 'small', bottom: 'medium' }}
          >
            <Field.String width="medium" label="In nested Section" />
          </Section>
        </Card>

        <Card innerSpace="x-large" stack>
          <Section
            variant="information"
            innerSpace={{ top: 'small', bottom: 'medium' }}
          >
            <Field.String
              width="medium"
              label="Card with a 'x-large' inner space"
            />
          </Section>
        </Card>

        <Card innerSpace={false} align="stretch">
          <P>no inner space</P>
          <Section innerSpace backgroundColor="var(--color-lavender)">
            <Field.String
              width="medium"
              label="Card with no inner space"
            />
          </Section>
          <P>no inner space</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const InColoredSection = () => {
  return (
    <ComponentBox hideCode data-visual-test="card-in-colored-section">
      <Section
        backgroundColor="var(--color-signal-orange)"
        innerSpace="large"
      >
        <Card>Card in colored Section</Card>
      </Section>
    </ComponentBox>
  )
}

export const WithOutset = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-outset">
      <Flex.Vertical>
        <Form.MainHeading>I'm left aligned</Form.MainHeading>
        <Card stack outset>
          <P>Card content</P>
          <Card>
            <P>Nested card</P>
          </Card>
        </Card>
        <Form.SubmitButton text="I'm also left aligned" />
      </Flex.Vertical>
    </ComponentBox>
  )
}

export const CustomBackgroundColorAndOutline = () => {
  return (
    <ComponentBox
      hideCode
      data-visual-test="layout-card-background-color-outline"
    >
      <Flex.Vertical>
        <Form.MainHeading>I'm left aligned</Form.MainHeading>
        <Card
          stack
          backgroundColor="var(--token-color-background-neutral-subtle)"
          outline="var(--token-color-stroke-neutral)"
        >
          <P>Card content</P>
          <Card outline="transparent">
            <P>Nested card</P>
          </Card>
        </Card>
      </Flex.Vertical>
    </ComponentBox>
  )
}

export const InteractiveCards = () => {
  return (
    <ComponentBox hideCode data-visual-test="layout-card-interactive">
      <Card.List style={{ maxWidth: '640px', margin: '0 auto' }}>
        <Card.ListItem center="when-small">
          <Card.Action
            onClick={() => console.log('Card clicked')}
            stack
            gap="x-small"
          >
            <Lead>Clickable card</Lead>
            <P>
              Click this card. It has hover, focus, and keyboard support.
            </P>
            <Button
              variant="tertiary"
              icon="chevron_right"
              text="Read more"
              element="span"
            />
          </Card.Action>
        </Card.ListItem>

        <Card.ListItem center="when-small">
          <Card.Action href="/" stack gap="x-small">
            <Lead>Link card</Lead>
            <P>This card navigates with an anchor element.</P>
            <Button
              variant="tertiary"
              icon="chevron_right"
              text="Read more"
              element="span"
            />
          </Card.Action>
        </Card.ListItem>
      </Card.List>
    </ComponentBox>
  )
}
