import React, { useCallback } from 'react'
import FieldBlock from '../FieldBlock'
import Input from '../../../../components/Input'
import { useFieldProps } from '../../hooks'
import { Field, FieldProps, Form } from '../..'
import { Anchor, Flex } from '../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/FieldBlock',
}

export function FieldBlockLabel() {
  const fromInput = useCallback(({ value }) => value, [])

  const { value, handleChange, handleFocus, handleBlur } = useFieldProps({
    value: 'foo',
    fromInput,
  })

  return (
    <FieldBlock label="Label" forId="unique">
      <Input
        id="unique"
        value={value}
        on_change={handleChange}
        on_focus={handleFocus}
        on_blur={handleBlur}
      />
    </FieldBlock>
  )
}

export function Composition() {
  return (
    <Field.Composition info="Info at the bottom" width="large">
      <Field.String label="Field A with a long label" width="stretch" />
      <Field.String label="Field B" width="medium" />
    </Field.Composition>
  )
}

export function CompositionLayout() {
  return (
    <>
      <Field.Composition width="large">
        <Field.String label="Field A with a long label" width="medium" />
        <Field.String label="Field B" width="stretch" />
      </Field.Composition>

      {/* <Field.Composition top layout="vertical" width="large">
        <Field.String label="Field A with a long label" width="medium" />
        <Field.String label="Field B" width="stretch" />
      </Field.Composition> */}
    </>
  )
}

export function CompositionErrors() {
  const blockError = 'FieldBlock error'
  const blockWarning = 'FieldBlock warning'
  const blockInfo = 'FieldBlock info'
  const firstError = 'First error'
  const firstWarning = 'First warning'
  const firstInfo = 'First info'
  const secondWarning = 'Second warning'
  const secondInfo = 'Second info'

  return (
    <>
      <Field.String
        label="FieldBlock label"
        width="medium"
        warning={blockWarning}
        info={blockInfo}
        required
      />

      <Form.Handler>
        <FieldBlock
          id="unique"
          label="FieldBlock label"
          width="large"
          error={new Error(blockError)}
          warning={blockWarning}
          info={blockInfo}
          composition
        >
          <Field.String
            label="First field"
            error={new Error(firstError)}
            warning={firstWarning}
            info={firstInfo}
            required
          />
          <Field.Number
            label="Second field"
            warning={secondWarning}
            info={secondInfo}
            required
          />
        </FieldBlock>
      </Form.Handler>
    </>
  )
}

