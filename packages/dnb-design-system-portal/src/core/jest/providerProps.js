/**
 * Test Prop/Store Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-static'
import { Provider } from 'mobx-react'

import { MobxIntlProvider, localeStore } from '../startup/locales'
import history from '../routing/History'

// make sure the lang is set to en

const ProviderSimulation = props => {
  localeStore.value = props.lang || 'en'
  return (
    <Provider
      locale={localeStore}
      // {...stores}
    >
      <MobxIntlProvider>
        <Router history={history}>{props.children}</Router>
      </MobxIntlProvider>
    </Provider>
  )
}
ProviderSimulation.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired
}
ProviderSimulation.defaultProps = {
  lang: 'en'
}

export default {
  Provider: ProviderSimulation,
  stores: Object.assign(
    { history: history, locale: localeStore }
    // , stores
  )
}
