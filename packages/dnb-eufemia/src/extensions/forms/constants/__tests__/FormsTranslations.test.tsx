import React from 'react'
import { render } from '@testing-library/react'
import { Field, Form } from '../..'
import {
  Provider,
  Translation,
  useTranslation,
  TranslationProps,
} from '../../../../../shared'
import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

const nb = nbNO['nb-NO']
const gb = enGB['en-GB']

type Tr<T> = TranslationProps<T[keyof T]>

describe('Form.Handler', () => {
  describe('with object translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          my: { string: 'Min streng 1' },
          PhoneNumber: { label: 'Egendefinert 1' },
        },
        'en-GB': {
          my: { string: 'My string 1' },
          PhoneNumber: { label: 'Custom 1' },
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const MockComponent = (props) => {
        return (
          <Form.Handler translations={translations} {...props}>
            <Field.PhoneNumber />
            <output>
              <Tr id={(t) => t.my.string} />
            </output>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1] = Array.from(
        document.querySelectorAll('label, output')
      )

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['en-GB'].my.string)

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['nb-NO'].my.string)
    })
  })

  describe('with flat translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          'my.string': 'Min streng 2',
          'PhoneNumber.label': 'Egendefinert 2',
        },
        'en-GB': {
          'my.string': 'My string 2',
          'PhoneNumber.label': 'Custom 2',
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const GlobalHook = () => {
        const t = useTranslation<typeof translations>()
        return t.my.string
      }
      const FormsHook = () => {
        const t = Form.useTranslation()
        return t.PhoneNumber.label
      }

      const MockComponent = (props) => {
        return (
          <Form.Handler translations={translations} {...props}>
            <Field.PhoneNumber />
            <output>
              <Tr id={(t) => t.my.string} />
            </output>
            <output>
              <GlobalHook />
            </output>
            <output>
              <FormsHook />
            </output>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1, output2, output3] =
        Array.from(document.querySelectorAll('label, output'))

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output2).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output3).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output2).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output3).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
    })
  })
})

describe('Form.Section', () => {
  describe('with object translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          my: { string: 'Min streng 1' },
          PhoneNumber: { label: 'Egendefinert 1' },
        },
        'en-GB': {
          my: { string: 'My string 1' },
          PhoneNumber: { label: 'Custom 1' },
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const MockComponent = (props) => {
        return (
          <Form.Handler {...props}>
            <Form.Section translations={translations}>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
            </Form.Section>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1] = Array.from(
        document.querySelectorAll('label, output')
      )

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['en-GB'].my.string)

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['nb-NO'].my.string)
    })

    it('should let Form.Handler overwrite translations', () => {
      const sectionTranslations = {
        'nb-NO': {
          my: { string: 'Min streng 1' },
          PhoneNumber: { label: 'Egendefinert 1' },
        },
        'en-GB': {
          my: { string: 'My string 1' },
          PhoneNumber: { label: 'Custom 1' },
        },
      }
      const handlerTranslations = {
        'nb-NO': {}, // Skip overwriting of sectionTranslations when switching to nb-NO
        'en-GB': {
          my: { string: 'My string 2' },
          PhoneNumber: { label: 'Custom 2' },
        },
      }

      const Tr = (p: Tr<typeof sectionTranslations>) => (
        <Translation {...p} />
      )

      const MockComponent = (props) => {
        return (
          <Form.Handler translations={handlerTranslations} {...props}>
            <Form.Section translations={sectionTranslations}>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
            </Form.Section>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1] = Array.from(
        document.querySelectorAll('label, output')
      )

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        handlerTranslations['en-GB'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(
        handlerTranslations['en-GB'].my.string
      )

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        sectionTranslations['nb-NO'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(
        sectionTranslations['nb-NO'].my.string
      )
    })
  })

  describe('with flat translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          'my.string': 'Min streng 2',
          'PhoneNumber.label': 'Egendefinert 2',
        },
        'en-GB': {
          'my.string': 'My string 2',
          'PhoneNumber.label': 'Custom 2',
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const GlobalHook = () => {
        const t = useTranslation<typeof translations>()
        return t.my.string
      }
      const FormsHook = () => {
        const t = Form.useTranslation()
        return t.PhoneNumber.label
      }

      const MockComponent = (props) => {
        return (
          <Form.Handler {...props}>
            <Form.Section translations={translations}>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
              <output>
                <GlobalHook />
              </output>
              <output>
                <FormsHook />
              </output>
            </Form.Section>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1, output2, output3] =
        Array.from(document.querySelectorAll('label, output'))

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output2).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output3).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output2).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output3).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
    })

    it('should let Form.Handler overwrite translations', () => {
      const sectionTranslations = {
        'nb-NO': {
          'my.string': 'Min streng 2',
          'PhoneNumber.label': 'Egendefinert 2',
        },
        'en-GB': {
          'my.string': 'My string 2',
          'PhoneNumber.label': 'Custom 2',
        },
      }
      const handlerTranslations = {
        'nb-NO': {}, // Skip overwriting of sectionTranslations when switching to nb-NO
        'en-GB': {
          'my.string': 'My string 2',
          'PhoneNumber.label': 'Custom 2',
        },
      }

      const Tr = (p: Tr<typeof sectionTranslations>) => (
        <Translation {...p} />
      )

      const GlobalHook = () => {
        const t = useTranslation<typeof sectionTranslations>()
        return t.my.string
      }
      const FormsHook = () => {
        const t = Form.useTranslation()
        return t.PhoneNumber.label
      }

      const MockComponent = (props) => {
        return (
          <Form.Handler translations={handlerTranslations} {...props}>
            <Form.Section translations={sectionTranslations}>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
              <output>
                <GlobalHook />
              </output>
              <output>
                <FormsHook />
              </output>
            </Form.Section>
          </Form.Handler>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1, output2, output3] =
        Array.from(document.querySelectorAll('label, output'))

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        handlerTranslations['en-GB']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(
        handlerTranslations['en-GB']['my.string']
      )
      expect(output2).toHaveTextContent(
        handlerTranslations['en-GB']['my.string']
      )
      expect(output3).toHaveTextContent(
        handlerTranslations['en-GB']['PhoneNumber.label']
      )

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        sectionTranslations['nb-NO']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(
        sectionTranslations['nb-NO']['my.string']
      )
      expect(output2).toHaveTextContent(
        sectionTranslations['nb-NO']['my.string']
      )
      expect(output3).toHaveTextContent(
        sectionTranslations['nb-NO']['PhoneNumber.label']
      )
    })
  })
})

