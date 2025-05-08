import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Basic = () => {
  return (
    <ComponentBox>
      <Value.Composition>
        <Value.String label="Label A" value="value" />
        <Value.Number label="Label B" value={123} />
      </Value.Composition>
    </ComponentBox>
  )
}

export const WidthComparison = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-default">
      <Value.Composition gap="large">
        <Value.String
          maxWidth="medium"
          label="Medium maxWidth"
          value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
        />
        <Value.String
          label="Without a width"
          value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
        />
      </Value.Composition>
    </ComponentBox>
  )
}

export const CombineValuesInSummaryList = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list-combined">
      <Value.SummaryList>
        <Value.Composition label="Label">
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const WithSummaryList = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Øvraørnefjeddstakkslåttåveien',
          streetNr: 9998,
          streetId: 'H0301',
          postalCode: '9713',
          city: 'Russenes',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Composition label="Name">
              <Value.String path="/firstName" />
              <Value.String path="/lastName" />
            </Value.Composition>

            <Value.Composition label="Street">
              <Value.String path="/streetName" />
              <Value.Number path="/streetNr" />
              <Value.String path="/streetId" />
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

export const WithSummaryListGridLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list-grid">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Øvraørnefjeddstakkslåttåveien',
          streetNr: 9998,
          streetId: 'H0301',
          postalCode: '9713',
          city: 'Russenes',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Composition label="Name">
              <Value.Name.First path="/firstName" />
              <Value.Name.Last path="/lastName" />
            </Value.Composition>

            <Value.Composition label="Street">
              <Value.String path="/streetName" />
              <Value.Number path="/streetNr" />
              <Value.String path="/streetId" />
            </Value.Composition>

            <Value.PostalCodeAndCity
              postalCode={{ path: '/postalCode' }}
              city={{ path: '/city' }}
            />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-help">
      <Flex.Stack>
        <Value.Composition
          label="Label with help"
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
        >
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>

        <Form.Card>
          <Value.SummaryList>
            <Value.Composition
              label="Label with help inside SummaryList"
              help={{
                title: 'Hva betyr lånebeløp?',
                content: 'Dette er hvor mye du har tenkt å låne totalt.',
              }}
            >
              <Value.String value="value" />
              <Value.Number value={123} />
            </Value.Composition>
            <Value.String value="Another value" />
          </Value.SummaryList>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Wrapping = () => {
  const sixtyOneChars =
    '0000000000000000000000000000000000000000000000000000000000000'
  const sixtyOneCharsIncludingASpace =
    '000000000000000000000000000000 000000000000000000000000000000'
  const fiftyEightCharsIncludingASpace =
    '00000000000000000000000000000000000000000000000000000000 0'
  return (
    <ComponentBox
      scope={{
        sixtyOneChars,
        sixtyOneCharsIncludingASpace,
        fiftyEightCharsIncludingASpace,
      }}
      data-visual-test="forms-value-composition-wrapping"
    >
      <Flex.Stack>
        <Form.Card>
          <Form.SubHeading>
            Breaking word with 61 characters
          </Form.SubHeading>
          <Value.Composition label={sixtyOneChars}>
            <Value.String value={sixtyOneChars} />
            <Value.String value={sixtyOneChars} />
          </Value.Composition>
          <Value.Composition
            label={sixtyOneChars}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Value.String value={sixtyOneChars} />
            <Value.String value={sixtyOneChars} />
          </Value.Composition>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Breaking a sentence of 61 characters that include a space
          </Form.SubHeading>
          <Value.Composition label={sixtyOneCharsIncludingASpace}>
            <Value.String value={sixtyOneCharsIncludingASpace} />
            <Value.String value={sixtyOneCharsIncludingASpace} />
          </Value.Composition>
          <Value.Composition
            label={sixtyOneCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Value.String value={sixtyOneCharsIncludingASpace} />
            <Value.String value={sixtyOneCharsIncludingASpace} />
          </Value.Composition>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Help button should not wrap alone
          </Form.SubHeading>
          <Value.Composition
            label={fiftyEightCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Value.String value={'value'} />
            <Value.String value={'value'} />
          </Value.Composition>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
