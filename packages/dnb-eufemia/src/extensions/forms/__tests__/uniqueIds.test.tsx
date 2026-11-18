import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Field } from '..'

// Fields that render a FieldBlock label next to a control with its own label
// have repeated the {id}-label id before (#9831, #9866). Check every variant
// with every label option.

const help = { title: 'Help title', content: 'Help content' }
const labelOptions = {
  'no label': {},
  label: { label: 'Label' },
  labelDescription: { label: 'Label', labelDescription: 'Description' },
  'labelDescription only': { labelDescription: 'Description' },
  help: { label: 'Label', help },
  'help only': { help },
  labelSrOnly: { label: 'Label', labelSrOnly: true },
  info: { label: 'Label', info: 'Info text' },
  error: { label: 'Label', error: new Error('Error text') },
}
const data = [
  { value: 'a', title: 'A' },
  { value: 'b', title: 'B' },
]

const toggleVariants = [
  'checkbox',
  'switch',
  'button',
  'buttons',
  'radio',
  'radio-button',
  'checkbox-button',
] as const
const selectionVariants = [
  'dropdown',
  'autocomplete',
  'radio',
  'button',
  'radio-button',
] as const
const arraySelectionVariants = [
  'checkbox',
  'button',
  'checkbox-button',
] as const

const fields: Array<[string, (props: object) => ReactNode]> = [
  ...toggleVariants.flatMap((variant) => [
    [
      `Field.Toggle variant="${variant}"`,
      (props: object) => (
        <Field.Toggle
          id="field"
          valueOn="on"
          valueOff="off"
          variant={variant}
          {...props}
        />
      ),
    ] as [string, (props: object) => ReactNode],
    [
      `Field.Boolean variant="${variant}"`,
      (props: object) => (
        <Field.Boolean id="field" variant={variant} {...props} />
      ),
    ] as [string, (props: object) => ReactNode],
  ]),
  ...selectionVariants.map(
    (variant) =>
      [
        `Field.Selection variant="${variant}"`,
        (props: object) => (
          <Field.Selection
            id="field"
            variant={variant}
            data={data}
            {...props}
          />
        ),
      ] as [string, (props: object) => ReactNode]
  ),
  ...arraySelectionVariants.map(
    (variant) =>
      [
        `Field.ArraySelection variant="${variant}"`,
        (props: object) => (
          <Field.ArraySelection
            id="field"
            variant={variant}
            data={data}
            {...props}
          />
        ),
      ] as [string, (props: object) => ReactNode]
  ),
]

describe.each(fields)('%s', (_name, renderField) => {
  it.each(Object.entries(labelOptions))(
    'renders unique ids with %s',
    (_option, props) => {
      render(renderField(props))

      const ids = Array.from(document.querySelectorAll('[id]')).map(
        (element) => element.id
      )
      expect(ids.length).toBeGreaterThan(0)
      expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual(
        []
      )
    }
  )
})
