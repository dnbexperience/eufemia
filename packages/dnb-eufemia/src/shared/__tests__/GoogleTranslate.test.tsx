import { render } from '@testing-library/react'
import GoogleTranslate from '../GoogleTranslate'
import Provider from '../Provider'
import Dropdown from '../../components/dropdown/Dropdown'

describe('GoogleTranslate', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should set translate="no" on portal content via PortalRoot.Provider', () => {
    render(
      <GoogleTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} open />
      </GoogleTranslate>
    )

    const portalElement = document.getElementById('eufemia-portal-root')
    const portalWrapper = portalElement?.querySelector(
      '.eufemia-portal-root'
    )
    expect(portalWrapper).toHaveAttribute('translate', 'no')
  })

  it('should set translate="no" on form element via formElement context', () => {
    render(
      <GoogleTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} />
      </GoogleTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })

  it('should not set translate when off is not provided', () => {
    render(
      <GoogleTranslate>
        <Dropdown data={['Item 1', 'Item 2']} />
      </GoogleTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should not set translate when off is false', () => {
    render(
      <GoogleTranslate off={false}>
        <Dropdown data={['Item 1', 'Item 2']} />
      </GoogleTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should allow nesting inside an existing Provider', () => {
    render(
      <Provider locale="en-GB">
        <GoogleTranslate off>
          <Dropdown data={['Item 1', 'Item 2']} />
        </GoogleTranslate>
      </Provider>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })
})