describe('Shared Provider', () => {
  describe('with object translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          my: { string: 'Min streng 3' },
          PhoneNumber: { label: 'Egendefinert 3' },
        },
        'en-GB': {
          my: { string: 'My string 3' },
          PhoneNumber: { label: 'Custom 3' },
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const MockComponent = (props) => {
        return (
          <Provider translations={translations} {...props}>
            <Form.Handler>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
            </Form.Handler>
          </Provider>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1] = Array.from(
        document.querySelectorAll('label, output')
      )

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['en-GB'].my.string)

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO'].PhoneNumber.label
      )
      expect(output1).toHaveTextContent(translations['nb-NO'].my.string)
    })
  })

  describe('with flat translations', () => {
    it('should handle custom and internal strings', () => {
      const translations = {
        'nb-NO': {
          'my.string': 'Min streng 4',
          'PhoneNumber.label': 'Egendefinert 4',
        },
        'en-GB': {
          'my.string': 'My string 4',
          'PhoneNumber.label': 'Custom 4',
        },
      }

      const Tr = (p: Tr<typeof translations>) => <Translation {...p} />

      const GlobalHook = () => {
        const t = useTranslation<typeof translations>()
        return t.my.string
      }
      const FormsHook = () => {
        const t = Form.useTranslation()
        return t.PhoneNumber.label
      }

      const MockComponent = (props) => {
        return (
          <Provider translations={translations} {...props}>
            <Form.Handler>
              <Field.PhoneNumber />
              <output>
                <Tr id={(t) => t.my.string} />
              </output>
              <output>
                <GlobalHook />
              </output>
              <output>
                <FormsHook />
              </output>
            </Form.Handler>
          </Provider>
        )
      }

      const { rerender } = render(<MockComponent locale="en-GB" />)

      const [countryCode, phoneNumber, output1, output2, output3] =
        Array.from(document.querySelectorAll('label, output'))

      expect(countryCode).toHaveTextContent(
        gb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output2).toHaveTextContent(translations['en-GB']['my.string'])
      expect(output3).toHaveTextContent(
        translations['en-GB']['PhoneNumber.label']
      )

      rerender(<MockComponent locale="nb-NO" />)

      expect(countryCode).toHaveTextContent(
        nb.PhoneNumber.countryCodeLabel
      )
      expect(phoneNumber).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
      expect(output1).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output2).toHaveTextContent(translations['nb-NO']['my.string'])
      expect(output3).toHaveTextContent(
        translations['nb-NO']['PhoneNumber.label']
      )
    })
  })
})
