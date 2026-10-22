import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src/components'

export const DefaultLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-default">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const GridLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-grid">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-horizontal">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="horizontal">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const DefaultLayoutWithHelp = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-default-with-help">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          nickName: 'JD',
          streetName: 'Osloveien',
          streetNr: 12,
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First
              path="/firstName"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Name.Last path="/lastName" />
            <Value.String
              path="/nickName"
              label="kallenavn"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Composition
              label="Street"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            >
              <Value.String path="/streetName" />
              <Value.Number
                path="/streetNr"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const GridLayoutWithHelp = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-grid-with-help">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          nickName: 'JD',
          streetName: 'Osloveien',
          streetNr: 12,
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Name.First
              path="/firstName"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Name.Last path="/lastName" />
            <Value.String
              path="/nickName"
              label="kallenavn"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Composition
              label="Street"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            >
              <Value.String path="/streetName" />
              <Value.Number
                path="/streetNr"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const GridLayoutWithHelpAndLabel = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-grid-with-help-and-label">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          nickName: 'JD',
          streetName: 'Osloveien',
          streetNr: 12,
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Composition
              label="Street"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            >
              <Value.String path="/streetName" label="Label" />
              <Value.Number path="/streetNr" label="Label" />
            </Value.Composition>
            <Value.Composition
              label="Street"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            >
              <Value.String
                path="/streetName"
                label="Label"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
              <Value.Number
                path="/streetNr"
                label="Label"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
            </Value.Composition>
            <Value.Composition label="Street">
              <Value.String
                path="/streetName"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
              <Value.Number
                path="/streetNr"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HorizontalLayoutWithHelp = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-horizontal-with-help">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          nickName: 'JD',
          streetName: 'Osloveien',
          streetNr: 12,
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="horizontal">
            <Value.Name.First
              path="/firstName"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Name.Last path="/lastName" />
            <Value.String
              path="/nickName"
              label="kallenavn"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            />
            <Value.Composition
              label="Street"
              help={{
                open: true,
                title: 'Help title',
                content: 'Help content',
              }}
            >
              <Value.String
                path="/streetName"
                label="label"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
              <Value.Number
                path="/streetNr"
                label="label"
                help={{
                  open: true,
                  title: 'Help title',
                  content: 'Help content',
                }}
              />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const CombinedLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-combined">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Osloveien',
          streetNr: 12,
          postalCode: '1234',
          city: 'Oslo',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />

            <Value.Composition label="Street">
              <Value.String path="/streetName" />
              <Value.Number path="/streetNr" />
            </Value.Composition>

            <Value.Composition label="City">
              <Value.String path="/postalCode" />
              <Value.String path="/city" />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Name.First path="/foo" defaultValue="foo" />
            <Field.Name.Last path="/bar" defaultValue="bar" />
          </Form.Visibility>

          <Value.SummaryList inheritVisibility>
            <Value.Name.First path="/foo" />
            <Value.Name.First path="/bar" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritLabel() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Field.String path="/foo" defaultValue="foo" label="foo label" />
          <Field.String path="/bar" defaultValue="bar" label="bar label" />

          <Value.SummaryList inheritLabel>
            <Value.String path="/foo" />
            <Value.String path="/bar" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HorizontalLayoutWithoutLabel = () => (
  <ComponentBox data-visual-test="forms-value-summary-empty-label">
    <Value.SummaryList layout="horizontal">
      <Value.String value="foo" label="Foo" />
      <Value.String value="bar" />
      <Value.String value="baz" label="Baz" />
    </Value.SummaryList>
  </ComponentBox>
)

export const WithHelpInInfoOverlay = () => (
  <ComponentBox data-visual-test="forms-value-summary-with-help-in-info-overlay">
    <Form.Handler
      data={{
        firstName: 'John',
        lastName: 'Doe',
      }}
    >
      <Form.InfoOverlay>
        <Value.SummaryList>
          <Value.Name.First
            path="/firstName"
            help={{
              title: 'Help title',
              content: 'Help content.',
            }}
          />
          <Value.Name.Last
            path="/lastName"
            help={{
              title: 'Help title',
              content: 'Help content.',
            }}
          />
        </Value.SummaryList>
      </Form.InfoOverlay>
    </Form.Handler>
  </ComponentBox>
)

export function AnimatedVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            label="Make second field visible when toggled"
            path="/toggleValue"
            variant="checkbox"
          />

          <Form.Card>
            <Value.SummaryList>
              <Value.String label="Label" value="First field" />

              <Form.Visibility pathTrue="/toggleValue" animate>
                <Value.String label="Label" value="Second field" />
              </Form.Visibility>
            </Value.SummaryList>
          </Form.Card>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HelpButton = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-with-help-button">
      <Form.Handler>
        <Flex.Stack>
          <Form.Card>
            <Value.SummaryList>
              <Value.Boolean
                label={
                  'Vil foretaket være involvert i, eller drive virksomhet knyttet til virtuell valuta?'
                }
                help={{
                  open: true,
                  title: 'Virtuell valuta',
                  content:
                    'For eksempel i forbindelse med veksling, oppbevaring, utvinning eller investering i kryptovaluta.',
                }}
                value={false}
              />
              <Value.Boolean
                label={
                  'Skal foretaket drive med betalingsformidling som hovedvirksomhet eller som tilleggsvirksomhet til annen næring?'
                }
                help={{
                  open: true,
                  title: 'Betalingsformidling',
                  content:
                    'For eksempel betalingsforetak, agent, filial eller tilsvarende virksomhet som krever konsesjon.',
                }}
                value={false}
              />
            </Value.SummaryList>
            <Value.Boolean
              label={
                'Er foretaket registreringspliktig hos Finanstilsynet?'
              }
              help={{
                open: true,
                title: 'Registreringspliktig',
                content:
                  'Driver virksomhet innenfor eiendomsmegling, inkasso, finans eller regnskapstjenester kan foretaket være regnskapspliktig.',
              }}
              value={true}
            />
          </Form.Card>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const MaxWidth = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-with-max-width">
      <Form.Handler>
        <Form.Card>
          <Value.SummaryList>
            <Value.String
              label="No maxWidth: This label is long so we can validate that the label can be longer."
              value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
            />
            <Value.String
              label="maxWidth='small': This label is long so we can validate that the label can be longer."
              maxWidth="small"
              value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
            />
            <Value.String
              label="maxWidth='medium': This label is long so we can validate that the label can be longer."
              maxWidth="medium"
              value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
            />
            <Value.String
              label="maxWidth='large': This label is long so we can validate that the label can be longer."
              maxWidth="large"
              value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
            />
            <Value.String
              label="maxWidth='auto': This label is long so we can validate that the label can be longer."
              maxWidth="auto"
              value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
            />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
