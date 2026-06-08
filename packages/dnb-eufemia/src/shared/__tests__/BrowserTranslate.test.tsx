import { render } from '@testing-library/react'
import BrowserTranslate from '../BrowserTranslate'
import Provider from '../Provider'
import Dropdown from '../../components/dropdown/Dropdown'

describe('BrowserTranslate', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should set translate="no" on portal content via PortalRoot.Provider', () => {
    render(
      <BrowserTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} open />
      </BrowserTranslate>
    )

    const portalElement = document.getElementById('eufemia-portal-root')
    const portalWrapper = portalElement?.querySelector(
      '.eufemia-portal-root'
    )
    expect(portalWrapper).toHaveAttribute('translate', 'no')
  })

  it('should set translate="no" on form element via formElement context', () => {
    render(
      <BrowserTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} />
      </BrowserTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })

  it('should not set translate when off is not provided', () => {
    render(
      <BrowserTranslate>
        <Dropdown data={['Item 1', 'Item 2']} />
      </BrowserTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should not set translate when off is false', () => {
    render(
      <BrowserTranslate off={false}>
        <Dropdown data={['Item 1', 'Item 2']} />
      </BrowserTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should allow nesting inside an existing Provider', () => {
    render(
      <Provider locale="en-GB">
        <BrowserTranslate off>
          <Dropdown data={['Item 1', 'Item 2']} />
        </BrowserTranslate>
      </Provider>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })
})