export const WithInlineHelp = () => {
  return (
    <Flex.Stack>
      <Form.MainHeading
        help={{
          renderAs: 'dialog',
          title: 'Hva betyr kredittopplysninger?',
          content:
            'Lorem ipsum dolor sit amet consectetur. Interdum elementum sit purus aliquam. Ultrices senectus sit in augue ultrices hendrerit magna eget congue.',
        }}
      >
        Kredittopplysninger
      </Form.MainHeading>
      <Form.SubHeading
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      >
        Subheading
      </Form.SubHeading>

      <Field.String
        label="Ønsket lånebeløp"
        help={{
          open: true,
          title: 'Hva betyr lånebeløp?',
          content: (
            <>
              Dette er hvor mye du har tenkt å låne{' '}
              <Anchor href="#test">totalt</Anchor>.
            </>
          ),
        }}
        onChange={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }}
      />
      <Field.String
        label="Ønsket lånebeløp"
        multiline
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      />

      <Field.String
        label="Ønsket lånebeløp"
        labelDescription="Description Nisi ad ullamco ut anim proident sint eiusmod."
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
        onChange={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }}
      />
      <Field.String
        label="Ønsket lånebeløp"
        labelDescription="Description"
        multiline
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      />

      <Form.MainHeading
        help={{
          title: 'Hva betyr kredittopplysninger?',
          content:
            'Lorem ipsum dolor sit amet consectetur. Interdum elementum sit purus aliquam. Ultrices senectus sit in augue ultrices hendrerit magna eget congue.',
        }}
      >
        Kredittopplysninger
      </Form.MainHeading>

      <Form.Card>
        <Field.String
          label="Ønsket lånebeløp"
          labelDescription="Description"
          labelDescriptionInline
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
          onChange={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />
        <Field.String
          label="Ønsket lånebeløp"
          labelDescription="Description"
          labelDescriptionInline
          multiline
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
        />
      </Form.Card>

      <Form.SubHeading
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      >
        Subheading
      </Form.SubHeading>

      <Form.Card>
        <Field.String
          label="Ønsket lånebeløp"
          layout="horizontal"
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
          info="Info message"
          onChange={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />
        <Field.String
          label="Ønsket lånebeløp"
          layout="horizontal"
          layoutOptions={{ width: '8rem' }}
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
          info="Info message"
          onChange={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />
        <Field.String
          label="Ønsket lånebeløp"
          layout="horizontal"
          layoutOptions={{ width: '8rem' }}
          multiline
          rows={3}
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
          info="Info message"
          onChange={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />
      </Form.Card>
    </Flex.Stack>
  )
}

export function Types() {
  const MyInput = (props: FieldProps<string>) => {
    const {
      id,
      value,
      error,
      handleChange,
      handleFocus,
      handleBlur,
      htmlAttributes,
    } = useFieldProps(props)

    return (
      <FieldBlock<string> forId={id} id={id} error={error} space="medium">
        <input
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...htmlAttributes}
        />
      </FieldBlock>
    )
  }

  return <MyInput error={Error('error')} />
}

export function LabelSrOnly() {
  return (
    <Form.Handler id="appearance">
      <Flex.Stack>
        Field.ArraySelection:
        <Field.ArraySelection label="label" path="/size" labelSrOnly>
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.ArraySelection>
        <Field.ArraySelection
          variant="checkbox"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.ArraySelection>
        <Field.ArraySelection
          variant="button"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.ArraySelection>
        <Field.ArraySelection
          variant="checkbox-button"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.ArraySelection>
        Field.Selection:
        <Field.Selection label="label" path="/size" labelSrOnly>
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.Selection
          variant="dropdown"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.Selection
          variant="autocomplete"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.Selection
          variant="button"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.Selection
          variant="radio"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.Selection
          variant="radio-list"
          label="label"
          path="/size"
          labelSrOnly
        >
          <Field.Option value="default" title="Default" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.String label="label" value="Foo" labelSrOnly />
        <Field.String
          label="label"
          multiline
          value="Foo"
          rows={1}
          labelSrOnly
        />
        <Field.Number label="label" value={1234} labelSrOnly />
        <Field.Number
          label="label"
          currency
          currencyDisplay="name"
          value={1234}
          showStepControls
          labelSrOnly
        />
        <Field.Date label="label" labelSrOnly />
        <Field.Email label="label" value="mail@dnb.no" labelSrOnly />
        <Field.Currency
          label="label"
          currencyDisplay="name"
          value={1234}
          labelSrOnly
        />
        <Field.Expiry label="label" labelSrOnly />
        <Field.NationalIdentityNumber
          value="12345678012"
          label="label"
          labelSrOnly
        />
        <Field.OrganizationNumber
          value="123123123"
          label="label"
          labelSrOnly
        />
        <Field.PhoneNumber label="label" labelSrOnly />
        <Field.PostalCodeAndCity
          postalCode={{ label: 'label', labelSrOnly: true }}
          city={{ label: 'label', labelSrOnly: true }}
        />
        <Field.SelectCountry label="label" labelSrOnly />
        <Field.BankAccountNumber label="label" labelSrOnly />
        <Field.Name.First label="label" labelSrOnly />
        <Field.Name.Last label="label" labelSrOnly />
        <Field.Password label="label" labelSrOnly />
        <Field.Slider label="label" labelSrOnly />
        <Field.Upload label="label" />
        <Field.Address.Postal label="label" labelSrOnly />
        <Field.Address.Street label="label" labelSrOnly />
        <Field.Indeterminate
          dependencePaths={[]}
          labelSrOnly
          label="label"
        />
        Field.Toggle:
        <Field.Toggle
          label="label"
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        <Field.Toggle
          label="label"
          variant="checkbox"
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        <Field.Toggle
          label="label"
          variant="button"
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        <Field.Toggle
          label="label"
          variant="checkbox-button"
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        <Field.Toggle
          label="label"
          variant="buttons"
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        Field.Boolean:
        <Field.Boolean label="label" labelSrOnly />
        <Field.Boolean label="label" variant="checkbox" labelSrOnly />
        <Field.Boolean label="label" variant="button" labelSrOnly />
        <Field.Boolean
          label="label"
          variant="checkbox-button"
          labelSrOnly
        />
        <Field.Boolean label="label" variant="buttons" labelSrOnly />
        Field.Composition:
        <Field.Composition label="test" labelSrOnly>
          <Field.String label="Field A with a long label" labelSrOnly />
          <Field.String label="Field B" labelSrOnly />
        </Field.Composition>
      </Flex.Stack>
    </Form.Handler>
  )
}

export function Labels() {
  return (
    <>
      <FieldBlock label="Label text" />
      <FieldBlock labelDescription="Label description" />
      <FieldBlock
        label="Label text"
        labelDescription="Label description"
      />
      <FieldBlock
        label={
          '00000000000000000000000000000000000000000000000000000000 0'
        }
        help={{ title: 'Help title', content: 'Help content' }}
      />
      <FieldBlock
        labelDescription={
          '000000000000000000000000000000000000000000000000000000000000000 0'
        }
        help={{ title: 'Help title', content: 'Help content' }}
      />
    </>
  )
}
