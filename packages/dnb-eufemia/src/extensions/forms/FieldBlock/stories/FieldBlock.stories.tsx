import React, { useCallback } from 'react'
import FieldBlock from '../FieldBlock'
import Input from '../../../../components/Input'
import { useFieldProps } from '../../hooks'
import { Field, Form } from '../..'
import { Anchor, Card, Flex } from '../../../../components'

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

      <Card stack>
        <Field.String
          label="Ønsket lånebeløp"
          labelDescription={'\nDescription'}
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
          labelDescription={'\nDescription'}
          multiline
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
        />
      </Card>

      <Form.SubHeading
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      >
        Subheading
      </Form.SubHeading>

      <Card stack>
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
      </Card>
    </Flex.Stack>
  )
}
