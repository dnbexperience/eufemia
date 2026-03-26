/**
 * Provider Form.Section test
 *
 */

import React from 'react'
import Provider from '../Provider'
import { render } from '@testing-library/react'
import * as TranslationModule from '../Translation'
import { Form } from '../../extensions/forms'

const Translation = TranslationModule.default


describe('Provider Form.Section bug', () => {
  describe('translations', () => {
    let spy: jest.SpyInstance

    afterEach(() => {
      spy.mockRestore()

    });

    it('should only merge translations once', () => {
      const nbNO = { my: { list: ['y'] } }
      const enGB = { my: { list: ['x'] } }


      const trans = {
        'en-GB': enGB,
        'nb-NO': nbNO,
      }

      spy = jest.spyOn(TranslationModule, 'mergeTranslations')


      render(
        <Provider
          locale="en-GB"
          translations={trans}
        >
          <span id="root-in-root">
            <Translation id="Root" />
          </span>
          <Form.Section
            translations={undefined}
          >
            <span id="root-in-inner">
              <Translation id="Root" />
            </span>
            <span id="inner-in-inner">
              <Translation id="Inner" />
            </span>
          </Form.Section>
        </Provider>,
      )

      expect(spy).toHaveBeenCalledTimes(1)

    })

  })
})
