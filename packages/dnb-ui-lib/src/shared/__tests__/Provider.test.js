/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import Modal from '../../components/modal/Modal'

import Context from '../Context'
import Provider from '../Provider'

describe('Provider', () => {
  const close_title_nb = 'Steng'
  const close_title_us = 'Hide'

  const nbNO = {
    'Modal.close_title': close_title_nb
  }
  const enUS = {
    'Modal.close_title': close_title_us
  }

  const LocalProvider = (props) => {
    return (
      <Provider
        locales={{
          'nb-NO': nbNO,
          'en-US': enUS
        }}
        {...props}
      />
    )
  }

  it('locales should translate component strings', () => {
    const Comp = mount(
      <LocalProvider>
        <Modal open_state="opened" no_animation>
          content
        </Modal>
      </LocalProvider>
    )

    expect(
      String(Comp.find('button.dnb-modal__close-button').text()).replace(
        /\u200C/g,
        ''
      )
    ).toBe(close_title_nb)

    Comp.setProps({
      locale: 'en-US'
    })

    expect(
      String(Comp.find('button.dnb-modal__close-button').text()).replace(
        /\u200C/g,
        ''
      )
    ).toBe(close_title_us)
  })

  it('locales should react on locale change', () => {
    const Comp = mount(
      <LocalProvider>
        <Context.Consumer>
          {(context) => {
            const close_title = context.translation.Modal.close_title
            return <p>{close_title}</p>
          }}
        </Context.Consumer>
      </LocalProvider>
    )

    expect(String(Comp.find('p').text())).toBe(close_title_nb)

    Comp.setProps({
      locale: 'en-US'
    })

    expect(String(Comp.find('p').text())).toBe(close_title_us)
  })

  it('locales should react on locale change', () => {
    const ChangeLocale = () => {
      const { setLocale } = React.useContext(Context)

      return (
        <>
          <button
            id="nb-NO"
            onClick={() => {
              setLocale('nb-NO')
            }}
          >
            nb-NO
          </button>
          <button
            id="en-US"
            onClick={() => {
              setLocale('en-US')
            }}
          >
            en-US
          </button>
        </>
      )
    }

    const Comp = mount(
      <LocalProvider>
        <Context.Consumer>
          {(context) => {
            const close_title = context.translation.Modal.close_title
            return (
              <>
                <p>{close_title}</p>
                <ChangeLocale />
              </>
            )
          }}
        </Context.Consumer>
      </LocalProvider>
    )

    expect(String(Comp.find('p').text())).toBe(close_title_nb)

    Comp.find('button#en-US').simulate('click')

    expect(String(Comp.find('p').text())).toBe(close_title_us)

    Comp.find('button#nb-NO').simulate('click')

    expect(String(Comp.find('p').text())).toBe(close_title_nb)
  })
})
