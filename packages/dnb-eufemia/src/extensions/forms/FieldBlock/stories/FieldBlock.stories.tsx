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
  // const fromInput = useCallback((external: unknown) => {
  //   if (
  //     typeof external === 'object' &&
  //     external !== null &&
  //     'value' in external
  //   ) {
  //     return external.value
  //   }
  //   return ''
  // }, [])
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
  // const secondError = 'Second error'
  const secondWarning = 'Second warning'
  const secondInfo = 'Second info'

  return (
    <>
      <Field.String
        label="FieldBlock label"
        width="medium"
        // error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
        required
      />

      <Form.Handler>
        <FieldBlock
          id="unique"
          label="FieldBlock label"
          width="large"
          // error={animatedState}
          error={new Error(blockError)}
          warning={blockWarning}
          info={blockInfo}
          composition
        >
          <Field.String
            label="First field"
            // width="stretch"
            error={new Error(firstError)}
            warning={firstWarning}
            info={firstInfo}
            required
            // validateInitially
          />
          <Field.Number
            label="Second field"
            // width="stretch"
            // error={new Error(secondError)}
            warning={secondWarning}
            info={secondInfo}
            required
            // validateInitially
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
          // open: true,
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
      // We get an error which seems to be due
      // to missing ProvideAdditionalEventArgs
    } = useFieldProps(props)

    return (
      <FieldBlock<string>
        forId={id}
        id={id}
        // We get a `unknown is not assignable to string` type error
        error={error}
        space="medium"
      >
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
        <Field.Selection label="Choose size" path="/size" labelSrOnly>
          <Field.Option value="default" title="Small (Default)" />
          <Field.Option value="medium" title="Medium" />
          <Field.Option value="large" title="Large" />
        </Field.Selection>
        <Field.String label="String" value="Foo" labelSrOnly />
        <Field.String
          label="String multiline"
          multiline
          value="Foo"
          rows={1}
          labelSrOnly
        />
        <Field.Number label="Number" value={1234} labelSrOnly />
        <Field.Number
          label="Number"
          currency
          currencyDisplay="name"
          value={1234}
          showStepControls
          labelSrOnly
        />
        <Field.Date labelSrOnly />
        <Field.Email value="mail@dnb.no" labelSrOnly />
        <Field.Currency
          label="Amount"
          currencyDisplay="name"
          value={1234}
          labelSrOnly
        />
        <Field.Expiry labelSrOnly />
        <Field.NationalIdentityNumber value="12345678012" labelSrOnly />
        <Field.OrganizationNumber value="123123123" labelSrOnly />
        <Field.PhoneNumber labelSrOnly />
        <Field.PostalCodeAndCity
          postalCode={{ labelSrOnly: true }}
          city={{ value: 'Oslo', labelSrOnly: true }}
          // labelSrOnly
        />
        <Field.SelectCountry labelSrOnly />
        <Field.BankAccountNumber labelSrOnly />
        <Field.Name.First labelSrOnly />
        <Field.Name.Last labelSrOnly />
        <Field.Password labelSrOnly />
        <Field.Slider labelSrOnly />
        <Field.Upload labelSrOnly />
        <Field.Address.Postal labelSrOnly />
        <Field.Address.Street labelSrOnly />
        <Field.Indeterminate dependencePaths={[]} labelSrOnly />
        <Field.Toggle
          valueOn="what-ever"
          valueOff="you-name-it"
          labelSrOnly
        />
        <Field.Boolean labelSrOnly />
      </Flex.Stack>
    </Form.Handler>
  )
}
