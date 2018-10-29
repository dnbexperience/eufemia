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
// import stores from '../../dm/stores'

import extend from 'lodash.merge'

// make Object.merge global aviable
Object.merge = (...args) => {
  args.unshift({})
  return extend.apply(extend, args)
} // I used merge before, but the "array-includes-with-glob" is not ES5 code in the npm package, so this causes troubles on the build / UglifyJsPlugin process
Object.extend = extend

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
